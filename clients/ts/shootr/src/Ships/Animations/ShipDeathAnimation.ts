import * as eg from "../../../../endgate/endgate";
import { Animation } from "../../Common/Animation"

export class ShipDeathAnimation extends Animation {
    public static FRAME_SIZE: eg.Size2d = new eg.Size2d(128, 128);
    public static FRAME_COUNT: number = 30;
    public static FPS: number = 25;

    constructor(contentManager: eg.Content.ContentManager) {
        super(eg.Vector2d.Zero, contentManager.GetImage("ShipExplosion"), ShipDeathAnimation.FPS, ShipDeathAnimation.FRAME_SIZE, ShipDeathAnimation.FRAME_COUNT);
        this.Rotation = (Math.random() * (Math.PI * 100)) / 100;
        this.Visible = false;
    }

    public Play(): void {
        this.Visible = true;
        super.Play();
    }
}