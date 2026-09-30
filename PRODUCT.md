# Lancer Agency — product brief

Russian agency portfolio at landlancer.ru. Lancer builds websites, Telegram Mini Apps, CRM, administration tools and integrations for founders and business teams. Contact actions open the agency Telegram conversation.

## Current homepage — September 30, 2026

The user rejected the dark CRM hero, counter/workflow scene, long roadmap and CSS device mockups. The active homepage now follows this sequence: compact text hero, four photographic product covers, illustrated service cards, industry carousel, native process accordion, flat FAQ and contact. Its ground is #141414, card surfaces #222 and primary actions white. studio-home.css then studio-world.css scope the homepage. Four cases share case-editorial.css and retain their interactive productStage demos.

The four assets under assets/covers are generated photographic presentations based on real product UI references, not literal unedited product screenshots or documentary photographs. The available image generator was used; its model was not selectable, so do not assert a named model. The four WebP assets total approximately 621 KB; originals remain under .codex/generated_images. Case screenshots and demos remain the authoritative interface evidence. No CSS laptop/phone constructions remain in the active homepage covers.

## Portfolio and process

- Maverick: loyalty Mini App covering QR activation, points, tasks, rewards and merchandise.
- 12К: Mini App and Loyalty API business portal, with the full case and retained local card, QR, bonus and Stack demonstrations.
- Gift Roulette: four game interfaces and Telegram administration, with locally simulated case, Mines, Crash and Upgrade demonstrations.
- TailCare: pet listings, search, community and Telegram publishing, with retained local filtering and favorites.

Homepage covers link to the corresponding cases. DEMOS.md records source reuse and simulation boundaries. Do not invent commercial outcomes or imply real prizes, payments, loyalty issuance or authenticated transactions in the portfolio demos.

The five native process disclosures cover discovery, interface design, development, QA and handoff. Each explains the discussion or demonstration checkpoint and resulting deliverable. The first is initially open. They replace the long interactive roadmap; no timeline, task-status widget, checklist or invented duration is promised on the homepage.

## Durable requirements

Preserve service and privacy routes, SEO content and metadata, existing domain configuration, native scrolling, keyboard access, reduced-motion support, case screenshot dialogs and product demo boundaries. Homepage branding is the compact icon plus Lancer Agency text; cases use readable sticky navigation without the old notch. The homepage sculpture is a wide closed metallic ribbon rendered in WebGL. Documentation does not authorize deployment or establish new browser, device or FPS verification.

## Sculpture, services and case editorial update — September 30, 2026

The homepage hero contains a custom wide closed metallic ribbon mesh in Three.js. Crossing loops reveal physical depth across the full hero width; pointer tilt and subtle slow idle rocking animate the form. src/sculpture/main.mjs is the implementation, with Three.js attribution retained in THREE-LICENSE.txt. The animation follows requestAnimationFrame refresh cadence with delta-time exponential damping and DPR capped at 1.5. The only scene control is pause. User pause, offscreen and hidden-tab suspension, and reduced motion constrain decorative animation; no measured FPS is claimed.

Six generated editorial service images in assets/services replace repeated screenshots. provenance.json and adjacent metadata record generation; these illustrations are not client screenshots. Service cards use three, two and one columns. The industry carousel retains three actual case categories and three explicitly labelled design concepts. Contact, four navigation columns and the dotted LANCER footer remain.

Maverick, 12К, Gift Roulette and TailCare share the #141414 / #222 editorial shell: readable sticky navigation, large photographic covers, alternating actual screenshot stories with lightbox, retained interactive productStage demos, capability cards, architecture details, related projects and footer. Static screen stories must not be described as live demos.

Review artifacts under .impeccable/review include desktop.png, mobile.png, services-desktop.png, case-desktop.png, case-mobile.png, detect-webgl.json, ribbon-desktop.png and ribbon-mobile.png. They record local review evidence, not universal browser or performance guarantees. Changes remain local branch work; no deployment is recorded.
