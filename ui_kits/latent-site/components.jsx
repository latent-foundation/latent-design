/* latent-site — shared UI components
   Grounded in the real placeholder at latent.foundation:
   bordered card, mono meta line, tight wordmark, borders over shadows. */

const { useState, useEffect } = React;

/* ---- Theme hook ---- */
function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  return [theme, setTheme];
}

/* ---- Logo mark (latent. umbrella ONLY — not used by ido/logos) ---- */
function LogoMark({ size = 22, theme = "dark" }) {
  // mark fill is baked into the SVG: -dark = bone (for dark bg), -light = ink (for light bg)
  const src = theme === "light" ? "../../assets/latent-mark-light.svg" : "../../assets/latent-mark-dark.svg";
  return <img src={src} alt="latent. mark" style={{ height: size, width: "auto", display: "block" }} />;
}

/* ---- Wordmark ---- */
function Wordmark({ size = 19, muted }) {
  return (
    <span style={{
      fontFamily: "var(--font-wordmark)", fontWeight: 500, letterSpacing: "-0.045em",
      fontSize: size, lineHeight: 1, color: muted ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    }}>latent.</span>
  );
}

/* ---- Header ---- */
function SiteHeader({ view, setView, theme, setTheme }) {
  const nav = [["index", "home"], ["projects", "projects"], ["writing", "writing"], ["about", "about"]];
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 0", borderBottom: "1px solid var(--color-border-subtle)",
      maxWidth: "var(--container)", margin: "0 auto",
    }}>
      <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10 }}>
        <LogoMark size={24} theme={theme} />
        <Wordmark size={20} />
      </button>
      <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {nav.map(([label, v]) => (
          <button key={v} onClick={() => setView(v)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: "var(--font-ui)", fontSize: 14, letterSpacing: "-0.01em",
            color: view === v ? "var(--color-text-primary)" : "var(--color-text-muted)",
            transition: "color 120ms",
          }}>{label}</button>
        ))}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="toggle theme" style={{
          background: "none", border: "1px solid var(--color-border-strong)", cursor: "pointer",
          width: 30, height: 30, borderRadius: 3, color: "var(--color-text-secondary)",
          fontFamily: "var(--font-mono)", fontSize: 12, display: "grid", placeItems: "center",
        }}>{theme === "dark" ? "☾" : "☀"}</button>
      </nav>
    </header>
  );
}

/* ---- Footer ---- */
function SiteFooter() {
  return (
    <footer style={{
      maxWidth: "var(--container)", margin: "0 auto", padding: "40px 0 28px",
      borderTop: "1px solid var(--color-border-subtle)", marginTop: 80,
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <span className="meta" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "-0.03em", color: "var(--color-text-muted)" }}>
        latent.foundation · © 2026 · built by Maksymilian Neumann
      </span>
      <span style={{ display: "flex", gap: 14 }}>
        {["github", "linkedin"].map(l => (
          <a key={l} href="#" onClick={e => e.preventDefault()} style={{
            color: "var(--color-text-secondary)", fontSize: 13, textDecoration: "none",
            borderBottom: "1px solid var(--color-border-strong)", paddingBottom: 2,
          }}>{l}</a>
        ))}
      </span>
    </footer>
  );
}

/* ---- Tag ---- */
function Tag({ children, active }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase",
      color: active ? "var(--color-text-secondary)" : "var(--color-text-muted)",
      background: active ? "var(--color-accent-soft)" : "transparent",
      border: "1px solid var(--color-border-subtle)", borderRadius: 999, padding: "4px 11px",
    }}>{children}</span>
  );
}

Object.assign(window, { useTheme, LogoMark, Wordmark, SiteHeader, SiteFooter, Tag });
