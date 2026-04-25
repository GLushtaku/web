type Page = "home" | "convert" | "about";

const FOOTER_NAV: { key: Page; label: string }[] = [
  { key:"home",    label:"Ballina"     },
  { key:"convert", label:"Konverto"   },
  { key:"about",   label:"Rreth nesh" },
];

const FOOTER_CONVERSIONS = ["Word → PDF","PDF → Word","PDF → PPT","Excel → PDF","PNG → PDF"];

function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display:"block", background:"none", border:"none", cursor:"pointer",
        color:"var(--muted)", fontFamily:"var(--font-body)", fontSize:".875rem",
        marginBottom:11, textAlign:"left", padding:0, transition:"color .2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
    >{label}</button>
  );
}

export function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer style={{ background:"var(--surface)", borderTop:"1px solid var(--border)", padding:"52px 24px 28px" }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        {/* Grid */}
        <div
          className="footer-grid"
          style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:44, marginBottom:44 }}
        >
          {/* Brand */}
          <div>
            <div style={{
              fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.4rem",
              backgroundImage:"linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              marginBottom:14,
            }}>Konvertoje</div>
            <p style={{ color:"var(--text2)", fontSize:".85rem", lineHeight:1.78, maxWidth:250 }}>
              Konvertimi i skedarëve bërë i thjeshtë, i shpejtë dhe i sigurt — për të gjithë.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ color:"var(--muted)", fontSize:".7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", marginBottom:16 }}>
              Navigim
            </div>
            {FOOTER_NAV.map(n => (
              <FooterLink key={n.key} label={n.label} onClick={() => setPage(n.key)} />
            ))}
          </div>

          {/* Conversions */}
          <div>
            <div style={{ color:"var(--muted)", fontSize:".7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", marginBottom:16 }}>
              Konvertimet
            </div>
            {FOOTER_CONVERSIONS.map(l => (
              <FooterLink key={l} label={l} onClick={() => setPage("convert")} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <p style={{ color:"var(--muted)", fontSize:".74rem" }}>
            © {new Date().getFullYear()} Konvertoje. Të gjitha të drejtat e rezervuara.
          </p>
          <p style={{ color:"var(--muted)", fontSize:".74rem" }}>
            Made with ❤️ by{" "}
            <a
              href="https://gentuarlushtaku-two.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color:"var(--accent)", textDecoration:"none", fontWeight:600,
                transition:"opacity .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = ".75")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >Gentuar Lushtaku</a>
          </p>
          <p style={{ color:"var(--muted)", fontSize:".74rem" }}>
            🔒 Skedarët tuaj janë të sigurt me ne
          </p>
        </div>
      </div>
    </footer>
  );
}