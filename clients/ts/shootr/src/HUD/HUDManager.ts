import * as eg from "../../../endgate/endgate";
import { IPayloadData } from "../Server/IPayloadDefinitions";
import { ShipStatMonitor } from "./ShipStatMonitor";
import { HealthMonitor } from "./HealthMonitor";
import { ExperienceMonitor } from "./ExperienceMonitor";
import { RankingsManager } from "./RankingsManager";
import { EnvironmentMonitor } from "./EnvironmentMonitor";
import { LeaderboardManager } from "./LeaderboardManager";
import { DeathScreen } from "./DeathScreen";
import { NotificationManager } from "./NotificationManager";
import { UserInformationManager } from "./UserInformationManager";
import { Chat } from "./Chat";
import { ShipManager } from "../Ships/ShipManager";
import { AreaRenderer } from "../Space/AreaRenderer";
import { ServerAdapter } from "../Server/ServerAdapter";
import { IClientInitialization } from "../Server/IClientInitialization";
import { Ship } from "../Ships/Ship";

export class HUDManager {
    private _gameHUD: JQuery = $("#gameHUD");
    private _doublePopupHolder: JQuery = $("#doublePopupHolder");
    private _gameHUDHeight: number;
    private _locationStats: JQuery = $("#LocationStatisticsHolder");
    private _shipStats: JQuery = $("#StatisticHolder");
    private _logout: JQuery = $("#logout");
    private _shipStatMonitor: ShipStatMonitor;
    private _shipHealthMonitor: HealthMonitor;
    private _shipExperienceMonitor: ExperienceMonitor;
    private _rankingsManager: RankingsManager;
    private _environmentMonitor: EnvironmentMonitor;
    private _leaderboardManager: LeaderboardManager;
    private _deathScreen: DeathScreen;
    private _notificationManager: NotificationManager;
    private _userInformationManager: UserInformationManager;
    private _chat: Chat;
    private _myShipId: number;

    constructor(initialization: IClientInitialization, private _shipManager: ShipManager, areaRenderer: AreaRenderer, keyboard: eg.Input.KeyboardHandler, serverAdapter: ServerAdapter) {
        this._myShipId = initialization.ShipID;
        this._gameHUDHeight = (<number>this._gameHUD.height());
        this._shipStatMonitor = new ShipStatMonitor();
        this._shipHealthMonitor = new HealthMonitor();
        this._shipExperienceMonitor = new ExperienceMonitor();
        this._rankingsManager = new RankingsManager();
        this._environmentMonitor = new EnvironmentMonitor(areaRenderer, this._shipManager.UserShipManager);
        this._leaderboardManager = new LeaderboardManager(this._myShipId, keyboard, serverAdapter);
        this._deathScreen = new DeathScreen();
        this._notificationManager = new NotificationManager(serverAdapter);
        this._userInformationManager = new UserInformationManager(initialization.UserInformation);
        this._chat = new Chat(initialization.UserInformation, serverAdapter);

        this._logout.click(() => {
            // Clear cookies
            var c = document.cookie.split(";");
            for (var i = 0; i < c.length; i++) {
                var e = c[i].indexOf("=");
                var n = e > -1 ? c[i].substr(0, e) : c[i];
                document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }

            window.location.reload(true);
        });
    }

    public OnScreenResize(newViewport: eg.Size2d): void {
        this._gameHUD.css("width", newViewport.Width);
        this._gameHUD.css("height", this._gameHUDHeight);
        this._gameHUD.css("top", newViewport.Height);
        this._shipHealthMonitor.OnScreenResize();
        this.CenterDoublePopup(newViewport);

        // Remove or Add HUD objects
        if (newViewport.Width <= 1370) {
            this._locationStats.css("display", "none");
        }
        else {
            this._locationStats.css("display", "block");
        }

        // Remove or Add HUD objects
        if (newViewport.Width <= 1177) {
            this._shipStats.css("display", "none");
        }
        else {
            this._shipStats.css("display", "block");
        }
    }

    public CenterDoublePopup(newViewport: eg.Size2d): void {
        // The left is handled by the css
        this._doublePopupHolder.css("top", (newViewport.Height / 2) -(<number>this._doublePopupHolder.height()) / 2);
    }

    public LoadPayload(payload: IPayloadData): void {
        this._rankingsManager.LoadPayload(payload);
        this._environmentMonitor.LoadPayload(payload);
        this._deathScreen.LoadPayload(payload);
        this._notificationManager.LoadPayload(payload);
    }

    public Update(gameTime: eg.GameTime): void {
        var ship: Ship = this._shipManager.GetShip(this._myShipId);

        if (ship) {
            this._shipStatMonitor.Update(ship);
            this._shipHealthMonitor.Update(ship);
            this._shipExperienceMonitor.Update(ship);
            this._environmentMonitor.Update(ship);
            this._rankingsManager.Update(ship);
        }
    }
}