import { Size2d } from "../Assets/Sizes/Size2d";
import { IDisposable } from "../Interfaces/IDisposable";
import { Bounds } from "../Bounds/Bounds";
import { EventHandler1 } from "../Utilities/EventHandler1";
import { ITyped } from "../Interfaces/ITyped";
import { IUpdateable } from "../Interfaces/IUpdateable";
import { GameTime } from "../GameTime";
import { Vector2d } from "../Assets/Vectors/Vector2d";
import { EventHandler } from "../Utilities/EventHandler";
import { EventHandler2 } from "../Utilities/EventHandler2";

export module Collision {
    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    export class Collidable implements IDisposable, ITyped {
        public _type: string = "Collidable";
        public _id: number;

        /**
        * Gets or sets the Bounds of the collidable.
        */
        public Bounds: Bounds.Bounds2d;

        private static _collidableIDs: number = 0;
        private _disposed: boolean;
        private _onCollision: EventHandler1<CollisionData>;
        private _onDisposed: EventHandler1<Collidable>;

        /**
        * Creates a new instance of Collidable.
        * @param bounds Initial bounds for the Collidable.
        */
        constructor(bounds?: Bounds.Bounds2d) {
            this._disposed = false;

            this.Bounds = (<Bounds.Bounds2d>bounds);
            this._id = Collidable._collidableIDs++;

            this._onCollision = new EventHandler1<CollisionData>();
            this._onDisposed = new EventHandler1<Collidable>();
        }

        /**
        * Gets an event that is triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnCollision(): EventHandler1<CollisionData> {
            return this._onCollision;
        }
        /**
        * Gets an event that is triggered when the Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Collidable> {
            return this._onDisposed;
        }

        /**
        * Determines if the provided collidable is colliding with this Collidable.
        * @param other Collidable to check collision with.
        */
        public IsCollidingWith(other: Collidable): boolean {
            return this.Bounds.Intersects(other.Bounds);
        }

        /**
        * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
        * @param data Collision information related to the collision.
        */
        public Collided(data: CollisionData): void {
            this.OnCollision.Trigger(data);
        }

        /**
        * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this.OnDisposed.Trigger(this);
                this.OnDisposed.Dispose();
                this.OnCollision.Dispose();
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        }
    }

    /**
    * Defines a CollisionConfiguration object that is used to configure and optimize the collision manager.
    */
    export class CollisionConfiguration {
        public static _DefaultMinQuadTreeNodeSize: Size2d = new Size2d(32);

        private _minQuadTreeNodeSize: Size2d;
        private _initialQuadTreeSize: Size2d;

        constructor(initialQuadTreeSize: Size2d) {
            this._initialQuadTreeSize = initialQuadTreeSize;
            this._minQuadTreeNodeSize = CollisionConfiguration._DefaultMinQuadTreeNodeSize;
            this._OnChange = new EventHandler();
        }

        public _OnChange: EventHandler;

        /**
        * Gets or sets the minimum quad tree node size.  For best performance this value should be equivalent to the smallest collidable object that will be monitored by the CollisionManager.  Changing this value re-creates the collision manager.  Values must represent a square.
        */
        public get MinQuadTreeNodeSize(): Size2d {
            return this._minQuadTreeNodeSize.Clone();
        }
        public set MinQuadTreeNodeSize(newSize: Size2d) {
            if (newSize.Width !== newSize.Height) {
                throw new Error("MinQuadTreeNodeSize must be a square.  Width and height must be identical.");
            }

            this._minQuadTreeNodeSize = newSize;
            this._OnChange.Trigger();
        }

        /**
        * Gets or sets the initial quad tree size.  The quad tree used for collision detection will dynamically grow in size if items drift outside of its boundaries.  If this property is set it will re-instantiate a new quad tree.  Values must be divisible by the MinQuadTreeNodeSize and must represent a square.
        */
        public get InitialQuadTreeSize(): Size2d {
            return this._initialQuadTreeSize;
        }
        public set InitialQuadTreeSize(newSize: Size2d) {
            if (newSize.Width !== newSize.Height) {
                throw new Error("InitialQuadTreeSize must be a square.  Width and height must be identical.");
            }
            else if (newSize.Width % this._minQuadTreeNodeSize.Width !== 0) {
                throw new Error("InitialQuadTreeSize must be divisible by the MinQuadTreeNodeSize.");
            }

            this._initialQuadTreeSize = newSize;
            this._OnChange.Trigger();
        }
    }

    /**
    * Defines a data object that is used to describe a collision event.
    */
    export class CollisionData {
        /**
        * Who collided with you.
        */
        public With: Collidable;

        /**
        * Creates a new instance of the CollisionData object.
        * @param w Initial value of the With component of CollisionData.
        */
        constructor(w: Collidable) {
            this.With = w;
        }
    }

    interface ICollidableMappings {
        Collidable: Collidable;
        Unmonitor: (collidable: Collidable) => any;
    }

    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    export class CollisionManager implements IUpdateable, IDisposable, ITyped {
        public _type: string = "CollisionManager";
        private _collidables: ICollidableMappings[];
        private _nonStaticCollidables: Collidable[];
        public _quadTree: QuadTree;
        private _onCollision: EventHandler2<Collidable, Collidable>;
        private _enabled: boolean;
        private _disposed: boolean;

        /**
        * Creates a new instance of CollisionManager.
        */
        constructor(configuration: CollisionConfiguration) {
            this._collidables = [];
            this._nonStaticCollidables = [];
            this._quadTree = new QuadTree(configuration);
            this._enabled = false;
            this._disposed = false;
            this._onCollision = new EventHandler2<Collidable, Collidable>();
        }

        /**
        * Gets an event that is triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnCollision(): EventHandler2<Collidable, Collidable> {
            return this._onCollision;
        }

        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * @param obj Collidable to monitor.
        */
        public Monitor(obj: Collidable): void;
        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * Note: staticPosition'd collidable's will not collide with each other.
        * @param obj Collidable to monitor.
        * @param staticPosition Whether the Collidable will be stationary.  This value defaults to false.
        */
        public Monitor(obj: Collidable, staticPosition: boolean): void;
        public Monitor(obj: Collidable, staticPosition: boolean = false): void {
            var mapping: ICollidableMappings = {
                Collidable: obj,
                Unmonitor: (collidable) => {
                    this.Unmonitor(collidable);
                }
            };

            this._enabled = true;

            obj.OnDisposed.Bind(mapping.Unmonitor);

            this._collidables.push(mapping);

            if (!staticPosition) {
                this._nonStaticCollidables.push(obj);
            }

            this._quadTree.Insert(obj);
        }

        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collidable): void {
            var index: number;

            for (var i = 0; i < this._collidables.length; i++) {
                if (this._collidables[i].Collidable._id === obj._id) {
                    this._collidables[i].Collidable.OnDisposed.Unbind(this._collidables[i].Unmonitor);
                    this._collidables.splice(i, 1);
                    break;
                }
            }

            index = this._nonStaticCollidables.indexOf(obj);

            if (index >= 0) {
                this._nonStaticCollidables.splice(index, 1);
            }

            this._quadTree.Remove(obj);
        }

        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var collidable: Collidable,
                hash: string,
                candidates: Array<Collidable>,
                cacheMap: { [ids: string]: boolean; } = {},
                colliding: Array<Array<Collidable>> = new Array<Array<Collidable>>();

            if (this._enabled) {
                // Update the structure of the quad tree, this accounts for moving objects
                this._quadTree.Update(gameTime);

                // Determine colliding objects
                for (var i = 0; i < this._nonStaticCollidables.length; i++) {
                    collidable = this._nonStaticCollidables[i];
                    candidates = this._quadTree.CollisionCandidates(collidable);

                    for (var j = 0; j < candidates.length; j++) {
                        // If we're colliding with someone else
                        if (collidable._id !== candidates[j]._id && collidable.IsCollidingWith(candidates[j])) {
                            colliding.push([collidable, candidates[j]]);
                        }
                    }
                }

                // Dispatch collision events
                for (var i = 0; i < colliding.length; i++) {
                    hash = this.HashIds(colliding[i][0], colliding[i][1]);

                    if (!cacheMap[hash]) {
                        cacheMap[hash] = true;

                        colliding[i][0].Collided(new CollisionData(colliding[i][1]));
                        colliding[i][1].Collided(new CollisionData(colliding[i][0]));

                        this.OnCollision.Trigger(colliding[i][0], colliding[i][1]);
                    }
                }
            }
        }

        /**
        * Destroys removes all monitored collidables and destroys the collision manager.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                for (var i = 0; i < this._collidables.length; i++) {
                    this.Unmonitor(this._collidables[i].Collidable);
                }

                this._collidables = [];
                this._nonStaticCollidables = [];
                this._onCollision.Dispose();
                delete this._quadTree;
            }
            else {
                throw new Error("CollisionManager cannot be disposed more than once");
            }
        }

        private HashIds(c1: Collidable, c2: Collidable): string {
            return Math.min(c1._id, c2._id).toString() + Math.max(c2._id, c1._id).toString();
        }

    }

    export interface ICollidableMap {
        Node: QuadTreeNode;
        Collidable: Collidable;
        StaticPosition: boolean;
    }

    export class QuadTree implements IDisposable, IUpdateable {
        private _disposed: boolean;
        private _minNodeSize: Size2d;
        private _root: QuadTreeNode;
        private _collidableMap: { [id: number]: ICollidableMap };
        private _updateableCollidableMap: { [id: number]: ICollidableMap };

        constructor(configuration: CollisionConfiguration) {
            this._disposed = false;
            this._minNodeSize = configuration.MinQuadTreeNodeSize;
            this._collidableMap = {};
            this._updateableCollidableMap = {};

            this._root = new QuadTreeNode(new Vector2d(configuration.InitialQuadTreeSize.HalfWidth, configuration.InitialQuadTreeSize.HalfHeight), configuration.InitialQuadTreeSize, configuration.MinQuadTreeNodeSize, null);
        }

        public Insert(obj: Collidable, staticPosition: boolean = false): void {
            if (!this._root.Bounds.Contains(obj.Bounds)) {
                this.Expand(obj);
            }

            this._collidableMap[obj._id] = {
                Node: this._root.Insert(obj),
                Collidable: obj,
                StaticPosition: staticPosition
            };

            if (!staticPosition) {
                this._updateableCollidableMap[obj._id] = this._collidableMap[obj._id];
            }
        }

        public Remove(obj: Collidable): void {
            var node = this._collidableMap[obj._id].Node;

            delete this._collidableMap[obj._id];
            delete this._updateableCollidableMap[obj._id];

            node.Remove(obj);
        }

        public CollisionCandidates(obj: Collidable): Array<Collidable> {
            var node: QuadTreeNode = this._collidableMap[obj._id].Node,
                results: Array<Collidable> = node.GetSubTreeContents();

            // Collect parent contents
            while (node.Parent !== null) {
                results = results.concat(node.Parent.Contents);

                node = node.Parent;
            }

            return results;
        }

        public Query(queryArea: Bounds.BoundingRectangle): Array<Collidable> {
            return this._root.Query(queryArea);
        }

        public Expand(cause: Collidable): void {
            var rootBounds: Bounds.BoundingRectangle = (<Bounds.BoundingRectangle>this._root.Bounds),
                topLeftDistance = rootBounds.TopLeft.Distance(cause.Bounds.Position).Length(),
                topRightDistance = rootBounds.TopRight.Distance(cause.Bounds.Position).Length(),
                botLeftDistance = rootBounds.BotLeft.Distance(cause.Bounds.Position).Length(),
                botRightDistance = rootBounds.BotRight.Distance(cause.Bounds.Position).Length(),
                closestCornerDistance = Math.min(topLeftDistance, topRightDistance, botLeftDistance, botRightDistance),
                newSize = rootBounds.Size.Multiply(2),
                newRoot: QuadTreeNode;

            if (closestCornerDistance === topLeftDistance) { // Current root will be bottom right of expanded quad tree because we need to expand to the top left
                newRoot = new QuadTreeNode(rootBounds.TopLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotRightChild = this._root;
            }
            else if (closestCornerDistance === topRightDistance) { // Current root will be bottom left of expanded quad tree because we need to expand to the top right
                newRoot = new QuadTreeNode(rootBounds.TopRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotLeftChild = this._root;
            }
            else if (closestCornerDistance === botLeftDistance) { // Current root will be top right of expanded quad tree because we need to expand to the bottom left
                newRoot = new QuadTreeNode(rootBounds.BotLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopRightChild = this._root;
            }
            else if (closestCornerDistance === botRightDistance) { // Current root will be top left of expanded quad tree because we need to expand to the bottom right
                newRoot = new QuadTreeNode(rootBounds.BotRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopLeftChild = this._root;
            }
            else {
                throw new Error("Unexpected collision.");
            }

            this._root.Parent = newRoot;
            this._root = newRoot;
        }

        public Update(gameTime: GameTime): void {
            var node: QuadTreeNode, lookup: ICollidableMap, collidable: Collidable, newNode: QuadTreeNode;

            for (var id in this._updateableCollidableMap) {
                lookup = this._updateableCollidableMap[id];
                node = lookup.Node;
                collidable = lookup.Collidable;

                node.Remove(collidable);

                // If one of the collidables has drifted outside the root bounds, expand the quad tree
                if (!this._root.Bounds.Contains(collidable.Bounds)) {
                    this.Expand(collidable);
                    newNode = this._root.Insert(collidable);
                }
                else {
                    // Check if object has left the bounds of this node and is not root
                    if (!node.Bounds.Contains(collidable.Bounds) && node.Parent != null) {
                        // We now belong to a parent
                        newNode = node.Parent.ReverseInsert(collidable);
                    }
                    else // We're within the same node, but could be in children, must insert
                    {
                        newNode = node.Insert(collidable);
                    }
                }

                // This will update the _collidableMap as well since its referencing the same object.
                this._updateableCollidableMap[id].Node = newNode;
            }
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        }
    }

    export class QuadTreeNode extends Collidable {
        public Contents: Array<Collidable>;
        public Parent: QuadTreeNode | null;

        private _minNodeSize: Size2d;
        private _children: Array<QuadTreeNode>;
        private _partitioned: boolean;

        constructor(position: Vector2d, size: Size2d, minNodeSize: Size2d, parent: QuadTreeNode | null) {
            super(new Bounds.BoundingRectangle(position, size));
            this._minNodeSize = minNodeSize;
            this._children = new Array<QuadTreeNode>();
            this.Contents = new Array<Collidable>();
            this.Parent = parent;
            this._partitioned = false;
        }

        public get Children(): Array<QuadTreeNode> {
            return this._children;
        }

        public get TopLeftChild(): QuadTreeNode {
            return this._children[0];
        }
        public set TopLeftChild(newChild: QuadTreeNode) {
            this._children[0] = newChild;
        }

        public get TopRightChild(): QuadTreeNode {
            return this._children[1];
        }
        public set TopRightChild(newChild: QuadTreeNode) {
            this._children[1] = newChild;
        }

        public get BotLeftChild(): QuadTreeNode {
            return this._children[2];
        }
        public set BotLeftChild(newChild: QuadTreeNode) {
            this._children[2] = newChild;
        }

        public get BotRightChild(): QuadTreeNode {
            return this._children[3];
        }
        public set BotRightChild(newChild: QuadTreeNode) {
            this._children[3] = newChild;
        }

        public IsPartitioned(): boolean {
            return this._partitioned;
        }

        public Partition(): void {
            var partitionedSize = new Size2d(Math.round((<Bounds.BoundingRectangle>this.Bounds).Size.Width * .5)),
                boundsPosition = this.Bounds.Position;

            this._partitioned = true;

            if (partitionedSize.Width < this._minNodeSize.Width) {
                return;
            }

            this._children.push(new QuadTreeNode(boundsPosition.Subtract(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new Vector2d(boundsPosition.X + partitionedSize.Width / 2, boundsPosition.Y - partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new Vector2d(boundsPosition.X - partitionedSize.Width / 2, boundsPosition.Y + partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(boundsPosition.Add(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
        }

        public Insert(obj: Collidable): QuadTreeNode {
            if (!this._partitioned) {
                this.Partition();
            }

            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].Bounds.Contains(obj.Bounds)) {
                    return this._children[i].Insert(obj);
                }
            }

            this.Contents.push(obj);

            return this;
        }

        public ReverseInsert(obj: Collidable): QuadTreeNode {
            // Check if object has left the bounds of this node then go up another level
            if (!this.Bounds.Contains(obj.Bounds)) {
                if (this.Parent != null) {
                    return this.Parent.ReverseInsert(obj);
                }
            }

            return this.Insert(obj);
        }

        public Query(queryArea: Bounds.BoundingRectangle): Array<Collidable> {
            var results = new Array<Collidable>(),
                child: QuadTreeNode;

            // Check if some of the items in this quadrant are partially contained within the query area
            for (var i = 0; i < this.Contents.length; i++) {
                if (queryArea.Intersects(this.Contents[i].Bounds)) {
                    results.push(this.Contents[i]);
                }
            }

            for (var i = 0; i < this._children.length; i++) {
                child = this._children[i];

                // If child fully contains the query area then we need to
                // drill down until we find all of the query items
                if (child.Bounds.Contains(queryArea)) {
                    results = results.concat(child.Query(queryArea));
                    break;
                }

                // If the queryArea fully contains the node then everything
                // underneath it belongs to the query
                if (queryArea.Contains(child.Bounds)) {
                    results = results.concat(child.GetSubTreeContents());
                    continue;
                }

                // If a sub-node intersects partially with the query then we
                // need to query its children to find valid nodes
                if (child.Bounds.Intersects(queryArea)) {
                    results = results.concat(child.Query(queryArea));
                }
            }

            return results;
        }

        public Remove(obj: Collidable): void {
            var index = this.Contents.indexOf(obj);

            if (index >= 0) {
                this.Contents.splice(index, 1);
            }
        }

        public GetSubTreeContents(): Array<Collidable> {
            var results = new Array<Collidable>();

            for (var i = 0; i < this._children.length; i++) {
                results = results.concat(this._children[i].GetSubTreeContents());
            }

            results = results.concat(this.Contents);

            return results;
        }
    }
}