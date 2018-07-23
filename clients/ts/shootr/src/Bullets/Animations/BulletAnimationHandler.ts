import * as eg from "../../../../endgate/endgate";
import { BulletExplosionAnimation } from "./BulletExplosionAnimation";
import { Bullet } from "../Bullet";

export class BulletAnimationHandler {
    private _explosionAnimation: BulletExplosionAnimation;

    constructor(private _bullet: Bullet, private _contentManager: eg.Content.ContentManager) {
        this._explosionAnimation = new BulletExplosionAnimation(this._contentManager);

        this._explosionAnimation.OnComplete.Bind(() => {
            this._bullet.Dispose();
            this._bullet.Graphic.Dispose();
        });

        this._bullet.OnExplosion.Bind(() => {
            this._bullet.Graphic.HideBullet();
            this._explosionAnimation.Play();
        });

        this._bullet.Graphic.AddChild(this._explosionAnimation);
    }

    public Update(gameTime: eg.GameTime): void {
        this._explosionAnimation.Update(gameTime);
    }
}