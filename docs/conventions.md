# latent. engineering conventions

Shared Rust / Leptos / Trunk conventions for every latent. app. App `CLAUDE.md`
files point here; only genuinely app-specific rules belong in the app itself.

For the design language (color, type, voice), see [`../README.md`](../README.md).
For the repo layout, see [ecosystem.md](./ecosystem.md).

---

## Stack

- **Rust**, edition 2024.
- **Leptos 0.8.x** in **CSR** mode — compiled to WASM, no server runtime.
- **Trunk** bundles everything; `index.html` is the entry point.
- Apps that need a native shell add **Tauri** (ido, logos) — the Leptos frontend is unchanged.

---

## Formatting — `leptosfmt`, never `cargo fmt` alone

`leptosfmt` is required alongside `cargo fmt`. It formats the `view!` macro, which
`rustfmt` cannot parse. Always format via the `just` recipe:

```sh
just fmt          # cargo fmt + leptosfmt — the only correct way to format
just fmt-check    # check without modifying (runs in the pre-commit hook)
```

`rust-analyzer.toml` configures format-on-save to delegate to `leptosfmt --stdin --rustfmt`.
Running `cargo fmt` by itself will leave `view!` blocks malformed and fail `fmt-check`.

---

## Leptos 0.8 patterns

**Signals.** Two flavors in use:

```rust
// Tuple signal — split read/write, pass ReadSignal<T> into children as props:
let (count, set_count) = signal(0);
set_count.write();              // DerefMut guard for in-place mutation

// RwSignal — single handle, used for context-shared state (e.g. theme):
let value = RwSignal::new(0);
value.get();                   // read
value.update(|v| *v = 1);      // mutate
```

**Context.** Provide in a parent, consume in any descendant:

```rust
provide_context(value);                    // parent
let value = use_context::<RwSignal<T>>()   // descendant
    .expect("context provided by App");
```

**Components.**

```rust
#[component]
fn MyComponent(prop: ReadSignal<i32>) -> impl IntoView {
    view! { <div>{prop}</div> }
}
```

**Effects.** `Effect::new(move |_| { … })` — used by `setup_theme_effect` to sync the
DOM and `localStorage` whenever the theme signal changes.

---

## Theme

Theme is one `RwSignal<bool>` (`true` = dark) provided at the App root and read from
context — never passed as props. Wiring lives in `latent-ui`:

```rust
use latent_ui::theme::{initial_theme, setup_theme_effect};

let is_dark = RwSignal::new(initial_theme());   // reads <html data-theme> from the FOUC script
provide_context(is_dark);
setup_theme_effect(is_dark);                     // keeps DOM + localStorage in sync
```

The anti-FOUC inline script in `index.html` must run before any CSS — see
[ecosystem.md](./ecosystem.md#anti-fouc-script--required-in-every-app).

---

## Icons

**Lucide** via CDN only — thin, geometric, 1.5–2px stroke, rendered in
`--color-text-secondary` or `--color-text-muted`. Never emoji, never hand-drawn.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
<i data-lucide="search"></i>
```

---

## Commands

```sh
just fmt                # format (cargo fmt + leptosfmt)
just fmt-check          # format check — pre-commit hook + CI
just check              # cargo check + clippy -D warnings
just verify             # fmt-check + check — exactly what CI runs
trunk serve             # local dev server, hot reload
trunk build --release   # production build → dist/
```

Run `just verify` before pushing; it mirrors CI.

---

## Pre-commit hook

Each clone must activate the formatting gate once:

```sh
git config core.hooksPath .githooks
```

The hook blocks commits that fail `just fmt-check`. Run `just fmt` before committing.

---

## CI

GitHub Actions runs `just verify` on every push to `main` and on all PRs; PRs must pass
before merging. Both CI and deploy checkouts set `submodules: recursive` so
`vendor/latent-design` is populated — without it, the build can't find tokens, fonts, or
assets.

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
```
