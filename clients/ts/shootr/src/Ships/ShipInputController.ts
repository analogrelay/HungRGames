import * as eg from "../../../endgate/endgate";
import { ShipFireController } from "./ShipFireController";
import { IMoving } from "./IMoving";
import { ServerAdapter } from "../Server/ServerAdapter";
import { NotificationManager } from "../HUD/NotificationManager";

export class ShipInputController {
    public static DOUBLE_TAP_AFTER: eg.TimeSpan = eg.TimeSpan.FromMilliseconds(350);

    private _directions: IMoving;
    // @ts-ignore
    private _lastBoostTap: Date;
    private _fireController: ShipFireController;
    private _monitorBoostTap = false;

    constructor(private _serverAdapter: ServerAdapter, private _keyboard: eg.Input.KeyboardHandler, private _gamepad: eg.Input.GamepadHandler, private _onMove: (direction: string, startMoving: boolean) => void, private _onFire: (fireMethod: string) => void) {
        var notification = new NotificationManager(_serverAdapter);
        this._directions = {
            Forward: false,
            Backward: false,
            RotatingLeft: false,
            RotatingRight: false
        };

        // Keyboard
        this.BindKeys(["w"], "OnCommandDown", "Forward", true);
        this.BindKeys(["d"], "OnCommandDown", "RotatingRight", true);
        this.BindKeys(["s"], "OnCommandDown", "Backward", true);
        this.BindKeys(["a"], "OnCommandDown", "RotatingLeft", true);
        this.BindKeys(["w"], "OnCommandUp", "Forward", false);
        this.BindKeys(["d"], "OnCommandUp", "RotatingRight", false);
        this.BindKeys(["s"], "OnCommandUp", "Backward", false);
        this.BindKeys(["a"], "OnCommandUp", "RotatingLeft", false);

        this._keyboard.OnCommandUp("w", () => {
            this._monitorBoostTap = true;
        });

        this._keyboard.OnCommandDown("w", () => {
            const now = new Date();

            if (this._monitorBoostTap && eg.TimeSpan.DateSpan(this._lastBoostTap, now).Milliseconds <= ShipInputController.DOUBLE_TAP_AFTER.Milliseconds) {
                this._onMove("Boost", true);
                this._lastBoostTap = new Date(0);
            } else { // no double tap
                this._lastBoostTap = now;
            }

            this._monitorBoostTap = false;
        });

        // Gamepad
        this._gamepad.OnConnecting(() => {
            notification.Notify("Gamepad connected", false);
        });

        this._gamepad.OnDisconnecting(() => {
            notification.Notify("Gamepad disconnected", false);
        });

        this.BindGamepadButtons([eg.Input.GamepadButton.RT], "OnButtonDown", "Forward", true);
        this.BindGamepadButtons([eg.Input.GamepadButton.DPadRight, eg.Input.GamepadButton.LeftStickRight], "OnButtonDown", "RotatingRight", true);
        this.BindGamepadButtons([eg.Input.GamepadButton.LT], "OnButtonDown", "Backward", true);
        this.BindGamepadButtons([eg.Input.GamepadButton.DPadLeft, eg.Input.GamepadButton.LeftStickLeft], "OnButtonDown", "RotatingLeft", true);
        this.BindGamepadButtons([eg.Input.GamepadButton.RT], "OnButtonUp", "Forward", false);
        this.BindGamepadButtons([eg.Input.GamepadButton.DPadRight, eg.Input.GamepadButton.LeftStickRight], "OnButtonUp", "RotatingRight", false);
        this.BindGamepadButtons([eg.Input.GamepadButton.LT], "OnButtonUp", "Backward", false);
        this.BindGamepadButtons([eg.Input.GamepadButton.DPadLeft, eg.Input.GamepadButton.LeftStickLeft], "OnButtonUp", "RotatingLeft", false);

        this._gamepad.OnButtonUp(eg.Input.GamepadButton.RT, () => {
            this._monitorBoostTap = true;
        });

        this._gamepad.OnButtonDown(eg.Input.GamepadButton.RT, () => {
            const now = new Date();

            if (this._monitorBoostTap && eg.TimeSpan.DateSpan(this._lastBoostTap, now).Milliseconds <= ShipInputController.DOUBLE_TAP_AFTER.Milliseconds) {
                this._onMove("Boost", true);
                this._lastBoostTap = new Date(0);
            } else { // no double tap
                this._lastBoostTap = now;
            }

            this._monitorBoostTap = false;
        });

        this._fireController = new ShipFireController(this._keyboard, this._gamepad, this._onFire);
    }

    private BindKeys(keyList: string[], bindingAction: string, direction: string, startMoving: boolean): void {
        for (var i = 0; i < keyList.length; i++) {
            // @ts-ignore
            this._keyboard[bindingAction](keyList[i], () => {
                // @ts-ignore
                if (this._directions[direction] !== startMoving) {
                    // @ts-ignore
                    this._directions[direction] = startMoving;
                    this._onMove(direction, startMoving);
                }
            });
        }
    }

    private BindGamepadButtons(keyList: eg.Input.GamepadButton[], bindingAction: string, direction: string, startMoving: boolean): void {
        for (var i = 0; i < keyList.length; i++) {
            // @ts-ignore
            this._gamepad[bindingAction](keyList[i], () => {
                // @ts-ignore
                if (this._directions[direction] !== startMoving) {
                    // @ts-ignore
                    this._directions[direction] = startMoving;
                    this._onMove(direction, startMoving);
                }
            });
        }
    }
}