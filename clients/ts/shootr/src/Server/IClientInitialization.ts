import { IUserInformation } from "./IUserInformation";
import { IConfigurationManager } from "./IConfigurationDefinitions";

export interface IClientInitialization {
    Configuration: IConfigurationManager;
    ServerFull: boolean;
    CompressionContracts: any;
    ShipID: number;
    ShipName: string;
    UserInformation: IUserInformation;
}