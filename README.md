# latent. — design system

> **depth over noise.** typography-first, warm-neutral, architecturally restrained.

The brand canon for `latent.` — a personal systems laboratory. This repo is the single source of truth for every visual decision across the umbrella site, `ido`, and `logos`. It doubles as a Claude Code skill (`SKILL.md`).

---

## The ecosystem

```
latent.            umbrella identity — hidden structure, the systems archive
├── ido   (井戸)   local-first knowledge system — a quiet well for thought
└── logos (λόγος)  algorithmic trading / research — disciplined reasoning under uncertainty
```

---

## What lives here

| File / folder | What it is |
|---|---|
| `tokens.css` | **The canon.** `@font-face` rules, both color themes, the full type / space / radius / motion scale, and CSS reset + base. Load this first in every project. |
| `components.css` | Shared component styles: site header/footer shell, project row, tag pill. Depends on `tokens.css`. |
| `fonts/` | Self-hosted woff2 family — General Sans, Geist, Geist Mono. Font paths in `tokens.css` resolve relative to the CSS file; ship `fonts/` alongside it. |
| `assets/` | SVG marks and wordmarks, dark + light variants (see Assets below). |
| `docs/` | **Ecosystem canon** — architecture, conventions, bootstrap guide, glossary, knowledge/MCP roadmap. The single source of truth that every app's `CLAUDE.md` points at (see below). |
| `SKILL.md` | Claude Code skill manifest — makes this a usable `/latent-design` skill. |

> **This repo is the design canon — tokens, components, fonts, assets, and the engineering docs — not a component library.** Production UI lives in `latent-ui` (Leptos/Rust) and in each app.

---

## Ecosystem canon — `docs/`

This repo is also the **single source of truth for engineering knowledge** across the
ecosystem, not just visuals. Because `latent-design` is vendored into every app as the
`vendor/latent-design` submodule, anything in `docs/` ships into every app's working tree
— so each app's `CLAUDE.md` **points at these files instead of restating them**, which
keeps the canon from drifting.

| Doc | What it covers |
|---|---|
| [`docs/ecosystem.md`](docs/ecosystem.md) | The 3-layer architecture, sharing model, CSS cascade, anti-FOUC, dependency pinning |
| [`docs/conventions.md`](docs/conventions.md) | Rust/Leptos/Trunk conventions, formatting, signals, theme, CI |
| [`docs/bootstrap-new-app.md`](docs/bootstrap-new-app.md) | Step-by-step: stand up a new latent. app |
| [`docs/glossary.md`](docs/glossary.md) | What latent. / ido / logos / each layer mean |
| [`docs/knowledge-architecture.md`](docs/knowledge-architecture.md) | Knowledge-centralization + MCP roadmap (incl. ido as an MCP server) |

---

## Using in a project

### Leptos + Trunk (the standard path)

Add as a git submodule at `vendor/latent-design`, then wire Trunk to copy the assets and load the CSS cascade in order:

```html
<!-- index.html -->
<link data-trunk rel="css"      href="vendor/latent-design/tokens.css" />
<link data-trunk rel="css"      href="vendor/latent-design/components.css" />
<link data-trunk rel="css"      href="style/app.css" />
<link data-trunk rel="copy-dir" href="vendor/latent-design/fonts" />
<link data-trunk rel="copy-dir" href="vendor/latent-design/assets" />
```

```bash
git submodule add https://github.com/latent-foundation/latent-design vendor/latent-design
```

In CI (`actions/checkout`) set `submodules: recursive`.

### Any other project

Copy `tokens.css` + `components.css` + `fonts/` into your project and `<link>` them in the same order. Font `url()` paths are relative to the CSS file — keep `fonts/` alongside it.

---

## Design foundations

### Color

Two palettes, both warm-neutral and desaturated. All values are in `tokens.css` as CSS custom properties.

**Dark (primary)** — warm graphite.
- Background: `--color-bg` `#11110f` → surfaces `#181816`, `#20201d`
- Text: `--color-text-primary` `#e9e2d4` · secondary `#aaa196` · muted `#777169`
- Accent: `--color-accent` `#b7a98f` (muted sand — 2–5% of surface only)

**Light** — stone and paper.
- Background: `--color-bg` `#f3efe6` → surfaces `#e8e1d4`, `#ded5c6`
- Text: `#24221e` · `#625b51` · `#8b8174`
- Accent: `#8c7f68`

**Rules:** 75–85% background/surface · 10–20% text/borders · 2–5% accent. No pure black/white, no bright blue, no gradients, no neon. Semantic states (error/warning/success) use muted clay/amber/moss — never traffic-light saturation.

### Typography

- **General Sans** — wordmark and brand lockup only. Lowercase, tight tracking.
- **Geist** — all UI: headings, body, navigation, prose. Weight 500 headings, `-0.04em` tracking.
- **Geist Mono** — code, metadata, timestamps, tags, IDs. `-0.03em` tracking. Never let it drift into a raw terminal aesthetic.

Full scale in `tokens.css`: `--text-display` → `--text-micro`, weights, tracking, leading, spacing, radii, motion.

### Surfaces and depth

Borders over shadows — `1px solid var(--color-border-subtle)` and tone shifts between surface levels, no drop shadows. Corner radii: `--radius-sm` (2px) for most elements, `--radius-pill` (999px) for tags and toggles only. Flat solid backgrounds — no gradients, no glassmorphism.

### Motion

Functional and short. `--dur-fast` 120ms · `--dur-normal` 200ms · `--dur-slow` 360ms. Fades and small position shifts only. No bounce, no looping.

### Iconography

Use **Lucide** (https://lucide.dev) via CDN for all product icons. Thin, geometric, consistent 1.5–2px stroke. Render in `--color-text-secondary` or `--color-text-muted`. Never emoji, never hand-drawn.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
<i data-lucide="search"></i>
```

---

## Assets

| File | Use |
|---|---|
| `latent-mark-{dark,light}.svg` | Logo mark alone — header, favicon, app icon |
| `latent-wordmark-{dark,light}.svg` | Wordmark text only |
| `latent-lockup-{dark,light}.svg` | Mark + wordmark combined |

The mark is the **umbrella `latent.` identity only** — do not use it for ido or logos. Those products use their own wordmarks (ido uses the 井戸 kanji as its visual mark).

---

## Voice and content

**Tone:** precise, calm, minimal, technically grounded. Engineered, not marketed. Confidence is quiet. Never overclaim.

**Casing:** lowercase by default (`latent.`, `ido`, `logos`). The trailing period in `latent.` is part of the identity — never drop it. Mono labels may be UPPERCASE but small and sparse. No Title Case Marketing Caps.

**Style:** short declarative sentences, fragments are fine, em-dashes for asides. Never: "revolutionizing," "next-generation," "unlock your full potential," "10x your workflow." No emoji in any brand surface.

**Taglines:** `engineering as craft` · `depth over noise` · `systems beneath the surface`

---

## North star

> Does this make latent. feel **quieter, clearer, and more structurally intentional?**
> If yes, keep it. If it only makes things louder, trendier, or more decorative, remove it.
