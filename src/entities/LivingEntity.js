import C from '../constants.json';
import * as PIXI from 'pixi.js';

export default class LivingEntity {
  constructor(scene) {
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

  generateAnimations() {
    const resources = PIXI.Loader.shared.resources;
    C.ANIMATIONS[this.NAME].forEach((animationInfo) => {
      const result = [];
      for (const frame in resources[animationInfo.name].spritesheet.textures) {
        result.push({
          texture: resources[animationInfo.name].spritesheet.textures[frame],
          time: C.ANIMATION_TIME
        });
      }
      this.animations[animationInfo.name] = new PIXI.AnimatedSprite(result);
    });
  }

  collide(counter) {
    // TODO: rework anchors so we don't have to do this fuckery
    this.stop(this.x, counter.y - (counter.height / 2) - this.sprite.height);
  }

  run(delta) {
    // TODO: work with anchors to fix this bullshit and simplify edge calculations
    if (!this.atRest) this.moveTo(this.x += this.velocity.x, this.y -= this.velocity.y);
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
      throw new Error(`Animation with name ${animationName} does not exist on this ${this.NAME}.`);
    }
    if (this.sprite) {
      this.scene.removeChild(this.sprite);
    }
    this.sprite = this.animations[animationName];
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.loop = !!loop;
    this.sprite.play();
    this.scene.addChild(this.sprite);
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;
    return this.sprite;
  }

  stop(x, y) {
    this.atRest = true;
    this.moveTo(x, y);
  }

  releaseJump() {
    this.charging = false;
    this.startAnimation('playerFly');
    this.velocity.y = this.charge;
    this.moveTo(this.x, this.y - 20);
    this.charge = 0;
    this.atRest = false;
  }

  /**
   * Moves the player sprite to the given coordinates.
   * @param {number} x - x coordinate.
   * @param {number} y - y coordinate.
   */
  moveTo(x, y) {
    if (!x || !y) throw new Error('Must include x and y coordinates!');
    if (!this.sprite) throw new Error(`Can't move a sprite that doesn't exist!`);
    this.x = x;
    this.y = y;
    this.sprite.x = x;
    this.sprite.y = y;
  }
}
