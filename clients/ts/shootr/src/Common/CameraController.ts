import * as eg from "../../../endgate/endgate";
import { ShipManager } from "../Ships/ShipManager";

export class CameraController {
    public static DISTANCE_THRESHOLD: number = 500;
    public static MOVEMENT_TIME: eg.TimeSpan = eg.TimeSpan.FromMilliseconds(500);

    private _movementTween: eg.Tweening.Vector2dTween;
    private _zoomTween: eg.Tweening.NumberTween;
    private _started: boolean;

    constructor(private _camera: eg.Rendering.Camera2d) {
        this._zoomTween = new eg.Tweening.NumberTween(eg.Rendering.Camera2d.DefaultDistance, eg.Rendering.Camera2d.DefaultDistance, CameraController.MOVEMENT_TIME, eg.TweeningFunctions.Exponential.EaseOut);
        this._zoomTween.OnChange.Bind((newDistance) => {
            this._camera.Distance = newDistance;
        });

        this._movementTween = new eg.Tweening.Vector2dTween(eg.Vector2d.Zero, eg.Vector2d.Zero, CameraController.MOVEMENT_TIME, eg.TweeningFunctions.Exponential.EaseOut);
        this._movementTween.OnChange.Bind((newPosition) => {
            this._camera.Position = newPosition;
        });

        this._started = false;
    }

    public UpdateCamera(gameTime: eg.GameTime, target: eg.Vector2d, distance: number) {
        // On the initial start of the controller just position the camera directly over the target
        if(!this._started) {
            this._started = true;
            this._camera.Position = target;
            this._camera.Distance = distance;
            return;
        }
        
        const deltaP = target.Distance(this._camera.Position).Magnitude();
        if(!this._movementTween.IsPlaying()) {
            if(deltaP < CameraController.DISTANCE_THRESHOLD) {
                this._camera.Position = target;
            } else {
                this._movementTween.From = this._camera.Position;
                this._movementTween.To = target;
                this._movementTween.Restart();
            }
        }
        else {
            this._movementTween.To = target;
        }

        if(!this._zoomTween.IsPlaying()) {
            this._zoomTween.From = this._camera.Distance;
            this._zoomTween.To = distance;
            this._zoomTween.Restart();
        } else {
            this._zoomTween.To = distance;
        }

        this._movementTween.Update(gameTime);
        this._zoomTween.Update(gameTime);
    }
}