using ShootR.GameModel;

namespace ShootR.BotClient
{
    public class UpdateContext
    {
        internal UpdateContext(PayloadData payload, InitializationData initializationData)
        {
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
    }
}
