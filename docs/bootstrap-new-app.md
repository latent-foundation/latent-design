# Bootstrap a new latent. app

Step-by-step to stand up a new app (e.g. `ido`, `logos`) wired into the latent.
design system. Assumes the app is Rust + Leptos (CSR) + Trunk, optionally wrapped
in Tauri.

Background: [ecosystem.md](./ecosystem.md) · [conventions.md](./conventions.md).

---

## 0. Create the crate

```sh
cargo new --bin my-app
cd my-app
git init
```

Set `edition = "2024"` in `Cargo.toml`.

---

## 1. Add the `latent-ui` Cargo dependency

```toml
# Cargo.toml
[dependencies]
leptos        = { version = "0.8", features = ["csr"] }
leptos_router = { version = "0.8" }                      # if the app has routes
web-sys       = { version = "0.3", features = ["Window", "Document", "Element", "Storage"] }
console_error_panic_hook = "0.1"

# Shared latent. UI — pinned git dep; use a [patch] override for local dev:
latent-ui = { git = "https://github.com/latent-foundation/latent-ui", tag = "v0.1.0" }
```

For local development against a sibling checkout, add (and **do not commit**):

```toml
[patch."https://github.com/latent-foundation/latent-ui"]
latent-ui = { path = "../latent-ui" }
```

---

## 2. Add the `latent-design` submodule

```sh
git submodule add https://github.com/latent-foundation/latent-design vendor/latent-design
```

This vendors `tokens.css`, `components.css`, `fonts/`, `assets/`, and `docs/` into the
working tree. Use the canonical HTTPS URL in `.gitmodules` — a relative URL breaks fresh
clones and CI.

---

## 3. Wire `index.html` for Trunk

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Anti-FOUC: set theme from localStorage before WASM loads -->
    <script>
      (function () {
        var saved = localStorage.getItem("latent-theme");
        var theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
        document.documentElement.setAttribute("data-theme", theme);
      })();
    </script>

    <!-- Design system CSS cascade — order is mandatory -->
    <link data-trunk rel="css"      href="vendor/latent-design/tokens.css" />
    <link data-trunk rel="css"      href="vendor/latent-design/components.css" />
    <link data-trunk rel="css"      href="style/app.css" />

    <!-- Static assets from the design system -->
    <link data-trunk rel="copy-dir" href="vendor/latent-design/fonts" />
    <link data-trunk rel="copy-dir" href="vendor/latent-design/assets" />
  </head>
  <body></body>
</html>
```

Create `style/app.css` for page/layout styles — the only stylesheet this app owns.

---

## 4. Bootstrap the App root

```rust
// src/app.rs
use latent_ui::theme::{initial_theme, setup_theme_effect};
use latent_ui::ThemeToggle;
use leptos::prelude::*;

#[component]
pub fn App() -> impl IntoView {
    let is_dark = RwSignal::new(initial_theme());
    provide_context(is_dark);
    setup_theme_effect(is_dark);

    view! {
        // your layout — <ThemeToggle/> works anywhere below this point
    }
}
```

```rust
// src/main.rs
fn main() {
    console_error_panic_hook::set_once();
    leptos::mount::mount_to_body(my_app::App);
}
```

---

## 5. Tooling

Add the standard files from an existing app:

- `justfile` — `fmt`, `fmt-check`, `check`, `verify` recipes (see [conventions.md](./conventions.md#commands)).
- `rustfmt.toml`, `rust-analyzer.toml` — format-on-save delegates to `leptosfmt`.
- `.githooks/pre-commit` — runs `just fmt-check`; activate with
  `git config core.hooksPath .githooks`.
- `Trunk.toml` — if non-default build config is needed.

Install the toolchain: `rustup target add wasm32-unknown-unknown`, then
`cargo install just leptosfmt trunk --locked`.

---

## 6. CI

```yaml
# .github/workflows/ci.yml
- uses: actions/checkout@v4
  with:
    submodules: recursive          # populate vendor/latent-design
- uses: dtolnay/rust-toolchain@stable
  with:
    components: rustfmt, clippy
- run: just verify
```

Mirror `submodules: recursive` in any deploy workflow too.

---

## 7. Verify

```sh
git submodule update --init --recursive
just verify
trunk serve
```

If `trunk serve` renders styled and the theme toggle works, the wiring is correct.

---

## Tauri note (ido, logos)

Tauri wraps the same Leptos frontend — none of the above changes. Add the Tauri
scaffolding (`src-tauri/`, `tauri.conf.json`) around the Trunk build, point Tauri's
`devUrl`/`frontendDist` at Trunk's dev server / `dist/`, and keep the CSS + theme wiring
exactly as above. The local-first data layer (and any future MCP server over it — see
[knowledge-architecture.md](./knowledge-architecture.md)) lives in the Tauri Rust backend.
