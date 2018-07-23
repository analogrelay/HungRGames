import * as eg from "../../../endgate/endgate";
import { IPayloadData, ILeaderboardEntryData } from "./IPayloadDefinitions";
import { ChatMessage } from "../HUD/Chat";
import { PayloadDecompressor } from "./PayloadDecompressor";
import { ServerConnectionManager } from "./ServerConnectionManager";
import { IClientInitialization } from "./IClientInitialization";
import { IUserInformation } from "./IUserInformation";
import { HubConnection, HubConnectionState } from "@aspnet/signalr";

export class ServerAdapter {
    public static NEGOTIATE_RETRIES: number = 3;
    public static RETRY_DELAY: eg.TimeSpan = eg.TimeSpan.FromSeconds(1);

    public OnPayload: eg.EventHandler1<IPayloadData>;
    public OnLeaderboardUpdate: eg.EventHandler1<Array<ILeaderboardEntryData>>;
    public OnForcedDisconnct: eg.EventHandler;
    public OnControlTransferred: eg.EventHandler;
    public OnPingRequest: eg.EventHandler;
    public OnMapResize: eg.EventHandler1<eg.Size2d>;
    public OnMessageReceived: eg.EventHandler1<ChatMessage>;

    private _payloadDecompressor: PayloadDecompressor | undefined;
    private _connectionManager: ServerConnectionManager;

    constructor(private _connection: HubConnection, authCookieName: string) {
        this.OnPayload = new eg.EventHandler1<IPayloadData>();
        this.OnLeaderboardUpdate = new eg.EventHandler1<Array<ILeaderboardEntryData>>();
        this.OnForcedDisconnct = new eg.EventHandler();
        this.OnControlTransferred = new eg.EventHandler();
        this.OnPingRequest = new eg.EventHandler();
        this.OnMapResize = new eg.EventHandler1<eg.Size2d>();
        this.OnMessageReceived = new eg.EventHandler1<ChatMessage>();
        this._connectionManager = new ServerConnectionManager(authCookieName);
    }

    public Negotiate(): JQueryPromise<IClientInitialization> {
        let result = $.Deferred();

        this.Wire();

        this._connection.start().then(() => {
            let userInformation: IUserInformation = this._connectionManager.PrepareRegistration();
            this.TryInitialize(userInformation, (initialization: IClientInitialization) => {
                initialization.UserInformation = userInformation;
                this._payloadDecompressor = new PayloadDecompressor(initialization.CompressionContracts);

                result.resolve(initialization);

                this.InvokeIfConnected("readyForPayloads");
            });
        }, (reason: any) => console.error("Failed to negotiate with server inthe adapter: " + reason));

        return result.promise();
    }

    public Stop(): void {
        this._connection.stop();
    }

    public InvokeIfConnected(methodName: string, ...args: any[]): Promise<any> {
        if (this._connection.state != HubConnectionState.Connected) {
            return new Promise<any>(() => { });
        }
        return this._connection.invoke(methodName, ...args);
    }

    private TryInitialize(userInformation: IUserInformation, onComplete: (initialization: IClientInitialization) => void, count: number = 0): void {
        this.InvokeIfConnected("initializeClient", userInformation.RegistrationID).then((initialization: IClientInitialization) => {
            if (!initialization) {
                if (count >= ServerAdapter.NEGOTIATE_RETRIES) {
                    console.log("Could not negotiate with server, refreshing the page.");
                    window.location.reload();
                } else {
                    setTimeout(() => {
                        this.TryInitialize(userInformation, onComplete, count + 1);
                    }, ServerAdapter.RETRY_DELAY.Milliseconds);
                }
            } else {
                onComplete(initialization);
            }
        });
    }

    private Wire(): void {
        this._connection.on("d", (payload: any) => {
            if (this._payloadDecompressor) {
                this.OnPayload.Trigger(this._payloadDecompressor.Decompress(payload));
            }
        });

        this._connection.on("l", (leaderboardUpdate: any) => {
            if (this._payloadDecompressor) {
                this.OnLeaderboardUpdate.Trigger(this._payloadDecompressor.DecompressLeaderboard(leaderboardUpdate));
            }
        });

        this._connection.on("disconnect", () => {
            this.OnForcedDisconnct.Trigger();
        });

        this._connection.on("controlTransferred", () => {
            this.OnControlTransferred.Trigger();
        });

        this._connection.on("pingBack", () => {
            this.OnPingRequest.Trigger();
        });

        this._connection.on("mapSizeIncreased", (size: any) => {
            this.OnMapResize.Trigger(new eg.Size2d(size.Width, size.Height));
        });

        this._connection.on("chatMessage", (from: string, message: string, type: number) => {
            this.OnMessageReceived.Trigger(new ChatMessage(from, message, type));
        });
    }
}
