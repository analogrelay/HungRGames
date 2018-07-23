using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using ShootR.BotClient.Payloads;

namespace ShootR.BotClient
{
    public class BotClient
    {
        private readonly HubConnection _connection;
        private readonly BotUserInformation _botInformation;
        private readonly CookieContainer _cookies;
        private readonly Uri _serverUri;

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
        }

    }
}
