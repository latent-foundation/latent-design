/* logos — algorithmic research & trading system UI kit
   "disciplined reasoning under uncertainty." Signal/noise, decision thresholds,
   state transitions. Restrained — no finance-bro green/red chaos.
   Icons: Lucide. */

const { useState, useEffect } = React;

function Icon({ name, size = 16, color = "var(--color-text-muted)", stroke = 1.6 }) {
  const ref = React.useRef(null);
  useEffect(() => { if (window.lucide && ref.current) { ref.current.innerHTML = ""; const i = document.createElement("i"); i.setAttribute("data-lucide", name); ref.current.appendChild(i); window.lucide.createIcons({ attrs: { width: size, height: size, stroke: color, "stroke-width": stroke } }); } });
  return <span ref={ref} style={{ display: "inline-flex", color }} />;
}

/* deterministic pseudo-series so the chart is stable */
function series(seed, n, base, amp) {
  const out = []; let v = base;
  for (let i = 0; i < n; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280 - 0.5;
    v += r * amp + Math.sin(i / 7) * amp * 0.18;
    out.push(v);
  }
  return out;
}
function path(data, w, h, pad = 6) {
  const min = Math.min(...data), max = Math.max(...data), span = max - min || 1;
  return data.map((d, i) => {
    const x = (i / (data.length - 1)) * (w - pad * 2) + pad;
    const y = h - pad - ((d - min) / span) * (h - pad * 2);
    return (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
  }).join(" ");
}

function Sparkline({ seed, w = 96, h = 26, color = "var(--color-text-secondary)" }) {
  const d = series(seed, 28, 50, 5);
  return <svg width={w} height={h} style={{ display: "block" }}><path d={path(d, w, h, 3)} fill="none" stroke={color} strokeWidth="1.3" /></svg>;
}

const INSTRUMENTS = [
  { sym: "ES", name: "S&P 500 e-mini", chg: "+0.42%", seed: 11, state: "HOLD" },
  { sym: "CL", name: "Crude Oil", chg: "−1.10%", seed: 47, state: "EVALUATE" },
  { sym: "GC", name: "Gold", chg: "+0.18%", seed: 23, state: "HOLD" },
  { sym: "ZN", name: "10Y T-Note", chg: "−0.06%", seed: 88, state: "HOLD" },
  { sym: "NG", name: "Nat Gas", chg: "+2.31%", seed: 5,  state: "ENTER" },
];

const STATE_COLORS = {
  HOLD: "var(--color-text-muted)",
  EVALUATE: "var(--color-warning)",
  ENTER: "var(--color-success)",
  EXIT: "var(--color-danger)",
};

function StateBadge({ state }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em",
      color: STATE_COLORS[state], border: "1px solid var(--color-border-subtle)",
      borderRadius: 999, padding: "3px 9px", display: "inline-flex", alignItems: "center", gap: 6,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATE_COLORS[state] }} />{state}
    </span>
  );
}

/* ---- Top bar ---- */
function TopBar({ view, setView }) {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 32, padding: "0 28px", height: 56, borderBottom: "1px solid var(--color-border-subtle)", background: "var(--color-bg-subtle)" }}>
      <span style={{ fontFamily: "var(--font-wordmark)", fontSize: 21, fontWeight: 500, letterSpacing: "-0.03em", color: "var(--color-text-primary)" }}>logos</span>
      <nav style={{ display: "flex", gap: 4 }}>
        {[["signals", "Signals"], ["backtest", "Backtest"], ["journal", "Journal"]].map(([v, l]) => (
          <button key={v} onClick={() => setView(v)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 4,
            fontFamily: "var(--font-ui)", fontSize: 13.5, letterSpacing: "-0.01em",
            color: view === v ? "var(--color-text-primary)" : "var(--color-text-muted)",
            background: view === v ? "var(--color-accent-soft)" : "transparent",
          }}>{l}</button>
        ))}
      </nav>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-text-muted)" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-success)" }} />market open · 14:08 UTC
      </span>
    </header>
  );
}

/* ---- Watchlist ---- */
function Watchlist({ active, setActive }) {
  return (
    <aside style={{ width: 280, borderRight: "1px solid var(--color-border-subtle)", background: "var(--color-bg-subtle)", height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "16px 20px 10px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Watchlist</div>
      {INSTRUMENTS.map(it => (
        <button key={it.sym} onClick={() => setActive(it.sym)} style={{
          display: "grid", gridTemplateColumns: "1fr auto", gap: 10, width: "100%", textAlign: "left", cursor: "pointer",
          alignItems: "center", padding: "13px 20px", border: "none", borderBottom: "1px solid var(--color-border-subtle)",
          background: active === it.sym ? "var(--color-surface)" : "transparent",
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>{it.sym}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 11.5, color: "var(--color-text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-text-secondary)" }}>{it.chg}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
            <Sparkline seed={it.seed} color={active === it.sym ? "var(--color-accent)" : "var(--color-text-muted)"} />
            <StateBadge state={it.state} />
          </div>
        </button>
      ))}
    </aside>
  );
}

Object.assign(window, { Icon, series, path, Sparkline, INSTRUMENTS, STATE_COLORS, StateBadge, TopBar, Watchlist });
