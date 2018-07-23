import { Vector2d } from "../Assets/Vectors/Vector2d";
import { TimeSpan } from "../Assets/TimeSpan";
import { Functions } from "./Functions/Functions";
import { ICloneable } from "../Interfaces/ICloneable";
import { IDisposable } from "../Interfaces/IDisposable";
import { IUpdateable } from "../Interfaces/IUpdateable";
import { EventHandler1 } from "../Utilities/EventHandler1";
import { GameTime } from "../GameTime";
import { Size2d } from "../Assets/Sizes/Size2d";
import { Graphics } from "../Graphics/Graphics";

export module Tweening {

    //interface Number extends ICloneable {
    //    Clone: () => number;
    //}

    //(<any>Number.prototype).Clone = function (): number { return this; };
    /**
* Defines a base Tween class that is used to move a value from a start value to an end value.
*/
    function Clone<T extends ICloneable | number>(item: T): T {
        if ((<any>item).Clone) {
            return (<any>item).Clone();
        }

        return item;
    }

    export class Tween<T extends ICloneable | number> implements IDisposable, IUpdateable {
        private _from: T;
        private _to: T;
        private _current: T;
        private _duration: TimeSpan;
        private _elapsed: TimeSpan;
        private _playing: boolean;
        private _tweeningFunction: Functions.ITweeningFunction;
        private _onChange: EventHandler1<T>;
        private _onComplete: EventHandler1<Tween<T>>;

        /**
        * Creates a new instance of the Tween object.  This should only ever be called from derived classes via a super constructor call.
        * @param from Start value.
        * @param to End value.
        * @param duration How fast to move the current value from start to end.
        * @param tweeningFunction The function to use to translate the current value from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: T, to: T, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            this._from = Clone(from);
            this._to = Clone(to);
            this._current = Clone(this._from);
            this._duration = duration;
            this._elapsed = TimeSpan.Zero;
            this._playing = false;
            this._onChange = new EventHandler1<T>();
            this._onComplete = new EventHandler1<Tween<T>>();
            this._tweeningFunction = tweeningFunction;
        }

        /**
        * Gets an event that is triggered when the tween has changed its Current value, occurs directly after a tween update.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnChange(): EventHandler1<T> {
            return this._onChange;
        }

        /**
        * Gets an event that is triggered when the tween has completed transitioning the Current value, once triggered Elapsed will be equivalent to Duration and Current will be equivalent to To.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler1<Tween<T>> {
            return this._onComplete;
        }

        /**
        * Gets or sets the From component of the tween.
        */
        public get From(): T {
            return this._from;
        }
        public set From(from: T) {
            this._from = from;
        }

        /**
        * Gets or sets the To component of the tween.
        */
        public get To(): T {
            return this._to;
        }
        public set To(to: T) {
            this._to = to;
        }

        /**
        * Gets or sets the Current component of the tween.  The Current is the current value of the tween, the final value of Current will be equivalent to To when the tween has completed.
        */
        public get Current(): T {
            return this._current;
        }
        public set Current(current: T) {
            this._current = current;
        }

        /**
        * Gets or sets the Duration component of the tween.  The Duration is how long the tween will take to go From -> To.
        */
        public get Duration(): TimeSpan {
            return this._duration;
        }
        public set Duration(duration: TimeSpan) {
            this._duration = duration;
        }

        /**
        * Gets or the Elapsed component of the tween.  Elapsed represents how far along the tween is.  When Elapsed equals Duration the tween is completed.
        */
        public get Elapsed(): TimeSpan {
            return this._elapsed.Clone();
        }

        /**
        * Gets or sets the TweeningFunction of the tween.  The TweeningFunction controls how the tween translates the Current value to the To value.
        */
        public get TweeningFunction(): Functions.ITweeningFunction {
            return this._tweeningFunction;
        }
        public set TweeningFunction(fn: Functions.ITweeningFunction) {
            this._tweeningFunction = fn;
        }

        /**
        * Determines if the tween is playing.
        */
        public IsPlaying(): boolean {
            return this._playing;
        }

        /**
        * Starts playing the tween.  The tween will only start translating the value if Update is called.
        */
        public Play(): void {
            this._playing = true;
        }

        /**
        * Pauses the tween.  Calls to update will not translate the tween when paused.
        */
        public Pause(): void {
            this._playing = false;
        }

        /**
        * Resets the tween to the To location and resets the Elapsed time.  This does not stop or start the tween.
        */
        public Reset(): void {
            this._elapsed.Milliseconds = 0;
            this._current = Clone(this._from);
        }

        /**
        * Stops the tween from playing.  This also resets the tween to its To value.
        */
        public Stop(): void {
            this._playing = false;
            this.Reset();
        }

        /**
        * Restarts the tween.  Essentially calls Reset and then Play.
        */
        public Restart(): void {
            this.Reset();
            this.Play();
        }

        /**
        * Reverses the tween from the Current value back to the From value.  This changes the To component to equal the From value and the From value to equal the Current value.
        */
        public Reverse(): void {
            this._elapsed = TimeSpan.Zero;
            this._to = this._from;
            this._from = Clone(this.Current);
        }

        /**
        * Updates the tweens Current and Elapsed component if the tween is playing.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: GameTime): void {
            if (!this._playing) {
                return;
            }

            this._elapsed = this._elapsed.Add(gameTime.Elapsed);

            if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                this._elapsed = this._duration.Clone();

                this._current = Clone(this._to);
                this._playing = false;

                this._onChange.Trigger(Clone(this._current));
                this._onComplete.Trigger(this);
            }
            else {
                this._UpdateTween();
                this._onChange.Trigger(Clone(this._current));
            }
        }

        /**
        * Stops and unbinds all events from the tween.
        */
        public Dispose(): void {
            this.Stop();
            this._onChange.Dispose();
            this._onComplete.Dispose();
        }

        public _UpdateTween(): void {
            // This should be overridden
        }
    }

    /**
* Defines a Size2dTween class that is used to move a Size2d from a start value to an end value.
*/
    export class Size2dTween extends Tween<Size2d> {

        /**
        * Creates a new instance of the Size2dTween object.
        * @param from Start Size2d.
        * @param to End Size2d.
        * @param duration How fast to move the current Size2d from start to end.
        * @param tweeningFunction The function to use to translate the current Size2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Size2d, to: Size2d, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = new Size2d(
                this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration),
                this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration)
            );
        }
    }

    /**
    * Defines a NumberTween class that is used to move a number from a start value to an end value.
    */
    export class NumberTween extends Tween<number> {

        /**
        * Creates a new instance of the NumberTween object.
        * @param from Start number.
        * @param to End number.
        * @param duration How fast to move the current number from start to end.
        * @param tweeningFunction The function to use to translate the current number from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: number, to: number, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
        }
    }

    /**
* Defines a ColorTween class that is used to move a number from a start value to an end value.
*/
    export class ColorTween extends Tween<Graphics.Color> {

        /**
        * Creates a new instance of the ColorTween object.
        * @param from Start color.
        * @param to End color.
        * @param duration How fast to move the current color from start to end.
        * @param tweeningFunction The function to use to translate the current color from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Graphics.Color, to: Graphics.Color, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current.R = this.TweeningFunction(this.From.R, this.To.R, this.Elapsed, this.Duration);
            this.Current.G = this.TweeningFunction(this.From.G, this.To.G, this.Elapsed, this.Duration);
            this.Current.B = this.TweeningFunction(this.From.B, this.To.B, this.Elapsed, this.Duration);
        }
    }

    /**
    * Defines a Vector2dTween class that is used to move a Vector2d from a start value to an end value.
    */
    export class Vector2dTween extends Tween<Vector2d> {

        /**
        * Creates a new instance of the Vector2dTween object.
        * @param from Start Vector2d.
        * @param to End Vector2d.
        * @param duration How fast to move the current Vector2d from start to end.
        * @param tweeningFunction The function to use to translate the current Vector2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Vector2d, to: Vector2d, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = new Vector2d(
                this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration),
                this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
        }
    }


}