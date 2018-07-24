using System;
using System.Threading;
using System.Threading.Tasks;
using ShootR.BotClient;
using ShootR.Common.GameModel;
using ShootR.GameModel;

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

        internal Task SayAsync(string message)
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
                await _activePhase.StartAsync(context);
                _phaseTimer.Reset();
            }

            _phaseTimer.Update(_gameTime);

            if (_phaseTimer.HasElapsed)
            {
                // Stop the active phase
                await _activePhase.StopAsync(context);

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
                await _activePhase.StartAsync(context);

                _phaseTimer.Reset();
            }

            // Tick the active phase
            await _activePhase.TickAsync(context, _gameTime);
        }

        private interface IPhase
        {
            Task StartAsync(UpdateContext context);
            Task StopAsync(UpdateContext context);
            Task TickAsync(UpdateContext context, GameTime gameTime);
        }

        private class ShootingPhase : IPhase
        {
            private readonly DerpyHoovesBot _bot;
            private Timer _shotTimer = new Timer(TimeSpan.FromMilliseconds(500));

            public ShootingPhase(DerpyHoovesBot bot)
            {
                _bot = bot;
            }

            public async Task StartAsync(UpdateContext context)
            {
                await _bot.SayAsync("ACTIVATING SHOOTING UNIT.");
            }

            public async Task StopAsync(UpdateContext context)
            {
                await _bot.SayAsync("DEACTIVATED SHOOTING MODULE.");
            }

            public async Task TickAsync(UpdateContext context, GameTime gameTime)
            {
                _shotTimer.Update(gameTime);

                if (_shotTimer.HasElapsed)
                {
                    await _bot.SayAsync("EMITTING FRIENDSHIP PARTICLE.");
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

            public async Task StartAsync(UpdateContext context)
            {
                // Set the target vector
                var targetVector = RotationHelper.RotateVector(Vector2.North, -(Math.PI / 2));

                // Calculate the target rotation


                await _bot.SayAsync("INITIATING SPINNING ROUTINES.");

                // Start rotating
                await _bot.Client.StartMovementAsync(Movement.RotatingLeft);
            }

            public async Task StopAsync(UpdateContext context)
            {
                await _bot.SayAsync("DISENGAGING SPINNING PROTOCOL.");
                await _bot.Client.StopMovementAsync(Movement.RotatingLeft);
            }

            public Task TickAsync(UpdateContext context, GameTime gameTime)
            {
                // Check if we're facing the right direction yet
                

                // Nothing to do for this phase
                return Task.CompletedTask;
            }
        }
    }
}