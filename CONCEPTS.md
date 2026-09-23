# Three independent business landing pages

Local portfolio concepts, September 23, 2026. The user explicitly delegated creative direction and requested complete fitness, modular-home and detailing websites, generated design mockups, useful interactions and mobile layouts. This task does not authorize publication. The existing agency pages, deployment workflow and production package are unchanged.

## Preview and build

- Gallery: http://127.0.0.1:4173/concepts/
- РИТМ: http://127.0.0.1:4173/concepts/fitness/
- ХВОЯ: http://127.0.0.1:4173/concepts/homes/
- ТАКТ: http://127.0.0.1:4173/concepts/detailing/
- `npm run build:concepts` builds with the existing Vite dependency and renders all four static HTML files.
- `npm run dev` serves the existing repository at port 4173. No separate application server is required.
- `node --test src/concepts/model.test.mjs` checks quote arithmetic and schedule/membership invariants.

These drafts deliberately have `noindex,nofollow`. Forms validate input and complete a local demonstration; no contact data is transmitted or persisted. Configuration summaries download as plain text. Brand names, prices, schedules and photographs are demonstrative, labelled in the interface. There are no invented customer reviews or business results.

## Design contract

Read all 40 exhibits in the user's [AI-slop museum](https://ai-slop.matvei-vibecoder.com/). The resulting design choices avoid stock SaaS composition, ornamental gradients, repetitive cards, invented trust signals and unrelated motion. Each website uses its own photography, type scale, palette, composition and interaction model rather than recoloring one template.

| Concept | Voice and type | Composition | Functional interaction |
| --- | --- | --- | --- |
| РИТМ | Physical, direct, energetic; Oswald + Golos Text; vermilion and black-and-white | Oversized offset title, panoramic sports photo, editorial training selector, red timetable, gym story, membership and booking | Three training goals update content and filter the weekly schedule; day selection; booking handoff; membership term pricing; 30/15 interval timer with pause/reset and three rounds |
| ХВОЯ | Calm, tactile, precise; Onest; forest green, timber and chalk | Immersive forest hero, house catalogue with editable SVG floor plans, real 3D configuration scene, interior photography, materials, questions and inquiry | 36/54/72 m² models; room counts; facade materials; terrace geometry and quote; orbit/zoom buttons and keyboard; roof removal and top view; configuration download |
| ТАКТ | Reflective, precise, confident; Golos Text; graphite, cool white and cobalt | Large wordmark headline, studio car photography, before/after comparison, bespoke quote builder, photographic process and booking | Keyboard/touch range comparison; four vehicle sizes; independently selected services; front/full-body protection mapped onto a car photograph; price and duration; empty-state inspection request |

Three high-fidelity Imagegen north-star mockups were generated before implementation. Delivered locally in `../concept-mockups/fitness.png`, `homes.png`, `detailing.png`; exact mock prompts are in `../concept-mockups/PROMPTS.md`. The user delegated selection, so each strongest direction was carried into code. Text, navigation, controls, estimates and floor plans are semantic HTML/CSS/SVG, never flattened page screenshots.

The live model is a styled real-time architectural illustration, not the photoreal raster model in the mock and not an engineering drawing. The detailing configurator uses a generated car photograph plus aligned semantic SVG masks. Its before/after pair is explicitly an illustration; the two generated camera views are close but not pixel-identical. The fitness timer adds a working demonstration beyond the mock.

Eight separate photographic assets were generated with the built-in Imagegen tool. PNG masters remain local; optimized WebP files are referenced by the sites. Exact production prompts, file names and source paths are recorded in [assets/ASSET_PROMPTS.md](concepts/assets/ASSET_PROMPTS.md). Fonts are hosted locally with OFL licenses. The runtime makes no CDN requests.

## Implementation boundaries

- `src/concepts/*-page.mjs`: page composition and Russian copy.
- `templates.mjs`, `shared.mjs`, `shared.css`: accessible navigation, typography assets, form validation and local summary downloads.
- `fitness.mjs`, `homes.mjs`, `detailing.mjs`: isolated page interaction state.
- `model.mjs`: quote, membership and timetable data; independently tested.
- `floorplan.mjs`: model-dependent 2D room diagram.
- `house-scene.mjs`: Three.js scene, OrbitControls, geometry/material disposal, keyboard and button controls, visibility-aware render loop.
- `car-diagram.mjs`: photograph-aligned paint masks; windows, wheels and lights remain uncolored.
- `vite.config.mjs`, `build.mjs`: existing Vite/static build conventions; `concepts/runtime` is generated output.

The 3D renderer loads only when the configurator approaches the viewport. Pixel ratio is capped at 1.6, rendering pauses off-screen/in hidden tabs, old geometry and materials are disposed on rebuild. WebGL initialization failure displays a photograph and leaves the complete quote interface usable. The Three.js chunk is approximately 541 KB minified / 137 KB gzip; it is not loaded on the other two landing pages. CSS is approximately 44 KB / 10 KB gzip. Touch scrolling is native and reduced-motion preferences disable the entrance choreography.

## Verification

24 browser layout checks: all four routes at 320, 390, 768, 1024, 1440 and 1920 CSS px. No document or selected element overflow, oversized headings, broken loaded images, broken fragment links or console errors. Every route has one main landmark.

Manually exercised in connected Chromium:

- Fitness goal-to-schedule filtering, weekday selection, selected class handoff, 6-month price, timer start/pause/reset, invalid phone and successful form.
- Home model/room updates, 72 m² graphite configuration without terrace (5,130,000 ₽), WebGL rendering, rotate/zoom controls, roof removal/top view, inquiry handoff and successful mobile form.
- Detailing comparison at 0 and 100 using the keyboard, selected film zones, size-dependent price (L + polish + ceramic + full film = 266,400 ₽ / five days), no-services inspection state and successful form.
- Mobile menu opening, navigation closing, inputs, and section-by-section visual inspection at desktop and mobile widths.

Initial inspection caught and fixed a Vite CSS filename mismatch, excessive display tracking, two 320 px heading overflows, disappearing word spaces after hidden line breaks, unnecessary blank timetable space, a 3D top slab left visible in the roof-off view, canvas background mismatch and clipping. New selections reset a previously completed demo form; downloaded receipts capture the submitted configuration.

Four focused model tests pass. Screenshot evidence and the JSON layout report are in `../concept-review/`. Physical iOS/Android and Safari/Firefox have not been tested. Public hosting and form delivery are intentionally outside this local concept task.

Technical references: [Three.js documentation](https://threejs.org/docs/), [Google Fonts: Oswald](https://fonts.google.com/specimen/Oswald), [Onest](https://fonts.google.com/specimen/Onest), [Golos Text](https://fonts.google.com/specimen/Golos+Text).
