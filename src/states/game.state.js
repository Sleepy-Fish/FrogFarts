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
    entities.push(new Platform(this.scene, {
      x: 200,
      y: 400,
      width: 160,
      height: 10
    }));
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
    // Handle scrolling if player is approaching vertical margin
    let offset = 0;
    if (this.player.y <= this.app.margin.y) {
      offset += this.app.margin.y - this.player.y;
    } else if (this.player.y >= this.app.height - this.app.margin.y) {
      offset -= this.app.margin.y - (this.app.height - this.player.y);
    }
    // Handle player bounce if approaching horizonal margins (this will change, just temporary fix to falling off screen)
    if (this.player.x <= this.app.margin.x) {
      this.player.velocity.x *= -1;
    } else if (this.player.x >= this.app.width - this.app.margin.x) {
      this.player.velocity.x *= -1;
    }

    // Loop all entities to handle collisions, gravity, and percolating run functions
    for (const entity of entities) {
      if (entity.interactive) { // Only interactive entities can collide with things
        for (const other of entities.filter(e => e.solid && e !== entity)) { // Only solid entities can be collided with
          const edge = window.bump.hit(entity.collider, other.collider, true); // If entities are in contact returns string 'top', 'bottom' 'left' or 'right'
          if (edge) {
            if (!entity.cLocks[other.NAME]) entity.collide(other, edge); // Perform stored collisions logic
            entity.cLock(other.NAME); // Lock the collision with this type of collidee for a short time so we dont get stuck in a loop
          }
        }
      }
      if (entity.physical && !entity.static) { // only physical entities are effected by global physics
        entity.velocity.y += C.GRAVITY;
        entity.velocity.y = Math.max(entity.velocity.y, C.TERMINAL_VELOCITY);
      }
      // all entities get run
      entity.run(delta);
      entity.y += offset;
    }
    offset = null;
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
