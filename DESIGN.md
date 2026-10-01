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
  service-ink: "#eee"
  service-muted: "#b7b7b7"
  sage-detail: "#c4d4bf"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(40px, 3.6vw, 56px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(28px, 2.6vw, 36px)"
    lineHeight: 1.16
    letterSpacing: "-.055em"
  button:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
  service-display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(34px, 3.2vw, 48px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-.03em"
  service-headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(26px, 2.2vw, 34px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-.03em"
  service-title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-.03em"
  service-body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    lineHeight: 1.75
  service-ascii:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: "12px"
    lineHeight: 1.35
rounded:
  action: "999px"
  project: "18px"
  photo: "10px"
  service-work: "14px"
  service-case: "16px"
  delivery: "16px"
  contact: "24px"
  case-cover: "24px"
  capability: "19px"
spacing:
  catalog-gap: "16px"
  layout-gap: "clamp(32px, 4vw, 72px)"
  service-section: "88px"
  service-section-mobile: "64px"
  directory-intro-copy: "20px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.action}"
    typography: "{typography.button}"
    padding: "11px 20px"
  button-primary-service:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.action}"
    typography: "{typography.button}"
    padding: "14px 24px"
  project-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.project}"
    padding: "10px"
  service-work-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.service-work}"
    padding: "23px"
  service-case-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.service-case}"
    padding: "10px"
  process-delivery:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.delivery}"
    padding: "24px"
---

# Design System: Lancer Agency

## Overview

**Creative North Star: "Compact dark studio."**

The homepage uses a cursor-reactive particle field and authored garden, a headline and description at left, a foreground tree at right, four photographic project covers and a sequence of illustrated services, process, FAQ and contact. Near-black and charcoal surfaces provide the frame; actual product stories remain the purpose. The CRM hero, workflow scene, long roadmap and CSS devices are superseded on this surface.

Homepage styling is scoped through studio-home.css, studio-world.css and the hero-specific particle-hero.css. Four case pages share case-editorial.css for their dark editorial shell; original screenshots and interactive productStage demos retain their product-specific content and behavior. Six service pages and the /services/ directory extend the same world through service-editorial.css; studio-layout.css is the final fluid-layout layer. Their surface strategy is recorded in PRODUCT.md and the service surface contract.

**Key Characteristics:**

- Exact near-black ground and charcoal card surfaces.
- Compact typography-led hero and photographic covers.
- White pill actions and subtle sticky-header glass.
- Native process disclosures and flat FAQ rows.
- Editorial case stories with original product evidence and retained interactive demos.

## Colors

Ground and surface are the normative homepage pair. Ink supplies primary text and actions; muted gray supplies descriptions. Headline-muted softens the second hero line. Thin translucent white dividers organize lists, while control is used for tags and disclosure circles. The authored garden is the native scene; service pages use small sage details for roadmap dots, ASCII and selection. Service headings use service-ink, prose uses service-muted, and tertiary captions use inherited grays. Price amounts retain their scoped pale-sage treatments rather than defining a new brand accent.

**The Scope Rule.** Apply the dark studio palette to homepage, service and case editorial shells; preserve native product themes inside screenshots and interactive demos.

## Typography

Manrope remains the inherited family with Arial and sans-serif fallbacks. The current homepage display and section scale are recorded in frontmatter; below 900px its display becomes clamp(36px, 5.2vw, 48px). Existing small homepage labels are observed markup, not a decorative type primitive to propagate.

Services use the scoped service-display, service-headline, service-title and service-body roles. Below 750px these become 34px, 27px and 18px for h1/h2/h3. Hero prose is 16px with a 55ch measure on desktop and 15px on mobile; ordinary prose is at most 65ch. Included-work titles are 18px and descriptions 13px (14px below 540px); factual hero fields use 11px labels and 13px values. FAQ titles use 15px/1.5, answers 14px/1.8. The ASCII companion uses the scoped mono role and becomes 10px on mobile. These smaller supporting roles are service-specific exceptions, not replacements for the shared hierarchy.

**The Content Hierarchy Rule.** Let the actual title, factual summary and body copy establish the hierarchy; service pages have no decorative contact eyebrow.

## Layout

The final studio-layout.css layer gives homepage, service and case content fluid viewport width minus clamp(20px, 2vw, 44px) side gutters. Below 750px gutters are 18px and the principal gap is 28px. Paragraphs and artwork keep their own measures as the shell expands. The homepage garden hero is clamp(520px, 65svh, 600px), stacking below 900px with a 380px scene; projects form four columns from 1200px. Homepage process and FAQ retain the 1fr / 1.65fr relationship and stack on smaller screens.

Service heroes use equal columns with a compact text/facts/action block and an overlapping device composition; below 750px they stack. Main service sections end with the service-section spacing token, changing to service-section-mobile. Audience blocks use two columns; six work cards use three columns, two below 1000px and one below 540px. The directory uses the same three/two/one progression with 16px gaps. The directory introduction's paragraph starts 20px below the heading; card descriptions retain their separate 9px margin.

Related-case grids use the actual number of cases, up to three columns; single-case sections pair the card with explanatory copy and a diagram. Service diagrams have a 560px maximum width and case spreads a 660px maximum. Four roadmap stops share a desktop row; below 750px the keyboard-focusable track scrolls internally, with 230px stops and proximity snapping. Pricing has a 1.35fr / .8fr composition; rows and the sidebar stack at the observed responsive breakpoints. The AI example grid is two columns and stacks below 750px.

Headers remain readable and sticky. The final desktop header has a 64px minimum and gutter-aligned padding; below 750px it has a 56px minimum. Service navigation keeps “Все услуги” and “Кейсы” while hiding the header CTA on mobile. Footer navigation keeps three desktop columns and the dotted wordmark.

## Elevation & Depth

The header alone supplies the prominent homepage glass treatment: rgba(20,20,20,.93), 14px backdrop blur and a 1px #ffffff10 bottom edge. Cards, native disclosure delivery panels and the contact block are flat charcoal surfaces. Photo labels inherit their small overlay treatment; avoid claiming that every inherited blur rule has been removed.

**The Flat Content Rule.** Keep content surfaces flat and separate them with tone, spacing and thin dividers; reserve glass for the header and small image overlays. The overlapping service hero photographs may use diffuse image depth; ordinary work and directory cards remain flat.

## Shapes

The final homepage project shells use 18px corners, 10px padding and 10px photo windows. Primary actions are full pills. Service work cards use 14px corners, related-case and directory shells use 16px, and hero image windows use 14px. Process tags use 8px corners; delivery panels use 16px. FAQ rows have no rounded card shell.

## Components

### Photographic project covers

src/project-cover.mjs loads assets/covers/maverick.webp, loyalty.webp, gift-roulette.webp and tailcare.webp as 1536×1024 image elements. They depict photographic device/product presentations generated from real UI references. They are not guaranteed pixel-identical screenshots; unchanged case captures and demos provide interface evidence. The available generator's model was not selectable. The four WebP files total approximately 621 KB; original outputs remain under .codex/generated_images.

Each cover links to its case. Homepage images fill a 16:11 window using object-fit:cover and scale to 1.025 on hover over 450ms. No CSS laptop keyboard, phone frame or live gameplay remains in the homepage cards.

### Services, process and FAQ

Six service cards pair a title, description and service link with distinct generated editorial images from assets/services. provenance.json and adjacent metadata distinguish these illustrations from client screen captures. The grid has three columns, two below 900px and one below 540px. Five native details elements form the process accordion; shared name="process" requests exclusive opening in supporting browsers, and the first starts open. Each contains descriptive tags and two delivery blocks for the discussion/demo checkpoint and output. These are informational, not simulated task-status controls.

FAQ disclosures are flat rows with thin dividers. Preserve native summary keyboard behavior. The homepage anchor and summary focus ring is 2px white, offset by 5px.

### Actions and behavior

Homepage primary CTAs use the final 44px minimum, 13px type and 11px 20px padding. The homepage service-overview link independently has a 44px target. Service primary CTAs inherit 13px Manrope, 14px 24px padding and a full pill; the 22px SVG produces a measured 50px desktop height at 1440px (min-height remains auto). Header navigation stays visible on mobile while the header CTA hides. Reduced-motion CSS suppresses homepage transitions and animations. Native scrolling and the existing case demo/dialog behavior remain. No new performance score, device verification or deployment is implied by these source-derived rules.

### particle hero and footer

The homepage has a document-wide Canvas dot field: dense in the hero, sparse below, with gentle autonomous drift, cursor repulsion and spring return. A full-width authored Three.js lunar garden replaces the ASCII hero orb. Procedural grey rocks, terrain, gravel and instanced silver grass provide real depth; the grass has shader wind and bends around the cursor. One small ASCII cube remains in the process section. Reduced motion stops animation; the garden stops rendering offscreen and all animation stops in hidden tabs. No Spline embed, remote scene or paid dependency remains. Desktop description and actions sit under the left headline, with a silver tree on the right; text and garden stack below 700px.

The homepage industry carousel is removed. Footer navigation uses three columns desktop and two mobile, with the dotted LANCER wordmark and abstract sculpture treatment. Preserve reduced-motion behavior; visible scene controls were removed at the user’s request.

### Editorial case shell

case-editorial.css applies #141414 ground and #222 surfaces to all four cases. Content width is min(1220px,92%); stories alternate .85fr / 1.3fr columns with 65px gaps and stack below 800px. The 24px-radius cover has a 620px maximum height. The readable sticky header removes the old notch. Capability cards have 19px corners and four columns, two below 800px and one below 540px.

Generated real-device visualizations appear in alternating stories and open the dark image lightbox. Original captures remain available as interface evidence. Only retained productStage sections are interactive demos. Architecture disclosures, technology details, related projects and the footer complete each case. Preserve simulation boundaries and never call static screenshots live interfaces.

Current evidence: .impeccable/review/lunar-desktop.png and lunar-mobile.png. Desktop and mobile viewport, cursor response and pause checked locally; performance is not benchmarked across physical devices.

### Service catalog extension — October 1, 2026

The seven current service surfaces are /services/ and the websites, web-apps, telegram-mini-apps, crm, automation and mvp routes. They reuse existing generated service and case-visual assets; no new raster generation belongs to this update. A visible caption distinguishes these interface visualizations from exact screens in the cases.

The individual-page pattern is hero, audience, six included-work cards, truthful related cases, a service-specific example diagram, four-stage roadmap, handover, bounded price rows, a related-service link and native FAQ with a small ASCII companion. AI adds four hypothetical examples between cases and its mechanism. The directory presents six linked cards with starting prices. This composition is scoped to services; the homepage garden and retained productStage demos keep their existing roles.

Service hero photographs overlap with back/front rotations of −6° / 3° and diffuse shadow (0 16px 35px #0006). Hover softens their rotation and lifts them 4–5px over 700ms. Work cards lift 3px and lighten on hover; directory cards lift 4px, with image scale 1.025. Related-case images scale 1.035. Reduced motion removes these transforms and transitions. Diagrams show an example page map, role/data relationship, Telegram/bot/Mini App relationship, categorical CRM states, integration success/error branches or the bounded MVP structure. Mini App diagram marks are inline SVG.

The first native FAQ disclosure starts open. The existing disclosures.mjs supplies interruptible 440ms height transitions while preserving summary keyboard behavior and the no-JavaScript fallback. Shared 850ms one-time reveals and 480ms ASCII updates run only when permitted; offscreen/hidden motifs stop and reduced motion settles immediately. Service links, buttons and summaries use a 2px light focus outline with a 5px offset.

Source provenance: src/service-catalog-data.mjs, src/service-pages.mjs, src/seo-data.mjs, src/service-stories.mjs, src/service-visuals.mjs, service-editorial.css and the shared final CSS/runtime layers. Final local captures: .impeccable/review/service-new-desktop.png, service-new-mobile.png, service-directory-desktop.png, service-directory-mobile.png, service-ai-desktop.png and service-ai-mobile.png. The 20px directory-intro margin and service button dimensions were confirmed in the browser. No deployment or physical-device benchmark is inferred from these captures.

## Do's and Don'ts

- **Do** preserve the particle hero → projects → services → process → FAQ → contact sequence.
- **Do** keep homepage and case editorial shells scoped and product demos intact.
- **Do** distinguish generated photographic presentations from original product captures.
- **Don't** restore the CRM hero, workflow scene, long roadmap or CSS device constructions on the homepage.
- **Don't** invent generator model names, business outcomes or performance claims.

The dated notes below preserve prior local evidence. Their older four-service descriptions and measurements are historical snapshots; the current frontmatter, canonical sections and service catalog extension above describe the active service surface. Pre-existing homepage/footer eyebrows and obsolete layered selectors are not canonized as future patterns or repaired by this scoped documentation pass.

## Editorial polish — October 1, 2026

The shared final layer is interface-polish.css. FAQ actions use #f4f4f4 with #141414 text (including child spans); image dialogs use #222 and a neutral backdrop. Service cards contain single-device photographs, without ornamental props or CSS device frames. New service pages use service-editorial.css with 65–100px section spacing, typography-led scope rows and one small service-specific ASCII drawing. Mobile spacing is 38–65px.

Case openings are text only. Generated real-device spreads replace framed screenshot stories, grouping related descriptions and preserving every feature. Stories use .8fr / 1.35fr columns, a 55px gap, 65–90px vertical spacing, and stack below 750px. Eight assets live in assets/case-visuals; all generation records are in assets/device-visuals.json. Exact screens remain in original captures and retained demonstrations.

Motion: 850ms reveal at most once, gentle device scaling on hover, 440ms interruptible disclosure-height transitions, ASCII pixel changes at 480ms intervals. Reduced motion cancels continuous and entrance effects. Lunar terrain spans beyond the camera frame, its canvas blends into the page at the sides/bottom, and no instruction or pause caption appears.

Current browser evidence: .impeccable/review/case-polished.png, services-polished.png, service-covers-polished.png, service-mobile-polished.png and home-mobile-polished.png. Desktop and 390px mobile layouts, FAQ opening, image enlargement, scene readiness and console errors were checked; no cross-device frame-rate benchmark is claimed.

## Silver tree and service diagrams — October 1, 2026

The homepage has a document-wide Canvas dot field: dense in the hero, sparse below, with gentle autonomous drift, cursor repulsion and spring return. Its full-width authored Three.js lunar garden contains grey rocks, terrain, gravel and instanced silver grass, with shader wind and cursor bending. A volumetric silver tree stands in the right foreground, with tapered curved branches, instanced curved leaves, subtle sway and a few slowly falling leaves. Local RoomEnvironment lighting supplies neutral metallic reflections. The description and actions sit under the left headline. On screens below 700px, text and garden stack. Reduced motion stops animation; rendering pauses offscreen and in hidden tabs. No Spline embed, remote scene or paid dependency remains.

The native process, FAQ and case disclosures use disclosures.mjs: a 440ms CSS height transition that reverses from the current rendered height when clicked again. Native summary keyboard behavior and the no-JavaScript fallback remain. Reduced motion and hidden tabs settle immediately.

All four service pages now pair their introduction with a relevant three-node flow diagram and a small ASCII motif. Four horizontal roadmap stages show a visible deliverable at each step, with no invented duration or performance metric. Mobile stages scroll within the page. Sections have greater separation. Homepage service illustrations fade softly at their edges into the #222 card surface.

Local evidence: .impeccable/review/silver-tree-desktop.png, silver-tree-mobile.png, blended-services.png, service-flow-desktop.png and service-roadmap-desktop.png. Desktop and 390px layouts, scene readiness, console errors, interruptible opening and closing, and mobile roadmap overflow were checked. No physical-device performance benchmark is claimed.

The tree crown is fully framed: the camera aims higher, the tree sits in front of the rocks, and the canvas has no top fade. Only the side and lower garden edges fade. The hero keeps one descriptive paragraph; the two-line sentence about the first scenario and attention to detail is removed. Desktop and 390px mobile framing were checked; evidence: .impeccable/review/tree-foreground-desktop.png and tree-foreground-mobile.png.

## Full canopy and progressive loading — October 1, 2026

The tree has a deeper, fuller canopy with 3,000 desktop / 1,400 mobile instanced curved leaves and static canopy shadows. Its projected leaf outlines fit within the right hero area; the crown top aligns with the first headline, with an 8px optical offset. Desktop scene height is 760px; tablet and mobile text and scene stack below 900px. Grass uses 26,000 / 9,500 instances; rendering caps at 60 / 30 fps and pauses offscreen, hidden or under reduced motion. Shadows refresh at setup/resize instead of every animated frame.

Every canonical, utility and case page has a small, nonblocking entry/navigation progress line. Images show local loading indicators, decode asynchronously, and keep real src, alt and dimensions in static HTML. Native lazy loading and srcset choose 18 optimized 768px WebP variants (457,060 bytes combined versus 1,692,824 bytes for full sources, 73% smaller); large screens and image zoom retain originals. src/image-policy.mjs applies this during document build. src/build-responsive-images.mjs recreates derivatives with Sharp, optionally supplied as a module path. The homepage no longer requests the unused demo entry/style; case demos still load near the viewport. The garden import waits for viewport intersection and idle time after first text paint, with local loading/error states. No blocking page overlay or simulated percentage hides the content.

Verification: six SEO/loading tests passed; static content, metadata, canonical routes, image candidate files and loading policy checked. Browser desktop/mobile review verified tree framing, no page overflow, scene readiness, smaller image selection, image zoom at original resolution, viewport-triggered demo mount and absence of console errors. Local 1440px measurement: heading top 149px, sampled crown top 157px. Evidence: .impeccable/review/tree-volume-desktop.png and tree-volume-mobile.png. Asset-byte savings are measured; no Lighthouse score or physical-device frame-rate benchmark is claimed.

## Garden entrance and service structure — October 1, 2026

The garden uses a subtle sage tint on grass and foliage, with silver branches and neutral rocks. The loading circle is removed. A small decorative point at screen 8% / 84% anchors a world-space radial, dither-soft reveal of terrain, stones and grass over 2.8 seconds. After 650ms the tree grows proportionally from its base, with leaves opening during the growth. The complete model keeps its existing camera fit. Cursor rays intersect a camera-facing plane through the canopy; nearby leaves bend and flutter in the vertex shader, with exponential easing on entry and exit. Falling leaves and ambient wind remain. No per-leaf pointer loop is added. Reduced motion shows the full garden immediately; rendering and the entrance clock pause offscreen or in hidden tabs.

Service roadmaps remain. Each route adds a distinct diagram beside the existing explanatory copy: page map, Telegram/bot/Mini App links, a categorical CRM board, or automation success/error branches. These are clearly marked examples, without invented statistics. The delivery section reverses the desktop composition with a small ASCII motif and handover list left, factual result text right. Mobile stacks text first. All source service paragraphs remain intact. The footer has three desktop navigation columns; the directions column is removed.

Local evidence: .impeccable/review/garden-sage-desktop.png and service-map-desktop.png. Desktop and 390px mobile layouts, canopy pointer hit, scene readiness and console errors checked. No physical-device frame-rate benchmark is claimed.

## Fluid, compact composition — October 1, 2026

The final studio-layout.css layer replaces the fixed 1180–1320px shell with fluid width and clamp(20px, 2vw, 44px) side gutters; mobile gutters are 18px. The desktop hero is clamp(520px, 65svh, 600px), with a 40–56px headline and adjacent actions. The garden fills the viewport width. Ground and grass distribution extend horizontally, while camera fitting accounts for both canopy width and full tree height without distorting the model. Grass is #4b7745 and foliage #537d3f, with lower metallic response; branches remain silver. Instance counts and animation budgets are unchanged.

Four homepage projects share a row from 1200px; service cards are 300–325px tall. Section spacing, service/case typography and footer height are more compact. Diagrams keep a 560px width limit and case devices 660px, so expanding the page does not inflate the artwork or paragraph measures. Tablet/mobile retain stacked sections. Browser review covered 1920px DOM framing, 1440px desktop visuals and 390px mobile home/service/case layouts; no horizontal overflow or console errors were found. Local evidence: .impeccable/review/wide-green-desktop.png and wide-green-mobile.png. Six SEO/loading tests passed.
