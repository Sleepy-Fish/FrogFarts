import C from '../constants.json';

export default class Entity {
  constructor(scene, options = {}) {
    this.scene = scene;

    // Used for identying entity
    // can be overridden by passing to options for unique ID but other wise uses generic "ENEMEY", "PLATFORM", etc.
    this.NAME = options.name || null;

    // Entity Dimensions
    // Uses local variables until sprite or animation is attached, then uses sprites dimensions
    this._x = options.x || 0;
    this._y = options.y || 0;
    this._width = options.width || 0;
    this._height = options.height || 0;

    // Entity Physical Properties
    this.collisions = {}; // key<entity.NAME>: value<function(self(Entity), other(Entity), edge(string))> (Set by game state)
    this.cLocks = {}; // key<entity.NAME>: value<boolean(collision locked for cooldown)>
    this.velocity = { x: 0, y: 0 }; // Gets applied to entity position every game loop tick
    this.static = true; // Does not calculate velocity or change in position on game loop tick if true
    this.physical = false; // Entity can be effected by global physics like gravity if true
    this.interactive = false; // Entity can collide with solid entities if true
    this.solid = false; // Entity can be collided with if true
  }

  /**
   * Game loop function, called in state instance on all entities
   * @param {number} delta - milliseconds since last tick
   */
  run(delta) {
    if (!this.static) this.moveTo(this.x += this.velocity.x, this.y -= this.velocity.y);
  }

  // Object to pass to Bump.js hit method
  get collider() {
    return this.sprite;
  }

  /**
   * Sets or resets a cooldown on this collision type
   * Its used to give a little leeway to an imperfect collision system so we don't get stuck in a loop
   * @param {string} name - name of entity to lock collisions for
   */
  cLock(name) {
    if (this.cLocks[name]) clearTimeout(this.cLocks[name]);
    this.cLocks[name] = setTimeout(() => {
      this.cLocks[name] = false;
    }, C.COLLISION_LOCK);
  }

  /**
   * Call stored collide function (if there is one) when Bump.js detects a collision
   * @param {Entity} other - Entity that this entity is colliding with
   * @param {string} edge - 'top', 'bottom', 'left', or 'right' - the edge that experienced a collision
   */
  collide(other, edge) {
    if (other.NAME && typeof this.collisions[other.NAME] === 'function') this.collisions[other.NAME](this, other, edge);
  }

  activate() {
    // Do nothing
  }

  deactivate() {
    // Do nothing
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

  /**
   * Stops velocity movement of the entity and sticks it at the given coordinates.
   * @param {number} x - x coordinate.
   * @param {number} y - y coordinate.
   */
  stop(x = this.x, y = this.y) {
    if (!this.static) {
      this.static = true;
      this.velocity = { x: 0, y: 0 };
      this.moveTo(x, y);
    }
  }
}
