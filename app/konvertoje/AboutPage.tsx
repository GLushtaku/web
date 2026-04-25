import { useState } from "react";
import { Theme } from "./theme";
import { BtnPrimary, HoverCard, SectionHeader } from "./ui";

type Page = "home" | "convert" | "about";

const STEPS = [
  { n:"01", icon:"📤", t:"Ngarko",          d:"Tërhiq e lësho ose kliko për të zgjedhur skedarin nga pajisja jote." },
  { n:"02", icon:"🎯", t:"Zgjidh formatin",  d:"Zgjidh formatin e daljes nga opsionet e disponueshme." },
  { n:"03", icon:"⚡", t:"Konverto",         d:"Kliko dhe shkarko rezultatin menjëherë — brenda sekondave." },
  { n:"04", icon:"🔐", t:"Siguri totale",    d:"Skedarët fshihen pas 1 ore. Privatësia jote është e garantuar." },
];

const FAQS = [
  { q:"A është Konvertoje falas?",             a:"Po, 100% falas. Pa regjistrim, pa abonime, pa kufizime të fshehura." },
  { q:"Sa kohë ruhen skedarët?",               a:"Skedarët fshihen automatikisht brenda 1 ore nga serverët tanë." },
  { q:"Sa i madh mund të jetë skedari?",       a:"Pranojmë skedarë deri në 100 MB. Kontakto ekipin tonë për nevoja të tjera." },
  { q:"Cilët formate mbështeten?",             a:"PDF, DOCX, PPTX, XLSX, JPG, PNG dhe shumë të tjera mbi 20 formate gjithsej." },
  { q:"A funksionon në telefon?",              a:"Po! Konvertoje është dizajnuar plotësisht responsive për çdo pajisje." },
  { q:"A janë të sigurta skedarët e mi?",      a:"Po. Të gjitha ngarkimet kodohen me SSL dhe fshihen automatikisht pas konvertimit." },
];

export function AboutPage({ setPage, theme }: { setPage: (p: Page) => void; theme: Theme }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="page-enter" style={{ maxWidth:900, margin:"0 auto", padding:"68px 24px 100px" }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <h1 style={{
          fontFamily:"var(--font-display)", fontWeight:800,
          fontSize:"clamp(1.9rem,4vw,2.8rem)",
          letterSpacing:"-.03em", marginBottom:12, color:"var(--text)",
        }}>Si funksionon?</h1>
        <p style={{ color:"var(--text2)", maxWidth:460, margin:"0 auto", lineHeight:1.75, fontSize:".95rem" }}>
          3 hapa të thjeshtë. Pa instalime, pa regjistrim.
        </p>
      </div>

      {/* Steps */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px,1fr))", gap:18, marginBottom:80 }}>
        {STEPS.map(s => (
          <HoverCard key={s.n} style={{ padding:"28px 24px" }}>
            <span style={{
              fontFamily:"var(--font-display)", fontWeight:800,
              fontSize:"2.4rem", color:"var(--border2)",
              lineHeight:1, marginBottom:14, display:"block",
            }}>{s.n}</span>
            <span style={{ fontSize:"1.6rem", display:"block", marginBottom:10 }}>{s.icon}</span>
            <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, marginBottom:8, color:"var(--text)", fontSize:"1rem" }}>{s.t}</h3>
            <p style={{ color:"var(--text2)", fontSize:".875rem", lineHeight:1.68 }}>{s.d}</p>
          </HoverCard>
        ))}
      </div>

      {/* FAQ */}
      <SectionHeader eyebrow="FAQ" title="Pyetjet e zakonshme" />
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:64 }}>
        {FAQS.map((f, i) => (
          <div
            key={i}
            style={{
              background:"var(--card)", border:"1px solid",
              borderColor: open===i ? "var(--accent)" : "var(--border)",
              borderRadius:14, overflow:"hidden", transition:"border-color .22s",
              boxShadow:"0 2px 10px var(--shadow)",
            }}
          >
            <button
              onClick={() => setOpen(open===i ? null : i)}
              style={{
                width:"100%", display:"flex", alignItems:"center",
                justifyContent:"space-between", padding:"18px 22px",
                background:"none", border:"none", cursor:"pointer",
                color:"var(--text)", fontFamily:"var(--font-body)",
                fontWeight:500, fontSize:".95rem", textAlign:"left", gap:12,
              }}
            >
              <span>{f.q}</span>
              <span style={{
                color: open===i ? "var(--accent)" : "var(--muted)",
                transition:".3s", transform: open===i ? "rotate(180deg)" : "none",
                display:"inline-block", flexShrink:0, fontSize:"1.05rem",
              }}>▾</span>
            </button>
            {open===i && (
              <div style={{ padding:"0 22px 20px", color:"var(--text2)", fontSize:".875rem", lineHeight:1.8 }}>
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ textAlign:"center" }}>
        <BtnPrimary onClick={() => setPage("convert")} style={{ padding:"14px 38px", fontSize:"1rem" }}>
          ▲ Fillo Konvertimin
        </BtnPrimary>
      </div>
    </div>
  );
}