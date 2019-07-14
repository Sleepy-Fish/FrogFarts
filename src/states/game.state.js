import * as PIXI from 'pixi.js';
import State from './state';
import Player from '../entities/Player';

export default class GameState extends State {
  constructor(app) {
    super(app);
    this.gameText = new PIXI.Text('Game');
    this.gameText.style.fill = 0x0000ff;
    this.gameText.x = 50;
    this.gameText.y = 50;

    this.player = new Player(this.scene);
    this.scene.addChild(this.gameText);
  }

  run(delta) {
    super.run(delta);
    this.player.run(delta);
  }

  activate() {
    super.activate();
    this.player.generateAnimations();
    this.player.startAnimation('playerIdle');
    this.scene.addChild(this.player.sprite);
    this.player.moveTo(200, 200);
  }
}
