import C from '../constants.json';
import * as PIXI from 'pixi.js';
import { Controller } from '../input';
import LivingEntity from './LivingEntity.js';

export default class Player extends LivingEntity {
  constructor(scene, options = {}) {
    super(scene, options);
    this.NAME = 'PLAYER';
    this.physical = true;
    this.interactive = true;
    this.sprite = new PIXI.Sprite(PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkzVT8DwACugGYrNcDjQAAAABJRU5ErkJggg=='));
    this.atRest = false;
    this.charge = 0;
    this.controller = new Controller({
      spacebar: 32,
      left: 65,
      right: 68
    }, 'spacebar');
    this.controller.activate();
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
        if (self.charge === 0) self.startAnimation('playerIdle', true);
      }
    };
  }

  run(delta) {
    super.run(delta);
    this.controller.run(delta);
  }

  chargeJump() {
    if (this.charge === 0) {
      this.charging = true;
      this.startAnimation('playerSquat', false).onComplete = () => {
        if (this.charging) {
          this.startAnimation('playerCharge');
        }
      };
    }
    this.charge += C.CHARGE_STRENGTH;
    this.charge = Math.min(this.charge, C.MAX_CHARGE);
  }

  releaseJump() {
    this.charging = false;
    this.startAnimation('playerFly');
    this.velocity.y = this.charge;
    this.moveTo(this.x, this.y - 20);
    this.charge = 0;
    this.atRest = false;
  }
}
