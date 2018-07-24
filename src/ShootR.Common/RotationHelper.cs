using System;
using ShootR.GameModel;

namespace ShootR
{
    public static class RotationHelper
    {
        public static Vector2 RotateVector(Vector2 vector, double rotation)
        {
            return new Vector2(
                x: vector.X * Math.Cos(rotation) - vector.Y * Math.Sin(rotation),
                y: vector.X * Math.Sin(rotation) + vector.Y * Math.Cos(rotation));
        }
    }
}
