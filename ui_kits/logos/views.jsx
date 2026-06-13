/* logos — views: Signals (chart + decision log), Backtest, Journal */

function SignalChart({ seed }) {
  const W = 760, H = 280, pad = 14;
  const price = series(seed, 80, 100, 4);
  const signal = price.map((v, i) => v + Math.sin(i / 5) * 1.2); // smoothed model line
  const min = Math.min(...price), max = Math.max(...price), span = max - min || 1;
  const yFor = v => H - pad - ((v - min) / span) * (H - pad * 2);
  const threshold = min + span * 0.62;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map(g => (
        <line key={g} x1={pad} x2={W - pad} y1={pad + g * (H - pad * 2)} y2={pad + g * (H - pad * 2)} stroke="var(--color-border-subtle)" strokeWidth="1" />
      ))}
      {/* noise band */}
      <path d={path(price.map(v => v + 2.4), W, H, pad) + " L" + (W - pad) + " " + yFor(min) + " L" + pad + " " + yFor(min) + " Z"} fill="var(--color-accent-soft)" opacity="0.5" />
      {/* decision threshold */}
      <line x1={pad} x2={W - pad} y1={yFor(threshold)} y2={yFor(threshold)} stroke="var(--color-warning)" strokeWidth="1" strokeDasharray="3 4" />
      <text x={W - pad} y={yFor(threshold) - 6} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-warning)" letterSpacing="0.04em">DECISION THRESHOLD</text>
      {/* observed price (noisy, muted) */}
      <path d={path(price, W, H, pad)} fill="none" stroke="var(--color-text-muted)" strokeWidth="1" opacity="0.7" />
      {/* model signal (accent, confident) */}
      <path d={path(signal, W, H, pad)} fill="none" stroke="var(--color-accent)" strokeWidth="1.8" />
    </svg>
  );
}

function SignalPanel({ active }) {
  const it = INSTRUMENTS.find(i => i.sym === active) || INSTRUMENTS[0];
  const log = [
    { t: "14:02", sig: "momentum > 0.6σ", reason: "Signal crosses threshold but volatility regime is unstable. Insufficient confirmation.", act: "HOLD" },
    { t: "13:41", sig: "mean-reversion", reason: "Price within noise band; no edge over transaction cost. Wait.", act: "HOLD" },
    { t: "13:08", sig: "breakout + volume", reason: "Two independent signals agree; drawdown risk bounded. Justified entry.", act: "ENTER" },
    { t: "11:55", sig: "regime shift", reason: "Hidden state transition detected; thesis invalidated. Exit, preserve capital.", act: "EXIT" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "28px 32px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
          <h1 style={{ fontFamily: "var(--font-ui)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em", margin: 0, color: "var(--color-text-primary)" }}>{it.sym} · {it.name}</h1>
          <StateBadge state={it.state} />
        </div>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 22px" }}>
          A signal appears. The system does not react automatically — it evaluates, reasons, and acts only when justified.
        </p>

        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: 4, padding: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 14, height: 2, background: "var(--color-accent)" }} />model signal</span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 14, height: 2, background: "var(--color-text-muted)" }} />observed</span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 14, height: 0, borderTop: "1px dashed var(--color-warning)" }} />threshold</span>
          </div>
          <SignalChart seed={it.seed} />
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-muted)", margin: "26px 0 12px" }}>Decision log</div>
        <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
          {log.map((l, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "52px 130px 1fr 70px", gap: 16, alignItems: "start", padding: "14px 2px", borderBottom: "1px solid var(--color-border-subtle)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-text-muted)" }}>{l.t}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-text-secondary)" }}>{l.sig}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 13.5, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{l.reason}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.05em", color: STATE_COLORS[l.act], textAlign: "right" }}>{l.act}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Backtest() {
  const stats = [
    { k: "Sharpe", v: "1.84", n: "risk-adjusted return" },
    { k: "Max drawdown", v: "−7.2%", n: "peak to trough" },
    { k: "Hit rate", v: "57%", n: "winning trades" },
    { k: "Exposure", v: "31%", n: "time in market" },
  ];
  const equity = series(91, 90, 100, 2.2).map((v, i) => v + i * 0.25);
  const W = 820, H = 220, pad = 12;
  return (
    <div style={{ flex: 1, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "28px 32px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-ui)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em", margin: "0 0 4px", color: "var(--color-text-primary)" }}>Backtest</h1>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 24px" }}>Mean-reversion + regime filter · 2019–2026 · daily bars.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.k} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: 4, padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 8 }}>{s.k}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>{s.v}</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 11.5, color: "var(--color-text-muted)", marginTop: 4 }}>{s.n}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: 4, padding: 18 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 12 }}>Equity curve</div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
            {[0.33, 0.66].map(g => <line key={g} x1={pad} x2={W - pad} y1={pad + g * (H - pad * 2)} y2={pad + g * (H - pad * 2)} stroke="var(--color-border-subtle)" />)}
            <path d={path(equity, W, H, pad) + ` L${W - pad} ${H - pad} L${pad} ${H - pad} Z`} fill="var(--color-accent-soft)" opacity="0.45" />
            <path d={path(equity, W, H, pad)} fill="none" stroke="var(--color-accent)" strokeWidth="1.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Journal() {
  const entries = [
    { d: "2026-05-30", title: "On not trading", body: "The discipline is mostly in the trades you don't take. Today: four signals, zero entries. Each failed the confirmation test. This is the system working." },
    { d: "2026-05-22", title: "Regime detection > prediction", body: "We don't forecast price. We infer which regime we're in and size accordingly. Borrowed straight from the proteus change-point work." },
    { d: "2026-05-14", title: "Cost is the real adversary", body: "Most 'edges' vanish under realistic transaction cost. The noise band on the signal chart is calibrated to exactly this." },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "28px 32px", maxWidth: 680, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-ui)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em", margin: "0 0 24px", color: "var(--color-text-primary)" }}>Journal</h1>
        <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
          {entries.map((e, i) => (
            <article key={i} style={{ padding: "22px 2px", borderBottom: "1px solid var(--color-border-subtle)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8 }}>{e.d}</div>
              <h3 style={{ fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 8px", color: "var(--color-text-primary)" }}>{e.title}</h3>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 14.5, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: 0 }}>{e.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SignalChart, SignalPanel, Backtest, Journal });
