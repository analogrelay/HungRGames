import * as eg from "../../../endgate/endgate";
import { CameraController } from "../Common/CameraController";

export class SpectatorManager {
    private static readonly SPEED: number = 1_000;
    private static readonly LUDICROUS_SPEED: number = 10_000;

    private _userCameraController: CameraController;
    private _position: eg.Vector2d;
    private _distance: number;
    private _inputController: eg.InputControllers.DirectionalInputController;

    private _speed: number;

    private _movement: {
        up: boolean,
        down: boolean,
        left: boolean,
        right: boolean,
        zoomOut: boolean,
        zoomIn: boolean
    } = { up: false, down: false, left: false, right: false, zoomOut: false, zoomIn: false };

    constructor(private _viewport: eg.Bounds.BoundingRectangle, private _camera: eg.Rendering.Camera2d, private _input: eg.Input.InputManager) {
        this._userCameraController = new CameraController(this._camera)
        this._position = new eg.Vector2d(0, 0);
        this._distance = this._camera.Distance;
        this._speed = SpectatorManager.SPEED;

        this._inputController = new eg.InputControllers.DirectionalInputController(
            this._input.Keyboard,
            (d, s) => this.OnMove(d, s));

        this._input.Keyboard.OnCommandDown("q", () => {
            this._movement.zoomOut = true;
        });
        this._input.Keyboard.OnCommandUp("q", () => {
            this._movement.zoomOut = false;
        });

        this._input.Keyboard.OnCommandDown("e", () => {
            this._movement.zoomIn = true;
        });
        this._input.Keyboard.OnCommandUp("e", () => {
            this._movement.zoomIn = false;
        });

        this._input.Keyboard.OnCommandDown("l", () => {
            this._speed = SpectatorManager.LUDICROUS_SPEED;
        });
        this._input.Keyboard.OnCommandUp("l", () => {
            this._speed = SpectatorManager.SPEED;
        });
    }

    Update(gameTime: eg.GameTime): any {
        // Update position
        const vector = this.GetVector();
        const deltaP = vector.Multiply(this._speed * gameTime.Elapsed.Seconds);
        this._position = this._position.Add(deltaP);

        // Get distance
        const deltaZ = this.GetDeltaZ() * this._speed * gameTime.Elapsed.Seconds;
        this._distance = this._distance + deltaZ;

        // TODO: Clamp to world edge.

        this._userCameraController.UpdateCamera(gameTime, this._position, this._distance);
    }

    private GetDeltaZ(): number {
        let z = 0;
        if(this._movement.zoomIn) {
            z -= 1;
        }
        if(this._movement.zoomOut) {
            z += 1;
        }

        return z;
    }

    private GetVector(): eg.Vector2d {
        let x = 0;
        let y = 0;

        // Simultaneous presses result in no movement in that direction.
        if (this._movement.up) {
            y -= 1;
        }
        if (this._movement.down) {
            y += 1
        }

        if (this._movement.left) {
            x -= 1;
        }
        if (this._movement.right) {
            x += 1
        }

        return new eg.Vector2d(x, y);
    }

    private OnMove(direction: string, startMoving: boolean) {
        switch (direction) {
            case "Up":
                this._movement.up = startMoving;
                break;
            case "Down":
                this._movement.down = startMoving;
                break;
            case "Left":
                this._movement.left = startMoving;
                break;
            case "Right":
                this._movement.right = startMoving;
                break;
        }
    }
}