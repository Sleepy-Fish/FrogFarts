import * as PIXI from 'pixi.js';
import { Button } from '../ui';

export default class State {
  constructor(app) {
    this.app = app;
    this.active = false;
    this.scene = new PIXI.Container();
    this.scene.visible = false;
    this.fpsText = new PIXI.Text(Math.round(app.ticker.FPS));
    this.fpsText.style.fill = 0xff0000;
    this.fpsText.x = 10;
    this.fpsText.y = 10;

    this.backButton = new Button({
      text: 'Menu',
      width: 70,
      height: 30
    }, () => {
      window.changeState('menu');
    });

    app.stage.addChild(this.scene);
    this.scene.addChild(this.fpsText, this.backButton.init);
  }

  run(delta) {
  }

  resize(width, height) {
    this.backButton.x = width - (this.backButton.width / 2);
    this.backButton.y = 0 + (this.backButton.height / 2);
  }

  activate() {
    this.active = true;
    this.scene.visible = true;
  }

  deactivate() {
    this.active = false;
    this.scene.visible = false;
  }
}
