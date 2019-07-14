import C from '../constants.json';
import * as PIXI from 'pixi.js';

export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.animations = {};
    this.sprite = new PIXI.Sprite(PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkzVT8DwACugGYrNcDjQAAAABJRU5ErkJggg=='));
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  generateAnimations() {
    const resources = PIXI.Loader.shared.resources;
    C.ANIMATIONS.forEach((animationInfo) => {
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

  run(delta) {
    this.sprite.x += this.velocity.x;
    this.sprite.y -= this.velocity.y;
  }

  /**
   * Searches for the given animation, which must have already been generated,
   * and sets the Player instance's sprite to be the given AnimatedSprite
   * instance. It's up to the invoking function to either grab `this.sprite`
   * and add to the stage, or, this function helpfully returns the sprite.
   * @param {string} animationName - Name of the animation, which must exist in
   * the constants file and already have been Loaded and Generated (see
   * load.state.js, loadAssets).
   * @param {boolean=true} loop - Whether the animation should loop.
   * @returns {PIXI.AnimatedSprite} The instance of the animated sprite matching
   * the given name.
   */
  startAnimation(animationName, loop = true) {
    if (!this.animations[animationName]) {
      throw new Error(`Animation with name ${animationName} does not exist on this Player.`);
    }
    this.sprite = this.animations[animationName];
    this.sprite.loop = !!loop;
    this.sprite.play();
    return this.sprite;
  }
}
