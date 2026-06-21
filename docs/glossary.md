# latent. glossary

What each name in the ecosystem means. Names are intentional — keep the casing and
the trailing period in `latent.`.

---

## Products and identity

| Name | Reading | What it is |
|---|---|---|
| **latent.** | — | The umbrella identity — a quiet, personal systems laboratory. Hidden structure, the systems archive. The trailing period is part of the mark; never drop it. |
| **ido** | 井戸 *(Japanese, "well")* | Local-first knowledge system — notes, wiki, tasks, goals. A quiet well for thought. Tauri + Leptos. Uses the 井戸 kanji as its own visual mark. |
| **logos** | λόγος *(Greek, "reason / word")* | Algorithmic trading and research — market data, backtesting, disciplined reasoning under uncertainty. Tauri + Leptos. |

All three are written lowercase: `latent.`, `ido`, `logos`.

---

## Repos and layers

| Name | Layer | What it is |
|---|---|---|
| **latent-design** | brand canon | CSS tokens, component styles, fonts, SVG assets, design docs, the `/latent-design` skill. The single source of truth for every visual decision. |
| **latent-ui** | Rust behavior | Shared Leptos crate — `ThemeToggle`, `Tag`, theme machinery. The production translation of the brand canon into Leptos/Rust. Ships no CSS. |
| **latent.foundation** | app | The umbrella website at [latent.foundation](https://latent.foundation). Hosts the project archive for ido and logos. |
| **latent-foundation** | org | The GitHub organization (`github.com/latent-foundation`) that owns all repos. Note: the org uses a hyphen; the website uses a dot. |

See [ecosystem.md](./ecosystem.md) for how the layers connect.

---

## Key terms

| Term | Meaning |
|---|---|
| **brand canon** | The authoritative design atoms in `latent-design` — tokens, fonts, assets. Apps reference, never copy. |
| **the canon** (docs) | The shared knowledge in `latent-design/docs/` — this folder. Apps point at it instead of restating it. |
| **CSS cascade** | The mandatory load order `tokens.css` → `components.css` → `app.css`. |
| **anti-FOUC script** | Inline `<head>` script that sets `data-theme` before WASM boots, preventing a flash of the wrong theme. |
| **the submodule** | `vendor/latent-design` — how each app vendors the brand canon (CSS, fonts, assets, docs). |
| **local-first** | Data lives on the user's device first; sync is optional. The model for ido and logos. |
| **CSR** | Client-side rendering — Leptos compiles to WASM and renders in the browser; no server runtime. |

---

## Voice quick reference

Lowercase by default. Precise, calm, minimal, technically grounded — engineered, not
marketed. Taglines: *engineering as craft* · *depth over noise* · *systems beneath the
surface*. No emoji in any brand surface. Full voice rules in
[`../README.md`](../README.md#voice-and-content).
