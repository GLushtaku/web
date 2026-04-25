import { useState, useEffect } from "react";
import { FORMAT_META } from "./formats";

const STAGES = [
  "Duke ngarkuar skedarin...",
  "Duke analizuar strukturën...",
  "Duke konvertuar...",
  "Duke optimizuar rezultatin...",
  "Po finalizohet...",
];

export function ConvertLoader({
  fromExt,
  toFormat,
}: {
  fromExt: string;
  toFormat: string;
}) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 13 + 2;
        if (next >= 95) { clearInterval(iv); return 95; }
        return next;
      });
      setStage(s => Math.min(s + (Math.random() > 0.62 ? 1 : 0), STAGES.length - 1));
    }, 370);
    return () => clearInterval(iv);
  }, []);

  const fromMeta = FORMAT_META[fromExt];
  const toMeta   = FORMAT_META[toFormat];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.78)", backdropFilter: "blur(18px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 26, padding: "52px 44px", width: "min(420px, 88vw)",
        textAlign: "center", boxShadow: "0 48px 120px rgba(0,0,0,0.6)",
      }}>
        {/* Spinner */}
        <div style={{ position: "relative", width: 84, height: 84, margin: "0 auto 32px" }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "var(--accent)",
            borderRightColor: "var(--accent2)",
            animation: "spin 1s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: 9, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem",
          }}>⚡</div>
        </div>

        {/* FROM → TO chips */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
          {fromMeta && (
            <span style={{
              padding: "5px 13px", borderRadius: 7, fontSize: ".76rem", fontWeight: 700,
              fontFamily: "var(--font-display)",
              background: fromMeta.darkBg, color: fromMeta.color,
            }}>{fromExt.toUpperCase()}</span>
          )}
          <span style={{ color: "var(--text2)", fontSize: "1rem" }}>→</span>
          {toMeta && (
            <span style={{
              padding: "5px 13px", borderRadius: 7, fontSize: ".76rem", fontWeight: 700,
              fontFamily: "var(--font-display)",
              background: toMeta.darkBg, color: toMeta.color,
            }}>{toFormat.toUpperCase()}</span>
          )}
        </div>

        {/* Stage label */}
        <p style={{
          color: "var(--text2)", fontSize: ".875rem",
          marginBottom: 28, minHeight: 22, fontWeight: 400,
        }}>
          {STAGES[stage]}
        </p>

        {/* Progress bar */}
        <div style={{
          background: "var(--border)", borderRadius: 100,
          height: 5, overflow: "hidden", marginBottom: 10,
        }}>
          <div style={{
            height: "100%", borderRadius: 100,
            background: "linear-gradient(90deg, var(--accent), var(--accent2))",
            width: `${progress}%`, transition: "width .38s ease",
          }} />
        </div>
        <p style={{ color: "var(--muted)", fontSize: ".74rem" }}>{Math.round(progress)}%</p>
      </div>
    </div>
  );
}