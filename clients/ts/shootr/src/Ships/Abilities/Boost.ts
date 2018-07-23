import * as eg from "../../../../endgate/endgate";
import { MovementAbility } from "./MovementAbility";
import { ShipMovementController } from "../ShipMovementController";
export class Boost extends MovementAbility {
    public static NAME: string = "Boost";
    public static SPEED_INCREASE: number = 3; // Updated by server configuration value
    public static DURATION: eg.TimeSpan = eg.TimeSpan.FromSeconds(3); // Updated by server configuration value

    constructor(private _movementController: ShipMovementController) {
        super(Boost.NAME, _movementController);

        this.OnStart = new eg.EventHandler();
        this.OnStop = new eg.EventHandler();
    }

    public OnStart: eg.EventHandler;
    public OnStop: eg.EventHandler;

    public Activate(): void {
        this._movementController.StopAllMovement();
        this._movementController.Moving.Forward = true;            
        this._movementController.Controllable = false;

        if (!this.Active) {
            this.MultiplySpeedBy(Boost.SPEED_INCREASE);
            this.OnStart.Trigger();
        }

        super.Activate();
    }

    public Deactivate(): void {
        if (this.Active) {
            this.ResetSpeed();
            super.Deactivate();
            this._movementController.Moving.Forward = false;
            this._movementController.Controllable = true;
            this.OnStop.Trigger();
        }
    }

    public Update(gameTime: eg.GameTime): void {
        if (this.Active && eg.TimeSpan.DateSpan((<Date>this.ActivatedAt), gameTime.Now).Milliseconds >= Boost.DURATION.Milliseconds) {
            this.Deactivate();
        }
    }
}