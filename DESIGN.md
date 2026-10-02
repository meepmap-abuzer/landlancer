---
name: Lancer Agency — Frosted studio
description: A quiet photographic studio with olive charcoal, ivory, sage and image-backed matte glass.
colors:
  ground: "#192824"
  surface: "#263730"
  ink: "#f3f2ec"
  muted: "#c2cbc4"
  line: "#f3f2ec25"
  accent: "#d0d3b9"
  action-text: "#182721"
  action-hover: "#dce2cf"
  image-copy: "#e0e5dc"
  panel-tint: "#1b2b24ad"
  service-matte: "#242424"
  scope-surface: "#f3f2ec08"
  open-surface: "#f3f2ec09"
  fallback-glass: "#273b32ed"
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
    fontSize: "58px"
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
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.action-text}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "13px 21px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  text-action:
    textColor: "{colors.ink}"
    typography: "{typography.text-action}"
  navigation:
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "6px"
  navigation-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.nav-link}"
    padding: "8px 19px"
  project-caption:
    backgroundColor: "{colors.panel-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.caption}"
    padding: "16px 19px"
  service-card:
    backgroundColor: "{colors.service-matte}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "25px"
  price-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "6px 11px"
  included-card:
    backgroundColor: "{colors.scope-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.scope}"
    padding: "26px"
  diagram-panel:
    textColor: "{colors.ink}"
    rounded: "{rounded.media}"
    padding: "22px"
  process-tab:
    rounded: "{rounded.tab}"
    padding: "16px 20px"
  process-panel:
    rounded: "{rounded.panel}"
    padding: "32px 200px 32px 32px"
  faq-row:
    typography: "{typography.faq}"
    padding: "19px 0"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Frosted studio"**

Lancer places working digital products inside a quiet architectural studio. Olive charcoal, ivory lettering, muted sage and photographic light give the interface a calm, tactile atmosphere. Matte glass borrows depth from imagery beneath it; light borders and tint keep the content readable.

This is the user's pinned ТИШЕ / Green Rock direction adapted to Lancer, replacing the rejected Model table identity. It governs the homepage, service directory, six service pages and four case editorial shells. Genuine product captures and local demos keep their own product themes. The studio scene is a generated decorative illustration, not evidence of an actual agency office.

**Key Characteristics:**

- Olive charcoal, ivory and restrained sage.
- Self-hosted Manrope with regular display weight and compact copy.
- Photographic scenes, rounded media and tinted matte glass.
- Equal project and service geometry with a bounded opening scene.
- Visible static content enhanced by one-shot motion.
- Native disclosures, keyboard-operable tabs and genuine product demonstrations.

## Colors

The palette pairs a green charcoal field with warm pale text and a quiet sage interaction accent. The frontmatter records the shipped CSS values.

### Primary

- **Sage** (accent): selection, focus outlines, diagram connections, selected-tab arrows and small decorative motifs.

### Neutral

- **Olive charcoal** (ground): the continuous agency field.
- **Studio green** (surface): functional diagram nodes and structured example surfaces.
- **Ivory** (ink): headings, navigation and solid primary actions.
- **Soft gray green** (muted): descriptions and secondary information.
- **Light translucent edge** (line): panel borders, disclosure dividers and price rows.
- **Deep action green** (action-text) and **pale action sage** (action-hover): action lettering and hover fill.
- **Image ivory** (image-copy): copy over the hero and project photographs.
- **Tinted glass** (panel-tint): image-backed project captions.
- **Artwork matte** (service-matte): the six service illustration grounds.
- **Scope wash** (scope-surface) and **open wash** (open-surface): subtle card and disclosure separation.
- **Opaque glass fallback** (fallback-glass): the authored fallback on supported selector groups when backdrop filtering is unavailable.

**The Product Theme Rule.** Apply the shared palette to Lancer's editorial shell; preserve the original product colors within captures and interactive demos.

## Typography

**Display Font:** Manrope, with Arial and sans-serif fallbacks.
**Body Font:** Manrope, with the same fallbacks.
**Label/Mono Font:** UI monospace / Consolas for the small process drawing; service ASCII uses Consolas / monospace.

Manrope is self-hosted in Cyrillic and Latin WOFF2 files, with variable weights 200–800 and font-display swap. Regular display weight and close tracking make the scene calm; medium tertiary titles and short sentence-case labels keep controls practical.

### Hierarchy

- **Display:** the opening offer. Compact desktop overrides it to 46px at 1100px; the narrow homepage uses 36px at 500px.
- **Headline:** section titles, with the shared headline token. Local service/system and case-story titles use 30–34px, becoming 25–28px on mobile.
- **Title:** the tertiary base. Project captions use 23px; service and included-work titles use 18–19px.
- **Body:** the base and paragraph rhythm are recorded above. Main offer and service/case copy generally use 14–15px; compact descriptions and metadata use 11–13px. Paragraphs inherit a 65ch maximum, with tighter local measures.
- **Action:** the primary control label; text actions use their own slightly larger role.
- **FAQ:** question text; answers use 14px and inherit the 1.8 line height.
- **Service display:** individual offers, becoming 35px below 750px.
- **Case display:** the product name, becoming 44px below 750px.
- **Motif:** a small decorative drawing with no information role.

**The Short Offer Rule.** Establish hierarchy with the actual title and a short useful description; keep detailed scope on service and case surfaces.

## Layout

The shared content width is at most 1560px, minus two responsive gutters. The implemented gutter clamp reaches 70px; below 750px it is 22px. Native browser scrolling and anchor links remain available.

The homepage navigation floats over the full-width scene; inner-page navigation is in normal flow. The navigation row has a 70px minimum, becoming 64px below 750px. The desktop hero uses height clamp(580px,49vw,690px), giving about 620px at the reviewed 1265px viewport; wide screens use 690px. It becomes 730px below 750px and 710px below 500px. The offer is anchored left and the compact case preview right; mobile keeps copy above the case preview inside the scene.

Four projects share equal two-column geometry and a 24px gap; below 500px they form one column. Their photo ratio is 1.55 on desktop, 1.1 on tablet and 1.25 on narrow mobile. Captions overlay the bottom of each photograph. Six service cards share equal three-column geometry, a 22px gap and a 1.33 ratio; tablet uses two columns, narrow mobile one. Final service artwork occupies 86% of the card width and 65.4% of its height, inset 7% from the left and aligned to the bottom. Intersecting masks blend the top 18% and each horizontal edge 10% into the matte ground while preserving device scale.

Homepage section ends generally use 80–90px on desktop and 64px on mobile. Service sections use the recorded 68px / 44px rhythm. Four process tabs share a desktop row and become 2×2 below 500px. Their frosted panel has a 190px desktop minimum and becomes content-sized below 750px. FAQ has two desktop columns and one mobile column. The close repeats the studio image, a glass contact panel and a large subdued wordmark.

Service heroes pair copy, facts and actions with an illustration, then show a separate functional diagram. Included work uses three equal columns, two on tablet and one below 500px. Audience situations and handover use concise native disclosures. Related cases retain equal cover treatment. Four roadmap stops stay horizontal; mobile scrolls within a focusable track with 240px stops. Price rows remain open and ruled, beside a frosted scope aside; mobile stacks them. AI examples retain their labelled hypothetical scenarios and connected mobile 2×2 flows.

Case openings remain text-led, followed by two alternating generated device spreads and a genuine local product demo. The shell uses rounded containers, light borders and shared spacing around those artifacts. Story sections stack below 750px. Capabilities use four columns at full desktop and two at 1100px. Product-specific demos keep their original dimensions and visual language.

## Elevation & Depth

Depth comes from the photographic scene, tinted translucent panels, blur and light borders. The shared editorial panel system has no ambient card shadow. Primary actions are flat at rest. Native product-demo shadows remain local to their product.

Matte surfaces use a restrained diagonal translucent wash, a light 1px edge and backdrop blur (22px) with saturation (110%). Project captions combine their own darker tint with the same blur. Price chips and the image-dialog backdrop use blur (14px). The source provides an opaque fallback for the shared frost, navigation, project-caption and process-panel selectors; retain readable tint when extending the treatment.

**The Matter Beneath Rule.** Use matte glass where the scene or tonal field beneath supplies depth; pair blur with a readable tint and a light edge.

## Shapes

Primary actions and navigation use capsules; nav links have a slightly tighter capsule. Media, hero proof, diagram panels, case opening and demo surrounds use the media radius. Service cards and process panels use the panel radius. Included-work and capability cards use the scope radius. Image captions are softly curved; open disclosures get a small curved wash. Price and case-category chips are pills. Small circular arrows remain functional directional controls.

## Components

### Actions

The ivory primary action uses deep green lettering, an inline SVG arrow, the recorded padding and a 48px minimum target. Hover shifts to pale sage and rises 2px; active returns to rest. Text links use a 44px target and hover underline. Shared keyboard focus is a 2px sage outline, offset 5px. The header CTA and case-return action hide below 750px while navigation stays visible.

### Navigation

A small authored layer SVG and Manrope wordmark anchor the floating homepage bar. The navigation capsule has matte blur, light edging and a 6px inset; links use the recorded padding and a subtle translucent hover/current wash. Inner pages keep the same material in normal document flow. Home/service links lead to work, services and process; case links lead to overview, screens and demo.

### Project media and service cards

Equal rounded project media carry a bottom glass caption and a circular inline arrow. Image hover scales to 1.045 over 900ms; the arrow rotates 45 degrees. Six illustrated service links use the same card dimensions, a short title/description and a small frosted price chip. The service card rises 4px over 550ms; its image scales to 1.035 over 800ms. Generated case spreads retain the native image dialog and explanatory visualization captions.

### Scope cards and diagrams

Included-work cards use a quiet translucent fill, a light border, concise text and an inline SVG. Their desktop padding is 26px, 21px on tablet and 22px in the narrow single-column layout. Functional page maps, Telegram connections, CRM states and success/error paths sit within a frosted panel; their nodes remain literal examples of structure. The horizontal roadmap and ruled price rows remain readable functional information.

### Chips

Service starting-price chips use a dark translucent fill, light border, 14px backdrop blur and the recorded inset. Case-category chips use a subtle wash and light border. These describe scope or category; they do not imply an interactive filter.

### Production tabs

Four native buttons use tablist/tab/tabpanel semantics, aria-selected, aria-controls and roving tabindex. Click selects; Left/Right, Home and End move selection and focus. A selected button gets a sage wash and edge; its arrow rotates 45 degrees. The selected panel settles by 4px over 260ms. Mobile keeps the description and deliverable together and hides the decorative drawing.

### Native disclosures

FAQ, audience, handover and case architecture preserve native details/summary behavior without JavaScript. Authored horizontal/vertical strokes form plus/minus indicators. FAQ hover uses sage; an open answer receives a curved translucent wash. Enhanced height transitions take 440ms with cubic-bezier(.22,1,.36,1), reverse from the current rendered height and settle immediately in hidden tabs or reduced motion. Closing text fades over 220ms and shifts 4px over 280ms. The first service FAQ starts open.

### Scene and motion

The generated studio image settles from scale 1.035 and blur 3px over 1700ms. Hero copy and case preview settle over 900ms and 1100ms. Project/service/diagram/story entrances are one-shot, visible by default and take 650ms with at most 150ms of local stagger. All use the shared studio easing. Reduced motion skips these JavaScript entrances, finishes active ones and removes CSS animations/transitions. The homepage mounts no brand-object or continuous WebGL scene.

Small ASCII motifs update at 700ms only while visible in an active tab and without reduced motion. Native disclosures settle when hidden. Historical WebGL loading code remains conditional on an absent brand-object element; it is not a current homepage signature.

### Images and loading

Static markup retains real sources, alt text, intrinsic sizes, async decoding and native lazy loading. The decorative hero is eager and high priority, with full and 960px WebP candidates. Product covers, service illustrations and device spreads use responsive candidates from the static build. A nonblocking progress line and local indicators preserve the content while assets load. Case image dialogs assign their source/caption before opening and return focus on close.

## Do's and Don'ts

### Do:

- **Do** use the Frosted studio palette, regular Manrope display hierarchy and concise copy.
- **Do** keep matte glass readable with tint, light borders and the authored backdrop fallback.
- **Do** keep project and service media equal within each responsive grid.
- **Do** preserve native product themes, demo behavior and explicit simulation boundaries.
- **Do** retain keyboard access, sage focus and useful static content.
- **Do** distinguish decorative studio imagery and generated device visualizations from original product captures.
- **Do** respect reduced motion and stop small decorative loops offscreen or in hidden tabs.

### Don't:

- **Don't** restore Model table, the garden or global particles as the current Lancer identity.
- **Don't** turn the bounded hero into a mandatory viewport-height empty stage.
- **Don't** present the fictional studio illustration as an actual agency office.
- **Don't** invent business outcomes, durations, model names, benchmark scores or AI delivery claims.
- **Don't** replace inline SVG or drawn disclosure controls with text glyph icons.

Source authority: frost.css loaded after lancer.css, service-editorial.css and case-editorial.css; src/agency-home.mjs, src/studio-sections.mjs, src/agency-shared.mjs, src/service-pages.mjs, src/agency-cases.mjs, studio-world.mjs and disclosures.mjs. The pinned code-led direction is .impeccable/review/greenrock-direction.md; .impeccable/review/frost-finish-review.md records the full finish review and its two material fixes. Final service-seam verification is recorded by the subsequent frost verdict; do not read the pre-repair finding as the final disposition.

Not canonized or repaired by this documentation pass: legacy selectors and unused historical scenes/assets; dated homepage-exhibit and universal local-reset wording in DEMOS.md; hidden historical project-type labels. These are retained historical code, not rules for new screens. Product-demo styles and functional directed relationships remain their own legitimate systems. No actual browser-zoom proof or Safari/Firefox verification is claimed.
