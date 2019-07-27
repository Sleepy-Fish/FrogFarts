import C from '../constants.json';
import * as PIXI from 'pixi.js';

export default class EntityAnimation {
  constructor(entity, data) {
    this.entity = entity;
    this.states = {};
    const resources = PIXI.Loader.shared.resources;
    let defaultSprite;
    for (const info of data) {
      const animation = [];
      for (const frame in resources[info.name].spritesheet.textures) {
        animation.push({
          texture: resources[info.name].spritesheet.textures[frame],
          time: C.ANIMATION_TIME
        });
      }
      this.states[info.name] = new PIXI.AnimatedSprite(animation);
      if (info.default) defaultSprite = this.states[info.name];
    }
    if (!defaultSprite) defaultSprite = this.states[0];
    this.entity.scene.addChild(this._setSprite(defaultSprite));
  }

  /**
   * Sets local sprite to be rendered.
   * @private
   * @param {PIXI.AnimatedSprite} sprite - sprite that is getting set
   * @param {boolean = true} loop - should sprite loop
   */
  _setSprite(sprite, loop = true) {
    sprite.anchor.set(0.5);
    sprite.x = this.entity.x;
    sprite.y = this.entity.y;
    sprite.scale.x = sprite.scale.y = C.SCALE;
    sprite.loop = loop;
    if (!loop) sprite.gotoAndStop(0);
    sprite.play();
    this.sprite = sprite;
    return sprite;
  }

  /**
   * Sets animation state based on named animations provided in constructor
   * @param {string} state - state to set the animation to
   * @param {boolean = true} loop - should animation loop
   */
  setState(state, loop = true) {
    if (!this.states[state]) throw Error(`EntityAnimation does not include state ${state}`);
    this.entity.scene.removeChild(this.sprite);
    const animation = this._setSprite(this.states[state], loop);
    this.entity.scene.addChild(animation);
    return animation;
  }

  get x() { return this.sprite.x; }

  set x(x) { this.sprite.x = x; }

  get y() { return this.sprite.y; }

  set y(y) { this.sprite.y = y; }

  get width() { return this.sprite.width; }

  set width(w) { this.sprite.width = w; }

  get height() { return this.sprite.height; }

  set height(h) { this.sprite.height = h; }
}
