using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ShootR
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var aiClient = new AIClient("http://localhost:5000", "AIClient");

            await aiClient.ConnectAsync();

            Console.WriteLine("Starting connection. Press Ctrl-C to close.");
            Console.CancelKeyPress += async (sender, a) =>
            {
                a.Cancel = true;
                await aiClient.DisconnectAsync();
            };

            await aiClient.Task;
        }
    }
}
