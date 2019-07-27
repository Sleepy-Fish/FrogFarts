import C from '../constants.json';
import Entity from './Entity.js';
import EntityAnimation from './EntityAnimation.js';

export default class Enemy extends Entity {
  constructor(scene, options = {}) {
    super(scene, options);
    if (!this.NAME) this.NAME = 'ENEMY';
    this.animation = new EntityAnimation(this, C.ANIMATIONS[this.NAME]);
    this.solid = true;
  }

  get sprite() {
    return this.animation;
  }

  get collider() {
    return this.animation.sprite;
  }
}
