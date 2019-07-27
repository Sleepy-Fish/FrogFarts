import * as PIXI from 'pixi.js';
import { MenuState, GameState, OptionsState, LoadState } from './states';
import C from './constants.json';
import { Bump } from './vendor';
window.bump = new Bump(PIXI);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
  autoResize: true,
  resolution: devicePixelRatio
});
document.body.appendChild(app.view);

window.changeState = function(state) {
  for (const key in states) {
    states[key].deactivate();
  }
  states[state].activate();
  CurrentState = states[state];
  resize();
};

function resize() {
  const rendererWidth = Math.min(window.innerWidth, C.MAX_WIDTH);
  app.renderer.resize(rendererWidth, window.innerHeight);
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.left = (window.innerWidth / 2) - (rendererWidth / 2) + 'px';
  CurrentState.resize(rendererWidth, window.innerHeight);
}
window.addEventListener('resize', resize);

let CurrentState = null;
const states = {
  load: new LoadState(app)
};
window.changeState('load');

function loop(delta) {
  CurrentState.run(delta);
}

states.load.loadAssets().then(() => {
  // load menu state
  states.menu = new MenuState(app);
  window.changeState('menu');
  // start game loop
  app.ticker.add(delta => loop(delta));
  // load rest of states
  states.game = new GameState(app);
  states.options = new OptionsState(app);
});
