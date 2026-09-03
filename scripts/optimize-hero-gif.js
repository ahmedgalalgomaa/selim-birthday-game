import { copyFileSync, existsSync, statSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const heroGif = join(root, 'public/assets/selim-hero.gif');
const temp = join(root, 'public/assets/selim-hero.optimized.gif');

if (!existsSync(heroGif)) {
  console.error('Missing public/assets/selim-hero.gif');
  process.exit(1);
}

const before = statSync(heroGif).size;

execFileSync(
  'ffmpeg',
  [
    '-y',
    '-loglevel',
    'error',
    '-i',
    heroGif,
    '-vf',
    'fps=10,scale=220:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96:reserve_transparent=1:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:alpha_threshold=128',
    temp,
  ],
  { stdio: 'inherit' },
);

copyFileSync(temp, heroGif);
unlinkSync(temp);

const after = statSync(heroGif).size;
console.log(`Optimized selim-hero.gif: ${before} → ${after} bytes (transparent)`);
