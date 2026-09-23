# Lancer Agency design — September 23 rebuild

The new user reference is the layout specification. Its centered CRM hero replaces the former left-aligned headline and floating slabs. The hero, services, workflow, case previews, team and contact sections have been rebuilt. All four project pages now use new presentation layouts, including a complete 12К case.

## Visual system

Manrope, navy text, ice-blue atmosphere, bright white inner rims, cyan edge shading, transparent fills, restrained optical refraction. The page consists of HTML, CSS and real product screenshots, with separate generated scene backgrounds. SVG clipping creates the lower hero panel's curved profile. CSS creates the code sculpture, data panels and request flow.

New artwork: alpine-world.webp, team-orbit.webp, contact-ring.webp. Existing green botanical artwork remains for Gift Roulette and TailCare; warm navy/ivory for Maverick. 12К keeps its black/blue Mini App and quiet black/white/green owner portal. Screenshots are never recolored.

## Files and behavior

- src/agency-home.mjs: complete homepage, CRM illustration, four-step example and four projects.
- src/agency-cases.mjs: verified project content, four cases, responsive screenshots, related projects.
- src/agency-shared.mjs: navigation, head, devices, footer, screenshot dialog.
- src/build-agency.mjs: all pages, 404 and sitemap.
- agency.css: desktop, tablet and phone layout, materials and reduced-motion fallbacks.
- agency.js: keyboard tabs, local request demonstration, native screenshot dialog and focus restoration, entrances.
- glass-optics.mjs and glass-lens.mjs: bounded optical maps on selected Chromium glass controls; CSS fallback in other engines.

Native scrolling remains intact. Animations enhance already-visible content and are disabled by reduced motion. CRM and the workflow are clearly illustrative and never send data. Contact buttons use the existing Telegram address.

## Verification

Five pages × widths 320, 390, 768, 1024 and 1440: no horizontal overflow or heading overflow. Browser checks cover CRM click and keyboard selection, request sequence, case navigation, detail expansion, screenshot opening, Escape and focus restoration. Static link validation checks all six HTML pages including 404, local assets and anchors. Existing optical-map tests pass. Visual checks are in Chromium; other engines are not claimed as tested.

## Build

npm run build; npm run check; npm test; npm run dev. Preview: http://127.0.0.1:4173/. node src/package.mjs produces the static deployment folder. CNAME remains landlancer.ru.

Sources for the optical approach:
- https://kube.io/blog/liquid-glass-css-svg/
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- https://jonbarber.co/lab/liquid-glass

## Clear-glass refinement

The latest feedback supersedes the tilted hardware presentation. All product captures now face forward, with thin neutral rims and no simulated camera notch. Case cards contain the entire capture at its native aspect ratio; intrinsic image dimensions prevent layout shifts while loading. The main portfolio thumbnails remain close-up previews. TailCare uses light browser frames, and the two 12К interfaces sit alongside one another without overlap.

All action buttons are flat: solid fill, 9 px corners, no bevel, gradient or raised shadow. Hover changes color and active states use a small scale response. Decorative panels keep the glass material.

The optical treatment follows the linked first-party experiments: a neutral center, inward displacement around a wider rounded bevel, directional specular rims and low-opacity fills. Large surfaces use 24–42 px displacement scale and only 0.65 px blur in Chromium. CSS fallback uses 1.2 px blur. Text layers have separate translucent backing for legibility. SVG filters are attached only near the viewport; maps are cached for re-entry and rebuilt only on size changes. Reduced transparency and forced-color preferences retain their fallbacks.

Verified after refinement: all five pages at 320, 390, 768, 1024 and 1440 px have no horizontal overflow, no transformed product frames and no raised CTA styling. Native screenshot viewer still opens/closes. Visible filters detach outside the viewport and restore on return. Browser console is clear; optical-map tests and static-link checks pass. Safari/Firefox rendering is not separately tested.

Screenshot origins and demonstration limitations: ASSET_PROVENANCE.md. Generated artwork prompts: ART_PROMPTS.md.
