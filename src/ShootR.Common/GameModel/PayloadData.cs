using System.Collections.Generic;

namespace ShootR.GameModel
{
    public class PayloadData
    {
        public IReadOnlyCollection<ShipData> Ships { get; internal set; }
        public IReadOnlyCollection<BulletData> Bullets { get; internal set; }
        public IReadOnlyCollection<PowerupData> Powerups { get; internal set; }

        public int Experience { get; internal set; }
        public int ExperienceToNextLevel { get; internal set; }

        public int LeaderboardPosition { get; internal set; }
        public int Kills { get; internal set; }
        public int Deaths { get; internal set; }

        public string KilledByName { get; internal set; }
        public string KilledByPhoto { get; internal set; }
    }
}
