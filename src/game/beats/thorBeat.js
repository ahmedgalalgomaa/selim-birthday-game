import { BEATS } from '../../config.js';
import { TapCatchEngine } from '../engine.js';
import { createHud, updateProgressBar } from '../../ui/hud.js';
import { createMuteButton } from '../../ui/hud.js';
import { audio } from '../../audio.js';

export function runThorBeat(app, onComplete) {
  return runCatchBeat(app, BEATS.thor, 'catch-thor', onComplete);
}

export function runFlashBeat(app, onComplete) {
  return runCatchBeat(app, BEATS.flash, 'catch-speed', onComplete);
}

function runCatchBeat(app, config, soundType, onComplete) {
  app.innerHTML = '';

  const screen = document.createElement('div');
  screen.className = `screen screen--game screen--${config.id}`;

  const mute = createMuteButton();
  const { hud, progress } = createHud(config);

  const arena = document.createElement('div');
  arena.className = 'game-arena';
  arena.setAttribute('role', 'application');
  arena.setAttribute('aria-label', config.title);

  screen.append(mute, hud, arena);
  app.appendChild(screen);

  const engine = new TapCatchEngine(arena, config, {
    onProgress: (current, total) => updateProgressBar(progress, current, total),
    onCatch: () => audio.play(soundType),
    onComplete: () => {
      audio.play('beat-complete');
      onComplete();
    },
  });

  requestAnimationFrame(() => engine.start());

  return () => engine.stop();
}
