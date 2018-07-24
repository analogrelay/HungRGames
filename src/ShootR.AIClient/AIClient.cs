using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using ShootR.BotClient;
using ShootR.Common.GameModel;
using ShootR.GameModel;

namespace ShootR
{
    public class AIClient
    {
        public readonly TimeSpan GIVE_UP_THRESHOLD = TimeSpan.FromSeconds(4);
        public readonly TimeSpan GIVE_UP_DURATION = TimeSpan.FromSeconds(2);
        public readonly TimeSpan FIRE_RATE_AI = TimeSpan.FromMilliseconds(400);
        public const long KILL_DISTANCE = 250000;
        public const long SEEK_DISTANCE = 1000000;
        public const int DISTANCE_AWAY_FROM_BOUNDARY = 400;
        public const int ROTATION_BUFFER = 20;


        private BotUserInformation _botInfo;
        private ShootR.BotClient.BotClient _bot;
        private TaskCompletionSource<bool> _tcs;
        public Task Task { get; private set; }
        private double CurrentRotation { get; set; } = -1;
        private double TargetRotation { get; set; } = -1;

        private AIState _state = AIState.Wandering;
        private DateTime _lastFiredTime = DateTime.Now;
        private DateTime _lastStateChangeTime = DateTime.Now;
        private DateTime _lastRotationTime = DateTime.Now;
        private int _seekingShip = -1;
        private static Random _gen = new Random();

        public AIClient(string url, string name)
        {
            _botInfo = new BotUserInformation(name);
            _bot = new ShootR.BotClient.BotClient(url, _botInfo);
            _tcs = new TaskCompletionSource<bool>();
            Task = _tcs.Task;
        }

        public async Task ConnectAsync(CancellationToken cancellationToken = default)
        {
            await _bot.ConnectAsync();
            _bot.OnUpdateAsync = OnUpdateAsync;
        }

        public async Task DisconnectAsync(CancellationToken cancellationToken = default)
        {
            _tcs.SetResult(true);
            await _bot.DisconnectAsync();
        }

        public async Task OnUpdateAsync(UpdateContext data)
        {
            CheckCurrentState(data);

            CurrentRotation = ResolveCurrentRotation(data.YourShip);


            await ActOnCurrentStateAsync(data);
        }

        public double ResolveCurrentRotation(ShipData ship)
        {
            var currentRotation = (ship.Movement.Rotation * 180 / Math.PI) % 360;

            if (currentRotation < 0)
            {
                currentRotation += 360;
            }

            currentRotation = Math.Abs(currentRotation - 360);

            return currentRotation;
        }

        public void CheckCurrentState(UpdateContext data)
        {
            if (_state == AIState.Seeking)
            {
                TryAndGiveUp(data.Time.At);
            }

            // We're either seeking or killing
            // if (_shipsOnScreen != null && _shipsOnScreen.Count > 0)
            // {
                // We're not seeking
                if (_seekingShip == -1)
                {
                    _seekingShip = SeekClosestShip(data);
                    return;
                }
                else // else if (SeekingShip != -1) // We're seeking or killing a ship
                {
                    // Currently seeking, need to check if we need to Kill
                    if (_state == AIState.Seeking)
                    {
                        TryAndKillSeekingShip(data);
                    }
                    else if (_state == AIState.Killing)
                    {
                        VerifyTargetWithinSeekDistance(data);
                    }

                    return;
                }
            // }

            // StartWandering();
        }

        public void ChangeState(AIState state, DateTime now)
        {
            _state = state;
            _lastStateChangeTime = now;
        }

        public void TryAndGiveUp(DateTime now)
        {
            if (now - _lastStateChangeTime > GIVE_UP_THRESHOLD)
            {
                _lastRotationTime = now;
                ChangeState(AIState.GaveUp, now);
            }
        }

        public int SeekClosestShip(UpdateContext data)
        {
            int closestID = -1;
            double dist = 0, closestDistance = double.MaxValue;

            foreach (var ship in data.OtherShips)
            {
                dist = GetShipDistance(data.YourShip, ship);
                if (dist < closestDistance)
                {
                    closestID = ship.Id;
                    closestDistance = dist;
                }
            }

            if (closestID == -1) // There's no ship to seek, go to wandering
            {
                StartWandering(data.Time.At);
            }
            else
            {
                ChangeState(AIState.Seeking, data.Time.At);
            }

            return closestID;
        }

        public void StartWandering(DateTime now)
        {
            ChangeState(AIState.Wandering, now);
            _seekingShip = -1;
        }

        public void TryAndKillSeekingShip(UpdateContext data)
        {
            foreach (var ship in data.OtherShips)
            {
                // Check if we've found our ship
                if (_seekingShip == ship.Id)
                {
                    if (GetShipDistance(data.YourShip, ship) <= KILL_DISTANCE)
                    {
                        ChangeState(AIState.Killing, data.Time.At);
                    }
                    return;
                }
            }

            // The Seeking ship is no longer on the screen
            StartWandering(data.Time.At);
        }

        public void VerifyTargetWithinSeekDistance(UpdateContext data)
        {
            foreach (var ship in data.OtherShips)
            {
                // Check if we've found our ship
                if (_seekingShip == ship.Id)
                {
                    if (GetShipDistance(data.YourShip, ship) <= SEEK_DISTANCE)
                    {
                        return;
                    }
                }
            }

            // The Seeking ship is no longer on the screen
            StartWandering(data.Time.At);
        }

        public double GetShipDistance(ShipData a, ShipData b)
        {
            return Math.Pow(a.Movement.Position.X - b.Movement.Position.X, 2) + Math.Pow(a.Movement.Position.Y - b.Movement.Position.Y, 2);
        }

        public async Task ActOnCurrentStateAsync(UpdateContext data)
        {
            if (_state == AIState.Wandering)
            {
                await WanderAsync(data);
            }
            else if (_state == AIState.Seeking)
            {
                await SeekAsync(data);
            }
            else if (_state == AIState.Killing)
            {
                await KillAsync(data);
            }
            else if (_state == AIState.GaveUp)
            {
                if ((data.Time.At - _lastStateChangeTime) >= GIVE_UP_DURATION)
                {
                    ChangeState(AIState.Wandering, data.Time.At);
                }
                await WanderAsync(data);
            }
        }

        public async Task WanderAsync(UpdateContext data)
        {
            var movement = data.YourShip.Movement;

            if (!movement.Moving.Forward)
            {
                await _bot.StartMovementAsync(Movement.Forward);
            }

            // Used to convert the calculated ship rotation to a usable 0-360 rotation
            CurrentRotation = ResolveCurrentRotation(data.YourShip);

            // Too close to left side
            if (movement.Position.X - DISTANCE_AWAY_FROM_BOUNDARY < 0 && ((CurrentRotation <= 269 && CurrentRotation >= 91) || TargetRotation != -1))
            {
                await DetermineRotationAsync(data, 180, 270, 359, 0, 90);
            }
            else if (movement.Position.Y - DISTANCE_AWAY_FROM_BOUNDARY < 0 && (CurrentRotation <= 179 || TargetRotation != -1)) // To Close to top
            {
                await DetermineRotationAsync(data, 90, 180, 270, 270, 360);
            }
            else if (movement.Position.X + DISTANCE_AWAY_FROM_BOUNDARY > data.MapWidth && (CurrentRotation <= 91 || CurrentRotation >= 271 || TargetRotation != -1)) // To close to right
            {
                // Crosses origin so we need to calculate in line
                // If we're not already moving away from the boundary
                if (!movement.Moving.RotatingRight && !movement.Moving.RotatingLeft)
                {
                    if (CurrentRotation >= 270) // Rotate Right
                    {
                        await _bot.StopMovementAsync(Movement.RotatingLeft);
                        await _bot.StartMovementAsync(Movement.RotatingRight);
                        TargetRotation = _gen.Next(180, 270);
                    }
                    else if (CurrentRotation <= 90)
                    {
                        await _bot.StopMovementAsync(Movement.RotatingRight);
                        await _bot.StartMovementAsync(Movement.RotatingLeft);
                        TargetRotation = _gen.Next(90, 180);
                    }
                }
                else
                {
                    if (Math.Abs(CurrentRotation - TargetRotation) <= ROTATION_BUFFER)
                    {
                        await _bot.StopMovementAsync(Movement.RotatingLeft);
                        await _bot.StopMovementAsync(Movement.RotatingRight);
                        TargetRotation = -1;
                    }
                }
            }
            else if (movement.Position.Y + DISTANCE_AWAY_FROM_BOUNDARY > data.MapHeight && (CurrentRotation >= 181 || TargetRotation != -1)) // To close to bottom
            {
                await DetermineRotationAsync(data, 270, 90, 180, 0, 90);
            }
            else
            {
                await _bot.StopMovementAsync(Movement.RotatingLeft);
                await _bot.StopMovementAsync(Movement.RotatingRight);
                TargetRotation = -1;
            }
        }

        public async Task SeekAsync(UpdateContext data)
        {
            var movement = data.YourShip.Movement;
            Vector2 otherPosition = null;
            // Grab the position of the ship that i'm seeking
            foreach (var ship in data.OtherShips)
            {
                if (ship.Id == _seekingShip)
                {
                    otherPosition = new Vector2(ship.Movement.Position.X, ship.Movement.Position.Y);
                    break;
                }
            }

            // Calculate angle between me and ship that i'm seeking
            double angle = (Math.Atan2(movement.Position.Y - otherPosition.Y, movement.Position.X - otherPosition.X) * (180 / Math.PI) + 180) % 360;
            angle = Math.Abs(angle - 360);

            var angleDiff = angle - CurrentRotation;
            if (Math.Abs(angleDiff) > 5) // Only adjust movement if we're out of sync
            {
                if (angleDiff > 0 && Math.Abs(angleDiff) <= 180 && !movement.Moving.RotatingLeft)
                {
                    _lastRotationTime = data.Time.At;
                    await _bot.StopMovementAsync(Movement.RotatingRight);
                    await _bot.StartMovementAsync(Movement.RotatingLeft);
                }
                else if (angleDiff > 0 && Math.Abs(angleDiff) > 180 && !movement.Moving.RotatingRight)
                {
                    _lastRotationTime = data.Time.At;
                    await _bot.StopMovementAsync(Movement.RotatingLeft);
                    await _bot.StartMovementAsync(Movement.RotatingRight);
                }
                else if (angleDiff < 0 && Math.Abs(angleDiff) <= 180 && !movement.Moving.RotatingRight)
                {
                    _lastRotationTime = data.Time.At;
                    await _bot.StopMovementAsync(Movement.RotatingLeft);
                    await _bot.StartMovementAsync(Movement.RotatingRight);
                }
                else if (angleDiff < 0 && Math.Abs(angleDiff) > 180 && !movement.Moving.RotatingLeft)
                {
                    _lastRotationTime = data.Time.At;
                    await _bot.StopMovementAsync(Movement.RotatingRight);
                    await _bot.StartMovementAsync(Movement.RotatingLeft);
                }
            }
            else
            {
                await _bot.StartMovementAsync(Movement.Forward);
                await _bot.StopMovementAsync(Movement.RotatingLeft);
                await _bot.StopMovementAsync(Movement.RotatingRight);
            }
        }

        public async Task KillAsync(UpdateContext data)
        {
            await SeekAsync(data);

            if (data.Time.At - _lastFiredTime > FIRE_RATE_AI)
            {
                await _bot.FireAsync();
                _lastFiredTime = data.Time.At;
            }
        }

        public async Task DetermineRotationAsync(UpdateContext data, int centralRotation, int fromRL, int toRL, int fromRR, int toRR)
        {
            var movement = data.YourShip.Movement;
            // If we're not already moving away from the boundary
            if (!movement.Moving.RotatingRight && !movement.Moving.RotatingLeft)
            {
                if (CurrentRotation >= centralRotation) // We want to rotate left
                {
                    await _bot.StopMovementAsync(Movement.RotatingRight);
                    await _bot.StartMovementAsync(Movement.RotatingLeft);
                    TargetRotation = _gen.Next(fromRL, toRL);
                }
                else if (CurrentRotation < centralRotation) // We want to rotate left
                {
                    await _bot.StopMovementAsync(Movement.RotatingLeft);
                    await _bot.StartMovementAsync(Movement.RotatingRight);
                    TargetRotation = _gen.Next(fromRR, toRR);
                }
            }
            else
            {
                if (Math.Abs(CurrentRotation - TargetRotation) <= ROTATION_BUFFER)
                {
                    await _bot.StopMovementAsync(Movement.RotatingLeft);
                    await _bot.StopMovementAsync(Movement.RotatingRight);
                    TargetRotation = -1;
                }
            }
        }
    }
}
