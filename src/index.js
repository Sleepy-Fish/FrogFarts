import * as PIXI from 'pixi.js';
// Create a Pixi Application
const app = new PIXI.Application({ width: 256, height: 256 });

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
