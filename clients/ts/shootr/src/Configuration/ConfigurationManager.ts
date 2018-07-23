import * as eg from "../../../endgate/endgate";
import { IBulletConfiguration, IGameConfiguration, IShipConfiguration, IMapConfiguration, IScreenConfiguration, ILeaderboardConfiguration, IHealthPackConfiguration, IAbilityConfiguration, IShipMovementControllerConfiguration, IConfigurationManager } from "../Server/IConfigurationDefinitions";
import { Ship } from "../Ships/Ship";
import { ShipMovementController } from "../Ships/ShipMovementController";
import { ShipFireController } from "../Ships/ShipFireController";
import { ShipLifeController } from "../Ships/ShipLifeController";
import { Boost } from "../Ships/Abilities/Boost";
import { Map } from "../Space/Map";
import { GameScreen } from "../GameScreen";
import { Bullet } from "../Bullets/Bullet";
import { HealthPack } from "../Powerups/HealthPack";
import { LeaderboardManager } from "../HUD/LeaderboardManager";
import { DeathScreen } from "../HUD/DeathScreen";
import { LatencyResolver } from "../User/LatencyResolver";

export class ConfigurationManager {
    public bulletConfig: IBulletConfiguration | undefined;
    public gameConfig: IGameConfiguration | undefined;
    public shipConfig: IShipConfiguration | undefined;
    public mapConfig: IMapConfiguration | undefined;
    public screenConfig: IScreenConfiguration | undefined;
    public leaderboardConfig: ILeaderboardConfiguration | undefined;
    public healthPackConfig: IHealthPackConfiguration | undefined;
    public abilityConfig: IAbilityConfiguration | undefined;
    public shipMovementControllerConfig: IShipMovementControllerConfiguration | undefined;

    constructor(configuration: IConfigurationManager) {
        // Update the prototypes from the config
        Ship.SIZE = new eg.Size2d(configuration.shipConfig.WIDTH, configuration.shipConfig.HEIGHT);
        Ship.DAMAGE_INCREASE_RATE = configuration.shipConfig.DAMAGE_INCREASE_RATE;

        ShipFireController.MIN_FIRE_RATE = eg.TimeSpan.FromMilliseconds(configuration.shipConfig.MIN_FIRE_RATE);

        ShipMovementController.DRAG_AREA = configuration.shipMovementControllerConfig.DRAG_AREA;
        ShipMovementController.DRAG_COEFFICIENT = configuration.shipMovementControllerConfig.DRAG_COEFFICIENT;
        ShipMovementController.ENGINE_POWER = configuration.shipMovementControllerConfig.ENGINE_POWER;
        ShipMovementController.MASS = configuration.shipMovementControllerConfig.MASS;
        ShipMovementController.ROTATE_SPEED = configuration.shipMovementControllerConfig.ROTATE_SPEED * .0174532925; // Convert to radians

        ShipLifeController.START_LIFE = configuration.shipConfig.START_LIFE;

        Boost.DURATION = eg.TimeSpan.FromMilliseconds(configuration.abilityConfig.BOOST_DURATION);
        Boost.SPEED_INCREASE = configuration.abilityConfig.BOOST_SPEED_INCREASE;

        Map.SIZE = new eg.Size2d(configuration.mapConfig.WIDTH, configuration.mapConfig.HEIGHT);
        Map.BARRIER_DEPRECATION = configuration.mapConfig.BARRIER_DEPRECATION;

        GameScreen.MAX_SCREEN_HEIGHT = configuration.screenConfig.MAX_SCREEN_HEIGHT;
        GameScreen.MAX_SCREEN_WIDTH = configuration.screenConfig.MAX_SCREEN_WIDTH;
        GameScreen.MIN_SCREEN_HEIGHT = configuration.screenConfig.MIN_SCREEN_HEIGHT;
        GameScreen.MIN_SCREEN_WIDTH = configuration.screenConfig.MIN_SCREEN_WIDTH;
        GameScreen.SCREEN_BUFFER_AREA = configuration.screenConfig.SCREEN_BUFFER_AREA;

        Bullet.BULLET_DIE_AFTER = eg.TimeSpan.FromMilliseconds(configuration.gameConfig.BULLET_DIE_AFTER);
        Bullet.SIZE = new eg.Size2d(configuration.bulletConfig.WIDTH, configuration.bulletConfig.HEIGHT);

        HealthPack.SIZE = new eg.Size2d(configuration.healthPackConfig.WIDTH, configuration.healthPackConfig.HEIGHT);
        HealthPack.LIFE_SPAN = eg.TimeSpan.FromMilliseconds(configuration.healthPackConfig.LIFE_SPAN);

        LeaderboardManager.LEADERBOARD_SIZE = configuration.leaderboardConfig.LEADERBOARD_SIZE;

        DeathScreen.RESPAWN_TIMER = eg.TimeSpan.FromSeconds(configuration.gameConfig.RESPAWN_TIMER);

        $.extend(this, configuration);
        LatencyResolver.REQUEST_PING_EVERY = configuration.gameConfig.REQUEST_PING_EVERY;
    }
}