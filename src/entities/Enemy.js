import * as PIXI from 'pixi.js';
import LivingEntity from './LivingEntity.js';

export default class Enemy extends LivingEntity {
  constructor(scene, options = {}) {
    super(scene, options);
    console.log(options);
    this.NAME = 'ENEMY';
    this.moveTo(); // presets x and y before making sprite
    this.sprite = new PIXI.Sprite(PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABgCAYAAACtxXToAAABuUlEQVR4nO2byXaDMAxF3b/vF3dLV+0JRvIUDQTfew6LEKwnvTjEAykFAADgUzmUYwtaxYYZkeX6iKZbXlrRUWbMaJjmMlqgpwmzsc0NmLnWUvxk/vfXjxhbOG+WQ1dceM/ShFOcCQMubd9OYMIAM/E6TiuHXluTBCbbWSTwToxUA6wSUI08SjleDyf9a5Ba2DuB8mKCpiecM70ZX8SUi6QkXHLQ9J20l90MNaC61nw8MjsK8xoPROs2RaJnZJnaAAAAAAAAALuz7Vy8VWzWgkgYo4JeSUn6oUbMrgdG6rsbMRvcI5nR3udiQjOo58bkQjx/A+qCAwxYWZL3Ex804K+tu76TrkkwKwNORPdANZC2UWmYxFB3DjdAKlwxwsKALhE34aN6IQYXTAgxwKGtWUCrr0CzFyofiIsBWYOh/1hSwVEG1MmE/hQNanrqiwLRs8Je3PBZojQ99RbXNEMLBwAAAAAAAAAA2Iwt1+JaBT/akJWCHmXCaiHPMyDjv/vZnLryggEfb8LQoynOj8ikkrm/fwu6+/LRe/TRiAYoF+5hQHD7W3Cr53Qy6A1vt9mvf3yBAAAAALALv72urO7ycxAxAAAAAElFTkSuQmCC'));
  }
}
