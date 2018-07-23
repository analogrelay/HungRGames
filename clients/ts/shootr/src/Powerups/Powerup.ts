import * as eg from "../../../endgate/endgate";
import { IPowerupData } from "../Server/IPayloadDefinitions";

export class Powerup extends eg.Collision.Collidable {
    public ID: number;
    public Graphic: eg.Graphics.Graphic2d;

    private _destroyed: boolean;

    constructor(payload: IPowerupData, graphic: eg.Graphics.Graphic2d) {
        super(graphic.GetDrawBounds());

        this.ID = payload.ID;
        this.Graphic = graphic;
        this._destroyed = false;
    }

    public LoadPayload(payload: IPowerupData): void {
        this.Bounds.Position = this.Graphic.Position = payload.MovementController.Position;
    }

    public Update(gameTime: eg.GameTime): void {
    }

    public Destroy(): void {
        if (!this._destroyed) {
            this._destroyed = true;

            this.Dispose();
            this.Graphic.Dispose();
        }
    }
}