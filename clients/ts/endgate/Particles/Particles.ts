import { IUpdateable } from "../Interfaces/IUpdateable";
import { Graphics } from "../Graphics/Graphics";
import { TimeSpan } from "../Assets/TimeSpan";
import { EventHandler1 } from "../Utilities/EventHandler1";
import { Vector2d } from "../Assets/Vectors/Vector2d";
import { Tweening } from "../Tweening/Tweening";
import { GameTime } from "../GameTime";
import { ICloneable } from "../Interfaces/ICloneable";
import { Bounds } from "../Bounds/Bounds";
import { Functions } from "../Tweening/Functions/Functions";

export module Particles {
    /**
* Defines a particle that abides by several configured values.
*/
    export class Particle implements IUpdateable {
        // @ts-ignore
        public _id: number;

        private _texture: Graphics.Graphic2d;
        private _locationTween: Tweening.Vector2dTween;
        private _fadeTween: Tweening.NumberTween;
        private _fadeOutDuration: TimeSpan;
        private _rotationSpeed: number;
        private _createdAt: number;
        private _lifetime: TimeSpan;
        private _alive: boolean;
        private _onDeath: EventHandler1<Particle>;
        private _fadeOutAt: number;
        private _fadingOut: boolean;

        /**
        * Creates a new instance of the Particle object.
        * @param texture The texture for the particle.
        * @param fromLocation The from location of the Particle.
        * @param toLocation The end location of the Particle.
        * @param scale How large the Particles Texture should be.  Value will multiply the size of the provided texture.
        * @param opacity The particles opacity.  Value should be between 0 and 1.
        * @param rotation The particles initial rotation.  Value should be in radians.
        * @param rotationSpeed How fast the particle should rotate.  Value should be X radians per second.
        * @param lifetime How long the particle should live before dying.
        * @param fadeInDuration How long the particle should take to fade in.
        * @param fadeOutDuration How long the particle should take to fade out.
        * @param movementFunction The function to use to move from the 'fromLocation' to the 'toLocation'.
        */
        constructor(texture: Graphics.Graphic2d, fromLocation: Vector2d, toLocation: Vector2d, scale: number, opacity: number, rotation: number, rotationSpeed: number, lifetime: TimeSpan, fadeInDuration: TimeSpan, fadeOutDuration: TimeSpan, movementFunction: Functions.ITweeningFunction) {
            texture.Position = fromLocation;
            texture.Scale(scale);
            texture.Rotation = rotation;
            texture.Opacity = 0;

            this._texture = texture;
            this._rotationSpeed = rotationSpeed;
            this._alive = true;
            this._fadingOut = false;
            this._lifetime = lifetime;
            this._createdAt = new Date().getTime();
            this._onDeath = new EventHandler1<Particle>();
            this._fadeOutDuration = fadeOutDuration;
            this._fadeOutAt = lifetime.Milliseconds - fadeOutDuration.Milliseconds;
            this._locationTween = new Tweening.Vector2dTween(texture.Position, toLocation, lifetime, movementFunction);
            this._fadeTween = new Tweening.NumberTween(0, opacity * 100, fadeInDuration, Functions.Linear.EaseNone);

            this._locationTween.Play();
            this._fadeTween.Play();
        }

        /**
        * Gets the particles texture.
        */
        public get Texture(): Graphics.Graphic2d {
            return this._texture;
        }

        /**
        * Gets an event that is triggered when the particle dies.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDeath(): EventHandler1<Particle> {
            return this._onDeath;
        }

        /**
        * Determines if the particle is alive.
        */
        public IsAlive(): boolean {
            return this._alive;
        }

        /**
        * Makes the particle move, fade, and even die if needed.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var aliveFor: number;

            if (this._alive) {
                aliveFor = gameTime.Now.getTime() - this._createdAt;

                if (aliveFor > this._lifetime.Milliseconds) {
                    this._alive = false;
                    this._onDeath.Trigger(this);
                }
                else {
                    if (!this._fadingOut && aliveFor >= this._fadeOutAt) {
                        this._fadingOut = true;
                        this._fadeTween.From = this._texture.Opacity * 100;
                        this._fadeTween.To = 0;
                        this._fadeTween.Duration = this._fadeOutDuration;
                        this._fadeTween.Restart();
                    }

                    this._locationTween.Update(gameTime);
                    this._fadeTween.Update(gameTime);

                    this._texture.Rotation += gameTime.Elapsed.Seconds * this._rotationSpeed;
                    this._texture.Position = this._locationTween.Current;
                    this._texture.Opacity = this._fadeTween.Current / 100;
                }
            }
        }
    }

    /**
* Defines a range that is used to describe a range of values.
*/
    export class Range<T> implements ICloneable {
        /**
        * Gets or sets the minimum value of the range.
        */
        public Min: T;
        /**
        * Gets or sets the maximum value of the range.
        */
        public Max: T;

        /**
        * Creates a new instance of the Range object.
        * @param value The min and max value of the range.
        */
        constructor(value: T);
        /**
        * Creates a new instance of the Range object.
        * @param min The initial min value of the range.
        * @param max The initial max value of the range.
        */
        constructor(min: T, max: T);
        constructor(min: T, max: T = min) {
            this.Min = min;
            this.Max = max;
        }

        /**
        * Returns an identical copy of this range.
        */
        public Clone(): Range<T> {
            return new Range<T>(this.Min, this.Max);
        }

        /**
        * Returns a random number between range.Min and range.Max.
        * @param range The range used to bound the number value.
        */
        public static RandomNumber(range: Range<number>): number {
            return Math.random() * (range.Max - range.Min) + range.Min;
        }

        /**
        * Returns a random TimeSpan between range.Min and range.Max.
        * @param range The range used to bound the TimeSpan value.
        */
        public static RandomTimeSpan(range: Range<TimeSpan>): TimeSpan {
            return TimeSpan.FromMilliseconds(Math.floor(Math.random() * (range.Max.Milliseconds - range.Min.Milliseconds + 1) + range.Min.Milliseconds));
        }
    }

    /**
* Defines a particle emitter that can emit particles based on various configurations.
*/
    export class Emitter extends Graphics.Graphic2d implements IUpdateable {
        private _texturePool: Array<Graphics.Graphic2d>;
        private _particlePool: { [particleId: number]: Particle };
        private _particleId: number;
        // @ts-ignore
        private _lastEmit: number;
        private _emitting: boolean;
        private _particleRemover: (particle: Particle) => void;

        /**
        * Gets or sets the EmissionFunction.  The EmissionFunction is used to control how emitted particles move once emitted.
        */
        public EmissionFunction: Functions.ITweeningFunction;
        /**
        * Gets or sets the EmissionInterval.  The EmissionInterval is used to control how often particles are emitted.
        */
        public EmissionInterval: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromMilliseconds(30));
        /**
        * Gets or sets the EmissionDirection.  The EmissionDirection is used to control the angle of particle emissions.  This angle value should be in radians.
        */
        public EmissionDirection: Range<number> = new Range<number>(0, Math.PI * 2);
        /**
        * Gets or sets the EmissionOutput.  The EmissionOutput is used to control how many particles should be emitted per emission.
        */
        public EmissionOutput: Range<number> = new Range<number>(1);
        /**
        * Gets or sets the ParticleLifetime.  The ParticleLifetime is used to control how long particles live before dying out.
        */
        public ParticleLifetime: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(3));
        /**
        * Gets or sets the ParticleSpeed.  The ParticleSpeed is used to control the average speed that emitted particles will move at during their lifetime.
        */
        public ParticleSpeed: Range<number> = new Range<number>(30, 100);
        /**
        * Gets or sets the ParticleScale.  The ParticleScale is used to control each particles size.  Values are percentages of particles base sizes.
        */
        public ParticleScale: Range<number> = new Range<number>(.75, 1.5);
        /**
        * Gets or sets the ParticleRotation.  The ParticleRotation is used to control the initial rotation of emitted particles.
        */
        public ParticleRotation: Range<number> = new Range<number>(0, Math.PI * 2);
        /**
        * Gets or sets the ParticleRotationSpeed.  The ParticleRotationSpeed is used to control how quickly emitted particles rotate.  Values should indicate X number of radians per second.
        */
        public ParticleRotationSpeed: Range<number> = new Range<number>(0, Math.PI);
        /**
        * Gets or sets the ParticleOpacity.  The ParticleOpacity is used to control emitted particles opacity.  Values should be between 0 and 1.
        */
        public ParticleOpacity: Range<number> = new Range<number>(1);
        /**
        * Gets or sets the ParticleFadeInDuration.  The ParticleFadeInDuration is used to control how long particles take to fade in.
        */
        public ParticleFadeInDuration: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromSeconds(.5));
        /**
        * Gets or sets the ParticleFadeOutDuration.  The ParticleFadeOutDuration is used to control how long particles take to fade out.
        */
        public ParticleFadeOutDuration: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromSeconds(.5), TimeSpan.FromSeconds(1));

        /**
        * Creates a new instance of the Emitter object.
        * @param x The initial horizontal location of the Emitter.
        * @param y The initial vertical location of the Emitter.
        * @param emissionFunction The initial EmissionFunction to use for particle control.
        */
        constructor(x: number, y: number, emissionFunction: Functions.ITweeningFunction) {
            super(new Vector2d(x, y));

            this._texturePool = new Array<Graphics.Graphic2d>()
            this._particlePool = {};
            this._particleId = 0;
            this._emitting = false;
            this._particleRemover = (particle: Particle) => {
                this.RemoveChild(particle.Texture);
                delete this._particlePool[particle._id];
            };

            this.EmissionFunction = emissionFunction;
        }

        /**
        * Determines if the Emitter is emitting particles.
        */
        public IsEmitting(): boolean {
            return this._emitting;
        }

        /**
        * Starts the Emitter.  Update must be called once started to begin auto-emission of particles.
        */
        public Start(): void {
            if (this._texturePool.length === 0) {
                throw new Error("Cannot start Emitter without any textures added to it.");
            }

            this._emitting = true;
            this._lastEmit = new Date().getTime();
        }

        /**
        * Stops the Emitter, no particles will be emitted while stopped.
        */
        public Stop(): void {
            this._emitting = false;
        }

        /**
        * Adds a texture to the Emitters texture pool.
        * @param texture The texture to add to the pool.
        */
        public AddTexture(texture: Graphics.Graphic2d): void;
        /**
        * Adds a texture to the Emitters texture pool with the provided weight.
        * @param texture The texture to add to the pool.
        * @param weight The weight of the provided texture. A texture with weight 2 will be emitted two times more than a texture with weight 1.
        */
        public AddTexture(texture: Graphics.Graphic2d, weight: number): void;
        public AddTexture(texture: Graphics.Graphic2d, weight: number = 1): void {
            for (var i = 0; i < weight; i++) {
                this._texturePool.push(texture);
            }
        }

        /**
        * Removes the provided texture from the texture pool.
        * @param texture The texture to remove from the pool.
        */
        public RemoveTexture(texture: Graphics.Graphic2d): void {
            for (var i = 0; i < this._texturePool.length; i++) {
                if (this._texturePool[i] === texture) {
                    this._texturePool.splice(i--, 1);
                }
            }
        }

        /**
        * Emits particles based on the Emitters configuration.  Does not abide by the EmissionInterval.
        * To allow for complex particle manipulation this method can be overridden by derived Emitter classes.
        */
        public Emit(): Array<Particle> {
            var particleCount: number = Range.RandomNumber(this.EmissionOutput),
                endLocation: Vector2d,
                emissionDirection: number,
                particleSpeed: number,
                particleLifeTime: TimeSpan,
                particle: Particle,
                particles: Array<Particle> = new Array<Particle>();

            for (var i = 0; i < particleCount; i++) {
                particleLifeTime = Range.RandomTimeSpan(this.ParticleLifetime);
                particleSpeed = Range.RandomNumber(this.ParticleSpeed);
                emissionDirection = Range.RandomNumber(this.EmissionDirection);
                endLocation = new Vector2d(particleLifeTime.Seconds * particleSpeed, 0).RotateAround(Vector2d.Zero, emissionDirection);

                particle = new Particle(
                    this.BuildTextureFromPool(),
                    Vector2d.Zero,
                    endLocation,
                    Range.RandomNumber(this.ParticleScale),
                    Range.RandomNumber(this.ParticleOpacity),
                    Range.RandomNumber(this.ParticleRotation),
                    Range.RandomNumber(this.ParticleRotationSpeed),
                    particleLifeTime,
                    Range.RandomTimeSpan(this.ParticleFadeInDuration),
                    Range.RandomTimeSpan(this.ParticleFadeOutDuration),
                    this.EmissionFunction
                );

                particle._id = this._particleId++;

                this._particlePool[particle._id] = particle;

                this.AddChild(particle.Texture);
                particle.OnDeath.Bind(this._particleRemover);

                particles.push(particle);
            }

            return particles;
        }

        /**
        * Draws the Emitter onto the given context.  If this Emitter is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the Emitter onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);
            super._EndDraw(context);
        }

        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            throw new Error("Scale is not implemented for the Emitter class.");
        }

        /**
        * Attempts to emit particles if the configured EmisisonInterval has passed since the last Emission.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var timeSinceEmit: number,
                emitCount: number,
                emissionRate: number;

            if (this._emitting) {
                emissionRate = Range.RandomTimeSpan(this.EmissionInterval).Milliseconds;
                if (emissionRate > 0) {
                    timeSinceEmit = gameTime.Now.getTime() - this._lastEmit;
                    emitCount = Math.floor(timeSinceEmit / emissionRate);

                    if (emitCount > 0) {
                        this._lastEmit = gameTime.Now.getTime();

                        for (var i = 0; i < emitCount; i++) {
                            this.Emit();
                        }
                    }
                }

                for (var particleId in this._particlePool) {
                    this._particlePool[particleId].Update(gameTime);
                }
            }
        }

        /**
        * The bounding area that represents where the Emitter will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingCircle(this.Position, this.ParticleSpeed.Max * this.ParticleLifetime.Max.Seconds);

            return bounds;
        }

        /**
        * Returns a nearly identical copy of this Emitter.  The cloned Emitter will be stopped.  If this Emitter belongs to a parent, the cloned Emitter will not. The cloned Emitter will not have the same event bindings as this one does.
        */
        public Clone(): Emitter {
            var clone = new Emitter(this.Position.X, this.Position.Y, this.EmissionFunction);

            for (var i = 0; i < this._texturePool.length; i++) {
                clone.AddTexture(this._texturePool[i]);
            }

            clone.EmissionInterval = this.EmissionInterval.Clone();
            clone.EmissionDirection = this.EmissionDirection.Clone();
            clone.EmissionOutput = this.EmissionOutput.Clone();
            clone.ParticleLifetime = this.ParticleLifetime.Clone();
            clone.ParticleSpeed = this.ParticleSpeed.Clone();
            clone.ParticleRotation = this.ParticleRotation.Clone();
            clone.ParticleRotationSpeed = this.ParticleRotationSpeed.Clone();
            clone.ParticleFadeInDuration = this.ParticleFadeInDuration.Clone();
            clone.ParticleFadeOutDuration = this.ParticleFadeOutDuration.Clone();
            clone.ParticleScale = this.ParticleScale.Clone();
            clone.ParticleOpacity = this.ParticleOpacity.Clone();

            clone.Opacity = this.Opacity;
            clone.Rotation = this.Rotation;
            clone.Visible = this.Visible;
            clone.ZIndex = this.ZIndex;

            return clone;
        }

        private BuildTextureFromPool(): Graphics.Graphic2d {
            var textureIndex = Math.floor(Math.random() * this._texturePool.length);

            return this._texturePool[textureIndex].Clone();
        }
    }
}