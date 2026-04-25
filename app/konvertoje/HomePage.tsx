import { Theme } from "./theme";
import { CONVERSIONS_SHOWCASE, FORMAT_META, getFmBg } from "./formats";
import { Badge, BtnGhost, BtnPrimary, HoverCard, SectionHeader, FormatChip } from "./ui";

type Page = "home" | "convert" | "about";

const STATS = [
  { n: "20+",  l: "Formate" },
  { n: "100%", l: "Falas"   },
  { n: "<10s", l: "Shpejtësi" },
  { n: "∞",    l: "Skedarë" },
];

const FEATURES = [
  { icon: "🚀", t: "Shpejt",        d: "Konvertim brenda sekondave, pavarësisht madhësisë." },
  { icon: "🔒", t: "I sigurt",       d: "SSL enkriptim. Skedarët fshihen automatikisht pas 1 ore." },
  { icon: "💯", t: "Cilësi e lartë", d: "Ruhet formatimi, fontet dhe struktura origjinale." },
  { icon: "🆓", t: "Falas",          d: "Pa pagesa, pa regjistrim, pa limite të fshehura." },
  { icon: "📱", t: "Çdo pajisje",    d: "Funksionon perfekt në telefon, tablet dhe kompjuter." },
  { icon: "📦", t: "Shumë skedarë",  d: "Ngarko dhe konverto shumë skedarë njëkohësisht." },
];

export function HomePage({ setPage, theme }: { setPage: (p: Page) => void; theme: Theme }) {
  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section style={{
        padding: "112px 24px 80px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Glow blobs */}
        {[
          { w:580, h:580, bg:"var(--accent)", op: theme==="dark"?.12:.06, top:-180, left:-100, dur:"18s" },
          { w:400, h:400, bg:"var(--accent2)", op: theme==="dark"?.09:.05, bottom:-120, right:-90, dur:"22s" },
        ].map((b,i) => (
          <div key={i} style={{
            position:"absolute", width: b.w, height: b.h, borderRadius:"50%",
            background: b.bg, filter:"blur(130px)", opacity: b.op,
            top: (b as any).top, left: (b as any).left,
            bottom: (b as any).bottom, right: (b as any).right,
            pointerEvents:"none",
            animation: `drift ${b.dur} ease-in-out infinite alternate`,
          }} />
        ))}

        <div style={{ position:"relative", zIndex:1, maxWidth:760, margin:"0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <Badge theme={theme}>Pa regjistrim · Falas · 100% i sigurt</Badge>
          </div>
          <h1 style={{
            fontFamily:"var(--font-display)", fontWeight:800,
            fontSize:"clamp(2.6rem, 6vw, 5rem)", lineHeight:1.05,
            letterSpacing:"-.035em", marginBottom:22, color:"var(--text)",
          }}>
            Konverto çdo skedar<br />
            <span style={{
              backgroundImage:"linear-gradient(135deg, var(--accent) 0%, #9f72ff 45%, var(--accent2) 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              fontStyle:"italic",
            }}>në sekonda</span>
          </h1>
          <p style={{
            color:"var(--text2)", fontSize:"1.08rem", maxWidth:500,
            margin:"0 auto 40px", lineHeight:1.8, fontWeight:300,
          }}>
            Word, PDF, PowerPoint, Excel dhe imazhe — konverto pa instalime, pa regjistrim, plotësisht falas.
          </p>
          <div className="hero-btns" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
  <button
    onClick={() => setPage("convert")}
    style={{
      background:"var(--accent)", color:"#fff", border:"none",
      padding:"13px 34px", borderRadius:11, fontSize:"1rem",
      fontFamily:"var(--font-body)", fontWeight:600, cursor:"pointer",
      boxShadow:"0 0 28px rgba(108,99,255,.38)", lineHeight:1.4,
    }}
  >▲ Ngarko skedarin tënd</button>

  <button
    onClick={() => setPage("about")}
    style={{
      background:"transparent", color:"var(--text2)",
      border:"1px solid var(--border2)",
      padding:"13px 34px", borderRadius:11, fontSize:"1rem",
      fontFamily:"var(--font-body)", fontWeight:500, cursor:"pointer",
      lineHeight:1.4,
    }}
  >Si funksionon?</button>
</div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding:"0 24px 80px" }}>
        <div
          className="stats-grid"
          style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, maxWidth:780, margin:"0 auto" }}
        >
          {STATS.map(s => (
            <div key={s.n} style={{
              background:"var(--card)", border:"1px solid var(--border)",
              borderRadius:16, padding:"24px 16px", textAlign:"center",
              boxShadow:"0 2px 16px var(--shadow)",
            }}>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1.95rem", color:"var(--text)" }}>{s.n}</div>
              <div style={{ color:"var(--text2)", fontSize:".8rem", marginTop:5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONVERSIONS ── */}
      <section style={{ padding:"0 24px 80px", maxWidth:1160, margin:"0 auto" }}>
        <SectionHeader eyebrow="Konvertimet" title="Çfarë mund të konvertosh?" />
        <div className="conv-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:14 }}>
          {CONVERSIONS_SHOWCASE.map((c, i) => {
            const fm = FORMAT_META[c.from.toLowerCase()];
            const tm = FORMAT_META[c.to.toLowerCase()];
            return (
              <HoverCard key={i} style={{ padding:20 }} onClick={() => setPage("convert")}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  {fm && <FormatChip label={c.from} color={fm.color} bg={getFmBg(c.from.toLowerCase(), theme)} />}
                  <span style={{ color:"var(--muted)" }}>→</span>
                  {tm && <FormatChip label={c.to}   color={tm.color} bg={getFmBg(c.to.toLowerCase(), theme)} />}
                </div>
                <span style={{ color:"var(--text2)", fontSize:".8rem" }}>{c.from} në {c.to}</span>
              </HoverCard>
            );
          })}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding:"0 24px 80px", maxWidth:1160, margin:"0 auto" }}>
        <SectionHeader eyebrow="Karakteristikat" title="Pse Konvertoje?" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(255px,1fr))", gap:18 }}>
          {FEATURES.map(f => (
            <HoverCard key={f.t} style={{ padding:28 }}>
              <span style={{ fontSize:"1.7rem", marginBottom:16, display:"block" }}>{f.icon}</span>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, marginBottom:8, color:"var(--text)", fontSize:"1rem" }}>{f.t}</h3>
              <p style={{ color:"var(--text2)", fontSize:".875rem", lineHeight:1.72 }}>{f.d}</p>
            </HoverCard>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding:"0 24px 100px", maxWidth:1160, margin:"0 auto" }}>
        <div style={{
          background: theme==="dark"
            ? "linear-gradient(135deg, rgba(108,99,255,.13), rgba(52,217,165,.07))"
            : "linear-gradient(135deg, rgba(91,82,245,.07), rgba(28,184,138,.05))",
          border:"1px solid",
          borderColor: theme==="dark" ? "rgba(108,99,255,.24)" : "rgba(91,82,245,.18)",
          borderRadius:26, padding:"68px 32px", textAlign:"center",
        }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(1.7rem,3vw,2.6rem)", marginBottom:14, color:"var(--text)" }}>
            Gati për të konvertuar?
          </h2>
          <p style={{ color:"var(--text2)", maxWidth:420, margin:"0 auto 32px", fontSize:".95rem", lineHeight:1.75 }}>
            Pa regjistrim. Falas. Shpejt. Pikërisht siç duhet të jetë.
          </p>
          <BtnPrimary onClick={() => setPage("convert")} style={{ padding:"14px 38px", fontSize:"1rem" }}>
            ▲ Fillo Tani
          </BtnPrimary>
        </div>
      </section>
    </div>
  );
}