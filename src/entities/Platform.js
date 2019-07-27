import * as PIXI from 'pixi.js';
import Entity from './Entity.js';

export default class Platform extends Entity {
  constructor(scene, options = {}) {
    super(scene, options);
    this.NAME = 'PLATFORM';
    this.sprite = new PIXI.Sprite(PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkzVT8DwACugGYrNcDjQAAAABJRU5ErkJggg=='));
    this.sprite.anchor.set(0.5);
    this.sprite.x = this._x;
    this.sprite.y = this._y;
    this.sprite.width = this._width;
    this.sprite.height = this._height;
    this.scene.addChild(this.sprite);
    this.solid = true;
  }
}
