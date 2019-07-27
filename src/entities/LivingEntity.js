import C from '../constants.json';
import * as PIXI from 'pixi.js';
import Entity from './Entity.js';

export default class LivingEntity extends Entity {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.animations = {};
    this.atRest = true;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.x = 0;
    this.y = 0;
    this.NAME = null;
  }

  run(delta) {
    super.run(delta);
    if (!this.atRest) this.moveTo(this.x += this.velocity.x, this.y -= this.velocity.y);
  }

  generateAnimations() {
    if (this.NAME && C.ANIMATIONS[this.NAME]) {
      const resources = PIXI.Loader.shared.resources;
      let defaultSprite = new PIXI.Sprite(PIXI.Texture.from('data:images/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L/m/HgAGzgKY9/gjYwAAAABJRU5ErkJggg=='));
      C.ANIMATIONS[this.NAME].forEach((animationInfo) => {
        const result = [];
        for (const frame in resources[animationInfo.name].spritesheet.textures) {
          result.push({
            texture: resources[animationInfo.name].spritesheet.textures[frame],
            time: C.ANIMATION_TIME
          });
        }
        this.animations[animationInfo.name] = new PIXI.AnimatedSprite(result);
        if (animationInfo.default) defaultSprite = this.animations[animationInfo.name];
      });
      this.sprite = defaultSprite;
      this.sprite.anchor.set(0.5);
      this.sprite.scale.x = this.sprite.scale.y = C.SCALE;
      this.scene.addChild(this.sprite);
    } else {
      throw Error(`LivingEntity ${this.NAME} has no valid animations`);
    }
  }

  /**
   * Searches for the given animation, which must have already been generated,
   * and sets the Player instance's sprite to be the given AnimatedSprite
   * instance.
   * Removes previous sprite.
   * Adds new animation sprite to exact location of previous sprite on stage.
   * @param {string} animationName - Name of the animation, which must exist in
   * the constants file and already have been Loaded and Generated (see
   * load.state.js, loadAssets).
   * @param {boolean=true} loop - Whether the animation should loop.
   * @returns {PIXI.AnimatedSprite} The instance of the animated sprite matching
   * the given name.
   */
  startAnimation(animationName, loop = true) {
    if (!this.animations[animationName]) {
      throw new Error(`Animation with name ${animationName} does not exist on entity ${this.NAME}.`);
    }
    if (this.sprite) this.scene.removeChild(this.sprite);
    this.sprite = this.animations[animationName];
    this.sprite.anchor.set(0.5);
    this.sprite.x = this._x;
    this.sprite.y = this._y;
    this.sprite.scale.x = this.sprite.scale.y = C.SCALE;
    this.sprite.loop = !!loop;
    this.sprite.play();
    this.scene.addChild(this.sprite);
    return this.sprite;
  }

  /**
   * Stops velocity movement of the entity and sticks it at the given coordinates.
   * @param {number} x - x coordinate.
   * @param {number} y - y coordinate.
   */
  stop(x = this.x, y = this.y) {
    this.atRest = true;
    this.moveTo(x, y);
  }
}
