# ASCII and smooth motion release — October 2, 2026

Scope: the user's FAQ plus/minus and gray open-row defects, text-only lime process selection, an authored ASCII hero, a requested low green hero/work seam and varied smooth motion. The existing graphite/lime identity, copy, pricing, native navigation, current Gift Roulette v4 cover, service diagrams and Telegram destination remain authoritative. Direction: `ascii-motion-direction.md`.

## Source review

- Functionality: shared reversible native disclosures remain in `disclosures.mjs`; their enhancement and no-script behavior are preserved. Process tabs retain arrow/Home/End keyboard selection and roving focus. Interrupted panel animations cancel before the next selection.
- Security and data: no user input, storage, external integration or new dependency was added. Decorative ASCII is aria-hidden; useful text and links remain real static HTML.
- Performance: the isolated lazy canvas caches 10,500 mesh points, computes one rotation matrix per frame, caps painting at 60 Hz and DPR at 1.5, and cancels its loop offscreen, in hidden documents or for reduced motion. Other entrances use one-shot IntersectionObserver jobs and Web Animations. Native scroll owns the progressive CSS view timelines.
- Maintainability: geometry, canvas lifecycle and entrances have separate small modules. Static SVG and animated canvas share the same geometry. No whole-site animation library or global scrolling loop was introduced.
- Quality and accessibility: one primary hero CTA and a native cursor remain. The selected process button has the same neutral ground as its siblings. FAQ open/closed grounds stay transparent, with explicit 2px cross strokes. Visible baseline content and the static SVG remain available before or without JS.

## Verification

Canonical static build passed. Two ASCII geometry tests passed, including sampled phase/pointer trajectory containment; seven SEO/link/schema/image-loading/price checks passed. Syntax checks passed for the new modules and runtime. `git diff --check` passed.

CUA browser checks used 1280×720 and 390×844 CSS viewports. Native screenshots are JPEG and may have different sampled pixel dimensions. Homepage and service samples had no horizontal overflow and no sampled warning/error console entries. All four homepage covers loaded; Gift Roulette resolves to the approved v4 responsive cover. Process click and keyboard selection worked, and selected/background computed values match the requested text-only state. Rapid FAQ reversal settled correctly; closed rows show plus, open rows show minus, without a gray backplate.

The final ASCII rest projection has 1,004 SVG glyphs. Sampled draw costs after projection/matrix optimization were 2.7–3.6 ms on this computer. The scene reported `running` in the hero and `rest` after scrolling away. These samples are not a steady frame-rate benchmark. Source/static-path checks establish reduced-motion behavior; no OS-level preference toggle, Safari/Firefox, physical-device, zoom or Lighthouse certification is claimed.

## Capture packet

- `ascii-home-desktop.jpg` / `ascii-home-mobile.jpg`: whole ribbon, primary CTA and seam.
- `ascii-process-desktop.jpg` / `ascii-process-mobile.jpg`: selected Interface tab and its panel; desktop also shows keyboard focus.
- `ascii-faq-desktop.jpg` / `ascii-faq-mobile.jpg`: first question open, other questions closed.
- `ascii-service-desktop.jpg` / `ascii-service-mobile.jpg`: service FAQ disclosure states.
- `ascii-system-desktop.jpg` / `ascii-system-mobile.jpg`: existing connected service diagram, sampled alongside the new entrance treatment.

The browser's full-page capture returned “Unable to capture screenshot” at the settled homepage. No file was produced; the changed regions are supplied as ten valid viewport captures instead. Review is scoped to these changed surfaces and source motion, not an unseen whole-page certification. No screenshot was edited or reconstructed.

## Detector and persistence

One detector pass is saved in `ascii-detect.json`: 23 color, 71 font-size, five radius advisories and one warning for the shared initially empty hidden-lightbox image. Its source/alt/caption are assigned before opening; it is not failed visible media. Legacy values outside this refinement are preserved. The new ASCII four-tone ramp and local neutral feedback rules are reconciled in DESIGN.md and schemaVersion 2 design.json; PRODUCT.md records the source, scope and limits. `ascii-documentation.md` records consistency checks. New visual assets are authored SVG/canvas geometry; no raster edits were made.

Publishing uses the existing GitHub Pages main workflow. Public verification follows the final review and push; this local record does not claim deployment by itself.

Fresh independent finish review: `ascii-finish-review.md`, disposition `ship`, no scoped material fixes. All ten supplied captures, persistence and sampled source passed the approved amendment contract. The root accepted that verdict without further polish or a second detector pass.
