"use client";

import { useState, useEffect } from "react";
import { Theme, THEME_VARS, GLOBAL_CSS } from "./konvertoje/theme";
import { Navbar }      from "./konvertoje/Navbar";
import { Footer } from "./konvertoje/Footer";
import { HomePage } from "./konvertoje/HomePage";
import { ConvertPage } from "./konvertoje/ConvertPage";
import { AboutPage } from "./konvertoje/AboutPage";

type Page = "home" | "convert" | "about";

export default function Root() {
  const [page,  setPage]  = useState<Page>("home");
  const [theme, setTheme] = useState<Theme>("dark");

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem("kv-theme") as Theme | null;
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const handleTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("kv-theme", t);
  };

  return (
    <>
      {/* ── Global styles + CSS variables ───────────────────────── */}
      <style>{`
        ${GLOBAL_CSS}
        :root { ${THEME_VARS[theme]} }
      `}</style>

      {/* ── Shell ───────────────────────────────────────────────── */}
      <Navbar page={page} setPage={setPage} theme={theme} setTheme={handleTheme} />

      <main key={page}>
        {page === "home"    && <HomePage    setPage={setPage} theme={theme} />}
        {page === "convert" && <ConvertPage theme={theme} />}
        {page === "about"   && <AboutPage   setPage={setPage} theme={theme} />}
      </main>

      <Footer setPage={setPage} />
    </>
  );
}