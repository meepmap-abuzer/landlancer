# Generated image prompt record

Generated with the built-in GPT Image tool (not a CLI). The tool chose the available image model; no claim is made about a specific model version. WebP derivatives are in `assets/art/`. These are background artwork, not generated product screenshots. Prompts below record the visual instructions used for each asset.

| Asset | Prompt |
| --- | --- |
| alpine-hero.webp | Photoreal luxurious airy alpine lake, pale blue mountains, clear sky, white platforms and conifers. On the RIGHT, three thick transparent blue glass rounded slabs upright and tilted. LEFT negative space for copy. Natural ray-traced glass reflections. No text, UI or logo. |
| gift-garden.webp | Crystal glass gift box with olive green bow on the RIGHT third, moss, daisies, leaves, misty mint garden. LEFT two thirds empty for copy. Soft morning light, transparent glass. No UI or text. |
| crystal-orbit.webp | Center three interlocking transparent icy blue glass orbital rings around a crystal diamond, floating above an alpine lake. Negative space on both sides for information cards. Natural ray tracing, no logo or text. |
| services.webp | Wide 3:1 composition, four equally spaced columns: glass browser with alpine landscape; two glass smartphones with paper plane; CRM glass charts; connected glass cubes with lightning. Pale blue and white, no captions. |
| maverick-orbit.webp | Pale periwinkle alpine valley. RIGHT tilted lavender-blue glass torus containing an amber sphere. LEFT light negative space. Premium soft natural light, no cyberpunk, no logo or text. |
| tailcare-meadow.webp | RIGHT emerald glass paw sculpture, grass, daisies, leaves, misty alpine meadow. LEFT light negative space. Caring airy morning mood, no logo or text. |
| gift-center.webp | CENTER crystal glass gift with olive bow, occupying middle 32 percent. Floating on moss meadow with daisies, forest and waterfall, soft mint. Both sides empty for cards. No text or UI. |

## Implementation research

Glass controls are live HTML/CSS. Rounded highlights, transparent fills, background blur and an SVG displacement map provide the optical effect. Chromium gets refraction; other browsers retain the CSS glass treatment.

- https://kube.io/blog/liquid-glass-css-svg/
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
