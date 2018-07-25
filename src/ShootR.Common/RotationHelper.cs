using System;
using ShootR.Common.GameModel;
using ShootR.GameModel;

namespace ShootR
{
    public static class RotationHelper
    {
        public static readonly double TwoPI = 2 * Math.PI;

        public static Vector2 RotateVector(Vector2 target, double θ)
        {
            var cosθ = Math.Cos(θ);
            var sinθ = Math.Sin(θ);

            return new Vector2(
                cosθ * target.X - sinθ * target.Y,
                sinθ * target.X + cosθ * target.Y);
        }

        public static Vector2 GetRotationVector(double θ)
        {
            return new Vector2(Math.Cos(θ), Math.Sin(θ));
        }

        public static double GetAngle(Vector2 start, Vector2 target)
        {
            var dotProduct = Vector2.DotProduct(target, start);
            var cosθ = dotProduct / (target.Length * start.Length);
            var θ = Math.Acos(cosθ);

            // We need to add PI to our angle (mod 2PI) to reflect it since our coordinate system is flipped
            return (θ + Math.PI) % TwoPI;
        }

        public static Movement ClosestRotation(double currentRotation, double targetRotation)
        {
            var angleDifference = targetRotation - currentRotation;

            if (Math.Abs(angleDifference) > Math.PI)
            {
                // The angle is more than PI radians away, so we should turn the other way.
                return angleDifference < 0 ?
                    Movement.RotatingRight :
                    Movement.RotatingLeft;
            }
            else
            {
                return angleDifference < 0 ?
                    Movement.RotatingLeft :
                    Movement.RotatingRight;
            }
        }
    }
}
