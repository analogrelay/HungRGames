import * as eg from "../../../../endgate/endgate";
import { Ship } from "../Ship";

export class ShipNameGraphic extends eg.Graphics.Text2d {
    public static FONT_SIZE: string = "15px";
    public static Y_OFFSET: number = 33;
    public static NAME_COLOR: eg.Graphics.Color = eg.Graphics.Color.White;

    constructor(name: string) {
        super(0, Ship.SIZE.HalfHeight + ShipNameGraphic.Y_OFFSET, name, ShipNameGraphic.NAME_COLOR);

        this.FontSettings.FontSize = ShipNameGraphic.FONT_SIZE;
        this.FontSettings.FontFamily = eg.Graphics.FontFamily.Arial;
        this.FontSettings.FontWeight = "bold";
    }
}