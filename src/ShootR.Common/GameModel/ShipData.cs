namespace ShootR.GameModel
{
    public class ShipData : CollidableData<ShipMovementData>
    {
        public string Name { get; internal set; }
        public double MaxLife { get; internal set; }
        public int Level { get; internal set; }
        public bool UserControlled { get; internal set; }
        public AbilityData Abilities { get; internal set; }

        public int Width { get; internal set; }
        public int Height { get; internal set; }
    }
}
