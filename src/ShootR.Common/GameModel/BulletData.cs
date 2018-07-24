namespace ShootR.GameModel
{
    public class BulletData : CollidableData<MovementData>
    {
        public int DamangeDealt { get; internal set; }

        public int Width { get; internal set; }

        public int Height { get; internal set; }
    }
}
