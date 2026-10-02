# Service diagrams and minimal surfaces — 2026-10-02

User amendment: repair the service schemes and remove the gradient backplates shown behind the hero artwork and functional diagrams. Keep restrained saffron and selective frosted glass.

Changed six functional diagrams to equal-column HTML node rows with decorative SVG connector strips. Column centres match between rows and strips; incoming stems, outgoing stems and chevrons touch node boundaries. Web-service user roles are separate from data and external integrations. CRM becomes a vertical sequence on mobile. AI examples now use four ordered steps with a horizontal desktop rail and vertical mobile rail.

Service hero artwork and functional diagrams sit on transparent page ground. Other groups use a uniform translucent wash without broad shadows or gradient highlights. Blur is limited to navigation and image captions; native product demos are excluded. No dependencies, images or animation loops were added.

Validation:
- Static build completed; source syntax checks passed.
- SEO regression suite: 7 tests passed, including internal fragments/assets, static headings, metadata, pricing bounds and image loading.
- In-app browser: all six service diagrams checked at a 390 × 844 CSS viewport. No horizontal page overflow or clipped node labels; connector strips span the same width as node rows and join their boundaries.
- Desktop geometry and screenshots inspected for web-services, Telegram and automation; all shared strip connections align within 1 CSS pixel. CRM sequence and website/MVP branch layouts inspected during the initial desktop pass, with all six responsive layouts confirmed after changes.
- AI mobile screenshot confirms the document → extraction → check → CRM sequence and continuous vertical rail.
- Current sampled CRM console contained no warnings/errors. This is scoped in-app-browser verification, not a Safari/Firefox audit.

Five-axis source review: no blocking findings. Static escaped labels preserve readability and accessibility; decorative connectors are aria-hidden. Shared helper replaces six fragile layout variants, price/business content is unchanged, product-demo styles stay scoped, and fewer backdrop filters reduce rendering work.

Public deployment is verified separately after the Git push.
