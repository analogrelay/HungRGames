using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace ShootR.BotClient
{
    internal class ServerConfiguration
    {
        [JsonProperty("shipConfig")]
        public ShipConfiguration ShipConfiguration { get; set; }

        [JsonProperty("healthPackConfig")]
        public HealthPackConfiguration HealthPackConfiguration { get; set; }

        [JsonProperty("bulletConfig")]
        public BulletConfiguration BulletConfiguration { get; set; }

        [JsonProperty("mapConfig")]
        public MapConfiguration MapConfiguration { get; set; }
    }
}
