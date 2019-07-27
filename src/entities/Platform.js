import * as PIXI from 'pixi.js';
import Entity from './Entity.js';

export default class Platform extends Entity {
  constructor(scene, options = {}) {
    super(scene);
    this.name = 'FLOOR';
    this.sprite = new PIXI.Sprite(PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkzVT8DwACugGYrNcDjQAAAABJRU5ErkJggg=='));
    this.sprite.anchor.set(0.5);
    this.sprite.x = options.x || 10;
    this.sprite.y = options.y || 10;
    this.sprite.width = options.width || 10;
    this.sprite.height = options.height || 10;
    this.scene.addChild(this.sprite);
  }
}
