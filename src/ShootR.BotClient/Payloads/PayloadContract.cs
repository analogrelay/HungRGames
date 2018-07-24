using System;
using System.Collections.Generic;
using System.Text;

namespace ShootR.BotClient.Payloads
{
    internal class PayloadContract
    {
        public short Ships { get; set; }
        public short LeaderboardPosition { get; set; }
        public short Bullets { get; set; }
        public short ShipsInWorld { get; set; }
        public short BulletsInWorld { get; set; }
        public short Experience { get; set; }
        public short ExperienceToNextLevel { get; set; }
        public short Notification { get; set; }
        public short LastCommandProcessed { get; set; }
        public short Kills { get; set; }
        public short Deaths { get; set; }
        public short Powerups { get; set; }
        public short KilledByName { get; set; }
        public short KilledByPhoto { get; set; }
    }
}
