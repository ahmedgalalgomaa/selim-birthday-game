import { SELIM_HERO_SRC } from '../../config.js';
import { audio } from '../../audio.js';
import { createMuteButton } from '../../ui/hud.js';

export function runTransformBeat(app, onComplete) {
  app.innerHTML = '';

  const screen = document.createElement('div');
  screen.className = 'screen screen--transform';

  const mute = createMuteButton();

  screen.innerHTML = `
    <div class="transform__burst" aria-hidden="true"></div>
    <div class="transform__content">
      <p class="transform__label">Power Unlocked!</p>
      <div class="transform__hero-wrap">
        <div class="transform__ring transform__ring--1" aria-hidden="true"></div>
        <div class="transform__ring transform__ring--2" aria-hidden="true"></div>
        <img class="transform__hero" src="${SELIM_HERO_SRC}" alt="Super Selim" />
        <div class="transform__particles" aria-hidden="true"></div>
      </div>
      <h2 class="transform__title">Super Selim!</h2>
      <p class="transform__subtitle">Thunder + Flash = Unstoppable!</p>
    </div>
  `;

  screen.prepend(mute);
  app.appendChild(screen);

  audio.play('transform');

  setTimeout(onComplete, 4500);
}
