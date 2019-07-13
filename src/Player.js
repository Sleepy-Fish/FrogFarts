import * as PIXI from 'pixi.js';
// import playerCharge from './assets/player-charge.json';
export default class Player {
  constructor(app) {
    // this.sprite = PIXI.Sprite.from();
    this.app = app;
  }

  initSprite() {
    // center the sprite's anchor point
    this.sprite.anchor.set(0.5);

    // move the sprite to the center of the screen
    this.sprite.x = this.app.screen.width / 2;
    this.sprite.y = this.app.screen.height / 2;

    this.app.stage.addChild(this.sprite);

    // Listen for animate update
    this.app.ticker.add((delta) => {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      this.sprite.rotation += 0.1 * delta;
    });
  }

  async loadSpriteSheet() {
    PIXI.Loader.shared
      .add('playerCharge', './assets/player-charge.json')
      .load((loader, resources) => {
        console.log(resources);
        const result = Object.keys(resources.playerCharge.spritesheet.textures).map(function(key) {
          return resources.playerCharge.spritesheet.textures[key];
        });
        console.log(result);
        const animation = new PIXI.AnimatedSprite(result);
        console.log(animation);
        this.app.stage.addChild(animation);
        animation.loop = true;
        animation.play();
        animation.scale.x = 5;
        animation.scale.y = 5;
      });
  }
}
