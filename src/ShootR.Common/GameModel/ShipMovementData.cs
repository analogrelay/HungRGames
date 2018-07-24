namespace ShootR.GameModel
{
    public class ShipMovementData : MovementData
    {
        public static readonly Vector2 FacingVector = new Vector2(1.0, 0.0);

        public MovingFlags Moving { get; internal set; }

        /// <summary>
        /// Gets a unit vector representing the direction the ship is facing.
        /// </summary>
        public Vector2 Facing => RotationHelper.RotateVector(FacingVector, Rotation);
    }
}
