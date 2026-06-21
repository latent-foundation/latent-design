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

Also pin the tracked branch so `git submodule update --remote` always has an explicit
target. Add to `.gitmodules`:

```ini
[submodule "vendor/latent-design"]
    path = vendor/latent-design
    url = https://github.com/latent-foundation/latent-design.git
    branch = main
```

---

## 3. Wire the Claude Code skill

Symlink `.claude/skills/latent-design` → `vendor/latent-design` so the `/latent-design`
slash command is available in this project and stays in sync with the submodule
automatically — no separate copy to maintain.

**Windows** (requires Developer Mode or admin):
```powershell
New-Item -ItemType Directory -Force .claude\skills
New-Item -ItemType SymbolicLink -Path .claude\skills\latent-design -Target vendor\latent-design
```

**macOS / Linux:**
```sh
mkdir -p .claude/skills
ln -s ../../vendor/latent-design .claude/skills/latent-design
```

Add `.claude/` to `.gitignore` if you don't want to commit the symlink (it's
machine-local). Commit it if you want the skill wired for every contributor automatically.

---

## 4. Wire `index.html` for Trunk

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

## 5. Bootstrap the App root

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

## 6. Tooling

Add the standard files from an existing app:

- `justfile` — `fmt`, `fmt-check`, `check`, `verify` recipes (see [conventions.md](./conventions.md#commands)).
- `rustfmt.toml`, `rust-analyzer.toml` — format-on-save delegates to `leptosfmt`.
- `.githooks/pre-commit` — runs `just fmt-check`; activate with
  `git config core.hooksPath .githooks`.
- `Trunk.toml` — if non-default build config is needed.

Install the toolchain: `rustup target add wasm32-unknown-unknown`, then
`cargo install just leptosfmt trunk --locked`.

---

## 7. CI

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

## 8. Verify

```sh
git submodule update --init --recursive
just verify
trunk serve
```

If `trunk serve` renders styled and the theme toggle works, the wiring is correct.

---

## Tauri-only apps (ido, logos)

For apps that are **desktop-only** (no standalone web deploy), the scaffold comes from
`cargo create-tauri-app` rather than `cargo new`. Steps 1–8 above still apply, but the
project shape and commands differ.

### Scaffold

```sh
cargo install create-tauri-app --locked
cargo create-tauri-app
```

When prompted:
- **Project name:** `ido` (or `logos`)
- **Frontend language:** `Rust`
- **UI template:** `Leptos` — this selects Trunk as the bundler automatically

This produces a Cargo workspace:

```
ido/
  Cargo.toml          workspace manifest
  index.html          Trunk entry — your CSS cascade goes here (step 4)
  src/                Leptos frontend crate
    main.rs
    app.rs
    lib.rs
  src-tauri/          Tauri backend crate
    Cargo.toml
    tauri.conf.json
    src/
      main.rs
      lib.rs
  style/              create this — app.css lives here
```

After scaffolding, continue with steps 1–8: add the `latent-ui` Cargo dep to the
**frontend** `Cargo.toml` (not the workspace root or `src-tauri/`), add the submodule,
wire the skill symlink, and update `index.html` with the anti-FOUC script and CSS cascade.

### Commands (replace trunk serve / trunk build)

```sh
cargo tauri dev          # starts Trunk dev server + opens native window (hot reload)
cargo tauri build        # bundles release binary for the current platform
just verify              # still works — runs against the frontend crate
```

Update the `justfile` to use `cargo tauri dev` in any `serve` recipe.

### tauri.conf.json wiring

The scaffold sets these automatically for a Leptos/Trunk frontend — verify they match:

```json
{
  "build": {
    "devUrl": "http://localhost:8080",
    "frontendDist": "../dist"
  }
}
```

`cargo tauri dev` starts Trunk (serving on `:8080`) and opens the Tauri window pointing at
it. `cargo tauri build` runs `trunk build --release` and packages the `dist/` output.

### What's different from a web app

| | Web app (latent.foundation) | Tauri app (ido, logos) |
|---|---|---|
| Scaffold | `cargo new --bin` | `cargo create-tauri-app` |
| Structure | single crate | Cargo workspace |
| Dev | `trunk serve` | `cargo tauri dev` |
| Build | `trunk build --release` | `cargo tauri build` |
| Deploy | Cloudflare Pages | native binary (.app / .exe / .deb) |
| CI | `just verify` + pages deploy | `just verify` + per-platform binary build |
| Backend | none | `src-tauri/` Rust process (IPC, fs, native APIs) |

### Backend and MCP

The local-first data layer lives in the `src-tauri/` Rust backend. When the time comes
to add an MCP server over the ido note/task store, it lives here too — sharing data-access
code with the Tauri commands. See
[knowledge-architecture.md](./knowledge-architecture.md#ido-mcp-surface-when-ido-exists)
for the planned MCP surface.
