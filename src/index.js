import * as PIXI from 'pixi.js';
import MenuState from './states/menu.state';
import GameState from './states/game.state';
import LoadState from './states/load.state.js';
import C from './constants.json';

const app = new PIXI.Application({
  autoResize: true,
  resolution: devicePixelRatio
});
document.body.appendChild(app.view);

let CurrentState = null;
const states = {
  menu: new MenuState(app),
  game: new GameState(app),
  loader: new LoadState(app)
};

window.changeState = function(state) {
  for (const key in states) {
    states[key].deactivate();
  }
  states[state].activate();
  CurrentState = states[state];
};
window.changeState('game');
states.loader.loadAssets().then(() => {
  function resize() {
    const rendererWidth = Math.min(window.innerWidth, C.MAX_WIDTH);
    app.renderer.resize(rendererWidth, window.innerHeight);
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.left = (window.innerWidth / 2) - (rendererWidth / 2) + 'px';
  }
  window.addEventListener('resize', resize);
  resize();

  function loop(delta) {
    CurrentState.run(delta);
  }

  app.ticker.add(delta => loop(delta));
});
