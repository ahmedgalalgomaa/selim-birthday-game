import { INVITATION_ASSETS } from '../../config.js';

export function getFinaleBackdropMarkup() {
  return `
    <div class="finale__backdrop invite-layer" aria-hidden="true">
      <div class="invite__sky">
        <div class="invite__speed-lines"></div>
        <div class="invite__city"></div>
      </div>
      <div class="invite__header">
        <div class="invite__burst">
          <span class="invite__avengers">Avengers</span>
          <span class="invite__assemble">Assemble!</span>
        </div>
      </div>
    </div>
  `;
}

export function getFinaleOrbitMarkup() {
  const { captain, ironman, thor, flash } = INVITATION_ASSETS;

  return `
    <div class="finale__orbit invite-layer" aria-hidden="true">
      <img class="invite__hero invite__hero--captain" src="${captain}" alt="" />
      <img class="invite__hero invite__hero--ironman" src="${ironman}" alt="" />
      <img class="invite__hero invite__hero--thor" src="${thor}" alt="" />
      <img class="invite__hero invite__hero--flash" src="${flash}" alt="" />
      <span class="invite__pow">POW!</span>
      <span class="invite__zap">ZAP!</span>
    </div>
  `;
}

export function getFinaleNumberMarkup() {
  return `<img class="finale__number invite-layer" src="${INVITATION_ASSETS.number5}" alt="" />`;
}

export function getFinaleInviteMarkup() {
  return `
    <div class="finale__invite invite-layer">
      <div class="invite__nameplate">
        <p class="invite__name">Selim</p>
        <p class="invite__turning">Is Turning <span>5!</span></p>
        <p class="invite__mission">Join the Mission to Celebrate</p>
      </div>

      <div class="invite__details">
        <div class="invite__detail-card">
          <span class="invite__detail-icon" aria-hidden="true">📅</span>
          <div>
            <p class="invite__detail-label">Date: September 11th</p>
            <p class="invite__detail-sub">Time: 2:00 PM</p>
          </div>
        </div>
        <div class="invite__detail-card">
          <span class="invite__detail-icon" aria-hidden="true">📍</span>
          <div>
            <p class="invite__detail-label">Location:</p>
            <p class="invite__detail-sub">Levana Uptown Cairo</p>
          </div>
        </div>
      </div>

      <div class="invite__dress">
        Dress Code: Wear Your Swimsuits &amp; Pool Floaties!
      </div>

      <button type="button" class="btn btn--hero invite__replay">Play Again</button>
    </div>
  `;
}

export function bindInvitationReplay(screen, onReplay) {
  screen.querySelector('.invite__replay')?.addEventListener('click', onReplay);
}
