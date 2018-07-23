import * as eg from "../../../endgate/endgate";
import { UserShipManager } from "../User/UserShipManager";
import { Ship } from "./Ship";
import { IPayloadData, IShipData } from "../Server/IPayloadDefinitions";

export class ShipManager implements eg.IUpdateable {
    public UserShipManager: UserShipManager | undefined;

    private _ships: { [id: number]: Ship };

    constructor(private _viewport: eg.Bounds.BoundingRectangle, private _scene: eg.Rendering.Scene2d, private _collisionManager: eg.Collision.CollisionManager, private _contentManager: eg.Content.ContentManager) {
        this._ships = {};
    }

    public Initialize(userShipManager: UserShipManager): void {
        this.UserShipManager = userShipManager;
    }

    public UpdateViewport(viewport: eg.Size2d): void {
        this._viewport.Size = viewport;
    }

    public GetShip(id: number): Ship {
        return this._ships[id];
    }

    public RemoveShip(shipID: number): void {
        delete this._ships[shipID];
    }

    public LoadPayload(payload: IPayloadData): void {
        var shipPayload: Array<IShipData> = payload.Ships,
            ship: IShipData;

        for (var i = 0; i < shipPayload.length; i++) {
            ship = shipPayload[i];

            if (!this._ships[ship.ID]) {
                if (this.UserShipManager && ship.ID === this.UserShipManager.ControlledShipId) {
                    ship.UserControlled = true;
                } else {
                    ship.UserControlled = false;
                }

                this._ships[ship.ID] = new Ship(ship, this._contentManager);
                this._collisionManager.Monitor(this._ships[ship.ID]);
                this._scene.Add(this._ships[ship.ID].Graphic);

                this._ships[ship.ID].OnDisposed.Bind((ship) => {
                    delete this._ships[(<Ship>ship).ID];
                });
            } else {
                this._ships[ship.ID].LoadPayload(ship);
            }

            if (ship.Disposed) {
                this._ships[ship.ID].Destroy(!ship.LifeController.Alive);
            }
        }

        if (this.UserShipManager) {
            this.UserShipManager.LoadPayload(payload);
        }
    }

    public Update(gameTime: eg.GameTime): void {
        // Update positions first
        for (var id in this._ships) {
            this._ships[id].Update(gameTime);
        }

        if (this.UserShipManager) {
            this.UserShipManager.Update(gameTime);
        }

        // Check for "in-bounds" to see what ships we should destroy
        for (var id in this._ships) {
            if (!this._ships[id].Bounds.IntersectsRectangle(this._viewport)) {
                this._ships[id].Destroy();
            }
        }
    }
}
