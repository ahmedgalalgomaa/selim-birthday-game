import selimHeroUrl from "./assets/selim-hero.gif?url";
import flashPowerUrl from "./assets/flash-power.png?url";
import thorPowerUrl from "./assets/thor-power.svg?url";
import captainUrl from "./assets/captain.png?url";
import ironmanUrl from "./assets/ironman.png?url";
import thorUrl from "./assets/thor.png?url";
import number5Url from "./assets/number_5.png?url";

/** Loaded from public/assets/selim-hero.gif (synced before dev/build). */
export const SELIM_HERO_SRC = selimHeroUrl;

/**
 * Skip Thor & Flash and open the invitation immediately.
 * true  = invitation only (for layout / invite testing)
 * false = full game (splash → Thor → Flash → invitation)
 */
export const SKIP_QUESTS = false;

export const INVITATION_ASSETS = {
  captain: captainUrl,
  ironman: ironmanUrl,
  thor: thorUrl,
  flash: flashPowerUrl,
  number5: number5Url,
  selim: selimHeroUrl,
};

export const BEATS = {
  thor: {
    id: "thor",
    title: "Thor Power!",
    subtitle: "Tap the hammers!",
    mentorLabel: "Thor Power",
    targetCount: 8,
    spawnInterval: 900,
    fallSpeed: 3.2,
    itemClass: "catch-item--thor",
    iconSrc: thorPowerUrl,
  },
  flash: {
    id: "flash",
    title: "Flash Power!",
    subtitle: "Tap the flash icons!",
    mentorLabel: "Flash Power",
    targetCount: 8,
    spawnInterval: 650,
    fallSpeed: 5.5,
    itemClass: "catch-item--flash",
    iconSrc: flashPowerUrl,
  },
};
