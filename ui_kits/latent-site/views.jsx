/* latent-site — screen views: Home, Projects archive, Writing/essay */

const PROJECTS = [
  { id: "ido", kanji: "井戸", year: "2026", status: "ACTIVE",
    tags: ["KNOWLEDGE", "LOCAL-FIRST", "RUST"],
    line: "A quiet local-first knowledge system built around depth, memory, and long-term organization.",
    desc: "Notes, wiki, tasks and goals — a personal well to draw thought from below the surface." },
  { id: "logos", kanji: "λόγος", year: "2026", status: "RESEARCH",
    tags: ["MARKETS", "BACKTESTING", "PYTHON"],
    line: "A research system for reasoning under uncertainty.",
    desc: "Market data, backtesting and disciplined algorithmic decision infrastructure. Reason over reaction." },
  { id: "proteus", kanji: "", year: "2025", status: "ARCHIVED",
    tags: ["MARKOV", "CHANGE-POINT", "THESIS"],
    line: "Change-point detection via a Markov-switching model for commodities.",
    desc: "Master's thesis work — inferring hidden regime transitions beneath market noise." },
];

const WRITING = [
  { title: "Depth over noise", date: "2026 — 05", read: "6 min", kicker: "PRINCIPLE",
    excerpt: "Most tools optimise for surface. A few optimise for substance. Notes on building software that stays useful for years rather than weeks." },
  { title: "Signal beneath the surface", date: "2026 — 03", read: "11 min", kicker: "SYSTEMS",
    excerpt: "On latent structure: what it means to design for the variable you cannot directly observe, and why inference is an act of restraint." },
  { title: "Engineering as craft", date: "2026 — 01", read: "8 min", kicker: "ESSAY",
    excerpt: "Software presented as craft — designed, reasoned about, documented, iterated. Engineered rather than marketed." },
];

/* ---- HOME ---- */
function Home({ setView }) {
  return (
    <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 0" }}>
      <section style={{ padding: "84px 0 64px" }}>
        <p className="meta" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "-0.03em", color: "var(--color-text-muted)", margin: "0 0 28px" }}>
          latent.foundation / a quiet systems laboratory
        </p>
        <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(2.6rem, 6vw, 4rem)", fontWeight: 500, letterSpacing: "-0.045em", lineHeight: 1.02, margin: 0, color: "var(--color-text-primary)", maxWidth: "16ch" }}>
            Systems beneath the surface.
        </h1>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 18, lineHeight: 1.7, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", maxWidth: "54ch", margin: "28px 0 0" }}>
          A personal engineering lab for software projects, research tooling, and long-term
          systems. Built carefully, reasoned about, iterated over time. Depth over noise.
        </p>
      </section>

      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
          <h2 style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-muted)", margin: 0 }}>Projects</h2>
          <button onClick={() => setView("projects")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>view all →</button>
        </div>
        <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
          {PROJECTS.slice(0, 2).map(p => <ProjectRow key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}

/* ---- PROJECT ROW ---- */
function ProjectRow({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "grid", gridTemplateColumns: "72px 1fr auto", gap: 24, alignItems: "start",
      padding: "26px 4px", borderBottom: "1px solid var(--color-border-subtle)",
      background: hover ? "var(--color-bg-subtle)" : "transparent", transition: "background 160ms", cursor: "pointer",
    }}>
      <div style={{ fontFamily: "var(--font-wordmark)", fontSize: 30, color: "var(--color-text-muted)", letterSpacing: "-0.02em" }}>{p.kanji || p.id[0]}</div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-wordmark)", fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>{p.id}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>{p.status}</span>
        </div>
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 15, lineHeight: 1.6, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", margin: "0 0 12px", maxWidth: "52ch" }}>{p.line}</p>
        <div style={{ display: "flex", gap: 8 }}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)" }}>{p.year}</span>
    </div>
  );
}

/* ---- PROJECTS ARCHIVE ---- */
function Projects() {
  const [filter, setFilter] = useState("ALL");
  const filters = ["ALL", "ACTIVE", "RESEARCH", "ARCHIVED"];
  const shown = filter === "ALL" ? PROJECTS : PROJECTS.filter(p => p.status === filter);
  return (
    <div style={{ maxWidth: "var(--container)", margin: "0 auto", paddingTop: 64 }}>
      <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "2.75rem", fontWeight: 500, letterSpacing: "-0.04em", margin: "0 0 10px", color: "var(--color-text-primary)" }}>Projects</h1>
      <p style={{ fontFamily: "var(--font-ui)", fontSize: 16, color: "var(--color-text-secondary)", margin: "0 0 32px", maxWidth: "52ch", lineHeight: 1.7 }}>
        An archive of software, research tooling and experiments. Engineered rather than marketed.
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", cursor: "pointer",
            padding: "5px 12px", borderRadius: 999, border: "1px solid var(--color-border-subtle)",
            background: filter === f ? "var(--color-accent-soft)" : "transparent",
            color: filter === f ? "var(--color-text-primary)" : "var(--color-text-muted)",
          }}>{f}</button>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--color-border-subtle)", marginTop: 16 }}>
        {shown.map(p => <ProjectRow key={p.id} p={p} />)}
      </div>
    </div>
  );
}

/* ---- WRITING ---- */
function Writing({ setEssay }) {
  return (
    <div style={{ maxWidth: "var(--container)", margin: "0 auto", paddingTop: 64 }}>
      <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "2.75rem", fontWeight: 500, letterSpacing: "-0.04em", margin: "0 0 32px", color: "var(--color-text-primary)" }}>Writing</h1>
      <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        {WRITING.map((w, i) => <WritingRow key={i} w={w} onClick={() => setEssay(w)} />)}
      </div>
    </div>
  );
}

function WritingRow({ w, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <article onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      padding: "28px 4px", borderBottom: "1px solid var(--color-border-subtle)", cursor: "pointer",
      background: hover ? "var(--color-bg-subtle)" : "transparent", transition: "background 160ms",
    }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>
        <span>{w.kicker}</span><span>{w.date}</span><span>{w.read}</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-ui)", fontSize: 24, fontWeight: 500, letterSpacing: "-0.03em", margin: "0 0 8px", color: hover ? "var(--color-accent)" : "var(--color-text-primary)", transition: "color 160ms" }}>{w.title}</h3>
      <p style={{ fontFamily: "var(--font-ui)", fontSize: 15, lineHeight: 1.65, color: "var(--color-text-secondary)", margin: 0, maxWidth: "60ch" }}>{w.excerpt}</p>
    </article>
  );
}

/* ---- ESSAY (reading view, defaults to a paper feel) ---- */
function Essay({ w, back }) {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", paddingTop: 56 }}>
      <button onClick={back} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-muted)", marginBottom: 36, padding: 0 }}>← writing</button>
      <div style={{ display: "flex", gap: 16, marginBottom: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>
        <span>{w.kicker}</span><span>{w.date}</span><span>{w.read}</span>
      </div>
      <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "2.5rem", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.08, margin: "0 0 28px", color: "var(--color-text-primary)" }}>{w.title}</h1>
      <p style={{ fontFamily: "var(--font-ui)", fontSize: 19, lineHeight: 1.75, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", margin: "0 0 24px" }}>{w.excerpt}</p>
      <p style={{ fontFamily: "var(--font-ui)", fontSize: 17, lineHeight: 1.8, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", margin: "0 0 24px" }}>
        The brand should feel like a systems archive — a research laboratory, an engineering atelier,
        a quiet digital workspace. Interfaces should be calm, precise, restrained, deliberate. The
        user should feel clarity through stillness.
      </p>
      <p style={{ fontFamily: "var(--font-ui)", fontSize: 17, lineHeight: 1.8, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", margin: "0 0 24px" }}>
        Prioritise substance, clarity, and long-term usefulness over visual noise and shallow polish.
        When making any decision, ask: <em style={{ color: "var(--color-text-primary)" }}>does this make
        the work quieter, clearer, and more structurally intentional?</em>
      </p>
      <blockquote style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: 20, margin: "32px 0", fontFamily: "var(--font-ui)", fontSize: 19, lineHeight: 1.6, letterSpacing: "-0.02em", color: "var(--color-text-primary)" }}>
        Confidence can be quiet.
      </blockquote>
    </div>
  );
}

/* ---- ABOUT / COLOPHON ----
   Positioned as a quiet colophon, not a resume. The lab IS one person.
   First person, restrained. Facts as index-card metadata, never stat-slop.
   Replace the [bracketed] bits with your real details. */
const ABOUT_FACTS = [
  ["focus", "systems · research · long-term software"],
  ["building", "ido · logos — in the open"],
  ["languages", "Rust · Python · Java"],
  ["studying", "M.Sc. Computer Science"],
  ["based", "[your city, country]"],
];

function About() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", paddingTop: 64 }}>
      <p className="meta" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "-0.03em", color: "var(--color-text-muted)", margin: "0 0 28px" }}>
        colophon · the person behind the lab
      </p>

      <div style={{ display: "flex", gap: 22, alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap" }}>
        {/* Typographic monogram in place of a photo — type-first, on brand.
            Swap for a real portrait later if you want. */}
        <div style={{
          width: 84, height: 84, flexShrink: 0, border: "1px solid var(--color-border-strong)",
          borderRadius: 4, display: "grid", placeItems: "center", background: "var(--color-surface)",
          fontFamily: "var(--font-wordmark)", fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em",
          color: "var(--color-text-secondary)",
        }}>MN</div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(2rem, 4.5vw, 2.75rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.06, margin: "0 0 4px", color: "var(--color-text-primary)" }}>
            latent. is the work of one person.
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "-0.02em", color: "var(--color-text-muted)", margin: "10px 0 0" }}>
            Maksymilian Neumann · software engineer
          </p>
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-ui)", fontSize: 19, lineHeight: 1.75, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", margin: "0 0 22px" }}>
        I'm drawn to systems — the hidden structure beneath a problem, the slow accrual of
        a well-made tool. <span style={{ color: "var(--color-text-primary)" }}>latent.</span> is
        where I keep that work: software, research, and long-term experiments, built carefully
        and reasoned about rather than rushed out.
      </p>
      <p style={{ fontFamily: "var(--font-ui)", fontSize: 17, lineHeight: 1.8, letterSpacing: "-0.011em", color: "var(--color-text-secondary)", margin: "0 0 22px" }}>
        I'd rather ship one carefully-reasoned system than ten quick ones. Most of what I make
        is for the long term — tools I expect to still be using in five years. Engineering as
        craft, quietly.
      </p>

      {/* Now — a single living line */}
      <div style={{ display: "flex", gap: 14, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)", margin: "8px 0 36px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent)", flexShrink: 0 }}>now</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 15, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
          Finishing a Master's in Computer Science and building <span style={{ color: "var(--color-text-primary)" }}>ido</span> and <span style={{ color: "var(--color-text-primary)" }}>logos</span> in the open. Writing when something is worth writing down.
        </span>
      </div>

      {/* Facts — index-card metadata, hairline rows */}
      <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
        {ABOUT_FACTS.map(([k, v]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 18, padding: "13px 2px", borderBottom: "1px solid var(--color-border-subtle)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{k}</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 14.5, letterSpacing: "-0.011em", color: "var(--color-text-secondary)" }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 18, padding: "13px 2px", borderBottom: "1px solid var(--color-border-subtle)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>elsewhere</span>
          <span style={{ display: "flex", gap: 16 }}>
            {["github", "linkedin", "email"].map(l => (
              <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontFamily: "var(--font-ui)", fontSize: 14.5, color: "var(--color-text-primary)", textDecoration: "none", borderBottom: "1px solid var(--color-border-strong)", paddingBottom: 2 }}>{l}</a>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Home, Projects, Writing, Essay, About, ProjectRow, WritingRow, PROJECTS, WRITING, ABOUT_FACTS });
