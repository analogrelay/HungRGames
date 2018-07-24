namespace ShootR.GameModel
{
    public class MovementData
    {
        public Vector2 Forces { get; internal set; }
        public double Mass { get; internal set; }
        public double Rotation { get; internal set; }
        public Vector2 Position { get; internal set; }
        public Vector2 Velocity { get; internal set; }
    }
}
