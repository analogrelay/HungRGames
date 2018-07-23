import * as JQuery from "jquery";
import * as signalR from "@aspnet/signalr"
import { Game } from "./Game";
import { ServerAdapter } from "./Server/ServerAdapter";
import { GameScreen } from "./GameScreen";
import { IClientInitialization } from "./Server/IClientInitialization";

$(function () {
    let connection = new signalR.HubConnectionBuilder().withUrl("/Game").configureLogging(signalR.LogLevel.Warning).build();
    let gameCanvas: JQuery = $("#game"),
        popUpHolder: JQuery = $("#popUpHolder"),
        gameContent: JQuery = $("#gameContent"),
        loadContent: JQuery = $("#loadContent"),
        game: Game,
        serverAdapter: ServerAdapter = new ServerAdapter(connection, "shootr.state"),
        gameScreen: GameScreen = new GameScreen(gameCanvas, popUpHolder, serverAdapter);

        serverAdapter.Negotiate().then((initializationData: IClientInitialization) => {
            loadContent.hide();
            gameContent.show();

            game = new Game(<HTMLCanvasElement>gameCanvas[0], gameScreen, serverAdapter, initializationData);
            gameScreen.ForceResizeCheck();
        }, (reason) => console.error("Failed to negotiate with server: " + reason));

});