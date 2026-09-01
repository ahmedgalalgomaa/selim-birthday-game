import { audio } from '../audio.js';
import { iconMarkup } from './icons.js';

export function createMuteButton() {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'mute-btn';
  btn.setAttribute('aria-label', 'Toggle sound');
  btn.innerHTML = audio.isMuted()
    ? '<span aria-hidden="true">🔇</span>'
    : '<span aria-hidden="true">🔊</span>';

  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    const muted = audio.toggleMute();
    btn.innerHTML = muted
      ? '<span aria-hidden="true">🔇</span>'
      : '<span aria-hidden="true">🔊</span>';
  });

  return btn;
}

export function createProgressBar() {
  const wrap = document.createElement('div');
  wrap.className = 'hud-progress';
  wrap.innerHTML = `
    <div class="hud-progress__label">Power Meter</div>
    <div class="hud-progress__track">
      <div class="hud-progress__fill" style="width: 0%"></div>
    </div>
    <div class="hud-progress__count">0 / 8</div>
  `;
  return wrap;
}

export function updateProgressBar(bar, current, total) {
  const fill = bar.querySelector('.hud-progress__fill');
  const count = bar.querySelector('.hud-progress__count');
  const pct = Math.min(100, (current / total) * 100);
  fill.style.width = `${pct}%`;
  count.textContent = `${current} / ${total}`;
}

export function createHud(config) {
  const hud = document.createElement('div');
  hud.className = 'hud';

  const mentor = document.createElement('div');
  mentor.className = `hud-mentor hud-mentor--${config.id}`;
  mentor.innerHTML = `
    <div class="hud-mentor__icon-wrap">${iconMarkup(config, 'hud-mentor__icon')}</div>
    <div class="hud-mentor__label">${config.mentorLabel}</div>
  `;

  const titles = document.createElement('div');
  titles.className = 'hud-titles';
  titles.innerHTML = `
    <h2 class="hud-titles__main">${config.title}</h2>
    <p class="hud-titles__sub">${config.subtitle}</p>
  `;

  const progress = createProgressBar();

  hud.append(mentor, titles, progress);
  return { hud, progress };
}
