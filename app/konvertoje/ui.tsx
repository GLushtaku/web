import { CSSProperties, ReactNode, MouseEventHandler } from "react";
import { Theme } from "./theme";

// ── Badge pill ────────────────────────────────────────────────────────────────
export function Badge({ children, theme }: { children: ReactNode; theme: Theme }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: theme === "dark" ? "rgba(108,99,255,.13)" : "rgba(91,82,245,.09)",
      border: "1px solid",
      borderColor: theme === "dark" ? "rgba(108,99,255,.32)" : "rgba(91,82,245,.22)",
      color: "var(--accent)", padding: "5px 16px", borderRadius: 100,
      fontSize: ".76rem", fontWeight: 600, fontFamily: "var(--font-body)",
      letterSpacing: ".02em",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--accent)", display: "inline-block",
        animation: "pulse-dot 1.6s infinite",
      }} />
      {children}
    </div>
  );
}

// ── Format chip ───────────────────────────────────────────────────────────────
export function FormatChip({
  label, color, bg,
}: { label: string; color: string; bg: string }) {
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 6,
      fontWeight: 700, fontSize: ".72rem",
      fontFamily: "var(--font-display)",
      background: bg, color,
      letterSpacing: ".03em",
    }}>{label}</span>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
export function SectionHeader({
  eyebrow, title,
}: { eyebrow: string; title: string }) {
  return (
    <>
      <p style={{
        color: "var(--muted)", fontSize: ".72rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 8,
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(1.55rem,3vw,2.15rem)",
        marginBottom: 32, letterSpacing: "-.025em", color: "var(--text)",
      }}>{title}</h2>
    </>
  );
}

// ── Primary button ────────────────────────────────────────────────────────────
export function BtnPrimary({
  children, onClick, disabled, style,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "var(--card2)" : "var(--accent)",
        color: disabled ? "var(--muted)" : "#fff",
        border: "none", borderRadius: 11,
        padding: "13px 30px", fontSize: ".95rem",
        fontFamily: "var(--font-body)", fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all .2s",
        boxShadow: disabled ? "none" : "0 0 28px rgba(108,99,255,.38)",
        ...style,
      }}
      onMouseEnter={e => !disabled && ((e.currentTarget as HTMLElement).style.opacity = ".88")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
    >
      {children}
    </button>
  );
}

// ── Ghost button ──────────────────────────────────────────────────────────────
export function BtnGhost({
  children, onClick, style,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent", color: "var(--text2)",
        border: "1px solid var(--border2)",
        padding: "13px 24px", borderRadius: 11, fontSize: ".95rem",
        fontFamily: "var(--font-body)", fontWeight: 500,
        cursor: "pointer", transition: "all .2s",
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
        (e.currentTarget as HTMLElement).style.color = "var(--text)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)";
        (e.currentTarget as HTMLElement).style.color = "var(--text2)";
      }}
    >
      {children}
    </button>
  );
}

// ── Hover card ────────────────────────────────────────────────────────────────
export function HoverCard({
  children, style, onClick,
}: { children: ReactNode; style?: CSSProperties; onClick?: MouseEventHandler }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: 18, boxShadow: "0 2px 14px var(--shadow)",
        transition: "border-color .2s, transform .2s, box-shadow .2s",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--accent)";
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 8px 28px var(--shadow)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "none";
        el.style.boxShadow = "0 2px 14px var(--shadow)";
      }}
    >
      {children}
    </div>
  );
}