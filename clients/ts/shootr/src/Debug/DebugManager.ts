import * as eg from "../../../endgate/endgate";
import { ServerGhost } from "./ServerGhost";
import { GameInformer } from "./GameInformer";
import { UpdateRate } from "./UpdateRate";
import { DrawRate } from "./DrawRate";
import { PayloadRate } from "./PayloadRate";
import { Game } from "../Game";
import { ServerAdapter } from "../Server/ServerAdapter";
import { IPayloadData } from "../Server/IPayloadDefinitions";

export class DebugManager {
    public static DEBUG_FLAG: string = "debug";

    private _serverGhost: ServerGhost | undefined;
    private _gameInformer: GameInformer | undefined;
    private _updateRate: UpdateRate | undefined;
    private _drawRate: DrawRate | undefined;
    private _payloadRate: PayloadRate | undefined;
    private _debugMode: boolean;

    constructor(myShipId: number, game: Game, serverAdapter: ServerAdapter) {
        // @ts-ignore
        this._debugMode = this.GetUrlVars()[DebugManager.DEBUG_FLAG] === "true";

        if (this._debugMode) {
            this._serverGhost = new ServerGhost(myShipId, game.Scene, game.Content);
            this._gameInformer = new GameInformer(game.Scene);
            this._updateRate = new UpdateRate(this._gameInformer, game);
            this._drawRate = new DrawRate(this._gameInformer);
            this._payloadRate = new PayloadRate(this._gameInformer);
        }
    }

    public LoadPayload(payload: IPayloadData): void {
        if (this._debugMode && this._payloadRate && this._serverGhost) {
            this._payloadRate.LoadPayload(payload);
            this._serverGhost.LoadPayload(payload.Ships);
        }
    }

    public Update(gameTime: eg.GameTime): void {
        if (this._debugMode && this._updateRate && this._drawRate && this._payloadRate && this._gameInformer && this._serverGhost) {
            this._updateRate.Update(gameTime);
            this._drawRate.Update(gameTime);
            this._payloadRate.Update(gameTime);
            this._gameInformer.Update(gameTime);
            this._serverGhost.Update(gameTime);
        }
    }

    public Draw(context: CanvasRenderingContext2D): void {
        if (this._debugMode && this._drawRate) {
            this._drawRate.Draw(context);
        }
    }

    private GetUrlVars() {
        var vars = [],
            hash,
            hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            
            // @ts-ignore
            vars.push(hash[0]);
            // @ts-ignore
            vars[hash[0]] = hash[1];
        }

        return vars;
    }
}
