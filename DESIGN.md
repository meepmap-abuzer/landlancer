---
name: Lancer Agency — Monochrome studio
description: A restrained digital studio with graphite grounds, pale Manrope, a saffron action accent, borderless frosted groups and authored interface geometry.
colors:
  ground: "#141415"
  surface: "#252527"
  ink: "#f4f4f4"
  muted: "#bdbdbf"
  line: "#f4f4f425"
  accent: "#e4c369"
  accent-hover: "#f0d58d"
  accent-wash: "#e4c36914"
  action-text: "#171718"
  panel-wash: "#ffffff06"
  nav-wash: "#ffffff0a"
  price-wash: "#ffffff0d"
  selected-wash: "#e4c36914"
  caption-tint: "#141417ad"
  service-matte: "#1e1e20"
  diagram-matte: "#1d1d20"
  open-wash: "#f4f4f409"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(40px, 4.2vw, 64px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(28px, 2.6vw, 42px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-.035em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-.02em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  text-action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  faq:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  service-display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(36px, 3.5vw, 54px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-.035em"
  case-display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(46px, 4.6vw, 68px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.035em"
  motif:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: "12px"
    lineHeight: 1.45
rounded:
  action: "40px"
  nav-link: "30px"
  media: "22px"
  panel: "20px"
  scope: "16px"
  caption: "15px"
  disclosure-open: "14px"
  tab: "12px"
  chip: "25px"
  diagram: "18px"
  node: "6px"
spacing:
  gutter: "clamp(22px, 4.4vw, 70px)"
  gutter-mobile: "22px"
  project-gap: "24px"
  service-gap: "22px"
  card-gap: "18px"
  service-section: "68px"
  service-section-mobile: "44px"
  home-section-end: "90px"
  home-section-end-mobile: "64px"
effects:
  glass-pane: "linear-gradient(135deg,#ffffff26 0%,#ffffff0a 55%,#ffffff12 100%)"
  glass-caption-highlight: "linear-gradient(120deg,#ffffff0f,transparent 60%,#ffffff05)"
  glass-filter: "blur(24px) saturate(105%)"
  glass-shadow: "0 14px 34px #00000026"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.action-text}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "13px 21px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  text-action:
    textColor: "{colors.ink}"
    typography: "{typography.text-action}"
  navigation:
    backgroundColor: "transparent"
    backgroundImage: "{effects.glass-pane}"
    backdropFilter: "{effects.glass-filter}"
    boxShadow: "{effects.glass-shadow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "6px"
  navigation-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.nav-link}"
    padding: "8px 19px"
  project-caption:
    backgroundColor: "{colors.caption-tint}"
    backgroundImage: "{effects.glass-caption-highlight}"
    backdropFilter: "{effects.glass-filter}"
    boxShadow: "{effects.glass-shadow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.caption}"
    padding: "16px 19px"
  service-card:
    backgroundColor: "transparent"
    backgroundImage: "{effects.glass-pane}"
    boxShadow: "{effects.glass-shadow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "25px"
  price-chip:
    backgroundColor: "{colors.price-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "6px 11px"
  included-card:
    backgroundColor: "transparent"
    backgroundImage: "{effects.glass-pane}"
    boxShadow: "{effects.glass-shadow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.scope}"
    padding: "26px"
  diagram-panel:
    backgroundColor: "transparent"
    backgroundImage: "{effects.glass-pane}"
    backdropFilter: "{effects.glass-filter}"
    boxShadow: "{effects.glass-shadow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.diagram}"
    padding: "28px"
  process-tab:
    backgroundColor: "{colors.panel-wash}"
    rounded: "{rounded.tab}"
    padding: "16px 20px"
  process-tab-selected:
    backgroundColor: "{colors.selected-wash}"
    textColor: "{colors.accent}"
  process-panel:
    backgroundColor: "transparent"
    backgroundImage: "{effects.glass-pane}"
    backdropFilter: "{effects.glass-filter}"
    boxShadow: "{effects.glass-shadow}"
    rounded: "{rounded.panel}"
    padding: "32px 200px 32px 32px"
  faq-row:
    typography: "{typography.faq}"
    padding: "19px 0"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Monochrome studio"**

Lancer's editorial shell uses graphite fields, pale lettering and quiet tonal groups. Regular Manrope headings give short offers room; authored interface windows, routes and cursor geometry make digital work visible without decorative interior photography. Large groups are borderless. Thin strokes inside diagrams describe interfaces and relationships.

The user's October 2 accent amendment adds warm saffron (#e4c369) to primary contact actions, focus/selection, selected process and navigation states, directional arrows and the hero's moving routes and launch node. The graphite grounds and pale headings stay neutral. Resting project arrows remain pale; hover or keyboard focus makes them saffron. Product interfaces preserve their own palettes.

This is the user's approved monochrome amendment to the established homepage, service directory, six service pages and four case shells. It preserves their structure and working demonstrations. Homepage work covers are individually generated device visualizations grounded in original product captures, with neutral graphite and silver surroundings. Real screenshots on service proof cards and native product demos retain their source colors.

**Key Characteristics:**

- Neutral black, gray and white agency surfaces.
- Self-hosted Manrope with regular display weight and compact supporting copy.
- Borderless matte groups, capsule actions and gently curved media.
- Meaningful interface geometry and bounded opening compositions.
- Equal project and service geometry within each responsive grid.
- Visible static content, keyboard access and restrained motion.

## Colors

The palette uses pale type and gray emphasis on a continuous graphite field; the frontmatter is the normative token source.

### Primary

- **Saffron** (accent): primary contact actions, focus, selection, selected-tab arrows, roadmap points, meaningful digital routes and launch.
- **Light saffron** (accent-hover): primary-action hover.
- **Saffron wash** (accent-wash): selected process and current navigation grounds.

### Neutral

- **Graphite** (ground): continuous page field.
- **Dark gray** (surface): functional diagram nodes and native structured examples.
- **Pale white** (ink): headings, ordinary navigation, secondary return actions and resting project arrows.
- **Soft gray** (muted): descriptions and secondary information.
- **Quiet line** (line): disclosure, price and functional editorial dividers.
- **Action graphite** (action-text): lettering on solid pale controls.
- **Matte wash** (panel-wash): scope, process, example and capability groups.
- **Navigation wash** (nav-wash): the capsule navigation and case-category pills.
- **Price wash** (price-wash): the borderless starting-price pill.
- **Selected wash** (selected-wash): the saffron-tinted selected production tab, with saffron type and aria-selected semantics.
- **Graphite caption** (caption-tint): readable image-overlay captions.
- **Service matte** (service-matte) and **diagram matte** (diagram-matte): grounds for authored service graphics.
- **Open wash** (open-wash): expanded disclosure state.

**The Product Theme Rule.** Apply monochrome to Lancer's editorial shell; preserve original interface colors inside product captures, generated device visualizations and interactive demos.

## Typography

**Display Font:** Manrope, with Arial and sans-serif fallbacks.
**Body Font:** Manrope, with the same fallbacks.
**Label/Mono Font:** UI monospace / Consolas for the decorative process drawing; service ASCII uses Consolas / monospace.

Manrope is self-hosted in Cyrillic and Latin WOFF2 files, with variable weights 200–800 and font-display swap. Regular display weight and close tracking establish the calm voice. Medium tertiary titles and sentence-case action labels support everyday reading.

### Hierarchy

- **Display:** homepage offer. Compact desktop uses 46px at 1100px, mobile 40px at 750px and 36px at 500px.
- **Headline:** the shared section-title ramp. Functional service headings use 34px, becoming 28px on mobile; case-story headings use 30px, becoming 25px.
- **Title:** the tertiary base. Project captions use 23px; service and included-work titles use 18–19px.
- **Body:** the base paragraph rhythm. Offer, service and case copy generally use 14–15px; compact metadata uses 11–13px. Paragraphs have a 65ch maximum, with tighter local measures.
- **Action / text action:** solid controls and secondary links use the separate recorded roles.
- **FAQ:** question text; answers use 14px and a 1.8 line height.
- **Service display:** individual offers, becoming 35px below 750px.
- **Case display:** centered product names, becoming 46px below 750px.
- **Motif:** decorative drawing with no information role.

**The Useful Type Rule.** Let the actual offer, project name and useful description create hierarchy; detailed scope belongs in the supporting content.

## Layout

Content is at most 1560px wide, with the recorded fluid gutters. Below 750px the gutter is 22px. Native scrolling and anchor links remain available.

The homepage navigation floats over a full-width opening. Inner-page navigation stays in normal flow. The navigation row has a 70px minimum, becoming 64px below 750px. The desktop hero is 570px high, 540px at the compact 1100px breakpoint and 610px at 1800px and above. A left offer and two actions face a meaningful authored interface assembly. Below 750px the hero becomes content-sized, with copy above a bounded scene and no mandatory viewport height.

Four homepage projects share equal two-column geometry and a 24px gap, becoming one column below 500px. Their media ratio is 1.55 on desktop, 1.1 on tablet and 1.25 on narrow mobile. Captions overlay the bottom of the generated device covers. Service proof cards use actual captures with their own screen-fitting inset, rather than reusing those generated homepage covers.

Six service cards share three equal desktop columns and a 22px gap. They become two columns below 750px and one below 500px. The final desktop ratio is 1.25 with a 310px minimum; compact desktop uses a 270px minimum and mobile a 300px minimum. The artwork is a contained SVG interface diagram under the title and above the price.

Homepage section ends use the recorded 80–90px desktop / 64px mobile rhythm. Service sections use the 68px / 44px rhythm. Four production tabs form a desktop row and become 2×2 below 500px. Their panel has a 190px desktop minimum and fits content below 750px. FAQ uses two desktop columns and one mobile column. A plain dark contact close and subdued large wordmark finish the shell.

Service heroes pair copy, facts and actions with an authored diagram. A separate functional diagram explains the system. Scope cards use three columns, two on tablet and one below 500px. Four roadmap stops stay horizontal; mobile scrolls within a focusable track with 240px stops. Price rows remain open and ruled beside a matte scope aside. AI examples retain connected four-step flows, becoming a compact 2×2 sequence on mobile.

Case openings and story introductions are centered single-column compositions with bounded copy, pills and a demo action. No outer opening box or empty right text column remains. Alternating device spreads, source-style demos, capabilities and architecture keep the established structure. Story and demo sections stack below 750px; capability cards use four full-desktop columns and two at 1100px.

**The Bounded Stage Rule.** Keep openings proportionate to their useful content; mobile text and diagrams establish their own height.

## Elevation & Depth

The user's later October 2 amendment restores frosted glass. Depth comes from transmitted imagery, a broad diffuse highlight, overlapping interface geometry and the generated device covers. Shared grouped panels use the glass-pane and glass-shadow effects, with no perimeter frame. Solid actions are flat at rest. Product-demo shadows remain local to their product.

Navigation, image captions, process panels, pricing asides, shared frost groups and service hero artwork use the 24px glass filter. Smaller scope/service groups share the diffuse material without adding individual backdrop filters. Image captions use a 68% dark tint and pale body text for readable transmission; they no longer use the former 80% flat tint. The image-dialog backdrop stays at 14px. A final support fallback supplies opaque #252527 when neither standard nor WebKit backdrop filtering is supported. Reflections and blur are static, not continuously animated. Case openings and the contact close remain open compositions. Border removal still supersedes older frosted-border declarations.

**The Tonal Grouping Rule.** Separate major groups with diffuse translucent panes and spacing. Reserve thin strokes for functional relationships and dividers.

## Shapes

Actions and navigation use capsules; nav links use a tighter capsule. Project media and device spreads use the media radius, becoming 18px on mobile. Service cards and process panels use the panel radius. Scope and capability cards use the scope radius. Captions and expanded disclosures use their own smaller curves. Prices and category labels are pills. Functional diagram nodes use compact corners, and small circular arrow controls remain directional actions.

Centered case openings and the closing contact area are open compositions without a surrounding card shape.

## Components

### Actions

Saffron primary contact actions use dark lettering, inline SVG arrows, the recorded padding and a 48px minimum target. Hover changes to light saffron and rises 2px; active returns to rest. Case-return controls stay pale and secondary. Text actions have a 44px target, saffron arrows and hover underline. Keyboard focus is a 2px saffron outline, offset 5px. Header CTA and case-return controls hide below 750px while navigation remains visible.

### Navigation

An authored layer SVG and Manrope wordmark anchor the capsule. The navigation has a subtle wash, a 6px inset, no perimeter border and a restrained translucent hover/current state. The homepage places it over the opening field; inner pages keep it in normal flow. Link padding narrows responsively to fit the same visible routes.

### Project media and service cards

Equal homepage media hold generated graphite/silver device covers with colored product interfaces. A dark borderless caption overlays each cover with a circular inline arrow. Image hover scales to 1.045 over 900ms; the arrow rotates 45 degrees. Service proof previews use actual screenshots; phone captures are contained vertically and wide captures are fitted at the top.

Six service links use equal matte cards with authored SVG graphics, short titles/descriptions and a borderless starting-price pill. The whole card rises 4px over 550ms; its diagram rises 5px over 700ms. Case-story device spreads retain image dialogs and explicit visualization captions.

### Scope cards and functional diagrams

Scope cards use a subtle wash, no perimeter border, concise copy and an inline SVG. Desktop padding is 26px, tablet 21px and narrow single-column 22px. Practical maps, Telegram connections, CRM states and error/success paths sit in borderless grouped fields. Diagram strokes retain their functional purpose. All three website branches join both buses, with 24px vertical connectors and gap-corrected horizontal spans.

### Chips

Starting-price pills have a quiet translucent fill, no border and no blur. Their source fill is slightly stronger than category pills. Case-category pills use the navigation wash and no perimeter stroke. These labels describe price scope or category rather than an interactive filter.

### Production tabs

Native buttons use tablist/tab/tabpanel semantics, aria-selected, aria-controls and roving tabindex. Click selects; Left/Right, Home and End move selection and focus. The selected button gets the selected wash and an accent arrow rotated 45 degrees. The panel settles by 4px over 260ms. Mobile keeps description and deliverable together and hides the decorative drawing.

### Native disclosures

FAQ, audience, handover and case architecture preserve details/summary behavior without JavaScript. Two authored strokes form plus/minus indicators. FAQ hover uses the accent; expanded answers receive a curved wash. Enhanced height transitions take 440ms with cubic-bezier(.22,1,.36,1), reverse from the current rendered height and settle in hidden tabs or reduced motion. Closing text fades over 220ms and shifts 4px over 280ms. The first service FAQ starts open.

### Interface assembly and motion

The hero's idea, interface, system and launch geometry is a decorative digital illustration. It carries no performance metric or claim about a delivered product. Authored stroke arrows replace text glyphs; AI flow arrows likewise use drawn chevrons.

The scene settles from blur 4px and a 12px shift over 1200ms; copy settles over 900ms. Project, service, diagram and story entrances are visible by default, run once for 650ms and stagger by at most 150ms. The common ease is cubic-bezier(.16,1,.3,1). Reduced motion skips entrances, finishes active ones and removes CSS animations/transitions.

Connection pulses take 5.6s and cursor/click cycles 8s. They run only while a scene intersects the viewport, the document is visible and reduced motion is off. Small ASCII motifs update at 700ms under the same visibility policy. The homepage emits no brand-object element and mounts no continuous WebGL scene.

**The Visible Default Rule.** Useful text, media and diagrams are present before JavaScript; decoration must pause offscreen, in hidden documents and under reduced motion.

### Images and browser surfaces

Images retain real sources, alt text, intrinsic dimensions, async decoding, native lazy loading and responsive WebP candidates. Current work-cover originals are 1536×1024 with 768px derivatives. The hero and service diagrams use inline SVG, with no decorative photograph to preload. A nonblocking progress line and local indicators preserve useful content while assets load. Dialogs assign image/caption before opening and restore focus on close.

The root agency viewport uses a dark color scheme, a graphite scrollbar track and gray thumb. WebKit width/height is 7px; the standard scrollbar width is thin. Preserve this browser-surface treatment when extending canonical agency pages.

## Do's and Don'ts

### Do:

- **Do** use monochrome editorial surfaces, regular Manrope and concise useful copy.
- **Do** group major panels with tonal washes and spacing.
- **Do** keep project and service media equal within each responsive grid.
- **Do** preserve authentic product colors, demo behavior and simulation boundaries.
- **Do** retain keyboard access, visible pale-gray focus and useful static content.
- **Do** distinguish generated device visualizations from original product captures.
- **Do** pause decorative loops offscreen, in hidden documents and under reduced motion.

### Don't:

- **Don't** restore olive studio photography, Model table, the garden or global particles as the current identity.
- **Don't** add decorative perimeter frames to major matte panels.
- **Don't** leave an empty visual column beside centered case copy.
- **Don't** turn a bounded opening into a mandatory viewport-height empty stage.
- **Don't** present generated devices as guaranteed pixel-identical interface captures.
- **Don't** invent business outcomes, durations, model names, benchmark scores or AI delivery claims.
- **Don't** replace inline SVG or drawn disclosure controls with text glyph icons.

Source authority: frost.css loaded after lancer.css, service-editorial.css and case-editorial.css; src/agency-home.mjs, src/digital-visuals.mjs, src/project-cover.mjs, src/studio-sections.mjs, src/agency-shared.mjs, src/service-pages.mjs, src/agency-cases.mjs, studio-world.mjs and disclosures.mjs. The user's amendment is .impeccable/review/monochrome-direction.md. mono-finish-review.md and mono-fix-verdict.md record the material review and resolved scrollbar/icon findings; mono-runtime.md records local runtime evidence. mono-cover-review.md records the separate shipped review of all four final homepage covers and their responsive placement; this scoped review does not repeat full-surface QA. Public deployment verification is outside these local gates.

Not canonized or repaired by this documentation pass: superseded photographic selectors/assets and conditional object code; dated homepage-exhibit and universal local-reset wording in DEMOS.md; hidden historical project-type labels. These remain source/history drift, not reusable visual rules. Native product-demo styles and functional directed relationships remain legitimate local systems. No actual browser-zoom proof, Safari/Firefox check or deployment claim is made here.
