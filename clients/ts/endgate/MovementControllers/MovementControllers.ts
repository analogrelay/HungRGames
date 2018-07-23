import { Vector2d } from "../Assets/Vectors/Vector2d";
import { IMoveable } from "../Interfaces/IMoveable";
import { EventHandler1 } from "../Utilities/EventHandler1";
import { IUpdateable } from "../Interfaces/IUpdateable";
import { GameTime } from "../GameTime";
import { NoopTripInvoker } from "../Utilities/NoopTripInvoker";

export module MovementControllers {

    /**
* Represents a move event object that is used to depict a movement, specifically a direction and whether or not the move started or stopped.
*/
    export interface IMoveEvent {
        /**
        * The movement direction.
        */
        Direction: string;
        /**
        * Whether or not the move started or stopped.
        */
        StartMoving: boolean;
    }

    /**
* Defines a direction management object that represents directional state.
*/
    export class LinearDirections {
        /**
        * Indicates whether the object is moving left.
        */
        public Left: boolean;
        /**
        * Indicates whether the object is moving right.
        */
        public Right: boolean;
        /**
        * Indicates whether the object is moving up.
        */
        public Up: boolean;
        /**
        * Indicates whether the object is moving down.
        */
        public Down: boolean;

        /**
        * Creates a new instance of the LinearDirection object with all directions= indicators initially set to false.
        */
        constructor() {
            this.Left = false;
            this.Right = false;
            this.Up = false;
            this.Down = false;
        }
    }


    /**
* Abstract class that holds moveable objects and synchronizes positions across them.
*/
    export class MovementController implements IMoveable, IUpdateable {
        /**
        * Gets or sets the position of the MovementController
        */
        public Position: Vector2d;
        /**
        * Gets or sets the velocity of the MovementController.
        */
        public Velocity: Vector2d;
        /**
        * Gets or sets the rotation of the MovementController
        */
        public Rotation: number;
        public _frozen: boolean;
        private _moveables: IMoveable[];

        /**
        * Should only ever be called by derived classes.
        * @param moveables Moveable objects to synchronize.
        */
        constructor(moveables: IMoveable[]) {
            this.Position = moveables.length > 0 ? moveables[0].Position : Vector2d.Zero;
            this.Velocity = Vector2d.Zero;
            this.Rotation = 0;
            this._frozen = false;

            this._moveables = moveables;
        }

        /**
        * Prevents the MovementController from updating object locations.
        */
        public Freeze(): void {
            this._frozen = true;
        }

        /**
        * Used to re-enable movement within the MovementController.
        */
        public Thaw(): void {
            this._frozen = false;
        }

        /**
        * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
        */
        public IsMoving(): boolean {
            return !this._frozen && !this.Velocity.IsZero();
        }

        /**
        * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            // Sync moveables position and rotation
            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;
                this._moveables[i].Rotation = this.Rotation;
            }
        }
    }

    /**
* Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
*/
    export class LinearMovementController extends MovementController {
        private _moveSpeed: number;
        private _moving: LinearDirections;
        private _rotationUpdater: NoopTripInvoker;
        private _velocityUpdater: Function;

        /**
        * Creates a new instance of the LinearMovementController object which rotates the provided moveable's on movements and can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        */
        constructor(movables: IMoveable[], moveSpeed: number);
        /**
        * Creates a new instance of the LinearMovementController object which can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction, default is true (this cannot change after construction).
        */
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: boolean);
        /**
        * Creates a new instance of the LinearMovementController object..
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction.  Default is true (this cannot change after construction).
        * @param multiDirectional Whether multiple movements can occur simultaneously, resulting in diagonal movements. Default is true (this cannot change after construction).
        */
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: boolean, multiDirectional: boolean);
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: boolean = true, multiDirectional: boolean = true) {
            super(movables);

            this._moveSpeed = moveSpeed;
            this._moving = new LinearDirections();
            this.OnMove = new EventHandler1<IMoveEvent>();
            this._rotationUpdater = new NoopTripInvoker(() => {
                this.UpdateRotation();
            }, rotateWithMovements);

            if (multiDirectional) {
                this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
            }
            else {
                this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
            }
        }

        /**
        * Event: Triggered when a the movement controller starts or stops a movement.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMoveEvent to bound functions.
        */
        public OnMove: EventHandler1<IMoveEvent>;

        /**
        * Determines if the movement controller is moving in the provided direction.
        * @param direction The direction to check.
        */
        public IsMovingInDirection(direction: string): boolean {
            // @ts-ignore
            return this._moving[direction] || false;
        }

        /**
        * Starts moving the movement controller in the specified direction.
        * @param direction The direction to start moving.
        */
        public StartMoving(direction: string): void {
            this.Move(direction, true);
        }

        /**
        * Stops the movement controller from moving in the specified direction.
        * @param direction The direction to stop moving.
        */
        public StopMoving(direction: string): void {
            this.Move(direction, false);
        }

        /**
        * Gets the current move speed.
        */
        public MoveSpeed(): number;
        /**
        * Sets and gets the current move speed.
        * @param speed The new move speed.
        */
        public MoveSpeed(speed: number): number;
        public MoveSpeed(speed?: number): number {
            if (typeof speed !== "undefined") {
                this._moveSpeed = speed;
                this._velocityUpdater();
            }

            return this._moveSpeed;
        }

        /**
        * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            if (!this._frozen) {
                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));

                super.Update(gameTime);
            }
        }

        /**
        * Triggers a move event on the MovementController.
        * @param direction The direction to start or stop moving.
        * @param startMoving Whether the movement is starting or stopping.
        */
        public Move(direction: string, startMoving: boolean): void {
            // @ts-ignore
            if (typeof this._moving[direction] !== "undefined") {
                // @ts-ignore
                this._moving[direction] = startMoving;
                this._velocityUpdater();
                this._rotationUpdater.Invoke();
                this.OnMove.Trigger(<IMoveEvent>{
                    Direction: direction,
                    StartMoving: startMoving
                });
            }
            else {
                throw new Error(direction + " is an unknown direction.");
            }
        }

        private UpdateVelocityNoMultiDirection(): void {
            var velocity = Vector2d.Zero;

            if (velocity.IsZero()) {
                if (this._moving.Up) {
                    velocity.Y -= this._moveSpeed;
                }
                if (this._moving.Down) {
                    velocity.Y += this._moveSpeed;
                }

                if (velocity.Y === 0) {
                    if (this._moving.Left) {
                        velocity.X -= this._moveSpeed;
                    }
                    if (this._moving.Right) {
                        velocity.X += this._moveSpeed;
                    }
                }
            }

            this.Velocity = velocity;
        }

        private UpdateVelocityWithMultiDirection(): void {
            var velocity = Vector2d.Zero;

            if (this._moving.Up) {
                velocity.Y -= this._moveSpeed;
            }
            if (this._moving.Down) {
                velocity.Y += this._moveSpeed;
            }
            if (this._moving.Left) {
                velocity.X -= this._moveSpeed;
            }
            if (this._moving.Right) {
                velocity.X += this._moveSpeed;
            }

            this.Velocity = velocity;
        }

        private UpdateRotation(): void {
            if (!this.Velocity.IsZero()) {
                this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
            }
        }
    }

}