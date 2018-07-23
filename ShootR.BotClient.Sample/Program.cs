using System;
using System.Threading;
using System.Threading.Tasks;

namespace ShootR.BotClient.Sample
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            var serverUrl = "http://localhost:5000";
            var botInformation = new BotUserInformation("BotSample");
            var botClient = new BotClient(serverUrl, botInformation);

            await botClient.ConnectAsync();
        }
    }
}
