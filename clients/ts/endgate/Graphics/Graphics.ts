import { Vector2d } from "../Assets/Vectors/Vector2d";
import { Size2d } from "../Assets/Sizes/Size2d";
import { Bounds } from "../Bounds/Bounds";
import { GameTime } from "../GameTime";
import { EventHandler } from "../Utilities/EventHandler";
import { IDisposable } from "../Interfaces/IDisposable";
import { ICloneable } from "../Interfaces/ICloneable";
import { ITyped } from "../Interfaces/ITyped";
import { IMoveable } from "../Interfaces/IMoveable";
import { EventHandler1 } from "../Utilities/EventHandler1";
import { TimeSpan } from "../Assets/TimeSpan";
import { EventHandler2 } from "../Utilities/EventHandler2";
import { Rendering } from "../Rendering/Rendering";
import { asyncLoop } from "../Extensions/Helpers";

export module Graphics {

    export class Graphic2dState {
        private _cachedState: { [property: string]: any; };

        constructor() {
            this._cachedState = {};
        }

        public get StrokeStyle(): string {
            return this._cachedState["strokeStyle"];
        }
        public set StrokeStyle(value: string) {
            this._cachedState["strokeStyle"] = value
        }

        public get FillStyle(): string {
            return this._cachedState["fillStyle"];
        }
        public set FillStyle(value: string) {
            this._cachedState["fillStyle"] = value;
        }

        public get GlobalAlpha(): number {
            return this._cachedState["globalAlpha"];
        }
        public set GlobalAlpha(value: number) {
            this._cachedState["globalAlpha"] = value;
        }

        public get LineWidth(): number {
            return this._cachedState["lineWidth"];
        }
        public set LineWidth(value: number) {
            this._cachedState["lineWidth"] = value;
        }

        public get LineCap(): string {
            return this._cachedState["lineCap"];
        }
        public set LineCap(value: string) {
            this._cachedState["lineCap"] = value;
        }

        public get LineJoin(): string {
            return this._cachedState["lineJoin"];
        }
        public set LineJoin(value: string) {
            this._cachedState["lineJoin"] = value;
        }

        public get MiterLimit(): number {
            return this._cachedState["miterLimit"];
        }
        public set MiterLimit(value: number) {
            this._cachedState["miterLimit"] = value;
        }

        public get ShadowOffsetX(): number {
            return this._cachedState["shadowOffsetX"];
        }
        public set ShadowOffsetX(value: number) {
            this._cachedState["shadowOffsetX"] = value;
        }

        public get ShadowOffsetY(): number {
            return this._cachedState["shadowOffsetY"];
        }
        public set ShadowOffsetY(value: number) {
            this._cachedState["shadowOffsetY"] = value;
        }

        public get ShadowBlur(): number {
            return this._cachedState["shadowBlur"];
        }
        public set ShadowBlur(value: number) {
            this._cachedState["shadowBlur"] = value;
        }

        public get ShadowColor(): string {
            return this._cachedState["shadowColor"];
        }
        public set ShadowColor(value: string) {
            this._cachedState["shadowColor"] = value;
        }

        public get GlobalCompositeOperation(): string {
            return this._cachedState["globalCompositeOperation"];
        }
        public set GlobalCompositeOperation(value: string) {
            this._cachedState["globalCompositeOperation"] = value;
        }

        public get Font(): string {
            return this._cachedState["font"];
        }
        public set Font(value: string) {
            this._cachedState["font"] = value;
        }

        public get TextAlign(): string {
            return this._cachedState["textAlign"];
        }
        public set TextAlign(value: string) {
            this._cachedState["textAlign"] = value;
        }

        public get TextBaseline(): string {
            return this._cachedState["textBaseline"];
        }
        public set TextBaseline(value: string) {
            this._cachedState["textBaseline"] = value;
        }

        public SetContextState(context: CanvasRenderingContext2D): void {
            for (var key in this._cachedState) {
                // @ts-ignore
                context[key] = this._cachedState[key];
            }
        }
    }

    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    export class Graphic2d implements ITyped, Rendering.IRenderable, IMoveable, IDisposable, ICloneable {
        public _type: string = "Graphic2d";

        /**
        * Gets or sets the ZIndex of the Graphic2d.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed graphics.
        */
        public ZIndex: number;

        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        public Visible: boolean;

        /**
        * Gets or sets the Position of the Graphic2d.  The Position determines where the graphic will be drawn on the screen.
        */
        public Position: Vector2d;
        /**
        * Gets or sets the Rotation of the Graphic2d..
        */
        public Rotation: number;

        /**
        * Gets the parent of the Graphic2d.  Value is null if no parent exists.
        */
        public Parent: Graphic2d | null;

        public _State: Graphic2dState;

        public static _zindexSort: (a: Graphic2d, b: Graphic2d) => number = (a: Graphic2d, b: Graphic2d) => { return a.ZIndex - b.ZIndex; };

        private _children: Graphic2d[];
        private _childrenRemovalBindings: Array<(graphic: Graphic2d) => void>;
        private _onDisposed: EventHandler1<Graphic2d>;
        private _disposed: boolean;

        /**
        * Creates a new instance of the Graphic2d object.  Should only ever be called by a derived class.
        * @param position The initial position of the Graphic2d
        */
        constructor(position: Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.Visible = true;
            this._State = new Graphic2dState();
            this.Opacity = 1;
            this._children = [];
            this._childrenRemovalBindings = [];
            this.Parent = null;
            this._disposed = false;
            this._onDisposed = new EventHandler1<Graphic2d>();
        }

        /**
        * Gets the absolute position of the Graphic2d.  This is used to calculate absolute positions when graphic's have parents.
        */
        public get AbsolutePosition(): Vector2d {
            var position = this.Position,
                node: Graphic2d | null = this;

            // Iterate up the parent tree until we're at the root parent
            while (node = node.Parent) {
                position = position.Add(node.Position);
            }

            return position;
        }

        /**
        * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Graphic2d> {
            return this._onDisposed;
        }

        /**
        * Gets or sets the current opacity.  Value is between 0 and 1.
        */
        public get Opacity(): number {
            return this._State.GlobalAlpha;
        }
        public set Opacity(alpha: number) {
            this._State.GlobalAlpha = alpha;
        }

        /**
        * Returns the list of children for the current Graphic2d.
        */
        public GetChildren(): Graphic2d[] {
            return this._children.slice(0);
        }

        /**
        * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
        * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
        * @param graphic Child to add.
        */
        public AddChild(graphic: Graphic2d): void {
            var removalBinding: (graphic: Graphic2d) => void;

            if (graphic.Parent !== null) {
                throw new Error("Graphic already has parent, cannot add it as a child.");
            }

            removalBinding = (graphic: Graphic2d) => {
                this.RemoveChild(graphic);
            };

            graphic.Parent = this;
            graphic.OnDisposed.Bind(removalBinding);

            this._children.push(graphic);
            this._childrenRemovalBindings.push(removalBinding);
            this._children.sort(Graphic2d._zindexSort);
        }

        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        public RemoveChild(graphic: Graphic2d): boolean {
            var index = this._children.indexOf(graphic);

            if (index >= 0) {
                this._children[index].Parent = null;
                this._children[index].OnDisposed.Unbind(this._childrenRemovalBindings[index]);
                this._children.splice(index, 1);
                this._childrenRemovalBindings.splice(index, 1);
                return true;
            }

            return false;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this._State.SetContextState(context);

            context.translate(this.Position.X, this.Position.Y);

            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].Visible) {
                    this._children[i].Draw(context);
                }
            }

            context.restore();
        }

        /**
        * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the graphic onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
        }

        /**
        * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        }

        /**
        * Abstract: Should be overridden to scale the size of the Graphic2d.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            throw new Error("Scale is abstract, it must be implemented.");
        }

        /**
        * Abstract: Returns a nearly identical copy of this Graphic2d.  If this Graphic2d belongs to a parent, the cloned Graphic2d will not. If this Graphic2d has children, all children will be cloned as well.  Lastly, the cloned Graphic2d will not have the same event bindings as this one does.
        */
        public Clone(): Graphic2d {
            throw new Error("Clone is abstract, it must be implemented.");
        }

        // Used by derived Graphic2d's to centralize logic
        public _Clone(graphic: Graphic2d): void {
            for (var i = 0; i < this._children.length; i++) {
                graphic.AddChild(this._children[i].Clone());
            }

            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;
        }

        /**
        * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
        */
        public Dispose(): void {
            var childrenClone;

            if (!this._disposed) {
                this._disposed = true;

                childrenClone = this._children.slice(0);

                // Dispose all children to ensure that there's no dangling references.
                for (var i = 0; i < childrenClone.length; i++) {
                    childrenClone[i].Dispose();
                }

                delete this._children;
                this.OnDisposed.Trigger(this);
                this.OnDisposed.Dispose();
            }
            else {
                throw new Error("Cannot dispose graphic more than once.");
            }
        }
    }

    /**
    * Defines a drawable 2d line element.
    */
    export class Line2d extends Graphic2d {
        public _type: string = "Line2d";

        private _from: Vector2d;
        private _to: Vector2d;
        // @ts-ignore
        private _difference: Vector2d;
        // @ts-ignore
        private _boundsWidth: number;
        // @ts-ignore
        private _cachedPosition: Vector2d;
        // @ts-ignore
        private _strokeStyle: Color;
        private _strokeChangeWire: (color: Color) => void;

        /**
        * Creates a new instance of the Line2d object with a line width of 1.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width and color.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        * @param color Initial color of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: Color);
        /**
        * Creates a new instance of the Line2d object with a specified line width and color.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        * @param color Initial color string of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: string);
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number = 1, color?: any) {
            super(Vector2d.Zero);// Set to zero here then updated in the rest of the constructor (use same logic)

            this._from = new Vector2d(fromX, fromY);
            this._to = new Vector2d(toX, toY);
            this.LineWidth = lineWidth;
            this.UpdatePosition();

            this._strokeChangeWire = (color: Color) => {
                this._State.StrokeStyle = color.toString();
            };

            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                this.Color = this._strokeStyle = color;
            }
            else {
                this.Color = this._strokeStyle = Color.Black;
            }
        }

        /**
        * Gets or sets the From location of the Line2d.
        */
        public get From(): Vector2d {
            return this._from;
        }
        public set From(newPosition: Vector2d) {
            this._from = newPosition;
            this.UpdatePosition();
        }

        /**
        * Gets or sets the To location of the Line2d.
        */
        public get To(): Vector2d {
            return this._to;
        }
        public set To(newPosition: Vector2d) {
            this._to = newPosition;
            this.UpdatePosition();
        }

        /**
        * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): Color {
            return this._strokeStyle;
        }
        public set Color(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }

            // Unbind old
            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
            this._strokeStyle = color;
            // Bind new
            this._strokeStyle.OnChange.Bind(this._strokeChangeWire);
            // Update state
            this._strokeChangeWire(color);
        }

        /**
        * Gets or sets the line width.
        */
        public get LineWidth(): number {
            return this._State.LineWidth;
        }
        public set LineWidth(width: number) {
            this._State.LineWidth = width;
        }

        /**
        * Gets or sets the line cap.  Values can be "butt", "round", "square".
        */
        public get LineCap(): string {
            return this._State.LineCap;
        }
        public set LineCap(cap: string) {
            this._State.LineCap = cap;
        }

        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            // Need to check to ensure that the colors still match up so if people are performing direct color manipulation
            // such as color.R = 131.
            if (this._strokeStyle.toString() !== this._State.StrokeStyle) {
                this._State.StrokeStyle = this._strokeStyle.toString();
            }

            super._StartDraw(context);

            // Check if the user has modified the position directly, if so we need to translate the from and to positions accordingly
            if (!this._cachedPosition.Equivalent(this.Position)) {
                this.RefreshCache();
            }

            // Context origin is at the center point of the line
            context.beginPath();
            context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
            context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
            context.stroke();

            super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the Line2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(this._boundsWidth, this.LineWidth));

            bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

            return bounds;
        }

        /**
        * Scale's the Line2d graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            this.From = this.Position.Add(this.From.Subtract(this.Position).Multiply(scale));
            this.To = this.Position.Add(this.To.Subtract(this.Position).Multiply(scale));
        }

        /**
        * Returns a nearly identical copy of this Line2d.  If this Line2d belongs to a parent, the cloned Line2d will not. If this Line2d has children, all children will be cloned as well.  Lastly, the cloned Line2d will not have the same event bindings as this one does.
        */
        public Clone(): Line2d {
            var graphic = new Line2d(this.From.X, this.From.Y, this.To.X, this.To.Y, this.LineWidth, this.Color.Clone());

            graphic.LineCap = this.LineCap;

            super._Clone(graphic);

            return graphic;
        }

        public Dispose(): void {
            super.Dispose();

            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
        }

        private UpdatePosition(): void {
            this.Position = ((this._from.Add(this._to)).Divide(2));
            this._difference = this._to.Subtract(this._from);
            this._boundsWidth = this._from.Distance(this._to).Length();
            this._cachedPosition = this.Position.Clone();
        }

        private RefreshCache(): void {
            var difference = this.Position.Subtract(this._cachedPosition);
            this._from.X += difference.X;
            this._from.Y += difference.Y;
            this._to.X += difference.X;
            this._to.Y += difference.Y;
            this._cachedPosition = this.Position.Clone();
        }
    }

    /**
    * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
    */
    export class ImageSource implements IDisposable, ICloneable {
        /**
        * Gets or sets the ClipLocation.  Represents where the image clip is within the base image.
        */
        // @ts-ignore
        public ClipLocation: Vector2d;
        /**
        * Gets or sets the ClipSize.  Represents how large the image clip is within the base image.
        */
        public ClipSize: Size2d;
        /**
        * Gets the base image source.  Should not be modified once the ImageSource has been constructed
        */
        public Source: HTMLImageElement;

        // @ts-ignore
        private _size: Size2d;
        private _loaded: boolean;
        // @ts-ignore
        private _imageLocation;
        private _onLoaded: EventHandler1<ImageSource>;
        private _loadWire: (e: Event) => void;

        /**
        * Creates a new instance of the ImageSource object with a pre-loaded image object.
        * @param image Image object to use as the source.
        */
        constructor(image: HTMLImageElement);
        /**
        * Creates a new instance of the ImageSource object.
        * @param imageLocation Image source url (this cannot change after construction). 
        */
        constructor(imageLocation: string);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height.  ClipSize defaults to the full size and the ClipLocation defaults to (0,0). If width and height are not equal to the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        */
        constructor(imageLocation: string, width: number, height: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param image Image object to use as the source.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(image: HTMLImageElement, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(imageLocation: string, width: number, height: number, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        // @ts-ignore
        constructor(image: any, width?: number, height?: number, clipX: number = 0, clipY: number = 0, clipWidth: number = width, clipHeight: number = height) {
            var sizeDefined: boolean = typeof width !== "undefined", imageLocation: string;

            this._onLoaded = new EventHandler1<ImageSource>();

            if (typeof image === "string") {
                imageLocation = image;
                this._loaded = false;
                this.Source = new Image();
                this._loadWire = (e: Event) => {
                    this._loaded = true;

                    if (!sizeDefined) {
                        this._size = new Size2d(this.Source.width, this.Source.height);
                        this.ClipLocation = Vector2d.Zero;
                        this.ClipSize = this._size.Clone();
                    }

                    this._onLoaded.Trigger(this);
                };

                this.Source.src = imageLocation;
                this._imageLocation = imageLocation;

                if (sizeDefined) {
                    // @ts-ignore
                    this._size = new Size2d(width, height);
                    this.ClipLocation = new Vector2d(clipX, clipY);
                    this.ClipSize = new Size2d(clipWidth, clipHeight);
                }
                else {
                    // @ts-ignore
                    this.ClipSize = null; // Waiting for the image source OnLoad to set it
                }
            } else {
                clipWidth = clipX;
                clipHeight = clipY;
                // @ts-ignore
                clipX = width;
                // @ts-ignore
                clipY = height;

                this.Source = image;
                this._imageLocation = image.src;

                this._loaded = false;

                if (this.Source.complete) {
                    this._loadWire = (e: Event) => {
                        this._loaded = true;
                        this._onLoaded.Trigger(this);
                    };

                    this._size = new Size2d(image.width, image.height);
                } else {
                    this._loadWire = (e: Event) => {
                        this._loaded = true;
                        this._onLoaded.Trigger(this);
                        this._size = new Size2d(image.width, image.height);
                    };
                }

                this.ClipLocation = new Vector2d(clipX, clipY);
                this.ClipSize = new Size2d(clipWidth, clipHeight);
            }

            if (!this.Source.complete) {
                this.Source.addEventListener("load", this._loadWire, false);
            } else {
                setTimeout(this._loadWire, 0);
            }
        }

        /**
        * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnLoaded(): EventHandler1<ImageSource> {
            return this._onLoaded;
        }

        /**
        * Returns the base Size of the image source.
        */
        public get Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Determines if the ImageSource has been loaded.
        */
        public IsLoaded(): boolean {
            return this._loaded;
        }

        /**
        * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.
        * @param clipHeight The height of the clip.
        */
        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource {
            return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
        }

        /**
        * Disposes the image source and unbinds all bound events.
        */
        public Dispose(): void {
            this.Source.removeEventListener("load", this._loadWire);
            // @ts-ignore
            this.Source = null;
            this._onLoaded.Dispose();
        }

        /**
        * Returns an identical copy of this image source.  Uses existing base image source.
        */
        public Clone(): ImageSource {
            if (this.ClipSize) {
                return new ImageSource(this.Source, this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height);
            } else {
                return new ImageSource(this.Source);
            }
        }
    }


    /**
    * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
    */
    export class Sprite2d extends Graphic2d {
        public _type: string = "Sprite2d";

        /**
        * Gets or sets the Image that is drawn to the game screen.
        */
        public Image: ImageSource;
        /**
        * Gets or sets the size of the Sprite2d.  If the Size is not equal to the image's ClipSize the Sprite2d will appear stretched.
        */
        public Size: Size2d;

        /**
        * Creates a new instance of the Sprite2d object with an initial size matching the image's clip size.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        */
        constructor(x: number, y: number, image: ImageSource);
        /**
        * Creates a new instance of the Sprite2d object.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        * @param width Initial width of the Sprite2d.  If the width does not equal the width of the image's clip width the Sprite2d will appear stretched.
        * @param height Initial height of the Sprite2d.  If the height does not equal the height of the image's clip height the Sprite2d will appear stretched.
        */
        constructor(x: number, y: number, image: ImageSource, width: number, height: number);
        constructor(x: number, y: number, image: ImageSource, width: number = image.ClipSize.Width, height: number = image.ClipSize.Height) {
            super(new Vector2d(x, y));

            this.Image = image;
            this.Size = new Size2d(width, height);
        }

        /**
        * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the sprite onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, - this.Size.HalfWidth, - this.Size.HalfHeight, this.Size.Width, this.Size.Height)

            super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the Sprite2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Scale's the Sprite2d graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            this.Size.Width *= scale;
            this.Size.Height *= scale;
        }

        /**
        * Returns a nearly identical copy of this Sprite2d.  If this Sprite2d belongs to a parent, the cloned Sprite2d will not. If this Sprite2d has children, all children will be cloned as well.  Lastly, the cloned Sprite2d will not have the same event bindings as this one does.
        */
        public Clone(): Sprite2d {
            var graphic = new Sprite2d(this.Position.X, this.Position.Y, this.Image.Clone(), this.Size.Width, this.Size.Height);

            super._Clone(graphic);

            return graphic;
        }
    }
    /**
    * Color class used to pass around colors in a typed manner.
    */
    export class Color implements ITyped, ICloneable, IDisposable {
        public _type: string = "Color";

        //Regex to match rgba in hex form ffffffff, 00000000, ff33dd4499
        private static RgbaHexRegExp: RegExp = /^([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;

        //Regex to match function color form for argb(d, n, n, n), rgb(n, n, n), and rgba(n, n, n, d) 
        private static RgbRegExp: RegExp = /^(argb|rgb|rgba)\s*\(\s*([\d+(\.\d+)]{0,3})\s*,\s*([\d]{0,3})\s*,\s*([\d]{0,3})\s*(?:,\s*([\d+(\.\d+)]{0,3})\s*)?\s*\)$/i;

        //regex to match rgb in hex form ffffff, 000000, ff33dd
        private static RgbaRegExp: RegExp = /^([a-f\d])([a-f\d])([a-f\d])$/i;

        //Object to hold all HTML5 named colors
        //ref: http://www.tutorialspoint.com/html5/html5_color_names.htm
        private static _namedColors = {
            "transparent": new Color(255, 255, 255, 0),
            "aliceblue": new Color("#f0f8ff"),
            "antiquewhite": new Color("#faebd7"),
            "aqua": new Color("#00ffff"),
            "aquamarine": new Color("#7fffd4"),
            "azure": new Color("#f0ffff"),
            "beige": new Color("#f5f5dc"),
            "bisque": new Color("#ffe4c4"),
            "black": new Color("#000000"),
            "blanchedalmond": new Color("#ffebcd"),
            "blue": new Color("#0000ff"),
            "blueviolet": new Color("#8a2be2"),
            "brown": new Color("#a52a2a"),
            "burlywood": new Color("#deb887"),
            "cadetblue": new Color("#5f9ea0"),
            "chartreuse": new Color("#7fff00"),
            "chocolate": new Color("#d2691e"),
            "coral": new Color("#ff7f50"),
            "cornflowerblue": new Color("#6495ed"),
            "cornsilk": new Color("#fff8dc"),
            "crimson": new Color("#dc143c"),
            "cyan": new Color("#00ffff"),
            "darkblue": new Color("#00008b"),
            "darkcyan": new Color("#008b8b"),
            "darkgoldenrod": new Color("#b8860b"),
            "darkgray": new Color("#a9a9a9"),
            "darkgreen": new Color("#006400"),
            "darkkhaki": new Color("#bdb76b"),
            "darkmagenta": new Color("#8b008b"),
            "darkolivegreen": new Color("#556b2f"),
            "darkorange": new Color("#ff8c00"),
            "darkorchid": new Color("#9932cc"),
            "darkred": new Color("#8b0000"),
            "darksalmon": new Color("#e9967a"),
            "darkseagreen": new Color("#8fbc8f"),
            "darkslateblue": new Color("#483d8b"),
            "darkslategray": new Color("#2f4f4f"),
            "darkturquoise": new Color("#00ced1"),
            "darkviolet": new Color("#9400d3"),
            "deeppink": new Color("#ff1493"),
            "deepskyblue": new Color("#00bfff"),
            "dimgray": new Color("#696969"),
            "dodgerblue": new Color("#1e90ff"),
            "firebrick": new Color("#b22222"),
            "floralwhite": new Color("#fffaf0"),
            "forestgreen": new Color("#228b22"),
            "fuchsia": new Color("#ff00ff"),
            "gainsboro": new Color("#dcdcdc"),
            "ghostwhite": new Color("#f8f8ff"),
            "gold": new Color("#ffd700"),
            "goldenrod": new Color("#daa520"),
            "gray": new Color("#808080"),
            "green": new Color("#008000"),
            "greenyellow": new Color("#adff2f"),
            "honeydew": new Color("#f0fff0"),
            "hotpink": new Color("#ff69b4"),
            "indianred": new Color("#cd5c5c"),
            "indigo": new Color("#4b0082"),
            "ivory": new Color("#fffff0"),
            "khaki": new Color("#f0e68c"),
            "lavender": new Color("#e6e6fa"),
            "lavenderblush": new Color("#fff0f5"),
            "lawngreen": new Color("#7cfc00"),
            "lemonchiffon": new Color("#fffacd"),
            "lightblue": new Color("#add8e6"),
            "lightcoral": new Color("#f08080"),
            "lightcyan": new Color("#e0ffff"),
            "lightgoldenrodyellow": new Color("#fafad2"),
            "lightgray": new Color("#d3d3d3"),
            "lightgrey": new Color("#d3d3d3"),
            "lightgreen": new Color("#90ee90"),
            "lightpink": new Color("#ffb6c1"),
            "lightsalmon": new Color("#ffa07a"),
            "lightseagreen": new Color("#20b2aa"),
            "lightskyblue": new Color("#87cefa"),
            "lightslategray": new Color("#778899"),
            "lightsteelblue": new Color("#b0c4de"),
            "lightyellow": new Color("#ffffe0"),
            "lime": new Color("#00ff00"),
            "limegreen": new Color("#32cd32"),
            "linen": new Color("#faf0e6"),
            "magenta": new Color("#ff00ff"),
            "maroon": new Color("#800000"),
            "mediumaquamarine": new Color("#66cdaa"),
            "mediumblue": new Color("#0000cd"),
            "mediumorchid": new Color("#ba55d3"),
            "mediumpurple": new Color("#9370d8"),
            "mediumseagreen": new Color("#3cb371"),
            "mediumslateblue": new Color("#7b68ee"),
            "mediumspringgreen": new Color("#00fa9a"),
            "mediumturquoise": new Color("#48d1cc"),
            "mediumvioletred": new Color("#c71585"),
            "midnightblue": new Color("#191970"),
            "mintcream": new Color("#f5fffa"),
            "mistyrose": new Color("#ffe4e1"),
            "moccasin": new Color("#ffe4b5"),
            "navajowhite": new Color("#ffdead"),
            "navy": new Color("#000080"),
            "oldlace": new Color("#fdf5e6"),
            "olive": new Color("#808000"),
            "olivedrab": new Color("#6b8e23"),
            "orange": new Color("#ffa500"),
            "orangered": new Color("#ff4500"),
            "orchid": new Color("#da70d6"),
            "palegoldenrod": new Color("#eee8aa"),
            "palegreen": new Color("#98fb98"),
            "paleturquoise": new Color("#afeeee"),
            "palevioletred": new Color("#d87093"),
            "papayawhip": new Color("#ffefd5"),
            "peachpuff": new Color("#ffdab9"),
            "peru": new Color("#cd853f"),
            "pink": new Color("#ffc0cb"),
            "plum": new Color("#dda0dd"),
            "powderblue": new Color("#b0e0e6"),
            "purple": new Color("#800080"),
            "red": new Color("#ff0000"),
            "rosybrown": new Color("#bc8f8f"),
            "royalblue": new Color("#4169e1"),
            "saddlebrown": new Color("#8b4513"),
            "salmon": new Color("#fa8072"),
            "sandybrown": new Color("#f4a460"),
            "seagreen": new Color("#2e8b57"),
            "seashell": new Color("#fff5ee"),
            "sienna": new Color("#a0522d"),
            "silver": new Color("#c0c0c0"),
            "skyblue": new Color("#87ceeb"),
            "slateblue": new Color("#6a5acd"),
            "slategray": new Color("#708090"),
            "snow": new Color("#fffafa"),
            "springgreen": new Color("#00ff7f"),
            "steelblue": new Color("#4682b4"),
            "tan": new Color("#d2b48c"),
            "teal": new Color("#008080"),
            "thistle": new Color("#d8bfd8"),
            "tomato": new Color("#ff6347"),
            "turquoise": new Color("#40e0d0"),
            "violet": new Color("#ee82ee"),
            "wheat": new Color("#f5deb3"),
            "white": new Color("#ffffff"),
            "whitesmoke": new Color("#f5f5f5"),
            "yellow": new Color("#ffff00"),
            "yellowgreen": new Color("#9acd32")
        };

        // @ts-ignore
        private _cached: string = undefined;
        // @ts-ignore
        private _r: number;
        // @ts-ignore
        private _g: number;
        // @ts-ignore
        private _b: number;
        // @ts-ignore
        private _a: number;
        private _onChange: EventHandler1<Color>;

        /**
        * Creates a new instance of Color with color channels set to black.
        */
        constructor();
        /**
        * Creates a new instance of Color with the specified string.
        * @param color Hex, named or function style string declaration.
        */
        constructor(color: string);
        /**
        * Creates a new instance of Color with the specified rgb channels.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        constructor(r: number, g: number, b: number);
        /**
        * Creates a new instance of Color with the specified rgba channels.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        */
        constructor(r: number, g: number, b: number, a: number);
        constructor(r?: any, g?: any, b?: any, a?: any) {
            this._onChange = new EventHandler1<Color>();

            if (typeof (r) === 'string' && r.length > 0) {
                this.InitializeColorFromString(r);
            } else {
                //check if the alpha channel is defined
                this.A = a === undefined ? 1 : a;
                this.R = r;
                this.G = g;
                this.B = b;
            }
        }

        /**
        * Gets an EventHandler that is triggered when the R, G, B, or A values of this Color change.
        */
        public get OnChange(): EventHandler1<Color> {
            return this._onChange;
        }

        /**
        * Gets or sets the current red channel. Value must be an integer between 0 and 255 inclusive.
        */
        public get R(): number {
            return this._r;
        }
        public set R(r: number) {
            // @ts-ignore
            this._cached = undefined;
            this._r = Math.round(Math.min(Math.max(r, 0), 255));
            this._onChange.Trigger(this);
        }

        /**
        * Gets or sets the current green channel. Value must be an integer between 0 and 255 inclusive.
        */
        public get G(): number {
            return this._g;
        }
        public set G(g: number) {
            // @ts-ignore
            this._cached = undefined;
            this._g = Math.round(Math.min(Math.max(g, 0), 255));
            this._onChange.Trigger(this);
        }

        /**
        * Gets or sets the current blue channel. Value must be an integer between 0 and 255 inclusive.
        */
        public get B(): number {
            return this._b;
        }
        public set B(b: number) {
            // @ts-ignore
            this._cached = undefined;
            this._b = Math.round(Math.min(Math.max(b, 0), 255));
            this._onChange.Trigger(this);
        }

        /**
        * Gets or sets the current alpha channel. Value must be between 0 and 1 inclusive.
        */
        public get A(): number {
            return this._a;
        }
        public set A(a: number) {
            // @ts-ignore
            this._cached = undefined;
            this._a = Math.min(Math.max(a, 0), 1);
            this._onChange.Trigger(this);
        }

        /**
        * Creates a new Color object with the specified RGB values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        public static FromRGB(r: number, g: number, b: number): Color {
            return new Color(r, g, b);
        }

        /**
        * Creates a new Color object with the specified RGBA values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        */
        public static FromRGBA(r: number, g: number, b: number, a: number): Color {
            return new Color(r, g, b, a);
        }

        /**
        * Creates a new Color object with the specified ARGB values.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        public static FromARGB(a: number, r: number, g: number, b: number): Color {
            return new Color(r, g, b, a);
        }

        /**
        * Creates a new Color object from the specified hex assignment.
        * @param hex The hex based color code.
        */
        public static FromHex(hex: string): Color {
            return new Color(hex);
        }

        /**
        * Creates a new Color object form the HTML5 named colors.
        * @param name The name of the HTML5 color to use.
        */
        public static FromName(name: string): Color {
            return new Color(name);
        }

        //Converts a short hex string e.g. fff or cccc to the long version 
        //e.g. ffffffff the alpha channel.
        private static ConvertShortHexToLong(hex: string): string {
            if (hex.length === 3) {
                //append the alpha channel default which is fully opaque
                hex = hex + 'f';
            }

            if (hex.length === 4) {
                //short version that includes alpha channel
                hex = hex.replace(Color.RgbaHexRegExp, function (m, a?, r?, g?, b?) {
                    return r + r + g + g + b + b + a + a;
                });
            }

            return hex;
        }

        //Initializes a color object based on the string passed.
        //Possible values are hex and named values
        //rgba/argb/rgb values are handled elsewhere
        private InitializeColorFromString(color: string): void {
            //rgb, hex, rgba, argb
            var namedColor: any = this.NamedColorToHex(color);
            // @ts-ignore
            var result: Color = null;

            if (typeof (namedColor) === 'string') {
                result = this.CreateColorObjectFromString(namedColor);
            } else {
                result = namedColor;
            }

            this.A = result.A;
            this.B = result.B;
            this.R = result.R;
            this.G = result.G;
        }

        //Creates a color object from the string provided
        private CreateColorObjectFromString(hex: string): Color {
            //we're not interested in the pound sign
            if (hex.charAt(0) === '#') {
                hex = hex.substr(1);
            }

            //convert short hexes to long hexes
            hex = Color.ConvertShortHexToLong(hex);

            //ensure we have an alpha channel
            if (hex.length === 6) {
                hex = hex + 'ff';
            }

            //if it's exactly 8 characters long then it's
            //a hex and we build the Color object from this
            if (hex.length === 8) {
                return this.ParseAlphaHex(hex);
            }

            //it's no longer a hex and must be an rgb style function
            return this.ParseRGB(hex);
        }

        //Parses a color function and returns a Color object
        private ParseRGB(rgb: string): Color {
            var result = Color.RgbRegExp.exec(rgb);
            if (result) {
                var name = result[1];

                switch (name) {
                    case 'rgb': //rgb(n, n, n)
                        return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
                    case 'argb': //argb(d, n, n, n)
                        return new Color(parseInt(result[3]), parseInt(result[4]), parseInt(result[5]), parseFloat(result[2]));
                    case 'rgba': //rgba(n, n, n, d)
                        return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]), parseFloat(result[5]));
                }
            }

            //since the hex, named colors and color functions were
            //not available in the string passed then it's not a color
            //return Magenta so it's obvious something is wrong
            return Color.Magenta;
        }

        //Parses out all color channels including alpha
        //and returns a Color object based on the values
        private ParseAlphaHex(hex: string): Color {
            var a: number,
                r: number,
                g: number,
                b: number;

            r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
            g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
            b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
            a = parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255;

            return new Color(r, g, b, a);
        }

        //Parses out all color channels and returns a Color object based on the values
        private ParseHex(hex: string): Color {
            var r: number,
                g: number,
                b: number;

            r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
            g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
            b = parseInt(hex.charAt(4) + hex.charAt(5), 16);

            return new Color(r, g, b);
        }

        //Checks the named color object and looks for a similarly named color
        //if one is found returns the named Color object
        private NamedColorToHex(color: string): string {
            if (color.substring(0, 1) === '#') {
                return color;
            }
            // @ts-ignore
            if (typeof Color._namedColors[color.toLowerCase()] !== 'undefined') {
                // @ts-ignore
                return Color._namedColors[color.toLowerCase()];
            }

            return color;
        }

        /**
        * Returns a transparent Color object.
        */
        public static get Transparent(): Color {
            return Color._namedColors.transparent.Clone();
        }

        /**
        * Returns a Color object set to the color named color AliceBlue.
        */
        public static get AliceBlue(): Color {
            return Color._namedColors.aliceblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color AntiqueWhite.
        */
        public static get AntiqueWhite(): Color {
            return Color._namedColors.antiquewhite.Clone();
        }

        /**
        * Returns a Color object set to the color named color Aqua.
        */
        public static get Aqua(): Color {
            return Color._namedColors.aqua.Clone();
        }

        /**
        * Returns a Color object set to the color named color Aquamarine.
        */
        public static get Aquamarine(): Color {
            return Color._namedColors.aquamarine.Clone();
        }

        /**
        * Returns a Color object set to the color named color Azure.
        */
        public static get Azure(): Color {
            return Color._namedColors.azure.Clone();
        }

        /**
        * Returns a Color object set to the color named color Beige.
        */
        public static get Beige(): Color {
            return Color._namedColors.beige.Clone();
        }

        /**
        * Returns a Color object set to the color named color Bisque.
        */
        public static get Bisque(): Color {
            return Color._namedColors.bisque.Clone();
        }

        /**
        * Returns a Color object set to the color named color Black.
        */
        public static get Black(): Color {
            return Color._namedColors.black.Clone();
        }

        /**
        * Returns a Color object set to the color named color BlanchedAlmond.
        */
        public static get BlanchedAlmond(): Color {
            return Color._namedColors.blanchedalmond.Clone();
        }

        /**
        * Returns a Color object set to the color named color Blue.
        */
        public static get Blue(): Color {
            return Color._namedColors.blue.Clone();
        }

        /**
        * Returns a Color object set to the color named color BlueViolet.
        */
        public static get BlueViolet(): Color {
            return Color._namedColors.blueviolet.Clone();
        }

        /**
        * Returns a Color object set to the color named color Brown.
        */
        public static get Brown(): Color {
            return Color._namedColors.brown.Clone();
        }

        /**
        * Returns a Color object set to the color named color BurlyWood.
        */
        public static get BurlyWood(): Color {
            return Color._namedColors.burlywood.Clone();
        }

        /**
        * Returns a Color object set to the color named color CadetBlue.
        */
        public static get CadetBlue(): Color {
            return Color._namedColors.cadetblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color Chartreuse.
        */
        public static get Chartreuse(): Color {
            return Color._namedColors.chartreuse.Clone();
        }

        /**
        * Returns a Color object set to the color named color Chocolate.
        */
        public static get Chocolate(): Color {
            return Color._namedColors.chocolate.Clone();
        }

        /**
        * Returns a Color object set to the color named color Coral.
        */
        public static get Coral(): Color {
            return Color._namedColors.coral.Clone();
        }

        /**
        * Returns a Color object set to the color named color CornflowerBlue.
        */
        public static get CornflowerBlue(): Color {
            return Color._namedColors.cornflowerblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color Cornsilk.
        */
        public static get Cornsilk(): Color {
            return Color._namedColors.cornsilk.Clone();
        }

        /**
        * Returns a Color object set to the color named color Crimson.
        */
        public static get Crimson(): Color {
            return Color._namedColors.crimson.Clone();
        }

        /**
        * Returns a Color object set to the color named color Cyan.
        */
        public static get Cyan(): Color {
            return Color._namedColors.cyan.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkBlue.
        */
        public static get DarkBlue(): Color {
            return Color._namedColors.darkblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkCyan.
        */
        public static get DarkCyan(): Color {
            return Color._namedColors.darkcyan.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkGoldenRod.
        */
        public static get DarkGoldenRod(): Color {
            return Color._namedColors.darkgoldenrod.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkGray.
        */
        public static get DarkGray(): Color {
            return Color._namedColors.darkgray.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkGreen.
        */
        public static get DarkGreen(): Color {
            return Color._namedColors.darkgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkKhaki.
        */
        public static get DarkKhaki(): Color {
            return Color._namedColors.darkkhaki.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkMagenta.
        */
        public static get DarkMagenta(): Color {
            return Color._namedColors.darkmagenta.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkOliveGreen.
        */
        public static get DarkOliveGreen(): Color {
            return Color._namedColors.darkolivegreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkOrange.
        */
        public static get DarkOrange(): Color {
            return Color._namedColors.darkorange.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkOrchid.
        */
        public static get DarkOrchid(): Color {
            return Color._namedColors.darkorchid.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkRed.
        */
        public static get DarkRed(): Color {
            return Color._namedColors.darkred.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSalmon.
        */
        public static get DarkSalmon(): Color {
            return Color._namedColors.darksalmon.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSeaGreen.
        */
        public static get DarkSeaGreen(): Color {
            return Color._namedColors.darkseagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSlateBlue.
        */
        public static get DarkSlateBlue(): Color {
            return Color._namedColors.darkslateblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSlateGray.
        */
        public static get DarkSlateGray(): Color {
            return Color._namedColors.darkslategray.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkTurquoise.
        */
        public static get DarkTurquoise(): Color {
            return Color._namedColors.darkturquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkViolet.
        */
        public static get DarkViolet(): Color {
            return Color._namedColors.darkviolet.Clone();
        }

        /**
        * Returns a Color object set to the color named color DeepPink.
        */
        public static get DeepPink(): Color {
            return Color._namedColors.deeppink.Clone();
        }

        /**
        * Returns a Color object set to the color named color DeepSkyBlue.
        */
        public static get DeepSkyBlue(): Color {
            return Color._namedColors.deepskyblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color DimGray.
        */
        public static get DimGray(): Color {
            return Color._namedColors.dimgray.Clone();
        }

        /**
        * Returns a Color object set to the color named color DodgerBlue.
        */
        public static get DodgerBlue(): Color {
            return Color._namedColors.dodgerblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color FireBrick.
        */
        public static get FireBrick(): Color {
            return Color._namedColors.firebrick.Clone();
        }

        /**
        * Returns a Color object set to the color named color FloralWhite.
        */
        public static get FloralWhite(): Color {
            return Color._namedColors.floralwhite.Clone();
        }

        /**
        * Returns a Color object set to the color named color ForestGreen.
        */
        public static get ForestGreen(): Color {
            return Color._namedColors.forestgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color Fuchsia.
        */
        public static get Fuchsia(): Color {
            return Color._namedColors.fuchsia.Clone();
        }

        /**
        * Returns a Color object set to the color named color Gainsboro.
        */
        public static get Gainsboro(): Color {
            return Color._namedColors.gainsboro.Clone();
        }

        /**
        * Returns a Color object set to the color named color GhostWhite.
        */
        public static get GhostWhite(): Color {
            return Color._namedColors.ghostwhite.Clone();
        }

        /**
        * Returns a Color object set to the color named color Gold.
        */
        public static get Gold(): Color {
            return Color._namedColors.gold.Clone();
        }

        /**
        * Returns a Color object set to the color named color GoldenRod.
        */
        public static get GoldenRod(): Color {
            return Color._namedColors.goldenrod.Clone();
        }

        /**
        * Returns a Color object set to the color named color Gray.
        */
        public static get Gray(): Color {
            return Color._namedColors.gray.Clone();
        }

        /**
        * Returns a Color object set to the color named color Green.
        */
        public static get Green(): Color {
            return Color._namedColors.green.Clone();
        }

        /**
        * Returns a Color object set to the color named color GreenYellow.
        */
        public static get GreenYellow(): Color {
            return Color._namedColors.greenyellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color HoneyDew.
        */
        public static get HoneyDew(): Color {
            return Color._namedColors.honeydew.Clone();
        }

        /**
        * Returns a Color object set to the color named color HotPink.
        */
        public static get HotPink(): Color {
            return Color._namedColors.hotpink.Clone();
        }

        /**
        * Returns a Color object set to the color named color IndianRed.
        */
        public static get IndianRed(): Color {
            return Color._namedColors.indianred.Clone();
        }

        /**
        * Returns a Color object set to the color named color Indigo.
        */
        public static get Indigo(): Color {
            return Color._namedColors.indigo.Clone();
        }

        /**
        * Returns a Color object set to the color named color Ivory.
        */
        public static get Ivory(): Color {
            return Color._namedColors.ivory.Clone();
        }

        /**
        * Returns a Color object set to the color named color Khaki.
        */
        public static get Khaki(): Color {
            return Color._namedColors.khaki.Clone();
        }

        /**
        * Returns a Color object set to the color named color Lavender.
        */
        public static get Lavender(): Color {
            return Color._namedColors.lavender.Clone();
        }

        /**
        * Returns a Color object set to the color named color LavenderBlush.
        */
        public static get LavenderBlush(): Color {
            return Color._namedColors.lavenderblush.Clone();
        }

        /**
        * Returns a Color object set to the color named color LawnGreen.
        */
        public static get LawnGreen(): Color {
            return Color._namedColors.lawngreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color LemonChiffon.
        */
        public static get LemonChiffon(): Color {
            return Color._namedColors.lemonchiffon.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightBlue.
        */
        public static get LightBlue(): Color {
            return Color._namedColors.lightblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightCoral.
        */
        public static get LightCoral(): Color {
            return Color._namedColors.lightcoral.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightCyan.
        */
        public static get LightCyan(): Color {
            return Color._namedColors.lightcyan.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGoldenRodYellow.
        */
        public static get LightGoldenRodYellow(): Color {
            return Color._namedColors.lightgoldenrodyellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGray.
        */
        public static get LightGray(): Color {
            return Color._namedColors.lightgray.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGrey.
        */
        public static get LightGrey(): Color {
            return Color._namedColors.lightgrey.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGreen.
        */
        public static get LightGreen(): Color {
            return Color._namedColors.lightgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightPink.
        */
        public static get LightPink(): Color {
            return Color._namedColors.lightpink.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSalmon.
        */
        public static get LightSalmon(): Color {
            return Color._namedColors.lightsalmon.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSeaGreen.
        */
        public static get LightSeaGreen(): Color {
            return Color._namedColors.lightseagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSkyBlue.
        */
        public static get LightSkyBlue(): Color {
            return Color._namedColors.lightskyblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSlateGray.
        */
        public static get LightSlateGray(): Color {
            return Color._namedColors.lightslategray.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSteelBlue.
        */
        public static get LightSteelBlue(): Color {
            return Color._namedColors.lightsteelblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightYellow.
        */
        public static get LightYellow(): Color {
            return Color._namedColors.lightyellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color Lime.
        */
        public static get Lime(): Color {
            return Color._namedColors.lime.Clone();
        }

        /**
        * Returns a Color object set to the color named color LimeGreen.
        */
        public static get LimeGreen(): Color {
            return Color._namedColors.limegreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color Linen.
        */
        public static get Linen(): Color {
            return Color._namedColors.linen.Clone();
        }

        /**
        * Returns a Color object set to the color named color Magenta.
        */
        public static get Magenta(): Color {
            return Color._namedColors.magenta.Clone();
        }

        /**
        * Returns a Color object set to the color named color Maroon.
        */
        public static get Maroon(): Color {
            return Color._namedColors.maroon.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumAquaMarine.
        */
        public static get MediumAquaMarine(): Color {
            return Color._namedColors.mediumaquamarine.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumBlue.
        */
        public static get MediumBlue(): Color {
            return Color._namedColors.mediumblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumOrchid.
        */
        public static get MediumOrchid(): Color {
            return Color._namedColors.mediumorchid.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumPurple.
        */
        public static get MediumPurple(): Color {
            return Color._namedColors.mediumpurple.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumSeaGreen.
        */
        public static get MediumSeaGreen(): Color {
            return Color._namedColors.mediumseagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumSlateBlue.
        */
        public static get MediumSlateBlue(): Color {
            return Color._namedColors.mediumslateblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumSpringGreen.
        */
        public static get MediumSpringGreen(): Color {
            return Color._namedColors.mediumspringgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumTurquoise.
        */
        public static get MediumTurquoise(): Color {
            return Color._namedColors.mediumturquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumVioletRed.
        */
        public static get MediumVioletRed(): Color {
            return Color._namedColors.mediumvioletred.Clone();
        }

        /**
        * Returns a Color object set to the color named color MidnightBlue.
        */
        public static get MidnightBlue(): Color {
            return Color._namedColors.midnightblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color MintCream.
        */
        public static get MintCream(): Color {
            return Color._namedColors.mintcream.Clone();
        }

        /**
        * Returns a Color object set to the color named color MistyRose.
        */
        public static get MistyRose(): Color {
            return Color._namedColors.mistyrose.Clone();
        }

        /**
        * Returns a Color object set to the color named color Moccasin.
        */
        public static get Moccasin(): Color {
            return Color._namedColors.moccasin.Clone();
        }

        /**
        * Returns a Color object set to the color named color NavajoWhite.
        */
        public static get NavajoWhite(): Color {
            return Color._namedColors.navajowhite.Clone();
        }

        /**
        * Returns a Color object set to the color named color Navy.
        */
        public static get Navy(): Color {
            return Color._namedColors.navy.Clone();
        }

        /**
        * Returns a Color object set to the color named color OldLace.
        */
        public static get OldLace(): Color {
            return Color._namedColors.oldlace.Clone();
        }

        /**
        * Returns a Color object set to the color named color Olive.
        */
        public static get Olive(): Color {
            return Color._namedColors.olive.Clone();
        }

        /**
        * Returns a Color object set to the color named color OliveDrab.
        */
        public static get OliveDrab(): Color {
            return Color._namedColors.olivedrab.Clone();
        }

        /**
        * Returns a Color object set to the color named color Orange.
        */
        public static get Orange(): Color {
            return Color._namedColors.orange.Clone();
        }

        /**
        * Returns a Color object set to the color named color OrangeRed.
        */
        public static get OrangeRed(): Color {
            return Color._namedColors.orangered.Clone();
        }

        /**
        * Returns a Color object set to the color named color Orchid.
        */
        public static get Orchid(): Color {
            return Color._namedColors.orchid.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleGoldenRod.
        */
        public static get PaleGoldenRod(): Color {
            return Color._namedColors.palegoldenrod.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleGreen.
        */
        public static get PaleGreen(): Color {
            return Color._namedColors.palegreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleTurquoise.
        */
        public static get PaleTurquoise(): Color {
            return Color._namedColors.paleturquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleVioletRed.
        */
        public static get PaleVioletRed(): Color {
            return Color._namedColors.palevioletred.Clone();
        }

        /**
        * Returns a Color object set to the color named color PapayaWhip.
        */
        public static get PapayaWhip(): Color {
            return Color._namedColors.papayawhip.Clone();
        }

        /**
        * Returns a Color object set to the color named color PeachPuff.
        */
        public static get PeachPuff(): Color {
            return Color._namedColors.peachpuff.Clone();
        }

        /**
        * Returns a Color object set to the color named color Peru.
        */
        public static get Peru(): Color {
            return Color._namedColors.peru.Clone();
        }

        /**
        * Returns a Color object set to the color named color Pink.
        */
        public static get Pink(): Color {
            return Color._namedColors.pink.Clone();
        }

        /**
        * Returns a Color object set to the color named color Plum.
        */
        public static get Plum(): Color {
            return Color._namedColors.plum.Clone();
        }

        /**
        * Returns a Color object set to the color named color PowderBlue.
        */
        public static get PowderBlue(): Color {
            return Color._namedColors.powderblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color Purple.
        */
        public static get Purple(): Color {
            return Color._namedColors.purple.Clone();
        }

        /**
        * Returns a Color object set to the color named color Red.
        */
        public static get Red(): Color {
            return Color._namedColors.red.Clone();
        }

        /**
        * Returns a Color object set to the color named color RosyBrown.
        */
        public static get RosyBrown(): Color {
            return Color._namedColors.rosybrown.Clone();
        }

        /**
        * Returns a Color object set to the color named color RoyalBlue.
        */
        public static get RoyalBlue(): Color {
            return Color._namedColors.royalblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color SaddleBrown.
        */
        public static get SaddleBrown(): Color {
            return Color._namedColors.saddlebrown.Clone();
        }

        /**
        * Returns a Color object set to the color named color Salmon.
        */
        public static get Salmon(): Color {
            return Color._namedColors.salmon.Clone();
        }

        /**
        * Returns a Color object set to the color named color SandyBrown.
        */
        public static get SandyBrown(): Color {
            return Color._namedColors.sandybrown.Clone();
        }

        /**
        * Returns a Color object set to the color named color SeaGreen.
        */
        public static get SeaGreen(): Color {
            return Color._namedColors.seagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color SeaShell.
        */
        public static get SeaShell(): Color {
            return Color._namedColors.seashell.Clone();
        }

        /**
        * Returns a Color object set to the color named color Sienna.
        */
        public static get Sienna(): Color {
            return Color._namedColors.sienna.Clone();
        }

        /**
        * Returns a Color object set to the color named color Silver.
        */
        public static get Silver(): Color {
            return Color._namedColors.silver.Clone();
        }

        /**
        * Returns a Color object set to the color named color SkyBlue.
        */
        public static get SkyBlue(): Color {
            return Color._namedColors.skyblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color SlateBlue.
        */
        public static get SlateBlue(): Color {
            return Color._namedColors.slateblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color SlateGray.
        */
        public static get SlateGray(): Color {
            return Color._namedColors.slategray.Clone();
        }

        /**
        * Returns a Color object set to the color named color Snow.
        */
        public static get Snow(): Color {
            return Color._namedColors.snow.Clone();
        }

        /**
        * Returns a Color object set to the color named color SpringGreen.
        */
        public static get SpringGreen(): Color {
            return Color._namedColors.springgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color SteelBlue.
        */
        public static get SteelBlue(): Color {
            return Color._namedColors.steelblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color Tan.
        */
        public static get Tan(): Color {
            return Color._namedColors.tan.Clone();
        }

        /**
        * Returns a Color object set to the color named color Teal.
        */
        public static get Teal(): Color {
            return Color._namedColors.teal.Clone();
        }

        /**
        * Returns a Color object set to the color named color Thistle.
        */
        public static get Thistle(): Color {
            return Color._namedColors.thistle.Clone();
        }

        /**
        * Returns a Color object set to the color named color Tomato.
        */
        public static get Tomato(): Color {
            return Color._namedColors.tomato.Clone();
        }

        /**
        * Returns a Color object set to the color named color Turquoise.
        */
        public static get Turquoise(): Color {
            return Color._namedColors.turquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color Violet.
        */
        public static get Violet(): Color {
            return Color._namedColors.violet.Clone();
        }

        /**
        * Returns a Color object set to the color named color Wheat.
        */
        public static get Wheat(): Color {
            return Color._namedColors.wheat.Clone();
        }

        /**
        * Returns a Color object set to the color named color White.
        */
        public static get White(): Color {
            return Color._namedColors.white.Clone();
        }

        /**
        * Returns a Color object set to the color named color WhiteSmoke.
        */
        public static get WhiteSmoke(): Color {
            return Color._namedColors.whitesmoke.Clone();
        }

        /**
        * Returns a Color object set to the color named color Yellow.
        */
        public static get Yellow(): Color {
            return Color._namedColors.yellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color YellowGreen.
        */
        public static get YellowGreen(): Color {
            return Color._namedColors.yellowgreen.Clone();
        }

        /**
        * Returns a copy of the color with the current color channels.
        */
        public Clone(): any {
            return new Color(this.R, this.G, this.B, this.A);
        }

        /**
        * Disposes the Color object and unbinds any active event bindings.
        */
        public Dispose(): void {
            this._onChange.Dispose();
        }

        /**
        * toString override that returns the Color in the "rgba(r,g,b,a)" format.
        */
        public toString(): string {
            if (this._cached === undefined) {
                this._cached = 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',' + this.A + ')';
            }
            return this._cached;
        }
    }

    /**
    * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
    */
    export class TileMap extends Graphics.Graphic2d {
        public _Resources: Graphics.ImageSource[];

        /**
        * Creates a new instance of the TileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, resources: Graphics.ImageSource[]) {
            super(new Vector2d(x, y));

            this._Resources = resources;
        }

        /**
        * Scale is not implemented.
        */
        public Scale(scale: number): void {
            throw new Error("Scale is not implemented for TileMaps.");
        }
    }

    /**
* Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
*/
    export class SquareTileMap extends TileMap {
        /**
        * Gets or sets the tile load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between tile loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public TileLoadDelay: TimeSpan;
        /**
        * Gets or sets the row load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between row loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public RowLoadDelay: TimeSpan;

        private _grid: Graphics.Grid;
        // @ts-ignore
        private _staticMap: boolean;
        // @ts-ignore
        private _mapCache: HTMLCanvasElement;
        // @ts-ignore
        private _mapCacheContext: CanvasRenderingContext2D;
        private _mappings: number[][];
        private _onTileLoad: EventHandler2<ITileDetails, number>;
        private _onLoaded: EventHandler;
        private _loaded: boolean;
        private _tilesBuilt: number;
        private _totalTiles: number;

        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][]);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        * @param drawGridLines Whether or not to draw the tile maps grid lines. Useful when trying to pinpoint specific tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean, drawGridLines: boolean);
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean = true, drawGridLines: boolean = false) {
            super(x, y, resources);

            this._mappings = mappings;
            this._grid = new Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
            this._staticMap = staticMap;
            this._onTileLoad = new EventHandler2<ITileDetails, number>();
            this._onLoaded = new EventHandler();
            this._loaded = false;
            this._tilesBuilt = 0;
            this._totalTiles = this._grid.Rows * this._grid.Columns;
            this.TileLoadDelay = TimeSpan.Zero;
            this.RowLoadDelay = TimeSpan.Zero;

            if (this._staticMap) {
                this.BuildCache();
            }

            // Execute this on the next stack, to allow time for binding to the tile maps load events
            setTimeout(() => {
                this.FillGridWith(mappings, () => {
                    this._loaded = true;
                    this._onLoaded.Trigger();
                });
            }, 0);
        }

        /**
        * Gets an event that is triggered when a tile has been loaded, first argument is the tile details for the loaded tile, second is the percent complete.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnTileLoad(): EventHandler2<ITileDetails, number> {
            return this._onTileLoad;
        }

        /**
        * Gets an event that is triggered when the square tile map has been loaded.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnLoaded(): EventHandler {
            return this._onLoaded;
        }

        /**
        * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
        * @param imageSource The sprite sheet to extract the tile resources from.
        * @param tileWidth The width of the sprite sheet tiles.
        * @param tileHeight The height of the sprite sheet tiles.
        */
        public static ExtractTiles(imageSource: Graphics.ImageSource, tileWidth: number, tileHeight: number): Graphics.ImageSource[] {
            var resources: Graphics.ImageSource[] = [],
                framesPerRow: number = Math.floor(imageSource.ClipSize.Width / tileWidth),
                rows: number = Math.floor(imageSource.ClipSize.Height / tileHeight);

            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < framesPerRow; j++) {
                    resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                }
            }

            return resources;
        }

        /**
        * Determines if the current SquareTileMap is loaded.
        */
        public IsLoaded(): boolean {
            return this._loaded;
        }

        /**
        * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
        * @param context The canvas context to draw the SquareTileMap onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            if (!this._staticMap) {
                this._grid.Draw(context);
            }
            else {
                context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
            }

            super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the SquareTileMap will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = this._grid.GetDrawBounds();

            bounds.Position = this.Position;

            return bounds;
        }

        /**
        * Removes all children and unbinds all events associated with the SquareTileMap.
        */
        public Dispose(): void {
            this._grid.Dispose();

            this._onLoaded.Dispose();
            this._onTileLoad.Dispose();
            super.Dispose();
        }

        /**
        * Returns a nearly identical copy of this SquareTileMap.  If this SquareTileMap belongs to a parent, the cloned SquareTileMap will not. If this SquareTileMap has children, all children will be cloned as well.  Lastly, the cloned SquareTileMap will not have the same event bindings as this one does.
        */
        public Clone(): SquareTileMap {
            var graphic = new SquareTileMap(this.Position.X, this.Position.Y, this._grid.TileSize.Width, this._grid.TileSize.Height, this._Resources, this._mappings);

            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;
            graphic.RowLoadDelay = this.RowLoadDelay.Clone();
            graphic.TileLoadDelay = this.TileLoadDelay.Clone();

            return graphic;
        }

        private BuildCache(): void {
            var size: Size2d = this._grid.Size,
                originalPosition = this._grid.Position;

            // @ts-ignore
            this._mapCache = <HTMLCanvasElement>document.createElement("canvas");
            this._mapCache.width = size.Width;
            this._mapCache.height = size.Height;
            // @ts-ignore
            this._mapCacheContext = this._mapCache.getContext("2d");
            this._mapCacheContext.translate(size.HalfWidth, size.HalfHeight);
        }

        private CacheTile(tile: SquareTile): void {
            // Draw the tile onto the map cache
            tile.Draw(this._mapCacheContext);
        }

        private FillGridWith(mappings: number[][], onComplete: () => any): void {
            asyncLoop((next: () => void, rowsComplete: number) => {
                this.AsyncBuildGridRow(rowsComplete, mappings, () => {
                    next();
                });
            }, mappings.length, () => {
                onComplete();
            });
        }

        private AsyncBuildGridTile(row: number, column: number, resourceIndex: number, onComplete: (tile: SquareTile) => any): void {
            var action = () => {
                var tile: SquareTile,
                    tileGraphic: Graphics.ImageSource = this._Resources[resourceIndex];

                tile = new SquareTile(tileGraphic, this._grid.TileSize.Width, this._grid.TileSize.Height);

                this._grid.Fill(row, column, tile);

                this.OnTileLoad.Trigger({
                    Tile: tile,
                    Row: row,
                    Column: column,
                    ResourceIndex: resourceIndex,
                    Parent: this
                }, this._tilesBuilt / this._totalTiles);

                if (this._staticMap) {
                    this.CacheTile(tile);
                }

                onComplete(tile);
            };

            if (this.TileLoadDelay.Milliseconds > 0) {
                setTimeout(action, this.TileLoadDelay.Milliseconds);
            }
            else {
                action();
            }
        }

        // Only pretend async in order to free up the DOM
        private AsyncBuildGridRow(rowIndex: number, mappings: number[][], onComplete: () => any): void {
            setTimeout(() => {
                asyncLoop((next: () => void, tilesLoaded: number) => {
                    this._tilesBuilt++;

                    if (mappings[rowIndex][tilesLoaded] >= 0) {
                        this.AsyncBuildGridTile(rowIndex, tilesLoaded, mappings[rowIndex][tilesLoaded], (tile: SquareTile) => {
                            next();
                        });
                    }
                    else {
                        next();
                    }
                }, mappings[rowIndex].length, () => {
                    onComplete();
                });
            }, this.RowLoadDelay.Milliseconds);
        }
    }

    /**
    * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
    */
    export class SquareTile extends Sprite2d {
        /**
        * Creates a new instance of the SquareTile object.
        * @param image The image that is within the tile.
        * @param width The width of the tile.
        * @param height The height of the tile.
        */
        constructor(image: Graphics.ImageSource, width: number, height: number) {
            super(0, 0, image, width, height); // Set position to 0 because the tile gets updated when it gets added to the tile map
        }
    }

    /**
    * Defines an object that is used to fully describe a loaded tile.
    */
    export interface ITileDetails {
        /**
        * The Tile that will be on the map.
        */
        Tile: Graphics.Sprite2d;

        /**
        * The resource index that was used to build the tile.
        */
        ResourceIndex: number;

        /**
        * The row that the tile occupies.
        */
        Row: number;

        /**
        * The column that the tile occupies.
        */
        Column: number;

        /**
        * The TileMap that contains the Tile.  This can be used to determine the absolute position of the Tile by adding the Parent and Tile's position.
        */
        Parent: TileMap;
    }

    /**
    * Defines an animation that can be drawn to the screen.
    */
    export class SpriteAnimation implements IDisposable {
        private _imageSource: ImageSource;
        // @ts-ignore
        private _fps: number;
        private _frameSize: Size2d;
        private _frameCount: number;
        private _startOffset: Vector2d;
        private _playing: boolean;
        private _repeating: boolean;
        private _currentFrame: number;
        private _framesPerRow: number;
        // The last frame time (in ms)
        private _lastStepAt: number;
        // Step to the next frame ever X ms
        // @ts-ignore
        private _stepEvery: number;
        private _onComplete: EventHandler;

        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        */
        constructor(imageSource: ImageSource, fps: number, frameSize: Size2d, frameCount: number);
        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        * @param startOffset The positional offset within the imageSource on where the set of animation frames begin.
        */
        constructor(imageSource: ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d);
        constructor(imageSource: ImageSource, fps: number, frameSize: Size2d, frameCount: number, startOffset: Vector2d = Vector2d.Zero) {
            this._imageSource = imageSource;
            this._frameSize = frameSize;
            this._frameCount = frameCount;
            this._startOffset = startOffset;
            this._playing = false;
            this._repeating = false;
            this._currentFrame = 0;
            this._lastStepAt = 0;

            this._onComplete = new EventHandler();

            this.Fps = fps;

            if (imageSource.ClipSize !== null || imageSource.IsLoaded()) {
                this._framesPerRow = Math.min(Math.floor((imageSource.Size.Width - startOffset.X) / frameSize.Width), frameCount);
                this.UpdateImageSource();
            }
            else {
                imageSource.OnLoaded.BindFor((image: Graphics.ImageSource) => {
                    this._framesPerRow = Math.min(Math.floor((imageSource.Size.Width - startOffset.X) / frameSize.Width), frameCount);
                    this.UpdateImageSource();
                }, 1);

                this._framesPerRow = 1;
            }
        }

        /**
        * Gets an event that is triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler {
            return this._onComplete;
        }

        /**
        * Gets or sets the current frames per second.
        */
        public get Fps(): number {
            return this._fps;
        }
        public set Fps(newFps: number) {
            this._fps = newFps;
            this._stepEvery = 1000 / this._fps;
        }

        /**
        * Determines if the animation is currently playing.
        */
        public IsPlaying(): boolean {
            return this._playing;
        }

        /**
        * Determines if the animation can play.  This is essentially checking if the underlying image source is loaded.
        */
        public CanPlay(): boolean {
            return this._imageSource.IsLoaded();
        }

        /**
        * Plays the animation.
        */
        public Play(): void;
        /**
        * Plays the animation.
        * @param repeat Whether to play the animation on repeat.
        */
        public Play(repeat: boolean): void;
        public Play(repeat: boolean = false): void {
            if (!this._imageSource.ClipSize) {
                throw new Error("Image source not loaded yet.");
            }

            this._lastStepAt = new Date().getTime();
            this._repeating = repeat;
            this._playing = true;
            this.UpdateImageSource();
        }

        /**
        * Pauses the animation.
        */
        public Pause(): void {
            this._playing = false;
        }

        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        */
        public Step(): void;
        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        * @param count How many frames to move forward
        */
        public Step(count: number): void;
        public Step(count: number = 1): void {
            this._currentFrame += count;

            if (this._currentFrame >= this._frameCount) {
                if (this._repeating) {
                    this._currentFrame %= this._frameCount;
                }
                else {
                    this._currentFrame = this._frameCount - 1;
                    this.OnComplete.Trigger();
                    this.Stop(false);
                }
            }

            if (count !== 0) {
                this.UpdateImageSource();
            }
        }

        /**
        * Stops the animation and resets the current animation frame to 0.
        */
        public Stop(): void;
        /**
        * Stops the animation.
        * @param resetFrame Whether to reset the current animation frame to 0.
        */
        public Stop(resetFrame: boolean): void;
        public Stop(resetFrame: boolean = true): void {
            this._playing = false;
            if (resetFrame) {
                this.Reset();
            }
        }

        /**
        * Resets the current animation frame to 0.
        */
        public Reset(): void {
            this._currentFrame = 0;
            this.UpdateImageSource();
        }

        /**
        * Updates the animations current frame.  Needs to be updated in order to play the animation.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt,
                stepCount = 0;

            if (this._playing) {
                stepCount = Math.floor(timeSinceStep / this._stepEvery);
                if (stepCount > 0) {
                    this._lastStepAt = gameTime.Now.getTime();
                    this.Step(stepCount);
                }
            }
        }

        /**
        * Unbinds all events.  Does not dispose the underlying image source.
        */
        public Dispose(): void {
            this._onComplete.Dispose();
        }

        private UpdateImageSource(): void {
            var row = this.GetFrameRow(),
                column = this.GetFrameColumn();

            this._imageSource.ClipLocation.X = this._startOffset.X + column * this._frameSize.Width;
            this._imageSource.ClipLocation.Y = this._startOffset.Y + row * this._frameSize.Height;
            this._imageSource.ClipSize = this._frameSize;
        }

        private GetFrameRow(): number {
            return Math.floor(this._currentFrame / this._framesPerRow);
        }

        private GetFrameColumn(): number {
            return Math.ceil(this._currentFrame % this._framesPerRow);
        }
    }

    /**
* Abstract drawable shape type that is used create customizable drawable graphics.
*/
    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fillStyle: Color;
        private _strokeStyle: Color;
        private _shadowColor: Color;
        private _fillChangeWire: (color: Color) => void;
        private _strokeChangeWire: (color: Color) => void;
        private _shadowChangeWire: (color: Color) => void;

        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        */
        constructor(position: Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial Color of the current shape object.
        */
        constructor(position: Vector2d, color: Color);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial string Color of the current shape object.
        */
        constructor(position: Vector2d, color: string);
        constructor(position: Vector2d, color?: any) {
            super(position);

            this._fillChangeWire = (color: Color) => {
                this._State.FillStyle = color.toString();
            };

            this._strokeChangeWire = (color: Color) => {
                this._State.StrokeStyle = color.toString();
            };

            this._shadowChangeWire = (color: Color) => {
                this._State.ShadowColor = color.toString();
            };

            this.ShadowColor = this._shadowColor = Color.Black;
            this.BorderColor = this._strokeStyle = Color.Black;

            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }

                this.Color = this._fillStyle = color;
            }
            else {
                this.Color = this._fillStyle = Color.Black;
            }
        }

        /**
        * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): Color {
            return this._fillStyle;
        }
        public set Color(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }

            // Unbind old
            this._fillStyle.OnChange.Unbind(this._fillChangeWire);
            this._fillStyle = color;
            // Bind new
            this._fillStyle.OnChange.Bind(this._fillChangeWire);
            // Update state
            this._fillChangeWire(color);
        }

        /**
        * Gets or sets the current border thickness.
        */
        public get BorderThickness(): number {
            return this._State.LineWidth;
        }
        public set BorderThickness(thickness: number) {
            this._State.LineWidth = thickness;
        }

        /**
        * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get BorderColor(): Color {
            return this._strokeStyle;
        }
        public set BorderColor(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }

            // Unbind old
            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
            this._strokeStyle = color;
            // Bind new
            this._strokeStyle.OnChange.Bind(this._strokeChangeWire);
            // Update state
            this._strokeChangeWire(color);
        }

        /**
        * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get ShadowColor(): Color {
            return this._shadowColor;
        }
        public set ShadowColor(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }

            // Unbind old
            this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
            this._shadowColor = color;
            // Bind new
            this._shadowColor.OnChange.Bind(this._shadowChangeWire);
            // Update state
            this._shadowChangeWire(color);
        }

        /**
        * Gets or sets the current horizontal shadow position.
        */
        public get ShadowX(): number {
            return this._State.ShadowOffsetX;
        }
        public set ShadowX(x: number) {
            this._State.ShadowOffsetX = x;
        }

        /**
        * Gets or sets the current vertical shadow position.
        */
        public get ShadowY(): number {
            return this._State.ShadowOffsetY;
        }
        public set ShadowY(y: number) {
            this._State.ShadowOffsetY = y;
        }

        /**
        * Gets or sets the current shadow blur.
        */
        public get ShadowBlur(): number {
            return this._State.ShadowBlur;
        }
        public set ShadowBlur(blur: number) {
            this._State.ShadowBlur = blur;
        }

        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void
        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.
        */
        public Border(thickness: number, color: Color): void;
        public Border(thickness: number, color: any): void {
            this.BorderThickness = thickness;
            this.BorderColor = color;
        }

        /**
        * Sets the current shadow x and y positions.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        */
        public Shadow(x: number, y: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Shadow(x: number, y: number, color: string): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.
        */
        public Shadow(x: number, y: number, color: Color): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: string, blur: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: Color, blur: number): void;
        public Shadow(x: number, y: number, color?: any, blur?: number): void {
            this.ShadowX = x;
            this.ShadowY = y;
            this.ShadowColor = color;
            // @ts-ignore
            this.ShadowBlur = blur;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);
            context.beginPath();
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            context.fill();

            if (this._State.LineWidth > 0) {
                context.stroke();
            }
            else {
                context.closePath();
            }

            super._EndDraw(context);
        }

        // This should be overridden if you want to build a proper shape
        public _BuildPath(context: CanvasRenderingContext2D): void {
        }

        /**
        * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the shape onto.
        */
        public Draw(context: CanvasRenderingContext2D): void { // You can override this Draw if you want to implement your own logic for applying styles and drawing (do not recommend overriding)
            this._StartDraw(context);
            this._BuildPath(context);
            this._EndDraw(context);
        }

        public Dispose(): void {
            super.Dispose();

            this._fillStyle.OnChange.Unbind(this._fillChangeWire);
            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
            this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
        }

        public _Clone(graphic: Shape): void {
            graphic.Border(this.BorderThickness, this.BorderColor.Clone());
            graphic.Shadow(this.ShadowX, this.ShadowY, this.ShadowColor.Clone(), this.ShadowBlur);

            super._Clone(graphic);
        }
    }

    /**
* Defines a drawable rectangle.
*/
    export class Rectangle extends Shape {
        public _type: string = "Rectangle";

        /**
        * Gets or sets the Size of the Rectangle.
        */
        public Size: Size2d;

        /**
        * Creates a new instance of the Rectangle object.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number);
        /**
        * Creates a new instance of the Rectangle object with a specified color.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        * @param color Initial color of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number, color: Color);
        /**
        * Creates a new instance of the Rectangle object with a specified color.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        * @param color Initial string color of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number, color: string);
        constructor(x: number, y: number, width: number, height: number, color?: any) {
            super(new Vector2d(x, y), color);

            this.Size = new Size2d(width, height);
        }

        /**
        * The bounding area that represents where the Rectangle will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Scale's the rectangle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            this.Size.Width *= scale;
            this.Size.Height *= scale;
        }

        /**
        * Returns a nearly identical copy of this Rectangle.  If this Rectangle belongs to a parent, the cloned Rectangle will not. If this Rectangle has children, all children will be cloned as well.  Lastly, the cloned Rectangle will not have the same event bindings as this one does.
        */
        public Clone(): Rectangle {
            var graphic = new Rectangle(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height, this.Color.Clone());

            super._Clone(graphic);

            return graphic;
        }

        public _BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
        }
    }

    /**
* Defines a drawable circle.
*/
    export class Circle extends Shape {
        public _type: string = "Circle";

        /**
        * Gets or sets the Radius of the Circle.
        */
        public Radius: number;

        /**
        * Creates a new instance of the Circle object.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        */
        constructor(x: number, y: number, radius: number);
        /**
        * Creates a new instance of the Circle object with a specified color.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        * @param color Initial color of the Circle.
        */
        constructor(x: number, y: number, radius: number, color: Color);
        /**
        * Creates a new instance of the Circle object with a specified color.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        * @param color Initial color string of the Circle.
        */
        constructor(x: number, y: number, radius: number, color: string);
        constructor(x: number, y: number, radius: number, color?: any) {
            super(new Vector2d(x, y), color);

            this.Radius = radius;
        }

        /**
        * The bounding area that represents where the Circle will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingCircle(this.Position, this.Radius);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Scale's the circle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            this.Radius *= scale;
        }

        /**
        * Returns a nearly identical copy of this Circle.  If this Circle belongs to a parent, the cloned Circle will not. If this Circle has children, all children will be cloned as well.  Lastly, the cloned Circle will not have the same event bindings as this one does.
        */
        public Clone(): Circle {
            var graphic = new Circle(this.Position.X, this.Position.Y, this.Radius, this.Color.Clone());

            super._Clone(graphic);

            return graphic;
        }

        public _BuildPath(context: CanvasRenderingContext2D): void {
            context.arc(0, 0, this.Radius, 0, (<any>Math).twoPI);
        }
    }

    /**
* Defines a drawable text element.
*/
    export class Text2d extends Shape {
        public _type: string = "Text2d";

        private _fontSettings: FontSettings;
        private _text: string;
        private _recalculateBoundsSize: boolean;

        // For GetDrawBounds
        private _drawBounds: Bounds.BoundingRectangle;

        /**
        * Creates a new instance of the Text2d object.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        */
        constructor(x: number, y: number, text: string);
        /**
        * Creates a new instance of the Text2d object with a specified color.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        * @param color Initial color of the Text2d. Default is Black.
        */
        constructor(x: number, y: number, text: string, color: Color);
        /**
        * Creates a new instance of the Text2d object with a specified color.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        * @param color Initial string color of the Text2d. Default is Black.
        */
        constructor(x: number, y: number, text: string, color: string);
        constructor(x: number, y: number, text: string, color: any = Color.Black) {
            super(new Vector2d(x, y), color);

            this._text = text;

            this._drawBounds = new Bounds.BoundingRectangle(this.Position, Size2d.One);
            this._recalculateBoundsSize = true;

            this._fontSettings = new FontSettings();
            this.Align = "center";
            this.Baseline = "middle";
        }

        /**
        * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
        */
        public get Align(): string {
            return this._State.TextAlign;
        }
        public set Align(alignment: string) {
            this._State.TextAlign = alignment;
        }

        /**
        * Gets or sets the text baseline of the Text2d.  Values can be "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
        */
        public get Baseline(): string {
            return this._State.TextBaseline;
        }
        public set Baseline(baseline: string) {
            this._State.TextBaseline = baseline;
        }

        /**
        * Gets the Text2d's FontSetting's.
        */
        public get FontSettings(): FontSettings {
            this._recalculateBoundsSize = true;

            return this._fontSettings;
        }

        /**
        * Gets or sets the current Text2d's text.
        */
        public get Text(): string {
            return this._text;
        }
        public set Text(text: string) {
            this._recalculateBoundsSize = true;
            this._text = text;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this._State.SetContextState(context);

            context.translate(this.Position.X, this.Position.Y);

            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            var children = this.GetChildren();

            for (var i = 0; i < children.length; i++) {
                if (children[i].Visible) {
                    children[i].Draw(context);
                }
            }

            context.restore();
        }

        /**
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            var textSize;

            this._State.Font = this._fontSettings._BuildFont();

            this._StartDraw(context);

            context.fillText(this._text, 0, 0);
            if (this._State.LineWidth > 0) {
                context.strokeText(this._text, 0, 0);
            }

            // Only recalculate bounds if the text or font has changed since the last draw.
            if (this._recalculateBoundsSize) {
                this._recalculateBoundsSize = false;
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
            }

            this._EndDraw(context);
        }

        /**
        * The bounding area that represents where the Text2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;

            return this._drawBounds;
        }

        /**
        * Scale's the fonts FontSize.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            var size = parseInt(this.FontSettings.FontSize);

            this.FontSettings.FontSize = this.FontSettings.FontSize.replace(size.toString(), (size * scale).toString());
        }

        /**
        * Returns a nearly identical copy of this Text2d.  If this Text2d belongs to a parent, the cloned Text2d will not. If this Text2d has children, all children will be cloned as well.  Lastly, the cloned Text2d will not have the same event bindings as this one does.
        */
        public Clone(): Text2d {
            var graphic = new Text2d(this.Position.X, this.Position.Y, this.Text, this.Color.Clone());

            graphic.Align = this.Align;
            graphic.Baseline = this.Baseline;
            graphic.FontSettings.FontFamily = this.FontSettings.FontFamily;
            graphic.FontSettings.FontSize = this.FontSettings.FontSize;
            graphic.FontSettings.FontStyle = this.FontSettings.FontStyle;
            graphic.FontSettings.FontVariant = this.FontSettings.FontVariant;
            graphic.FontSettings.FontWeight = this.FontSettings.FontWeight;

            super._Clone(graphic);

            return graphic;
        }
    }

    /**
* Defines valid FontVariant's that can be used to change the appearance of Text2d's.
*/
    export enum FontVariant {
        Normal,
        SmallCaps
    };

    /**
* Defines valid FontStyles that can be used to modify the font's style for Text2d's.
*/
    export enum FontStyle {
        Normal,
        Italic,
        Oblique
    }

    /**
* Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
*/
    export class FontSettings {
        // @ts-ignore
        private _cachedState: { [property: string]: any; };
        // @ts-ignore
        private _cachedFont: string;
        private _refreshCache: boolean;

        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        constructor() {
            this._cachedState = {
                fontSize: "10px",
                fontFamily: FontFamily.TimesNewRoman,
                fontVariant: FontVariant.Normal,
                fontWeight: "",
                fontStyle: FontStyle.Normal
            };

            this._refreshCache = true;
            this._BuildFont();
        }

        /**
        * Gets or sets the current font size.  Values can be things such as 20px.
        */
        public get FontSize(): string {
            return this._cachedState["fontSize"];
        }
        public set FontSize(size: string) {
            this._refreshCache = true;
            this._cachedState["fontSize"] = size;
        }

        /**
        * Gets or sets the font family.
        */
        public get FontFamily(): FontFamily {
            return this._cachedState["fontFamily"];
        }
        public set FontFamily(family: FontFamily) {
            this._refreshCache = true;
            this._cachedState["fontFamily"] = family;
        }

        /**
        * Gets or sets the font variant.
        */
        public get FontVariant(): FontVariant {
            return this._cachedState["fontVariant"];
        }
        public set FontVariant(variant: FontVariant) {
            this._refreshCache = true;
            this._cachedState["fontVariant"] = variant;
        }

        /**
        * Gets or sets the current font weight.
        */
        public get FontWeight(): string {
            return this._cachedState["fontWeight"];
        }
        public set FontWeight(weight: string) {
            this._refreshCache = true;
            this._cachedState["fontWeight"] = weight;
        }

        /**
        * Gets or sets the current font style.
        */
        public get FontStyle(): FontStyle {
            return this._cachedState["fontStyle"];
        }
        public set FontStyle(style: FontStyle) {
            this._refreshCache = true;
            this._cachedState["fontStyle"] = style;
        }

        public _BuildFont(): string {
            var font;

            if (this._refreshCache) {
                font = this._cachedState["fontWeight"] + " " + FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + FontVariant[this._cachedState["fontVariant"]].replace("Normal", "") + " " + this._cachedState["fontSize"];

                if (this._cachedState["fontFamily"] !== undefined) {
                    font += " " + FontFamily[this._cachedState["fontFamily"]];
                }

                this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this._refreshCache = false;
            }

            return this._cachedFont;
        }
    }

    /**
* Defines valid FontFamilies that can be used to display Text2d's differently.
*/
    export enum FontFamily {
        Antiqua,
        Arial,
        Avqest,
        Blackletter,
        Calibri,
        ComicSans,
        Courier,
        Decorative,
        Fraktur,
        Frosty,
        Garamond,
        Georgia,
        Helvetica,
        Impact,
        Minion,
        Modern,
        Monospace,
        Palatino,
        Roman,
        Script,
        Swiss,
        TimesNewRoman,
        Verdana
    };

    /**
    * Defines a drawable grid that can be used to store other graphics in a grid like structure.
    */
    export class Grid extends Graphic2d {
        public _type: string = "Grid";

        private _size: Size2d;
        private _tileSize: Size2d;
        private _grid: Graphic2d[][];
        private _gridLines: Line2d[];
        private _rows: number;
        private _columns: number;
        // @ts-ignore
        private _gridLineColor: Color;
        // @ts-ignore
        private _drawGridLines: boolean;

        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        * @param gridLineColor Initial grid line color (only useful if drawGridLines is true); 
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean, gridLineColor: Color);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        * @param gridLineColor Initial grid line color (only useful if drawGridLines is true); 
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean, gridLineColor: string);
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean = false, gridLineColor: any = new Color("gray")) {
            super(new Vector2d(x, y));

            this._size = new Size2d(tileWidth * columns, tileHeight * rows);
            this._tileSize = new Size2d(tileWidth, tileHeight);
            this._grid = [];
            this._rows = rows;
            this._columns = columns;
            this._gridLines = [];
            this.GridLineColor = gridLineColor;
            this.DrawGridLines = drawGridLines;

            // Initialize our grid
            for (var i = 0; i < this._rows; i++) {
                this._grid[i] = [];

                for (var j = 0; j < this._columns; j++) {
                    // @ts-ignore
                    this._grid[i].push(null);
                }
            }
        }

        /**
        * Gets or sets the DrawGridLines property.  Indicates whether the grids column and row lines will be drawn.
        */
        public get DrawGridLines(): boolean {
            return this._drawGridLines;
        }
        public set DrawGridLines(shouldDraw: boolean) {
            if (shouldDraw && this._gridLines.length === 0) {
                this.BuildGridLines();
            }

            this._drawGridLines = shouldDraw;
        }

        /**
        * Gets or sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get GridLineColor(): Color {
            return this._gridLineColor;
        }
        public set GridLineColor(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }
            this._gridLineColor = color;

            for (var i = 0; i < this._gridLines.length; i++) {
                this._gridLines[i].Color = color;
            }
        }

        /**
        * Gets the size of the grid.
        */
        public get Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Gets the size of the tiles.
        */
        public get TileSize(): Size2d {
            return this._tileSize.Clone();
        }

        /**
        * Gets the number of rows.
        */
        public get Rows(): number {
            return this._rows;
        }

        /**
        * Gets the number of columns.
        */
        public get Columns(): number {
            return this._columns;
        }

        /**
        * Fills a tile with the provided graphic.
        * @param row The row.
        * @param column The column.
        * @param graphic The graphic to fill the tile with.
        */
        public Fill(row: number, column: number, graphic: Graphic2d): void {
            if (!graphic || !this.ValidRow(row) || !this.ValidColumn(column)) {
                return;
            }

            graphic.Position = this.GetInsideGridPosition(row, column);

            this._grid[row][column] = graphic;
            this.AddChild(graphic);
        }

        /**
        * Fills a row with the provided graphics
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        */
        public FillRow(row: number, graphicList: Graphic2d[]): void;
        /**
        * Fills a row with the provided graphics starting at the provided column
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        * @param columnOffset The column to start filling at.
        */
        public FillRow(row: number, graphicList: Graphic2d[], columnOffset: number): void;
        public FillRow(row: number, graphicList: Graphic2d[], columnOffset: number = 0): void {
            var graphic: Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);

                this._grid[row][i + columnOffset] = graphic;
                this.AddChild(graphic);
            }
        }

        /**
        * Fills a column with the provided graphics
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        */
        public FillColumn(column: number, graphicList: Graphic2d[]): void;
        /**
        * Fills a column with the provided graphics starting at the provided row.
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        * @param rowOffset The row to start filling at.
        */
        public FillColumn(column: number, graphicList: Graphic2d[], rowOffset: number): void;
        public FillColumn(column: number, graphicList: Graphic2d[], rowOffset: number = 0): void {
            var graphic: Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);

                this._grid[i + rowOffset][column] = graphic;
                this.AddChild(graphic);
            }
        }

        /**
        * Fills a tile with the provided graphic.
        * @param row The row to start filling at.
        * @param column The column to start filling at.
        * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
        */
        public FillSpace(row: number, column: number, graphicList: Graphic2d[][]): void {
            var graphic: Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                for (var j = 0; j < graphicList[i].length; j++) {
                    graphic = graphicList[i][j];
                    if (graphic) {
                        graphic.Position = this.GetInsideGridPosition(i + row, j + column);

                        this._grid[i + row][j + column] = graphic;
                        this.AddChild(graphic);
                    }
                }
            }
        }

        /**
        * Gets a graphic within the grid.
        * @param row The row.
        * @param column The column.
        */
        public Get(row: number, column: number): Graphic2d {
            // @ts-ignore
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                // @ts-ignore
                return null;
            }

            return this._grid[row][column];
        }

        /**
        * Retrieves graphics within the provided row.
        * @param row The row to retrieve.
        */
        public GetRow(row: number): Graphic2d[];
        /**
        * Retrieves graphics within the row starting at the provided column offset.
        * @param row The row to retrieve.
        * @param columnOffset The column to start retrieving the row at.
        */
        public GetRow(row: number, columnOffset: number): Graphic2d[];
        public GetRow(row: number, columnOffset: number = 0): Graphic2d[] {
            var rowList: Graphic2d[] = [];

            for (var i = columnOffset; i < this._columns; i++) {
                rowList.push(this._grid[row][i]);
            }

            return rowList;
        }

        /**
        * Retrieves graphics within the provided column.
        * @param column The column to retrieve.
        */
        public GetColumn(column: number): Graphic2d[];
        /**
        * Retrieves graphics within the column starting at the provided row offset.
        * @param column The column to retrieve.
        * @param rowOffset The row to start retrieving the column at.
        */
        public GetColumn(column: number, rowOffset: number): Graphic2d[];
        public GetColumn(column: number, rowOffset: number = 0): Graphic2d[] {
            var columnList: Graphic2d[] = [];

            for (var i = rowOffset; i < this._rows; i++) {
                columnList.push(this._grid[i][column]);
            }

            return columnList;
        }

        /**
        * Retrieves graphics within row column cross section.
        * @param rowStart The row to start pulling graphics from.
        * @param columnStart The column to start pulling graphics from.
        * @param rowEnd The row to stop pulling graphics from.
        * @param columnEnd The column to stop pulling graphics from.
        */
        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphic2d[] {
            var space: Graphic2d[] = [],
                rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
                columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i >= this._rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j >= this._columns) {
                        break;
                    }

                    space.push(this._grid[i][j]);
                }
            }

            return space;
        }

        /**
        * Clear a grid tile.
        * @param row The row.
        * @param column The column.
        */
        public Clear(row: number, column: number): Graphic2d {
            // @ts-ignore
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                // @ts-ignore
                return null;
            }

            var val = this._grid[row][column];

            // @ts-ignore
            this._grid[row][column] = null;
            this.RemoveChild(val);

            return val;
        }

        /**
        * Clears graphics within the provided row.
        * @param row The row to clear.
        */
        public ClearRow(row: number): Graphic2d[];
        /**
        * Clears graphics within the row starting at the provided column offset.
        * @param row The row to clear.
        * @param columnOffset The column to start clearing the row at.
        */
        public ClearRow(row: number, columnOffset: number): Graphic2d[];
        public ClearRow(row: number, columnOffset: number = 0): Graphic2d[] {
            var vals: Graphic2d[] = [];

            for (var i = 0; i < this._columns; i++) {
                vals.push(this._grid[row][i]);
                this.RemoveChild(this._grid[row][i]);
                // @ts-ignore
                this._grid[row][i] = null;
            }

            return vals;
        }

        /**
        * Clears graphics within the provided column.
        * @param column The column to clear.
        */
        public ClearColumn(column: number): Graphic2d[];
        /**
        * Clears graphics within the column starting at the provided column offset.
        * @param column The column to clear.
        * @param rowOffset The row to start clearing the column at.
        */
        public ClearColumn(column: number, rowOffset: number): Graphic2d[];
        public ClearColumn(column: number, rowOffset: number = 0): Graphic2d[] {
            var vals: Graphic2d[] = [];

            for (var i = 0; i < this._rows; i++) {
                vals.push(this._grid[i][column]);
                this.RemoveChild(this._grid[i][column]);
                // @ts-ignore
                this._grid[i][column] = null;
            }

            return vals;
        }

        /**
        * Clears graphics within row column cross section.
        * @param rowStart The row to start clearing graphics from.
        * @param columnStart The column to start clearing graphics from.
        * @param rowEnd The row to stop clearing graphics from.
        * @param columnEnd The column to stop clearing graphics from.
        */
        public ClearSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphic2d[] {
            var space: Graphic2d[] = [],
                rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
                columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i > this._rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j > this._columns) {
                        break;
                    }

                    space.push(this._grid[i][j]);
                    this.RemoveChild(this._grid[i][j]);
                    // @ts-ignore
                    this._grid[i][j] = null;
                }
            }

            return space;
        }

        /**
        * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the grid onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            context.save();
            super._EndDraw(context);

            if (this.DrawGridLines) {
                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Draw(context);
                }
            }
            context.restore();
        }

        /**
        * The bounding area that represents where the grid will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this._size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            throw new Error("Scale is not implemented for the Grid class.");
        }

        /**
        * Converts the provided vertical coordinate to a row number that is based on the current grid.
        * @param y The vertical coordinate to convert to a row.
        */
        public ConvertToRow(y: number): number {
            return Math.floor((y - (this.Position.Y - this._size.HalfHeight)) / this._tileSize.Height);
        }

        /**
        * Converts the provided horizontal coordinate to a column number that is based on the current grid.
        * @param x The horizontal component to convert to a column.
        */
        public ConvertToColumn(x: number): number {
            return Math.floor((x - (this.Position.X - this._size.HalfWidth)) / this._tileSize.Width);
        }

        /**
        * Returns a nearly identical copy of this Grid.  If this Grid belongs to a parent, the cloned Grid will not. If this Grid has children, all children will be cloned as well.  Lastly, the cloned Grid will not have the same event bindings as this one does.
        */
        public Clone(): Grid {
            var graphic = new Grid(this.Position.X, this.Position.Y, this._rows, this._columns, this._tileSize.Width, this._tileSize.Height, this._drawGridLines, this._gridLineColor.Clone());

            for (var i = 0; i < this._grid.length; i++) {
                for (var j = 0; j < this._grid[i].length; j++) {
                    if (this._grid[i][j]) {
                        graphic.Fill(i, j, this._grid[i][j].Clone());
                    }
                }
            }

            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;

            return graphic;
        }

        private BuildGridLines(): void {
            var halfSize: Size2d = this._size.Multiply(.5),
                topLeft: Vector2d = new Vector2d(-halfSize.Width, -halfSize.Height),
                bottomRight: Vector2d = new Vector2d(halfSize.Width, halfSize.Height);

            for (var i = 0; i < this._rows; i++) {
                this._gridLines.push(new Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1, this._gridLineColor));

                if (i === 0) {
                    for (var j = 0; j < this._columns; j++) {
                        this._gridLines.push(new Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1, this._gridLineColor));
                    }
                }
            }

            this._gridLines.push(new Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
            this._gridLines.push(new Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
        }

        private GetInsideGridPosition(row: number, column: number): Vector2d {
            return new Vector2d(column * this._tileSize.Width - this._size.HalfWidth + this._tileSize.HalfWidth, row * this._tileSize.Height - this._size.HalfHeight + this._tileSize.HalfHeight);
        }

        private ValidRow(row: number): boolean {
            return row >= 0 && row < this._rows;
        }

        private ValidColumn(column: number): boolean {
            return column >= 0 && column < this._columns;
        }
    }
}