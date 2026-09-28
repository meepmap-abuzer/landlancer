---
name: Lancer Agency — Sculpted orbital glass
description: Clear sculpted glass over Earth and dark space, with authentic product exhibits.
colors:
  space: "#080e17"
  space-raised: "#111e2d"
  ice: "#c6e7ff"
  paper: "#f3f8fc"
  action: "#102e3a"
  action-hover: "#204755"
  focus: "#6fc8ff"
  glass-edge: "#e5f5ffb8"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(44px, 4.9vw, 78px)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-.04em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    lineHeight: 1.5
  service-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(18px, 1.4vw, 24px)"
  button:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  action: "9px"
  details: "14px"
  support: "24px"
  project: "34px"
  scene: "42px"
  hero: "64px"
  service: "34px 34px 16px 34px"
spacing:
  gutter: "clamp(24px, 6vw, 160px)"
  service-gap: "22px"
  scene-margin: "12px"
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
    width: "clamp(440px, 38vw, 580px)"
    height: "74px"
    padding: "10px 64px 16px"
  service-card:
    rounded: "{rounded.service}"
    padding: "18px 22px 46px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Sculpted orbital glass."**

Earth supplies the atmosphere; clear optical surfaces, polished white edges and asymmetric contours frame real interfaces. Black, white and ice coexist within each section. Glass continues through services, workflow, projects and case exhibits without recoloring the embedded products.

The user-pinned Orizon reference establishes continuous curved contours, the top notch and asymmetric lower panels. The implemented world preserves Manrope and the supplied Lancer logo. The logo retains its geometry and colors on light plates; assets/brand/lancer-original.png is the retained source and assets/brand/lancer.webp is the web asset. Earlier alpine scenery, opaque-card and capsule-navigation rules are superseded by this refresh.

**Key Characteristics:**

- Earth and dark space behind transparent surfaces.
- Continuous sculpted contours and white reflective edges.
- Complete optical-glass service sculptures.
- Authentic product palettes and interactive exhibits.
- Native scrolling and vertically stable navigation.

## Colors

### Primary

Icy blue connects atmospheric light, glass edges and supporting controls. Preserve each product's original colors inside demos and real captures.

### Neutral

Space and raised space support white text and pale translucent panels. Paper describes the cool-white surface family. Action and action-hover supply flat dark controls on light surroundings; contextual light actions reverse that relationship on dark surroundings. Focus supplies the visible keyboard ring.

**The Shared Section Rule.** Compose dark atmosphere and light transparent surfaces within sections; preserve the native palettes of embedded products.

## Typography

Manrope with Arial and sans-serif fallbacks serves headings, body and controls. Local Cyrillic and Latin font files remain, with Cyrillic preloaded. The display token describes the desktop hero, with tight tracking and no text shadow. Mobile hero display uses clamp(30px, 8.3vw, 48px); hero supporting copy is 14px on mobile and clamp(16px, 1.3vw, 23px) on desktop. Service copy uses 14px/1.6 on desktop and 12px/1.55 on mobile, with 17px mobile service titles and 16px at the narrowest breakpoint.

Do not propagate decorative eyebrow labels as a system primitive. The redundant services, case-project and product-in-action labels were removed in this revision.

## Layout

The hero is a framed Earth scene with centered copy, translucent CRM and opposing asymmetric lower panels. Its desktop margin is 12px, with a 64px outer and 58px inner radius. Lower panels use 37% side columns separated by flexible space; mobile stacks them without clipping their curved silhouettes. The desktop CRM is 77% wide with a 1060px maximum; the intermediate layout uses 83%, and mobile uses calc(100% - 26px).

Navigation is fixed outside clipped scenes. Desktop top is 12px, with frontmatter dimensions. At 761–1100px it is 420px wide with 60px horizontal padding. At 760px and below it is 7px from the top, min(390px, calc(100% - 26px)) wide and 64px tall, with 8px 44px 12px padding. Both normal and scrolled selectors use identical placement and transition:none. The mobile hero margin is 7px and its radius is 34px. Inset hero and section shells use width calc(100% - 24px) on desktop and calc(100% - 14px) on mobile so their margins remain inside the viewport. The side rail is hidden on mobile.

Service illustrations occupy square containers at every size. Cards and product layouts adapt to content; mobile feature groups stack. The final sculpted section in orbital.css wins over inherited orbital, mobile and experience rules. Inspect the cascade before extending these surfaces.

## Elevation & Depth

Static reflective gradients, translucent fills, white rims and modest shadows create the liquid-glass impression. The CRM uses the shared glass shadow: inset 0 1px 0 #fff, inset 0 -2px 0 #a9d9f35c, 0 18px 40px #0003. Supporting glass uses inset 0 1px 0 #fff, inset 0 -2px 0 #93bed338, 0 12px 28px #020f201c. The case exhibit uses inset 0 1px 0 #fff, 0 18px 38px #0002.

**The Static Reflection Rule.** Build optical depth with static gradients and edges; retain only the 2px desktop CRM blur and 3px side-rail blur, with no backdrop displacement or live lens runtime.

## Shapes

The top notch and lower hero panels are continuous Bézier SVG silhouettes from src/sculpted-surfaces.mjs, not polygon clips or rounded rectangles. Decorative SVGs are aria-hidden and ignore pointer events; semantic text and controls sit above them. A 2px non-scaling gradient stroke follows each contour. The notch has a shallow center tray and flowing shoulders; lower panels have different inward curves and asymmetric bottoms.

Service cards have asymmetric soft corners. Project cards, supporting cards and section shells use the frontmatter radii, adapting to 28px, 21px and 30px respectively on mobile. The side rail uses 30px 30px 34px 12px corners. Header logo plates retain asymmetric 20px 8px 20px 8px corners.

## Components

### Actions and navigation

Actions remain flat, with compact corners, a traveling highlight on hover and .96 active scale. Keyboard focus is a 2px icy outline offset by 5px. The navigation's selected pill is measured from links and moves on hover, keyboard focus and section observation; only its transform transitions over 350ms. The containing notch never moves on scroll.

### Service sculptures

Four transparent 640-square WebP assets depict websites, Mini Apps, CRM and automation. They are complete optical-glass illustrations in square containers using object-fit:contain, not cropped icons. The HTML currently reserves a square 1024×1024 ratio; that attribute is not the encoded asset resolution. Hover raises the art by 10px, disabled under reduced motion. These are decorative illustrations, not product evidence.

### Glass cards and case exhibits

Glass continues through services, workflow, project stages, delivery-stage cards, disclosures and case features. The case exhibit's outer surface is transparent dark glass with pale explanatory copy; its embedded demo keeps its original product styling. Homepage project cards retain a 3px hover lift. Native details and the screenshot dialog retain their existing interaction and focus behavior.

### Demonstrations and motion

CRM tabs and the request example remain local demonstrations. Source-derived product islands keep their functional and simulation boundaries in DEMOS.md. Decorative form rows are not a real agency input form. There is no standalone agency text-field primitive to document.

Wheel and touch scrolling are native. experience.mjs has neither wheel interception nor a perpetual scrolling RAF. Native anchor smoothing yields to reduced motion. Selected subordinate headings use one-time 550ms opacity and 16px translation reveals, staggered by 60ms up to 180ms; the main heading is immediately visible. This implementation does not prove an FPS score or physical-device performance.

## Do's and Don'ts

- **Do** keep Earth visible through the hero glass and preserve readable content.
- **Do** retain the supplied logo's geometry and colors and the Manrope identity.
- **Do** use complete contained service sculptures and authentic product interfaces.
- **Do** keep the navigation's vertical position stable during native scrolling.
- **Do** inspect the final CSS cascade before changing a shared surface.
- **Don't** replace the sculpted contours with polygon cuts or a generic capsule.
- **Don't** restore wheel interception, perpetual scroll RAF or backdrop displacement.
- **Don't** recolor demos, invent business results or treat generated art as product evidence.
- **Don't** propagate decorative eyebrows as a reusable design pattern.
- **Don't** infer deployment or measured hardware performance from this documentation.
