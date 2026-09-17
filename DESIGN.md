# LandLancer design

White base, saturated blue accent, cool neutral text. Manrope is self-hosted and already existed in the original repository. Large type and generous spacing; no gradient text or stock laptop imagery.

`glass.css` adds a restrained glass treatment requested for clearer grouping. Each numbered homepage project owns one translucent surface containing its description and demo. Case screenshots, interactive explanations and system sections use the same surface. Inner demo wrappers are transparent to avoid duplicate decorative frames. CSS blur, a white edge and subtle blue light provide depth; no animation loop or new dependency is needed. Reduced transparency/high contrast and browsers without backdrop filtering receive opaque surfaces. Visual references: Apple HIG Materials and MDN backdrop-filter.

The homepage introduces the developer and contains exactly four alternating project rows. Case pages share the same identity and alternate explanatory text, restyled functional demos and system diagrams. Technical repository names remain in compatible URLs only.

Motion is limited to the hero composition, occasional visual entrances, case reading progress and direct interaction feedback. All content is available without scroll reveal. Reduced-motion preferences disable ambient and transition animation. Interactive demos have explicit local state and no backend connection.

Editing: `src/build.mjs` contains page templates and case content, `site.css` owns layout, and `site.js` owns demo behavior. Run `npm run build` after changing templates.

`responsive.css` loads after the base stylesheet and contains shared responsive rules. Phone layouts use larger body text and touch targets; tablets (701–1023 px) keep a two-column hero and full-width project demos. Navigation switches at 800 px, phone galleries at 600 px. Gallery controls appear only when the track overflows. The screenshot dialog puts controls below portrait images on phones and beside images in short landscape windows. Safe-area insets and dynamic viewport heights keep controls reachable.

The brand mark is a single geometric uppercase L, shared by the header and favicon. Noninteractive scope rows do not contain link arrows. Case screenshot galleries preserve original interface colors inside the blue-and-white page; mobile phone galleries scroll horizontally. The business cabinet uses a real report-screen capture rather than the generic system diagram. Screenshot zoom uses a native modal dialog with keyboard navigation and focus restoration.
