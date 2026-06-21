---
name: latent-design
description: Design system for latent. — generates well-branded interfaces and assets for the latent. ecosystem (umbrella site, ido, logos). Contains the full design canon: brand guidelines, color tokens, type scale, self-hosted fonts, SVG assets, and JSX reference prototypes for all three surfaces.
user-invocable: true
---

# latent. — design skill

`latent.` is a quiet systems laboratory. The brand is typography-first, warm-neutral, architectural, and restrained: **depth over noise**, borders over shadows, accent used sparingly.

Two products live under the umbrella:
- **ido** (井戸) — local-first knowledge system, notes, wiki, tasks, goals
- **logos** (λόγος) — algorithmic trading, backtesting, research

## Files in this skill

| File | What to do with it |
|---|---|
| `README.md` | Full brand canon — read this for foundations, voice, assets, usage |
| `tokens.css` | The token source: `@font-face`, both color themes, type/space/radius/motion scale, CSS reset. Copy or submodule into every project. |
| `components.css` | Shared component CSS (header/footer shell, project row, tag). Needs `tokens.css` first. |
| `fonts/` | Self-hosted woff2s — General Sans, Geist, Geist Mono. Ship alongside `tokens.css`. |
| `assets/` | SVG wordmarks and marks in dark + light variants. |
| `docs/` | **Ecosystem canon** — engineering knowledge (architecture, conventions, bootstrap, glossary, MCP roadmap). Read when building/modifying any latent. app, not just for visuals. |
| `ui_kits/latent-site/` | JSX prototype — umbrella website patterns |
| `ui_kits/ido/` | JSX prototype — ido knowledge system patterns |
| `ui_kits/logos/` | JSX prototype — logos trading/research patterns |

Each `ui_kits/<product>/` contains `README.md`, interactive `index.html`, `components.jsx`, and `views.jsx`.

## How to use this skill

### For prototypes and mocks (HTML artifacts)

1. Read `README.md` for brand context and visual rules
2. Use `tokens.css` + `components.css` as your stylesheet base (inline or linked)
3. Lift JSX patterns from `ui_kits/` and translate to plain HTML
4. Use font files from `fonts/`, SVGs from `assets/`
5. Icons: Lucide via CDN only. Never hand-draw, never emoji.
6. Produce a single static `index.html` the user can open in a browser

### For production code (Leptos/Rust)

1. Read `README.md` for foundations and rules
2. Pair with `latent-ui` (Rust crate) for production Leptos components — it provides `ThemeToggle`, `Tag`, theme machinery, and will grow to include `SiteHeader`, `SiteFooter`, `ProjectRow`
3. CSS is consumed via git submodule (`vendor/latent-design`) — see README for Trunk wiring
4. Produce idiomatic Leptos components matching the brand

### For design decisions

Read `README.md` — especially the Color, Typography, Surfaces, and North Star sections. When in doubt: quieter is correct.

## Quick token reference

```css
/* dark theme (default) */
--color-bg:             #11110f   /* base background */
--color-surface:        #181816   /* card/panel surface */
--color-border-subtle:  #2a2925   /* hairline borders */
--color-text-primary:   #e9e2d4   /* headings, primary text */
--color-text-secondary: #aaa196   /* body, supporting text */
--color-text-muted:     #777169   /* metadata, labels */
--color-accent:         #b7a98f   /* single accent, use sparingly */
--font-ui:   "Geist", sans-serif
--font-mono: "Geist Mono", monospace
```

## If invoked with no guidance

Ask: which surface (latent. site, ido, logos, or something new)? Prototype or production code? Then act as an expert designer and deliver.

## North star

> Does this make latent. feel **quieter, clearer, and more structurally intentional?**
> If yes, keep it. If it only makes things louder, trendier, or more decorative, remove it.
