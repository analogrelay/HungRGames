using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using ShootR.BotClient.Payloads;
using ShootR.BotClient.ShootR;

namespace ShootR.BotClient
{
    public class BotClient
    {
        private readonly HubConnection _connection;
        private readonly BotUserInformation _botInformation;
        private readonly CookieContainer _cookies;
        private readonly Uri _serverUri;
        private bool _connected;

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

        public async Task Connect(CancellationToken cancellationToken = default)
        {
            var handler = new HttpClientHandler() { CookieContainer = _cookies };
            var httpClient = new HttpClient(handler) { BaseAddress = _serverUri };
            var request = new HttpRequestMessage(HttpMethod.Get, "/api/join?=" + _botInformation.DisplayName);
            await httpClient.SendAsync(request, cancellationToken);

            await _connection.StartAsync(cancellationToken);

            var stateCookie = _cookies.GetCookies(_serverUri)["shootr.state"];

            var decodedValue = WebUtility.UrlDecode(stateCookie.Value);
            var shootRState = JsonConvert.DeserializeObject<ShootRState>(decodedValue);
            var clientInitializationData = await _connection.InvokeAsync<InitializationData>("bot_initializeClient", shootRState.RegistrationID, cancellationToken);
            var payloadDecompressor = new PayloadDecompressor(clientInitializationData);

            await _connection.InvokeAsync("bot_readyForPayloads", cancellationToken);

            _connected = true;
        }

        public async Task FireAsync(CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_fire", cancellationToken);
        }

        public async Task StartAndStopMovement(Movement toStop, Movement toStart, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_StartAndStopMovement", toStop, toStart, cancellationToken);
        }

        public async Task StartMovement(Movement movement, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_startMovement", movement, cancellationToken);
        }

        public async Task StopMovement(Movement movement, CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_stopMovement", movement, cancellationToken);
        }

        public async Task Boost(CancellationToken cancellationToken = default)
        {
            EnsureConnected();

            await _connection.InvokeAsync("bot_boost", cancellationToken);
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
