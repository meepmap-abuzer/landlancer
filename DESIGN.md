---
name: Lancer Agency — Monochrome studio
description: A restrained digital studio with graphite grounds, pale Manrope, an electric lime action accent, quiet borderless groups, selective frosted glass and a shaded ASCII ribbon.
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
  nav-wash: "#ffffff0a"
  price-wash: "#ffffff0d"
  selected-wash: "#bded5214"
  caption-tint: "#141417ad"
  glass-tint: "#ffffff08"
  diagram-line: "#939396"
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
  footer-contact:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(21px, 2.25vw, 32px)"
    letterSpacing: "-.025em"
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
  glass-pane: "none"
  glass-caption-highlight: "none"
  glass-filter: "blur(24px) saturate(105%)"
  glass-shadow: "none"
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
    backgroundColor: "{colors.glass-tint}"
    backgroundImage: "none"
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
    backgroundColor: "{colors.glass-tint}"
    backgroundImage: "none"
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
    backgroundColor: "{colors.glass-tint}"
    backgroundImage: "none"
    boxShadow: "{effects.glass-shadow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.scope}"
    padding: "26px"
  diagram-panel:
    backgroundColor: "transparent"
    backgroundImage: "none"
    backdropFilter: "none"
    boxShadow: "none"
    textColor: "{colors.ink}"
    padding: "20px 22px"
  process-tab:
    backgroundColor: "{colors.panel-wash}"
    rounded: "{rounded.tab}"
    padding: "16px 20px"
  process-tab-selected:
    backgroundColor: "{colors.panel-wash}"
    textColor: "{colors.accent}"
  process-panel:
    backgroundColor: "{colors.glass-tint}"
    backgroundImage: "none"
    backdropFilter: "none"
    boxShadow: "none"
    rounded: "{rounded.panel}"
    padding: "32px"
  faq-row:
    typography: "{typography.faq}"
    padding: "19px 0"
  hero-ascii:
    width: "100%"
  footer-contact:
    textColor: "{colors.accent}"
    typography: "{typography.footer-contact}"
    padding: "0 0 7px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Monochrome studio"**

Lancer's editorial shell uses graphite fields, pale lettering and quiet tonal groups. Regular Manrope headings give short offers room; one shaded ASCII Möbius ribbon gives the opening an expressive mathematical form, while authored service diagrams make digital work visible. Large groups are borderless. Thin strokes inside diagrams describe interfaces and relationships.

The user's approved October 2 refinement uses electric lime for primary contact actions, focus/selection, selected process and navigation states, logo strokes and the direct footer contact. A restrained green horizon and three thin curved signal lines connect the hero to work. The graphite grounds and pale headings stay neutral. Resting project arrows remain pale; hover or keyboard focus makes them lime. Product interfaces preserve their own palettes. The opening has one filled contact action and a quiet work link; the header contact is plain navigation.

This is the user's approved refinement of the established homepage, service directory, six service pages and four case shells. It preserves their structure and working demonstrations. Homepage work covers are individually generated device visualizations grounded in original product captures, with neutral graphite and silver surroundings. Gift Roulette uses its approved Farm/Autumn cover at immutable v4 URLs. Other service proof cards use real screenshots, and native product demos retain their source colors.

**Key Characteristics:**

- Graphite, gray and pale agency surfaces with a selective electric lime accent.
- Self-hosted Manrope with regular display weight and compact supporting copy.
- Borderless matte groups, capsule actions and gently curved media.
- One shaded ASCII ribbon, meaningful service diagrams and bounded opening compositions.
- Equal project and service geometry within each responsive grid.
- Visible static content, keyboard access and varied, bounded motion.

## Colors

The palette uses pale type and gray emphasis on a continuous graphite field; the frontmatter is the normative token source.

### Primary

- **Electric lime** (accent): primary contact actions, logo strokes, focus, selection, roadmap points, active service routes, the ASCII ribbon's brightest characters, the hero/work signal lines and direct footer contact.
- **Light lime** (accent-hover): primary-action hover.
- **Lime wash** (accent-wash): current navigation grounds, diagram results and the footer underline.

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
- **Selected wash** (selected-wash): retained legacy alias; production tabs now keep the matte wash in both selection states and signal selection through lime text and aria-selected.
- **Graphite caption** (caption-tint): readable image-overlay captions.
- **Service matte** (service-matte) and **diagram matte** (diagram-matte): grounds for authored service graphics.
- **Open wash** (open-wash): retained legacy token; FAQ rows stay transparent when closed, open and closing.

**The Product Theme Rule.** Apply monochrome to Lancer's editorial shell; preserve original interface colors inside product captures, generated device visualizations and interactive demos.

## Typography

**Display Font:** Manrope, with Arial and sans-serif fallbacks.
**Body Font:** Manrope, with the same fallbacks.
**Label Font:** Manrope; process and service sections use useful text and authored diagrams.

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
- **Footer contact:** the direct Telegram address, becoming 26px below 750px.

**The Useful Type Rule.** Let the actual offer, project name and useful description create hierarchy; detailed scope belongs in the supporting content.

## Layout

Content is at most 1560px wide, with the recorded fluid gutters. Below 750px the gutter is 22px. Native scrolling and anchor links remain available.

The homepage navigation floats over a full-width opening. Inner-page navigation stays in normal flow. The navigation row has a 70px minimum, becoming 64px below 750px. The desktop hero is 570px high, 540px at the compact 1100px breakpoint and 610px at 1800px and above. A left offer, one filled contact action and a quiet work link face a single shaded ASCII ribbon. Below 750px the hero becomes content-sized, with copy above a bounded scene and no mandatory viewport height.

Four homepage projects share equal two-column geometry and a 24px gap, becoming one column below 500px. Their media ratio is 1.55 on desktop, 1.1 on tablet and 1.25 on narrow mobile. Captions overlay the bottom of the generated device covers. Service proof cards use actual captures with their own screen-fitting inset, rather than reusing those generated homepage covers.

Six service cards share three equal desktop columns and a 22px gap. They become two columns below 750px and one below 500px. The final desktop ratio is 1.25 with a 310px minimum; compact desktop uses a 270px minimum and mobile a 300px minimum. The artwork is a contained SVG interface diagram under the title and above the price.

Homepage section ends use the recorded 80–90px desktop / 64px mobile rhythm. Service sections use the 68px / 44px rhythm. Four text-only production tabs form a desktop row and become 2×2 below 500px. Their panel has a 190px desktop minimum and fits content below 750px, with 32px desktop and 25px mobile padding. The ribbon occupies a 644×396 character frame, at most 680px wide on desktop, 560px at the compact breakpoint and 480px on mobile. The hero/work seam has three thin curved SVG lines and a local low radial lime light; work starts with 72px top padding, becoming 64px on mobile. FAQ uses two desktop columns and one mobile column. The open contact close pairs a heading with a direct Telegram link. A labelled three-column directory becomes a full-width brand signature above two link columns below 750px; a subdued large wordmark with a lime full stop and legal links finish the shell.

Service heroes pair copy, facts and actions with an authored diagram. A separate functional diagram explains the system. Scope cards use three columns, two on tablet and one below 500px. Four roadmap stops stay horizontal; mobile scrolls within a focusable track with 240px stops. Price rows remain open and ruled beside a matte scope aside. AI examples retain connected four-step flows, becoming a vertical sequence on mobile.

Case openings and story introductions are centered single-column compositions with bounded copy, pills and a demo action. No outer opening box or empty right text column remains. Alternating device spreads, source-style demos, capabilities and architecture keep the established structure. Story and demo sections stack below 750px; capability cards use four full-desktop columns and two at 1100px.

**The Bounded Stage Rule.** Keep openings proportionate to their useful content; mobile text and diagrams establish their own height.

## Elevation & Depth

The latest October 2 amendment removes gradient backplates and broad panel shadows. Service hero graphics and functional diagrams sit directly on the page ground. Other groups use a uniform #ffffff08 wash. Navigation and image captions retain 24px frosted blur; captions use a uniform 68% dark tint for readable image transmission. The explicitly approved radial lime light belongs only to the hero/work seam; it does not restore gradient card grounds. Glass does not require a painted gradient. The image-dialog backdrop remains local at 14px. Native product demos retain their own materials. Border removal still supersedes older frosted-border declarations.

**The Tonal Grouping Rule.** Separate major groups with diffuse translucent panes and spacing. Reserve thin strokes for functional relationships and dividers.

## Shapes

Actions and navigation use capsules; nav links use a tighter capsule. Project media and device spreads use the media radius, becoming 18px on mobile. Service cards and process panels use the panel radius. Scope and capability cards use the scope radius. Captions use their own smaller curves; FAQ rows remain open, transparent ruled rows in every state. Prices and category labels are pills. Functional diagram nodes use compact corners, and small circular arrow controls remain directional actions.

Centered case openings and the closing contact area are open compositions without a surrounding card shape.

## Components

### Actions

Electric lime primary contact actions use dark lettering, the recorded padding and a 48px minimum target. The homepage action uses 26px horizontal padding. Hover changes to light lime and rises 2px; active returns to rest. Case-return controls stay pale and secondary. Shared text actions have a 44px target and may use drawn lime arrows; the homepage work link is text-only, muted and underlined, with a lime underline on hover. Keyboard focus is a 2px lime outline, offset 5px. Homepage header contact is a plain muted navigation link; header contact actions and case-return controls hide below 750px while navigation remains visible.

### Navigation

An authored layer SVG and Manrope wordmark anchor the capsule. The navigation has a subtle wash, a 6px inset, no perimeter border and a restrained translucent hover/current state. The homepage places it over the opening field; inner pages keep it in normal flow. Link padding narrows responsively to fit the same visible routes.

### Project media and service cards

Equal homepage media hold generated graphite/silver device covers with colored product interfaces. A dark borderless caption overlays each cover with a circular inline arrow. Image hover scales to 1.045 over 900ms; the arrow rotates 45 degrees. Where CSS view timelines are supported, homepage work images also move vertically from 8px to -8px with a 1.035 base scale. Native scrolling drives this progressive depth effect; unsupported browsers and reduced motion keep a static image. Service proof previews use actual screenshots, except Gift Roulette's approved current visualization; phone captures are contained vertically and wide captures are fitted at the top.

Six service links use equal matte cards with authored SVG graphics, short titles/descriptions and a borderless starting-price pill. The whole card rises 4px over 550ms; its diagram rises 5px over 700ms. Case-story device spreads retain image dialogs and explicit visualization captions.

### Scope cards and functional diagrams

Scope cards use a subtle wash, no perimeter border, concise copy and an inline SVG. Desktop padding is 26px, tablet 21px and narrow single-column 22px. Practical maps, Telegram connections, CRM states and error/success paths sit on the open page ground. Equal-width HTML node rows and 36px SVG connector strips share the same column centres, so wrapped labels do not detach lines. Directed paths use the diagram-line token; the active or resulting node uses the subtle lime wash. Web-service roles appear above the service, with data and integrations below. CRM states form a horizontal sequence on desktop and a vertical one on mobile. Labels remain searchable HTML; connector SVGs are decorative.

### Chips

Starting-price pills have a quiet translucent fill, no border and no blur. Their source fill is slightly stronger than category pills. Case-category pills use the navigation wash and no perimeter stroke. These labels describe price scope or category rather than an interactive filter.

### Production tabs

Native text-only buttons use tablist/tab/tabpanel semantics, aria-selected, aria-controls and roving tabindex. Click selects; Left/Right, Home and End move selection and focus. Selected and unselected buttons share the matte wash; only selected text turns lime. Panel children settle from 7px over 460ms with 35ms local stagger. A new selection cancels previous panel animations; hidden documents and reduced motion finish active state transitions. Description and deliverable stay together at every breakpoint.

### Native disclosures

FAQ, audience, handover and case architecture preserve details/summary behavior without JavaScript. FAQ indicators use a 20px frame with two 14px strokes, 2px thick. The vertical stroke collapses to form a minus when open and restores a plus as closing begins, while native details remains open for its height tween. FAQ hover and open question text use lime; closed, open and closing backgrounds remain transparent with the same bottom divider. Audience, handover and case architecture keep their native disclosure patterns. Enhanced height transitions take 440ms with cubic-bezier(.22,1,.36,1), reverse from the current rendered height and settle in hidden tabs or reduced motion. Closing text fades over 220ms and shifts 4px over 280ms. The first service FAQ starts open.

### Interface assembly and motion

The hero is one original mathematically twisted Möbius ASCII ribbon. A 92×44 cell grid inside a 644×396 frame shades the continuous surface with four lime tones. The current rest projection contains 1004 SVG character text nodes. Static SVG and the lazy canvas renderer share the exact ribbonFrame() geometry and ribbonSvg() resting frame; this is decorative authored geometry without a product or performance claim. Service diagrams retain functional interfaces and routes. Drawn arrows remain where they communicate navigation or direction. Loose historical ASCII companions stay removed from canonical home and service sections.

The complete SVG character frame is present before JavaScript and remains the fallback if canvas initialization fails. A renderer imports near the visible hero only when reduced motion is off. It reuses a cached 10,500-point mesh and computes one rotation matrix per frame, paints at most the 60Hz budget and caps pixel density at 1.5. Gentle turning and small pointer tilt keep the native cursor. The renderer pauses offscreen, in hidden documents and under reduced motion; the exact static SVG frame returns under reduced motion. There is no page-wide perpetual animation loop or new runtime dependency.

Visible-default one-shot entrances vary by content: hero copy settles over 900ms, the ribbon rotates/scales into place over 1400ms, headings use a small mask settle over 850ms, proof media uses a cropped entrance over 1000ms, service geometry scales into place over 1000ms, and scope/capability groups use a 750ms mask. Process, roadmap, pricing, questions and stories use an 800ms alternating 8px horizontal settle with 45ms child stagger. Footer contact settles over 950ms with 80ms stagger; its wordmark draws in once over 1200ms. The shared ease is cubic-bezier(.16,1,.3,1). Active entrances finish when the document hides or reduced motion turns on.

CSS view timelines progressively move the three-line seam horizontally from -24px to 24px and vertically from 4px to -4px. Work media receives the separate shallow depth shift. Both effects preserve static fallbacks and remove displacement under reduced motion. Service connection pulses retain gated 5.6s cycles. Useful content remains visible by default; scrolling remains native.

**The Visible Default Rule.** Useful text, media and diagrams are present before JavaScript; decoration must pause offscreen, in hidden documents and under reduced motion.

### Open contact footer

An open heading and large direct @LancerManager link lead the shared footer. The Telegram link uses lime text and a thin wash-colored underline that becomes solid lime on hover. A brand signature, six service links and four case links form three desktop columns (1.4fr / 1fr / .8fr), with labelled navigation. Mobile gives the signature its own row above the two link columns. The subdued Manrope wordmark uses a lime full stop; privacy and return-to-top links complete the directory. No contact card or repeated filled CTA encloses the close.

### Images and browser surfaces

Images retain real sources, alt text, intrinsic dimensions, async decoding, native lazy loading and responsive WebP candidates. Current work-cover originals are 1536×1024 with 768px derivatives. Gift Roulette maps to gift-roulette-mono-v4.webp and covers-gift-roulette-mono-v4-768.webp in homepage, proof and related-work views; the approved Farm/Autumn raster pixels are reused unchanged. Other generated homepage covers retain their mono-v2 mapping. The hero emits a static inline SVG character frame before its lazy canvas enhancement; service diagrams use inline SVG, with no decorative photograph to preload. A nonblocking progress line and local indicators preserve useful content while assets load. Dialogs assign image/caption before opening and restore focus on close.

The root agency viewport uses a dark color scheme, a graphite scrollbar track and gray thumb. WebKit width/height is 7px; the standard scrollbar width is thin. Preserve this browser-surface treatment when extending canonical agency pages.

## Do's and Don'ts

### Do:

- **Do** use graphite editorial surfaces, selective electric lime, regular Manrope and concise useful copy.
- **Do** group major panels with tonal washes and spacing.
- **Do** keep project and service media equal within each responsive grid.
- **Do** preserve authentic product colors, demo behavior and simulation boundaries.
- **Do** retain keyboard access, visible lime focus and useful static content.
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

Source authority: frost.css loaded after lancer.css, service-editorial.css and case-editorial.css; src/agency-home.mjs, src/digital-visuals.mjs, src/project-cover.mjs, src/studio-sections.mjs, src/agency-shared.mjs, src/service-pages.mjs, src/service-stories.mjs, src/service-flow.mjs, src/agency-cases.mjs, studio-world.mjs, studio-motion.mjs, ascii-geometry.mjs, ascii-scene.mjs and disclosures.mjs. The latest approved amendment is .impeccable/review/ascii-motion-direction.md; ascii-documentation.md records this persistence reconciliation. The lime finish review and documentation remain earlier scoped evidence. Earlier monochrome reviews remain historical evidence. Public deployment verification is outside these local gates.

Not canonized or repaired by this documentation pass: superseded photographic selectors/assets and conditional object code; dated homepage-exhibit and universal local-reset wording in DEMOS.md; hidden historical project-type labels; retained selected-wash/open-wash aliases and pre-existing frontmatter extensions outside the portable schema. These remain source/history drift, not reusable visual rules. Native product-demo styles and functional directed relationships remain legitimate local systems. No actual browser-zoom proof, Safari/Firefox check or deployment claim is made here.
