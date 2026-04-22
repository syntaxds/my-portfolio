import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PHOTO_CSS = `
:root {
  --bg: #f4f4f3; --surface: #ececea; --surface-2: #e3e3e0;
  --line: #c9c9c5;
  --ink: #0a0a0a; --ink-2: #2b2b2b;
  --muted: #6a6a67; --muted-2: #8a8a86;
  --grid: rgba(10,10,10,0.035);
}
html[data-theme="dark"] {
  --bg: #0c0c0d; --surface: #151517; --surface-2: #1d1d20;
  --line: #2a2a2d;
  --ink: #e9e9e6; --ink-2: #c4c4c0;
  --muted: #8a8a86; --muted-2: #5a5a57;
  --grid: rgba(233,233,230,0.04);
}
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap');
html, body { background: var(--bg); color: var(--ink); }
body.photo-body {
  font-family: 'Inter', system-ui, sans-serif;
  transition: background .35s ease, color .35s ease;
}
.photo-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.photo-grid-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 30%, black 30%, transparent 85%);
}

/* Nav */
nav.photo-top { position: fixed; top: 0; left: 0; right: 0; z-index: 50; backdrop-filter: blur(12px); background: color-mix(in oklab, var(--bg) 78%, transparent); border-bottom: 1px solid var(--line); }
.photo-nav-inner { max-width: 1400px; margin: 0 auto; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.photo-brand { display: flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono',monospace; font-weight: 600; font-size: 13px; letter-spacing: .02em; }
.photo-brand .dot-live { width: 7px; height: 7px; background: #19d27a; border-radius: 50%; box-shadow: 0 0 0 3px color-mix(in oklab, #19d27a 30%, transparent); animation: photo-pulse 2s infinite; }
@keyframes photo-pulse { 50% { opacity: .5; } }
.photo-nav-right { display: flex; align-items: center; gap: 10px; font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); }
.photo-back { font-family:'JetBrains Mono',monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; padding: 7px 12px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); text-decoration: none; cursor: pointer; transition: transform .15s ease, background .15s ease; }
.photo-back:hover { background: var(--surface-2); transform: translate(-1px,-1px); box-shadow: 2px 2px 0 var(--ink); }
.photo-theme-toggle { display: inline-flex; align-items: center; gap: 8px; font-family:'JetBrains Mono',monospace; font-size: 11px; background: var(--ink); color: var(--bg); border: 1px solid var(--ink); padding: 7px 12px; cursor: pointer; text-transform: uppercase; letter-spacing: .08em; transition: transform .15s ease; }
.photo-theme-toggle:hover { transform: translate(-1px,-1px); box-shadow: 3px 3px 0 var(--ink); }
.photo-theme-toggle svg { width: 12px; height: 12px; }

/* Hero */
main.photo-main { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; padding: 140px 28px 80px; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; }
.photo-top-row { display: grid; grid-template-columns: 1fr auto; align-items: start; gap: 40px; padding-bottom: 40px; border-bottom: 1px solid var(--line); }
.photo-label { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: .12em; }
.photo-coords { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-align: right; line-height: 1.7; }
.photo-coords b { color: var(--ink); font-weight: 500; }

.photo-type { font-family:'JetBrains Mono',monospace; font-weight: 800; font-size: clamp(64px, 14vw, 220px); line-height: .86; letter-spacing: -.05em; margin-top: 40px; text-transform: uppercase; }
.photo-type .slash { color: var(--muted-2); font-weight: 400; }
.photo-type .outline { -webkit-text-stroke: 2px var(--ink); color: transparent; }

.photo-bottom { margin-top: 60px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: end; border-top: 1px solid var(--line); padding-top: 32px; }
.photo-tagline { font-size: 20px; line-height: 1.35; max-width: 520px; color: var(--ink-2); }
.photo-tagline .em { color: var(--ink); }
.photo-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
.photo-btn { font-family:'JetBrains Mono',monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; font-weight: 500; padding: 14px 20px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s ease; text-decoration: none; border: 1px solid var(--ink); }
.photo-btn-primary { background: var(--ink); color: var(--bg); }
.photo-btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ink); }
.photo-btn-ghost { background: transparent; color: var(--ink); }
.photo-btn-ghost:hover { background: var(--ink); color: var(--bg); }

.photo-footer { margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; font-family:'JetBrains Mono',monospace; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }

@media (max-width: 720px) {
  .photo-top-row { grid-template-columns: 1fr; }
  .photo-coords { text-align: left; }
  .photo-bottom { grid-template-columns: 1fr; }
  .photo-actions { justify-content: flex-start; }
  main.photo-main { padding: 120px 20px 60px; }
  .photo-nav-inner { padding: 14px 16px; }
}
`;

function PhotographyPortfolio() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.add('photo-body');
    return () => document.body.classList.remove('photo-body');
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <>
      <style>{PHOTO_CSS}</style>
      <div className="photo-grid-bg" />

      <nav className="photo-top">
        <div className="photo-nav-inner">
          <div className="photo-brand">
            <span className="dot-live" />
            <span>DERRYL / PHOTOGRAPHY</span>
          </div>
          <div className="photo-nav-right">
            <Link to="/" className="photo-back">← BACK</Link>
            <button className="photo-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? 'DARK' : 'LIGHT'}
            </button>
          </div>
        </div>
      </nav>

      <main className="photo-main">
        <div>
          <div className="photo-top-row">
            <div>
              <div className="photo-label">PHOTOGRAPHY / 2026</div>
              <div className="photo-label" style={{ marginTop: 6 }}>COLLECTION · RTMNS-RAW</div>
            </div>
            <div className="photo-coords">
              <div><b>LAT</b> -6.2088°</div>
              <div><b>LON</b> 106.8456°</div>
              <div><b>REF</b> JAKARTA / ID</div>
            </div>
          </div>

          <h1 className="photo-type">
            RTMNS<span className="slash">—</span><span className="outline">RAW</span>
          </h1>

          <div className="photo-bottom">
            <p className="photo-tagline">
              A visual log — <span className="em">unfiltered frames</span>, street moments, and long exposures.
              Pick a format below to browse the full set.
            </p>
            <div className="photo-actions">
              <a
                href="/ds-photography_portfolio.pdf"
                download="Derryl_Sipahutar_Photography_Portfolio.pdf"
                className="photo-btn photo-btn-primary"
              >
                ↓ DOWNLOAD PDF
              </a>
              <a
                href="/ds-photography_portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="photo-btn photo-btn-ghost"
              >
                ↗ VIEW IN NEW TAB
              </a>
            </div>
          </div>
        </div>

        <footer className="photo-footer">
          <span>© {new Date().getFullYear()} DERRYL SIPAHUTAR</span>
          <span>PDF · 12 MB · 24 FRAMES</span>
        </footer>
      </main>
    </>
  );
}

export default PhotographyPortfolio;
