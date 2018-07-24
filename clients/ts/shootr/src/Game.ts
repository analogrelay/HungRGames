import * as eg from "../../endgate/endgate";
import { ConfigurationManager } from "./Configuration/ConfigurationManager";
import { ShipManager } from "./Ships/ShipManager";
import { BulletManager } from "./Bullets/BulletManager";
import { PowerupManager } from "./Powerups/PowerupManager";
import { DebugManager } from "./Debug/DebugManager";
import { HUDManager } from "./HUD/HUDManager";
import { GameScreen } from "./GameScreen";
import { ServerAdapter } from "./Server/ServerAdapter";
import { IClientInitialization } from "./Server/IClientInitialization";
import { ShipBodyGraphic } from "./Ships/Graphics/ShipBodyGraphic";
import { UserShipManager } from "./User/UserShipManager";
import { IPayloadData } from "./Server/IPayloadDefinitions";
import { Map } from "./Space/Map";
import { AreaRenderer } from "./Space/AreaRenderer";
import { SpectatorManager } from "./Spectator/SpectatorManager";

export class Game extends eg.Game {
    public static GameConfiguration: ConfigurationManager;

    private _shipManager: ShipManager;
    private _bulletManager: BulletManager;
    private _powerupManager: PowerupManager;
    private _debugManager: DebugManager;
    private _bufferedViewport: eg.Bounds.BoundingRectangle;
    private _map: Map;
    private _hud: HUDManager;
    private _spectatorManager?: SpectatorManager;

    constructor(gameCanvas: HTMLCanvasElement, gameScreen: GameScreen, serverAdapter: ServerAdapter, initializationData: IClientInitialization) {
        super(gameCanvas);

        Game.GameConfiguration = new ConfigurationManager(initializationData.Configuration);

        this.Configuration.CollisionConfiguration.MinQuadTreeNodeSize = new eg.Size2d(75); // Size of a ship
        this.Configuration.CollisionConfiguration.InitialQuadTreeSize = new eg.Size2d(10125); // Initial Map Size x 2

        if (initializationData.IsPlayer) {
            this._bufferedViewport = new eg.Bounds.BoundingRectangle(this.Scene.Camera.Position, this.Scene.Camera.Size.Add(GameScreen.SCREEN_BUFFER_AREA));
        }
        else {
            this._bufferedViewport = new eg.Bounds.BoundingRectangle(
                eg.Vector2d.Zero,
                Map.SIZE
            );
            console.log(`vp: ${this._bufferedViewport.Size.Width}x${this._bufferedViewport.Size.Height}`);
        }

        this._shipManager = new ShipManager(this._bufferedViewport, this.Scene, this.CollisionManager, this.Content);

        if (initializationData.IsPlayer) {
            this._shipManager.Initialize(new UserShipManager(initializationData.ShipID, this._shipManager, this.CollisionManager, this.Input, this.Scene.Camera, serverAdapter));
        } else {
            // Initialize the CameraManager
            this._spectatorManager = new SpectatorManager(this._bufferedViewport, this.Scene.Camera, this.Input, this._shipManager);
        }

        this._bulletManager = new BulletManager(this._bufferedViewport, this.Scene, this.Content);
        this._powerupManager = new PowerupManager(this._bufferedViewport, this.Scene, this.Content);
        this._map = new Map(this.Scene, this.CollisionManager, this.Content, this.Input.Keyboard, serverAdapter);
        this._debugManager = new DebugManager(initializationData.ShipID, this, serverAdapter);
        this._hud = new HUDManager(initializationData, this._shipManager, (<AreaRenderer>this._map.AreaRenderer), this.Input.Keyboard, serverAdapter);

        if (!initializationData.IsPlayer) {
            serverAdapter.OnMapResize.Bind((newSize: eg.Size2d) => {
                this._bufferedViewport = new eg.Bounds.BoundingRectangle(
                    eg.Vector2d.Zero,
                    Map.SIZE
                );
                console.log(`vp: ${this._bufferedViewport.Size.Width}x${this._bufferedViewport.Size.Height}`);
            });
        }

        serverAdapter.OnPayload.Bind((payload: IPayloadData) => {
            this._shipManager.LoadPayload(payload);
            this._bulletManager.LoadPayload(payload);
            this._powerupManager.LoadPayload(payload);
            this._hud.LoadPayload(payload);
            this._debugManager.LoadPayload(payload);
        });

        gameScreen.OnResize.Bind((newSize: eg.Size2d) => {
            this._hud.OnScreenResize(newSize);

            if (initializationData.IsPlayer) {
                this._bufferedViewport.Size = newSize.Add(GameScreen.SCREEN_BUFFER_AREA);
            }
        });
    }

    public LoadContent(): void {
        this.Content.LoadImage("StarBackground", "/Images/bg_stars.png", 1000, 1000);
        this.Content.LoadImage("BulletExplosion", "/Images/SpriteSheets/explosion_1.png", 320, 320);
        this.Content.LoadImage("ShipExplosion", "/Images/SpriteSheets/explosion_2.png", 768, 640);
        this.Content.LoadImage("Bullet", "/Images/Laser.png", 13, 13);
        this.Content.LoadImage("Ship1", "/Images/Ships/ship_lvl1.png", 75, 75);
        this.Content.LoadImage("Ship3", "/Images/Ships/ship_lvl3.png", 75, 75);
        this.Content.LoadImage("Ship5", "/Images/Ships/ship_lvl5.png", 75, 75);
        this.Content.LoadImage("Ship7", "/Images/Ships/ship_lvl7.png", 75, 75);
        this.Content.LoadImage("Ship8", "/Images/Ships/ship_lvl8.png", 75, 75);
        this.Content.LoadImage("Ship9", "/Images/Ships/ship_lvl9.png", 75, 75);
        this.Content.LoadImage("Ship10", "/Images/Ships/ship_lvl10.png", 75, 75);
        this.Content.LoadImage("Ship12", "/Images/Ships/LaserCat.png", 75, 75);
        this.Content.LoadImage("Thrust", "/Images/SpriteSheets/thrust_basic.png", 468, 100);
        this.Content.LoadImage("ThrustStart", "/Images/SpriteSheets/thrust_start.png", 468, 100);
        this.Content.LoadImage("Boost", "/Images/SpriteSheets/thrusters-BOOST.png", 400, 150);
        this.Content.LoadImage("HealthPack", "/Images/SpriteSheets/health_pack.png", 450, 100);
        this.Content.LoadImage("ShipDamage1", "/Images/Ships/Damage/damage_1.png", 75, 75);
        this.Content.LoadImage("ShipDamage3", "/Images/Ships/Damage/damage_2.png", 75, 75);
        this.Content.LoadImage("ShipDamage5", "/Images/Ships/Damage/damage_3.png", 75, 75);
        this.Content.LoadImage("ShipDamage7", "/Images/Ships/Damage/damage_4.png", 75, 75);

        ShipBodyGraphic.LoadShipBodies(this.Content);
    }

    public Update(gameTime: eg.GameTime): void {
        this._bufferedViewport.Position = this.Scene.Camera.Position;

        this._shipManager.Update(gameTime);
        this._bulletManager.Update(gameTime);
        this._powerupManager.Update(gameTime);
        this._hud.Update(gameTime);
        this._debugManager.Update(gameTime);

        if (this._spectatorManager) {
            this._spectatorManager.Update(gameTime);
        }
    }

    // Most drawing takes place via the Scene.
    // This method can be used to draw items to the game screen with raw canvas API's.
    // I don't do this because there's no need :), i only update the debug manager in order to track the draw rate.
    public Draw(context: CanvasRenderingContext2D): void {
        this._debugManager.Draw(context);
    }
}
