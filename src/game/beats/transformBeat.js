import { SELIM_HERO_SRC, SKIP_QUESTS } from '../../config.js';
import { audio } from '../../audio.js';
import { createMuteButton } from '../../ui/hud.js';
import {
  getFinaleBackdropMarkup,
  getFinaleOrbitMarkup,
  getFinaleNumberMarkup,
  getFinaleInviteMarkup,
  bindInvitationReplay,
} from './invitationBeat.js';
import { startConfetti, stopConfetti } from '../../confetti.js';

export function runTransformBeat(app, onReplay) {
  app.innerHTML = '';
  stopConfetti();

  const screen = document.createElement('div');
  screen.className = `screen screen--transform screen--finale${
    SKIP_QUESTS ? ' finale--revealed' : ''
  }`;

  const mute = createMuteButton();

  screen.innerHTML = `
    <div class="finale__scroll">
      <div class="transform__content">
        ${getFinaleBackdropMarkup()}
        <div class="finale__stage">
          ${getFinaleOrbitMarkup()}
          ${getFinaleNumberMarkup()}
          <div class="transform__hero-wrap">
            <div class="transform__burst" aria-hidden="true"></div>
            <div class="transform__ring transform__ring--1" aria-hidden="true"></div>
            <div class="transform__ring transform__ring--2" aria-hidden="true"></div>
            <img class="transform__hero" src="${SELIM_HERO_SRC}" alt="Super Selim" />
            <div class="transform__particles" aria-hidden="true"></div>
          </div>
        </div>
        <h2 class="transform__title">Super Selim!</h2>
        <p class="transform__subtitle">Thunder + Flash = Unstoppable!</p>
        ${getFinaleInviteMarkup()}
      </div>
    </div>
  `;

  screen.prepend(mute);
  app.appendChild(screen);

  bindInvitationReplay(screen, () => {
    stopConfetti();
    audio.play('tap');
    onReplay();
  });

  const revealInvitation = () => {
    screen.classList.add('finale--revealed');
    startConfetti();
    audio.play('victory');
  };

  if (SKIP_QUESTS) {
    audio.unlock();
    startConfetti();
    audio.play('victory');
  } else {
    audio.play('transform');
    setTimeout(revealInvitation, 2600);
  }
}
