using System;
using System.Threading;
using System.Threading.Tasks;
using ShootR.BotClient;

namespace ShootR.Bots.DerpyHooves
{
    public class DerpyHoovesBot
    {
        private readonly string _url;
        private readonly BotClient.BotClient _client;

        public DerpyHoovesBot(string url)
        {
            _url = url;

            // Build the client
            _client = new BotClient.BotClient(_url, new BotUserInformation("DerpyHooves", "https://i.kym-cdn.com/photos/images/newsfeed/000/122/114/130232443562.gif"));
        }

        public Task RunAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}