import * as PIXI from 'pixi.js';

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
    app.stage.addChild(this.scene);
    this.scene.addChild(this.fpsText);
  }

  run(delta) {
  }

  resize(width, height) {

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
