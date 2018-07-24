using System;
using System.Threading;
using System.Threading.Tasks;
using ShootR.BotClient;
using ShootR.Common.GameModel;

namespace ShootR.Bots.DerpyHooves
{
    public class DerpyHoovesBot
    {
        private readonly string _url;
        private readonly GameTime _gameTime = new GameTime();

        internal BotClient.BotClient Client { get; }

        private readonly Timer _phaseTimer = new Timer(TimeSpan.FromSeconds(10));
        private IPhase _activePhase;

        private readonly SpinningPhase _spinningPhase;
        private readonly ShootingPhase _shootingPhase;

        public CancellationToken CancellationToken { get; private set; }

        public DerpyHoovesBot(string url)
        {
            _url = url;

            // Build the client
            Client = new BotClient.BotClient(_url, new BotUserInformation("DerpyHooves", "https://i.kym-cdn.com/photos/images/newsfeed/000/122/114/130232443562.gif"));
            Client.OnUpdateAsync += (context) =>
            {
                _gameTime.Update(DateTime.UtcNow);
                return TickAsync(context, CancellationToken);
            };

            _spinningPhase = new SpinningPhase(this);
            _shootingPhase = new ShootingPhase(this);
        }

        internal Task LogAsync(string message)
        {
            Console.WriteLine(message);
            return Client.SendMessage(message, CancellationToken);
        }

        public async Task RunAsync(CancellationToken cancellationToken)
        {
            CancellationToken = cancellationToken;
            await Client.ConnectAsync(cancellationToken);

            // Wait for shut down, the callback does all the work now.
            await cancellationToken.WaitForCancellationAsync();
        }

        private async Task TickAsync(UpdateContext context, CancellationToken cancellationToken)
        {
            if (_activePhase == null)
            {
                // Start with the spinning phase
                _activePhase = _spinningPhase;
                await _activePhase.StartAsync();
                _phaseTimer.Reset();
            }

            _phaseTimer.Update(_gameTime);

            if (_phaseTimer.HasElapsed)
            {
                // Stop the active phase
                await _activePhase.StopAsync();

                // Swap phases
                if (ReferenceEquals(_activePhase, _spinningPhase))
                {
                    _activePhase = _shootingPhase;
                }
                else
                {
                    _activePhase = _spinningPhase;
                }

                // Start the next phase
                await _activePhase.StartAsync();

                _phaseTimer.Reset();
            }

            // Tick the active phase
            await _activePhase.TickAsync(_gameTime);
        }

        private interface IPhase
        {
            Task StartAsync();
            Task StopAsync();
            Task TickAsync(GameTime gameTime);
        }

        private class ShootingPhase : IPhase
        {
            private readonly DerpyHoovesBot _bot;
            private Timer _shotTimer = new Timer(TimeSpan.FromMilliseconds(250));

            public ShootingPhase(DerpyHoovesBot bot)
            {
                _bot = bot;
            }

            public async Task StartAsync()
            {
                await _bot.LogAsync("ACTIVATING SHOOTING UNIT.");
            }

            public async Task StopAsync()
            {
                await _bot.LogAsync("DEACTIVATED SHOOTING MODULE.");
            }

            public async Task TickAsync(GameTime gameTime)
            {
                _shotTimer.Update(gameTime);

                if (_shotTimer.HasElapsed)
                {
                    await _bot.LogAsync("EMITTING FRIENDSHIP PARTICLE.");
                    await _bot.Client.FireAsync();
                    _shotTimer.Reset();
                }
            }
        }

        private class SpinningPhase : IPhase
        {
            private readonly DerpyHoovesBot _bot;

            public SpinningPhase(DerpyHoovesBot bot)
            {
                _bot = bot;
            }

            public async Task StartAsync()
            {
                await _bot.LogAsync("INITIATING SPINNING ROUTINES.");
                await _bot.Client.StartMovementAsync(Movement.RotatingLeft);
            }

            public async Task StopAsync()
            {
                await _bot.LogAsync("DISENGAGING SPINNING PROTOCOL.");
                await _bot.Client.StopMovementAsync(Movement.RotatingLeft);
            }

            public Task TickAsync(GameTime gameTime)
            {
                // Nothing to do for this phase
                return Task.CompletedTask;
            }
        }
    }
}