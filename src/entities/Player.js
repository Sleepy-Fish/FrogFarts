import C from '../constants.json';
import * as PIXI from 'pixi.js';
import { Controller } from '../input';

export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.animations = {};
    this.x = 0;
    this.y = 0;
    this.charge = 0;
    this.controller = new Controller({
      spacebar: 32,
      left: 37,
      right: 39
    });
    this.controller.activate();
    this.controller.onHold('spacebar', this.chargeJump.bind(this));
    this.controller.onPress('left', this.moveLeft.bind(this));
    this.controller.onPress('right', this.moveRight.bind(this));
    this.controller.onRelease('spacebar', this.releaseJump.bind(this));
  }

  run(delta) {
    this.controller.run(delta);
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
      throw new Error(`Animation with name ${animationName} does not exist on this Player.`);
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
    return this.sprite;
  }

  chargeJump() {
    if (this.charge === 0) {
      this.startAnimation('playerSquat', false).onComplete = () => {
        this.startAnimation('playerCharge');
      };
    }
    console.log('Charging JUMP!', this.charge++);
  }

  releaseJump() {
    this.startAnimation('playerFly');
    console.log('JUMPING!!!', this.charge);
    this.charge = 0;
  }

  moveLeft() {
    console.log('move LEFT');
  }

  moveRight() {
    console.log('move RIGHT');
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
