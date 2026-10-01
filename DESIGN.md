---
name: Lancer Agency — Compact dark studio
description: Dark studio with interactive particle field, editorial service images and readable case stories.
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
    fontSize: "clamp(34px, 3.5vw, 56px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.04em"
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
  case-cover: "24px"
  capability: "19px"
spacing:
  catalog-gap: "22px"
  section-gap: "70px"
  case-story-gap: "65px"
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

The homepage uses a interactive particle field scene with text on either side, four photographic project covers and a sequence of illustrated services, industries, process, FAQ and contact. Near-black and charcoal surfaces provide the frame; actual product stories remain the purpose. The CRM hero, workflow scene, long roadmap and CSS devices are superseded on this surface.

Homepage styling is scoped through studio-home.css, studio-world.css and the hero-specific particle-hero.css. Four case pages share case-editorial.css for their dark editorial shell; original screenshots and interactive productStage demos retain their product-specific content and behavior. Service routes remain intact.

**Key Characteristics:**

- Exact near-black ground and charcoal card surfaces.
- Compact typography-led hero and photographic covers.
- White pill actions and subtle sticky-header glass.
- Native process disclosures and flat FAQ rows.
- Editorial case stories with original product evidence and retained interactive demos.

## Colors

Ground and surface are the normative homepage pair. Ink supplies primary text and actions; muted gray supplies descriptions. Headline-muted softens the second hero line. Thin translucent white dividers organize lists, while control is used for tags and disclosure circles. Avoid introducing scenery or tinted glass throughout the homepage.

**The Scope Rule.** Apply the dark studio palette to homepage and case editorial shells; preserve native product themes inside screenshots and interactive demos.

## Typography

Manrope remains the inherited family. Hero typography uses the frontmatter display token, with a 42px size below 600px. Service and process titles use 23px, weight 500 and -.04em tracking; below 800px they use 20px. Project titles use 19px/1.3 and supporting copy 13px/1.5. Section titles use the headline token and become 34px below 800px. Existing small section labels and the hero kicker are observed markup, not a pattern to propagate as a new decorative type primitive.

## Layout

Main content is min(1320px, 93%). Particle hero uses 1.5fr / 1fr columns, a 670px minimum height and a full-area dotted canvas. Below 700px it stacks. Project grid and all remaining sections retain their existing breakpoints.

Process and FAQ use 1fr / 1.65fr columns with a 70px gap and 110px top spacing. Below 800px they stack with a 25px gap and 65px top spacing. The contact panel is a separate charcoal block with 52px padding, reduced to 30px 24px on mobile.

The homepage header is sticky at top:0 with 18px 3.5% padding. Below 800px it uses 14px 4%, hides the header CTA and the Agency word, but keeps the three navigation links visible. The homepage no longer uses the original notch or side rail. Cases use a separate readable sticky header without a notch.

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

Six service cards pair a title, description and service link with distinct generated editorial images from assets/services. provenance.json and adjacent metadata distinguish these illustrations from client screen captures. The grid has three columns, two below 900px and one below 540px. Five native details elements form the process accordion; shared name="process" requests exclusive opening in supporting browsers, and the first starts open. Each contains descriptive tags and two delivery blocks for the discussion/demo checkpoint and output. These are informational, not simulated task-status controls.

FAQ disclosures are flat rows with thin dividers. Preserve native summary keyboard behavior. The homepage anchor and summary focus ring is 2px white, offset by 5px.

### Actions and behavior

Homepage primary CTAs are white with dark text, at least 46px high. Header navigation stays visible on mobile while the header CTA hides. Reduced-motion CSS suppresses homepage transitions and animations. Native scrolling and the existing case demo/dialog behavior remain. No new performance score, device verification or deployment is implied by these source-derived rules.

### particle hero and footer

The homepage has a document-wide Canvas dot field: dense in the hero, sparse below, with gentle autonomous drift, cursor repulsion and spring return. A full-width authored Three.js lunar garden replaces the ASCII hero orb. Procedural grey rocks, terrain, gravel and instanced silver grass provide real depth; the grass has shader wind and bends around the cursor. One small ASCII cube remains in the process section. Pause and reduced motion stop animation; the garden stops rendering offscreen and all animation stops in hidden tabs. No Spline embed, remote scene or paid dependency remains. Desktop hero text uses two columns and stacks below 700px.

The homepage industry carousel is removed. Footer navigation uses four columns desktop and two mobile, with the dotted LANCER wordmark and abstract sculpture treatment. Preserve pause and reduced-motion behavior.

### Editorial case shell

case-editorial.css applies #141414 ground and #222 surfaces to all four cases. Content width is min(1220px,92%); stories alternate .85fr / 1.3fr columns with 65px gaps and stack below 800px. The 24px-radius cover has a 620px maximum height. The readable sticky header removes the old notch. Capability cards have 19px corners and four columns, two below 800px and one below 540px.

Actual screen captures appear in alternating stories and open the existing lightbox. Only retained productStage sections are interactive demos. Architecture disclosures, technology details, related projects and the footer complete each case. Preserve simulation boundaries and never call static screenshots live interfaces.

Current evidence: .impeccable/review/lunar-desktop.png and lunar-mobile.png. Desktop and mobile viewport, cursor response and pause checked locally; performance is not benchmarked across physical devices.

## Do's and Don'ts

- **Do** preserve the particle hero → projects → services → process → FAQ → contact sequence.
- **Do** keep homepage and case editorial shells scoped and product demos intact.
- **Do** distinguish generated photographic presentations from original product captures.
- **Don't** restore the CRM hero, workflow scene, long roadmap or CSS device constructions on the homepage.
- **Don't** invent generator model names, business outcomes or performance claims.
