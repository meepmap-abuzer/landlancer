---
name: Lancer Agency — Compact dark studio
description: Compact dark homepage with photographic product covers, native disclosures and retained case demos.
colors:
  ground: "#141414"
  surface: "#222"
  ink: "#f4f4f4"
  muted: "#aaa"
  headline-muted: "#a7a7a7"
  line: "#ffffff22"
  control: "#292929"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(42px, 5.3vw, 76px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-.065em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(28px, 3vw, 42px)"
    lineHeight: 1.16
    letterSpacing: "-.055em"
  button:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
rounded:
  action: "30px"
  project: "22px"
  photo: "13px"
  delivery: "16px"
  contact: "24px"
spacing:
  catalog-gap: "22px"
  section-gap: "70px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.action}"
    typography: "{typography.button}"
    padding: "12px 22px"
  project-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.project}"
    padding: "12px"
  process-delivery:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.delivery}"
    padding: "24px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Compact dark studio."**

The homepage uses a restrained text introduction, four photographic project covers and a short sequence of services, process, FAQ and contact. Near-black and charcoal surfaces provide the frame; actual product stories remain the purpose. The CRM hero, workflow scene, long roadmap and CSS devices are superseded on this surface.

This is a homepage-scoped system. studio-home.css loads after dark-glass.css only on the homepage. Case layouts, original screenshots, interactive demos and service routes retain their existing styles and behavior; do not apply homepage geometry globally.

**Key Characteristics:**

- Exact near-black ground and charcoal card surfaces.
- Compact typography-led hero and photographic covers.
- White pill actions and subtle sticky-header glass.
- Native process disclosures and flat FAQ rows.
- Unchanged product evidence and demos on case pages.

## Colors

Ground and surface are the normative homepage pair. Ink supplies primary text and actions; muted gray supplies descriptions. Headline-muted softens the second hero line. Thin translucent white dividers organize lists, while control is used for tags and disclosure circles. Avoid introducing scenery or tinted glass throughout the homepage.

**The Scope Rule.** Apply these tokens to the homepage; preserve the native product themes and existing case interfaces.

## Typography

Manrope remains the inherited family. Hero typography uses the frontmatter display token, with a 42px size below 540px. Service and process titles use 23px, weight 500 and -.04em tracking; below 800px they use 20px. Project titles use 19px/1.3 and supporting copy 13px/1.5. Section titles use the headline token and become 34px below 800px. Existing small section labels and the hero kicker are observed markup, not a pattern to propagate as a new decorative type primitive.

## Layout

Main content is min(1320px, 93%), reducing to 92% below 800px. The hero uses 1.6fr / 1fr columns, a 40px gap and 96px 0 72px padding. It becomes one column below 800px. The portfolio uses two columns, reducing to one below 540px. Covers maintain a 3:2 aspect ratio rather than a fixed device-stage height.

Services, process and FAQ use 1fr / 1.65fr columns with a 70px gap and 110px top spacing. Below 800px they stack with a 25px gap and 65px top spacing. The contact panel is a separate charcoal block with 52px padding, reduced to 30px 24px on mobile.

The homepage header is sticky at top:0 with 18px 3.5% padding. Below 800px it uses 14px 4%, hides the header CTA and the Agency word, but keeps the three navigation links visible. The homepage no longer uses the original notch or side rail. Existing case navigation is outside this change.

## Elevation & Depth

The header alone supplies the prominent homepage glass treatment: rgba(20,20,20,.93), 14px backdrop blur and a 1px #ffffff10 bottom edge. Cards, native disclosure delivery panels and the contact block are flat charcoal surfaces. Photo labels inherit their small overlay treatment; avoid claiming that every inherited blur rule has been removed.

**The Flat Content Rule.** Keep content surfaces flat and separate them with tone, spacing and thin dividers; reserve glass for the header and small image overlays.

## Shapes

Project shells use 22px corners and 12px padding, changing to 17px and 9px below 800px. Photo windows use 13px corners. Primary actions are 30px pills; service-icon blocks use 14px corners. Process tags use 8px corners; delivery panels use 16px. FAQ rows have no rounded card shell.

## Components

### Photographic project covers

src/project-cover.mjs loads assets/covers/maverick.webp, loyalty.webp, gift-roulette.webp and tailcare.webp as 1536×1024 image elements. They depict photographic device/product presentations generated from real UI references. They are not guaranteed pixel-identical screenshots; unchanged case captures and demos provide interface evidence. The available generator's model was not selectable. The four WebP files total approximately 621 KB; original outputs remain under .codex/generated_images.

Each cover links to its case. Images fill a 3:2 window using object-fit:cover and scale to 1.025 on hover over 450ms. No CSS laptop keyboard, phone frame or live gameplay remains in the homepage cards.

### Services, process and FAQ

Service rows pair an icon, title, description and case-independent service link. Five native details elements form the process accordion; shared name="process" requests exclusive opening in supporting browsers, and the first starts open. Each contains descriptive tags and two delivery blocks for the discussion/demo checkpoint and output. These are informational, not simulated task-status controls.

FAQ disclosures are flat rows with thin dividers. Preserve native summary keyboard behavior. The homepage anchor and summary focus ring is 2px white, offset by 5px.

### Actions and behavior

Homepage primary CTAs are white with dark text, at least 46px high. Header navigation stays visible on mobile while the header CTA hides. Reduced-motion CSS suppresses homepage transitions and animations. Native scrolling and the existing case demo/dialog behavior remain. No new performance score, device verification or deployment is implied by these source-derived rules.

## Do's and Don'ts

- **Do** preserve the compact hero → projects → services → process → FAQ → contact sequence.
- **Do** keep homepage changes scoped and case demos intact.
- **Do** distinguish generated photographic presentations from original product captures.
- **Don't** restore the CRM hero, workflow scene, long roadmap or CSS device constructions on the homepage.
- **Don't** invent generator model names, business outcomes or performance claims.

## Lunar garden, services and footer

Homepage loads studio-world.css after studio-home.css. Preserve #141414 canvas and #222 cards. Scene: charcoal basalt, glass botanical forms and a silver beetle, subtle ice-blue highlights; no external scene runtime. Landscape and transparent sprite in assets/garden carry generation provenance. Service grid: 3 columns desktop, 2 below 900px, 1 below 540px; cards use real screen previews and a small hover lift/scale. Industries are a native horizontal scroll-snap list, 260px cards, with desktop previous/next controls. Footer has four columns desktop/two mobile and dotted LANCER letters with staggered 6s movement. Reveal animations run once for 700ms; no always-running JS frame loop. User pause and prefers-reduced-motion disable decorative motion; CSS loops pause offscreen or in hidden tabs.
