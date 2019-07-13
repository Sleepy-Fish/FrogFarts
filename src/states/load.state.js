import * as PIXI from 'pixi.js';
import State from './state';
import C from '../constants.json';

export default class LoadState extends State {
  constructor(app) {
    super(app);
    this.menuText = new PIXI.Text('Loading...');
    this.menuText.style.fill = 0x00ff00;
    this.menuText.x = 50;
    this.menuText.y = 50;
    this.scene.addChild(this.menuText);
  }

  run(delta) {
    super.run(delta);
  }

  activate() {
    super.activate();
  }

  loadAssets() {
    return new Promise((resolve) => {
      PIXI.Loader.shared
        .add('playerCharge', './assets/player-charge.json', true)
        .add('playerFly', './assets/player-fly.json', true)
        .add('playerIdle', './assets/player-idle.json', true)
        .add('playerSquat', './assets/player-squat.json', true)
        .load((loader, resources) => {
          resolve(resources);
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
    });
  }

  buildPlayerCharge(resources) {
    const result = [];
    for (const frame in resources.playerCharge.spritesheet.textures) {
      result.push({
        texture: resources.playerCharge.spritesheet.textures[frame],
        time: C.ANIMATION_TIME
      });
    }
    const animation = new PIXI.AnimatedSprite(result);
    return animation;
  }
}
