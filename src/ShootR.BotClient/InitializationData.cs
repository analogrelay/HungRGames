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

        /*
        Configuration: IConfigurationManager;
        ServerFull: boolean;
        CompressionContracts: any;
        ShipID: number;
        ShipName: string;
        UserInformation: IUserInformation;
         */
    }
}
