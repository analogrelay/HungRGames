import * as eg from "../../../endgate/endgate";
import { IPayloadData, ILeaderboardEntryData } from "./IPayloadDefinitions";
import { ChatMessage } from "../HUD/Chat";
import { PayloadDecompressor } from "./PayloadDecompressor";
import { ServerConnectionManager } from "./ServerConnectionManager";
import { IClientInitialization } from "./IClientInitialization";
import { IUserInformation } from "./IUserInformation";
import { HubConnection } from "../../../node_modules/@aspnet/signalr";

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

    constructor(public Connection: HubConnection, authCookieName: string) {
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

        this.Connection.start().then(() => {
            let userInformation: IUserInformation = this._connectionManager.PrepareRegistration();
            this.TryInitialize(userInformation, (initialization: IClientInitialization) => {
                initialization.UserInformation = userInformation;
                this._payloadDecompressor = new PayloadDecompressor(initialization.CompressionContracts);

                result.resolve(initialization);

                this.Connection.invoke("readyForPayloads");
            });
        }, (reason: any) => console.error("Failed to negotiate with server inthe adapter: " + reason));

        return result.promise();
    }

    public Stop(): void {
        this.Connection.stop();
    }

    private TryInitialize(userInformation: IUserInformation, onComplete: (initialization: IClientInitialization) => void, count: number = 0): void {
        this.Connection.invoke("initializeClient", userInformation.RegistrationID).then((initialization: IClientInitialization) => {
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
        this.Connection.on("d", (payload: any) => {
            if (this._payloadDecompressor) {
                this.OnPayload.Trigger(this._payloadDecompressor.Decompress(payload));
            }
        });

        this.Connection.on("l", (leaderboardUpdate: any) => {
            if (this._payloadDecompressor) {
                this.OnLeaderboardUpdate.Trigger(this._payloadDecompressor.DecompressLeaderboard(leaderboardUpdate));
            }
        });

        this.Connection.on("disconnect", () => {
            this.OnForcedDisconnct.Trigger();
        });

        this.Connection.on("controlTransferred", () => {
            this.OnControlTransferred.Trigger();
        });

        this.Connection.on("pingBack", () => {
            this.OnPingRequest.Trigger();
        });

        this.Connection.on("mapSizeIncreased", (size: any) => {
            this.OnMapResize.Trigger(new eg.Size2d(size.Width, size.Height));
        });

        this.Connection.on("chatMessage", (from: string, message: string, type: number) => {
            this.OnMessageReceived.Trigger(new ChatMessage(from, message, type));
        });
    }
}