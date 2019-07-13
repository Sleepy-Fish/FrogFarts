import * as PIXI from 'pixi.js';
import State from './state';
import { Menu } from '../ui';

export default class MenuState extends State {
  constructor(app) {
    super(app);
    this.menuText = new PIXI.Text('Menu');
    this.menuText.style.fill = 0x00ff00;
    this.menuText.x = 50;
    this.menuText.y = 50;

    this.menu = new Menu(this.scene, [
      {
        label: 'Play',
        callback: () => {
          window.changeState('game');
        }
      },
      {
        label: 'Options',
        callback: () => {
          window.changeState('options');
        }
      },
      {
        label: 'Credits',
        callback: () => {
          alert('Ya Bois Caleb n Riley');
        }
      }
    ], {
      buttonHeight: 30,
      buttonGutter: 30
    });

    this.scene.addChild(this.menuText);
  }

  resize(width, height) {
    super.resize(width, height);
    this.menu.resize(width, height);
  }

  run(delta) {
    super.run(delta);
  }

  activate() {
    super.activate();
  }
}
