/* ido — main panels: NoteView, TaskView, GoalView */

const { useState: useS } = React;

function NoteView({ id, setActive }) {
  const n = NOTES[id];
  return (
    <div style={{ flex: 1, overflowY: "auto", height: "100%" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 48px 80px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 18, fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "-0.02em", color: "var(--color-text-muted)" }}>
          <span><Icon name="folder" size={12} color="var(--color-text-muted)" /> {n.folder}</span>
          <span>created {n.created}</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "2.25rem", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 14px", color: "var(--color-text-primary)" }}>{n.title}</h1>
        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {n.tags.map(t => <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", border: "1px solid var(--color-border-subtle)", borderRadius: 999, padding: "3px 10px" }}>#{t}</span>)}
        </div>
        {n.body.map((p, i) => (
          <p key={i} style={{ fontFamily: "var(--font-ui)", fontSize: 17, lineHeight: 1.8, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", margin: "0 0 22px" }}>{p}</p>
        ))}
        {n.links.length > 0 && (
          <div style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid var(--color-border-subtle)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="link" size={13} /> linked notes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {n.links.map(l => (
                <button key={l} onClick={() => setActive(l)} style={{
                  textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
                  background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: 4, cursor: "pointer",
                  fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--color-text-primary)",
                }}>
                  <Icon name="corner-down-right" size={14} />{NOTES[l].title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskView() {
  const [tasks, setTasks] = useS(TASKS);
  const toggle = i => setTasks(ts => ts.map((t, j) => j === i ? { ...t, done: !t.done } : t));
  return (
    <div style={{ flex: 1, overflowY: "auto", height: "100%" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 48px" }}>
        <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "2rem", fontWeight: 500, letterSpacing: "-0.04em", margin: "0 0 6px", color: "var(--color-text-primary)" }}>Tasks</h1>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 15, color: "var(--color-text-secondary)", margin: "0 0 32px" }}>A task is a note with a state and a horizon.</p>
        <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
          {tasks.map((t, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              display: "grid", gridTemplateColumns: "22px 1fr auto auto", gap: 16, alignItems: "center",
              padding: "15px 4px", borderBottom: "1px solid var(--color-border-subtle)", cursor: "pointer",
            }}>
              <span style={{ width: 17, height: 17, borderRadius: 3, border: "1.5px solid " + (t.done ? "var(--color-accent)" : "var(--color-border-strong)"), background: t.done ? "var(--color-accent)" : "transparent", display: "grid", placeItems: "center" }}>
                {t.done && <Icon name="check" size={12} color="var(--color-bg)" />}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 15, letterSpacing: "-0.011em", color: t.done ? "var(--color-text-muted)" : "var(--color-text-primary)", textDecoration: t.done ? "line-through" : "none" }}>{t.t}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-text-muted)", border: "1px solid var(--color-border-subtle)", borderRadius: 999, padding: "3px 9px" }}>{t.goal}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: t.due === "done" ? "var(--color-success)" : "var(--color-text-muted)", width: 86, textAlign: "right" }}>{t.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GoalView() {
  const goals = [
    { name: "ido v0.1", desc: "Durable local store, retrieval, links.", pct: 40 },
    { name: "ido v0.2", desc: "Tasks folded into note state; daily notes.", pct: 8 },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", height: "100%" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 48px" }}>
        <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "2rem", fontWeight: 500, letterSpacing: "-0.04em", margin: "0 0 32px", color: "var(--color-text-primary)" }}>Goals</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {goals.map(g => (
            <div key={g.name} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: 4, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>{g.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)" }}>{g.pct}%</span>
              </div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 16px" }}>{g.desc}</p>
              <div style={{ height: 4, background: "var(--color-border-subtle)", borderRadius: 999 }}>
                <div style={{ height: "100%", width: g.pct + "%", background: "var(--color-accent)", borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NoteView, TaskView, GoalView });
