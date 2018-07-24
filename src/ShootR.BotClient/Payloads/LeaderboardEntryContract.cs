namespace ShootR.BotClient.Payloads
{
    internal class LeaderboardEntryContract
    {
        public short Name { get; set; }
        public short Photo { get; set; }
        public short ID { get; set; }
        public short Level { get; set; }
        public short Kills { get; set; }
        public short Deaths { get; set; }
    }
}
