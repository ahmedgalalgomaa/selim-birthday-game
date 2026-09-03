import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const assets = [
  ['public/assets/selim-hero.gif', 'src/assets/selim-hero.gif'],
  ['public/assets/flash-power.png', 'src/assets/flash-power.png'],
  ['public/assets/thor-power.svg', 'src/assets/thor-power.svg'],
  ['public/assets/captain.png', 'src/assets/captain.png'],
  ['public/assets/ironman.png', 'src/assets/ironman.png'],
  ['public/assets/thor.png', 'src/assets/thor.png'],
  ['public/assets/number_5.png', 'src/assets/number_5.png'],
];

for (const [sourceRel, targetRel] of assets) {
  const source = join(root, sourceRel);
  const target = join(root, targetRel);

  if (!existsSync(source)) {
    console.error(`Missing ${sourceRel}`);
    process.exit(1);
  }

  copyFileSync(source, target);
  console.log(`Synced ${sourceRel.split('/').pop()} → src/assets/`);
}
