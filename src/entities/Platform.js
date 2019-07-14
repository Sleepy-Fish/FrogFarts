import * as PIXI from 'pixi.js';

export default class Platform {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.sprite = new PIXI.Sprite(PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkzVT8DwACugGYrNcDjQAAAABJRU5ErkJggg=='));
    this.sprite.anchor.set(0.5);
    this.sprite.x = options.x || 10;
    this.sprite.y = options.y || 10;
    this.sprite.width = options.width || 10;
    this.sprite.height = options.height || 10;
    this.scene.addChild(this.sprite);
  }

  get x() {
    return this.sprite.x;
  }

  set x(x) {
    this.sprite.x = x;
  }

  get y() {
    return this.sprite.y;
  }

  set y(y) {
    this.sprite.y = y;
  }

  get width() {
    return this.sprite.width;
  }

  set width(val) {
    this.sprite.width = val;
  }

  get height() {
    return this.sprite.height;
  }

  set height(val) {
    this.sprite.height = val;
  }
}
