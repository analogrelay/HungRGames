import * as eg from "../../../../endgate/endgate";
import { Animation } from "../../Common/Animation";
import { HealthPack } from "../HealthPack";

export class HealthPackGraphic extends Animation {
    public static FRAME_COUNT: number = 18;
    public static FPS: number = 18;

    constructor(position: eg.Vector2d, contentManager: eg.Content.ContentManager) {
        super(position, contentManager.GetImage("HealthPack"), HealthPackGraphic.FPS, HealthPack.SIZE, HealthPackGraphic.FRAME_COUNT);

        this.Play(true);
    }
}