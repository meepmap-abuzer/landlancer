# Lancer Agency design

## Art direction
Reference 1: blue alpine lake, thick transparent panels, sidebar, services, connected systems, a two-column portfolio, glass orbital sculpture and contact. Reference 2: pale green botanical Gift Roulette page with two phones, four feature rows, a central glass gift and technology flow. References 3–6 inform floating navigation, object-centred compositions and material depth.

Manrope is retained from the existing brand. Blue-white agency palette, botanical green for Gift Roulette and TailCare, warm ivory/navy accents around Maverick's current cream/red/navy interface. Generated raster scenes support real HTML content; the page is not a single flattened image.

## Source files
- src/build-agency.mjs: static build entry, case routes, 404 and sitemap.
- src/agency-shared.mjs: head, navigation, icons, image viewers and footer.
- src/agency-home.mjs: homepage composition.
- src/agency-cases.mjs: verified content and case template.
- agency.css: responsive layout and glass materials.
- agency.js: image viewer, focus restoration and entrance animation.
- glass-optics.mjs: bounded refraction map calculation.
- glass-lens.mjs: Chromium SVG backdrop lenses on selected controls; CSS fallback elsewhere.

The previous src/build.mjs and older styles are historical source; npm build now uses the agency entry. They are excluded from the static release.

## Glass and motion
Glass combines transparency, a bright inner rim, subtle opposite-edge shading, a soft shadow and refraction near the bevel. Maps are calculated only on resize and capped at 320 pixels per axis. The centre is neutral so labels remain clear. Chromium uses SVG backdrop refraction; other browsers use the CSS material. Tests verify symmetry, neutral centres and bounded allocations.

Small hero objects drift slowly; entrances use transforms and opacity. Scroll remains native, with smooth anchor movement. Reduced-motion preferences disable animations and smooth scrolling. Main text never depends on JS to appear.

References:
- https://kube.io/blog/liquid-glass-css-svg/
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter

## Screenshot provenance
All three frontends were launched locally on September 19, 2026. ASSET_PROVENANCE.md records individual images and local data limitations. Screenshots are not generated or restyled. Generated nature and glass objects live separately in assets/art.

## Commands
npm run build; npm run check; npm test; npm run dev (127.0.0.1:4173); node src/package.mjs.
