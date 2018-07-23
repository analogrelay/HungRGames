import { AreaRenderer } from "../Space/AreaRenderer";
import { UserShipManager } from "../User/UserShipManager";
import { IPayloadData } from "../Server/IPayloadDefinitions";
import { Ship } from "../Ships/Ship";

export class EnvironmentMonitor {
    private _latency: JQuery = $("#Latency");
    private _worldTargets: JQuery = $("#WorldTargets");
    private _worldBullets: JQuery = $("#WorldBullets");
    private _area: JQuery = $("#Area");

    constructor(private _areaRenderer: AreaRenderer, private _userShipManager: UserShipManager | undefined) { }

    public LoadPayload(payload: IPayloadData): void {
        if (this._userShipManager) {
            this._latency[0].innerHTML = this._userShipManager.LatencyResolver.Latency;
        }
        this._worldBullets[0].innerHTML = payload.BulletsInWorld.toString();
        this._worldTargets[0].innerHTML = payload.ShipsInWorld.toString();
    }

    public Update(ship: Ship): void {
        this._area[0].innerHTML = this._areaRenderer.AreaFromPosition(ship.MovementController.Position).toString();
    }
}