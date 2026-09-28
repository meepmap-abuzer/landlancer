// Decorative geometry only. All content and controls remain semantic HTML above it.
export function surface(kind) {
  const paths = {
    invite: 'M58 2H276C310 2 332 24 334 59V132C334 183 359 217 414 218H58C23 218 2 197 2 163V58C2 24 23 2 58 2Z',
    business: 'M78 2H366C402 2 422 27 422 63V161C422 195 399 218 365 218H112C77 218 64 201 64 171C64 145 48 133 27 124C10 116 2 100 2 81C2 38 34 2 78 2Z',
    notch: 'M2 2H478C441 2 446 66 392 66H88C34 66 39 2 2 2Z'
  };
  const notch = kind === 'notch';
  return `<svg class="sculpted-surface" viewBox="0 0 ${notch?'480 68':'424 220'}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${kind}-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff" stop-opacity="${notch?'.97':'.84'}"/><stop offset=".42" stop-color="#e0f4ff" stop-opacity="${notch?'.92':'.60'}"/><stop offset=".72" stop-color="#e5f6ff" stop-opacity="${notch?'.87':'.36'}"/><stop offset="1" stop-color="#ffffff" stop-opacity="${notch?'.96':'.77'}"/></linearGradient><linearGradient id="${kind}-edge" x1="0" y1="0" x2=".65" y2="1"><stop stop-color="#fff"/><stop offset=".45" stop-color="#e0f6ff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></linearGradient></defs><path d="${paths[kind]}" fill="url(#${kind}-glass)" stroke="url(#${kind}-edge)" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`;
}
