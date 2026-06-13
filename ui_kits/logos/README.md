# UI Kit — logos

> *A research system for reasoning under uncertainty.*

An algorithmic trading & research environment: market data, signals, backtesting, and a
decision journal. The Stoic framing drives the whole interface — *a signal appears; the
disciplined system does not react automatically; it evaluates, reasons, and acts only
when justified.* **This is an interpretation of the brand brief** — the `logos` repo has
no implementation yet.

## Run
Open `index.html`. Switch tabs (`Signals` / `Backtest` / `Journal`); on Signals, pick an
instrument in the watchlist to load its chart and decision log.

## Screens
- **Signals** — watchlist (sparkline + state badge) + a signal chart (model line vs
  observed price, a shaded noise band, a dashed decision threshold) + a reasoned decision log.
- **Backtest** — restrained metric tiles (Sharpe, drawdown, hit rate, exposure) + equity curve.
- **Journal** — reflective trade-discipline notes.

## Components
`Icon`, `TopBar`, `Watchlist`, `Sparkline`, `StateBadge`, `SignalChart`, `SignalPanel`,
`Backtest`, `Journal`, plus `series()`/`path()` chart helpers. Charts are **data-driven
inline SVG** (deterministic series), not decorative illustration.

## Brand fidelity notes — anti-finance-bro
- **No green/red chaos.** State uses muted, brand-tuned tones: HOLD = muted, EVALUATE =
  amber, ENTER = moss, EXIT = clay. Never saturated trading-terminal colors.
- Charts are quiet: thin muted "observed" line, confident sand "model signal", dashed
  warning threshold, faint accent-soft noise band. Grid hairlines, no glow, no gradients.
- Motifs from the brief: signal/noise, decision thresholds, state transitions, regime
  shifts — surfaced as structure, not spectacle.
- Mono numerals for all metrics; flat surfaces; hairline borders.

> Icon substitution: Lucide (no icon set exists in the repos) — see root ICONOGRAPHY.
