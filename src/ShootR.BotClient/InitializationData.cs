using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace ShootR.BotClient
{
    internal class InitializationData
    {
        public JObject CompressionContracts { get; set; }

        public ServerConfiguration Configuration { get; set; }

        public int ShipID { get; set; }

        public string ShipName { get; set; }

        public bool ServerFull { get; set; }

        /*
        UserInformation: IUserInformation;
         */
    }
}
