---
name: Lancer Agency — Original composition, dark glass
description: Original notch and CRM layout with quiet dark glass and source-capture device mockups.
colors:
  ink: "#f4f4f4"
  muted: "#aaaaaa"
  blue: "#dddddd"
  surface: "#141414"
  rim: "#ffffff18"
  accent: "#e5e5e5"
  action: "#f4f5f6"
  action-hover: "#dce4ea"
  glass: "#222222"
  roadmap-ink: "#f4f4f4"
  roadmap-copy: "#acbac5"
  roadmap-widget: "#2c2c2c"
  roadmap-selected: "#34424c"
  roadmap-focus: "#077ac4"
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
  project: "24px"
  roadmap-stage: "24px"
  roadmap-widget: "18px"
  navigation: "0 0 38px 38px"
spacing:
  gutter: "clamp(24px, 6vw, 160px)"
  mobile-gutter: "18px"
  project-gap: "26px"
  roadmap-layout-gap: "70px"
  roadmap-stage-gap: "26px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "#16191b"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  navigation:
    backgroundColor: "#141414f0"
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
    padding: "12px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Original composition, quiet dark glass."**

Retain the original notch, CRM hero, lower panels and complete section sequence. Dark graphite, pale type, subdued translucent panels and white actions replace the light photographic treatment. The user rejected the editorial alternative; its article/catalog composition is not active authority.

The restored styles establish geometry, while dark-glass.css loads last and controls materials. The supplied image logo remains, displayed with grayscale/invert and screen blending in this theme. No nature imagery is loaded and no new image generation was used.

**Key Characteristics:**

- Original notch and CRM composition.
- Quiet dark glass with thin low-contrast borders.
- White agency actions and pale blue accents.
- Exact product captures inside CSS device mockups.
- Retained case demos, roadmap and native scrolling.

## Colors

Surface supplies the graphite ground; ink and muted separate primary and supporting text. Glass supplies translucent charcoal panels. Blue and accent support selected states and icons. White actions use dark text. Embedded products retain their own palettes.

**The Original Composition Rule.** Preserve the restored layout and section sequence; apply the dark material without introducing the rejected editorial geometry.

## Typography

Retain the inherited Manrope hierarchy recorded in frontmatter. The homepage display remains clamp(48px, 4.7vw, 108px), with mobile clamp(30px, 8.2vw, 52px). Portfolio descriptions use 20px titles and 12px copy, reducing to 18px and 11px on mobile. Retained decorative eyebrows are not a reusable design requirement.

## Layout

The original viewport-wide hero centers the headline and CRM above two lower panels. Desktop fluid gutters, section order, two-column portfolio and content-driven mobile stacks remain. The CRM receives 18px padding and a 26px radius, reducing to 10px padding on mobile.

Desktop navigation retains the original fixed notch silhouette, top:0, 74px height and 10px 28px 16px padding. Mobile retains max(10px, env(safe-area-inset-top)), 49px height and min(340px, calc(100% - 36px)) width. Both scroll states share placement. The mobile header reserves space with 138px height and 82px top padding. The original side rail remains hidden on mobile; do not substitute an editorial header or case contents rail.

The five-stage roadmap retains its sticky desktop navigation, compact wrapped mobile links, ordered nodes, checkpoints, deliverables and local widgets. Case pages preserve the restored case layout and playable product exhibits. Inspect the full cascade, with dark-glass.css last, before altering geometry.

## Elevation & Depth

Agency glass uses a 1px #ffffff12 border, #222222 fill and 0 12px 35px #00000012 shadow. Polished pseudo-element bevels are suppressed. Shared desktop glass uses 12px backdrop blur. The mobile override removes blur from glass, top/side navigation, about surface and interactive stages; other specifically styled elements retain their own rules. Studio labels use 10px blur. This is source behavior, not a performance score.

**The Quiet Glass Rule.** Use subdued translucent fills and thin edges; do not restore bright glass bevels or landscape scenery.

## Shapes

Original rounded hero panels and CSS notch shoulders remain. Portfolio shells use 24px corners with 12px padding, reducing to 21px and 10px on mobile. Studio interiors use 15px corners. Device frames, keyboards, trackpads, plinths and camera details are CSS decoration surrounding real captures.

## Components

### Original agency sections

CRM tabs, local request workflow, service illustrations, custom-development block, roadmap, agency information, FAQ and contact remain. Service artwork is retained with reduced saturation and brightness. Contact scenery and orbital objects are hidden. Agency actions are white with dark text; hover shifts to a cool pale gray. The prior traveling button highlight is disabled.

### Static portfolio covers

src/project-cover.mjs maps 12К to its dashboard laptop and loyalty-phone capture; Maverick and Gift Roulette to paired phone captures; TailCare to its original desktop capture. No generated UI is substituted. Studio gradients and CSS plinths supply context without nature photos. Each full cover links to its case; homepage covers contain no product gameplay.

Studios are 360px high on desktop and 320px on mobile. Laptop and phone groups have restrained rotation and translate slightly on hover over 650ms, disabled under reduced motion. Captures use object-fit:cover aligned to the top inside device frames. The case exhibits retain the original interactive products and DEMOS.md simulation boundaries.

### Roadmap and motion

The roadmap retains task definition, design, development, QA and launch, with local design switching, task progression and acceptance checklist. Dark stage and widget materials replace pale surfaces without changing the process. No durations, metrics, staff identities or real project status are invented.

Native scrolling and stable navigation remain. Preserve reduced-motion behavior, keyboard controls, native disclosures and screenshot-dialog focus handling. This document records source-derived design, not fresh device testing, measured FPS or deployment.

## Do's and Don'ts

- **Do** preserve the original notch/CRM layout and complete section sequence.
- **Do** use subdued dark glass, thin borders and white agency buttons.
- **Do** compose device mockups around exact original product captures.
- **Do** retain interactive demos on cases and local roadmap behavior.
- **Don't** reintroduce nature backgrounds or the rejected editorial composition.
- **Don't** invent product imagery, business outcomes or performance claims.

Exact palette correction: user screenshot samples are #141414 for the page and #222222 for panels. UI glass, navigation and roadmap are neutral grayscale; screenshot pixels and product-cover staging retain their own colors. Final dark-glass.css overrides earlier theme rules.
