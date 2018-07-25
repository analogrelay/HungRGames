using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ShootR.BotClient;
using ShootR.Common.GameModel;

namespace ShootR.Bots.DerpyHooves
{
    public class AttitudeController
    {
        private readonly DerpyHoovesBot _bot;

        public double? TargetRotation { get; set; }
        public double Threshold { get; set; } = Math.PI / 32;

        public bool HasArrived {get; set;}

        public AttitudeController(DerpyHoovesBot bot)
        {
            _bot = bot;
        }

        public async Task UpdateAsync(UpdateContext context)
        {
            if (TargetRotation == null)
            {
                return;
            }

            // Are we facing our target?
            var ourRotation = context.YourShip.Movement.CorrectedRotation;
            if (Math.Abs(TargetRotation.Value - ourRotation) <= Threshold)
            {
                // We're good enough
                HasArrived = true;
                await StopRotationAsync(context);
            }
            else
            {
                HasArrived = false;
                // We're not facing the right way, figure out which direction is closer
                var direction = RotationHelper.ClosestRotation(context.YourShip.Movement.CorrectedRotation, TargetRotation.Value);
                if (direction == Movement.RotatingLeft && !context.YourShip.Movement.Moving.RotatingLeft)
                {
                    await _bot.Client.StartAndStopMovementAsync(Movement.RotatingRight, Movement.RotatingLeft);
                }
                else if (direction == Movement.RotatingRight && !context.YourShip.Movement.Moving.RotatingRight)
                {
                    await _bot.Client.StartAndStopMovementAsync(Movement.RotatingLeft, Movement.RotatingRight);
                }
            }
        }

        private async Task StopRotationAsync(UpdateContext context)
        {
            await _bot.Client.StopMovementAsync(Movement.RotatingLeft);
            await _bot.Client.StopMovementAsync(Movement.RotatingRight);
        }
    }
}
