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
        private readonly BotClient.BotClient _client;
        private readonly GameTime _gameTime = new GameTime();

        private readonly Timer _phaseTimer = new Timer(TimeSpan.FromSeconds(30));
        private IPhase _activePhase;

        private readonly SpinningPhase _spinningPhase;
        private readonly ShootingPhase _shootingPhase;

        public CancellationToken CancellationToken { get; private set; }

        public DerpyHoovesBot(string url)
        {
            _url = url;

            // Build the client
            _client = new BotClient.BotClient(_url, new BotUserInformation("DerpyHooves", "https://i.kym-cdn.com/photos/images/newsfeed/000/122/114/130232443562.gif"));
            _client.OnUpdateAsync += (context) =>
            {
                _gameTime.Update(DateTime.UtcNow);
                return TickAsync(context, CancellationToken);
            };

            _spinningPhase = new SpinningPhase(_client);
            _shootingPhase = new ShootingPhase(_client);
        }

        public async Task RunAsync(CancellationToken cancellationToken)
        {
            CancellationToken = cancellationToken;
            await _client.ConnectAsync(cancellationToken);

            // Wait for shut down, the callback does all the work now.
            await cancellationToken.WaitForCancellationAsync();
        }

        private async Task TickAsync(UpdateContext context, CancellationToken cancellationToken)
        {
            if(_activePhase == null)
            {
                // Start with the spinning phase
                _activePhase = _spinningPhase;
                await _activePhase.StartAsync();
                _phaseTimer.Reset();
            }

            _phaseTimer.Update(_gameTime);

            if(_phaseTimer.HasElapsed)
            {
                // Stop the active phase
                await _activePhase.StopAsync();

                // Swap phases
                if(ReferenceEquals(_activePhase, _spinningPhase))
                {
                    _activePhase = _shootingPhase;
                }
                else
                {
                    _activePhase = _spinningPhase;
                }

                // Start the next phase
                await _activePhase.StartAsync();
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
            private BotClient.BotClient _client;
            private Timer _shotTimer = new Timer(TimeSpan.FromMilliseconds(500));

            public ShootingPhase(BotClient.BotClient client)
            {
                _client = client;
            }

            public async Task StartAsync()
            {
                await _client.SendMessage("ACTIVATING SHOOTING UNIT.");
            }

            public async Task StopAsync()
            {
                await _client.SendMessage("DEACTIVATED SHOOTING MODULE.");
            }

            public async Task TickAsync(GameTime gameTime)
            {
                _shotTimer.Update(gameTime);

                if(_shotTimer.HasElapsed)
                {
                    await _client.SendMessage("EMITTING FRIENDSHIP PARTICLE.");
                    await _client.FireAsync();
                    _shotTimer.Reset();
                }
            }
        }

        private class SpinningPhase : IPhase
        {
            private readonly BotClient.BotClient _client;

            public SpinningPhase(BotClient.BotClient client)
            {
                _client = client;
            }
            
            public async Task StartAsync()
            {
                await _client.SendMessage("INITIATING SPINNING ROUTINES.");
                await _client.StartMovementAsync(Movement.RotatingLeft);
            }

            public async Task StopAsync()
            {
                await _client.SendMessage("DISENGAGING SPINNING PROTOCOL.");
                await _client.StopMovementAsync(Movement.RotatingLeft);
            }

            public Task TickAsync(GameTime gameTime)
            {
                // Nothing to do for this phase
                return Task.CompletedTask;
            }
        }
    }
}