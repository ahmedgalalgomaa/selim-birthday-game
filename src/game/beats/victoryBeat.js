import { SELIM_HERO_SRC } from '../../config.js';
import { audio } from '../../audio.js';
import { createMuteButton } from '../../ui/hud.js';
import { startConfetti, stopConfetti } from '../../confetti.js';

export function runVictoryBeat(app, onReplay) {
  app.innerHTML = '';
  stopConfetti();

  const screen = document.createElement('div');
  screen.className = 'screen screen--victory';

  const mute = createMuteButton();

  screen.innerHTML = `
    <div class="victory__content">
      <p class="victory__eyebrow">Mission Complete!</p>
      <h1 class="victory__title">Happy Birthday<br><span>Selim!</span></h1>
      <div class="victory__hero-wrap">
        <img class="victory__hero" src="${SELIM_HERO_SRC}" alt="Super Selim celebrating" />
      </div>
      <p class="victory__message">You helped Super Selim save the day!</p>
      <button type="button" class="btn btn--hero victory__replay">Play Again</button>
    </div>
  `;

  screen.prepend(mute);
  app.appendChild(screen);

  startConfetti();
  audio.play('victory');

  screen.querySelector('.victory__replay').addEventListener('click', () => {
    stopConfetti();
    audio.play('tap');
    onReplay();
  });
}
