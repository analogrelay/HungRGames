using System;

namespace ShootR.BotClient
{
    public class PayloadTime
    {
        public PayloadTime()
        {
            At = DateTime.UtcNow;
            PercentOfSecond = 0;
            Elapsed = TimeSpan.Zero;
        }

        public PayloadTime(DateTime previousPayloadAt)
        {
            At = DateTime.UtcNow;
            PercentOfSecond = (At.Subtract(previousPayloadAt.ToUniversalTime()).Milliseconds / 1000.0);
            Elapsed = At - previousPayloadAt;
        }

        public DateTime At { get; }

        /// <summary>
        /// This is updated on Update to show what percent of a second has passed since the last Update loop.
        /// </summary>
        public double PercentOfSecond { get; }

        public TimeSpan Elapsed { get; }
    }
}
