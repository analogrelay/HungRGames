using System;
using System.Threading;
using System.Threading.Tasks;
using ShootR.BotClient;
using ShootR.Common.GameModel;
using ShootR.GameModel;

namespace ShootR.Bots.WhatTheBot
{
    public class WhatTheBot
    {
        private readonly string _url;
        private readonly BotClient.BotClient _client;
        private readonly GameTime _gameTime = new GameTime();
        private readonly Timer _timer = new Timer(TimeSpan.FromSeconds(10));
        private readonly Timer _turnAroundTimer = new Timer(TimeSpan.FromSeconds(3));

        public int ExpectedRotationAngle { get; set; }

        public bool Turning { get; set; } = false;

        public WhatTheBot(string url)
        {
            _url = url;

            // Build the client
            _client = new BotClient.BotClient(_url, new BotUserInformation("WhatTheBot", "https://techinsight.com.vn/wp-content/uploads/2017/08/Untitled-1-36.jpg"));
            _client.OnUpdateAsync += (context) =>
            {
                _gameTime.Update(DateTime.UtcNow);
                return TickAsync(context, CancellationToken);
            };
        }

        public CancellationToken CancellationToken { get; private set; }

        public async Task RunAsync(CancellationToken cancellationToken)
        {
            CancellationToken = cancellationToken;
            await _client.ConnectAsync(cancellationToken);

            // Wait for shut down, the callback does all the work now.
            await cancellationToken.WaitForCancellationAsync();
        }

        private async Task TickAsync(UpdateContext context, CancellationToken cancellationToken)
        {
            _timer.Update(_gameTime);
            _turnAroundTimer.Update(_gameTime);

            // Start moving forward
            await _client.StartMovementAsync(Common.GameModel.Movement.Forward);
            // await _client.StartMovementAsync(Movement.RotatingRight);
            // await _client.StopMovementAsync(Movement.RotatingRight);
            // await _client.StartMovementAsync(Movement.RotatingLeft);
            // await _client.StopMovementAsync(Movement.RotatingLeft);
            
            var ship = context.YourShip;
            var payload = context.Payload;

            
            if (IsShipFacingTheWayIWant(ship))
            {
                await _client.StopMovementAsync(Movement.RotatingLeft);
            }
            await _client.FireAsync();
            if (_timer.HasElapsed)
            {
                await _client.BoostAsync();
                _timer.Reset();
            }

            if (_turnAroundTimer.HasElapsed)
            {
                var rot = GetRotation(ship);
                if (rot == Rotation.Up && ship.Movement.Position.Y < 700)
                {
                    await TurnAround(context);
                    ExpectedRotationAngle = 90;
                }
                if (rot == Rotation.Down && ship.Movement.Position.Y > 4300)
                {
                    await TurnAround(context);
                    ExpectedRotationAngle = 270;
                }
                if (rot == Rotation.Left && ship.Movement.Position.X > 700)
                {
                    await TurnAround(context);
                    ExpectedRotationAngle = 0;
                }
                if (rot == Rotation.Right && ship.Movement.Position.X > 4300)
                {
                    await TurnAround(context);
                    ExpectedRotationAngle = 180;
                }
            }
        }

        private bool IsShipFacingTheWayIWant(ShipData ship)
        {
            var rotationDegrees = GetRotationDegrees(ship);
            //Console.WriteLine(ExpectedRotationAngle + " " + rotationDegrees);
            if ((rotationDegrees < ExpectedRotationAngle + 5) && (rotationDegrees > ExpectedRotationAngle - 5))
            {
                Turning = false;
                return true;
            }

            return false;
        }

        private async Task TurnAround(UpdateContext context)
        {
            //if (Turning) return;

            //Turning = true;
            _turnAroundTimer.Reset();
            await _client.StartMovementAsync(Movement.RotatingLeft);
        }

        private Rotation GetRotation(ShipData ship)
        {
            var absoluteDegree = ship.Movement.Rotation * (180.0 / Math.PI);

            var neg = absoluteDegree < 0 ? true : false;
            var degree  = (int)Math.Abs(absoluteDegree) % 360;
            if ((degree > 315 && degree < 0) || (degree >=0 && degree <= 45)) return Rotation.Right;
            else if (degree > 45 && degree <= 135) return neg ? Rotation.Up : Rotation.Down;
            else if (degree > 135 && degree <= 225) return Rotation.Left;
            else if (degree > 225 && degree <= 315) return neg ? Rotation.Down : Rotation.Up;
            else return Rotation.Up;
        }

        private int GetRotationDegrees(ShipData ship)
        {
            var absoluteDegree = ship.Movement.Rotation * (180.0 / Math.PI);
            var degree  = (int)Math.Abs(absoluteDegree) % 360;
            return Math.Abs(degree);
        }

        // private bool GoToPosition(UpdateContext context, double x, double y)
        // {
        //     var ship = context.YourShip;
        //     ship.Movement.Position.X
        // }

        public enum Rotation
        {
            Up,
            Down,
            Left,
            Right,
        }
    }
}