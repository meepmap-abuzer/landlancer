# LandLancer design

White base, saturated blue accent, cool neutral text. Manrope is self-hosted and already existed in the original repository. Large type and generous spacing; no gradient text or stock laptop imagery.

The homepage introduces the developer and contains exactly four alternating project rows. Case pages share the same identity and alternate explanatory text, restyled functional demos and system diagrams. Technical repository names remain in compatible URLs only.

Motion is limited to the hero composition, occasional visual entrances, case reading progress and direct interaction feedback. All content is available without scroll reveal. Reduced-motion preferences disable ambient and transition animation. Interactive demos have explicit local state and no backend connection.

Editing: `src/build.mjs` contains page templates and case content, `site.css` owns layout, and `site.js` owns demo behavior. Run `npm run build` after changing templates.
