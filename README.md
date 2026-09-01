# Super Selim's Power Quest

A mobile birthday tap game for kids (~6 years old). Guests scan a QR code, help Super Selim catch thunder and speed powers, and celebrate his birthday!

## Play Locally

```bash
cd selim-birthday-game
npm install
npm run dev
```

Open the URL shown in the terminal (includes `/selim-birthday-game/` base path).

## Replace Selim's Hero Image

Replace `public/assets/selim-hero.png`, then restart dev server or rebuild. The game always loads that file (synced automatically before `npm run dev` / `npm run build`).

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g. `selim-birthday-game`).
2. Push this project — the workflow in `.github/workflows/deploy.yml` builds and deploys on push to `main`.
3. In repo **Settings → Pages**, set source to **GitHub Actions**.
4. After deploy, your game URL is:

```
https://<your-github-username>.github.io/selim-birthday-game/
```

> If your repo name differs, update `base` in `vite.config.js` to match (`/<repo-name>/`).

## QR Code for the Party

1. Go to [qr-code-generator.com](https://www.qr-code-generator.com/) or any free QR tool.
2. Paste your GitHub Pages URL.
3. Download and print on invites, table cards, or a party poster.

Guests scan → game loads → tap to play. No app install needed.

## Pre-Party Test Checklist

- [ ] Scan QR on iPhone (Safari) and Android (Chrome)
- [ ] Tap targets feel easy for a 6-year-old
- [ ] Sound works; mute button works
- [ ] Full playthrough: splash → thunder → speed → transform → victory
- [ ] "Play Again" restarts correctly
- [ ] Test on venue Wi‑Fi and mobile data

## Game Flow

1. **Splash** — Tap to Start (+ mute toggle)
2. **Thunder Power** — Catch 8 lightning bolts
3. **Speed Power** — Catch 8 speed streaks
4. **Transform** — Super Selim power-up animation
5. **Victory** — "Happy Birthday Selim!" + confetti + Play Again

Everyone wins — no fail state.

## Tech

- Vite + vanilla JavaScript
- Web Audio API for sound effects
- Canvas confetti
- Static deploy on GitHub Pages

## License

Personal birthday project — fan tribute using inspired hero motifs, not official Marvel/DC assets.
