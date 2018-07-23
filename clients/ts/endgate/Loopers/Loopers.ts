import { IDisposable } from "../Interfaces/IDisposable";
import { ITyped } from "../Interfaces/ITyped";
import { OnWindowRepaintCompleted } from "../Extensions/WindowExtensions";

export module Loopers {
    export interface ILooper extends IDisposable, ITyped {
        Start(): void;
        AddCallback(callback: LooperCallback): void;
        RemoveCallback(callback: LooperCallback): void;
    }

    export class Looper implements ILooper {
        public _type: string = "Looper";

        private _running: boolean;
        private _callbacks: TimedCallback[];

        constructor() {
            this._running = false;
            this._callbacks = [];
        }

        public AddCallback(timedCallback: TimedCallback): void {
            this._callbacks.push(timedCallback);
            timedCallback.Active = true;

            if (this._running) {
                // Let initial call stack unwind before initiating the loop
                window.setTimeout(() => {
                    this.Loop(timedCallback);
                }, 0);
            }
        }

        public RemoveCallback(timedCallback: TimedCallback): void {
            for (var i = 0; i < this._callbacks.length; i++) {
                if (this._callbacks[i].ID === timedCallback.ID) {
                    window.clearTimeout(timedCallback.TimeoutID);
                    timedCallback.Active = false;
                    this._callbacks.splice(i, 1);
                    return;
                }
            }
        }

        public Start(): void {
            this._running = true;

            this.Run();
        }

        private Run(): void {
            for (var i = 0; i < this._callbacks.length; i++) {
                window.setTimeout(((index) => {
                    return () => {
                        this.Loop(this._callbacks[index]);
                    };
                })(i), 0);
            }
        }

        private Loop(timedCallback: TimedCallback): void {
            var that = this,
                msTimer = 1000 / timedCallback.Fps;

            timedCallback.Callback();

            if (timedCallback.Active) {
                timedCallback.TimeoutID = window.setTimeout(() => {
                    that.Loop(timedCallback);
                }, msTimer);
            }
        }

        public Dispose(): void {
            // We need to "remove" every callback to stop each of their timeouts
            for (var i = this._callbacks.length - 1; i >= 0; i--) {
                this.RemoveCallback(this._callbacks[i]);
            }

            this._callbacks = [];
            this._running = false;
        }
    }

    export class LooperCallback implements ITyped {
        public _type: string = "LooperCallback";

        private static _ids: number = 0;

        constructor(callback: Function) {
            this.Callback = callback;
            this.ID = LooperCallback._ids++;
        }

        public Callback: Function;
        public ID: number;
    }

    // This looper uses the request animation frame to run its internal loop
    // The method has been aliased as "OnRepaintCompleted" via the WindowExtensions
    export class RepaintLooper implements ILooper {
        public _type: string = "RepaintLooper";

        private _running: boolean;
        private _callbacksModified: boolean;
        private _callbacks: LooperCallback[];

        constructor() {
            this._running = false;
            this._callbacksModified = false;
            this._callbacks = [];
        }

        public Start(): void {
            this._running = true;
            this.Run();
        }

        private Run(): void {
            if (this._running) {
                this._callbacksModified = false;

                for (var i = 0; i < this._callbacks.length; i++) {
                    this._callbacks[i].Callback();

                    if (this._callbacksModified) {
                        break;
                    }
                }

                // We want to maintain the "this" context, also we need to continuously bind
                // the method due to how the underlying native function works
                OnWindowRepaintCompleted(() => {
                    this.Run();
                });
            }
        }

        public AddCallback(looperCallback: LooperCallback): void {
            // This doesn't necessarily need to be here (it wont do any harm) but in order for
            // consistency sake I'm putting it in
            this._callbacksModified = true;

            this._callbacks.push(looperCallback);
        }

        public RemoveCallback(looperCallback: LooperCallback): void {
            for (var i = 0; i < this._callbacks.length; i++) {
                if (this._callbacks[i].ID === looperCallback.ID) {
                    this._callbacksModified = true;
                    this._callbacks.splice(i, 1);
                    return;
                }
            }
        }

        public Dispose(): void {
            this._callbacksModified = true;
            this._callbacks = [];
            this._running = false;
        }
    }

    export class TimedCallback extends LooperCallback implements ITyped {
        public _type: string = "TimedCallback";

        constructor(fps: number, callback: Function) {
            super(callback);

            this.Fps = fps;
            this.TimeoutID = 0;
            this.Active = false;
        }

        public Fps: number;
        public TimeoutID: number;
        public Active: boolean;
    }
}