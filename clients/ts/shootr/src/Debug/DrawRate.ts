import { RateMonitor } from "./RateMonitor";
import { GameInformer } from "./GameInformer";

export class DrawRate extends RateMonitor {
    public static TITLE: string = "Draw Rate"

    constructor(informer: GameInformer) {
        super(DrawRate.TITLE, informer, 60);
    }

    public Draw(context: CanvasRenderingContext2D): void {
        this.MarkRate();
    }
}