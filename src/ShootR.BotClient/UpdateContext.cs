using System;
using ShootR.GameModel;

namespace ShootR.BotClient
{
    public class UpdateContext
    {
        internal UpdateContext(PayloadTime lastPayloadTime, PayloadData payload, InitializationData initializationData)
        {
            Time = lastPayloadTime == null ? new PayloadTime() : new PayloadTime(lastPayloadTime.At);

            Payload = payload;
            
            // TODO: Update map width and height on map resize.
            MapWidth = initializationData.Configuration.MapConfiguration.WIDTH;
            MapHeight = initializationData.Configuration.MapConfiguration.HEIGHT;

            foreach (var ship in payload.Ships)
            {
                if (ship.Id == initializationData.ShipID)
                {
                    YourShip = ship;
                    break;
                }
            }
        }

        public PayloadData Payload { get; }

        public ShipData YourShip { get; }

        public int MapWidth { get; }

        public int MapHeight { get; }

        public int ViewportWidth { get; } = 600;

        public int ViewportHeight { get; } = 600;

        public PayloadTime Time { get; }
    }
}
