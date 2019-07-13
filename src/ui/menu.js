import Button from './Button';

export default class Menu {
  constructor(container, buttonActions = [], options = {}) {
    this.buttons = [];
    this.buttonWidth = options.buttonWidth || 200;
    this.buttonHeight = options.buttonHeight || 50;
    this.buttonGutter = options.buttonGutter || 10;
    this.xPositioning = options.xPositioning || 0.5;
    this.yPositioning = options.yPositioning || 0.2;

    for (const [i, buttonAction] of buttonActions.entries()) {
      if (typeof (buttonAction.callback) === 'function') {
        this.buttons.push(
          new Button({
            text: buttonAction.label,
            x: Math.round(window.innerWidth * this.xPositioning),
            y: Math.round(window.innerWidth * this.yPositioning) + ((this.buttonHeight + this.buttonGutter) * i),
            width: this.buttonWidth,
            height: this.buttonHeight
          }, buttonAction.callback)
        );
      }
    }
    for (const button of this.buttons) {
      container.addChild(button.init);
    }
    window.addEventListener('resize', () => {
      for (const [i, button] of this.buttons.entries()) {
        button.x = Math.round(window.innerWidth * this.xPositioning);
        button.y = Math.round(window.innerHeight * this.yPositioning) + ((this.buttonHeight + this.buttonGutter) * i);
      }
    });
  }

  resize(width, height) {
    for (const [i, button] of this.buttons.entries()) {
      button.x = Math.round(width * this.xPositioning);
      button.y = Math.round(height * this.yPositioning) + ((this.buttonHeight + this.buttonGutter) * i);
    }
  }

  reset() {
    for (const button of this.buttons) {
      button.reset();
    }
  }
}
