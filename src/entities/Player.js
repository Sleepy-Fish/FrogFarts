import * as PIXI from 'pixi.js';
import C from '../constants.json';

export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.loadSpriteSheet();
  }

  async loadSpriteSheet() {
    PIXI.Loader.shared
      .add('playerCharge', './assets/player-charge.json', true)
      .load((loader, resources) => {
        const result = [];
        for (const frame in resources.playerCharge.spritesheet.textures) {
          result.push({
            texture: resources.playerCharge.spritesheet.textures[frame],
            time: C.ANIMATION_TIME
          });
        }
        const animation = new PIXI.AnimatedSprite(result);
        this.scene.addChild(animation);
        animation.loop = true;
        animation.play();
        animation.scale.x = 5;
        animation.scale.y = 5;
        animation.x = 200;
      });
  }
}
