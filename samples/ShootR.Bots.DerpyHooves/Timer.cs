using System;

namespace ShootR.Bots.DerpyHooves
{
    internal class Timer
    {
        public TimeSpan Duration { get; }
        public TimeSpan Elapsed { get; private set; }

        public bool HasElapsed => Elapsed > Duration;

        public Timer(TimeSpan duration)
        {
            Duration = duration;
            Reset();
        }

        public void Reset()
        {
            Elapsed = TimeSpan.Zero;
        }

        public void Update(GameTime gameTime)
        {
            Elapsed += gameTime.Elapsed;
        }
    }
}
