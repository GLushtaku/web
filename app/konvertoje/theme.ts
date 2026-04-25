export type Theme = "dark" | "light";

export const THEME_VARS: Record<Theme, string> = {
  dark: `
    --bg:       #08080f;
    --surface:  #0e0e1c;
    --card:     #131325;
    --card2:    #1a1a30;
    --border:   #252540;
    --border2:  #30305a;
    --text:     #f0f0f8;
    --text2:    #c8c8e0;
    --muted:    #9090b8;
    --accent:   #6c63ff;
    --accent2:  #34d9a5;
    --danger:   #e8534a;
    --shadow:   rgba(0,0,0,0.55);
    --nav-bg:   rgba(8,8,15,0.90);
  `,
  light: `
    --bg:       #f2f2f8;
    --surface:  #ffffff;
    --card:     #ffffff;
    --card2:    #eeeef8;
    --border:   #dcdcee;
    --border2:  #c8c8e0;
    --text:     #0e0e28;
    --text2:    #38386a;
    --muted:    #6868a0;
    --accent:   #5b52f5;
    --accent2:  #1cb88a;
    --danger:   #d63b33;
    --shadow:   rgba(0,0,0,0.07);
    --nav-bg:   rgba(242,242,248,0.92);
  `,
};

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,700;1,9..144,800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    transition: background .3s, color .3s;
  }

  :root {
    --font-display: 'Fraunces', serif;
    --font-body:    'Plus Jakarta Sans', sans-serif;
    --radius-sm:  8px;
    --radius-md:  14px;
    --radius-lg:  20px;
    --radius-xl:  28px;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 100px; }

  /* ── Keyframes ── */
  @keyframes drift {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(28px, 20px) scale(1.07); }
  }
  @keyframes pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.3; transform:scale(.55); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:none; }
  }
  @keyframes shimmer {
    from { background-position: -200% 0; }
    to   { background-position: 200% 0; }
  }

  /* ── Page enter ── */
  .page-enter { animation: fadeUp .38s ease both; }

  /* ── Responsive utilities ── */
  .hide-mobile { display: flex; }
  .show-mobile { display: none; }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .conv-grid   { grid-template-columns: repeat(2,1fr) !important; }
  }

/* ── Hero buttons — mobile ── */
  @media (max-width: 520px) {
    .hero-btns {
      flex-direction: column !important;
      align-items: center !important;
      width: 100%;
    }
    .hero-btns button {
      width: 260px !important;
    }
  }
`;
