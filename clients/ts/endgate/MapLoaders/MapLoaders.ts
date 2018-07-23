import { EventHandler1 } from "../Utilities/EventHandler1";
import { Graphics } from "../Graphics/Graphics";
import { TimeSpan } from "../Assets/TimeSpan";
import { asyncLoop } from "../Extensions/Helpers";

export module MapLoaders {
    /**
* Defines an object that can be used to provide hooks to adjust tiles as they are built.
*/
    export interface IPropertyHooks {
        /**
        * Hooks to trigger when a resource tile with the specified property is used when loading a map.  Passes in the created tile and the property value for the hook.
        */
        ResourceTileHooks?: { [property: string]: IHookFunction };

        /**
        * Hooks to trigger when a resource sheet with the specified property is used when loading a map.  Passes in created tiles from the resource sheet and the property value for the hook.
        */
        ResourceSheetHooks?: { [property: string]: IHookFunction };

        /**
        * Hooks to trigger when a layer with the specified property is used when loading a map.  Passes in created tiles from the layer and the property value for the hook.
        */
        LayerHooks?: { [property: string]: IHookFunction };
    }

    /**
* Defines an object that contains some immediately available information about the map that is about to be loaded.
*/
    export interface IMapPreloadInfo {
        /**
        * The total number of layers the map contains.
        */
        LayerCount: number;

        /**
        * The total number of tile resource sheets that are used to represent the map.
        */
        ResourceSheetCount: number;

        /**
        * The total number of tiles within the map (empty or not).
        */
        TileCount: number;

        /**
        * Gets an event that is triggered when the percent loaded value has changed, first argument is the percent loaded (0-1).  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        OnPercentLoaded: EventHandler1<number>;
    }

    /**
* Defines an object that can load data and output a result asynchronously.
*/
    export interface IMapLoader {
        /**
        * Loads the provided data then calls the onComplete function once valid map data has been created.
        * @param data The base data that will be transformed into the IMapLoadedResult format.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.
        * @param onComplete The function to trigger when the data has been converted into a valid IMapLoadedResult.
        */
        Load(data: any, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo;
    }

    /**
* Defines an object that contains all the information needed to create a scenic map.
*/
    export interface IMapLoadedResult {
        /**
        * Gets or sets the layers that will represent the scenery of the game.  Each layer should be added to the scenery in order to draw the layers.
        */
        Layers: Array<Graphics.TileMap>;
    }

    /**
* Defines an IHookFunction that represents a function that can be used to hook into map loading tiles.
*/
    export interface IHookFunction {
        (details: Graphics.ITileDetails, propertyValue: string): any;
    }


    /**
* Defines supported JSON formats for map loading.
*/
    export enum JSONFormat {
        TMX
    }

    export class TMXLoader implements IMapLoader {
        private _orientationLoaders: { [orientation: string]: IMapLoader };

        constructor() {
            this._orientationLoaders = {
                orthogonal: new OrthogonalLoader()
            };
        }

        public Load(data: ITMX, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo {
            if (!this._orientationLoaders[data.orientation]) {
                throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
            }

            return this._orientationLoaders[data.orientation].Load(data, propertyHooks, onComplete);
        }
    }

    interface TileExtractResult {
        ResourceHooks: Array<Array<(details: Graphics.ITileDetails) => any>>;
        Resources: Array<Graphics.ImageSource>;
    }

    export class OrthogonalLoader implements IMapLoader {
        private static _imagePercentMax: number = .2;

        public Load(data: ITMX, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo {
            // We're initially at 0%.
            var percent = 0,
                tileCount = 0,
                onPartialLoad: EventHandler1<number> = new EventHandler1<number>();

            // Load all the sources referenced within the data
            this.LoadTilesetSources(data.tilesets,
                (tileset: Graphics.ImageSource) => {
                    percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax

                    onPartialLoad.Trigger(percent);
                },
                (tilesetSources: { [tilesetName: string]: Graphics.ImageSource }) => {
                    // Triggered once all the sources have completed loading

                    // All the tiles extracted represent our resource list
                    var resources: TileExtractResult = this.ExtractTilesetTiles(data.tilesets, tilesetSources, propertyHooks),
                        mappings: Array<Array<number>>,
                        layers: Array<Graphics.SquareTileMap> = new Array<Graphics.SquareTileMap>(),
                        layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;

                    percent = OrthogonalLoader._imagePercentMax;

                    asyncLoop((next: () => void, i: number) => {
                        if (data.layers[i].type !== "tilelayer") {
                            throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                        }

                        this.AsyncBuildLayer(data, i, propertyHooks, resources,
                            (details: Graphics.ITileDetails, percentLoaded: number) => {
                                onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                            },
                            (layer: Graphics.SquareTileMap) => {
                                percent += layerPercentValue;

                                onPartialLoad.Trigger(percent);

                                layers.push(layer);

                                next();
                            });
                    }, data.layers.length, () => {
                        // All layers loaded

                        onComplete({
                            Layers: layers
                        });
                    });
                });

            for (var i = 0; i < data.layers.length; i++) {
                tileCount += data.layers[i].data.length;
            }

            return {
                TileCount: tileCount,
                LayerCount: data.layers.length,
                ResourceSheetCount: data.tilesets.length,
                OnPercentLoaded: onPartialLoad
            };
        }

        private LoadTilesetSources(tilesets: Array<ITMXTileset>, onTilesetLoad: (tileset: Graphics.ImageSource) => any, onComplete: (tilesetSources: { [tilesetName: string]: Graphics.ImageSource }) => any): void {
            var tilesetSources: { [tilesetName: string]: Graphics.ImageSource } = {},
                loadedCount: number = 0,
                onLoaded = (source: Graphics.ImageSource) => {
                    onTilesetLoad(source);
                    // If everything has loaded
                    if (++loadedCount === tilesets.length) {
                        onComplete(tilesetSources);
                    }
                };

            for (var i = 0; i < tilesets.length; i++) {
                tilesetSources[tilesets[i].name] = new Graphics.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
            }
        }

        private ExtractTilesetTiles(tilesets: Array<ITMXTileset>, tilesetSources: { [tilesetName: string]: Graphics.ImageSource }, propertyHooks: IPropertyHooks): TileExtractResult {
            var tilesetTiles: Array<Graphics.ImageSource> = new Array<Graphics.ImageSource>(),
                resourceHooks = new Array<Array<(details: Graphics.ITileDetails) => any>>(),
                sources: Array<Graphics.ImageSource>,
                index: number;

            tilesets.sort((a: ITMXTileset, b: ITMXTileset) => { return a.firstgid - b.firstgid; });

            for (var i = 0; i < tilesets.length; i++) {
                sources = Graphics.SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight);

                for (var property in tilesets[i].properties) {
                    // @ts-ignore
                    if (typeof propertyHooks.ResourceSheetHooks[property] !== "undefined") {
                        for (var j = tilesets[i].firstgid - 1; j < tilesets[i].firstgid - 1 + sources.length; j++) {
                            if (typeof resourceHooks[j] === "undefined") {
                                resourceHooks[j] = new Array<(details: Graphics.ITileDetails) => any>();
                            }

                            // @ts-ignore
                            resourceHooks[j].push(this.BuildHookerFunction(tilesets[i].properties[property], propertyHooks.ResourceSheetHooks[property]));
                        }
                    }
                }

                for (var tileIndex in tilesets[i].tileproperties) {
                    for (var property in tilesets[i].tileproperties[tileIndex])
                        // @ts-ignore
                        if (typeof propertyHooks.ResourceTileHooks[property] !== "undefined") {
                            index = parseInt(tileIndex) + tilesets[i].firstgid - 1;

                            if (typeof resourceHooks[index] === "undefined") {
                                resourceHooks[index] = new Array<(details: Graphics.ITileDetails) => any>();
                            }

                            // @ts-ignore
                            resourceHooks[index].push(this.BuildHookerFunction(tilesets[i].tileproperties[tileIndex][property], propertyHooks.ResourceTileHooks[property]));
                        }
                }

                tilesetTiles = tilesetTiles.concat(sources);
            }

            return {
                Resources: tilesetTiles,
                ResourceHooks: resourceHooks
            };
        }

        // Not true async but it frees up the DOM
        private AsyncBuildLayer(tmxData: ITMX, layerIndex: number, propertyHooks: IPropertyHooks, resources: TileExtractResult, onTileLoad: (details: Graphics.ITileDetails, percentComplete: number) => any, onComplete: (squareTileMap: Graphics.SquareTileMap) => any): void {
            setTimeout(() => {
                // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                var tmxLayer = tmxData.layers[layerIndex],
                    mappings = this.NormalizeLayerData(tmxLayer.data, tmxData.width),
                    layer = new Graphics.SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources.Resources, mappings),
                    layerHooks: Array<(details: Graphics.ITileDetails) => any> = new Array<(details: Graphics.ITileDetails) => any>();

                for (var property in tmxLayer.properties) {
                    // @ts-ignore
                    if (typeof propertyHooks.LayerHooks[property] !== "undefined") {
                        // @ts-ignore
                        layerHooks.push(this.BuildHookerFunction(tmxLayer.properties[property], propertyHooks.LayerHooks[property]));
                    }
                }

                layer.ZIndex = layerIndex;
                layer.Visible = tmxLayer.visible;
                layer.Opacity = tmxLayer.opacity;

                // Enough delay to ensure that the page doesn't freeze
                layer.RowLoadDelay = TimeSpan.FromMilliseconds(5);

                layer.OnTileLoad.Bind((details: Graphics.ITileDetails, percentComplete: number) => {
                    if (resources.ResourceHooks[details.ResourceIndex]) {
                        for (var i = 0; i < resources.ResourceHooks[details.ResourceIndex].length; i++) {
                            resources.ResourceHooks[details.ResourceIndex][i](details);
                        }
                    }

                    for (var i = 0; i < layerHooks.length; i++) {
                        layerHooks[i](details);
                    }

                    onTileLoad(details, percentComplete);
                });

                layer.OnLoaded.Bind(() => {
                    onComplete(layer);
                });
            }, 0);
        }

        private BuildHookerFunction(propertyValue: string, fn: IHookFunction): (details: Graphics.ITileDetails) => any {
            return (details: Graphics.ITileDetails): any => {
                return fn(details, propertyValue);
            };
        }

        private NormalizeLayerData(data: Array<number>, columns: number): Array<Array<number>> {
            var normalized: Array<Array<number>> = new Array<Array<number>>(),
                index: number;

            for (var i = 0; i < data.length; i++) {
                index = Math.floor(i / columns);

                if (!(normalized[index] instanceof Array)) {
                    normalized[index] = new Array<number>();
                }

                // Subtract 1 because TMX format starts at 1
                normalized[index].push(data[i] - 1);
            }

            return normalized;
        }
    }

    export interface ITMXTileset {
        firstgid: number;
        image: string;
        imageheight: number;
        imagewidth: number;
        margin: number;
        name: string;
        properties: { [property: string]: string };
        spacing: number;
        tilewidth: number;
        tileheight: number;
        tileproperties: { [tileIndex: string]: { [property: string]: string } };
    }

    export interface ITMXLayer {
        name: string;
        data: Array<number>;
        opacity: number;
        type: string;
        visible: boolean;
        width: number;
        height: number;
        x: number;
        y: number;
        properties: { [property: string]: string };
    }

    export interface ITMX {
        version: number;
        width: number;
        height: number;
        tilewidth: number;
        tileheight: number;
        orientation: string;
        properties: any;
        layers: Array<ITMXLayer>;
        tilesets: Array<ITMXTileset>;
    }

    /**
* Defines a JSON loader that is used to load maps.
*/
    export class JSONLoader {
        private static _loaders: { [format: string]: IMapLoader } = {
            TMX: new TMXLoader()
        };

        /**
        * Loads the provided tmx formatted json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks: IPropertyHooks): IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        * @param format The format of the JSON object.  Defaults to the tmx format.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks: IPropertyHooks, format: JSONFormat): IMapPreloadInfo;
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks?: IPropertyHooks, format: JSONFormat = JSONFormat.TMX): IMapPreloadInfo {
            if (!propertyHooks) {
                // Defaults
                propertyHooks = {
                    ResourceTileHooks: {},
                    ResourceSheetHooks: {},
                    LayerHooks: {}
                };
            }

            return JSONLoader._loaders[JSONFormat[format]].Load(json, propertyHooks, onComplete);
        }
    }

}