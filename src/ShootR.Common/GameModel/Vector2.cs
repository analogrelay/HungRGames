using System;

namespace ShootR.GameModel
{
    public class Vector2
    {
        public static readonly Vector2 North = new Vector2(0, -1);
        public static readonly Vector2 East = new Vector2(1, 0);
        public static readonly Vector2 South = new Vector2(0, 1);
        public static readonly Vector2 West = new Vector2(-1, 0);

        public Vector2(double x, double y)
        {
            X = x;
            Y = y;
        }

        public double X { get; }
        public double Y { get; }

        public double Length => Math.Sqrt(X * X + Y * Y);

        public double Distance(Vector2 vector) => (vector - this).Length;

        public static Vector2 operator *(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
        }

        public static Vector2 operator *(Vector2 v1, double num)
        {
            return new Vector2(v1.X * num, v1.Y * num);
        }

        public static Vector2 operator *(double num, Vector2 v1)
        {
            return new Vector2(v1.X * num, v1.Y * num);
        }

        public static Vector2 operator /(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
        }

        public static Vector2 operator /(Vector2 v1, double num)
        {
            return new Vector2(v1.X / num, v1.Y / num);
        }

        public static Vector2 operator /(double num, Vector2 v1)
        {
            return new Vector2(num / v1.X, num / v1.Y);
        }

        public static Vector2 operator +(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
        }

        public static Vector2 operator +(Vector2 v1, double num)
        {
            return new Vector2(v1.X + num, v1.Y + num);
        }

        public static Vector2 operator +(double num, Vector2 v1)
        {
            return new Vector2(v1.X + num, v1.Y + num);
        }

        public static Vector2 operator -(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
        }

        public static Vector2 operator -(Vector2 v1, double num)
        {
            return new Vector2(v1.X - num, v1.Y - num);
        }

        public static Vector2 operator -(double num, Vector2 v1)
        {
            return new Vector2(num - v1.X, num - v1.Y);
        }

        public static double DotProduct(Vector2 left, Vector2 right)
        {
            return (left.X * right.X) + (left.Y * right.Y);
        }

        public override string ToString()
        {
            return "( " + X + " , " + Y + " )";
        }
    }
}
