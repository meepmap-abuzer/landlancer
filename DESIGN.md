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
  roadmap-ink: "#102b48"
  roadmap-copy: "#3e5c74"
  roadmap-widget: "#e4f0f8"
  roadmap-selected: "#dceefb"
  roadmap-focus: "#077ac4"
  project-maverick: "#f4eee5"
  project-loyalty: "#e7f2fa"
  project-gift: "#edf2e6"
  project-tailcare: "#eaf4ee"
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
  roadmap-heading:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(36px, 4vw, 60px)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-.04em"
  roadmap-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "25px"
    fontWeight: 650
    lineHeight: 1.18
    letterSpacing: "-.035em"
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
  roadmap-stage: "24px"
  roadmap-widget: "18px"
  navigation: "0 0 38px 38px"
spacing:
  gutter: "clamp(24px, 6vw, 160px)"
  mobile-gutter: "18px"
  project-gap: "32px"
  roadmap-layout-gap: "70px"
  roadmap-stage-gap: "26px"
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
  roadmap-stage:
    textColor: "{colors.roadmap-ink}"
    rounded: "{rounded.roadmap-stage}"
    padding: "32px"
  roadmap-widget:
    backgroundColor: "{colors.roadmap-widget}"
    rounded: "{rounded.roadmap-widget}"
    padding: "20px"
  project-card:
    rounded: "{rounded.project}"
    padding: "25px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Light glass in a real landscape."**

The restored agency layout combines pale blue surroundings, navy typography, translucent glass and real mountain, lake and forest photographs. The pictures supply natural texture and lighting; interface panels provide a stable reading surface. Product demonstrations retain their native themes and remain the evidence of delivered work.

The user revoked the orbital/sculpted revision and asked to return to the earlier light layout while changing background imagery. Preserve the incumbent geometry, Manrope and the supplied Lancer logo. natural.css defines the landscape treatment; roadmap.css follows it for the scoped roadmap and quiet homepage project backgrounds; orbital.css and decorative sculpted SVG surfaces are no longer loaded. The logo uses assets/brand/lancer.webp without recoloring or distorting the original mark.

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

Surface is the light page ground; ink and muted supply navy text. Rim creates the pale glass edge. The roadmap adds dark blue copy, a pale widget ground and a blue selected-navigation state. Homepage product cards use four quiet solid tints without photographs. Photo overlays and translucent surfaces vary with the section rather than introducing dark orbital bands.

**The Readable Landscape Rule.** Keep natural photography visible where retained while providing pale panels behind supporting text; keep homepage product exhibits and the development roadmap free of photographic backgrounds.

## Typography

Manrope with Arial and sans-serif fallbacks remains the single interface family. Local Cyrillic and Latin files are retained, with Cyrillic preloaded. The frontmatter display and headline values describe the desktop hero and section headings. Mobile hero type uses clamp(30px, 8.2vw, 52px); mobile section headings use clamp(29px, 7.7vw, 40px). Hero supporting copy is clamp(17px, 1.45vw, 30px) on desktop and 15px on mobile. Mobile service copy is 14px/1.55 and titles are 18px/1.25.

Existing decorative eyebrow labels return with the restored markup. They are not promoted to a reusable type token or a requirement for new surfaces.

## Layout

The page restores full-width landscape scenes and fluid content gutters. Desktop hero copy centers above a 76%-wide CRM. The lower hero uses 34% / 28% / 38% columns, with two rounded panels around empty central space; it does not use the superseded sculpted curves. Mobile CRM and lower hero are calc(100% - 36px) wide, and lower panels stack in normal flow. Project cards preserve the existing two-column presentation and content-driven mobile arrangements.

The original top notch is fixed outside clipped scenes. Desktop placement is top:0, with frontmatter dimensions and CSS shoulders. Both normal and scrolled states share the same height, padding and transition:none. Mobile placement is max(10px, env(safe-area-inset-top)), with height 49px, width min(340px, calc(100% - 36px)), no padding, transparent outer background and 28px corners. The mobile header is 138px high with 82px top and 12px bottom padding, reserving space for the navigation. Mobile gutters are 18px, with inherited narrow-screen refinement.

The roadmap replaces the lake-backed delivery-stage arrangement with a sequential list and numbered vertical track. Desktop uses a 245px sticky aside (top 112px), a flexible stage column and a 70px gap. Stage cards split copy and widget into 1fr / .94fr columns with a 30px gap. At 1100px and below the aside is 185px, layout gap 55px and stages become one column. At 760px and below navigation becomes static wrapping links above the list; the aside explanation and CTA are hidden. Mobile cards use 24px 18px padding and 18px corners; widgets use 16px padding and 13px corners. Stage anchor offsets are 115px desktop and 90px mobile. Inspect agency.css, experience.css, playground.css, mobile.css, seo.css, natural.css and roadmap.css in load order before extending the layout.

## Elevation & Depth

The inherited clear-glass material uses static gradients, reflective rims, translucent fills and soft shadows. The shared rim shadow is inset 1px 1px 0 #fff, inset -1px -1px 0 #ffffffa8, inset 0 0 0 3px #ffffff18, inset 0 0 14px #ffffff22, 0 8px 24px #16395720. The CRM uses inset 1px 1px 0 #fff, inset -1px -1px 0 #b4e8ff, 0 12px 35px #123f612e. Actions remain flat.

natural.css applies 2px blur to glass, top navigation, side navigation, about surface, project captions and product stages. Its mobile override removes blur from glass, top/side navigation, project captions and product stages. The about surface retains 2px and the inherited navigation indicator retains 1px; these exceptions are source observations, not a recommendation to expand mobile blur. Glass pseudo-elements have no filtering or backdrop blur.

**The Native Scroll Rule.** Preserve browser wheel and touch scrolling, scrolling background attachment and stable header placement; do not restore Lenis, live SVG lenses or a perpetual scroll animation loop.

## Shapes

The original desktop notch uses rounded bottom corners and radial-gradient shoulders in CSS. There is no loaded sculpted-surface SVG. Hero panels use rounded rectangles, with a 26px desktop radius and 22px mobile radius. Project cards use the frontmatter radius, adapting to 25px on mobile. Full-width scenes use straight outer edges; inner glass panels carry softness. The narrow side rail remains a capsule and is hidden on mobile.

## Components

### Background photography

Four real stock photographs have desktop and mobile WebP derivatives under assets/photos: glacier, lake, forest and peaks. Glacier appears in the hero, workflow and contact; lake appears in custom development and agency information; forest supports Gift Roulette and TailCare case pages; peaks supports the Maverick case. Homepage project cards and the development roadmap have no photographic backgrounds. The 12К case uses glacier with the lake in its ecosystem region. CSS overlays handle text contrast separately from the images.

ASSET_PROVENANCE.md records photographers, source links and the checked licenses permitting free website use. This revision uses local resizing/encoding only, with no new AI generation or generative editing. The prior service illustration sprite at assets/art/services.webp remains decorative service art; it is not one of the replacement landscape backgrounds. Contact and case orbital objects are hidden.

### Actions and navigation

Primary actions are flat dark rectangles with compact corners. Hover changes their background and retains the inherited traveling highlight and arrow movement; active scale is .96. Keyboard focus is a 3px focus outline offset by 5px. The supplied logo is 184×55px in the desktop header, 145×43px in the mobile header and 145×45px in the footer, with 136% artwork sizing trimming transparent margins.

The measured selection pill responds to pointer hover, keyboard focus and section observation, with a 350ms transform transition. Its containing notch stays vertically stable. Reduced motion disables applicable transitions and smooth anchor scrolling.

### Cards and product exhibits

Project cards retain their glass frame, local product components and 3px hover lift, with background-image:none and the four solid project-color tokens replacing photographs. Case pages retain centered introductions, light glass exhibits, concise features and expandable screenshot galleries. Preserve native details and screenshot-dialog focus restoration. Embedded products keep their own themes and interaction boundaries.

### Sequential development roadmap

Five stages pair process explanation with a discussion checkpoint, deliverable and local illustration: task definition, design, development, QA and launch. They assert no durations, metrics or invented team identities. Stage surfaces use linear-gradient(120deg, #ffffffeb, #edf7ffb8), a #c9dfeec9 border and inset 0 1px 0 #fff, 0 12px 28px #3d74950a shadow. Widgets have a pale ground and inset white rim without backdrop filtering. Tabular numbered nodes and a vertical line communicate order.

The design switch uses buttons with aria-pressed to select wireframe or visual states. The task widget cycles through work, review and completion with a local progress meter and status announcement; it is explicitly an example, not a client project status. Native checkboxes update a 0–3 acceptance count and progress element. Scope and handoff illustrations are informational. State remains local to this page. Roadmap controls use a 2px roadmap-focus outline offset by 4px; stage links expose aria-current="step" through section observation.

### Demonstrations and motion

CRM tabs and the request sequence are illustrative local interactions, not a submitted agency lead form. DEMOS.md records the exact product-source reuse and simulation boundaries. No standalone agency text-field component exists; decorative form rows are not inputs. experience.mjs retains native scrolling, without wheel interception or a perpetual scroll RAF. Selected subordinate headings use one-time 550ms opacity/16px translation reveals with 60ms stagger capped at 180ms; the hero heading remains immediately visible.

Saved screenshots in ../natural-background-review document the earlier photography revision; its approach capture predates the roadmap. The roadmap adds one-time 800ms node/copy/widget reveals, staggered 0/90/180ms, with 16px translation for node/copy and 24px for widgets. Content remains visible without JavaScript; reduced motion skips reveals and disables roadmap transitions, and enabling it finishes active animations. This document adds no fresh browser matrix, device verification, FPS score or deployment claim.

## Do's and Don'ts

- **Do** extend the restored light world with quiet sequential process surfaces.
- **Do** use real, locally hosted landscape photographs with recorded source and license provenance.
- **Do** keep supporting text readable and homepage project demos free of photo backgrounds.
- **Do** retain the supplied logo, Manrope and each product's native theme.
- **Do** preserve native scrolling and stable navigation placement.
- **Don't** reintroduce the revoked orbital or sculpted-surface design contract.
- **Don't** generate replacement landscape art for this stock-photography revision.
- **Don't** treat decorative photos or service art as evidence of delivered products.
- **Don't** propagate inherited decorative eyebrows as a system primitive.
- **Don't** infer deployment, physical-device performance or new test results from this documentation.

