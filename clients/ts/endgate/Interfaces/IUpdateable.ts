import { GameTime } from "../GameTime";

/**
* Represents an object that can be updated.
*/
export interface IUpdateable {
    /**
    * Updates the object.
    * @param gameTime The current game time object.
    */
    Update(gameTime: GameTime): void;
}