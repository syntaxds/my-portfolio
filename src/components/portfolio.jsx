import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import profileImage from '../images/profile-picture.png';
import Project1Image from '../images/pmj.png';
import Project2Image from '../images/Project2.png';
import Project3Image from '../images/pmj.png';
import Project4Image from '../images/Project4.png';
import Project5Image from '../images/Project5.png';
import Project6Image from '../images/iVolks.png';
import Project7Image from '../images/padiumkm.png';

/* =========================================================================
   Portfolio — Brutalist Tech Redesign
   - Monochromatic zinc/graphite + black
   - JetBrains Mono display + Inter body
   - Light (default) + Dark theme (persisted in localStorage)
   - Crosshair cursor, ASCII dividers, numbered sections
   - Reveal on scroll, scroll-spy nav
   ========================================================================= */

const SECTIONS = [
  { id: 'hero',       num: '00', label: 'INDEX' },
  { id: 'about',      num: '01', label: 'PROFILE' },
  { id: 'experience', num: '02', label: 'WORK' },
  { id: 'now',        num: '03', label: 'NOW' },
  { id: 'projects',   num: '04', label: 'ARCHIVE' },
  { id: 'contact',    num: '05', label: 'CONTACT' },
];

const SKILLS = [
  { name: 'Go',             cat: 'Backend',   level: 4 },
  { name: 'React',          cat: 'Frontend',  level: 5 },
  { name: 'Node.js',        cat: 'Backend',   level: 4 },
  { name: 'Express',        cat: 'Backend',   level: 4 },
  { name: 'Python',         cat: 'Scripting', level: 4 },
  { name: 'PHP',            cat: 'Backend',   level: 3 },
  { name: 'Java',           cat: 'Languages', level: 3 },
  { name: 'JavaScript',     cat: 'Languages', level: 5 },
  { name: 'HTML / CSS',     cat: 'Frontend',  level: 5 },
  { name: 'Tailwind',       cat: 'Frontend',  level: 5 },
  { name: 'MySQL',          cat: 'Database',  level: 4 },
  { name: 'Android Studio', cat: 'Mobile',    level: 3 },
  { name: 'Linux',          cat: 'Systems',   level: 4 },
  { name: 'Burp Suite',     cat: 'Security',  level: 4 },
  { name: 'Wireshark',      cat: 'Security',  level: 4 },
  { name: 'NetworkMiner',   cat: 'Security',  level: 3 },
  { name: 'OSINT',          cat: 'Security',  level: 4 },
];

const EXPERIENCE = [
  {
    year: '2026 — NOW', tag: 'ACTIVE',
    title: 'Backend Engineer',
    company: 'PT Telekomunikasi Indonesia Tbk. (Telkom DBT)',
    desc: 'Shipping Go-based microservices for the PadiUMKM marketplace. Recent work: patching SQL-injection findings from VAPT, and building the CT Ekraf feature — BigQuery-backed endpoints powering creative-economy insights.',
    stack: ['Go', 'BigQuery', 'MySQL', 'DevOps'],
    meta: ['JAKARTA / ID', 'INTERNSHIP · ONSITE'],
  },
  {
    year: '2025 — 2026',
    title: 'Web Developer',
    company: 'PT Sinergi Imaji Ekspresi (iVolks Creative)',
    desc: 'Developing and maintaining the company\'s website using Next.js and modern web technologies.',
    stack: ['Next.js'],
    meta: ['JAKARTA / ID', 'INTERNSHIP · HYBRID'],
  },
  {
    year: '2024 — 2025',
    title: 'Web Developer',
    company: 'PT Padas Mustapa Jaya',
    desc: 'Built and maintained the company website using React, ensuring a responsive design and seamless user experience.',
    stack: ['React'],
    meta: ['BEKASI / ID', 'INTERNSHIP · ONSITE'],
  },
  {
    year: '2025',
    title: 'Threat Actor Profiling',
    company: 'President University × KEMHAN RI (MINISTRY OF DEFENSE)',
    desc: 'Collaborative project profiling active hackers and cybercrime groups operating between 2023–2025. Collected, classified, and correlated threat-actor data by digital behavior, attack vector, tooling, and motivation.',
    stack: ['OSINT', 'Analysis', 'Reporting'],
    meta: ['JAKARTA · ID', 'RESEARCH PROJECT · HYBRID'],
  },
];

const NOW = [
  { label: 'INTERNSHIP',  title: 'BACKEND DEV at PT TELEKOMUNIKASI INDONESIA Tbk.',     body: '.', meta: ['GO · BIGQUERY', '2026'] },
  { label: 'PROJECT', title: 'Capstone — IoT + AI',    body: 'Excavator fuel monitoring & GPS tracking. Tightening device auth and running red-team scenarios on our own stack.',   meta: ['FINAL YEAR', 'ACTIVE'] },
];

const PROJECTS = [
  { title: 'IoT - AI Based Secure Fuel Monitoring',         tags: ['React',''], year: '2026', img: Project1Image, link: '#' },
  { title: 'PaDi UMKM Control Tower',                tags: ['Go','BigQuery','MySQL'],            year: '2026', img: Project7Image, link: 'https://padiumkm.id' },
  { title: 'PT Padas Mustapa Jaya Website',         tags: ['React','JS'],            year: '2025', img: Project3Image, link: 'https://pmjsystem.com' },
  { title: 'iVolks Creative Website',         tags: ['Next JS','JS'],            year: '2025', img: Project6Image, link: 'https://ivolkscreative.com' },
  { title: 'Threat Actor Profiling with KEMHAN RI',    tags: ['OSINT','Analysis'],                year: '2025', img: Project4Image, link: 'https://docs.google.com/document/d/14NzhsxhN3Z-jV5jERSXlbzUB5P7D8-RsjPyFD7lj98k/edit' },
  { title: 'Capture The Flag',           tags: ['Linux','Forensics','Web Exploitation'],         year: '2024', img: Project5Image, link: 'https://docs.google.com/document/d/18OVeJPxpFgJ4k-kyI1nG0LeqVFjiWb6D2mBmjwvsofM/edit' },
  { title: 'Risk Assessment Dashboard · NIST 800',         tags: ['Flask','MySQL','VirusTotal'],      year: '2024', img: Project2Image, link: 'https://github.com/vikoadrian32/riskassessmentproject' }
];

/* ------------------ STYLES (inline via <style> tag) ------------------ */
const GLOBAL_CSS = `
:root {
  --bg: #f4f4f3; --surface: #ececea; --surface-2: #e3e3e0;
  --line: #c9c9c5; --line-2: #1a1a1a;
  --ink: #0a0a0a; --ink-2: #2b2b2b;
  --muted: #6a6a67; --muted-2: #8a8a86;
  --grid: rgba(10,10,10,0.035);
}
html[data-theme="dark"] {
  --bg: #0c0c0d; --surface: #151517; --surface-2: #1d1d20;
  --line: #2a2a2d; --line-2: #e9e9e6;
  --ink: #e9e9e6; --ink-2: #c4c4c0;
  --muted: #8a8a86; --muted-2: #5a5a57;
  --grid: rgba(233,233,230,0.04);
}
html, body { background: var(--bg); color: var(--ink); }
body.pf-body {
  font-family: 'Inter', system-ui, sans-serif;
  transition: background .35s ease, color .35s ease;
}
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap');
.pf-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.pf-grid-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 30%, black 30%, transparent 85%);
}
nav.pf-top { position: fixed; top: 0; left: 0; right: 0; z-index: 50; backdrop-filter: blur(12px); background: color-mix(in oklab, var(--bg) 78%, transparent); border-bottom: 1px solid var(--line); }
.pf-nav-inner { max-width: 1400px; margin: 0 auto; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.pf-brand { display: flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono',monospace; font-weight: 600; font-size: 13px; letter-spacing: .02em; }
.pf-brand .dot-live { width: 7px; height: 7px; background: #19d27a; border-radius: 50%; box-shadow: 0 0 0 3px color-mix(in oklab, #19d27a 30%, transparent); animation: pf-pulse 2s infinite; }
@keyframes pf-pulse { 50% { opacity: .5; } }
.pf-nav-links { display: flex; gap: 2px; }
.pf-nav-links button { font-family:'JetBrains Mono',monospace; font-size: 12px; letter-spacing: .04em; background: transparent; color: var(--muted); border: 0; padding: 8px 14px; cursor: pointer; text-transform: uppercase; font-weight: 500; transition: color .2s, background .2s; }
.pf-nav-links button:hover { color: var(--ink); background: var(--surface); }
.pf-nav-links button.active { color: var(--ink); background: var(--surface-2); }
.pf-nav-links button span.num { color: var(--muted-2); margin-right: 6px; font-weight: 400; }
.pf-nav-right { display: flex; align-items: center; gap: 10px; font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); }
.pf-clock { padding: 6px 10px; border: 1px solid var(--line); background: var(--surface); }
.pf-theme-toggle { display: inline-flex; align-items: center; gap: 8px; font-family:'JetBrains Mono',monospace; font-size: 11px; background: var(--ink); color: var(--bg); border: 1px solid var(--ink); padding: 7px 12px; cursor: pointer; text-transform: uppercase; letter-spacing: .08em; transition: transform .15s ease; }
.pf-theme-toggle:hover { transform: translate(-1px,-1px); box-shadow: 3px 3px 0 var(--ink); }
.pf-theme-toggle svg { width: 12px; height: 12px; }
section.pf-section { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; padding: 120px 28px; scroll-margin-top: 70px; }
.pf-sec-head { display: flex; align-items: flex-end; justify-content: space-between; border-top: 1px solid var(--ink); padding-top: 16px; margin-bottom: 60px; gap: 24px; flex-wrap: wrap; }
.pf-sec-num { font-family:'JetBrains Mono',monospace; font-size: 12px; color: var(--muted); letter-spacing: .08em; }
.pf-sec-title { font-family:'JetBrains Mono',monospace; font-weight: 700; font-size: clamp(36px,5vw,72px); line-height: .95; letter-spacing: -.02em; text-transform: uppercase; }
.pf-sec-meta { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-align: right; text-transform: uppercase; letter-spacing: .06em; }
.pf-ascii { font-family:'JetBrains Mono',monospace; font-size: 10px; color: var(--muted-2); white-space: pre; overflow: hidden; text-align: center; padding: 40px 0; letter-spacing: -.5px; user-select: none; }
#hero { padding-top: 140px; padding-bottom: 60px; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; }
.pf-hero-top { display: grid; grid-template-columns: 1fr auto; align-items: start; gap: 40px; padding-bottom: 40px; border-bottom: 1px solid var(--line); }
.pf-hero-label { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: .12em; }
.pf-hero-coords { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-align: right; line-height: 1.7; }
.pf-hero-coords b { color: var(--ink); font-weight: 500; }
.pf-hero-type { font-family:'JetBrains Mono',monospace; font-weight: 800; font-size: clamp(64px,14vw,220px); line-height: .86; letter-spacing: -.05em; margin-top: 40px; text-transform: uppercase; }
.pf-hero-type .slash { color: var(--muted-2); font-weight: 400; }
.pf-hero-type .outline { -webkit-text-stroke: 2px var(--ink); color: transparent; }
.pf-hero-type .blink::after { content: "_"; color: var(--ink); animation: pf-blink 1s steps(1) infinite; }
@keyframes pf-blink { 50% { opacity: 0; } }
.pf-hero-ascii { font-family:'JetBrains Mono',monospace; font-size: 10px; line-height: 1.15; color: var(--muted-2); white-space: pre; margin-top: 20px; user-select: none; }
.pf-hero-bottom { margin-top: 60px; display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 40px; align-items: end; border-top: 1px solid var(--line); padding-top: 32px; }
.pf-hero-tagline { font-size: 20px; line-height: 1.35; max-width: 500px; color: var(--ink-2); }
.pf-hero-tagline .em { color: var(--ink); }
.pf-hero-stat { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-transform: uppercase; }
.pf-hero-stat b { display: block; font-size: 32px; color: var(--ink); font-weight: 700; margin-top: 6px; letter-spacing: -.02em; }
.pf-hero-actions { display: flex; gap: 12px; margin-top: 16px; }
.pf-btn { font-family:'JetBrains Mono',monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; font-weight: 500; padding: 14px 20px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s ease; text-decoration: none; border: 1px solid var(--ink); }
.pf-btn-primary { background: var(--ink); color: var(--bg); }
.pf-btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ink); }
.pf-btn-ghost { background: transparent; color: var(--ink); }
.pf-btn-ghost:hover { background: var(--ink); color: var(--bg); }
.pf-about-grid { display: grid; grid-template-columns: 320px 1fr; gap: 80px; align-items: start; }
.pf-about-photo-wrap { position: sticky; top: 100px; }
.pf-about-photo { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; border: 1px solid var(--ink); contrast(1.05); }
.pf-about-photo-caption { font-family:'JetBrains Mono',monospace; font-size: 10px; color: var(--muted); margin-top: 12px; display: flex; justify-content: space-between; text-transform: uppercase; letter-spacing: .05em; }
.pf-about-text h3 { font-family:'JetBrains Mono',monospace; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 16px; color: var(--muted); }
.pf-about-text p { font-size: 20px; line-height: 1.5; margin-bottom: 20px; color: var(--ink-2); max-width: 62ch; }
.pf-about-text p .em { color: var(--ink); border-bottom: 1px solid var(--ink); padding-bottom: 2px; }
.pf-skills-table { margin-top: 60px; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); width: 100%; }
.pf-skills-head, .pf-skill-row { display: grid; grid-template-columns: 60px 1fr 120px 120px; font-family:'JetBrains Mono',monospace; font-size: 12px; }
.pf-skills-head { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; padding: 12px 0; border-bottom: 1px solid var(--line); }
.pf-skill-row { padding: 16px 0; border-bottom: 1px solid var(--line); align-items: center; transition: background .15s ease, padding .15s ease; }
.pf-skill-row:last-child { border-bottom: 0; }
.pf-skill-row:hover { background: var(--surface); padding-left: 16px; padding-right: 16px; }
.pf-skill-row .k { color: var(--muted); }
.pf-skill-row .name { font-weight: 600; color: var(--ink); text-transform: uppercase; letter-spacing: .02em; font-size: 14px; }
.pf-skill-row .cat { color: var(--muted); text-transform: uppercase; font-size: 10px; letter-spacing: .08em; }
.pf-skill-row .level { display: flex; gap: 3px; justify-content: flex-end; }
.pf-skill-row .level i { width: 12px; height: 4px; background: var(--line); }
.pf-skill-row .level i.on { background: var(--ink); }
.pf-exp-row { display: grid; grid-template-columns: 120px 1fr 220px; gap: 40px; padding: 32px 0; border-top: 1px solid var(--line); align-items: start; position: relative; transition: padding .2s ease; }
.pf-exp-row:first-child { border-top: 1px solid var(--ink); }
.pf-exp-row:hover { padding-left: 20px; }
.pf-exp-year { font-family:'JetBrains Mono',monospace; font-size: 13px; color: var(--muted); font-weight: 500; }
.pf-exp-year .tag { display: inline-block; padding: 2px 8px; font-size: 9px; background: var(--ink); color: var(--bg); margin-top: 8px; letter-spacing: .1em; }
.pf-exp-body h3 { font-family:'JetBrains Mono',monospace; font-size: 22px; font-weight: 700; margin-bottom: 4px; letter-spacing: -.01em; }
.pf-exp-body .company { font-family:'JetBrains Mono',monospace; font-size: 12px; color: var(--muted); margin-bottom: 14px; text-transform: uppercase; letter-spacing: .06em; }
.pf-exp-body p { font-size: 15px; line-height: 1.55; color: var(--ink-2); max-width: 55ch; }
.pf-exp-body .stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.pf-exp-body .stack span { font-family:'JetBrains Mono',monospace; font-size: 10px; padding: 3px 8px; border: 1px solid var(--line); color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }
.pf-exp-meta { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; text-align: right; line-height: 1.7; }
.pf-now-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 0; border: 1px solid var(--ink); align-items: stretch; }
.pf-now-card { padding: 32px; border-right: 1px solid var(--line); position: relative; transition: background .2s ease; display: flex; flex-direction: column; min-height: 280px; }
.pf-now-card:last-child { border-right: 0; }
.pf-now-card:hover { background: var(--surface); }
.pf-now-label { font-family:'JetBrains Mono',monospace; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .12em; display: flex; align-items: center; gap: 8px; }
.pf-now-label .live-dot { width: 6px; height: 6px; background: #19d27a; border-radius: 50%; animation: pf-pulse 2s infinite; }
.pf-now-card h4 { font-family:'JetBrains Mono',monospace; font-size: 17px; font-weight: 700; margin: 16px 0 12px; letter-spacing: -.01em; line-height: 1.3; min-height: 2.6em; }
.pf-now-card p { font-size: 14px; line-height: 1.55; color: var(--ink-2); flex: 1; }
.pf-now-card .meta { margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--line); font-family:'JetBrains Mono',monospace; font-size: 10px; color: var(--muted); display: flex; justify-content: space-between; text-transform: uppercase; letter-spacing: .06em; }
.pf-proj-list { border-top: 1px solid var(--ink); }
.pf-proj-row { display: grid; grid-template-columns: 60px 1fr 120px 40px; gap: 32px; align-items: center; padding: 24px 0; border-bottom: 1px solid var(--line); position: relative; cursor: pointer; transition: padding .25s ease, background .25s ease; text-decoration: none; color: var(--ink); }
.pf-proj-row:hover { padding-left: 20px; padding-right: 20px; background: var(--surface); }
.pf-proj-row:hover .pf-proj-preview { opacity: 1; }
.pf-proj-k { font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); }
.pf-proj-title { font-family:'JetBrains Mono',monospace; font-size: clamp(20px,2.4vw,32px); font-weight: 700; text-transform: uppercase; letter-spacing: -.01em; }
.pf-proj-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
.pf-proj-tags span { font-family:'JetBrains Mono',monospace; font-size: 9px; padding: 2px 6px; background: var(--surface-2); color: var(--muted); text-transform: uppercase; letter-spacing: .05em; }
.pf-proj-year { font-family:'JetBrains Mono',monospace; font-size: 12px; color: var(--muted); text-align: right; }
.pf-proj-arrow { font-family:'JetBrains Mono',monospace; font-size: 18px; color: var(--muted); text-align: right; transition: transform .25s ease, color .25s ease; }
.pf-proj-row:hover .pf-proj-arrow { transform: translateX(6px); color: var(--ink); }
.pf-proj-preview { position: absolute; top: 50%; left: 60%; transform: translateY(-50%) rotate(-3deg); width: 280px; aspect-ratio: 16/10; object-fit: cover; border: 1px solid var(--ink); pointer-events: none; opacity: 0; transition: opacity .3s ease; z-index: 5; box-shadow: 10px 10px 0 var(--ink); }
.pf-contact-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; }
.pf-contact-big { font-family:'JetBrains Mono',monospace; font-weight: 700; font-size: clamp(36px,5vw,64px); line-height: .95; letter-spacing: -.03em; text-transform: uppercase; margin-bottom: 24px; }
.pf-contact-big .outline { -webkit-text-stroke: 2px var(--ink); color: transparent; }
.pf-contact-email { font-family:'JetBrains Mono',monospace; font-size: 20px; display: inline-flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--ink); padding-bottom: 6px; text-decoration: none; color: var(--ink); }
.pf-contact-email:hover { background: var(--ink); color: var(--bg); padding: 6px 10px; }
.pf-contact-links { margin-top: 40px; display: flex; flex-direction: column; gap: 0; border-top: 1px solid var(--ink); }
.pf-contact-link-row { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; border-bottom: 1px solid var(--line); font-family:'JetBrains Mono',monospace; font-size: 13px; text-decoration: none; color: var(--ink); transition: padding .2s ease; }
.pf-contact-link-row:hover { padding-left: 12px; padding-right: 12px; background: var(--surface); }
.pf-contact-link-row .k { color: var(--muted); text-transform: uppercase; font-size: 10px; letter-spacing: .1em; }
.pf-contact-form { border: 1px solid var(--ink); padding: 32px; background: var(--surface); }
.pf-form-label { display: block; font-family:'JetBrains Mono',monospace; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: .12em; margin-bottom: 8px; }
.pf-form-field { width: 100%; padding: 12px 0; background: transparent; border: 0; border-bottom: 1px solid var(--line); color: var(--ink); font-family:'Inter', sans-serif; font-size: 15px; margin-bottom: 24px; outline: none; transition: border-color .2s ease; }
.pf-form-field:focus { border-bottom-color: var(--ink); }
textarea.pf-form-field { resize: none; min-height: 100px; }
.pf-form-submit { width: 100%; background: var(--ink); color: var(--bg); border: 0; padding: 14px; font-family:'JetBrains Mono',monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .12em; cursor: pointer; transition: transform .15s ease; font-weight: 600; }
.pf-form-submit:hover { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--line-2); }
footer.pf-footer { border-top: 1px solid var(--ink); padding: 40px 28px; max-width: 1400px; margin: 60px auto 0; position: relative; z-index: 1; }
.pf-footer-inner { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; font-family:'JetBrains Mono',monospace; font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
.pf-reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.pf-reveal.in { opacity: 1; transform: translateY(0); }
::selection { background: var(--ink); color: var(--bg); }
@media (max-width: 900px) {
  section.pf-section { padding: 80px 20px; }
  .pf-about-grid { grid-template-columns: 1fr; gap: 40px; }
  .pf-about-photo-wrap { position: static; max-width: 280px; }
  .pf-hero-top { grid-template-columns: 1fr; }
  .pf-hero-coords { text-align: left; }
  .pf-hero-bottom { grid-template-columns: 1fr; gap: 28px; }
  .pf-now-grid { grid-template-columns: 1fr; }
  .pf-now-card { border-right: 0; border-bottom: 1px solid var(--line); }
  .pf-now-card:last-child { border-bottom: 0; }
  .pf-exp-row { grid-template-columns: 1fr; gap: 12px; }
  .pf-exp-meta { text-align: left; }
  .pf-contact-grid { grid-template-columns: 1fr; gap: 40px; }
  .pf-proj-row { grid-template-columns: 40px 1fr 30px; }
  .pf-proj-year { display: none; }
  .pf-proj-preview { display: none; }
  .pf-skills-head, .pf-skill-row { grid-template-columns: 40px 1fr 80px; }
  .pf-skill-row .cat { display: none; }
  .pf-nav-links { display: none; }
  .pf-clock { display: none; }
  .pf-nav-inner { padding: 12px 16px; }
}
`;

/* ------------------ HOOKS ------------------ */
function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))];
}

function useClock() {
  const [t, setT] = useState('--:--:--');
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.pf-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids.join('|')]);
  return active;
}

/* ------------------ CONTACT FORM ------------------ */
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setSending(true); setStatus(''); setErr('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '954b12a1-2be8-4362-8222-c8b5d0c8fdd9',
          subject: `Portfolio contact — ${form.name}`,
          from_name: form.name,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else { setStatus('error'); setErr(data.message || `Error: ${res.status}`); }
    } catch {
      setStatus('error'); setErr('Network error — please email me instead.');
    } finally {
      setSending(false);
      setTimeout(() => { setStatus(''); setErr(''); }, 5000);
    }
  };

  return (
    <form className="pf-contact-form pf-reveal" onSubmit={submit}>
      <label className="pf-form-label" htmlFor="cf-name">/ NAME</label>
      <input className="pf-form-field" id="cf-name" type="text" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} required disabled={sending}/>

      <label className="pf-form-label" htmlFor="cf-email">/ EMAIL</label>
      <input className="pf-form-field" id="cf-email" type="email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} required disabled={sending}/>

      <label className="pf-form-label" htmlFor="cf-msg">/ MESSAGE</label>
      <textarea className="pf-form-field" id="cf-msg" rows="4" value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })} required disabled={sending}/>

      <button className="pf-form-submit" type="submit" disabled={sending}>
        {sending ? 'TRANSMITTING…' : 'TRANSMIT →'}
      </button>

      {status === 'success' && <p className="pf-mono" style={{ marginTop: 16, fontSize: 11, color: '#19d27a' }}>✓ MESSAGE SENT — WILL REPLY SOON</p>}
      {status === 'error'   && <p className="pf-mono" style={{ marginTop: 16, fontSize: 11, color: '#d2195a' }}>✗ {err}</p>}
    </form>
  );
};

/* ------------------ MAIN ------------------ */
const Portfolio = () => {
  const [theme, toggleTheme] = useTheme();
  const clock = useClock();
  useReveal();
  const active = useScrollSpy(SECTIONS.map(s => s.id));

  useEffect(() => {
    document.body.classList.add('pf-body');
    return () => document.body.classList.remove('pf-body');
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };

  const onProjMove = (e) => {
    const row = e.currentTarget;
    const rect = row.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const img = row.querySelector('.pf-proj-preview');
    if (!img) return;
    img.style.left = Math.min(Math.max(x, 180), rect.width - 160) + 'px';
    img.style.transform = `translate(-50%, -50%) rotate(${(x / rect.width - 0.5) * -8}deg)`;
    img.style.top = '50%';
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div className="pf-grid-bg"/>

      {/* NAV */}
      <motion.nav className="pf-top" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <div className="pf-nav-inner">
          <div className="pf-brand">
            <span className="dot-live"/>
            <span>DERRYL.SIPAHUTAR</span>
            <span style={{ color: 'var(--muted-2)' }}>{'// v2.26'}</span>
          </div>
          <div className="pf-nav-links">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className={active === s.id ? 'active' : ''}>
                <span className="num">{s.num}</span>{s.label}
              </button>
            ))}
          </div>
          <div className="pf-nav-right">
            <div className="pf-clock pf-mono">{clock} UTC+7</div>
            <button className="pf-theme-toggle" onClick={toggleTheme}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {theme === 'dark'
                  ? <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  : <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></>}
              </svg>
              <span>{theme.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="hero" className="pf-section">
        <div className="pf-hero-top">
          <div>
            <div className="pf-hero-label">[INDEX // 00] — PORTFOLIO ’26</div>
          </div>
          <div className="pf-hero-coords pf-mono">
            <div>LAT. 06°12′S</div>
            <div>LON. 106°48′E</div>
            <div><b>JAKARTA / ID</b></div>
          </div>
        </div>

        <h1 className="pf-hero-type">
          <div>DERRYL</div>
          <div><span className="outline">SIPA</span>HUTAR<span className="slash"> /</span></div>

        </h1>

        <div className="pf-hero-bottom">
          <p className="pf-hero-tagline">
            <span className="em">Informatics student</span> at President University. I build modern, secure, and well-engineered systems — backend services, and web platforms.
          </p>
          <div className="pf-hero-stat">
            CURRENTLY <b>/ Telkom Indonesia</b>
            <div style={{ marginTop: 4, fontWeight: 400, fontSize: 10, color: 'var(--muted-2)' }}>BACKEND DEV | GO · BigQuery · MySQL</div>
          </div>
          <div>
            <div className="pf-hero-stat">SCROLL <b>↓ EXPLORE</b></div>
            <div className="pf-hero-actions">
              <a href="#about" className="pf-btn pf-btn-primary" data-link onClick={e => { e.preventDefault(); scrollTo('about'); }}>ABOUT [01]</a>
              <a href="#contact" className="pf-btn pf-btn-ghost"  data-link onClick={e => { e.preventDefault(); scrollTo('contact'); }}>CONTACT →</a>
            </div>
          </div>
        </div>
      </section>

      <div className="pf-ascii" aria-hidden="true">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

      {/* ABOUT + SKILLS */}
      <section id="about" className="pf-section">
        <div className="pf-sec-head">
          <div>
            <div className="pf-sec-num">[01 // PROFILE]</div>
            <h2 className="pf-sec-title pf-reveal">Profile<br/>+&nbsp;Stack</h2>
          </div>
          <div className="pf-sec-meta">6 SECTIONS · 17 SKILLS<br/>LAST UPDATED 2026.04.22</div>
        </div>

        <div className="pf-about-grid">
          <div className="pf-about-photo-wrap pf-reveal">
            <img className="pf-about-photo" src={profileImage} alt="Derryl Sipahutar"/>
            <div className="pf-about-photo-caption">
              <span>DERRYL</span><span>2026</span>
            </div>
          </div>

          <div className="pf-about-text pf-reveal">
            <h3>/ 01.1 · Bio</h3>
            <p>
              I'm Derryl — Final Year <span className="em">Informatics student</span> at President University. I like turning messy problems into clean, auditable code. My focus sits between <span className="em">Backend Engineering</span> and <span className="em">Cybersecurity</span>: services that behave, APIs that don't leak, and dashboards that tell you the truth.
            </p>
            <p>Two-plus years of real work across Go, PHP, Python, and Javascript. I ship, document, and stay curious.</p>

            <h3 style={{ marginTop: 40 }}>/ 01.2 · Tech Stack</h3>
            <div className="pf-skills-table">
              <div className="pf-skills-head">
                <div>IDX</div><div>TECHNOLOGY</div><div>CATEGORY</div><div style={{ textAlign: 'right' }}>DEPTH</div>
              </div>
              {SKILLS.map((s, i) => (
                <div key={s.name} className="pf-skill-row">
                  <div className="k">{String(i + 1).padStart(2, '0')}</div>
                  <div className="name">{s.name}</div>
                  <div className="cat">{s.cat}</div>
                  <div className="level">
                    {Array.from({ length: 5 }, (_, j) => <i key={j} className={j < s.level ? 'on' : ''}/>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pf-ascii" aria-hidden="true">· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·</div>

      {/* EXPERIENCE */}
      <section id="experience" className="pf-section">
        <div className="pf-sec-head">
          <div>
            <div className="pf-sec-num">[02 // WORK]</div>
            <h2 className="pf-sec-title pf-reveal">Experience<br/>Log</h2>
          </div>
          <div className="pf-sec-meta">CHRONOLOGICAL · DESC</div>
        </div>

        <div>
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="pf-exp-row pf-reveal">
              <div className="pf-exp-year">
                {e.year}{e.tag && <> <span className="tag pf-mono">{e.tag}</span></>}
              </div>
              <div className="pf-exp-body">
                <h3>{e.title}</h3>
                <div className="company">{e.company}</div>
                <p>{e.desc}</p>
                <div className="stack">{e.stack.map(s => <span key={s}>{s}</span>)}</div>
              </div>
              <div className="pf-exp-meta">{e.meta[0]}<br/>{e.meta[1]}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="pf-ascii" aria-hidden="true">╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳ ╳</div>

      {/* NOW */}
      <section id="now" className="pf-section">
        <div className="pf-sec-head">
          <div>
            <div className="pf-sec-num">[03 // NOW]</div>
            <h2 className="pf-sec-title pf-reveal">Currently</h2>
          </div>
          <div className="pf-sec-meta">NOW · UPDATED 2026.04.22</div>
        </div>

        <div className="pf-now-grid pf-reveal">
          {NOW.map(n => (
            <div key={n.title} className="pf-now-card">
              <div className="pf-now-label"><span className="live-dot"/>{n.label}</div>
              <h4>{n.title}</h4>
              <p>{n.body}</p>
              <div className="meta"><span>{n.meta[0]}</span><span>{n.meta[1]}</span></div>
            </div>
          ))}
        </div>
      </section>

      <div className="pf-ascii" aria-hidden="true">━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━╼━</div>

      {/* PROJECTS */}
      <section id="projects" className="pf-section">
        <div className="pf-sec-head">
          <div>
            <div className="pf-sec-num">[04 // ARCHIVE]</div>
            <h2 className="pf-sec-title pf-reveal">Selected<br/>Projects</h2>
          </div>
          <div className="pf-sec-meta">{PROJECTS.length} ENTRIES · 2023–2026</div>
        </div>

        <div className="pf-proj-list">
          {PROJECTS.map((p, i) => (
            <a key={i} href={p.link} target="_blank" rel="noopener noreferrer"
               className="pf-proj-row" onMouseMove={onProjMove}>
              <div className="pf-proj-k">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="pf-proj-title">{p.title}</div>
                <div className="pf-proj-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
              </div>
              <div className="pf-proj-year">{p.year}</div>
              <div className="pf-proj-arrow">→</div>
              <img className="pf-proj-preview" src={p.img} alt={p.title} loading="lazy"/>
            </a>
          ))}
        </div>
      </section>

      <div className="pf-ascii" aria-hidden="true">/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /</div>

      {/* CONTACT */}
      <section id="contact" className="pf-section">
        <div className="pf-sec-head">
          <div>
            <div className="pf-sec-num">[05 // CONTACT]</div>
            <h2 className="pf-sec-title pf-reveal">Let's<br/>Talk</h2>
          </div>
          <div className="pf-sec-meta">RESPONDS WITHIN 24H</div>
        </div>

        <div className="pf-contact-grid">
          <div className="pf-reveal">
            <div className="pf-contact-big">
              Open to <span className="outline">projects,</span> collabs, and a good<br/>conversation.
            </div>
            <a className="pf-contact-email pf-mono" href="mailto:derrylsipahutar@gmail.com">
              → derrylsipahutar@gmail.com
            </a>

            <div className="pf-contact-links">
              <a className="pf-contact-link-row" href="https://github.com/syntaxds" target="_blank" rel="noopener noreferrer">
                <span><span className="k">[01]</span> &nbsp;GITHUB</span><span>@SYNTAXDS →</span>
              </a>
              <a className="pf-contact-link-row" href="https://linkedin.com/in/derryl-sipahutar" target="_blank" rel="noopener noreferrer">
                <span><span className="k">[02]</span> &nbsp;LINKEDIN</span><span>DERRYL-SIPAHUTAR →</span>
              </a>
              <Link className="pf-contact-link-row" to="/photography">
                <span><span className="k">[03]</span> &nbsp;OTHER · PHOTOGRAPHY</span><span>VIEW →</span>
              </Link>
            </div>
          </div>

          <ContactForm/>
        </div>
      </section>

      <footer className="pf-footer">
        <div className="pf-footer-inner">
          <div></div>
          <div>© 2026 DERRYL SIPAHUTAR</div>
          <div></div>
        </div>
      </footer>
    </>
  );
};

export default Portfolio;
