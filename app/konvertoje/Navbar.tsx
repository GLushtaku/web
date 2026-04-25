import { useState } from "react";
import { Theme } from "./theme";

type Page = "home" | "convert" | "about";

const NAV_ITEMS: { key: Page; label: string }[] = [
  { key: "home",    label: "Ballina"     },
  { key: "convert", label: "Konverto"   },
  { key: "about",   label: "Rreth nesh" },
];

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Ndrysho temën"
      title={theme === "dark" ? "Kaло në dritë" : "Kalo në errësirë"}
      style={{
        background: "var(--card2)", border: "1px solid var(--border)",
        borderRadius: 9, padding: "7px 13px", cursor: "pointer",
        fontSize: ".95rem", color: "var(--text2)", transition: "all .2s",
        display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
    >
      <span>{theme === "dark" ? "☀️" : "🌙"}</span>
      <span style={{ fontSize: ".75rem", fontWeight: 500, color: "var(--text2)" }} className="hide-mobile">
        {theme === "dark" ? "Dritë" : "Errët"}
      </span>
    </button>
  );
}

export function Navbar({ page, setPage, theme, setTheme }: {
  page: Page;
  setPage: (p: Page) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "var(--nav-bg)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          maxWidth: 1160, margin: "0 auto", padding: "0 24px", height: 64, gap: 16,
        }}>
          {/* Logo */}
          <button
            onClick={() => { setPage("home"); setOpen(false); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.45rem",
              letterSpacing: "-.03em", flexShrink: 0,
              backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            } as any}
          >
            Konvertoje
          </button>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ gap: 4, alignItems: "center" }}>
            {NAV_ITEMS.map(n => (
              <button
                key={n.key}
                onClick={() => setPage(n.key)}
                style={{
                  background: page === n.key ? "var(--card2)" : "transparent",
                  border: "1px solid",
                  borderColor: page === n.key ? "var(--border)" : "transparent",
                  borderRadius: 8, padding: "7px 15px", cursor: "pointer",
                  color: page === n.key ? "var(--text)" : "var(--text2)",
                  fontFamily: "var(--font-body)", fontWeight: page === n.key ? 600 : 400,
                  fontSize: ".875rem", transition: "all .2s",
                }}
                onMouseEnter={e => {
                  if (page !== n.key) (e.currentTarget as HTMLElement).style.color = "var(--text)";
                }}
                onMouseLeave={e => {
                  if (page !== n.key) (e.currentTarget as HTMLElement).style.color = "var(--text2)";
                }}
              >
                {n.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <ThemeToggle theme={theme} setTheme={setTheme} />

            {/* CTA — desktop only */}
            <button
              onClick={() => setPage("convert")}
              className="hide-mobile"
              style={{
                background: "var(--accent)", color: "#fff", border: "none",
                padding: "9px 20px", borderRadius: 9,
                fontFamily: "var(--font-body)", fontWeight: 600, fontSize: ".875rem",
                cursor: "pointer", transition: "opacity .2s",
                boxShadow: "0 0 18px rgba(108,99,255,.35)",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = ".85"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Fillo →
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(o => !o)}
              className="show-mobile"
              aria-label="Menu"
              style={{
                background: "var(--card2)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "8px", cursor: "pointer",
                display: "none", flexDirection: "column", gap: 5, alignItems: "center",
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: 20, height: 2,
                  background: "var(--text)", borderRadius: 2, transition: ".3s",
                  transform: open
                    ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                    : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none"
                    : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: "var(--surface)", borderBottom: "1px solid var(--border)",
          display: "flex", flexDirection: "column", zIndex: 199, position: "relative",
        }}>
          {NAV_ITEMS.map(n => (
            <button
              key={n.key}
              onClick={() => { setPage(n.key); setOpen(false); }}
              style={{
                background: page === n.key ? "var(--card2)" : "none",
                border: "none", borderBottom: "1px solid var(--border)",
                cursor: "pointer", color: "var(--text)", padding: "16px 24px",
                textAlign: "left", fontFamily: "var(--font-body)",
                fontSize: ".95rem", fontWeight: page === n.key ? 600 : 400,
              }}
            >
              {n.label}
            </button>
          ))}
          <div style={{ padding: 16 }}>
            <button
              onClick={() => { setPage("convert"); setOpen(false); }}
              style={{
                width: "100%", background: "var(--accent)", color: "#fff", border: "none",
                padding: "12px", borderRadius: 10, fontFamily: "var(--font-body)",
                fontWeight: 600, fontSize: ".95rem", cursor: "pointer",
              }}
            >▲ Fillo Konvertimin</button>
          </div>
        </div>
      )}
    </>
  );
}