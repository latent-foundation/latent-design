# latent. — Design System

> **latent.** is a quiet systems laboratory for personal projects that are carefully
> designed and thought out. We strive for greatness with minimalism and restraint.

A typography-first identity built on warm graphite and stone. The brand is the
opposite of a loud startup: it should feel like a research archive, an engineering
atelier, a quiet digital workspace. **Depth over noise.**

`latent.` is the personal engineering & systems laboratory of **Maksymilian Neumann**,
a Master's Computer Science student and software engineer (Rust, Python, Java).
Canonical home: **latent.foundation**.

---

## The ecosystem

```
latent.            umbrella identity — hidden structure, the systems archive
├── ido   (井戸)   local-first knowledge system — a quiet well for thought
└── logos          algorithmic trading / research — disciplined reasoning under uncertainty
```

| Name      | Role                          | Meaning                                |
| --------- | ----------------------------- | -------------------------------------- |
| `latent.` | umbrella / lab                | hidden structure, signal beneath noise |
| `ido`     | notes · wiki · tasks · goals  | depth, memory, retrieval (a water well)|
| `logos`   | market data · backtesting     | reason, order, intelligible pattern    |

---

## Sources used to build this system

This system was assembled from the brand brief plus these repositories
(private — you may need access from the owner):

- **Website** — https://github.com/latent-foundation/latent.foundation
  A single minimal placeholder card (`index.html`). It is the only *built* surface
  and the source of truth for the live visual language (bordered card, mono meta
  line, tight-tracked wordmark, no shadows).
- **ido** — https://github.com/latent-foundation/ido — *empty repo (placeholder).*
- **logos** — https://github.com/latent-foundation/logos — *empty repo (placeholder).*

> ⚠️ **Important provenance note.** Only the website exists as code, and it is just a
> placeholder. `ido` and `logos` have no implementation yet. The UI kits for those two
> products in this system are **principled interpretations of the written brand brief**,
> not recreations of existing screens. Treat them as design proposals consistent with
> the foundations — refine against real product decisions as they get built. Explore the
> repos above to ground future work in real source as it lands.

Provided design tokens: `uploads/latent.dark.css`, `uploads/latent.light.css`.
Provided wordmark: `uploads/latent.svg` (dark), `uploads/latent_light.svg` (light) —
copied into `assets/`.

---

## CONTENT FUNDAMENTALS

How latent. writes. Copy *is* a brand surface here — it carries as much weight as type.

**Voice.** Precise, calm, minimal, thoughtful, technically grounded. The brand is
"engineered rather than marketed." Confidence is quiet. Never overclaim.

**Casing.** Lowercase is the default register, especially for the wordmark `latent.`
and product names `ido`, `logos`. The trailing period in `latent.` is part of the
identity and is never dropped. Headlines and body use normal sentence case; mono
labels/tags may be UPPERCASE but kept small and sparse. Avoid Title Case Marketing Caps.

**Person.** Writes mostly in a neutral, declarative third person about the systems
themselves ("a quiet local-first knowledge system…"). First person appears only for
the maker's bio ("Built by Maksymilian Neumann…"). Avoid the breathless second-person
"you'll unlock…" of growth copy.

**Punctuation & rhythm.** Short declarative sentences. Fragments are fine when they
add stillness. Em-dashes for asides. Lots of breathing room — copy should feel quiet,
not empty.

**Emoji:** none. Not part of the brand. Iconography is sparse and geometric instead.

**Vibe in three words:** archival · disciplined · understated.

### Good tone (use)
- `a personal engineering lab for long-term software experiments`
- `tools for thought, research, and disciplined systems`
- `depth over noise`
- `a quiet well for thought` (ido)
- `a research system for reasoning under uncertainty` (logos)

### Bad tone (never)
- `revolutionizing productivity with AI`
- `next-generation all-in-one platform`
- `unlock your full potential`
- `move faster and 10x your workflow`

### Sanctioned taglines
`engineering as craft` · `depth over noise` · `systems beneath the surface` ·
`software, research, timelessness`

### North star
> When making any decision, ask: *does this make latent. feel quieter, clearer, and
> more structurally intentional?* If yes, keep it. If it only makes things louder,
> trendier, or more decorative, remove it.

---

## VISUAL FOUNDATIONS

**Overall mood.** Minimal, geometric, quiet, editorial, architectural, slightly
technical, slightly warm — restrained but not sterile. References: MUJI (calm
usefulness, material warmth), Claude (editorial spacing, typography-first, quiet
confidence), architectural minimalism, technical documentation, research archives.

**Color.** Two palettes, both warm-neutral and desaturated. Think of colors not as
decoration but as *material roles*: bg / surface / border / text / metadata / accent.
- **Dark (primary):** warm graphite. `#11110f` base climbing through `#181816`,
  `#20201d` surfaces. Text is warm bone `#e9e2d4`. Archival, technical, mature.
- **Light (essays/docs):** stone & paper, MUJI-adjacent. `#f3efe6` base, ink `#24221e`.
- **Accent:** a single muted sand/olive (`#b7a98f` dark, `#8c7f68` light). It is rare —
  used at 2–5% of the surface. Never pure black or pure white, never bright AI blue,
  never neon or gradient saturation. Semantic states (success/warning/danger) are
  muted moss / amber / clay, never the "green/red chaos" of trading UIs.
- **Ratio:** strict 75–85% background/surfaces · 10–20% text/borders · 2–5% accent.
  If the accent is visible everywhere, reduce it.

**Type.** The primary brand infrastructure.
- **General Sans** — wordmark only. Lowercase, with the period. Tight tracking (~-0.045em).
- **Geist** — all UI: headings, body, nav, essays. Headings at weight 500 with
  -0.04em tracking. Body at ~1.7 line-height for editorial calm.
- **Geist Mono** — code, metadata, timestamps, tags, project IDs. Always slightly
  negative tracking (-0.03em) so it reads refined and editorial, **not** raw terminal.
  Never let the identity drift into a hacker-terminal aesthetic.
- Scale and tokens live in `colors_and_type.css`.

**Spacing & layout.** 4px base unit; architectural rhythm with generous whitespace.
Content max ~1080px; reading measure ~64ch. Layout is grid-driven, left-aligned,
calm. Whitespace is deliberate — the design should feel quiet, not empty.

**Borders over shadows.** Surfaces are separated by 1px hairline borders
(`--color-border-subtle`) and subtle tone shifts between surface levels — **not** by
drop shadows. Shadows are nearly absent; when used they are diffuse and very low.
No glassmorphism, no floating SaaS cards, no heavy elevation.

**Corner radii.** Minimal. Mostly square (0px) or barely-rounded (2–4px). Pills only
for the rare tag/toggle. Sharp corners reinforce the architectural, technical feel.

**Cards.** `background: var(--color-surface)` + `1px solid var(--color-border-subtle)`,
square or 2–4px radius, no shadow. Padding is generous (`clamp(28px, 6vw, 48px)`).

**Backgrounds.** Flat solid color. No gradients, no hero photography, no repeating
texture, no hand-drawn illustration. Structure comes from grids, hairlines and
negative space. If imagery ever appears it should be restrained, warm-neutral, and
quiet — never the focal noise of the page.

**Motion.** Restrained, structural, functional. Short durations (120–360ms), standard
or gentle ease-out easing. Fades and small position shifts only. Never bouncy,
playful, gamified, or infinitely looping on content.

**Hover states.** Quiet — a step in text color (primary → secondary) or accent →
accent-hover, a border darkening from subtle → strong. No scale-up, no glow.

**Press states.** A small tone darkening; optionally a 1px nudge. No big shrink/bounce.

**Transparency & blur.** Used sparingly if at all — a faint scrim behind a modal at
most. The aesthetic favours opaque, material surfaces over frosted glass.

**Iconography.** See the ICONOGRAPHY section below.

---

## ICONOGRAPHY

The brand has **no bundled icon set** in the existing code — the only built surface
(the website) uses zero icons, relying entirely on type, the mono meta line, and
bordered structure. This is intentional: latent. is typography-first and visually
quiet.

**Recommendation for product UIs** (`ido`, `logos`, future tools): use **Lucide**
(https://lucide.dev) via CDN. Rationale: thin, geometric, consistent ~1.5–2px stroke,
no fills, calm and technical — it matches the architectural-minimal mood without
adding noise. Render icons in `--color-text-secondary` / `--color-text-muted`, never
in accent unless they are the single focal action.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
<i data-lucide="search"></i>
```

> ⚠️ **Substitution flag.** Lucide is a *substitute* chosen to fit the brand, not an
> existing brand asset — there is no icon system in the repos. If latent. adopts an
> official set later, swap it here.

**Emoji:** never used. **Unicode glyphs:** used only symbolically and sparingly —
e.g. the kanji 井戸 (ido) as an architectural mark, never as decoration. Keep icon
density low; prefer a text label over an icon when a label will do.

### Logos / brand marks (in `assets/`)

latent. now has a proper **logo mark** — an arched well-form glyph with two dots and a
scalloped base (reads as a quiet well / signal source). It pairs with the General Sans
wordmark to form the lockup.

- `assets/latent-mark-dark.svg` — the mark, bone fill (for dark backgrounds).
- `assets/latent-mark-light.svg` — the mark, ink fill (for light backgrounds).
- `assets/latent-lockup-dark.svg` — mark + wordmark on a graphite tile.
- `assets/latent-lockup-light.svg` — mark + wordmark on a stone tile.
- `assets/latent-wordmark-dark.svg` / `assets/latent-wordmark-light.svg` — wordmark only.

> ⚠️ **Scope: this mark is the `latent.` umbrella identity ONLY.** Do **not** apply it to
> `ido` or `logos` — those products carry their own type-set names (and ido its 井戸
> kanji). The mark appears in the latent-site header; ido/logos headers use their own
> wordmarks. The lockup `-dark`/`-light` SVGs embed the wordmark as live General Sans
> text, so the font must be loaded (it is, via the self-hosted `@font-face`). For UI use,
> prefer the mark SVG beside live `.wordmark` text (see the `LogoMark` component in
> `ui_kits/latent-site/components.jsx`) so it scales and themes cleanly.

---

## Fonts — sourcing & substitution

All three families are now **self-hosted** from `fonts/` — no CDN dependency:

- **General Sans** — wordmark / brand lockup (300–700 + italic + variable).
- **Geist** — UI, headings, body (300–700 + italic + variable).
- **Geist Mono** — code, metadata, tags (full weight range + italics + variable).

All `@font-face` rules live at the top of `colors_and_type.css`; font URLs resolve
relative to the CSS file, so any document that links it gets every family regardless of
folder depth. The `fonts/` folder ships the complete families (`.woff2`, plus `.ttf`/
`.woff` for General Sans).

---

## Index — what's in this system

| Path | What it is |
| --- | --- |
| `README.md` | This file — brand context, content & visual foundations, iconography, manifest |
| `colors_and_type.css` | All design tokens: color (dark+light), type scale, spacing, radii, elevation, motion, semantic element styles |
| `SKILL.md` | Agent Skill manifest — makes this folder usable as a Claude Code skill |
| `assets/` | Wordmark SVGs (dark + light) |
| `preview/` | Design-system specimen cards (rendered in the Design System tab) |
| `ui_kits/latent-site/` | UI kit — the latent. umbrella website (grounded in the real placeholder) |
| `ui_kits/ido/` | UI kit — ido knowledge system (interpretation of the brief) |
| `ui_kits/logos/` | UI kit — logos research/trading system (interpretation of the brief) |

Each `ui_kits/<product>/` has its own `README.md`, an interactive `index.html`, and
small JSX components.
