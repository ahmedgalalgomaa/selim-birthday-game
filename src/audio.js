const STORAGE_KEY = 'selim-game-muted';

class AudioManager {
  constructor() {
    this.muted = sessionStorage.getItem(STORAGE_KEY) === 'true';
    this.ctx = null;
    this.unlocked = false;
  }

  isMuted() {
    return this.muted;
  }

  unlock() {
    if (this.unlocked) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.unlocked = true;
  }

  toggleMute() {
    this.muted = !this.muted;
    sessionStorage.setItem(STORAGE_KEY, String(this.muted));
    return this.muted;
  }

  play(type) {
    if (this.muted || !this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    switch (type) {
      case 'catch-thor':
        this.#zap(880, 0.12);
        break;
      case 'catch-speed':
        this.#whoosh(520, 0.1);
        break;
      case 'beat-complete':
        this.#cheer();
        break;
      case 'transform':
        this.#powerUp();
        break;
      case 'victory':
        this.#victoryJingle();
        break;
      case 'tap':
        this.#zap(440, 0.05);
        break;
      default:
        break;
    }
  }

  #zap(freq, duration) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + duration);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  }

  #whoosh(freq, duration) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq * 2, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + duration);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  }

  #cheer() {
    [523, 659, 784].forEach((freq, i) => {
      setTimeout(() => this.#zap(freq, 0.15), i * 80);
    });
  }

  #powerUp() {
    const t = this.ctx.currentTime;
    [220, 330, 440, 660].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = t + i * 0.12;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.25);
    });
  }

  #victoryJingle() {
    const notes = [523, 523, 659, 784, 784, 659, 523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.#zap(freq, 0.2), i * 150);
    });
  }
}

export const audio = new AudioManager();
