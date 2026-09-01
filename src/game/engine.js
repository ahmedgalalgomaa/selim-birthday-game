import { iconMarkup } from '../ui/icons.js';

const HIT_PADDING = 20;
const ITEM_SIZE = 64;

export class TapCatchEngine {
  constructor(container, config, callbacks) {
    this.container = container;
    this.config = config;
    this.onProgress = callbacks.onProgress;
    this.onCatch = callbacks.onCatch;
    this.onComplete = callbacks.onComplete;
    this.caught = 0;
    this.items = [];
    this.running = false;
    this.spawnTimer = null;
    this.animationFrame = null;
    this.lastTime = 0;
  }

  start() {
    this.caught = 0;
    this.items = [];
    this.running = true;
    this.lastTime = performance.now();
    this.container.querySelectorAll('.catch-item').forEach((el) => el.remove());
    this.spawnTimer = setInterval(() => this.#spawnItem(), this.config.spawnInterval);
    this.#loop(this.lastTime);
  }

  stop() {
    this.running = false;
    if (this.spawnTimer) {
      clearInterval(this.spawnTimer);
      this.spawnTimer = null;
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.items.forEach((item) => item.el.remove());
    this.items = [];
  }

  #spawnItem() {
    if (!this.running || this.caught >= this.config.targetCount) return;

    const el = document.createElement('button');
    el.type = 'button';
    el.className = `catch-item ${this.config.itemClass}`;
    el.setAttribute('aria-label', 'Catch');
    el.innerHTML = iconMarkup(this.config, 'catch-item__icon');

    const maxX = Math.max(20, this.container.clientWidth - ITEM_SIZE - 20);
    const x = 10 + Math.random() * maxX;

    el.style.left = `${x}px`;
    el.style.top = '-80px';

    const item = {
      el,
      x,
      y: -80,
      speed: this.config.fallSpeed,
      caught: false,
      removed: false,
    };

    el.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.#catchItem(item);
    });

    this.container.appendChild(el);
    this.items.push(item);
  }

  #catchItem(item) {
    if (!this.running || item.caught || item.removed) return;

    item.caught = true;
    item.el.classList.add('catch-item--caught');
    this.caught += 1;
    this.onCatch?.(this.config);
    this.onProgress(this.caught, this.config.targetCount);

    setTimeout(() => {
      item.el.remove();
      item.removed = true;
    }, 250);

    if (this.caught >= this.config.targetCount) {
      this.running = false;
      if (this.spawnTimer) {
        clearInterval(this.spawnTimer);
        this.spawnTimer = null;
      }
      setTimeout(() => {
        this.stop();
        this.onComplete();
      }, 400);
    }
  }

  #loop(timestamp) {
    if (!this.running) return;

    const delta = Math.min(32, timestamp - this.lastTime);
    this.lastTime = timestamp;

    this.items.forEach((item) => {
      if (item.caught || item.removed) return;

      item.y += (item.speed * delta) / 16;
      item.el.style.transform = `translate3d(0, ${item.y}px, 0)`;

      if (item.y > this.container.clientHeight + 80) {
        item.el.remove();
        item.removed = true;
      }
    });

    this.items = this.items.filter((item) => !item.removed);
    this.animationFrame = requestAnimationFrame((t) => this.#loop(t));
  }

  static hitTest(itemEl, pointerX, pointerY) {
    const rect = itemEl.getBoundingClientRect();
    return (
      pointerX >= rect.left - HIT_PADDING &&
      pointerX <= rect.right + HIT_PADDING &&
      pointerY >= rect.top - HIT_PADDING &&
      pointerY <= rect.bottom + HIT_PADDING
    );
  }
}
