---
name: Lancer Agency — Light glass and natural photography
description: Restored light agency layout with real landscape photography and authentic product exhibits.
colors:
  ink: "#081744"
  muted: "#405c80"
  blue: "#0078ff"
  surface: "#f5faff"
  rim: "#f5ffff"
  accent: "#0879f8"
  action: "#102e3a"
  action-hover: "#204755"
  focus: "#0065db"
  approach-copy: "#193e56"
  progress-surface: "#eef8ffeb"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(48px, 4.7vw, 108px)"
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(34px, 3.1vw, 68px)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-.04em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    lineHeight: 1.5
  button:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  action: "9px"
  hero-panel: "26px"
  project: "30px"
  navigation: "0 0 38px 38px"
spacing:
  gutter: "clamp(24px, 6vw, 160px)"
  mobile-gutter: "18px"
  project-gap: "32px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "#fff"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  navigation:
    backgroundColor: "#f5faffee"
    width: "clamp(370px, 29vw, 540px)"
    height: "74px"
    rounded: "{rounded.navigation}"
    padding: "10px 28px 16px"
  project-card:
    rounded: "{rounded.project}"
    padding: "25px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Light glass in a real landscape."**

The restored agency layout combines pale blue surroundings, navy typography, translucent glass and real mountain, lake and forest photographs. The pictures supply natural texture and lighting; interface panels provide a stable reading surface. Product demonstrations retain their native themes and remain the evidence of delivered work.

The user revoked the orbital/sculpted revision and asked to return to the earlier light layout while changing background imagery. Preserve the incumbent geometry, Manrope and the supplied Lancer logo. natural.css is the final stylesheet; orbital.css and decorative sculpted SVG surfaces are no longer loaded. The logo uses assets/brand/lancer.webp without recoloring or distorting the original mark.

**Key Characteristics:**

- Real stock photography beneath pale readability overlays.
- Light glass panels with white rims and restrained blue accents.
- Original notch silhouette and rounded lower hero panels.
- Native product themes and source-derived demonstrations.
- Native scrolling and stable navigation placement.

## Colors

### Primary

Blue and accent serve controls, icons and interaction feedback. Action and action-hover define the flat dark primary action. The photographic greens, blues and rock tones remain natural rather than being recolored to a single hue.

### Neutral

Surface is the light page ground; ink and muted supply navy text. Rim creates the pale glass edge. Approach-copy and progress-surface keep delivery-stage descriptions readable against the lake photo. Photo overlays and translucent surfaces vary with the section rather than introducing dark orbital bands.

**The Readable Landscape Rule.** Keep natural photography visible while providing sufficiently pale panels behind supporting text; use the delivery-stage contrast treatment as the incumbent example.

## Typography

Manrope with Arial and sans-serif fallbacks remains the single interface family. Local Cyrillic and Latin files are retained, with Cyrillic preloaded. The frontmatter display and headline values describe the desktop hero and section headings. Mobile hero type uses clamp(30px, 8.2vw, 52px); mobile section headings use clamp(29px, 7.7vw, 40px). Hero supporting copy is clamp(17px, 1.45vw, 30px) on desktop and 15px on mobile. Mobile service copy is 14px/1.55 and titles are 18px/1.25.

Existing decorative eyebrow labels return with the restored markup. They are not promoted to a reusable type token or a requirement for new surfaces.

## Layout

The page restores full-width landscape scenes and fluid content gutters. Desktop hero copy centers above a 76%-wide CRM. The lower hero uses 34% / 28% / 38% columns, with two rounded panels around empty central space; it does not use the superseded sculpted curves. Mobile CRM and lower hero are calc(100% - 36px) wide, and lower panels stack in normal flow. Project cards preserve the existing two-column presentation and content-driven mobile arrangements.

The original top notch is fixed outside clipped scenes. Desktop placement is top:0, with frontmatter dimensions and CSS shoulders. Both normal and scrolled states share the same height, padding and transition:none. Mobile placement is max(10px, env(safe-area-inset-top)), with height 49px, width min(340px, calc(100% - 36px)), no padding, transparent outer background and 28px corners. The mobile header is 138px high with 82px top and 12px bottom padding, reserving space for the navigation. Mobile gutters are 18px, with inherited narrow-screen refinement.

The existing delivery-stage arrangement surrounds the lake on desktop and becomes stacked cards below the photographic opening on mobile. This revision changes its background and text contrast without changing the geometry. Inspect agency.css, experience.css, playground.css, mobile.css, seo.css and final natural.css in load order before extending the layout.

## Elevation & Depth

The inherited clear-glass material uses static gradients, reflective rims, translucent fills and soft shadows. The shared rim shadow is inset 1px 1px 0 #fff, inset -1px -1px 0 #ffffffa8, inset 0 0 0 3px #ffffff18, inset 0 0 14px #ffffff22, 0 8px 24px #16395720. The CRM uses inset 1px 1px 0 #fff, inset -1px -1px 0 #b4e8ff, 0 12px 35px #123f612e. Actions remain flat.

natural.css applies 2px blur to glass, top navigation, side navigation, about surface, project captions and product stages. Its mobile override removes blur from glass, top/side navigation, project captions and product stages. The about surface retains 2px and the inherited navigation indicator retains 1px; these exceptions are source observations, not a recommendation to expand mobile blur. Glass pseudo-elements have no filtering or backdrop blur.

**The Native Scroll Rule.** Preserve browser wheel and touch scrolling, scrolling background attachment and stable header placement; do not restore Lenis, live SVG lenses or a perpetual scroll animation loop.

## Shapes

The original desktop notch uses rounded bottom corners and radial-gradient shoulders in CSS. There is no loaded sculpted-surface SVG. Hero panels use rounded rectangles, with a 26px desktop radius and 22px mobile radius. Project cards use the frontmatter radius, adapting to 25px on mobile. Full-width scenes use straight outer edges; inner glass panels carry softness. The narrow side rail remains a capsule and is hidden on mobile.

## Components

### Background photography

Four real stock photographs have desktop and mobile WebP derivatives under assets/photos: glacier, lake, forest and peaks. Glacier appears in the hero, workflow, contact and selected projects; lake appears in custom development, delivery stages and agency information; forest supports Gift Roulette and TailCare; peaks supports Maverick. The 12К case uses glacier with the lake in its ecosystem region. CSS overlays handle text contrast separately from the images.

ASSET_PROVENANCE.md records photographers, source links and the checked licenses permitting free website use. This revision uses local resizing/encoding only, with no new AI generation or generative editing. The prior service illustration sprite at assets/art/services.webp remains decorative service art; it is not one of the replacement landscape backgrounds. Contact and case orbital objects are hidden.

### Actions and navigation

Primary actions are flat dark rectangles with compact corners. Hover changes their background and retains the inherited traveling highlight and arrow movement; active scale is .96. Keyboard focus is a 3px focus outline offset by 5px. The supplied logo is 184×55px in the desktop header, 145×43px in the mobile header and 145×45px in the footer, with 136% artwork sizing trimming transparent margins.

The measured selection pill responds to pointer hover, keyboard focus and section observation, with a 350ms transform transition. Its containing notch stays vertically stable. Reduced motion disables applicable transitions and smooth anchor scrolling.

### Cards and product exhibits

Project cards retain their existing glass frame, local product components and 3px hover lift. Case pages retain centered introductions, light glass exhibits, concise features and expandable screenshot galleries. Preserve native details and screenshot-dialog focus restoration. Embedded products keep their own themes and interaction boundaries.

Delivery-stage glass uses linear-gradient(120deg, #f2faffeb, #e7f4ffe0); descriptions and progress text use approach-copy, and the progress pill uses progress-surface. This contrast fix stabilizes secondary copy over the real lake photograph without changing placement.

### Demonstrations and motion

CRM tabs and the request sequence are illustrative local interactions, not a submitted agency lead form. DEMOS.md records the exact product-source reuse and simulation boundaries. No standalone agency text-field component exists; decorative form rows are not inputs. experience.mjs retains native scrolling, without wheel interception or a perpetual scroll RAF. Selected subordinate headings use one-time 550ms opacity/16px translation reveals with 60ms stagger capped at 180ms; the hero heading remains immediately visible.

Saved desktop, mobile, approach and case screenshots in ../natural-background-review document this revision's visual review. This document adds no fresh browser matrix, device verification, FPS score or deployment claim.

## Do's and Don'ts

- **Do** preserve the restored light layout and existing component geometry.
- **Do** use real, locally hosted landscape photographs with recorded source and license provenance.
- **Do** keep supporting text on pale, readable panels over photographs.
- **Do** retain the supplied logo, Manrope and each product's native theme.
- **Do** preserve native scrolling and stable navigation placement.
- **Don't** reintroduce the revoked orbital or sculpted-surface design contract.
- **Don't** generate replacement landscape art for this stock-photography revision.
- **Don't** treat decorative photos or service art as evidence of delivered products.
- **Don't** propagate inherited decorative eyebrows as a system primitive.
- **Don't** infer deployment, physical-device performance or new test results from this documentation.
