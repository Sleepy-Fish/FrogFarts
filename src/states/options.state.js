import * as PIXI from 'pixi.js';
import State from './state';

export default class GameState extends State {
  constructor(app) {
    super(app);
    this.gameText = new PIXI.Text('Options');
    this.gameText.style.fill = 0x00ffff;
    this.gameText.x = 50;
    this.gameText.y = 50;

    this.scene.addChild(this.gameText);
  }

  run(delta) {
    super.run(delta);
  }

  activate() {
    super.activate();
  }
}
