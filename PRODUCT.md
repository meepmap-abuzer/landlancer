# Lancer Agency — product brief

Russian agency portfolio at landlancer.ru. Lancer builds websites, Telegram Mini Apps, CRM, administration tools and integrations for founders and business teams. Contact actions open the agency Telegram conversation.

## Current homepage — October 1, 2026

The user rejected the dark CRM hero, counter/workflow scene, long roadmap and CSS device mockups. The active homepage now follows this sequence: compact text hero, four photographic product covers, illustrated service cards, native process accordion, flat FAQ and contact. Its ground is #141414, card surfaces #222 and primary actions white. studio-home.css then studio-world.css scope the homepage. Four cases share case-editorial.css and retain their interactive productStage demos.

The four assets under assets/covers are generated photographic presentations based on real product UI references, not literal unedited product screenshots or documentary photographs. The available image generator was used; its model was not selectable, so do not assert a named model. The four WebP assets total approximately 621 KB; originals remain under .codex/generated_images. Case demos and original captures remain the authoritative interface evidence. No CSS laptop/phone constructions remain in the active homepage covers.

## Portfolio and process

- Maverick: loyalty Mini App covering QR activation, points, tasks, rewards and merchandise.
- 12К: Mini App and Loyalty API business portal, with the full case and retained local card, QR, bonus and Stack demonstrations.
- Gift Roulette: four game interfaces and Telegram administration, with locally simulated case, Mines, Crash and Upgrade demonstrations.
- TailCare: pet listings, search, community and Telegram publishing, with retained local filtering and favorites.

Homepage covers link to the corresponding cases. DEMOS.md records source reuse and simulation boundaries. Do not invent commercial outcomes or imply real prizes, payments, loyalty issuance or authenticated transactions in the portfolio demos.

The five native process disclosures cover discovery, interface design, development, QA and handoff. Each explains the discussion or demonstration checkpoint and resulting deliverable. The first is initially open. They replace the long interactive roadmap; no timeline, task-status widget, checklist or invented duration is promised on the homepage.

## Durable requirements

The homepage has a document-wide Canvas dot field: dense in the hero, sparse below, with gentle autonomous drift, cursor repulsion and spring return. A full-width authored Three.js lunar garden replaces the ASCII hero orb. Procedural grey rocks, terrain, gravel and instanced silver grass provide real depth; the grass has shader wind and bends around the cursor. One small ASCII cube remains in the process section. Reduced motion stops animation; the garden stops rendering offscreen and all animation stops in hidden tabs. No Spline embed, remote scene or paid dependency remains. Desktop description and actions sit under the left headline, with a silver tree on the right; text and garden stack below 700px.

## Sculpture, services and case editorial update — September 30, 2026

The homepage has a document-wide Canvas dot field: dense in the hero, sparse below, with gentle autonomous drift, cursor repulsion and spring return. A full-width authored Three.js lunar garden replaces the ASCII hero orb. Procedural grey rocks, terrain, gravel and instanced silver grass provide real depth; the grass has shader wind and bends around the cursor. One small ASCII cube remains in the process section. Reduced motion stops animation; the garden stops rendering offscreen and all animation stops in hidden tabs. No Spline embed, remote scene or paid dependency remains. Desktop description and actions sit under the left headline, with a silver tree on the right; text and garden stack below 700px.

Six generated editorial service images in assets/services replace repeated screenshots. provenance.json and adjacent metadata record generation; these illustrations are not client screenshots. Service cards use three, two and one columns. The homepage industry carousel is removed; concept pages and their footer links remain. Contact, four navigation columns and the dotted LANCER footer remain.

Maverick, 12К, Gift Roulette and TailCare share the #141414 / #222 editorial shell: readable sticky navigation, text-only openings, alternating generated device spreads with a dark lightbox, retained interactive productStage demos, capability cards, architecture details, related projects and footer. Static screen stories must not be described as live demos.

Current evidence: .impeccable/review/lunar-desktop.png and lunar-mobile.png. Desktop and mobile viewport, cursor response and pause checked locally; performance is not benchmarked across physical devices.

## Device imagery and service spacing — October 1, 2026

Case opening covers are removed; homepage covers stay. Eight generated images under assets/case-visuals group the existing fifteen feature descriptions into two editorial spreads per case. Real-device visualizations include Dynamic Island and iOS time/battery on phones; they are explicitly identified as visualizations, and retained product demos show exact behavior. Six service illustrations are now minimal single-device studio images rather than decorative props. All fourteen WebP images total approximately 1,047 KB. assets/device-visuals.json records generation prompts, references, originals and delivery paths.

Four service pages share service-editorial.css: spacious introductory sections, thin ruled scope rows, small animated ASCII motifs, a readable header and the studio footer. interface-polish.css provides white readable FAQ/contact actions, generated-device presentation and a dark image lightbox. Reveal, hover, disclosure and small ASCII motion respect reduced motion and hidden/offscreen visibility. The full-width lunar field has expanded terrain and soft edges; cursor hints and the visible pause control are removed at the user’s request.

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

### Garden and service composition — October 1, 2026

Homepage foliage now responds smoothly to hovering. Grass and leaves have a muted green tint. The circular scene loader is replaced by a small lower-left seed point and a radial garden entrance followed by proportional tree growth and leaf opening. Reduced-motion visitors see the completed scene immediately. Existing lazy images, responsive WebP variants and viewport-triggered scene loading remain.

Service pages retain roadmaps and factual copy while adding service-specific architecture diagrams and alternating copy/ASCII handover sections. Example diagrams do not claim actual customer metrics. The footer directions column is removed. These changes are verified locally; no deployment is implied.
