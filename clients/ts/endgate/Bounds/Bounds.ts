import { Vector2d } from "../Assets/Vectors/Vector2d";
import { Vector2dHelpers } from "../Assets/Vectors/Helpers/Vector2dHelpers";
import { ITyped } from "../Interfaces/ITyped";
import { Size2d } from "../Assets/Sizes/Size2d";
import { IMoveable } from "../Interfaces/IMoveable";

export module Bounds {
    /**
    * Abstract bounds type that is used to detect intersections.
    */
    export class Bounds2d implements IMoveable {
        public _boundsType: string = "Bounds2d";

        /**
        * Gets or sets the Position of the bounds.
        */
        public Position: Vector2d;
        /**
        * Gets or sets the Rotation of the bounds.
        */
        public Rotation: number;

        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        */
        constructor(position: Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        * @param rotation Initial Rotation of the current bounded object.
        */
        constructor(position: Vector2d, rotation: number);
        constructor(position: Vector2d, rotation?: number) {
            this.Position = position;
            this.Rotation = rotation || 0;
        }

        /**
        * Abstract: Scales the size of the bounded object.
        * @param x Value to multiply the horizontal component by.
        * @param y Value to multiply the vertical component by.
        */
        public Scale(x: number, y: number): void {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point to check containment on.
        */
        public Contains(point: Vector2d): boolean;
        /**
        * Abstract: Determines if the current bounded object completely contains another bounded object.
        * @param obj A bounded object to check containment on.
        */
        public Contains(obj: Bounds2d): boolean;
        public Contains(obj: any): boolean {
            if (obj._boundsType === "BoundingCircle") {
                return this.ContainsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.ContainsRectangle(obj);
            }
            else if (obj._type === "Vector2d") {
                return this.ContainsPoint(obj);
            }
            else {
                throw new Error("Cannot try and check contains with an unidentifiable object, must be a Vector2d, BoundingCircle or BoundingRectangle.");
            }
        }

        /**
        * Determines if the current bounded object intersects another bounded object.
        * @param obj Bounding object to check collision with.
        */
        public Intersects(obj: Bounds2d): boolean;
        public Intersects(obj: any): boolean {
            if (obj._boundsType === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle.");
            }
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            throw new Error("This method is abstract!");
        }
    }

    /**
    * Defines a circle that can be used to detect intersections.
    */
    export class BoundingCircle extends Bounds2d implements ITyped {
        public _type: string = "BoundingCircle";
        public _boundsType: string = "BoundingCircle";

        /**
        * Gets or sets the Radius of the circle.
        */
        public Radius: number;

        /**
        * Creates a new instance of BoundingCircle.
        * @param position Initial Position of the BoundingCircle.
        * @param radius Initial Radius of the BoundingCircle.
        */
        constructor(position: Vector2d, radius: number) {
            super(position);

            this.Radius = radius;
        }

        /**
        * Scales the radius of the BoundingCircle.
        * @param scale Value to multiply the radius by.
        */
        public Scale(scale: number): void {
            // This is an overloaded version of Bounds2d Scale but we don't care
            // about the second parameter within a BoundingCircle
            this.Radius *= scale;
        }

        /**
        * Calculates the area of the BoundingCircle.
        */
        public Area(): number {
            return Math.PI * this.Radius * this.Radius;
        }

        /**
        * Calculates the circumference of the BoundingCircle.
        */
        public Circumference(): number {
            return 2 * Math.PI * this.Radius;
        }

        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            var translated = (rectangle.Rotation === 0)
                ? this.Position
                : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

            var circleDistance = translated.Distance(rectangle.Position);

            if (circleDistance.X > (rectangle.Size.HalfWidth + this.Radius)) { return false; }
            if (circleDistance.Y > (rectangle.Size.HalfHeight + this.Radius)) { return false; }

            if (circleDistance.X <= (rectangle.Size.HalfWidth)) { return true; }
            if (circleDistance.Y <= (rectangle.Size.HalfHeight)) { return true; }

            var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth, 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight, 2);

            return (cornerDistance_sq <= (this.Radius * this.Radius));
        }

        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): boolean {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }

        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            return circle.Position.Distance(this.Position).Length() + circle.Radius <= this.Radius;
        }

        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            var corners = rectangle.Corners();

            for (var i = 0; i < corners.length; i++) {
                if (!this.ContainsPoint(corners[i])) {
                    return false;
                }
            }

            return true;
        }
    }

    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    export class BoundingRectangle extends Bounds2d implements ITyped {
        public _type: string = "BoundingRectangle";
        public _boundsType: string = "BoundingRectangle";

        /**
        * Gets or sets the Size of the rectangle.
        */
        public Size: Size2d;

        /**
        * Creates a new instance of BoundingRectangle.
        * @param position Initial Position of the BoundingRectangle.
        * @param size Initial Size of the BoundingRectangle.
        */
        constructor(position: Vector2d, size: Size2d) {
            super(position);
            this.Size = size;
        }

        /**
        * Scales the width and height of the BoundingRectangle.
        * @param x Value to multiply the width by.
        * @param y Value to multiply the height by.
        */
        public Scale(x: number, y: number): void {
            this.Size.Width *= x;
            this.Size.Height *= y;
        }

        /** 
        * Gets the top left corner of the BoundingRectangle.
        */
        public get TopLeft(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the top right corner of the BoundingRectangle.
        */
        public get TopRight(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the bottom left corner of the BoundingRectangle.
        */
        public get BotLeft(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the bottom right corner of the BoundingRectangle.
        */
        public get BotRight(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        public Corners(): Vector2d[] {
            return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean {
            return circle.IntersectsRectangle(this);
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            if (this.Rotation === 0 && rectangle.Rotation === 0) {
                var myTopLeft = this.TopLeft,
                    myBotRight = this.BotRight,
                    theirTopLeft = rectangle.TopLeft,
                    theirBotRight = rectangle.BotRight;

                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
            }
            else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) {// Check if we're somewhat close to the rectangle ect that we might be colliding with
                var axisList: Vector2d[] = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                var myVertices = this.Corners();
                var theirVertices = rectangle.Corners();

                for (var i: number = 0; i < axisList.length; i++) {
                    var axi = axisList[i];
                    var myProjections = Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                    var theirProjections = Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                    // No collision
                    if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }

        /**
        * Determines if the current BoundingRectangle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): boolean {
            var savedRotation: number = this.Rotation;

            if (this.Rotation !== 0) {
                this.Rotation = 0;
                point = point.RotateAround(this.Position, -savedRotation);
            }

            var myTopLeft = this.TopLeft,
                myBotRight = this.BotRight;

            this.Rotation = savedRotation;

            return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
        }

        /**
        * Determines if the current BoundingRectangle completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            return this.ContainsPoint(new Vector2d(circle.Position.X - circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X, circle.Position.Y - circle.Radius)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X + circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X, circle.Position.Y + circle.Radius));
        }

        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            var corners = rectangle.Corners();

            for (var i = 0; i < corners.length; i++) {
                if (!this.ContainsPoint(corners[i])) {
                    return false;
                }
            }

            return true;
        }
    }
}