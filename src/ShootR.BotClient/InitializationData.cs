using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace ShootR.BotClient
{
    public class InitializationData
    {
        public InitializationData(JObject compressionContracts)
        {
            if (compressionContracts == null)
            {
                throw new ArgumentNullException(nameof(compressionContracts));
            }

            CompressionContracts = compressionContracts;
        }

        public JObject CompressionContracts { get; }
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
