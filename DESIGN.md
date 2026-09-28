---
name: Lancer Agency — Orbital
description: Quiet orbital surroundings with light product exhibits and retained icy blue.
colors:
  space: "#080e17"
  space-raised: "#111e2d"
  ice: "#c6e7ff"
  paper: "#f3f8fc"
  action: "#102e3a"
  action-hover: "#204755"
  focus: "#6fc8ff"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(46px, 5.1vw, 86px)"
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
  details: "14px"
  service-art: "18px"
  navigation: "30px"
spacing:
  gutter: "clamp(24px, 6vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "#fff"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Quiet orbital control room."**

The September 28, 2026 direction replaces the alpine and botanical agency environment with realistic-looking Earth in space. Near-black surroundings, white product surfaces and icy blue coexist within sections. Products remain the proof; Earth is the singular scenery anchor. Do not alternate fully black and fully white page bands.

This refresh supersedes the September 23 rules for nature imagery, wheel inertia, live SVG lenses and moving mobile header placement. Manrope, flat actions, real product content and playable demonstrations remain. PRODUCT.md contains earlier visual requests; this document and `../orbital-review/direction.md` describe the newer visual authority. DEMOS.md remains the source for simulation boundaries.

The September 28 user-supplied logo is authoritative. Preserve its geometry and colors on a light plate. Its agreed application is header, footer and central orbital mark. Source: `D:/загрузки/Изображение ChatGPT 28 сент. 2026 г., 15_54_28-1.png`. The exact 1983×793 RGBA source is retained as `assets/brand/lancer-original.png` (211393 bytes); the lossless 800×320 web asset is `assets/brand/lancer.webp` (28726 bytes). Header/footer plates are 202×59px on desktop and 146×44px on mobile; the central orbital plate is 240×78px / 200×64px. Centered 136% artwork sizing hides transparent margins without recoloring or distorting the mark. These source facts do not constitute new browser verification.

Key characteristics: quiet space, legible light exhibits, restrained blue, native scrolling, stable navigation and authentic product interfaces.

## Colors

### Primary

Icy blue connects Earth atmosphere, icons and accents. Dark actions sit on light surfaces; light actions reverse the relationship on dark surfaces. Preserve original palettes inside embedded products and screenshots.

### Neutral

Space supplies the page background; raised space distinguishes supporting regions. Paper describes the light surface family, with contextual cool-white tints in CRM, cards and disclosures. Pale text belongs on dark surroundings, navy text on light exhibits.

**The Shared Section Rule.** Compose light and dark elements within sections. Do not recreate alternating monochrome bands or recolor product screenshots to fit the agency palette.

## Typography

Manrope with Arial and sans-serif fallbacks serves display, body and controls. Existing local Cyrillic and Latin font files remain; Cyrillic is preloaded. Headlines use tight tracking and balanced wrapping. Frontmatter records the desktop hero scale, not a universal heading size.

At the orbital mobile breakpoint, the hero display uses `clamp(32px, 8.6vw, 52px)` and supporting copy is 15px. Desktop hero copy uses `clamp(16px, 1.3vw, 23px)`. The hero headline has no text shadow.

## Layout

The environment fills the viewport; fluid gutters organize content. The desktop hero centers white copy above Earth and a light CRM exhibit. Opposing light and dark lower panels share the scene. Product cards and case exhibits retain interactive content.

At 760px and below, hero panels and case feature orbit become one column, Earth uses a dedicated mobile crop, and the header reserves navigation space. Retain inherited content-driven mobile heights, touch controls and stacked product layouts. Existing layout rules also refine 370px and 2000px widths; inspect the cascade before extending them.

Navigation is fixed to the viewport outside clipped scenes. Desktop top is 14px. Both phone states use `max(10px, env(safe-area-inset-top))`, with 52px height, width `calc(100% - 36px)` and inherited 390px maximum. Scrolling must not reposition the capsule.

**Recorded browser evidence for this revision:** at 375px, the previous navigation moved from 61px to 10px on scroll; after the fix it measured 10px before and 10px after. Six checked routes had no horizontal overflow at 375px. These are browser geometry observations, not physical-device FPS measurements or verification of every viewport.

Earlier revisions recorded broader Chromium viewport matrices and demo checks. Those remain historical results, not fresh regression evidence for the orbital change. Safari, physical iOS/Android rendering and hardware FPS remain unverified. This documentation update does not imply deployment.

## Elevation & Depth

Earth, tonal contrast, borders and selected static shadows provide depth. CRM retains a broad shadow and white inner rim; navigation has a small ambient shadow. Most supporting cards and flat buttons have no raised shadow. Orbital overrides disable backdrop filters on shared glass/navigation surfaces and glass pseudo-elements. Background attachment is scrolling.

**The Static Material Rule.** Do not restore live displacement sampling, SVG lenses or blur as the default agency material. The shared head no longer loads the optical runtime or Lenis. Retained source files are historical material, not activation instructions.

Historical research: [CSS/SVG liquid glass](https://kube.io/blog/liquid-glass-css-svg/), [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter), [Jon Barber](https://jonbarber.co/lab/liquid-glass), [Telegram native glass](https://github.com/TelegramMessenger/Telegram-iOS/blob/master/submodules/TelegramUI/Components/GlassBackgroundComponent/Sources/GlassBackgroundComponent.swift), [Telegram measured tabs](https://github.com/Ajaxy/telegram-tt/blob/master/src/components/common/AnimatedTabList.tsx), and [Lenis](https://github.com/darkroomengineering/lenis). These informed earlier experiments and do not supersede the current native-scroll and static-material decisions.

## Shapes

Actions have compact corners, supporting cards soft rectangles, and navigation a capsule. Dark section surroundings use straight edges. Service art uses line icons and overlapping rounded outlines instead of nature art. Static elliptical tracks define the team orbit.

Generated scenery: `assets/art/orbital-earth.webp` (275154 bytes), `assets/art/orbital-earth-mobile.webp` (99076 bytes). Provenance belongs in ASSET_PROVENANCE.md and ART_PROMPTS.md. The homepage preloads the matching desktop/mobile image. Cases use CSS atmosphere; the contact region reuses Earth. Generated imagery is never product evidence.

## Components

### Buttons

Flat and direct; primary values are in frontmatter. Contextual light actions support dark sections. Hover changes color, with inherited traveling highlight and arrow movement; active scale is .96. Keyboard focus uses a 2px icy-blue outline offset by 5px. No bevel or raised shadow.

### Navigation

The dark capsule contains a light measured selection pill. Selection responds to hover, keyboard focus and section observation; measurements update on resize and font readiness. The pill transform transitions over 350ms. Capsule dimensions and placement do not animate on scroll. The dark side rail is hidden on mobile.

### Cards and disclosures

Light project cards frame products without changing their themes. Project hover lift is 3px. Case features retain dark surroundings; light details and FAQ disclosures provide contrast, with a brighter FAQ open state. Preserve native summary/details interaction and screenshot dialog focus restoration.

### Demonstration controls

CRM tabs, the local request example and embedded products retain existing functional boundaries. Decorative mock form rows are not an agency data-entry form. Product inputs belong to their respective product systems.

### Motion and scrolling

Wheel and touch scrolling are native. `experience.mjs` has no Lenis wheel interception or perpetual scroll animation loop. Native anchor smoothing remains except under reduced motion. Limited one-time heading reveals use 550ms opacity/16px translation with up to 180ms stagger. The main heading is visible immediately. Reduced motion disables reveals and relevant transitions. Implementation choices alone do not prove a measured FPS improvement.

## Do's and Don'ts

- **Do** keep Earth subordinate to readable content and actual products.
- **Do** combine dark surroundings, white surfaces and pale blue within sections.
- **Do** retain Manrope and preserve the supplied logo's colors and proportions.
- **Do** keep mobile navigation at one safe-area-aware vertical position.
- **Do** inspect the cascade: orbital.css loads after shared, experience, product, mobile and SEO styles.
- **Do** distinguish browser geometry, historical tests and unverified hardware performance.
- **Don't** restore nature scenery, Lenis, live SVG lenses or scroll-driven header repositioning.
- **Don't** fabricate outcomes, recolor real product screens or present generated scenery as product evidence.
- **Don't** treat this update as deployment approval or proof of Safari/device testing.
