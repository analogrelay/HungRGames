using System.Collections.Generic;

namespace ShootR.GameModel
{
    public class PayloadData
    {
        public IReadOnlyCollection<ShipData> Ships { get; private set; }
        public IReadOnlyCollection<BulletData> Bullets { get; private set; }
        public IReadOnlyCollection<PowerupData> Powerups { get; private set; }

        public int Experience { get; private set; }
        public int ExperienceToNextLevel { get; private set; }

        public int LeaderboardPosition { get; private set; }
        public int Kills { get; private set; }
        public int Deaths { get; private set; }

        public string KilledByName { get; private set; }
        public string KilledByPhoto { get; private set; }
    }

    public class PowerupData
    {
        public int Id { get; private set; }
        public PowerupType Type { get; private set; }
        public LifeData Life { get; private set; }
        public MovementData Movement { get; private set; }
        public bool Disposed { get; private set; }
    }

    public class BulletData : CollidableData
    {
        public int DamangeDealt { get; private set; }
    }

    public class ShipData : CollidableData
    {
        public string Name { get; private set; }
        public int MaxLive { get; private set; }
        public int Level { get; private set; }
        public bool UserControlled { get; private set; }
        public AbilityData Abilities { get; private set; }
        public new ShipMovementData Movement
        {
            get => (ShipMovementData)base.Movement;
            protected set => base.Movement = value;
        }
    }

    public class ShipMovementData : MovementData
    {
        public MovementFlags Moving { get; private set; }
    }

    public enum MovementFlags
    {
        RotatingLeft = 1 << 0,
        RotatingRight = 1 << 1,
        Forward = 1 << 2,
        Backward = 1 << 3,
    }

    public class AbilityData
    {
        public bool Boost { get; private set; }
    }

    public abstract class CollidableData
    {
        public int Id { get; private set; }
        public bool Collided { get; private set; }
        public bool Disposed { get; private set; }

        public LifeData Life { get; private set; }
        public MovementData Movement { get; protected set; }
    }

    public class MovementData
    {
        public Vector2d Forces { get; private set; }
        public int Mass { get; private set; }
        public int Rotation { get; private set; }
        public Vector2d Position { get; private set; }
        public Vector2d Velocity { get; private set; }
    }

    public class LifeData
    {
        public bool Alive { get; private set; }
        public int Health { get; private set; }
    }
}
