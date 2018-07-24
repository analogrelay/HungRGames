import * as eg from "../../../endgate/endgate";
import { LatencyResolver } from "./LatencyResolver";
import { ShipInputController } from "../Ships/ShipInputController";
import { UserCameraController } from "./UserCameraController";
import { ShipManager } from "../Ships/ShipManager";
import { Ship } from "../Ships/Ship";
import { MapBoundary } from "../Space/MapBoundary";
import { ShipMovementController } from "../Ships/ShipMovementController";
import { IPayloadData } from "../Server/IPayloadDefinitions";
import { MathRoundTo } from "../../../endgate/Extensions/MathExtensions";
import { ServerAdapter } from "../Server/ServerAdapter";

export class UserShipManager implements eg.IUpdateable {
    public static SYNC_INTERVAL: eg.TimeSpan = eg.TimeSpan.FromSeconds(1.5);

    public LatencyResolver: LatencyResolver;

    private _shipInputController: ShipInputController;
    private _userCameraController: UserCameraController;
    private _lastSync: Date;

    constructor(public ControlledShipId: number, private _shipManager: ShipManager, private _collisionManager: eg.Collision.CollisionManager, input: eg.Input.InputManager, private _camera: eg.Rendering.Camera2d, private _serverAdapter: ServerAdapter) {
        this._userCameraController = new UserCameraController(this.ControlledShipId, this._shipManager, this._camera);
        this._lastSync = new Date();
        this.LatencyResolver = new LatencyResolver(_serverAdapter);

        this._collisionManager.OnCollision.Bind((ship: eg.Collision.Collidable, boundary: eg.Collision.Collidable) => {
            if (ship instanceof Ship && boundary instanceof MapBoundary) {
                if (ship.ID === this.ControlledShipId) {
                    for (var i = ShipMovementController.MOVING_DIRECTIONS.length - 1; i >= 0; i--) {
                        this.Invoke("registerMoveStop", false, this.NewMovementCommand("Forward", false));
                        this.Invoke("registerMoveStop", false, this.NewMovementCommand("Backward", false));
                    }
                }
            }
        });

        this._shipInputController = new ShipInputController(input.Keyboard, (direction: string, startMoving: boolean) => {
            var ship = this._shipManager.GetShip(this.ControlledShipId);

            if (ship && ship.LifeController.Alive) {
                if (startMoving) {
                    if (direction === "Boost" && ship.MovementController.Controllable) {
                        this.Invoke("registerAbilityStart", this.LatencyResolver.TryRequestPing(), this.NewAbilityCommand(direction, true));

                        ship.AbilityHandler.Activate(direction);
                        // Don't want to trigger a server command if we're already moving in the direction
                    } else if (!ship.MovementController.IsMovingInDirection(direction) || !ship.MovementController.Controllable) {
                        if (ship.MovementController.Controllable) {
                            this.Invoke("registerMoveStart", this.LatencyResolver.TryRequestPing(), this.NewMovementCommand(direction, true));
                        }

                        ship.MovementController.Move(direction, startMoving);
                    }
                } else {
                    // Don't want to trigger a server command if we're already moving in the direction
                    if (ship.MovementController.IsMovingInDirection(direction)) {
                        this.Invoke("registerMoveStop", this.LatencyResolver.TryRequestPing(), this.NewMovementCommand(direction, false));
                    }
                    ship.MovementController.Move(direction, startMoving);
                }
            }
        }, (fireMethod: string) => {
                var hubMethod: string = fireMethod.substr(0, 1).toUpperCase() + fireMethod.substring(1);

                this._serverAdapter.InvokeIfConnected(hubMethod);
            });
    }

    public LoadPayload(payload: IPayloadData): void {
        var ship: Ship = this._shipManager.GetShip(this.ControlledShipId);

        if (ship) {
            ship.LevelManager.UpdateExperience(payload.Experience, payload.ExperienceToNextLevel);
        }
    }

    public Update(gameTime: eg.GameTime): void {
        var ship = this._shipManager.GetShip(this.ControlledShipId);

        if (ship) {
            if (eg.TimeSpan.DateSpan(this._lastSync, gameTime.Now).Seconds > UserShipManager.SYNC_INTERVAL.Seconds && ship.LifeController.Alive) {
                this._lastSync = gameTime.Now;
                this._serverAdapter.InvokeIfConnected("syncMovement", { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, MathRoundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) });
            }

            this._userCameraController.Update(gameTime);
        }
    }

    private Invoke(method: string, pingBack: boolean, command: IShipCommand): void {
        var ship: Ship = this._shipManager.GetShip(this.ControlledShipId);

        this._serverAdapter.InvokeIfConnected(method, command.Command, { X: Math.round(ship.MovementController.Position.X - ship.Graphic.Size.HalfWidth), Y: Math.round(ship.MovementController.Position.Y - ship.Graphic.Size.HalfHeight) }, MathRoundTo(ship.MovementController.Rotation * 57.2957795, 2), { X: Math.round(ship.MovementController.Velocity.X), Y: Math.round(ship.MovementController.Velocity.Y) }, pingBack);
    }

    private NewMovementCommand(direction: string, startMoving: boolean): IShipCommand {
        var command: IShipCommand = {
            Command: direction,
            Start: startMoving,
            IsAbility: false
        };

        return command;
    }

    private NewAbilityCommand(ability: string, startMoving: boolean): IShipCommand {
        var command: IShipCommand = {
            Command: ability,
            Start: startMoving,
            IsAbility: true
        };

        return command;
    }
}

interface IShipCommand {
    Command: string;
    Start: boolean;
    IsAbility: boolean;
}
