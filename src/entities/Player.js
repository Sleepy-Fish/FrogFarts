import C from '../constants.json';
import { Controller } from '../input';
import Entity from './Entity.js';
import EntityAnimation from './EntityAnimation.js';

export default class Player extends Entity {
  constructor(scene, options = {}) {
    super(scene, options);
    if (!this.NAME) this.NAME = 'PLAYER';
    this.physical = true;
    this.interactive = true;
    this.static = false;
    this.animation = new EntityAnimation(this, C.ANIMATIONS[this.NAME]);
    this.charge = 0;
    this.controller = new Controller({
      spacebar: 32,
      left: 65,
      right: 68
    }, 'spacebar');
    this.controller.onHold('spacebar', this.chargeJump.bind(this));
    this.controller.onPress('left', () => {
      this.velocity.x = -4;
    });
    this.controller.onRelease('left', () => {
      if (this.velocity < 0) this.velocity.x = 0;
    });
    this.controller.onPress('right', () => {
      this.velocity.x = 4;
    });
    this.controller.onRelease('right', () => {
      if (this.velocity > 0) this.velocity.x = 0;
    });
    this.controller.onRelease('spacebar', this.releaseJump.bind(this));

    this.collisions['PLATFORM'] = (self, other, edge) => {
      if (edge === 'bottom') {
        self.stop(self.x, other.top - self.height / 2);
        if (self.charge === 0) self.animation.setState('playerIdle', true);
      }
    };
    this.collisions['ENEMY'] = (self, other, edge) => {
      if (edge === 'bottom') {
        self.velocity.y = 5;
      }
    };
  }

  /**
   * Game loop function, called in state instance on all entities
   * Overridden to include controller run function in loop
   * @param {number} delta - milliseconds since last tick
   */
  run(delta) {
    super.run(delta);
    this.controller.run(delta);
  }

  get sprite() {
    return this.animation;
  }

  get collider() {
    return this.animation.sprite;
  }

  activate() {
    super.activate();
    this.controller.activate();
  }

  deactivate() {
    super.deactivate();
    this.controller.deactivate();
  }

  chargeJump() {
    if (this.charge === 0) {
      this.charging = true;
      this.animation.setState('playerSquat', false).onComplete = () => {
        if (this.charging) {
          this.animation.setState('playerCharge');
        }
      };
    }
    this.charge += C.CHARGE_STRENGTH;
    this.charge = Math.min(this.charge, C.MAX_CHARGE);
  }

  releaseJump() {
    this.charging = false;
    this.animation.setState('playerFly');
    this.velocity.y = this.charge;
    this.moveTo(this.x, this.y - 20);
    this.charge = 0;
    this.static = false;
  }
}
