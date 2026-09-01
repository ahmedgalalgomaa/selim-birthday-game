import selimHeroUrl from './assets/selim-hero.png?url';
import flashPowerUrl from './assets/flash-power.png?url';
import thorPowerUrl from './assets/thor-power.svg?url';

/** Loaded from public/assets/selim-hero.png (synced before dev/build). */
export const SELIM_HERO_SRC = selimHeroUrl;

export const BEATS = {
  thor: {
    id: 'thor',
    title: 'Thor Power!',
    subtitle: 'Tap the hammers!',
    mentorLabel: 'Thor Power',
    targetCount: 8,
    spawnInterval: 900,
    fallSpeed: 3.2,
    itemClass: 'catch-item--thor',
    iconSrc: thorPowerUrl,
  },
  flash: {
    id: 'flash',
    title: 'Flash Power!',
    subtitle: 'Tap the flash icons!',
    mentorLabel: 'Flash Power',
    targetCount: 8,
    spawnInterval: 650,
    fallSpeed: 5.5,
    itemClass: 'catch-item--flash',
    iconSrc: flashPowerUrl,
  },
};
