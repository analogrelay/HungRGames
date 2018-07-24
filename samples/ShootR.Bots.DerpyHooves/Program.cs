using System;
using System.Threading;
using System.Threading.Tasks;

namespace ShootR.Bots.DerpyHooves
{
    class Program
    {
        static async Task<int> Main(string[] args)
        {
            if (args.Length < 1)
            {
                Console.Error.WriteLine("ShootR.Bots.DerpyHooves [ShootR Server URL]");
                return 1;
            }

            var url = args[0];

            var token = CreateConsoleCancellationToken();

            var bot = new DerpyHoovesBot(url);

            try
            {
                await bot.RunAsync(token);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("An error occurred:");
                Console.Error.WriteLine(ex.ToString());
                return 1;
            }

            return 0;
        }

        private static CancellationToken CreateConsoleCancellationToken()
        {
            var cts = new CancellationTokenSource();
            Console.CancelKeyPress += (sender, args) =>
            {
                if (cts.IsCancellationRequested)
                {
                    // This is the second time the user pressed Ctrl-C. Let the default behavior occur.
                    Console.WriteLine("Terminating...");
                }
                else
                {
                    Console.WriteLine("Stopping, press Ctrl-C again to forcibly terminate...");
                    cts.Cancel();

                    // Don't terminate the process
                    args.Cancel = true;
                }
            };
            return cts.Token;
        }
    }
}
