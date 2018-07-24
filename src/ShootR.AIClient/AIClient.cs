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
            Task = Task.Run(async () => {
                // Spin around
                await _bot.StartMovementAsync(Movement.RotatingRight);

                while (true)
                {
                    if (_tokenSource.Token.IsCancellationRequested)
                    {
                        break;
                    }
                    // And shoot
                    await _bot.FireAsync();

                    await Task.Delay(100);
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
