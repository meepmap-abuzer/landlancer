# Asset provenance

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
