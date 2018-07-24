using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ShootR.BotClient.Payloads;
using ShootR.Common.GameModel;
using ShootR.GameModel;

namespace ShootR.BotClient
{
    public class BotClient
    {
        private readonly HubConnection _connection;
        private readonly BotUserInformation _botInformation;
        private readonly CookieContainer _cookies;
        private readonly Uri _serverUri;
        private bool _connected;
        private PayloadDecompressor _payloadDecompressor;
        private object _payloadLock = new object();

        public BotClient(string serverUrl, BotUserInformation botUserInformation)
        {
            _serverUri = new UriBuilder(serverUrl).Uri;
            _cookies = new CookieContainer();
            var hubUrl = new UriBuilder(_serverUri + "Game").ToString();
            _connection = new HubConnectionBuilder()
                .WithUrl(hubUrl,
                (connectionContext) =>
                {
                    connectionContext.Cookies = _cookies;
                }).Build();
            _botInformation = botUserInformation;
        }

        public Action<PayloadData> OnPayload { get; set; }

        public async Task ConnectAsync(CancellationToken cancellationToken = default)
        {
            var handler = new HttpClientHandler() { CookieContainer = _cookies };
            var httpClient = new HttpClient(handler) { BaseAddress = _serverUri };
            var request = new HttpRequestMessage(HttpMethod.Get, $"/api/join?={_botInformation.DisplayName}&role=Player");
            await httpClient.SendAsync(request, cancellationToken);

            _connection.On("d", new[] { typeof(JArray) }, HandlePayloadAsync);

            // Binding this because the client crashes on unknown invocations
            _connection.On("l", new[] { typeof(JArray) }, (data) => Task.CompletedTask);
            _connection.On("mapSizeIncreased", new[] { typeof(JArray) }, data => Task.CompletedTask);
            _connection.On("disconnect", () => DisconnectAsync().Wait());

            await _connection.StartAsync(cancellationToken);

            var stateCookie = _cookies.GetCookies(_serverUri)["shootr.state"];

            var decodedValue = WebUtility.UrlDecode(stateCookie.Value);
            var shootRState = JsonConvert.DeserializeObject<ShootRState>(decodedValue);
            var clientInitializationData = await _connection.InvokeAsync<InitializationData>("bot_initializeClient", shootRState.RegistrationID, cancellationToken);
            _payloadDecompressor = new PayloadDecompressor(clientInitializationData);

            await _connection.InvokeAsync("bot_readyForPayloads", cancellationToken);

            _connected = true;
        }

        public async Task DisconnectAsync(CancellationToken cancellationToken = default)
        {
            await _connection.StopAsync(cancellationToken);

            _connected = false;
        }

        public async Task FireAsync(CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_fire", cancellationToken);
        }

        public async Task StartAndStopMovementAsync(Movement toStop, Movement toStart, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_StartAndStopMovement", toStop, toStart, cancellationToken);
        }

        public async Task StartMovementAsync(Movement movement, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_startMovement", movement, cancellationToken);
        }

        public async Task StopMovementAsync(Movement movement, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_stopMovement", movement, cancellationToken);
        }

        public async Task BoostAsync(CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_boost", cancellationToken);
        }

        private Task HandlePayloadAsync(object[] parameters)
        {
            lock (_payloadLock)
            {
                var serverPayload = (JArray)parameters[0];
                var payload = _payloadDecompressor.DecompressPayload(serverPayload);

                OnPayload?.Invoke(payload);

                return Task.CompletedTask;
            }
        }

        private void EnsureConnected()
        {
            if (!_connected)
            {
                throw new InvalidOperationException("Bot not connected.");
            }
        }
    }
}
