using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using ShootR.GameModel;

namespace ShootR.BotClient.Payloads
{
    internal class PayloadDecompressor
    {
        private readonly InitializationData _initializationData;
        private readonly PayloadContract _payloadContract;
        private readonly CollidableContract _collidableContract;
        private readonly ShipContract _shipContract;
        private readonly BulletContract _bulletContract;
        private readonly LeaderboardEntryContract _leaderboardEntryContract;
        private readonly PowerupContract _powerupContract;

        public PayloadDecompressor(InitializationData initializationData)
        {
            if (initializationData == null)
            {
                throw new ArgumentNullException(nameof(initializationData));
            }

            _initializationData = initializationData;
            _payloadContract = initializationData.CompressionContracts[nameof(PayloadContract)].ToObject<PayloadContract>();
            _collidableContract = initializationData.CompressionContracts[nameof(CollidableContract)].ToObject<CollidableContract>();
            _shipContract = initializationData.CompressionContracts[nameof(ShipContract)].ToObject<ShipContract>();
            _bulletContract = initializationData.CompressionContracts[nameof(BulletContract)].ToObject<BulletContract>();
            _leaderboardEntryContract = initializationData.CompressionContracts[nameof(LeaderboardEntryContract)].ToObject<LeaderboardEntryContract>();
            _powerupContract = initializationData.CompressionContracts[nameof(PowerupContract)].ToObject<PowerupContract>();
        }

        private void DecompressIntoCollidable<TMovementData>(JArray data, CollidableData<TMovementData> collidable) where TMovementData : MovementData, new()
        {
            var id = ExtractValue<int>(data, _collidableContract.ID);
            var disposed = ExtractValue<bool>(data, _collidableContract.Disposed);
            var collided = ExtractValue<bool>(data, _collidableContract.Collided);
            var collidedAt = new Vector2(ExtractValue<double>(data, _collidableContract.CollidedAtX), ExtractValue<double>(data, _collidableContract.CollidedAtY));
            var forces = new Vector2(ExtractValue<double>(data, _collidableContract.ForcesX), ExtractValue<double>(data, _collidableContract.ForcesY));
            var mass = ExtractValue<int>(data, _collidableContract.Mass);
            var position = new Vector2(ExtractValue<double>(data, _collidableContract.PositionX), ExtractValue<double>(data, _collidableContract.PositionY));
            var rotation = ExtractValue<double>(data, _collidableContract.Rotation) * .0174532925;
            var velocity = new Vector2(ExtractValue<double>(data, _collidableContract.VelocityX), ExtractValue<double>(data, _collidableContract.VelocityY));
            var alive = ExtractValue<bool>(data, _collidableContract.Alive);
            var health = ExtractValue<double>(data, _collidableContract.Health);

            var movementData = new TMovementData()
            {
                Forces = forces,
                Mass = mass,
                Position = position,
                Rotation = rotation,
                Velocity = velocity,
            };
            var lifeData = new LifeData()
            {
                Alive = alive,
                Health = health,
            };

            collidable.Collided = collided;
            collidable.Disposed = disposed;
            collidable.Id = id;
            collidable.Life = lifeData;
            collidable.Movement = movementData;
        }

        private void DecompressIntoShip(JArray data, ShipData ship)
        {
            var movingFlags = new MovingFlags()
            {
                RotatingLeft = ExtractValue<bool>(data, _shipContract.RotatingLeft),
                RotatingRight = ExtractValue<bool>(data, _shipContract.RotatingRight),
                Forward = ExtractValue<bool>(data, _shipContract.Forward),
                Backward = ExtractValue<bool>(data, _shipContract.Backward),
            };
            var name = ExtractValue<string>(data, _shipContract.Name);
            var maxLife = ExtractValue<double>(data, _shipContract.MaxLife);
            var level = ExtractValue<int>(data, _shipContract.Level);
            var boosting = ExtractValue<bool>(data, _shipContract.Boost);
            var abilityData = new AbilityData()
            {
                Boosting = boosting
            };

            DecompressIntoCollidable(data, ship);
            ship.Movement.Position = ship.Movement.Position + _initializationData.Configuration.ShipConfiguration.WIDTH * .5;
            ship.Movement.Moving = movingFlags;
            ship.Name = name;
            ship.MaxLife = maxLife;
            ship.Level = level;
            ship.Abilities = abilityData;
        }

        private void DecompressIntoBullet(JArray data, BulletData bullet)
        {
            DecompressIntoCollidable(data, bullet);
            var damageDealt = ExtractValue<int>(data, _bulletContract.DamageDealt);

            bullet.DamangeDealt = damageDealt;
        }

        private void DecompressIntoPowerup(JArray data, PowerupData powerup)
        {
            var id = ExtractValue<int>(data, _powerupContract.ID);
            var disposed = ExtractValue<bool>(data, _powerupContract.Disposed);
            var positionOffset = new Vector2(_initializationData.Configuration.HealthPackConfiguration.WIDTH * .5, _initializationData.Configuration.HealthPackConfiguration.HEIGHT * .5);
            var position = new Vector2(ExtractValue<double>(data, _powerupContract.PositionX), ExtractValue<double>(data, _powerupContract.PositionY)) + positionOffset;
            var powerupType = (PowerupType)ExtractValue<int>(data, _powerupContract.Type);
            var movementData = new MovementData()
            {
                Position = position,
                Rotation = 0
            };
            var lifeData = new LifeData()
            {
                Alive = true,
                Health = 0,
            };

            powerup.Id = id;
            powerup.Disposed = disposed;
            powerup.Type = powerupType;
            powerup.Movement = movementData;
            powerup.Life = lifeData;
        }

        public PayloadData DecompressPayload(JArray data)
        {
            var ships = new List<ShipData>();
            var shipsData = (JArray)data[_payloadContract.Ships];
            for (var i = 0; i < shipsData.Count; i++)
            {
                var shipData = (JArray)shipsData[i];
                var ship = new ShipData();
                DecompressIntoShip(shipData, ship);
                ships.Add(ship);
            }

            var bullets = new List<BulletData>();
            var bulletsData = (JArray)data[_payloadContract.Bullets];
            for (var i = 0; i < bulletsData.Count; i++)
            {
                var bulletData = (JArray)bulletsData[i];
                var bullet = new BulletData();
                DecompressIntoBullet(bulletData, bullet);
                bullets.Add(bullet);
            }

            var powerups = new List<PowerupData>();
            var powerupsData = (JArray)data[_payloadContract.Powerups];
            for (var i = 0; i < powerupsData.Count; i++)
            {
                var powerupData = (JArray)powerupsData[i];
                var powerup = new PowerupData();
                DecompressIntoPowerup(powerupData, powerup);
                powerups.Add(powerup);
            }

            var experience = ExtractValue<int>(data, _payloadContract.Experience);
            var experienceToNextLevel = ExtractValue<int>(data, _payloadContract.ExperienceToNextLevel);
            var kills = ExtractValue<int>(data, _payloadContract.Kills);
            var deaths = ExtractValue<int>(data, _payloadContract.Deaths);
            var killedByName = ExtractValue<string>(data, _payloadContract.KilledByName);
            var killedByPhoto = ExtractValue<string>(data, _payloadContract.KilledByPhoto);

            var payload = new PayloadData()
            {
                Ships = ships,
                Bullets = bullets,
                Powerups = powerups,
                Experience = experience,
                ExperienceToNextLevel = experienceToNextLevel,
                Kills = kills,
                Deaths = deaths,
                KilledByName = killedByName,
                KilledByPhoto = killedByPhoto,
            };

            return payload;
        }

        private TValue ExtractValue<TValue>(JArray data, int index)
        {
            if (data.Count <= index)
            {
                return default;
            }

            return data[index].Value<TValue>();
        }
    }
}
