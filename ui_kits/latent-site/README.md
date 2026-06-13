# UI Kit — latent. (umbrella site)

The umbrella website for the latent. systems laboratory. This kit is **grounded in the
real placeholder** at `latent.foundation` (a single bordered card with a mono meta line
and the General Sans wordmark) and extends that established language into a small
editorial site: a home/index, a projects archive, and a writing/essay reading view.

## Run
Open `index.html`. Click the nav (`index` / `projects` / `writing` / `about`), toggle the
`☾ / ☀` button for dark↔light, and open any essay from the writing list.

## Screens
- **Home** — mono kicker, large Geist statement headline, lede, projects preview.
- **Projects** — filterable archive (`ALL / ACTIVE / RESEARCH / ARCHIVED`) of bordered
  project rows with kanji/initial marks, status, tags, year.
- **Writing** — list of essays; clicking opens a centered reading view (great in light theme).
- **About** — a quiet personal colophon for the maker (Maksymilian Neumann): a type
  monogram, a short first-person statement, a `now` line, and index-card facts. Written
  to position the person without overclaiming — engineering as craft, quietly.

## Components (`components.jsx`, `views.jsx`)
`useTheme`, `LogoMark`, `Wordmark`, `SiteHeader`, `SiteFooter`, `Tag`, `Home`, `Projects`,
`ProjectRow`, `Writing`, `WritingRow`, `Essay`, `About`. All small and composable; data
lives in `PROJECTS` / `WRITING` / `ABOUT_FACTS` constants in `views.jsx`.

The header pairs the **latent. logo mark** (`LogoMark`, theme-aware — pulls
`assets/latent-mark-{dark,light}.svg`) with the wordmark. The mark is the umbrella
identity only and is intentionally absent from the ido/logos kits.

## Brand fidelity notes
- Borders over shadows everywhere; flat surfaces; hairline dividers.
- Wordmark + product names in General Sans, lowercase, tight tracking.
- Mono (Geist Mono) only for metadata, tags, kickers, timestamps.
- Accent (sand/olive) used sparingly — hover color, filter chip, blockquote rule.
- Restrained motion: short hover transitions, no scale or bounce. Theme switching is
  instant (transitioning `var()`-backed background-color across a theme swap leaves it
  stuck in Chrome — so the toggle is deliberately immediate).

> Provenance: home + card style derive from the real repo
> (https://github.com/latent-foundation/latent.foundation). The projects archive and
> writing views are consistent extensions, not yet built in the real repo.
