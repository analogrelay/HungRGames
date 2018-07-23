import * as eg from "../../../endgate/endgate";
import { IShipData } from "../Server/IPayloadDefinitions";
import { ShipGraphic } from "./Graphics/ShipGraphic";
import { ShipMovementController } from "./ShipMovementController";
import { ShipAbilityHandler } from "./Abilities/AbilityHandlers/ShipAbilityHandler";
import { ShipAnimationHandler } from "./Animations/ShipAnimationHandler";
import { ShipLifeController } from "./ShipLifeController";
import { ShipLevelManager } from "./Levels/ShipLevelManager";

export class Ship extends eg.Collision.Collidable {
    public static SIZE: eg.Size2d = new eg.Size2d(75);
    public static DAMAGE_INCREASE_RATE: number = .1;

    public ID: number;
    public Graphic: ShipGraphic;
    public MovementController: ShipMovementController;
    public AbilityHandler: ShipAbilityHandler;
    public AnimationHandler: ShipAnimationHandler;
    public LifeController: ShipLifeController;
    public LevelManager: ShipLevelManager;

    private _destroyed: boolean;

    constructor(payload: IShipData, contentManager: eg.Content.ContentManager) {
        super();
        this._destroyed = false;
        this.OnExplosion = new eg.EventHandler();

        this.ID = -1;

        this.LifeController = new ShipLifeController(payload);
        this.LevelManager = new ShipLevelManager(payload);

        this.Graphic = new ShipGraphic(payload.Name, !!payload.UserControlled, this.LevelManager, this.LifeController, payload.MovementController.Position, payload.MovementController.Rotation, Ship.SIZE, contentManager);

        // Going to use the rectangle to "hold" all the other graphics
        this.Bounds = this.Graphic.GetDrawBounds();

        this.MovementController = new ShipMovementController(new Array<eg.IMoveable>(this.Bounds, this.Graphic));
        this.MovementController.UserControlled = !!payload.UserControlled;

        this.AbilityHandler = new ShipAbilityHandler(this);
        this.AnimationHandler = new ShipAnimationHandler(this, contentManager);

        this.LoadPayload(payload, true);

        this.Graphic.RotateShip(this.MovementController.Rotation);
    }

    public OnExplosion: eg.EventHandler;

    public Update(gameTime: eg.GameTime): void {
        this.AbilityHandler.Update(gameTime);
        this.MovementController.Update(gameTime);
        this.AnimationHandler.Update(gameTime);

        // Updates rotation
        this.Graphic.RotateShip(this.MovementController.Rotation);
        this.Graphic.Update(gameTime);
    }

    public LoadPayload(payload: IShipData, forceMovement?: boolean): void {
        this.ID = payload.ID;
        this.MovementController.LoadPayload(payload.MovementController, forceMovement);
        this.LifeController.LoadPayload(payload);
        this.LevelManager.LoadPayload(payload);
        this.AbilityHandler.LoadPayload(payload.Abilities);
    }

    public Destroy(explode: boolean = false): void {
        if (!this._destroyed) {
            this._destroyed = true;

            this.MovementController.Dispose();

            if (!explode) {
                this.Graphic.Dispose();
                this.Dispose();
            } else {
                // We rely on the completion of the explosion to finish disposing the bounds and graphic
                this.OnExplosion.Trigger();
            }
        }
    }
}