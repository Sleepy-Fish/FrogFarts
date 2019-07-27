export default class Entity {
  constructor(scene) {
    this.scene = scene;
    this.collisions = {};
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    this.NAME = null;
  }

  run(delta) {
    // Do nothing
  }

  collide(other) {
    if (other.NAME && typeof this.collisions[other.NAME] === 'function') this.collisions[other.NAME](this, other);
  }

  get x() {
    if (this.sprite) return this.sprite.x;
    return this._x;
  }

  set x(x) {
    this._x = x;
    if (this.sprite) this.sprite.x = this._x;
  }

  get y() {
    if (this.sprite) return this.sprite.y;
    return this._y;
  }

  set y(y) {
    this._y = y;
    if (this.sprite) this.sprite.y = this._y;
  }

  get width() {
    if (this.sprite) return this.sprite.width;
    return this._width;
  }

  set width(w) {
    this._width = w;
    if (this.sprite) this.sprite.width = this._width;
  }

  get height() {
    if (this.sprite) return this.sprite.height;
    return this._height;
  }

  set height(h) {
    this._height = h;
    if (this.sprite) this.sprite.height = this._height;
  }

  get top() {
    return this.y - (this.height / 2);
  }

  get bottom() {
    return this.y + (this.height / 2);
  }

  get left() {
    return this.x - (this.width / 2);
  }

  get right() {
    return this.x + (this.width / 2);
  }

  /**
   * Moves entityto the given coordinates.
   * @param {number} x - x coordinate.
   * @param {number} y - y coordinate.
   */
  moveTo(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
    if (this.sprite) {
      this.sprite.x = x;
      this.sprite.y = y;
    }
  }
}
