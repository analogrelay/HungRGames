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
using Microsoft.Extensions.Logging;

namespace ShootR.BotClient
{
    public class BotClient
    {
        private readonly HubConnection _connection;
        private readonly BotUserInformation _botInformation;
        private readonly CookieContainer _cookies;
        private readonly Uri _serverUri;
        private bool _connected;
        private InitializationData _initializationData;
        private PayloadDecompressor _payloadDecompressor;
        private SemaphoreSlim _payloadLock = new SemaphoreSlim(1, 1);

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

        public Func<UpdateContext, Task> OnUpdateAsync { get; set; }

        public async Task ConnectAsync(CancellationToken cancellationToken = default)
        {
            var handler = new HttpClientHandler() { CookieContainer = _cookies };
            var httpClient = new HttpClient(handler) { BaseAddress = _serverUri };
            var request = new HttpRequestMessage(HttpMethod.Get, $"/api/join?name={_botInformation.DisplayName}&role=Player&photoUrl={_botInformation.Photo}");
            await httpClient.SendAsync(request, cancellationToken);

            _connection.On("d", new[] { typeof(JArray) }, (parameters) => HandlePayloadAsync((JArray)parameters[0]));

            // Binding this because the client crashes on unknown invocations
            _connection.On<JArray>("l", (data) => { });
            _connection.On<JArray>("mapSizeIncreased", data => { });
            _connection.On("disconnect", () => DisconnectAsync().Wait());

            await _connection.StartAsync(cancellationToken);

            var stateCookie = _cookies.GetCookies(_serverUri)["shootr.state"];

            var decodedValue = WebUtility.UrlDecode(stateCookie.Value);
            var shootRState = JsonConvert.DeserializeObject<ShootRState>(decodedValue);
            var clientInitializationData = await _connection.InvokeAsync<InitializationData>("bot_initializeClient", shootRState.RegistrationID, cancellationToken);

            if (clientInitializationData.ServerFull)
            {
                throw new Exception("Server Full.");
            }

            _initializationData = clientInitializationData;
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

            await _connection.SendAsync("bot_fire", cancellationToken);
        }

        public async Task StartAndStopMovementAsync(Movement toStop, Movement toStart, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.SendAsync("bot_StartAndStopMovement", toStop, toStart, cancellationToken);
        }

        public async Task StartMovementAsync(Movement movement, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.SendAsync("bot_startMovement", movement, cancellationToken);
        }

        public async Task StopMovementAsync(Movement movement, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.SendAsync("bot_stopMovement", movement, cancellationToken);
        }

        public async Task BoostAsync(CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.SendAsync("bot_boost", cancellationToken);
        }

        public async Task SendMessage(string message, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.SendAsync("bot_sendMessage", message, cancellationToken);
        }

        private async Task HandlePayloadAsync(JArray parameters)
        {
            await _payloadLock.WaitAsync();
            try
            {
                var serverPayload = parameters;
                var payload = _payloadDecompressor.DecompressPayload(serverPayload);
                var context = new UpdateContext(payload, _initializationData);
                await (OnUpdateAsync?.Invoke(context) ?? Task.CompletedTask);
            }
            finally
            {
                _payloadLock.Release();
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
