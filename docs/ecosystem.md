# latent. ecosystem — architecture canon

The canonical description of how the latent. repos fit together. Every app's
`CLAUDE.md` and `README.md` should **point here** rather than restate this.

Because `latent-design` is vendored into each app at `vendor/latent-design`, this
file ships into every app's working tree as `vendor/latent-design/docs/ecosystem.md`.

---

## The three layers

latent. is built as three sibling repos, each a distinct layer:

| Layer | Repo | Consumed as | Provides |
|---|---|---|---|
| **Brand canon** | `latent-design` | git submodule → `vendor/latent-design` | CSS tokens, component styles, fonts, SVGs, design docs |
| **Rust behavior** | `latent-ui` | Cargo git dep | `ThemeToggle`, `Tag`, theme machinery |
| **App** | `latent.foundation`, *(future)* `ido`, `logos` | — | pages, routing, layout, app logic |

```
Desktop/latent/
  latent-design/      brand canon            (public)
  latent-ui/          Leptos crate           (public)
  latent.foundation/  website                (public)
  ido/                Tauri + Leptos app     (private, not yet built)
  logos/              Tauri + Leptos app     (private, not yet built)
```

See [glossary.md](./glossary.md) for what each name means.

---

## Sharing model

Two separate channels, deliberately kept apart:

- **CSS / fonts / SVG assets → git submodule.** Trunk needs physical file paths, so
  styling is vendored as a submodule at `vendor/latent-design`. Trunk copies it into
  `dist/` at build time.
- **Rust components + theme → Cargo dependency.** Behavior is a normal crate dep,
  pinned to a git tag in production, overridable to a local path in development.

Both are versioned and pinned. Neither layer embeds the other: `latent-ui` ships
**no CSS**, and `latent-design` ships **no Rust**. That separation keeps Trunk's
asset pipeline in full control of styling and Cargo in full control of behavior.

---

## What lives in each repo

### `latent-design` — brand canon

- `tokens.css` — **the single source of truth.** `@font-face` rules, both color
  themes, the full type / space / radius / motion scale, CSS reset + base. Load first.
- `components.css` — shared component styles (header/footer shell, project row, tag
  pill). Depends on `tokens.css`.
- `fonts/` — self-hosted woff2 family (General Sans, Geist, Geist Mono).
- `assets/` — latent. mark / wordmark / lockup SVGs, dark + light.
- `ui_kits/{latent-site,ido,logos}/` — JSX reference prototypes (not production).
- `docs/` — this canon (ecosystem, conventions, bootstrap, glossary, knowledge-architecture).
- `README.md` / `SKILL.md` — design system usage + the `/latent-design` skill.

### `latent-ui` — Rust behavior

- `src/theme.rs` — `initial_theme()`, `setup_theme_effect(RwSignal<bool>)`, `STORAGE_KEY`.
- `src/components/theme_toggle.rs` — `ThemeToggle` (reads `RwSignal<bool>` from context).
- `src/components/tag.rs` — `Tag(label: impl Into<String>)` pill.
- Leptos 0.8.x. Ships no CSS — styling comes from `latent-design`.
- `SKILL.md` auto-attaches on `*.rs` / `Cargo.toml` / `index.html`.

### `latent.foundation` (and future apps) — app layer

- Consumes **both**: the `vendor/latent-design` submodule + the `latent-ui` Cargo dep.
- `style/app.css` — page/layout styles only. All tokens/components CSS come from the submodule.
- Theme bootstrap lives in the app root (`src/app.rs`) — see [bootstrap-new-app.md](./bootstrap-new-app.md).

---

## CSS cascade — order is mandatory

Every app loads exactly three stylesheets, in this order, via Trunk in `index.html`:

```html
<link data-trunk rel="css"      href="vendor/latent-design/tokens.css" />
<link data-trunk rel="css"      href="vendor/latent-design/components.css" />
<link data-trunk rel="css"      href="style/app.css" />
<link data-trunk rel="copy-dir" href="vendor/latent-design/fonts" />
<link data-trunk rel="copy-dir" href="vendor/latent-design/assets" />
```

`tokens.css` defines the custom properties that `components.css` and `app.css` rely on
— reorder them and the build renders unstyled or with broken variables.

**Rule:** `style/app.css` is the *only* stylesheet that belongs to an app. Never paste
tokens or component styles inline; edit `latent-design` instead.

---

## Anti-FOUC script — required in every app

Must appear in `<head>` **before** any CSS. It sets `data-theme` on `<html>` before the
WASM bundle boots, so there's no flash of the wrong theme:

```html
<script>
  (function () {
    var saved = localStorage.getItem("latent-theme");
    var theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
```

`latent_ui::theme::initial_theme()` then reads that `data-theme` attribute at startup,
and `setup_theme_effect()` keeps `data-theme` + `localStorage` (`"latent-theme"`) in sync.

---

## Dependency pinning

```toml
# Production — pinned git tag:
latent-ui = { git = "https://github.com/latent-foundation/latent-ui", tag = "v0.1.0" }

# Local dev — override to a sibling checkout without editing the line above:
[patch."https://github.com/latent-foundation/latent-ui"]
latent-ui = { path = "../latent-ui" }
```

The submodule is pinned by commit in `.gitmodules` (`url` must be the canonical HTTPS
URL, not a relative path — relative URLs break fresh clones and CI). CI and deploy
checkouts must set `submodules: recursive`.

---

## Why it's structured this way

Separating brand canon (CSS, fonts, SVGs) from behavior (Leptos/Rust) lets each evolve
and version independently. CSS is shared by submodule because Trunk needs real paths;
Rust is shared by Cargo because that's how Rust shares code. Both pinned, so an app
upgrades on its own schedule.

When building a **new** latent. app, never copy CSS tokens inline — always add the
submodule and reference it. Start from [bootstrap-new-app.md](./bootstrap-new-app.md).
