import * as PIXI from 'pixi.js';
import State from './state';
import { Player, Platform, Enemy } from '../entities';
import C from '../constants.json';
const entities = [];

export default class GameState extends State {
  constructor(app) {
    super(app);
    this.gameText = new PIXI.Text('Game');
    this.gameText.style.fill = 0x0000ff;
    this.gameText.x = 50;
    this.gameText.y = 50;
    this.player = new Player(this.scene, {
      x: 200,
      y: 300
    });
    this.floor = new Platform(this.scene, {
      x: window.innerWidth / 2,
      y: window.innerHeight - 100,
      width: window.innerWidth,
      height: 200
    });
    entities.push(this.player);
    entities.push(this.floor);
    entities.push(new Enemy(this.scene, {
      x: 500,
      y: 200
    }));
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
    // Loop all entities to handle collisions, gravity, and percolating run functions
    for (const entity of entities) {
      if (entity.interactive) { // Only interactive entities can collide with things
        for (const other of entities.filter(e => e.solid && e !== entity)) { // Only solid entities can be collided with
          const edge = window.bump.hit(entity.sprite, other.sprite, true); // If entities are in contact returns string 'top', 'bottom' 'left' or 'right'
          if (edge) entity.collide(other, edge);
        }
      }
      if (entity.physical && !entity.atRest) { // only physical entities are effected by global physics
        entity.velocity.y += C.GRAVITY;
        entity.velocity.y = Math.max(entity.velocity.y, C.TERMINAL_VELOCITY);
      }
      // all entities get run
      entity.run(delta);
    }
  }

  activate() {
    super.activate();
    for (const entity of entities) {
      entity.activate();
    }
  }

  deactivate() {
    super.deactivate();
    for (const entity of entities) {
      entity.deactivate();
    }
  }
}
