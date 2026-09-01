import { audio } from '../audio.js';
import { createMuteButton } from './hud.js';

export function renderSplash(app, onStart) {
  app.innerHTML = '';

  const screen = document.createElement('div');
  screen.className = 'screen screen--splash';

  const mute = createMuteButton();

  screen.innerHTML = `
    <div class="splash__stars" aria-hidden="true"></div>
    <div class="splash__content">
      <p class="splash__eyebrow">Birthday Mission</p>
      <h1 class="splash__title">Super Selim's<br><span>Power Quest</span></h1>
      <p class="splash__tagline">Help Selim unlock Thor &amp; Flash powers!</p>
      <button type="button" class="btn btn--hero splash__start">Tap to Start</button>
    </div>
    <div class="splash__hero-glow" aria-hidden="true"></div>
  `;

  screen.prepend(mute);

  const startBtn = screen.querySelector('.splash__start');
  startBtn.addEventListener('click', () => {
    audio.unlock();
    audio.play('tap');
    onStart();
  });

  app.appendChild(screen);
}
