namespace ShootR.GameModel
{
    public class CollidableData<TMovementData> where TMovementData : MovementData
    {
        public int Id { get; internal set; }
        public bool Collided { get; internal set; }
        public Vector2 CollidedAt { get; internal set; }
        public bool Disposed { get; internal set; }

        public LifeData Life { get; internal set; }
        public TMovementData Movement { get; internal set; }
    }
}
