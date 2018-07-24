import { Bounds } from "../Bounds/Bounds";
import { IDisposable } from "../Interfaces/IDisposable";
import { Graphics } from "../Graphics/Graphics";
import { Vector2d } from "../Assets/Vectors/Vector2d";
import { Size2d } from "../Assets/Sizes/Size2d";
import { EventHandler1 } from "../Utilities/EventHandler1";

export module Rendering {

    /**
* Represents a renderable object that can be drawn to a canvas.
*/
    export interface IRenderable {
        /**
        * Gets or sets the ZIndex property.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed renderables.
        */
        ZIndex: number;
        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        Visible: boolean;
        /**
        * Draws the renderable to the provided canvas context
        * @param context The canvas context to draw the renderable onto.
        */
        Draw(context: CanvasRenderingContext2D): void;
        /**
        * Returns the bounding area that represents where the renderable will draw.
        */
        GetDrawBounds(): Bounds.Bounds2d;
    }

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }

    interface IActorMapping {
        Actor: Graphics.Graphic2d;
        Remove: (graphic: Graphics.Graphic2d) => any;
    }

    /**
    * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
    */
    export class Scene2d implements IDisposable {
        private _actors: Graphics.Graphic2d[];
        private _actorMappings: IActorMapping[];
        private _renderer: IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;
        private _disposed: boolean;
        private _camera: Camera2d;
        private _drawArea: HTMLCanvasElement;

        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        */
        constructor();
        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void);
        /**
        * Creates a new instance of the Scene2d object.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        * @param drawArea The game canvas to draw onto.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void, drawArea: HTMLCanvasElement);
        constructor(onDraw: (context: CanvasRenderingContext2D) => void = _ => { }, drawArea?: HTMLCanvasElement) {
            this._actorMappings = [];
            this._actors = [];

            if (typeof drawArea === "undefined") {
                drawArea = this.CreateDefaultDrawArea();
            }

            this._onDraw = onDraw;

            this._drawArea = drawArea;
            this._camera = new Camera2d(new Vector2d(this._drawArea.width / 2, this._drawArea.height / 2), new Size2d(this._drawArea.width, this._drawArea.height));
            this._renderer = new Camera2dRenderer(this._drawArea, this._camera);
            this._disposed = false;
        }

        /**
        * Gets the canvas that the Scene2d uses as its game area.
        */
        public get DrawArea(): HTMLCanvasElement {
            return this._drawArea;
        }

        /**
        * Gets the game camera.
        */
        public get Camera(): Camera2d {
            return this._camera;
        }

        /**
        * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
        * @param actor The graphic to add to the scene.
        */
        public Add(actor: Graphics.Graphic2d): void {
            var mapping: IActorMapping = {
                Actor: actor,
                Remove: (graphic: Graphics.Graphic2d) => {
                    this.Remove(graphic);
                }
            };

            actor.OnDisposed.Bind(mapping.Remove);

            this._actorMappings.push(mapping);
            this._actors.push(actor);
        }

        /**
        * Removes an actor from the scene.  The actor will no longer have its Draw called.
        * @param actor The graphic to remove from the scene.
        */
        public Remove(actor: Graphics.Graphic2d): void {
            for (var i = 0; i < this._actors.length; i++) {
                if (this._actors[i] === actor) {
                    this._actors[i].OnDisposed.Unbind(this._actorMappings[i].Remove);
                    this._actors.splice(i, 1);
                    this._actorMappings.splice(i, 1);
                    return;
                }
            }
        }

        /**
        * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
        */
        public Draw(): void {
            this._onDraw(this._renderer.Render(this._actors));
        }

        /**
        * Destroys the game canvas and clears the Scene2d's actors.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                for (var i = 0; i < this._actors.length; i++) {
                    this.Remove(this._actors[i]);
                }

                this._actors = [];
                this._actorMappings = [];
                this._renderer.Dispose();
            }
            else {
                throw new Error("Scene2d cannot be disposed more than once");
            }
        }

        private CreateDefaultDrawArea(): HTMLCanvasElement {
            var drawArea = <HTMLCanvasElement>document.createElement("canvas"),
                body: HTMLElement = <HTMLElement>document.getElementsByTagName('body')[0];

            drawArea.width = document.documentElement.clientWidth;
            drawArea.height = document.documentElement.clientHeight - 5;

            body.appendChild(drawArea);
            body.style.margin = "0px";
            body.style.padding = "0px";

            return drawArea;
        }
    }

    /**
* Defines a 2d renderer that uses a double buffer to draw graphics.
*/
    export class Renderer2d implements IDisposable, IRenderer {
        public static _zindexSort: (a: IRenderable, b: IRenderable) => number = (a: IRenderable, b: IRenderable) => { return a.ZIndex - b.ZIndex; };

        public _BufferCanvas: HTMLCanvasElement;
        public _BufferContext: CanvasRenderingContext2D; // Protected

        // These essentially are used to create a double buffer for rendering
        private _visibleCanvas: HTMLCanvasElement;
        private _visibleContext: CanvasRenderingContext2D;
        private _disposed: boolean;
        private _onRendererSizeChange: EventHandler1<Size2d>;

        /**
        * Creates a new instance of the Renderer2d object.
        * @param renderOnto The canvas to render onto.
        */
        constructor(renderOnto: HTMLCanvasElement) {
            this._visibleCanvas = renderOnto;
            // @ts-ignore
            this._visibleContext = renderOnto.getContext("2d");

            // Create an equally sized canvas for a buffer
            this._BufferCanvas = <HTMLCanvasElement>document.createElement("canvas");
            // @ts-ignore
            this._BufferContext = this._BufferCanvas.getContext("2d");
            
            // Adjust the scale to allow for device DPI
            var scale = window.devicePixelRatio;
            this._visibleContext.scale(scale, scale);
            this._BufferContext.scale(scale, scale);
            var origVisibleDraw = this._visibleContext.drawImage;
            var origBufferDraw = this._BufferContext.drawImage;
            (this._visibleContext as any).drawImage = (image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void =>
            {
                //origVisibleDraw(image, srcX * scale, srcY * scale, srcW * scale, srcH * scale, dstX * scale, dstY * scale, dstW * scale, dstH * scale);
                origVisibleDraw.call(this._visibleContext, image, srcX * scale, srcY * scale);
            };
            (this._BufferContext as any).drawImage = (image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void =>
            {
                //origBufferDraw(image, srcX * scale, srcY * scale, srcW * scale, srcH * scale, dstX * scale, dstY * scale, dstW * scale, dstH * scale);
                origBufferDraw.call(this._BufferContext, image, srcX * scale, srcY * scale);
            };

            this._onRendererSizeChange = new EventHandler1<Size2d>();
            this.UpdateBufferSize();

            this._disposed = false;
        }

        /**
        * Gets an event that is triggered when the renderOnto canvas changes size.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnRendererSizeChange(): EventHandler1<Size2d> {
            return this._onRendererSizeChange;
        }

        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered, assumes Visible is set to true.
        */
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            // Check if our visible canvas has changed size
            if (this._BufferCanvas.width !== this._visibleCanvas.width || this._BufferCanvas.height !== this._visibleCanvas.height) {
                this.UpdateBufferSize();
            }

            // Push buffer to screen
            this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
            this._visibleContext.drawImage(this._BufferCanvas, 0, 0);
            // Clear our buffer to prepare it for new drawings
            this._ClearBuffer();

            // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
            renderables.sort(Renderer2d._zindexSort);

            // We do not save or restore the canvas state because we want to let the
            // dev decide how they manipulate the canvas            

            for (var i = 0; i < renderables.length; i++) {
                renderables[i].Draw(this._BufferContext);
            }

            return this._BufferContext;
        }

        /**
        * Destroys the visible canvas.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                // @ts-ignore
                this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                // @ts-ignore
                this._onRendererSizeChange.Dispose();
            }
        }

        public _ClearBuffer() {
            this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
        }

        private UpdateBufferSize() {
            this._BufferCanvas.width = this._visibleCanvas.width;
            this._BufferCanvas.height = this._visibleCanvas.height;
            this.OnRendererSizeChange.Trigger(new Size2d(this._visibleCanvas.width, this._visibleCanvas.height))
        }
    }

    /**
    * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
    */
    export class Camera2dRenderer extends Renderer2d {
        private _camera: Camera2d;
        private _contextBuilder: Camera2dCanvasContextBuilder;

        /**
        * Creates a new instance of the Camera2dRenderer.
        * @param renderOnto The canvas to render onto.
        * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
        */
        constructor(renderOnto: HTMLCanvasElement, camera: Camera2d) {
            super(renderOnto);

            this._camera = camera;
            this._contextBuilder = new Camera2dCanvasContextBuilder(this._camera);

            this.OnRendererSizeChange.Bind((newSize: Size2d) => {
                this._contextBuilder._UpdateCanvasCenter(newSize);
                this._camera.Size = newSize;
            });

            this._contextBuilder._UpdateCanvasCenter(new Size2d(renderOnto.width, renderOnto.height));
            this._BufferContext = this._contextBuilder.Build(this._BufferContext);

        }

        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered. 
        */
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            var context,
                inverseScale = this._camera._GetInverseDistanceScale();

            this._BufferContext.save();
            this._BufferContext.scale(inverseScale, inverseScale)

            context = super.Render(this.GetOnScreenRenderables(renderables));

            this._BufferContext.restore();

            return context;
        }

        public _ClearBuffer() {
            var cameraScale = this._camera._GetDistanceScale();
            (<any>this._BufferContext).unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
        }

        private GetOnScreenRenderables(allRenderables: IRenderable[]): IRenderable[] {
            var onscreen: IRenderable[] = [],
                scale = this._camera._GetDistanceScale(),
                unscale = 1 / scale;

            // Scale camera size to our zoom level
            this._camera.Scale(scale, scale);

            for (var i = 0; i < allRenderables.length; i++) {
                if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                    onscreen.push(allRenderables[i]);
                }
            }

            this._camera.Scale(unscale, unscale);

            return onscreen;
        }
    }

    /**
* Defines a builder that is used to build a camera sensitive CanvasRenderingContext2d so that anything drawn to it becomes relative to the Camera2d.
*/
    export class Camera2dCanvasContextBuilder {
        private _camera: Camera2d;
        private _canvasCenter: Vector2d;
        private _translated: boolean;
        private _translationState: any[];

        /**
        * Creates a new instance of the Camera2dCanvasContextBuilder object.
        * @param camera Camera to link to built CanvasRenderingContext2d's (Cannot change after construction).
        */
        constructor(camera: Camera2d) {
            this._camera = camera;
            this._canvasCenter = this._camera.Position.Clone();
            this._translated = false;
            this._translationState = [];
            this._translationState.push(this._translated);
        }

        /**
        * Builds a new CanvasRenderingContext2d around the provided context that is linked to the camera.  Anything drawn to the context becomes relative to the camera.
        * @param context The context to build the camera linked context around.
        */
        public Build(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
            var that = this,
                savedCreateRadialGradient = context.createRadialGradient,
                savedTranslate = context.translate,
                savedSave = context.save,
                savedRestore = context.restore,
                savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1),
                savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);

            (<any>context).unModifiedClearRect = context.clearRect;

            context.arc = this.BuildPositionReplacer(context.arc);
            context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
            context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
            context.clearRect = this.BuildPositionReplacer(context.clearRect);
            context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
            context.createRadialGradient = function () {
                var scale = that._camera._GetDistanceScale();
                arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;

                return savedCreateRadialGradient.apply(this, arguments);
            };
            context.drawImage = function () {
                if (arguments.length <= 5) {
                    savedDrawImage1.apply(this, arguments);
                }
                else {
                    savedDrawImage2.apply(this, arguments);
                }
            };
            context.fillRect = this.BuildPositionReplacer(context.fillRect);
            context.fillText = this.BuildPositionReplacer(context.fillText, 1);
            context.getImageData = this.BuildPositionReplacer(context.getImageData);
            context.isPointInPath = this.BuildPositionReplacer(context.isPointInPath);
            context.lineTo = this.BuildPositionReplacer(context.lineTo);
            context.moveTo = this.BuildPositionReplacer(context.moveTo);
            context.putImageData = this.BuildPositionReplacer(context.putImageData, 1);
            context.quadraticCurveTo = this.BuildPositionReplacer(context.quadraticCurveTo, 0, 4);
            context.rect = this.BuildPositionReplacer(context.rect);
            context.strokeRect = this.BuildPositionReplacer(context.strokeRect);
            context.strokeText = this.BuildPositionReplacer(context.strokeText, 1);

            context.save = function () {
                that._translationState.push(that._translated);

                savedSave.call(this);
            };

            context.restore = function () {
                that._translated = that._translationState.pop();

                savedRestore.call(this);
            };

            context.translate = function () {
                var scale;

                if (!that._translated) {
                    scale = that._camera._GetDistanceScale();

                    arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                    arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                }

                that._translated = true;

                savedTranslate.apply(this, arguments);
            };

            return context;
        }

        public _UpdateCanvasCenter(newSize: Size2d): void {
            this._canvasCenter.X = newSize.Width / 2;
            this._canvasCenter.Y = newSize.Height / 2;
        }

        private BuildPositionReplacer(replacee: Function, positionArgOffset: number = 0, argCount: number = 2): any {
            var that = this,
                axiList = ["X", "Y"];

            return function () {
                var scale: number,
                    axi: string;

                if (!that._translated) {
                    scale = that._camera._GetDistanceScale();
                    for (var i = 0; i < argCount; i++) {
                        axi = axiList[i % 2];
                        // @ts-ignore
                        arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                    }
                }

                // @ts-ignore
                return replacee.apply(this, arguments);
            };
        }
    }

    /**
    * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
    */
    export class Camera2d extends Bounds.BoundingRectangle {
        /**
        *  The distance in which the Camera2d will default to and the distance that defines the 100% scale value.
        */
        public static DefaultDistance: number = 1000;
        public _type: string = "Camera2d";

        /**
        * Gets or sets the camera distance.  This represents how far away the Camera is from the game canvas.  0 is directly on top of the canvas while DefaultDistance represents 100% scale.
        */
        public Distance: number;

        /**
        * Creates a new instance of the Camera2d object.
        * @param position Initial position of the camera.
        * @param size Initial size of the camera.
        */
        constructor(position: Vector2d, size: Size2d) {
            super(position, size);

            this.Distance = Camera2d.DefaultDistance;
        }

        /**
        * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
        * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
        */
        public ToCameraRelative(position: Vector2d): Vector2d {
            var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale() * .5));
            return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
        }

        public _GetInverseDistanceScale(): number {
            return Camera2d.DefaultDistance / this.Distance;
        }

        public _GetDistanceScale(): number {
            return this.Distance / Camera2d.DefaultDistance;
        }
    }
}