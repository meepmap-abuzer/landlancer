---
name: Lancer Agency — Monochrome studio
description: A restrained digital studio with graphite grounds, pale Manrope, an electric lime action accent, quiet borderless groups, selective frosted glass and an original ASCII explorer.
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
  island-tint: "#252527a8"
  mascot-shadow: "#707077"
  mascot-mid: "#a5a5ad"
  mascot-light: "#e4e4e8"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(40px, 4.2vw, 62px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-.035em"
  display-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(35px, 6vw, 44px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-.035em"
  mascot-cell:
    fontFamily: "monospace"
    fontSize: "10px"
    fontWeight: 400
  mascot-packet:
    fontFamily: "monospace"
    fontSize: "24px"
    fontWeight: 400
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
  case-display-mobile:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "38px"
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
  nav-island: "32px"
  nav-island-mobile: "28px"
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
    backgroundColor: "{colors.island-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.nav-island}"
    padding: "8px 20px"
    width: "min(1120px, calc(100% - 40px))"
  navigation-mobile:
    backgroundColor: "{colors.island-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.nav-island-mobile}"
    padding: "8px 12px"
    width: "calc(100% - 24px)"
  navigation-link:
    backgroundColor: "transparent"
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
  hero-mascot:
    width: "300px"
    height: "clamp(245px, 36svh, 330px)"
  hero-mascot-mobile:
    width: "260px"
    height: "260px"
  case-companion:
    width: "160px"
  footer-contact:
    textColor: "{colors.accent}"
    typography: "{typography.footer-contact}"
    padding: "0 0 7px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Monochrome studio"**

Lancer's editorial shell uses graphite fields, pale lettering and quiet tonal groups. Regular Manrope headings give short offers room; an original hooded ASCII explorer gives the opening a recognizable game-character silhouette, while authored service diagrams make digital work visible. Large groups are borderless. Thin strokes inside diagrams describe interfaces and relationships.

The user's approved October 2 refinement uses electric lime for primary contact actions, focus/selection, selected process and navigation states, logo strokes and the direct footer contact. A restrained green horizon and three thin curved signal lines connect the hero to work. The graphite grounds and pale headings stay neutral. Resting project arrows remain pale; hover or keyboard focus makes them lime. Product interfaces preserve their own palettes. The opening has one filled contact action and a quiet work link; the header contact is plain navigation.

The latest user-approved amendment uses the chat «Скопировать сайт Dev Studio» as an interaction and material reference: soft wheel scrolling, one floating frosted header island and ascending work cards. The homepage centers the original ASCII explorer above its offer and actions; smaller companions use alternate poses on the four cases. This precise code-led continuation inherits the established world, without a new seed or raster comp. It preserves the established homepage, service directory, six service pages and four case shells. It preserves their structure and working demonstrations. Homepage work covers are individually generated device visualizations grounded in original product captures, with neutral graphite and silver surroundings. Gift Roulette uses its approved Farm/Autumn cover at immutable v4 URLs. Other service proof cards use real screenshots, and native product demos retain their source colors.

**Key Characteristics:**

- Graphite, gray and pale agency surfaces with a selective electric lime accent.
- Self-hosted Manrope with regular display weight and compact supporting copy.
- Borderless matte groups, capsule actions, one frosted navigation island and gently curved media.
- An original ASCII explorer and its case-pose family, meaningful service diagrams and bounded openings.
- Equal project and service geometry within each responsive grid.
- Visible static content, keyboard access, soft wheel scrolling and varied, bounded motion.

## Colors

The palette uses pale type and gray emphasis on a continuous graphite field; the frontmatter is the normative token source.

### Primary

- **Electric lime** (accent): primary contact actions, logo strokes, focus, selection, roadmap points, active service routes, the ASCII explorer's eyes, scarf and diagonal body accent, the hero/work signal lines and direct footer contact.
- **Light lime** (accent-hover): primary-action hover.
- **Lime wash** (accent-wash): diagram results and the footer underline; navigation now signals current state through lime text on transparent link grounds.

### Neutral

- **Graphite** (ground): continuous page field.
- **Dark gray** (surface): functional diagram nodes and native structured examples.
- **Pale white** (ink): headings, ordinary navigation, secondary return actions and resting project arrows.
- **Soft gray** (muted): descriptions and secondary information.
- **Quiet line** (line): disclosure, price and functional editorial dividers.
- **Action graphite** (action-text): lettering on solid pale controls.
- **Matte wash** (panel-wash): scope, process, example and capability groups.
- **Navigation wash** (nav-wash): case-category pills and a retained historical navigation alias.
- **Island graphite** (island-tint): the translucent ground of the complete shared header island.
- **Explorer shadow / mid / light** (mascot-shadow / mascot-mid / mascot-light): the shared character-cell shading; electric lime supplies its fourth tone.
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

- **Display:** the centered homepage offer uses the recorded desktop ramp and line height; below 750px the display-mobile role overrides older compact and narrow homepage sizes.
- **Mascot cell / packet:** actual decorative ASCII glyph cells and the larger packet in inspect/carry poses; these monospace roles do not style controls or editorial labels.
- **Headline:** the shared section-title ramp. Functional service headings use 34px, becoming 28px on mobile; case-story headings use 30px, becoming 25px.
- **Title:** the tertiary base. Project captions use 23px; service and included-work titles use 18–19px.
- **Body:** the base paragraph rhythm. Offer, service and case copy generally use 14–15px; compact metadata uses 11–13px. Paragraphs have a 65ch maximum, with tighter local measures.
- **Action / text action:** solid controls and secondary links use the separate recorded roles.
- **FAQ:** question text; answers use 14px and a 1.8 line height.
- **Service display:** individual offers, becoming 35px below 750px.
- **Case display:** centered desktop product names; the final companion layout uses 38px names below 750px and reserves side space beside them.
- **Footer contact:** the direct Telegram address, becoming 26px below 750px.

**The Useful Type Rule.** Let the actual offer, project name and useful description create hierarchy; detailed scope belongs in the supporting content.

## Layout

Content is at most 1560px wide, with the recorded fluid gutters. Below 750px the gutter is 22px. Wheel input and internal anchors use optional smoothing; touch, keyboard and nested demos retain native scrolling. Failure or reduced motion retains the native fallback.

One header island is fixed on the homepage and sticky on case/service pages, offset 18px from the top (12px below 750px). Its width, padding and radii are recorded in the navigation variants; minimum height is 64px desktop and 60px mobile. The child navigation remains transparent. The homepage is a centered vertical stack: explorer, offer, supporting copy, one filled contact action and one quiet work link. The hero has a 650px desktop minimum and auto height, with 96px top / 44px bottom padding. Its explorer uses the recorded 300px width and responsive height. Below 750px the explorer is 260×260px, the hero is content-sized with 84px top / 44px bottom padding and no mandatory viewport height; the sampled mobile height was about 609px.

Four homepage projects share equal two-column geometry and a 24px gap, becoming one column below 500px. Their media ratio is 1.55 on desktop, 1.1 on tablet and 1.25 on narrow mobile. Captions overlay the bottom of the generated device covers. Service proof cards use actual captures with their own screen-fitting inset, rather than reusing those generated homepage covers.

Six service cards share three equal desktop columns and a 22px gap. They become two columns below 750px and one below 500px. The final desktop ratio is 1.25 with a 310px minimum; compact desktop uses a 270px minimum and mobile a 300px minimum. The artwork is a contained SVG interface diagram under the title and above the price.

Homepage section ends use the recorded 80–90px desktop / 64px mobile rhythm. Service sections use the 68px / 44px rhythm. Four text-only production tabs form a desktop row and become 2×2 below 500px. Their panel has a 190px desktop minimum and fits content below 750px, with 32px desktop and 25px mobile padding. The explorer uses a 64×72 cell field with 8×9px placement steps in a 512×648 SVG frame. The hero/work seam has three thin curved SVG lines and a local low radial lime light; work starts with 72px top padding, becoming 64px on mobile. FAQ uses two desktop columns and one mobile column. The open contact close pairs a heading with a direct Telegram link. A labelled three-column directory becomes a full-width brand signature above two link columns below 750px; a subdued large wordmark with a lime full stop and legal links finish the shell.

Service heroes pair copy, facts and actions with an authored diagram. A separate functional diagram explains the system. Scope cards use three columns, two on tablet and one below 500px. Four roadmap stops stay horizontal; mobile scrolls within a focusable track with 240px stops. Price rows remain open and ruled beside a matte scope aside. AI examples retain connected four-step flows, becoming a vertical sequence on mobile.

Case openings and story introductions keep bounded copy, pills and a demo action without an outer box or empty right text column. Desktop openings remain centered with a smaller companion at the right side: 160px wide, 128px at 1100px and 100px at 750px. Below 750px the opening copy aligns left and titles/category lines reserve 106px of horizontal clearance. Maverick waves, 12К carries a packet, Gift Roulette inspects it and TailCare sits. Alternating device spreads, source-style demos, capabilities and architecture keep the established structure. Story and demo sections stack below 750px; capability cards use four full-desktop columns and two at 1100px.

**The Bounded Stage Rule.** Keep openings proportionate to their useful content; mobile text and diagrams establish their own height.

## Elevation & Depth

The October 2 amendments remove gradient card backplates and broad panel shadows. Service hero graphics and functional diagrams sit directly on the page ground. Other groups use the uniform glass-tint wash. The complete navigation island uses its own island-tint, 32px blur with 105% saturation and one ambient shadow (0 8px 30px #00000025); its inner nav has no separate fill, blur or shadow. Image captions preserve the separate caption-tint and existing 24px blur with 105% saturation. The header falls back to the solid surface ground when backdrop filtering is unavailable. The explicitly approved radial lime light belongs only to the hero/work seam; it does not restore gradient card grounds. Glass does not require a painted gradient. The image-dialog backdrop remains local at 14px. Native product demos retain their own materials. Border removal still supersedes older frosted-border declarations.

**The Tonal Grouping Rule.** Separate major groups with diffuse translucent panes and spacing. Reserve thin strokes for functional relationships and dividers.

**The Single Island Rule.** Apply header glass and ambient lift to one shared outer island; keep its child navigation transparent and express hover/current state through lime text.

## Shapes

Actions use capsules; the shared header uses its own desktop/mobile island curves, and nav links retain their tighter capsule geometry on transparent grounds. Project media and device spreads use the media radius, becoming 18px on mobile. Service cards and process panels use the panel radius. Scope and capability cards use the scope radius. Captions use their own smaller curves; FAQ rows remain open, transparent ruled rows in every state. Prices and category labels are pills. Functional diagram nodes use compact corners, and small circular arrow controls remain directional actions.

Centered case openings and the closing contact area are open compositions without a surrounding card shape.

## Components

### Actions

Electric lime primary contact actions use dark lettering, the recorded padding and a 48px minimum target. The homepage action uses 26px horizontal padding. Hover changes to light lime and rises 2px; active returns to rest. Case-return controls stay pale and secondary. Shared text actions have a 44px target and may use drawn lime arrows; the homepage work link is text-only, muted and underlined, with a lime underline on hover. Keyboard focus is a 2px lime outline, offset 5px. Homepage header contact is a plain muted navigation link; header contact actions and case-return controls hide below 750px while navigation remains visible.

### Navigation

An authored layer SVG and Manrope wordmark anchor the single frosted island. The outer header carries the tinted glass, ambient shadow and recorded inset; the child nav is transparent with no border, blur, shadow or padding of its own. Links keep transparent grounds in resting, hover, focus and current states; the latter states use lime text. The homepage header is fixed; service and case headers are sticky. Link padding narrows from 8px 19px to 8px 14px at 1100px, then 8px 9px below 750px, to retain the same visible routes.

### Project media and service cards

Equal homepage media hold generated graphite/silver device covers with colored product interfaces. Each whole work card rises once from 64px, with 4deg rotateX, .96 scale and .25 opacity, settling over 1100ms; alternate columns receive 140ms stagger. A dark borderless caption overlays each cover with a circular inline arrow. Image hover scales to 1.045 over 900ms; the arrow rotates 45 degrees. Where CSS view timelines are supported, homepage work images also move vertically from 8px to -8px with a 1.035 base scale. CSS view timelines drive this progressive depth effect; unsupported browsers and reduced motion keep a static image. Service proof previews use actual screenshots, except Gift Roulette's approved current visualization; phone captures are contained vertically and wide captures are fitted at the top.

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

The signature is an original hooded explorer built from actual ASCII text cells in inline SVG: cloth hood, dark face, lime plus-sign eyes and scarf, gloves and split boots. The shared rest sprite has 1,587 text nodes in the recorded cell field. Shading uses the three recorded neutral character tones plus electric lime. Inspect and carry poses add a three-line ASCII packet at the recorded larger glyph size. The character is decorative and aria-hidden; the offer, links and product evidence carry meaning. Smaller case companions use wave, inspect, carry and sit variants. Service diagrams retain functional interfaces and routes, with drawn arrows where they communicate navigation or direction.

The complete sprite is present before JavaScript. CSS steps move existing groups rather than rebuilding geometry: body/head/scarf idle at 1.8s with four steps, a 5.4s blink, a 1.4s wave and a 2.4s packet bob. Body and head displacement is 5px / 3px in the SVG frame, with a -4deg scarf response. Intersection visibility, document visibility and reduced-motion state gate the loops. Reduced motion leaves a static character. The older Möbius SVG/canvas modules and conditional object loader remain historical/unused by the current canonical homepage.

Visible-default one-shot entrances vary by content: hero copy settles over 900ms, the explorer rises 10px and releases an 18% lower mask over 1100ms, headings use a small mask settle over 850ms, and whole work cards use the ascending motion described above. Other proof media uses a cropped entrance over 1000ms; service geometry scales into place over 1000ms; scope/capability groups use a 750ms mask. Process, roadmap, pricing, questions and stories use an 800ms alternating 8px horizontal settle with 45ms child stagger. Footer contact settles over 950ms with 80ms stagger; its wordmark draws in once over 1200ms. The shared ease is cubic-bezier(.16,1,.3,1). Active entrances finish when the document hides or reduced motion turns on.

The already installed Lenis 1.3.26 package smooths wheel input with lerp .075 and wheel multiplier .85, leaving touch unsynchronized. Its event-driven RAF has a reentrancy guard, wakes on input/scroll and stops at rest; hidden documents stop it, reduced motion destroys it, and import failure retains native scrolling. Dialogs, interactive stages, product demos and explicit opt-outs retain native interaction. Anchors configure offset -104px; actual landing also includes existing target margins and container padding, so this is not an exact 104px placement promise. No new dependency was added.

CSS view timelines progressively move the three-line seam horizontally from -24px to 24px and vertically from 4px to -4px. Work media receives its separate shallow depth shift. Both effects preserve static fallbacks and remove displacement under reduced motion. Service connection pulses retain gated 5.6s cycles. Useful content remains visible by default, with the native cursor.

**The Visible Default Rule.** Useful text, media and diagrams are present before JavaScript; decoration must pause offscreen, in hidden documents and under reduced motion.

### Open contact footer

An open heading and large direct @LancerManager link lead the shared footer. The Telegram link uses lime text and a thin wash-colored underline that becomes solid lime on hover. A brand signature, six service links and four case links form three desktop columns (1.4fr / 1fr / .8fr), with labelled navigation. Mobile gives the signature its own row above the two link columns. The subdued Manrope wordmark uses a lime full stop; privacy and return-to-top links complete the directory. No contact card or repeated filled CTA encloses the close.

### Images and browser surfaces

Images retain real sources, alt text, intrinsic dimensions, async decoding, native lazy loading and responsive WebP candidates. Current work-cover originals are 1536×1024 with 768px derivatives. Gift Roulette maps to gift-roulette-mono-v4.webp and covers-gift-roulette-mono-v4-768.webp in homepage, proof and related-work views; the approved Farm/Autumn raster pixels are reused unchanged. Other generated homepage covers retain their mono-v2 mapping. The hero and case companions emit complete static inline SVG character cells; service diagrams use inline SVG, with no decorative photograph to preload. A nonblocking progress line and local indicators preserve useful content while assets load. Dialogs assign image/caption before opening and restore focus on close.

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
- **Don't** replace inline SVG or drawn disclosure controls with text glyph icons; the requested ASCII character artwork is a separate decorative medium.

Source authority: the final-rule cascade in frost.css loaded after lancer.css, service-editorial.css and case-editorial.css; src/agency-home.mjs, src/mascot.mjs, src/digital-visuals.mjs, src/project-cover.mjs, src/studio-sections.mjs, src/agency-shared.mjs, src/service-pages.mjs, src/service-stories.mjs, src/service-flow.mjs, src/agency-cases.mjs, studio-world.mjs, studio-scroll.mjs, studio-motion.mjs and disclosures.mjs. Canonical CSS/runtime cache URLs use mascot-1. The user-approved contract is ../../work/mascot-direction.md from the project root and its matching surface brief; mascot-release.md and mascot-finish-review.md are the local evidence, with disposition ship and no scoped material fixes. mascot-documentation.md records this reconciliation. Earlier ASCII/lime/monochrome packets remain historical evidence. Public deployment verification is pending.

Not canonized or repaired by this documentation pass: superseded photographic and ribbon selectors/assets, unused Möbius SVG/canvas modules and conditional object code; dated homepage-exhibit and universal local-reset wording in DEMOS.md; hidden historical project-type labels; retained selected-wash/open-wash/nav-wash aliases and pre-existing frontmatter effects/extra component fields outside the portable schema. These remain source/history drift, not reusable visual rules. The detector's new character tones, island radius/material and display values are intentional approved changes; other advisories remain outside this amendment. The two hidden dialog images are initialized before opening. Native product-demo styles and functional directed relationships remain legitimate local systems. No actual browser-zoom proof, OS-level reduced-motion check, sustained FPS, Safari/Firefox check, Lighthouse score or deployment claim is made here.
