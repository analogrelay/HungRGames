import * as eg from "../../../endgate/endgate";

export class ShipFireController {
    public static MIN_FIRE_RATE: eg.TimeSpan;

    constructor(keyboard: eg.Input.KeyboardHandler, gamepad: eg.Input.GamepadHandler, onFire: (fireMethod: string) => void) {
        var autoFireHandle: number,
            firedAt: number = 0,
            singleFireMode: boolean = true,
            lastShot: number = 0;

        keyboard.OnCommandDown(" ", () => {
            var timeSinceFired: number;

            firedAt = new Date().getTime();

            if (singleFireMode) {
                timeSinceFired = firedAt - lastShot;

                if (timeSinceFired > ShipFireController.MIN_FIRE_RATE.Milliseconds) {
                    lastShot = firedAt;
                    onFire("Fire");
                }

                autoFireHandle = (<any>setTimeout(function () {
                    singleFireMode = false;
                    onFire("StartFire");
                }, ShipFireController.MIN_FIRE_RATE.Milliseconds));
            } else {
                onFire("StartFire");
            }
        });
        keyboard.OnCommandUp(" ", () => {
            var timeFireReleased: number;

            clearTimeout(autoFireHandle);
            timeFireReleased = new Date().getTime();

            if (!singleFireMode) {
                lastShot = timeFireReleased;
                onFire("StopFire");
            }

            singleFireMode = timeFireReleased - firedAt < ShipFireController.MIN_FIRE_RATE.Milliseconds;
        });

        // TODO: Remove code duplication 
        gamepad.OnButtonDown(eg.Input.GamepadButton.A, () => {
            var timeSinceFired: number;

            firedAt = new Date().getTime();

            if (singleFireMode) {
                timeSinceFired = firedAt - lastShot;

                if (timeSinceFired > ShipFireController.MIN_FIRE_RATE.Milliseconds) {
                    lastShot = firedAt;
                    onFire("Fire");
                }

                autoFireHandle = (<any>setTimeout(function () {
                    singleFireMode = false;
                    onFire("StartFire");
                }, ShipFireController.MIN_FIRE_RATE.Milliseconds));
            } else {
                onFire("StartFire");
            }
        });
        gamepad.OnButtonUp(eg.Input.GamepadButton.A, () => {
            var timeFireReleased: number;

            clearTimeout(autoFireHandle);
            timeFireReleased = new Date().getTime();

            if (!singleFireMode) {
                lastShot = timeFireReleased;
                onFire("StopFire");
            }

            singleFireMode = timeFireReleased - firedAt < ShipFireController.MIN_FIRE_RATE.Milliseconds;
        });
    }
}