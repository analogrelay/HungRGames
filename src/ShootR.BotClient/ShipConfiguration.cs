using System;
using System.Collections.Generic;
using System.Text;

namespace ShootR.BotClient
{
    internal class ShipConfiguration
    {
        public int HEIGHT { get; set; }
        public double ENERGY_TO_FIRE { get; set; }
        public int ENERGY_RECHARGE_RATE { get; set; }
        public int MIN_FIRE_RATE { get; set; }
        public int WIDTH { get; set; }
        public int START_LIFE { get; set; }
        public double DAMAGE_INCREASE_RATE { get; set; }
    }
}
