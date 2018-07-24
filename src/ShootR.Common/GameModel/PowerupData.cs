namespace ShootR.GameModel
{
    public class PowerupData
    {
        public int Id { get; internal set; }
        public PowerupType Type { get; internal set; }
        public LifeData Life { get; internal set; }
        public MovementData Movement { get; internal set; }
        public bool Disposed { get; internal set; }
    }
}
