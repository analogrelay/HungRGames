using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using ShootR.BotClient;
using ShootR.BotClient.ShootR;

namespace ShootR
{
    public class AIClient
    {
        private ShootR.BotClient.BotClient _bot;
        private CancellationTokenSource _tokenSource;

        public Task Task { get; private set; }

        public AIClient(string url, string name)
        {
            _bot = new ShootR.BotClient.BotClient(url, new BotUserInformation(name));
        }

        public async Task ConnectAsync(CancellationToken cancellationToken = default)
        {
            await _bot.ConnectAsync();

            _tokenSource = new CancellationTokenSource();
            Task = Task.Factory.StartNew(() => {
                // Spin around and shoot
                while (true)
                {
                    if (_tokenSource.Token.IsCancellationRequested)
                    {
                        break;
                    }
                    _bot.StartMovement(Movement.RotatingRight);
                    _bot.FireAsync();
                }
            }, _tokenSource.Token);
        }

        public async Task DisconnectAsync(CancellationToken cancellationToken = default)
        {
            _tokenSource.Cancel();
            await Task;
            await _bot.DisconnectAsync();
        }
    }
}
