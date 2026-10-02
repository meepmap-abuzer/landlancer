# Asset provenance

## October 2: Monochrome studio amendment

The user's later instruction restores illustrated covers specifically to the homepage “Работы” grid. Four new built-in image_gen renders in `assets/covers/*-mono-v2.webp` depict the actual project's interface on a realistic device, in neutral graphite/silver/frosted-glass studio compositions. Original product captures were supplied as interface references. These are fictional visualizations, not documentary photographs or guaranteed pixel-exact captures. The four 768px WebP derivatives and every original record the exact prompt and input origin in adjacent sidecars. Home uses these new covers; service proof cards retain actual captures, and hero/service illustrations remain vector geometry.

The initial monochrome request removed decorative photography while retaining the page structure. Home hero and service illustrations use authored vector interface geometry from `src/digital-visuals.mjs`, and the footer is a plain neutral field. Those regions introduce no new raster. The diagram is a conceptual explanation of design and development, not a captured product or performance claim.

Service case previews reuse the original `club-home.webp`, `12k-dashboard.webp`, `pets-home.webp` and `gift-home-current.webp` captures described below; those same captures are references for the new homepage covers. Their adjacent provenance sidecars record the existing capture origins and fictional demo fixtures. Product colors remain native inside the captured interfaces. Generated physical device spreads inside case stories remain interface visualizations with the visible caveat; original captures and interactive demos are separate evidence.

The earlier studio, service and cover illustrations remain in versioned historical assets but are no longer used by the primary home/service presentations. They are retained because the user asked to remove them “for now”; this does not make them current design authority.

## October 2: Frosted studio

`assets/studio/glass-studio.webp` (1672×941) and `glass-studio-960.webp` (960×540) were generated with the built-in image_gen tool and encoded to WebP. They depict a fictional studio; they are decorative illustrations, not photographs of Lancer's office. The exact generation prompt, origin and original output path are preserved in the adjacent `.webp.json` sidecars. No client work is attributed to the interfaces within this decorative scene. Existing project covers and case device visualizations retain their recorded origins.

The latest interactive exhibits additionally reuse product code and assets documented in DEMOS.md. TailCare sample photos in assets/demos are copied from FRONT/public/demo-dogs. 12К card texture and brand mark are copied alongside its Vue components and bundled by Vite. New gift inventory symbols are illustrative vector icons; they do not represent an actual inventory or rewards.

Captured September 19, 2026 using the in-app browser. PNG originals are retained; optimized WebP derivatives are used by the site.

| Files in assets/screenshots | Source |
| --- | --- |
| club-home, club-roulette, club-tasks, club-shop | Maverick Vue frontend at localhost:4313 through a local read-only presentation proxy at localhost:4323. Fictional user, balance, rewards, tasks and catalog. No production authentication or requests. Current cream/red/navy UI preserved. |
| gaming-home, gaming-mines, gaming-upgrade, gaming-crash | Gift Roulette frontend at localhost:4311. Initial/idle states without a running backend. No game or payment actions performed. |
| gaming-case | Existing actual project screen previously used on the portfolio. |
| gift-mines-active, gift-upgrade-active, gift-crash-active | Existing screenshots/mines_playing.png, upgrade_screen.png and crash_running.png from D:/Data/Projects/Code/gift_roulette. These match the active states in the supplied reference. |
| pets-home, pets-catalog, pets-volunteers | TailCare frontend at localhost:4312. Built-in demo listings; volunteers page shows its current empty state. |

Source repositories were inspected for feature descriptions. No product repository was changed. Local presentation fixture scripts remain in the task work folder and are not included in the release.

## Generated art
Seven images generated using the built-in GPT Image tool and optimized to WebP. Text, controls, phone frames and product screenshots are separate HTML/CSS elements. Prompts are recorded in ART_PROMPTS.md.

- assets/art/alpine-hero.webp
- assets/art/gift-garden.webp
- assets/art/crystal-orbit.webp
- assets/art/services.webp
- assets/art/maverick-orbit.webp
- assets/art/tailcare-meadow.webp
- assets/art/gift-center.webp

## Previous scope
The September 19 placeholder was replaced by the complete 12К case on September 23 at the user’s request.

## September 23, 2026 rebuild

The previous scope restriction on 12К has been superseded by the user's explicit request. 12К is now a full case at /cases/loyalty/.

- 12k-home.png/webp, 12k-missions.png/webp, 12k-shop.png/webp: current Vue frontend from Z:/Users/smoke/OneDrive/Документы/ChatGPT/12K Mini App/frontend, launched on localhost:4314. Its own backend runs in isolated local preview mode using a task-local SQLite database, no production connections. Its built-in fictional member and demo catalog are used. No purchases, reward claims or prize transactions were made.
- 12k-dashboard.png/webp: current Nuxt business portal from Z:/Users/smoke/OneDrive/Документы/Loyalty_API/web on localhost:4315. A task-local backend fixture supplies fictional company, user and financial figures, without real business data. The UI is the actual current source; the case explicitly labels figures as demo data.
- club-home, club-roulette, club-tasks, club-shop refreshed from the current Maverick frontend on localhost:4323. The same local fictional presentation fixtures are used. No game or purchase actions performed.
- TailCare uses the real screens captured and documented on September 19. Gift Roulette now combines fresh captures below with the retained actual case/crash screenshots from the project.

The product repositories were not edited. Local preview databases and fixture servers remain in the task's work directory and are excluded from the public build.

New generated scenery: alpine-world.webp, team-orbit.webp, contact-ring.webp. Generated with the built-in GPT Image tool, not a CLI. These assets are separate from live text and real product screens.

## Gift Roulette viewport revision — September 23

gift-home-current.png/webp, gift-mines-current.png/webp and gift-upgrade-current.png/webp were captured at 430 × 865 from D:/Data/Projects/Code/gift_roulette/src/frontend/app running on localhost:4318. A task-local read-only fixture at localhost:4328 provides empty catalogs and fictional preview balance data; it rejects mutations. Home, idle Mines and empty Upgrade selection are the actual current frontend, with no simulated phone hardware. No game, payment or purchase actions were performed. The case explicitly identifies presentation data as demonstration data.

The homepage and interactive product stage use the refreshed home capture; Mines and Upgrade feature stories use the refreshed idle captures. The existing gaming-case and gift-crash-active screens remain for their respective populated/active scenarios. These were not represented as newly captured active rounds. The source product code was not edited. Preview fixtures and services are not part of the public release.

## September 28: orbital redesign
- `assets/art/orbital-earth.webp` (1536×1024, 275154 bytes) and `orbital-earth-mobile.webp` (960×640, 99076 bytes): generated with built-in GPT Image, then encoded to WebP; decorative illustration, not a claim of NASA authorship or an authentic satellite observation. Original kept in Codex generated_images/01a0ba0f-366c-7831-a716-46acf74a1410/exec-2f2ac3b7-1c7c-404a-bf44-40a8feb28ded.png.
- Exact prompt: Create a premium photorealistic orbital Earth background photograph for a Russian digital agency website. Wide landscape 1536x1024 or wider. Deep near-black space occupies top 45 percent, almost no stars, no nebula, no fantasy planets. Large real Earth curved horizon centered across lower 60 percent, blue oceans and natural white cloud systems, subtle very thin icy blue atmospheric rim, restrained sunlight from upper right. Globe emerging from darkness, beautifully tactile real satellite photographic detail, NASA editorial aesthetic, white ice blue black palette. Composition top center is dark empty negative space for a website headline, bottom center dark blue Earth enough contrast for a translucent white software dashboard. No text, no letters, no logos, no interface, no rings, no mountains, no trees, no artificial glowing particles. Cinematic but physically believable, sober premium design, not science fiction concept art.
- `assets/brand/lancer-original.png`: exact user-provided logo from `D:/загрузки/Изображение ChatGPT 28 сент. 2026 г., 15_54_28-1.png`, supplied September 28 with authorization to use. `assets/brand/lancer.webp` is an 800×320 lossless WebP rendition. Colors and geometry unchanged. CSS crops only surrounding transparent space; a light plate makes the dark lettering readable.

### Sculpted glass service illustration: web
`assets/art/service-web.webp`: built-in GPT Image generation, September 28, 2026. Native transparent output encoded at 640×640 WebP, no cropping. Decorative illustration, not an actual client interface.
Exact prompt: Create ONE premium 3D product illustration for a digital agency website. A complete freestanding wide browser window sculpture, with a beautiful small blue Earth globe inside its hero, two layered clear window frames, subtle lines suggesting website layout. Optical clear liquid glass, polished thick transparent beveled edges, pale ice blue reflections, black chrome tiny details, subtle cyan caustics. Refined physically based studio render, sophisticated Apple product advertising quality. Entire object fits completely inside square canvas with 12% transparent margin on every side, no clipping. Slight three-quarter perspective, consistent camera. Transparent background. No text, no letters, no words, no landscape scenery, no card background, no ground plane. Composition fills 76% canvas. Deliver one isolated cohesive sculpture.

### Sculpted glass service illustration: mini
`assets/art/service-mini.webp`: built-in GPT Image generation, September 28, 2026. Native transparent output encoded at 640×640 WebP, no cropping. Decorative illustration, not an actual client interface.
Exact prompt: Create ONE premium 3D product illustration for a digital agency website. A complete upright smartphone sculpture with a second slim glass panel behind it, a clear blue paper airplane floating alongside, four simple square app tiles visible inside the phone. Optical clear liquid glass, polished thick transparent beveled edges, pale ice blue reflections, black chrome tiny details, subtle cyan caustics. Refined physically based studio render, sophisticated Apple product advertising quality. Entire object fits completely inside square canvas with 12% transparent margin on every side, no clipping. Slight three-quarter perspective, consistent camera. Transparent background. No text, no letters, no words, no landscape scenery, no card background, no ground plane. Composition fills 76% canvas. Deliver one isolated cohesive sculpture.

### Sculpted glass service illustration: crm
`assets/art/service-crm.webp`: built-in GPT Image generation, September 28, 2026. Native transparent output encoded at 640×640 WebP, no cropping. Decorative illustration, not an actual client interface.
Exact prompt: Create ONE premium 3D product illustration for a digital agency website. A complete landscape dashboard sculpture made of layered clear glass windows with a cyan glass bar chart and an elegant line graph, small floating glass data tiles. Optical clear liquid glass, polished thick transparent beveled edges, pale ice blue reflections, black chrome tiny details, subtle cyan caustics. Refined physically based studio render, sophisticated Apple product advertising quality. Entire object fits completely inside square canvas with 12% transparent margin on every side, no clipping. Slight three-quarter perspective, consistent camera. Transparent background. No text, no letters, no words, no landscape scenery, no card background, no ground plane. Composition fills 76% canvas. Deliver one isolated cohesive sculpture.

### Sculpted glass service illustration: automation
`assets/art/service-automation.webp`: built-in GPT Image generation, September 28, 2026. Native transparent output encoded at 640×640 WebP, no cropping. Decorative illustration, not an actual client interface.
Exact prompt: Create ONE premium 3D product illustration for a digital agency website. A complete sculptural assembly of four clear glass cubes linked by slim curved glass conduits, a small electric blue luminous core, precise engineered connections. Optical clear liquid glass, polished thick transparent beveled edges, pale ice blue reflections, black chrome tiny details, subtle cyan caustics. Refined physically based studio render, sophisticated Apple product advertising quality. Entire object fits completely inside square canvas with 12% transparent margin on every side, no clipping. Slight three-quarter perspective, consistent camera. Transparent background. No text, no letters, no words, no landscape scenery, no card background, no ground plane. Composition fills 76% canvas. Deliver one isolated cohesive sculpture.

## September 28: return to the light design with real stock photography
Backgrounds replaced throughout the homepage and case pages. No new AI-generated background imagery. All files hosted locally; desktop/mobile WebP encoding only, no generated edits. Natural lighting, subject and colors retained; readability overlays are CSS, separate from photos. Licenses checked September 28, 2026 and permit these website uses without payment or attribution requirement. Credits retained here.

- assets/photos/glacier.webp and glacier-mobile.webp: Origin: real stock photograph by Zihao Wang. Source https://unsplash.com/photos/a-majestic-mountain-peak-overlooks-a-serene-alpine-lake-Flkv4kpZT6A. License https://unsplash.com/license, checked September 28, 2026. Local WebP desktop/mobile resizes; no generative editing.

- assets/photos/lake.webp and lake-mobile.webp: Origin: real stock photograph by ConfinedRiley. Source https://unsplash.com/photos/a-lake-surrounded-by-mountains-mIj8Cn3oNDg. License https://unsplash.com/license, checked September 28, 2026. Local WebP desktop/mobile resizes; no generative editing.

- assets/photos/forest.webp and forest-mobile.webp: Origin: real stock photograph by eberhard grossgasteiger. Source https://www.pexels.com/photo/sunlight-filtering-through-majestic-forest-trees-28871326/. License https://www.pexels.com/license/, checked September 28, 2026. Local WebP desktop/mobile resizes; no generative editing.

- assets/photos/peaks.webp and peaks-mobile.webp: Origin: real stock photograph by Sean Oblizalo. Source https://unsplash.com/photos/jagged-mountain-peaks-reflecting-in-a-still-alpine-lake-FHL2Pc4sBIY. License https://unsplash.com/license, checked September 28, 2026. Local WebP desktop/mobile resizes; no generative editing.
