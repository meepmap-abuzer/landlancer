---
name: Lancer Agency — Model table
description: Compact graphite studio, reflective layered mark and shell-free product evidence.
colors:
  ground: "#161719"
  surface: "#202224"
  ink: "#f1f0ed"
  muted: "#b1b0ad"
  line: "#ffffff20"
  accent: "#d6a68b"
  hover-ink: "#fff"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(40px, 4.1vw, 60px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(25px, 2.3vw, 34px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.025em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-.025em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  faq:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  service-display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(34px, 3.5vw, 52px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.025em"
  case-display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(42px, 5.5vw, 78px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.025em"
  motif:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: "12px"
    lineHeight: 1.45
rounded:
  action: "6px"
  photo: "10px"
spacing:
  gutter: "clamp(22px, 3.2vw, 54px)"
  gutter-mobile: "20px"
  project-column: "28px"
  service-column: "44px"
  section: "65px"
  service-section: "60px"
  service-section-mobile: "42px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.hover-ink}"
  text-action:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
  project-window:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.photo}"
  service-row:
    padding: "22px 0"
  faq-row:
    typography: "{typography.faq}"
    padding: "17px 0"
  diagram-node:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.action}"
    padding: "17px 24px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Model table"**

Lancer presents software as a considered, assembled product. Graphite fields, pearl lettering, restrained copper and a reflective three-layer mark establish a quiet industrial studio. Photographic product presentations carry the evidence; short medium-weight headings and ruled information keep the surrounding interface compact.

The current identity applies to the homepage, service directory, six service pages and four case editorial shells. Original product captures and interactive demos keep their native product themes. Historical concept pages are separate artifacts. This system supersedes the garden, global particle field, pill actions, illustrated service cards and enclosing portfolio shells previously recorded here.

**Key Characteristics:**

- Compact type and generous horizontal relationships.
- Flat graphite fields, pearl text and restrained copper.
- Shell-free photographic work and thin ruled information.
- Tight action corners and softly clipped photo windows.
- One authored material object with damped, visibility-aware motion.
- Native disclosures and keyboard-operable production tabs.

## Colors

The palette is warm and neutral; copper locates a small interaction or connection rather than filling content surfaces. Frontmatter records the actual shared CSS values.

### Primary

- **Copper** (accent): logo layers, focus outlines, diagram checkpoints, selected-tab indicators and small ASCII companions.

### Neutral

- **Graphite** (ground): continuous page field and opaque sticky navigation.
- **Dark satin** (surface): photo placeholders, functional diagram nodes, image dialog and demo-stage surround.
- **Pearl** (ink): primary text and solid action backgrounds.
- **Warm gray** (muted): descriptions, prices, metadata and inactive navigation.
- **Translucent rule** (line): section, row and state boundaries.
- **Clear white** (hover-ink): brighter action and link response.

**The Product Theme Rule.** Apply the shared palette to Lancer's editorial shell; preserve the original product colors within captures and interactive demos.

## Typography

**Display Font:** Manrope, with Arial and sans-serif fallbacks.
**Body Font:** Manrope, with the same fallbacks.
**Label/Mono Font:** UI monospace / Consolas for the process motif; service ASCII uses Consolas / monospace.

Manrope is self-hosted in Cyrillic and Latin WOFF2 files, with weights 200–800 and font-display swap. Active headings use medium weight and restrained negative tracking. Supporting copy remains ordinary sentence case.

### Hierarchy

- **Display:** homepage offer; mobile uses clamp(33px, 6vw, 44px).
- **Headline:** shared section headings.
- **Title:** shared tertiary headings; ruled service and included-work titles use 18px.
- **Body:** shared base is 15px; homepage offer is 16px, service prose 14px and case/story prose generally 13px. Paragraphs keep a maximum of 65ch, with tighter local measures.
- **Action:** compact 13px, medium-weight control label.
- **FAQ:** shared 14px question and 13px answer at 1.8 line height.
- **Service display:** route offer, 36px below 750px; directory display is 35px on mobile.
- **Case display:** product name, 46px below 750px.
- **Motif:** small decorative mono drawing, never a substitute for readable product information.

**The Short Offer Rule.** Establish hierarchy with the actual title and a short useful description; keep detailed scope on service and case surfaces.

## Layout

The shared container is min(1680px, viewport width minus two gutters). Gutters become 20px at 750px. Native scrolling stays with the browser; anchor targets account for the sticky header.

The homepage header has a 64px minimum height, becoming 58px below 750px. The hero uses equal horizontal columns, a 36px gap and a 470px minimum height. The object stage is 370px high. At 1600px the hero minimum becomes 510px and object 410px. At 1000px and below the hero minimum is 430px and object 320px. Below 750px the offer and object stack, the hero loses its minimum height, and object is 280px; below 500px it is 270px.

Projects occupy a 12-column grid in 7/5 then 5/7 proportions, with 28px column and 46px row gaps. The second project begins 45px lower. Photo windows use a 1.85 ratio, changing to 2 on wide screens, 1.5 at 1000px and 1.4 below 750px. Tablet uses two equal project columns; below 500px there is one column and photo ratio returns to 1.5. Captions sit outside each photograph.

Six homepage service links use two ruled columns with a 44px gap and collapse to one below 750px. Four process tabs share one desktop row; below 500px they become 2×2. One panel is visible at a time. Its desktop minimum is 230px; below 750px it is content-sized, and below 500px its paragraph reserves only 72px. FAQ uses two desktop columns and one on mobile. Contact closes with a simple split composition and a large typographic wordmark.

Service heroes pair copy/facts/actions with a functional diagram, have a 460px minimum and stack below 750px. Included work uses two flat ruled columns and becomes one below 420px. Related cases use their actual count, up to three columns, and stack below 750px. Four roadmap stops share a desktop horizontal rule; mobile keeps a keyboard-focusable internally scrolling track with 210px stops. Pricing and its scope sidebar stack below 750px. AI examples use two columns, then one below 420px; each four-step mobile sequence uses a connected 2×2 snake below 750px.

Case openings are text only. Two generated device spreads alternate 0.8fr / 1.35fr copy/art relationships with a 75px gap; below 750px they become image-led vertical stories. Native demos occupy a larger right column and preserve their own dimensions. Capabilities use four columns, then two below 750px. Related cases use three, then two below 750px and one below 420px.

## Elevation & Depth

The editorial shell has no card shadows. Thin rules, section rhythm and the photographs establish separation. Sticky navigation is opaque, without backdrop glass. The authored Three.js object supplies physical material and perspective through rendered geometry. The image dialog uses a dark backdrop and flat satin surface. Existing native product-demo depth remains local to each product.

**The Flat Field Rule.** Keep editorial content on the shared field; use thin rules, spacing and artifact scale instead of enclosing cards or ambient panel shadows.

## Shapes

Actions and functional diagram nodes use tight corners (action radius). Photographs, generated device spreads, image dialog and demo-stage surround use the softer photo radius. Portfolio articles, service rows, price rows, capability descriptions and case tags have no enclosing rounded shell. Small circles remain valid as connection checkpoints and loading indicators.

## Components

### Actions

Primary actions pair pearl fill with graphite text, a small inline arrow and a minimum 44px target. Hover brightens the fill and lifts the action 2px; active returns it to rest. Text actions use a 44px target, inline arrow and hover underline. Shared focus is a 2px copper outline, offset 5px. The header CTA hides below 750px while navigation remains visible.

### Navigation

The compact wordmark has a copper inline layer mark. Links use warm gray at rest and pearl on hover/current state. Home/service navigation links to work, services and process; case navigation links to overview, screens and demo. A desktop case action returns to all work. Footer links and wordmark use ordinary typography on the shared field.

### Photographic work

The project window clips the cover; surrounding captions and arrows remain unboxed. Hover scales images to 1.025 over 650ms and moves the arrow 3px diagonally. Generated case spreads use a 1.018 hover scale and open the native image dialog. Captions distinguish interface visualizations from exact captures. This redesign generated no new raster.

### Ruled information and diagrams

Service links, included work, prices, capabilities and technology details use rules, factual text and restrained inline SVG marks. Functional diagrams show page structure, roles, Telegram/bot/Mini App connections, CRM states or success/error paths. Filled diagram nodes represent the diagram itself rather than an enclosing content-card pattern. AI sequences remain explicitly possible scenarios.

### Production tabs

Four buttons use tablist/tab/tabpanel semantics, aria-selected, aria-controls and roving tabindex. Click selects a panel; Left/Right, Home and End move selection and focus. Selected desktop arrows become copper and rotate 45 degrees. A selected panel has a brief 260ms, 4px settling transition. Compact mobile panels keep description and resulting deliverable together.

### Native FAQ and case disclosures

Native details/summary preserve keyboard access and a no-JavaScript fallback. Two authored strokes form the indicator; opening collapses the vertical stroke into a minus. Enhanced height changes use a 440ms cubic-bezier(.22,1,.36,1) transition, reverse from the current rendered height when interrupted, and settle immediately for reduced motion or hidden tabs. Closing answer text fades over 220ms and shifts 4px over 280ms; the FAQ indicator follows the requested closing state immediately. FAQ answer text is warm gray and question hover is copper. The first service FAQ starts open. Case architecture indicators share the drawn treatment.

### Layered Lancer object and small motifs

Three bevelled frame layers use silver, copper and satin physical materials with local environment lighting. One 950ms arrival assembles the stack. Pointer separation and tilt damp with an exponential 4.5/s response; hover expands separation by 0.28 world units. Tiny sinusoidal drift runs only while visible in an active tab. Touch keeps native vertical panning.

Reduced motion shows a complete static WebGL pose when supported. The inline layer SVG is the loading/failure fallback; renderer construction, dynamic import failure or context loss exposes it. The object loads near the viewport with idle scheduling where available. Decorative ASCII updates at 700ms intervals and stops offscreen, hidden or under reduced motion. The current shell has no global particles or recurring whole-section opacity entrances.

### Images and loading

Static image markup includes real src, alt and intrinsic dimensions; decorative linked repeats may have empty alt when an adjacent name supplies the link label. Native lazy loading, async decoding and responsive WebP candidates preserve content and layout before JavaScript. A nonblocking top progress line and local loading indicators support pending assets. Image-dialog source and caption are assigned before opening; closing returns focus to the invoking control.

## Do's and Don'ts

### Do:

- **Do** use the Model table palette, medium Manrope hierarchy and compact horizontal relationships.
- **Do** present photographic work without outer cards and keep captions outside the image.
- **Do** preserve native product themes, demo behavior and explicit simulation boundaries.
- **Do** keep native keyboard behavior, visible copper focus and static content fallbacks.
- **Do** distinguish generated interface visualizations from original product captures.
- **Do** stop decorative motion offscreen, in hidden tabs and for reduced motion.

### Don't:

- **Don't** restore the garden, global particles, pill actions or illustrated service-card grid as the current Lancer identity.
- **Don't** turn functional diagram nodes or local product-demo surfaces into a general content-card system.
- **Don't** invent business outcomes, durations, model names, benchmark scores or AI delivery claims.
- **Don't** replace inline SVG or drawn control indicators with text glyph icons.

Source authority: lancer.css, service-editorial.css, case-editorial.css, src/agency-home.mjs, src/studio-sections.mjs, src/agency-shared.mjs, src/service-pages.mjs, src/agency-cases.mjs, src/sculpture/brand-object.mjs and studio-world.mjs. Local finish evidence is .impeccable/review/redesign-finish-review.md and redesign-finish-verdict.md. The verdict clears four named material fixes alongside the prior complete review; it is not a new full-page review of the corrected build.

Not canonized or repaired by this documentation pass: inherited obsolete CSS selectors and dated homepage-exhibit/local-state claims in DEMOS.md. Textual arrows within functional diagrams remain valid descriptions of directed relationships; navigation and disclosure controls use SVG or authored strokes. Native product themes and historical concept artifacts remain intentional separate systems.
