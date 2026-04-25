import { useState, useMemo } from "react";
import axios from "axios";
import { CONVERSION_MATRIX } from "../../shared/conversionMatrix";
import { Theme } from "./theme";
import { OutputFormat, FORMAT_META, getFmBg } from "./formats";
import { BtnPrimary, FormatChip } from "./ui";
import { ConvertLoader } from "./ConvertLoader";

export function ConvertPage({ theme }: { theme: Theme }) {
  const [file, setFile]           = useState<File | null>(null);
  const [format, setFormat]       = useState<OutputFormat | null>(null);
  const [converting, setConverting] = useState(false);
  const [done, setDone]           = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [dragging, setDragging]   = useState(false);

  const inputExt = useMemo(() =>
    file?.name.split(".").pop()?.toLowerCase() ?? null, [file]);

  const allowed: OutputFormat[] = useMemo(() =>
    inputExt ? ((CONVERSION_MATRIX as any)[inputExt] || []) : [], [inputExt]);

  const canConvert = Boolean(file && format && !converting);

  const handleFiles = (list: FileList | null) => {
    if (!list?.[0]) return;
    setFile(list[0]); setFormat(null); setDone(false); setError(null);
  };

  const reset = () => {
    setFile(null); setFormat(null); setDone(false); setError(null);
    const inp = document.getElementById("fileInput") as HTMLInputElement | null;
    if (inp) inp.value = "";
  };

  const handleConvert = async () => {
    if (!file || !format) return;
    setConverting(true); setError(null); setDone(false);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("format", format);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/convert`, fd, { responseType: "blob" });
      
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = Object.assign(document.createElement("a"), {
        href: url,
        download: `${file.name.replace(/\.[^.]+$/, "")}.${format}`,
      });
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      setDone(true);
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Konvertimi dështoi. Provo përsëri.");
    } finally {
      setConverting(false);
    }
  };

  const ifm = inputExt ? FORMAT_META[inputExt] : null;
  const ofm = format   ? FORMAT_META[format]   : null;

  return (
    <div className="page-enter" style={{ maxWidth:660, margin:"0 auto", padding:"68px 24px 100px" }}>
      {converting && <ConvertLoader fromExt={inputExt || ""} toFormat={format || ""} />}

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <h1 style={{
          fontFamily:"var(--font-display)", fontWeight:800,
          fontSize:"clamp(1.9rem,4vw,2.8rem)",
          letterSpacing:"-.03em", marginBottom:10, color:"var(--text)",
        }}>Konverto skedarin tënd</h1>
        <p style={{ color:"var(--text2)", fontSize:".95rem" }}>
          Ngarko, zgjidh formatin dhe shkarko — në sekonda.
        </p>
      </div>

      {/* ── SUCCESS STATE ── */}
      {done ? (
        <div style={{
          textAlign:"center", padding:"52px 32px",
          background: theme==="dark" ? "rgba(39,196,122,.07)" : "rgba(39,196,122,.05)",
          border:"1px solid", borderColor: theme==="dark" ? "rgba(39,196,122,.28)" : "rgba(39,196,122,.2)",
          borderRadius:22,
        }}>
          <div style={{ fontSize:"3.2rem", marginBottom:18 }}>✅</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"#27c47a", marginBottom:10 }}>
            Konvertimi u krye me sukses!
          </h2>
          <p style={{ color:"var(--text2)", marginBottom:32, fontSize:".9rem", lineHeight:1.75 }}>
            Skedari u shkarkua automatikisht.<br />
            Skedarët fshihen nga serverët tanë pas 1 ore.
          </p>
          <BtnPrimary onClick={reset}>Konverto skedar tjetër</BtnPrimary>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>

          {/* ── DROP ZONE ── */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => !file && document.getElementById("fileInput")?.click()}
            style={{
              border:`2px dashed ${dragging ? "var(--accent)" : "var(--border2)"}`,
              borderRadius:20,
              background: dragging
                ? theme==="dark" ? "rgba(108,99,255,.07)" : "rgba(91,82,245,.04)"
                : "var(--card)",
              padding: file ? "22px" : "54px 24px",
              textAlign:"center",
              cursor: file ? "default" : "pointer",
              transition:"all .25s",
              boxShadow:"0 2px 18px var(--shadow)",
            }}
          >
            <input
              id="fileInput" type="file" style={{ display:"none" }}
              onChange={e => handleFiles(e.target.files)}
            />
            {file ? (
              <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
                {/* File icon */}
                <div style={{
                  width:52, height:52, borderRadius:13, flexShrink:0,
                  background: ifm ? getFmBg(inputExt!, theme) : "var(--card2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"1.4rem",
                }}>{ifm?.icon ?? "📄"}</div>
                {/* File info */}
                <div style={{ textAlign:"left", flex:1, minWidth:0 }}>
                  <div style={{
                    fontWeight:600, fontSize:".95rem", color:"var(--text)",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                  }}>{file.name}</div>
                  <div style={{ color:"var(--text2)", fontSize:".76rem", marginTop:3 }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB · {inputExt?.toUpperCase()}
                  </div>
                </div>
                {/* Remove */}
                <button
                  onClick={e => { e.stopPropagation(); reset(); }}
                  style={{
                    background:"var(--card2)", border:"1px solid var(--border)",
                    cursor:"pointer", color:"var(--text2)", borderRadius:8,
                    padding:"6px 13px", fontSize:".78rem", fontFamily:"var(--font-body)",
                    transition:"color .2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--danger)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}
                >✕ Hiq</button>
              </div>
            ) : (
              <>
                <div style={{
                  width:64, height:64, borderRadius:18, margin:"0 auto 18px",
                  background: theme==="dark" ? "rgba(108,99,255,.13)" : "rgba(91,82,245,.08)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.7rem",
                }}>📁</div>
                <div style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1rem", color:"var(--text)", marginBottom:7 }}>
                  Tërhiq &amp; lësho skedarin këtu
                </div>
                <div style={{ color:"var(--text2)", fontSize:".85rem" }}>
                  ose{" "}
                  <span
                    style={{ color:"var(--accent)", textDecoration:"underline", cursor:"pointer" }}
                    onClick={e => { e.stopPropagation(); document.getElementById("fileInput")?.click(); }}
                  >kliko për të zgjedhur</span>
                </div>
                <div style={{ color:"var(--muted)", fontSize:".72rem", marginTop:12 }}>
                  PDF, DOCX, PPTX, XLSX, JPG, PNG · maks 100 MB
                </div>
              </>
            )}
          </div>

          {/* ── FORMAT SELECTOR ── */}
          {file && (
            <div style={{
              background:"var(--card)", border:"1px solid var(--border)",
              borderRadius:18, padding:"22px",
              boxShadow:"0 2px 14px var(--shadow)",
            }}>
              <div style={{
                fontSize:".72rem", color:"var(--muted)", fontWeight:700,
                textTransform:"uppercase", letterSpacing:".1em", marginBottom:14,
              }}>Konverto në →</div>
              {allowed.length === 0 ? (
                <p style={{ color:"var(--danger)", fontSize:".85rem" }}>
                  Nuk ka konvertime të mbështetura për këtë lloj skedari.
                </p>
              ) : (
                <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                  {allowed.map(f => {
                    const meta = FORMAT_META[f];
                    const sel  = format === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        style={{
                          padding:"10px 20px", borderRadius:10, cursor:"pointer",
                          border:`1.5px solid ${sel ? (meta?.color || "var(--accent)") : "var(--border)"}`,
                          background: sel
                            ? getFmBg(f, theme)
                            : "var(--card2)",
                          color: sel ? (meta?.color || "var(--accent)") : "var(--text2)",
                          fontFamily:"var(--font-display)", fontWeight:700, fontSize:".85rem",
                          display:"flex", alignItems:"center", gap:7, transition:"all .2s",
                        }}
                      >
                        {meta?.icon} {f.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── SUMMARY BAR ── */}
          {file && format && (
            <div style={{
              display:"flex", alignItems:"center", gap:12, padding:"13px 18px",
              background:"var(--card2)", border:"1px solid var(--border)", borderRadius:12,
            }}>
              {ifm && <FormatChip label={inputExt!.toUpperCase()} color={ifm.color} bg={getFmBg(inputExt!, theme)} />}
              <span style={{ color:"var(--text2)", fontSize:"1rem" }}>→</span>
              {ofm && <FormatChip label={format.toUpperCase()} color={ofm.color} bg={getFmBg(format, theme)} />}
              <span style={{ color:"var(--accent2)", fontSize:".8rem", marginLeft:"auto", fontWeight:600 }}>✓ Gati</span>
            </div>
          )}

          {/* ── ERROR ── */}
          {error && (
            <div style={{
              padding:"14px 18px", borderRadius:12,
              background: theme==="dark" ? "rgba(232,83,74,.09)" : "rgba(232,83,74,.06)",
              border:"1px solid rgba(232,83,74,.28)", color:"var(--danger)", fontSize:".875rem",
            }}>⚠️ {error}</div>
          )}

          {/* ── CONVERT BUTTON ── */}
          <button
            onClick={handleConvert}
            disabled={!canConvert}
            style={{
              width:"100%", padding:"16px",
              background: canConvert ? "var(--accent)" : "var(--card2)",
              color: canConvert ? "#fff" : "var(--muted)",
              border:`1px solid ${canConvert ? "var(--accent)" : "var(--border)"}`,
              borderRadius:14, fontFamily:"var(--font-display)", fontWeight:700,
              fontSize:"1rem", letterSpacing:".01em",
              cursor: canConvert ? "pointer" : "not-allowed", transition:"all .2s",
              boxShadow: canConvert ? "0 4px 28px rgba(108,99,255,.38)" : "none",
            }}
            onMouseEnter={e => canConvert && ((e.currentTarget as HTMLElement).style.opacity = ".88")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            {converting ? "Duke konvertuar..." : "⚡ Konverto & Shkarko"}
          </button>

          <p style={{ color:"var(--muted)", fontSize:".72rem", textAlign:"center" }}>
            🔒 SSL enkriptim · Skedarët fshihen automatikisht pas 1 ore
          </p>
        </div>
      )}
    </div>
  );
}