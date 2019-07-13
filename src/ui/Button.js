import * as PIXI from 'pixi.js';

export default class Button {
  constructor(options = {}, callback = () => { console.trace(`No callback set for ${this.constructor.name}`); }) {
    this.isDown = false;
    this.isHover = false;
    this.callback = callback;

    this.container = new PIXI.Container();
    this.container.x = options.x || 0;
    this.container.y = options.y || 0;

    this.plain = options.plainTexture || PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUmPj/PwAFGgKplHdb/wAAAABJRU5ErkJggg==');
    this.hover = options.hoverTexture || PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNs3/fxPwAHQQM3YEwWdQAAAABJRU5ErkJggg==');
    this.click = options.clickTexture || PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUS137HwAD6gIpM6FI4wAAAABJRU5ErkJggg==');

    this.sprite = new PIXI.Sprite(this.plain);
    this.sprite.buttonMode = true;
    this.sprite.interactive = true;
    this.sprite.anchor.set(0.5);
    this.sprite.width = options.width || 10;
    this.sprite.height = options.height || 10;

    this.sprite
      .on('pointerdown', this.onDown.bind(this))
      .on('pointerup', this.onUp.bind(this))
      .on('pointerupoutside', this.onUp.bind(this))
      .on('pointerover', this.onHover.bind(this))
      .on('pointerout', this.onUnhover.bind(this));

    var style = new PIXI.TextStyle({
      fontSize: 16,
      fill: '#ffffff',
      fontWeight: '100',
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 2,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 1
    });
    this.text = new PIXI.Text(options.text || '', style);
    this.text.anchor.set(0.5);
    this.text.x = this.sprite.x;
    this.text.y = this.sprite.y;

    this.container.addChild(this.sprite, this.text);
  }

  get init() {
    return this.container;
  }

  get x() {
    return this.container.x;
  }

  set x(x) {
    this.container.x = x;
  }

  get y() {
    return this.container.y;
  }

  set y(y) {
    this.container.y = y;
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

  reset() {
    this.isDown = false;
    this.sprite.texture = this.plain;
  }

  onDown() {
    this.isDown = true;
    this.sprite.texture = this.click;
    this.callback();
  }

  onUp() {
    this.isDown = false;
    if (this.isHover) {
      this.sprite.texture = this.hover;
    } else {
      this.sprite.texture = this.plain;
    }
  }

  onHover() {
    this.isHover = true;
    if (this.isDown) {
      return;
    }
    this.sprite.texture = this.hover;
  }

  onUnhover() {
    this.isHover = false;
    if (this.isDown) {
      return;
    }
    this.sprite.texture = this.plain;
  }
}
