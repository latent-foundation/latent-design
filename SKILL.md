---
name: latent-design
description: Use this skill to generate well-branded interfaces and assets for latent. (the quiet systems laboratory — and its projects ido and logos), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# latent. — design skill

`latent.` is a quiet systems laboratory. The brand is typography-first, warm-neutral,
architectural, and restrained: **depth over noise**, borders over shadows, accent used
sparingly. Two products live under it — **ido** (a local-first knowledge system) and
**logos** (a disciplined trading/research system).

## How to use this skill

1. **Read `README.md` first.** It holds brand context, the content/voice rules, the full
   visual foundations, iconography guidance, and a manifest of every file here.
2. **Pull in the tokens.** Link or copy `colors_and_type.css` — it defines both themes
   (dark = warm graphite, light = stone/paper), the type scale, spacing, radii, motion,
   and semantic element styles. General Sans + Geist Mono are self-hosted from `fonts/`;
   Geist loads from Google Fonts (`@import` is documented at the top of the CSS).
3. **Reuse, don't reinvent.** The `ui_kits/` folders (`latent-site`, `ido`, `logos`)
   contain small, composable JSX components and interactive `index.html` demos. Lift
   components and patterns from there rather than designing new ones.
4. **Use the real assets.** Wordmark SVGs live in `assets/`. Icons: Lucide via CDN (see
   ICONOGRAPHY in the README). Never hand-draw icons or use emoji.
5. **Preview specimens** live in `preview/` if you need to see tokens rendered.

## Output modes

- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets/fonts you
  need and produce static HTML files the user can open and view.
- **Production code:** read the rules here, copy tokens/assets, and design as an expert
  in this brand.

## If invoked with no guidance

Ask what the user wants to build or design (which surface — site, ido, logos, something
new?), ask a few focused questions, then act as an expert designer who outputs HTML
artifacts *or* production code depending on the need.

## North star

> Does this make latent. feel quieter, clearer, and more structurally intentional?
> If yes, keep it. If it only makes things louder, trendier, or more decorative, remove it.

## Note on provenance

Only the `latent.foundation` website exists as real code (a minimal placeholder). The
`ido` and `logos` kits are principled interpretations of the written brief — refine
them against real product decisions as those products get built.
