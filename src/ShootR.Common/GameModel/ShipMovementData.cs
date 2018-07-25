namespace ShootR.GameModel
{
    public class ShipMovementData : MovementData
    {
        public static readonly Vector2 NormalFacing = new Vector2(1, 0);

        public MovingFlags Moving { get; internal set; }

        public Vector2 Facing => RotationHelper.RotateVector(NormalFacing, CorrectedRotation);
    }
}
