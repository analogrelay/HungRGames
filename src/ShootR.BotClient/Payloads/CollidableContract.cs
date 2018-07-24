namespace ShootR.BotClient.Payloads
{
    internal class CollidableContract
    {
        public short Collided { get; set; }
        public short CollidedAtX { get; set; }
        public short CollidedAtY { get; set; }
        public short ForcesX { get; set; }
        public short ForcesY { get; set; }
        public short Mass { get; set; }
        public short PositionX { get; set; }
        public short PositionY { get; set; }
        public short Rotation { get; set; }
        public short VelocityX { get; set; }
        public short VelocityY { get; set; }
        public short ID { get; set; }
        public short Disposed { get; set; }
        public short Alive { get; set; }
        public short Health { get; set; }
    }
}
