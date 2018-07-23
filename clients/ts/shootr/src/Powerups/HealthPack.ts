import * as eg from "../../../endgate/endgate";
import { Powerup } from "./Powerup";
import { IPowerupData } from "../Server/IPayloadDefinitions";
import { HealthPackGraphic } from "./Graphics/HealthPackGraphic";

export class HealthPack extends Powerup {
    public static SIZE: eg.Size2d = new eg.Size2d(50);
    public static LIFE_SPAN: eg.TimeSpan = eg.TimeSpan.FromSeconds(6);

    private _spawnedAt: Date;

    constructor(payload: IPowerupData, contentManager: eg.Content.ContentManager) {
        super(payload, new HealthPackGraphic(payload.MovementController.Position, contentManager));

        this._spawnedAt = new Date();            
    }

    public Update(gameTime: eg.GameTime): void {
        if (eg.TimeSpan.DateSpan(this._spawnedAt, gameTime.Now).Milliseconds >= HealthPack.LIFE_SPAN.Milliseconds) {
            this.Destroy();
            return;
        }

        (<HealthPackGraphic>this.Graphic).Update(gameTime);
    }
}