import * as PIXI from 'pixi.js';
import State from './state';
import C from '../constants.json';

export default class LoadState extends State {
  constructor(app) {
    super(app);
    this.menuText = new PIXI.Text('Loading...');
    this.menuText.style.fill = 0xffffff;
    this.menuText.x = 100;
    this.menuText.y = 100;
    this.scene.addChild(this.menuText);
    this.loadedAssets = 0;
    // JSON Assets load first their JSON, then their encoded image
    this.assetsToLoad = 4 * 2;
    this.expectedLoadedAssets = 4 * 2;
  }

  run(delta) {
    super.run(delta);
  }

  activate() {
    super.activate();
  }

  loadAssets() {
    PIXI.Loader.shared.onLoad.add(this.onProgress.bind(this));
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

  onProgress() {
    this.loadedAssets++;
    this.assetsToLoad--;
    const loadPercent = (this.loadedAssets / this.expectedLoadedAssets) * 100;
    this.updateText(loadPercent);
  }

  updateText(loadPercent) {
    this.menuText.text = loadPercent;
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
