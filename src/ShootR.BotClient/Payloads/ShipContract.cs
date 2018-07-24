namespace ShootR.BotClient.Payloads
{
    internal class ShipContract
    {
        public short RotatingLeft { get; set; }
        public short RotatingRight { get; set; }
        public short Forward { get; set; }
        public short Backward { get; set; }
        public short Name { get; set; }
        public short MaxLife { get; set; }
        public short Level { get; set; }
        public short Boost { get; set; }
    }
}
