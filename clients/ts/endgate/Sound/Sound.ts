import { EventHandler1 } from "../Utilities/EventHandler1";
import { IDisposable } from "../Interfaces/IDisposable";
import { ICloneable } from "../Interfaces/ICloneable";

export module Sound {
    /**
* Defines a set of settings that are used to play AudioClip's a custom way.
*/
    export class AudioSettings implements ICloneable {
        /**
        * The default audio settings.
        */
        public static Default: AudioSettings = new AudioSettings();

        /**
        * Gets or sets the repeat function of the AudioClip.
        */
        public Repeat: boolean;
        /**
        * Gets or sets the volume level of the AudioClip. Value between 0-100.
        */
        public Volume: number;
        /**
        * Gets or sets the auto play functionality of the AudioClip.
        */
        public AutoPlay: boolean;
        /**
        * Gets or sets the preload functionality of the AudioClip.  Values can be "auto", "metadata", or "none".
        */
        public Preload: string;

        /**
        * Creates a new instance of the AudioSettings object with default values.
        */
        constructor();
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        */
        constructor(repeat: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        */
        constructor(repeat: boolean, volume: number);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        * @param preload Initial value of the preload component.  Values can be "auto", "metadata", or "none".
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean, preload: string);
        constructor(repeat: boolean = false, volume: number = 100, autoplay: boolean = false, preload: string = "auto") {
            this.Repeat = repeat;
            this.Volume = volume;
            this.AutoPlay = autoplay;
            this.Preload = preload;
        }

        /**
        * Returns a new AudioSettings object that is identical to the current AudioSettings object.
        */
        public Clone(): AudioSettings {
            return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
        }
    }

    /**
* Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
*/
    export class AudioPlayer {
        private _source: string[];

        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        constructor(source: any) {
            if (!(source instanceof Array)) {
                this._source = [];
                this._source.push(source);
            }
            else {
                this._source = source;
            }
        }

        /**
        * Builds an AudioClip with the default settings.
        */
        public BuildClip(): AudioClip;
        /**
        * Builds an AudioClip with the provided settings.
        * @param settings Audio settings to play the AudioClip with.
        */
        public BuildClip(settings: AudioSettings): AudioClip;
        public BuildClip(settings: AudioSettings = AudioSettings.Default): AudioClip {
            return new AudioClip(this._source, settings);
        }

        /**
        * Builds an AudioClip and plays it with the default settings.  Returns the built audio clip.
        */
        public Play(): AudioClip;
        /**
        * Builds an AudioClip and plays it with the provided settings.  Returns the built audio clip.
        * @param settings Audio settings to play the AudioClip with.
        */
        public Play(settings: AudioSettings): AudioClip;
        public Play(settings: AudioSettings = AudioSettings.Default): AudioClip {
            var clip = new AudioClip(this._source, settings);

            clip.Play();

            return clip;
        }
    }

    var supportedAudioTypes = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        aac: 'audio/aac',
        m4a: 'audio/x-m4a'
    };

    /**
    * Defines a single audio clip that can be played, stopped or paused.
    */
    export class AudioClip implements IDisposable {
        private _audio: HTMLAudioElement;
        private _settings: AudioSettings;
        private _onComplete: EventHandler1<Event>;
        private _canPlayWires: Array<() => void>;
        // @ts-ignore
        private _endedWire: (e: Event) => void;
        private _disposed: boolean;

        /**
        * Creates a new instance of the AudioClip object.
        * @param source An audio element to use as the source audio clip.
        */
        constructor(source: HTMLAudioElement);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        * @param settings Audio clip settings.
        */
        constructor(source: string, settings: AudioSettings);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        * @param settings Audio clip settings.
        */
        constructor(source: string[], settings: AudioSettings);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An audio element to use as the source audio clip.
        * @param settings Audio clip settings.
        */
        constructor(source: HTMLAudioElement, settings: AudioSettings);
        constructor(source: any, settings: AudioSettings = AudioSettings.Default) {
            this._disposed = false;
            this._settings = settings.Clone();
            this._canPlayWires = [];

            if (source instanceof HTMLAudioElement) {
                this._audio = source;
            }
            else {
                this._audio = <HTMLAudioElement>document.createElement("audio");
                this.SetAudioSource(source);
            }

            this.ApplySettings();

            this._onComplete = new EventHandler1<Event>();
        }

        /**
        * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler1<Event> {
            return this._onComplete;
        }

        /**
        * Gets or sets the audio clip volume.
        */
        public get Volume(): number {
            return this._settings.Volume;
        }
        public set Volume(percent: number) {
            this._settings.Volume = percent;
            this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
        }

        /**
        * Determines if the AudioClip is currently playing.
        */
        public IsPlaying(): boolean {
            return !this._audio.paused;
        }

        /**
        * Determines if the AudioClip has completed.
        */
        public IsComplete(): boolean {
            return this._audio.ended;
        }

        /**
        * Plays the current audio clip.
        */
        public Play(): void {
            var wire: () => void;

            if (this._audio.readyState === <any>0) {
                wire = () => {
                    this._audio.play();
                };
                this._canPlayWires.push(wire);
                this._audio.addEventListener("canplay", wire, true);
            }
            else {
                this._audio.play();
            }
        }

        /**
        * Pauses the current audio clip.
        */
        public Pause(): void {
            this._audio.pause();
        }

        /**
        * Seeks the audio clip to the provided time.
        * @param time The time to seek to.
        */
        public Seek(time: number): void {
            var wire: () => void;

            if (this._audio.readyState === <any>0) {
                wire = () => {
                    this._audio.currentTime = time;
                };

                this._canPlayWires.push(wire);

                this._audio.addEventListener("canplay", wire, true);
            }
            else {
                this._audio.currentTime = time;
            }
        }

        /**
        * Stops the current audio clip and seeks back to time 0.
        */
        public Stop(): void {
            this.Seek(0);
            this._audio.pause();
        }

        /**
        * Unbinds all events and nulls out the settings and audio component to allow for garbage collection.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._onComplete.Dispose();
                for (var i = 0; i < this._canPlayWires.length; i++) {
                    this._audio.removeEventListener("canplay", this._canPlayWires[i], true);
                }

                this._audio.removeEventListener("ended", this._endedWire, true);
                // @ts-ignore
                this._audio = null;
                // @ts-ignore
                this._settings = null;
            }
            else {
                throw new Error("Cannot dispose AudioClip more than once.");
            }
        }

        private SetAudioSource(source: any): void {
            var sourceHolder: HTMLSourceElement,
                sourceType: string;

            // If we've passed in a list of sources
            if (!(source instanceof Array)) {
                source = [source];
            }

            for (var i = 0; i < source.length; i++) {
                sourceHolder = <HTMLSourceElement>document.createElement("source");
                sourceHolder.src = source[i];

                // @ts-ignore
                sourceType = supportedAudioTypes[source[i].split('.').pop()];

                if (typeof sourceType !== "undefined") {
                    sourceHolder.type = sourceType;
                }

                this._audio.appendChild(sourceHolder);
            }
        }

        private ApplySettings(): void {
            this._audio.loop = this._settings.Repeat;
            this._audio.autoplay = this._settings.AutoPlay;
            this._audio.preload = this._settings.Preload;
            this.Volume = this._settings.Volume;

            this._endedWire = (e: Event) => {
                this.OnComplete.Trigger(e);
            };

            this._audio.addEventListener("ended", this._endedWire, true);
        }

    }
}