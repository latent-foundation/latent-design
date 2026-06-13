/* ido (井戸) — local-first knowledge system UI kit
   "a quiet well for thought" — notes, wiki, tasks, goals.
   Icons: Lucide (substitute set chosen to fit the brand — see ICONOGRAPHY). */

const { useState, useEffect } = React;

const NOTES = {
  "well": { title: "On the well", folder: "Principles", created: "2026-01-12", tags: ["memory", "depth"],
    body: [
      "井戸 — a water well. You do not see the water from above; you draw it up. A knowledge system should work the same way: depth held quietly below, retrieved when needed.",
      "The point is not to capture everything. It is to keep what matters within reach, and to let structure emerge from how ideas connect rather than how they are filed.",
    ], links: ["retrieval", "structure"] },
  "retrieval": { title: "Retrieval over capture", folder: "Principles", created: "2026-02-03", tags: ["search", "memory"],
    body: [
      "Capture is cheap; retrieval is the hard part. Notes that cannot be found again are noise that feels like signal.",
      "Local-first: the archive lives on your machine, plain and durable. No lock-in, no latency, no surveillance of thought.",
    ], links: ["well"] },
  "structure": { title: "Latent structure", folder: "Systems", created: "2026-02-20", tags: ["systems", "graph"],
    body: [
      "Connections are the real content. A note's value compounds with every link drawn to it — the graph beneath the surface is where understanding accrues.",
      "Tasks and goals are not a separate app. They are notes with a state and a horizon.",
    ], links: ["well", "retrieval"] },
  "roadmap": { title: "Q2 roadmap", folder: "Logos", created: "2026-04-01", tags: ["logos", "planning"],
    body: [
      "Bring backtesting under the same archive. A trade thesis is a note; a backtest is its evidence; a decision is its state transition.",
    ], links: ["structure"] },
};

const TASKS = [
  { t: "Draft the retrieval model", done: true, goal: "ido v0.1", due: "done" },
  { t: "Plain-text store + sync layer", done: true, goal: "ido v0.1", due: "done" },
  { t: "Bidirectional links + graph view", done: false, goal: "ido v0.1", due: "2026-06-14" },
  { t: "Daily note template", done: false, goal: "ido v0.1", due: "2026-06-20" },
  { t: "Fold tasks into note state", done: false, goal: "ido v0.2", due: "2026-07-02" },
];

function Icon({ name, size = 16, color = "var(--color-text-muted)" }) {
  const ref = React.useRef(null);
  useEffect(() => { if (window.lucide && ref.current) { ref.current.innerHTML = ""; const i = document.createElement("i"); i.setAttribute("data-lucide", name); ref.current.appendChild(i); window.lucide.createIcons({ attrs: { width: size, height: size, stroke: color, "stroke-width": 1.6 } }); } });
  return <span ref={ref} style={{ display: "inline-flex", color }} />;
}

/* ---- Sidebar ---- */
function Sidebar({ active, setActive, view, setView }) {
  const folders = {};
  Object.entries(NOTES).forEach(([id, n]) => { (folders[n.folder] ??= []).push([id, n]); });
  return (
    <aside style={{ width: 264, borderRight: "1px solid var(--color-border-subtle)", background: "var(--color-bg-subtle)", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--color-border-subtle)", display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-wordmark)", fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}>ido</span>
        <span style={{ fontSize: 16, color: "var(--color-text-muted)" }}>井戸</span>
      </div>
      <div style={{ padding: "14px 16px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", border: "1px solid var(--color-border-subtle)", borderRadius: 4, background: "var(--color-bg)" }}>
          <Icon name="search" size={14} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)" }}>search the well…</span>
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)" }}>⌘K</span>
        </div>
      </div>
      <nav style={{ padding: "4px 12px 12px" }}>
        {[["notes", "file-text", "Notes"], ["tasks", "check-square", "Tasks"], ["goals", "target", "Goals"]].map(([v, ic, label]) => (
          <button key={v} onClick={() => setView(v)} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
            padding: "8px 10px", borderRadius: 4, border: "none", cursor: "pointer", marginBottom: 2,
            background: view === v ? "var(--color-accent-soft)" : "transparent",
            color: view === v ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontFamily: "var(--font-ui)", fontSize: 14,
          }}>
            <Icon name={ic} size={15} color={view === v ? "var(--color-accent)" : "var(--color-text-muted)"} />{label}
          </button>
        ))}
      </nav>
      {view === "notes" && (
        <div style={{ overflowY: "auto", padding: "4px 12px 16px", flex: 1 }}>
          {Object.entries(folders).map(([folder, items]) => (
            <div key={folder} style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-muted)", padding: "4px 10px 6px" }}>{folder}</div>
              {items.map(([id, n]) => (
                <button key={id} onClick={() => setActive(id)} style={{
                  display: "block", width: "100%", textAlign: "left", padding: "6px 10px", borderRadius: 4, border: "none", cursor: "pointer", marginBottom: 1,
                  background: active === id ? "var(--color-surface-raised)" : "transparent",
                  color: active === id ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontFamily: "var(--font-ui)", fontSize: 13.5, letterSpacing: "-0.01em",
                }}>{n.title}</button>
              ))}
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "auto", padding: "12px 18px", borderTop: "1px solid var(--color-border-subtle)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-success)" }} />local · synced
      </div>
    </aside>
  );
}

Object.assign(window, { Icon, Sidebar, NOTES, TASKS });
