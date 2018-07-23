import * as eg from "../../../endgate/endgate";
import { Ship } from "../Ships/Ship";
import { IShipData } from "../Server/IPayloadDefinitions";

export class ServerGhost implements eg.IUpdateable {
    private _ghost: Ship | undefined;

    constructor(private _myShipId: number, private _scene: eg.Rendering.Scene2d, private _content: eg.Content.ContentManager) {
    }

    public LoadPayload(payload: Array<IShipData>): void {
        var shipPayload: IShipData;

        for (var i = 0; i < payload.length; i++) {
            shipPayload = payload[i];

            if (shipPayload.ID === this._myShipId) {
                if (!this._ghost) {
                    this._ghost = new Ship(shipPayload, this._content);
                    this._ghost.MovementController.UserControlled = false;
                    this._ghost.Graphic.Body.Opacity = .5;
                    this._scene.Add(this._ghost.Graphic);
                } else {
                    this._ghost.LoadPayload(shipPayload);
                }
            }
        }
    }

    public Update(gameTime: eg.GameTime): void {
        if (this._ghost) {
            this._ghost.Update(gameTime);
        }
    }
}