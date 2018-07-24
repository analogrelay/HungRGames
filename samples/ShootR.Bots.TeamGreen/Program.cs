using System;
using System.Drawing;
using System.Threading;
using System.Threading.Tasks;
using ShootR.Common.GameModel;
using ShootR.GameModel;

namespace ShootR.BotClient.Sample
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            var botClient = new BotClient("http://localhost:30567", new BotUserInformation("Team Green"));

            Console.WriteLine("Starting connection. Press Ctrl-C to close.");
            await botClient.ConnectAsync();

            var lastSeenHealth = -1.0;

            botClient.OnUpdateAsync = async context =>
            {
                if (!context.YourShip.Movement.Moving.RotatingRight)
                {
                    await botClient.StartMovementAsync(Movement.RotatingRight);
                }

                var currentHealth = context.YourShip.Life.Health;

                if (lastSeenHealth == -1)
                {
                    lastSeenHealth = currentHealth;
                }

                if (lastSeenHealth != currentHealth)
                {
                    lastSeenHealth = currentHealth;
                    await botClient.SendMessage("LET ME LANDDDD!!");
                    await botClient.BoostAsync();
                }

                await botClient.FireAsync();
            };

            var tcs = new TaskCompletionSource<bool>();
            Console.CancelKeyPress += async (sender, a) =>
            {
                await botClient.DisconnectAsync();
                tcs.SetResult(true);
            };

            await tcs.Task;
        }
    }
}
