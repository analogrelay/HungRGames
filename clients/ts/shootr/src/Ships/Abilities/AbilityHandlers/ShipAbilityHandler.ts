import * as eg from "../../../../../endgate/endgate";
import { AbilityHandler } from "./AbilityHandler";
import { Boost } from "../Boost";
import { MapBoundary } from "../../../Space/MapBoundary";
import { IAbilityData } from "../../../Server/IPayloadDefinitions";
import { Ship } from "../../Ship";

export class ShipAbilityHandler extends AbilityHandler {
    public Boost: Boost;

    constructor(myShip: Ship) {
        var boost: Boost = new Boost(myShip.MovementController);
        super([boost]);

        this.Boost = boost;

        myShip.OnCollision.Bind((data: eg.Collision.CollisionData) => {
            if (data.With instanceof MapBoundary) {
                this.Boost.Deactivate();
            }
        });
    }

    public LoadPayload(payload: IAbilityData): void {
        if (payload.Boost && !this.Boost.Active) {
            this.Boost.Activate();
        } else if (!payload.Boost) {
            this.Boost.Deactivate();
        }
    }
}