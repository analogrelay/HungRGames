import { Game } from "../Game";
import { RateMonitor } from "./RateMonitor";
import { GameInformer } from "./GameInformer";
import { IGameConfiguration } from "../Server/IConfigurationDefinitions";
import { IPayloadData } from "../Server/IPayloadDefinitions";

export class PayloadRate extends RateMonitor {
    public static TITLE: string = "Payload Rate"

    constructor(informer: GameInformer) {
        super(PayloadRate.TITLE, informer, 1000 / (<IGameConfiguration>Game.GameConfiguration.gameConfig).DRAW_INTERVAL);
    }

    public LoadPayload(payload: IPayloadData): void {
        this.MarkRate();
    }
}