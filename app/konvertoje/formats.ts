export type OutputFormat = "pdf" | "docx" | "xlsx" | "pptx" | "jpg" | "png";

export interface FormatMeta {
  color: string;
  darkBg: string;
  lightBg: string;
  icon: string;
  label: string;
}

export const FORMAT_META: Record<string, FormatMeta> = {
  pdf:  { color: "#e8534a", darkBg: "rgba(232,83,74,0.15)",  lightBg: "rgba(232,83,74,0.1)",  icon: "📄", label: "PDF"   },
  docx: { color: "#4a8aff", darkBg: "rgba(74,138,255,0.15)", lightBg: "rgba(74,138,255,0.1)", icon: "📝", label: "Word"  },
  xlsx: { color: "#27c47a", darkBg: "rgba(39,196,122,0.15)", lightBg: "rgba(39,196,122,0.1)", icon: "📊", label: "Excel" },
  pptx: { color: "#f0933a", darkBg: "rgba(240,147,58,0.15)", lightBg: "rgba(240,147,58,0.1)", icon: "📋", label: "PPT"   },
  jpg:  { color: "#a855f7", darkBg: "rgba(168,85,247,0.15)", lightBg: "rgba(168,85,247,0.1)", icon: "🖼️", label: "JPG"   },
  png:  { color: "#06b6d4", darkBg: "rgba(6,182,212,0.15)",  lightBg: "rgba(6,182,212,0.1)",  icon: "🖼️", label: "PNG"   },
};

export const getFmBg = (key: string, theme: "dark" | "light") => {
  const m = FORMAT_META[key];
  if (!m) return "var(--card2)";
  return theme === "dark" ? m.darkBg : m.lightBg;
};

export const CONVERSIONS_SHOWCASE = [
  { from: "DOCX", to: "PDF"  },
  { from: "PDF",  to: "DOCX" },
  { from: "PDF",  to: "PPTX" },
  { from: "XLSX", to: "PDF"  },
  { from: "DOCX", to: "PPTX" },
  { from: "PDF",  to: "XLSX" },
  { from: "PNG",  to: "PDF"  },
  { from: "JPG",  to: "PDF"  },
];