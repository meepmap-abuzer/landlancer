---
name: Lancer Agency — Pixel maker studio
description: Graphite and electric lime editorial studio, a friendly frame-animated pixel maker and real product screens.
colors:
  ground: "#141415"
  surface: "#252527"
  ink: "#f4f4f4"
  muted: "#bdbdbf"
  line: "#f4f4f425"
  accent: "#bded52"
  accent-hover: "#ccf677"
  accent-wash: "#bded5214"
  action-text: "#171718"
  panel-wash: "#ffffff06"
  glass-pane: "#ffffff08"
  metadata-wash: "#f4f4f408"
  illumination-wash: "#ffffff0d"
  nav-tint: "#29292bbc"
  scene-ground: "#222225"
  scene-shade: "#0d0d1048"
  device-shell: "#39393c"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(32px, 4.05vw, 60px)"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-.035em"
  display-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(32px, 6.2vw, 45px)"
    fontWeight: 700
    lineHeight: 1.13
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-.035em"
  headline-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-.035em"
  scene-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(22px, 2.2vw, 34px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-.025em"
  process-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "-.02em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  compact-body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.65
  hero-support:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(15px, 1.7vw, 22px)"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 400
  case-display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(37px, 4.5vw, 66px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-.035em"
  service-display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(36px, 3.5vw, 54px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-.035em"
rounded:
  hero-action: "12px"
  action: "40px"
  nav-pill: "24px"
  nav-link: "30px"
  media: "12px"
  service-card: "20px"
  panel: "22px"
  scope: "16px"
  chip: "25px"
  contact: "10px"
  browser: "7px 7px 0 0"
spacing:
  gutter: "clamp(22px, 4.4vw, 70px)"
  gutter-mobile: "22px"
  project-gap: "16px"
  project-gap-mobile: "14px"
  service-gap: "22px"
  process-gap: "26px"
  process-gap-mobile: "30px 23px"
  footer-gap: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.action}"
    padding: "13px 21px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  hero-button:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.action-text}"
    typography: "{typography.action}"
    rounded: "{rounded.hero-action}"
    padding: "11px 26px"
    height: "48px"
  text-action:
    textColor: "{colors.muted}"
    typography: "{typography.action}"
    height: "34px"
  navigation:
    backgroundColor: "{colors.nav-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.nav-pill}"
    padding: "4px 12px"
    height: "46px"
  navigation-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.nav-link}"
    padding: "6px 14px"
    height: "38px"
  navigation-link-hover:
    textColor: "{colors.accent}"
  project-scene:
    backgroundColor: "{colors.scene-ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media}"
  service-card:
    backgroundColor: "{colors.glass-pane}"
    textColor: "{colors.ink}"
    rounded: "{rounded.service-card}"
    padding: "25px"
    height: "310px"
  service-card-hover:
    backgroundColor: "{colors.illumination-wash}"
  metadata-pill:
    backgroundColor: "{colors.metadata-wash}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "5px 11px"
  contact-link:
    backgroundColor: "{colors.glass-pane}"
    textColor: "{colors.ink}"
    rounded: "{rounded.contact}"
    padding: "9px 13px"
    height: "42px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "The Pixel Maker Studio"**

A friendly pixel maker gives this restrained digital studio a human introduction. Graphite grounds, pale Manrope and electric lime keep the interface calm; independently composited real product screens supply the proof and retain each product's own colors. Pixel sprites and the gray text-matrix portrait are distinct media.

The October 2 user-approved hybrid establishes the homepage and navigation from mock 03, process from mock 02, and footer from mock 01, while preserving the incumbent six service cards. This approved replacement supersedes the previous ASCII explorer, curved seam light and production-tab composition. The source supplies the observed token values recorded here; the approved comps and explicit substitutions retain composition authority.

**Key Characteristics:**

- Centered seated pixel human, bold offer and two clear actions.
- Quiet central frosted navigation pill with optional side branding.
- Landscape product scenes made from actual interface captures.
- Six matte service cards; hover illuminates without moving the card.
- Four static editorial process steps and a portrait-led open footer.

## Colors

The palette is graphite, pale gray and a selective electric lime action accent. Frontmatter values are normative; screenshots keep their native product palette.

### Primary

- **Electric Lime** (`accent`): primary actions, active or focused navigation text, small authored signal paths and the contact emphasis.
- **Lime Hover** (`accent-hover`): primary-action hover.
- **Lime Wash** (`accent-wash`): bounded signal backgrounds retained on service surfaces.

### Neutral

- **Graphite Ground** (`ground`): page and open footer.
- **Matte Surface** (`surface`): existing panel vocabulary and fallback grounds.
- **Pale Ink** (`ink`) and **Soft Gray** (`muted`): primary and secondary reading hierarchy.
- **Quiet Line** (`line`): section dividers, process connectors and metadata boundaries.
- **Glass Pane** (`glass-pane`) and **Illumination Wash** (`illumination-wash`): service/card grouping and the brighter hover state.
- **Navigation Tint** (`nav-tint`): central pill only.
- **Scene Ground / Shade** (`scene-ground`, `scene-shade`): readability behind real screens; they do not recolor those screens.

**The Product Color Rule.** Preserve the source interface palette inside project screens. The pale 12К portal and beige/red Maverick UI are part of the evidence.

## Typography

**Display Font:** self-hosted Manrope, with Arial and sans-serif fallbacks.
**Body Font:** the same Manrope family; product demos retain their own styling.

The type is plain, compact and editorial. Bold display and project titles carry the page; regular body copy and small gray labels provide the supporting detail. The footer's character matrix is raster artwork, not a display typeface.

### Hierarchy

- **Display:** the frontmatter display role is used for the centered hero; below 750px it uses the mobile role. Below 370px the observed hero size is 30px.
- **Headline:** homepage section titles use the headline roles; service/editorial sections retain the incumbent fluid heading scale.
- **Scene title:** bold project names inside the landscape scenes; mobile uses 25px except the bounded narrow-screen override.
- **Process title:** compact semibold steps; mobile uses 17px.
- **Body:** regular site prose; usual maximum line length is 65ch. Hero support allows 70ch desktop and 36ch mobile.
- **Compact body / label:** scene descriptions and process text use compact copy; functional mobile navigation, scene actions, legal links and metadata use at least the observed 11px role.

Copyright at 10px, mobile maker notes at 10px and decorative browser chrome at 8px are intentional secondary art details, not new functional reading defaults.

**The Human Title Rule.** Use a bold, direct main offer; keep supporting text short enough to sit beneath the maker as a calm centered stack.

## Layout

Canonical agency content has a 1560px maximum and fluid gutters; below 750px the incumbent gutter is 22px. The header's three-part row has its own 1280px maximum and 50px minimum height, with logo left, central navigation and optional studio phrase right. Home fixes it 14px from the top; service/case headers remain sticky. Home side branding fades after 90px scroll. At 1000px the studio phrase and outer action disappear; below 750px the header uses a 42px row and a 10px top offset.

The hero is content-sized, centered and compact. Its stage is 235px tall, with a fixed 256px sprite overlapping a shallow 390px browser ledge. Mobile uses a 202px stage, 224px sprite and 300px ledge. Above 1600px the explicit wide-screen sprite is 288px. These are stage dimensions, never animation targets.

Works uses a 2×2 equal desktop grid, a 16px gap and landscape ratio 2.18. At 1000px the ratio is 1.9; below 750px there is one column, 14px gaps and final ratio 1.55. Titles and descriptions sit left; independently composited screenshot devices sit right and a small guide sits at the base. The six preserved services use three columns desktop, two below 750px and one below 500px. Their desktop minimum is 310px, with the existing 270px intermediate and 300px mobile minimums.

Process is four static columns, with number and top rule above each title; below 750px it becomes 2×2. The footer has contact, navigation, signature and a large text-matrix portrait. Mobile has two columns with contact spanning the width. Case openings use copy beside a coherent real-screen scene, then stack below 750px; actual feature captures continue through each story.

**The Anchored Maker Rule.** Keep the maker's torso, head and laptop registered while frames switch. Frame selection changes pixel art, not the component's scale or body dimensions.

## Elevation & Depth

Open grounds and borderless matte panels are the default. One small frosted navigation pill carries backdrop blur (24px) with 105% saturation and the ambient shadow `0 8px 24px #0000001c`. Its outer row has no shadow or blur; the unsupported-filter fallback is a solid navigation ground. Project devices use a small structural shadow `5px 12px 23px #0000004d` to separate them from the decorative scene.

Service artwork and functional diagrams retain their transparent ground; content groups use tonal separation. Service hover changes the illumination wash without card or diagram translation. Native FAQ grounds stay transparent through closed, open and closing states.

**The Illumination Rule.** Service hover may reveal the authored arrow and brighten the matte ground; it must not move the card, screenshot or service diagram.

## Shapes

Media uses softly rounded rectangles; service cards retain the larger incumbent corners. The navigation is a shallow pill, not an encompassing glass header island. Browser and device frames are structural support for the maker and actual screen captures. Thin SVG lines, borders and process connectors explain relationships; they are not decorative perimeter boxes.

## Components

### Buttons

The hero action is a compact lime rectangle with the hero-action radius and semibold type. The incumbent service/case primary button retains its pill radius. Hover uses Lime Hover, and the hero/nav action stays in place. The quiet work link uses a lime underline and restrained gray text. Focus-visible uses the existing 2px lime outline with a 5px offset; project scenes use a 4px offset.

### Navigation

The pill carries four home/service destinations or three local case destinations. Links have transparent grounds and lime text on hover, focus or current state. The desktop logo and optional phrase sit outside the frosted pill. Mobile retains working navigation rather than adding a new menu pattern.

### Project scenes

A real screenshot is a separate image inside an authored CSS desktop/phone frame over one of two empty generated studio grounds. Screenshot alt text names the real interface; all decorative grounds and sprites are hidden from assistive reading. The linked scene includes its project name, short description and authored SVG arrow. All four destinations work without JavaScript.

### Service cards

Preserve the six headings, gray authored diagrams, starting prices, matte tint and incumbent dimensions. Prices are small rounded labels. Connection pulses retain visibility gating; hover uses illumination only. The card is a single real service link.

### Process

Use an ordered list of four static steps. Numbers and top rules sit above short titles and one paragraph. Retired tab-controller code in the shared runtime is not the current homepage component.

### Metadata and disclosures

Metadata pills retain small padded labels. FAQ, audience, handover and case architecture use native details/summary with functional plus/minus strokes. Enhanced disclosure height uses 440ms and reverses from the current height; reduced motion or hidden documents settle immediately.

### Pixel maker and footer portrait

Each maker is a four-cell, 2×2 native-alpha raster sheet (288×288), displayed with nearest-neighbor pixel rendering. Idle and guide frames redraw hand, blink and shoe pixels. Atlas selection compensates for measured rigid-region offsets: idle 20px horizontally and 4px vertically; guide 21px horizontally and 1px vertically, in 144px source cells. Only the selected cell changes in stepped time: idle 4.4s, guide 4.8s. Intersection visibility, document visibility and reduced motion gate loops; the first frame is useful without JavaScript.

Each frame is clipped to its own atlas quadrant before the registered translation. The default first-cell clip is `inset(0 50% 50% 0)`; matching clips on every stepped frame prevent neighboring-cell bleed without editing the source sheet.

The anonymous gray text-matrix portrait is an original transparent raster in the footer. It is neither the retired ASCII explorer nor a copied Pushkin portrait.

Work entrances are prepared in the head before first paint and run once over 860ms from 25px below. Desktop alternate columns delay by 100ms. Static/no-JS and reduced-motion content remains available; failed pending setup clears after 2.2s. This entrance does not animate the pixel character's dimensions.

## Do's and Don'ts

### Do:

- **Do** preserve actual product screens and their original colors.
- **Do** keep the pixel maker's rigid regions registered while selecting redrawn frames.
- **Do** illuminate the six service cards without translating or scaling them.
- **Do** retain native links, disclosures and static artwork before JavaScript.
- **Do** stop decorative loops when offscreen, hidden or reduced motion is requested.
- **Do** keep functional mobile navigation, action labels, legal links and metadata legible at the observed 11px minimum.

### Don't:

- **Don't** substitute invented interface screenshots for real product evidence.
- **Don't** use global squash, stretch, bob or scaling as the maker's frame animation.
- **Don't** restore the superseded ASCII hero, seam glow or homepage production tabs.
- **Don't** present generated scene grounds as photographs of Lancer's office or client devices.
- **Don't** turn 8px decorative browser chrome or 10px copyright into a functional text rule.

The source files `pixel-studio.css`, `frost.css`, `lancer.css`, `seo.css` and their generating modules establish these rules. This document records source evidence; it does not claim browser/comparison gates passed. Historical implementation selectors and retired image assets are not current visual authority.
