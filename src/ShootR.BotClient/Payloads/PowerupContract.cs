namespace ShootR.BotClient.Payloads
{
    internal class PowerupContract
    {
        public short PositionX { get; set; }
        public short PositionY { get; set; }
        public short ID { get; set; }
        public short Disposed { get; set; }
        public short Type { get; set; }
    }
}
