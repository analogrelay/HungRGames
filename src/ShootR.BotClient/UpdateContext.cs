using System;
using System.Collections.Generic;
using System.Linq;
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

            YourShip = payload.Ships.Single(s => s.Id == initializationData.ShipID);
            OtherShips = payload.Ships.Where(s => s.Id != initializationData.ShipID);
        }

        public PayloadData Payload { get; }

        public ShipData YourShip { get; }

        public IEnumerable<ShipData> OtherShips { get; }

        public int MapWidth { get; }

        public int MapHeight { get; }

        public int ViewportWidth { get; } = 600;

        public int ViewportHeight { get; } = 600;

        public PayloadTime Time { get; }
    }
}
