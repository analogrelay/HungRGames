using System;
using System.Drawing;
using System.Threading;
using System.Threading.Tasks;
using ShootR.GameModel;

namespace ShootR.BotClient.Sample
{
    public class Program
    {
        static async Task Main(string[] args)
        {
            var serverUrl = "http://localhost:64163/";
            var botInformation = new BotUserInformation("DerpyHooves");
            var botClient = new BotClient(serverUrl, botInformation);

            await botClient.ConnectAsync();
            var tcs = new TaskCompletionSource<bool>();

            var startPosition = new Point(Console.CursorLeft, Console.CursorTop);
            var linesUsed = 0;

            void WriteLine(string line)
            {
                Console.WriteLine(line);
                linesUsed += 1;
            }

            void BlankLine()
            {
                var blank = new string(' ', Console.BufferWidth - 1);
                Console.WriteLine(blank);
            }

            // Start moving forward
            var forward = true;
            await botClient.StartMovementAsync(Common.GameModel.Movement.Forward);
            var payloadCount = 0;

            botClient.OnPayloadAsync += async (PayloadData payload) =>
            {
                payloadCount += 1;

                // Move back to the start position
                Console.CursorLeft = startPosition.X;
                Console.CursorTop = startPosition.Y;

                // Blank every line we've used so far
                for (var i = 0; i < linesUsed; i++)
                {
                    BlankLine();
                }

                linesUsed = 0;

                // Move back to the start position again
                Console.CursorLeft = startPosition.X;
                Console.CursorTop = startPosition.Y;

                ShipData ourShip = null;
                WriteLine("Ships: ");
                foreach (var ship in payload.Ships)
                {
                    WriteLine($"{ship.Name} ({ship.Id}), Level {ship.Level}, {ship.Life.Health}/{ship.MaxLife}, ({ship.Movement.Position.X}, {ship.Movement.Position.Y}) moving ({ship.Movement.Velocity.X},{ship.Movement.Velocity.Y})");

                    if (ship.Name.Equals("BotSample"))
                    {
                        ourShip = ship;
                    }
                }

                WriteLine($"Payloads: {payloadCount}");

                // Change directions when we're near the edge
                if(ourShip != null)
                {
                    if(ourShip.Movement.Position.X > 4500 || ourShip.Movement.Position.X < 500)
                    {
                        forward = !forward;
                        if(forward)
                        {
                            await botClient.StartAndStopMovementAsync(Common.GameModel.Movement.Backward, Common.GameModel.Movement.Forward);
                        }
                        else
                        {
                            await botClient.StartAndStopMovementAsync(Common.GameModel.Movement.Forward, Common.GameModel.Movement.Backward);
                        }
                    }
                }
            };


            await tcs.Task;
        }
    }
}
