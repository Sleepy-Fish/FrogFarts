import * as PIXI from 'pixi.js';
import State from './state';
import { Player, Platform } from '../entities';
import C from '../constants.json';

export default class GameState extends State {
  constructor(app) {
    super(app);
    this.gameText = new PIXI.Text('Game');
    this.gameText.style.fill = 0x0000ff;
    this.gameText.x = 50;
    this.gameText.y = 50;

    this.player = new Player(this.scene);
    this.floor = new Platform(this.scene, {
      x: window.innerWidth / 2,
      y: window.innerHeight - 100,
      width: window.innerWidth,
      height: 200
    });
    this.scene.addChild(this.gameText);
  }

  resize(width, height) {
    super.resize(width, height);
    this.floor.width = width;
    this.floor.x = width / 2;
    this.floor.y = height - 100;
  }

  run(delta) {
    super.run(delta);
    const collision = window.bump.hit(this.player.sprite, this.floor.sprite, true, true, true);
    if (collision === 'bottom') {
      this.player.velocity.y = 0;
      this.player.velocity.x = 0;
      this.player.collide(this.floor);
    } else {
      this.player.velocity.y += C.GRAVITY;
    }
    this.player.velocity.y = Math.max(this.player.velocity.y, C.TERMINAL_VELOCITY);
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
