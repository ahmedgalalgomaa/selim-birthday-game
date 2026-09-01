import './styles/main.css';
import './styles/effects.css';
import { renderSplash } from './ui/splash.js';
import { runThorBeat } from './game/beats/thorBeat.js';
import { runFlashBeat } from './game/beats/flashBeat.js';
import { runTransformBeat } from './game/beats/transformBeat.js';
import { runVictoryBeat } from './game/beats/victoryBeat.js';
import { stopConfetti } from './confetti.js';

const app = document.getElementById('app');

const flow = ['splash', 'thor', 'flash', 'transform', 'victory'];
let step = 0;
let cleanup = null;

function goTo(index) {
  if (cleanup) {
    cleanup();
    cleanup = null;
  }
  stopConfetti();
  step = index;

  switch (flow[step]) {
    case 'splash':
      renderSplash(app, () => goTo(1));
      break;
    case 'thor':
      cleanup = runThorBeat(app, () => goTo(2));
      break;
    case 'flash':
      cleanup = runFlashBeat(app, () => goTo(3));
      break;
    case 'transform':
      runTransformBeat(app, () => goTo(4));
      break;
    case 'victory':
      runVictoryBeat(app, () => goTo(0));
      break;
    default:
      break;
  }
}

goTo(0);
