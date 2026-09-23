# Interactive product exhibits — September 23, 2026

The latest request replaces screenshot-led project cards and split text/screenshot heroes with playable product fragments. The agency background, clear-glass navigation and flat controls remain. Decorative green dots were removed from the custom-development steps.

## What visitors can do

- Gift Roulette: reveal cells in a 5 × 5 Mines field, open a case, start/stop a Crash graph, select an Upgrade target and run its animation.
- Maverick: spin the prize strip and see the demo balance update in the participant profile.
- TailCare: search sample listings by name, filter by category, open an animal card and save/remove a favorite.
- 12К: flip the member card, enlarge its demonstration QR, claim a one-time local daily bonus, play Stack and open the actual business-dashboard screenshot.

Homepage exhibits offer the small interactive fragments; case pages expose the complete demo controls. Actual product captures remain in a separate expandable gallery. These are labelled portfolio demos with transient local state, no authentication and no production transactions. Gift outcomes and display multipliers are illustrative local simulations, not the production server's odds or payout rules. No prizes, money or real loyalty points are issued. Reloading resets state.

## Source components

Source product repositories were read, not modified. Copied code lives under src/demos so the site builds independently of those source directories.

| Project | Source and retained behavior | Portfolio adaptation |
| --- | --- | --- |
| 12К | Z:/Users/smoke/OneDrive/Документы/ChatGPT/12K Mini App/frontend/src/components/LoyaltyCard.vue, BrandMark.vue, QrCode.vue; original card texture and logo | Original flip, focus management and QR rendering. Local demo props and no-op Telegram feedback adapter. QR contains only LANCER-PORTFOLIO-DEMO-12K. |
| 12К Stack | Same frontend: components/StackCanvas.vue, components/stack/StackScene3D.ts, StackScene2D.ts, app/stackEngine.ts, app/stackPresentation.ts | Original rendering, deterministic trajectory, overlap/trimming, input handling and 2D fallback. Local run ID/rules; no server score submission. Offscreen play ends locally. Three.js loads only when Stack is opened. |
| Maverick | Z:/Users/smoke/OneDrive/Документы/Maverick/miniapp/src/modules/roulette/RouletteView.vue, rouletteStrip.ts and roulette section of styles.css | Original strip planning, target centering, reel markup and styling; standalone Vue wrapper replaces authenticated requests with a local demo reward. Profile is a compact portfolio presentation, not a copied full profile route. |
| TailCare | D:/Dog-search-project/FRONT/src/components/DogCard.vue and relevant styles/base.css rules; public/demo-dogs sample photos | Original animal card, amended to emit selection instead of navigating into the source application. Demo shell adds local filters, search and favorites. Moderation is not exposed. |
| Gift Roulette | D:/Data/Projects/Code/gift_roulette/src/frontend/app/src/views/Mines.vue, Jet.vue, CaseDetail.vue, Upgrade.vue | Field/reel/wheel/graph presentation and scoped source styling adapted into focused Vue components. Framework7, payment, inventory API and WebSocket dependencies replaced by local demo state. Gift icons are illustrative inventory placeholders. |

## Build and lifecycle

npm ci; npm run build; npm run dev. Vite compiles the Vue islands and lazy chunks into demos/, then the existing generator emits the static pages. src/package.mjs includes compiled demos and sample assets in the GitHub Pages release. There is no runtime CDN or backend requirement.

Vue islands mount as they approach the viewport. Each product is a dynamic chunk; Stack has its own heavier chunk. Source component styles are scoped. Game timers and animations are cancelled on unmount; Crash stops when the document becomes hidden. Screenshot opening uses delegated events so dynamically mounted controls work with the existing accessible dialog.

Pinned runtime dependencies and their licenses are recorded in package-lock.json and vendor/licenses/. Original product source is included under the user's authorization to reuse their components.

## Verification

Unit tests cover mine loss/repeated-click/completion boundaries, unique mine placement, displayed outcome sectors, original Stack trimming/axis/end rules and original Maverick winner centering, plus existing glass optics tests. Browser checks exercise the actual UI actions described above, QR flipping, screenshot dialog and keyboard Stack placement. All four case pages and the homepage were checked at 320, 390, 768, 1440 and 2560 px in Chromium. No Safari or Firefox claim is made.
