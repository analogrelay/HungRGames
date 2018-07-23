import * as eg from "../../../endgate/endgate";
import { LifeController } from "../Common/LifeController";
import { IShipData } from "../Server/IPayloadDefinitions";

export class ShipLifeController extends LifeController {
    public static START_LIFE: number = 100;
    public static BAD_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#ED1E79");
    public static HURT_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#FF931E");
    public static GOOD_COLOR: eg.Graphics.Color = eg.Graphics.Color.FromHex("#7AC943");
    public static BAD_THRESHOLD: number = .3;
    public static HURT_THRESHOLD: number = .6;

    constructor(payload: IShipData) {
        super(payload.LifeController.Health, payload.MaxLife);
    }
}