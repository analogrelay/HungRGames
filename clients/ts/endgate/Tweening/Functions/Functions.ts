import { TimeSpan } from "../../Assets/TimeSpan";

export module Functions {

    /**
* Defines an ITweeningFunction interface that represents a function that can be used to translate Tween's.
*/
    export interface ITweeningFunction {
        (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number;
    }

    /**
* Defines an Exponential tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    export class Exponential {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if (elapsedMilliseconds == 0) {
                return from;
            }
            if (elapsedMilliseconds == duration.Milliseconds) {
                return from + change;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * Math.pow(2, 10 * (elapsedMilliseconds - 1)) + from;
            }
            return change / 2 * (-Math.pow(2, -10 * --elapsedMilliseconds) + 2) + from;
        };

        /**
        * Gets the Exponential EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Exponential._easeIn;
        }

        /**
        * Gets the Exponential EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Exponential._easeOut;
        }

        /**
        * Gets the Exponential EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Exponential._easeInOut;
        }
    }

    /**
* Defines an Elastic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    export class Elastic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

            if (elapsedMilliseconds === 0) {
                return from;
            }
            if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                return from + change;
            }

            timePartial = duration.Milliseconds * .3;
            timePartialQuarter = timePartial / 4;

            return -(change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

            if (elapsedMilliseconds === 0) {
                return from;
            }

            if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                return from + change;
            }

            timePartial = duration.Milliseconds * .3;
            timePartialQuarter = timePartial / 4;

            return (change * Math.pow(2, -10 * elapsedMilliseconds) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) + change + from);
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

            if (elapsedMilliseconds === 0) {
                return from;
            }

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) === 2) {
                return from + change;
            }

            timePartial = duration.Milliseconds * (.3 * 1.5);
            timePartialQuarter = timePartial / 4;

            if (elapsedMilliseconds < 1) {
                return -.5 * (change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
            }
            return (change * Math.pow(2, -10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) * .5 + change + from);
        };

        /**
        * Gets the Elastic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Elastic._easeIn;
        }

        /**
        * Gets the Elastic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Elastic._easeOut;
        }

        /**
        * Gets the Elastic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Elastic._easeInOut;
        }
    }

    /**
* Defines a Cubic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    export class Cubic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };

        /**
        * Gets the Cubic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Cubic._easeIn;
        }

        /**
        * Gets the Cubic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Cubic._easeOut;
        }

        /**
        * Gets the Cubic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Cubic._easeInOut;
        }
    }


    /**
    * Defines a Circular tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Circular {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
            }
            return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
        };

        /**
        * Gets the Circular EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Circular._easeIn;
        }

        /**
        * Gets the Circular EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Circular._easeOut;
        }

        /**
        * Gets the Circular EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Circular._easeInOut;
        }
    }

    /**
* Defines a Bounce tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
*/
    export class Bounce {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
            }
            else if (elapsedMilliseconds < (2 / 2.75)) {
                return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
            }
            else if (elapsedMilliseconds < (2.5 / 2.75)) {
                return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
            }
            else {
                return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
            }
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
            }
            else {
                return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
            }
        };

        /**
        * Gets the Bounce EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Bounce._easeIn;
        }

        /**
        * Gets the Bounce EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Bounce._easeOut;
        }

        /**
        * Gets the Bounce EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Bounce._easeInOut;
        }
    }


    /**
    * Defines a Back tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Back {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                constant = 1.70158;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
        };

        /**
        * Gets the Back EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Back._easeIn;
        }

        /**
        * Gets the Back EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Back._easeOut;
        }

        /**
        * Gets the Back EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Back._easeInOut;
        }
    }

    /**
    * Defines a Sinusoidal tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Sinusoidal {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
        };

        /**
        * Gets the Sinusoidal EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Sinusoidal._easeIn;
        }

        /**
        * Gets the Sinusoidal EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Sinusoidal._easeOut;
        }

        /**
        * Gets the Sinusoidal EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Sinusoidal._easeInOut;
        }
    }


    /**
    * Defines a Quintic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quintic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };

        /**
        * Gets the Quintic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quintic._easeIn;
        }

        /**
        * Gets the Quintic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quintic._easeOut;
        }

        /**
        * Gets the Quintic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quintic._easeInOut;
        }
    }


    /**
    * Defines a Quartic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quartic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return -change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 2) + from;
        };

        /**
        * Gets the Quartic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quartic._easeIn;
        }

        /**
        * Gets the Quartic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quartic._easeOut;
        }

        /**
        * Gets the Quartic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quartic._easeInOut;
        }
    }

    /**
    * Defines a Quadratic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quadratic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
            }

            return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
        };

        /**
        * Gets the Quadratic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quadratic._easeIn;
        }

        /**
        * Gets the Quadratic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quadratic._easeOut;
        }

        /**
        * Gets the Quadratic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quadratic._easeInOut;
        }
    }

    /**
* Defines a Linear tweening function that has an EaseNone function that can be used with Tween's.
*/
    export class Linear {
        private static _easeNone: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            return change * elapsed.Milliseconds / duration.Milliseconds + from;
        };

        /**
        * Gets the Linear EaseNone function.
        */
        public static get EaseNone(): ITweeningFunction {
            return Linear._easeNone;
        }
    }
}