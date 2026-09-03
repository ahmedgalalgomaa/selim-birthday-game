import './styles/main.css';
import './styles/effects.css';
import './styles/invitation.css';
import { SKIP_QUESTS } from './config.js';
import { renderSplash } from './ui/splash.js';
import { runThorBeat } from './game/beats/thorBeat.js';
import { runFlashBeat } from './game/beats/flashBeat.js';
import { runTransformBeat } from './game/beats/transformBeat.js';
import { stopConfetti } from './confetti.js';

const app = document.getElementById('app');

const flow = ['splash', 'thor', 'flash', 'transform'];
const transformStep = flow.indexOf('transform');
let step = 0;
let cleanup = null;

function startStep() {
  return SKIP_QUESTS ? transformStep : 0;
}

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
      runTransformBeat(app, () => goTo(startStep()));
      break;
    default:
      break;
  }
}

goTo(startStep());
