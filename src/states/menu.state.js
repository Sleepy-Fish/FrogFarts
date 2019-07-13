import * as PIXI from 'pixi.js';
import State from './state';

export default class MenuState extends State {
  constructor(app) {
    super(app);
    this.menuText = new PIXI.Text('Menu');
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
}
