using System;
using System.Threading;
using System.Threading.Tasks;
using ShootR.BotClient;

namespace ShootR.Bots.WhatTheBot
{
    public class WhatTheBot
    {
        private readonly string _url;
        private readonly BotClient.BotClient _client;

        public WhatTheBot(string url)
        {
            _url = url;

            // Build the client
            _client = new BotClient.BotClient(_url, new BotUserInformation("WhatTheBot", "https://techinsight.com.vn/wp-content/uploads/2017/08/Untitled-1-36.jpg"));
        }

        public Task RunAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}