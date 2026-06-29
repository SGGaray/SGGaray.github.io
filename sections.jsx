// sections.jsx v3 — accent system, a11y, reduced-motion, Formspree, profile photo, scroll indicator
const { useState, useEffect, useRef } = React;
const { RiskMatrix, ComplianceRing, AuditTrail, HexGridBg } = window.DashboardBg;
const GithubMark = window.GithubMark;

// ── Theme helpers ────────────────────────────────────────────
// Unified hex→rgb: single source of truth lives in dashboard-bg.jsx (window.accentRgb).
const hexToRgb = window.accentRgb;
const lightenAccent = (hex) => {
  const map = { '#00d4ff': '#0088bb', '#9b4dff': '#7730cc', '#00dc6e': '#009944' };
  if (map[hex]) return map[hex];
  const c = hex.replace('#', '');
  const dk = (v) => Math.max(0, parseInt(v, 16) - 55).toString(16).padStart(2, '0');
  return `#${dk(c.slice(0, 2))}${dk(c.slice(2, 4))}${dk(c.slice(4, 6))}`;
};
const la = lightenAccent;
const darkRgb = hexToRgb;
const lightRgb = (a) => hexToRgb(la(a));
const prefersReducedMotion = () =>
typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Hooks ─────────────────────────────────────────────────────────────────────
const useReveal = (threshold = 0.12) => {
  const reduced = prefersReducedMotion();
  const [vis, setVis] = useState(reduced);
  const ref = useRef(null);
  useEffect(() => {
    if (reduced) {setVis(true);return;}
    const el = ref.current;if (!el) return;
    const obs = new IntersectionObserver(([e]) => {if (e.isIntersecting) setVis(true);}, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, vis] = useReveal();
  const reduced = prefersReducedMotion();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(16px)',
      transition: reduced ? 'none' : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style
    }}>{children}</div>);

};

// ── Mountain photo placeholder ─────────────────────────────────────────────────
const MountainPhoto = () => (
  <div style={{ width:'100%', borderRadius:'12px', overflow:'hidden', aspectRatio:'4/3', position:'relative', boxShadow:'0 8px 40px rgba(0,0,0,0.18)' }}>
    <img src="cerro-sosneado.jpg" loading="lazy" alt="Vista desde la cumbre del Cerro Sosneado, Mendoza · 2025" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 40%', display:'block' }}/>
    <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'28px 16px 12px', background:'linear-gradient(transparent,rgba(2,8,16,0.72))' }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', color:'rgba(170,205,225,0.7)', letterSpacing:'1.5px' }}>Cerro Sosneado · 2025</div>
    </div>
  </div>
);


// ── GRC Dashboard bg for Projects ─────────────────────────────────────────────
const ProjectsDashboardBg = ({ accent }) => {
  const r = darkRgb(accent);
  const cell = (row, col) => {
    const s = (row + 1) * (col + 1);
    if (s <= 2) return { f: 'rgba(32,190,82,0.52)', st: 'rgba(42,210,92,0.38)' };
    if (s <= 6) return { f: 'rgba(210,185,8,0.48)', st: 'rgba(230,205,8,0.36)' };
    if (s <= 12) return { f: 'rgba(225,105,0,0.5)', st: 'rgba(245,125,0,0.38)' };
    return { f: 'rgba(205,38,38,0.52)', st: 'rgba(225,55,55,0.38)' };
  };
  const N = 5,CS = 54,GAP = 5,tot = N * (CS + GAP) - GAP;
  const bars = [{ l: 'ISO 27001', p: 82 }, { l: 'ITIL 4', p: 74 }, { l: 'COBIT 2019', p: 68 }, { l: 'SOC 2', p: 55 }];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: '52px', top: '50%', transform: 'translateY(-50%)', opacity: 0.16 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: `rgba(${r},0.45)`, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>Risk Matrix</div>
        <svg width={tot} height={tot}>{Array.from({ length: N }, (_, row) => Array.from({ length: N }, (_, col) => {const { f, st } = cell(N - 1 - row, col);return <rect key={`${row}-${col}`} x={col * (CS + GAP)} y={row * (CS + GAP)} width={CS} height={CS} rx={5} fill={f} stroke={st} strokeWidth={1} />;}))} </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>{['LOW', 'LIKELIHOOD →', 'HIGH'].map((lbl) => <span key={lbl} style={{ fontFamily: 'monospace', fontSize: '8px', color: `rgba(${r},0.26)` }}>{lbl}</span>)}</div>
      </div>
      <div style={{ position: 'absolute', left: '52px', bottom: '72px', opacity: 0.14 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: `rgba(${r},0.44)`, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Framework Compliance</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', width: '190px' }}>
          {bars.map(({ l, p }) =>
          <div key={l}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: `rgba(${r},0.4)` }}>{l}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: `rgba(${r},0.55)` }}>{p}%</span>
              </div>
              <div style={{ height: '4px', background: `rgba(${r},0.1)`, borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${p}%`, height: '100%', background: `rgba(${r},0.62)`, borderRadius: '2px' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

// ── Interactive Degree Card ─────────────────────────────────────────────────
const InteractiveDegreeCard = ({ d, accent, previewHint }) => {
  const [hov, setHov] = useState(false);
  const r = darkRgb(accent);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{ background: hov ? '#0c2035' : '#0a1829', border: `1px solid rgba(${r},${hov ? '0.35' : '0.13'})`, borderRadius: '14px', padding: '28px 30px', transition: 'background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.3s', transform: hov ? 'translateY(-3px)' : 'none', boxShadow: hov ? `0 12px 40px rgba(0,0,0,0.35), 0 0 28px rgba(${r},0.08)` : 'none', cursor: 'default', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '14px', right: '16px', fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: `rgba(${r},${hov ? 0 : 0.55})`, letterSpacing: '0.5px', transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', gap: '4px', pointerEvents: 'none' }}>
        <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M8 3v10M3 8l5 5 5-5" /></svg>{previewHint || 'hover to preview'}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: accent, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '11px', opacity: 0.65 }}>{d.type}</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '20px', color: '#daeef8', marginBottom: '6px', lineHeight: 1.3 }}>{d.title}</div>
      <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', color: '#6c97ab', marginBottom: d.period ? '4px' : '14px' }}>{d.institution}</div>
      {d.period && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: `rgba(${r},0.42)`, marginBottom: '14px', letterSpacing: '0.3px' }}>{d.period}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: `rgba(${r},0.6)`, boxShadow: `0 0 8px rgba(${r},0.4)` }} />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: `rgba(${r},0.6)` }}>{d.status}</span>
      </div>
      {d.current &&
      <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: `1px solid rgba(${r},0.09)`, display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.7 }}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
          <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '12.5px', color: '#5a8298', lineHeight: 1.5 }}>{d.current}</span>
        </div>
      }
      <div style={{ maxHeight: hov ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ borderTop: `1px solid rgba(${r},0.1)`, paddingTop: '20px', marginTop: '18px' }}>
          {d.desc && (
            <p style={{ fontFamily:"'IBM Plex Sans',sans-serif", fontSize:'13px', color:'#5a8298', lineHeight:1.7, marginBottom:'18px', whiteSpace:'pre-line' }}>{d.desc}</p>
          )}
          {d.scope && d.scope.length > 0 && (
            <div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', color:`rgba(${r},0.35)`, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'8px' }}>{d.scopeLabel || 'Alcances del título'}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                {d.scope.map(s => <span key={s} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', padding:'3px 9px', background:`rgba(${r},0.07)`, border:`1px solid rgba(${r},0.14)`, borderRadius:'4px', color:`rgba(${r},0.58)` }}>{s}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

// ── Section heading ───────────────────────────────────────────────────────────
const SectionHead = ({ label, title, accent, theme = 'dark' }) => {
  const a = theme === 'dark' ? accent : la(accent);
  const textColor = theme === 'dark' ? '#eaf6fb' : '#0d1e2e';
  return (
    <Reveal>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: a, marginBottom: '10px' }}>{label}</div>
      <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 'clamp(34px,4vw,52px)', color: textColor, marginBottom: '16px', lineHeight: 1.08, letterSpacing: '-1.6px' }}>{title}</h2>
      <div style={{ width: '48px', height: '2px', background: `linear-gradient(90deg,${a},transparent)`, marginBottom: '52px' }} />
    </Reveal>);

};


// ── Simple Degree Card ────────────────────────────────────────────────────────
const SimpleDegreeCard = ({ d, accent }) => {
  const r = darkRgb(accent);
  return (
    <div className="hcard" style={{ background:'#0a1829', border:`1px solid rgba(${r},0.13)`, borderRadius:'12px', padding:'28px 30px', height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', color:accent, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'11px', opacity:0.65 }}>{d.type}</div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'20px', color:'#daeef8', marginBottom:'6px', lineHeight:1.3 }}>{d.title}</div>
      <div style={{ fontFamily:"'IBM Plex Sans',sans-serif", fontSize:'14px', color:'#6c97ab', marginBottom: d.period ? '4px' : '14px' }}>{d.institution}</div>
      {d.period && <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'11px', color:`rgba(${r},0.42)`, marginBottom:'14px', letterSpacing:'0.3px' }}>{d.period}</div>}
      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:`rgba(${r},0.6)`, boxShadow:`0 0 8px rgba(${r},0.4)` }}/>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'11px', color:`rgba(${r},0.58)` }}>{d.status}</span>
      </div>
      {d.desc && (
        <p style={{ fontFamily:"'IBM Plex Sans',sans-serif", fontSize:'13px', color:'#5a8298', lineHeight:1.7, margin:'14px 0 0', paddingTop:'14px', borderTop:`1px solid rgba(${r},0.09)`, fontStyle: d.descItalic ? 'italic' : 'normal', whiteSpace:'pre-line', flexGrow: d.scope ? 0 : 1 }}>{d.desc}</p>
      )}
      {d.descSub && (
        <p style={{ fontFamily:"'IBM Plex Sans',sans-serif", fontSize:'12px', color:`rgba(${r},0.38)`, lineHeight:1.65, margin:'10px 0 0' }}>{d.descSub}</p>
      )}
      {d.scope && d.scope.length > 0 && (
        <div style={{ marginTop:'16px', paddingTop:'14px', borderTop:`1px solid rgba(${r},0.07)`, flexGrow:1 }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', color:`rgba(${r},0.3)`, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'8px' }}>{d.scopeLabel || 'Alcances'}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
            {d.scope.map(s => <span key={s} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', padding:'3px 9px', background:`rgba(${r},0.07)`, border:`1px solid rgba(${r},0.14)`, borderRadius:'4px', color:`rgba(${r},0.52)` }}>{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );
};

// ── HERO ──────────────────────────────────────────────────────────────────────
const GRC_LAYERS = [
{ badge: 'GOB', framework: 'COBIT 2019 · ISO 38500', controls: ['EDM01', 'EDM02'], color: '#3b82f6', rgb: '59,130,246' },
{ badge: 'MGT', framework: 'ITIL 4 · FitSM', controls: ['APO01', 'BAI01'], color: '#06b6d4', rgb: '6,182,212' },
{ badge: 'RSK', framework: 'ISO 27001', controls: ['A.5.1 Políticas SI', 'A.8.2 Clasificación'], color: '#f59e0b', rgb: '245,158,11' },
{ badge: 'CTL', framework: 'ISO 27001', controls: ['A.9.1 Acceso', 'A.12.6 Vuln.'], color: '#22c55e', rgb: '34,197,94' },
{ badge: 'CMP', framework: 'ISO 27001 · COBIT', controls: ['A.18.1 Legal', 'A.18.2 Auditoría'], color: '#a855f7', rgb: '168,85,247' }];


const GRCAssessmentPanel = ({ t, accent = '#06b6d4' }) => {
  const panelRgb = hexToRgb(accent);
  const reduced = prefersReducedMotion();
  const layers = t.hero.layers;

  const [visible, setVisible] = useState(() => reduced ? GRC_LAYERS.length : 0);
  const [typed, setTyped] = useState(() =>
  reduced ? Object.fromEntries(layers.map((l, i) => [i, l.text])) : {}
  );
  const [done, setDone] = useState(() => reduced ? GRC_LAYERS.map((_, i) => i) : []);
  const [progress, setProgress] = useState(reduced ? 100 : 0);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    const run = async () => {
      while (!cancelled) {
        setVisible(0);setTyped({});setDone([]);setProgress(0);
        await sleep(400);
        for (let i = 0; i < GRC_LAYERS.length; i++) {
          if (cancelled) return;
          setVisible(i + 1);
          await sleep(280);
          const text = layers[i].text;
          for (let j = 1; j <= text.length; j++) {
            if (cancelled) return;
            setTyped((p) => Object.assign({}, p, { [i]: text.slice(0, j) }));
            await sleep(11);
          }
          if (cancelled) return;
          setDone((p) => p.concat(i));
          setProgress(Math.round((i + 1) / GRC_LAYERS.length * 100));
          await sleep(180);
        }
        await sleep(2600);
      }
    };
    run();
    return () => {cancelled = true;};
  }, [layers]);

  return (
    <div className="hero-artifact" style={{ position: 'relative', background: 'rgba(12,24,40,0.8)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', boxShadow: '0 24px 60px rgba(0,0,0,0.45)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '13px' }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '2px', color: '#64748b', textTransform: 'uppercase' }}>{t.hero.panelTitle}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ position: 'relative', display: 'inline-flex', width: '6px', height: '6px' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', willChange: 'transform, opacity', animation: reduced ? 'none' : 'dotPulse 2s ease-in-out infinite' }} />
            <span style={{ position: 'relative', width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 7px rgba(34,197,94,0.8)' }} />
          </span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.5px', color: '#94a3b8' }}>{t.hero.panelStatus}</span>
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {GRC_LAYERS.map((Lr, i) => {
          const shown = i < visible;
          const lay = layers[i];
          const isDone = done.indexOf(i) !== -1;
          const typing = shown && !isDone;
          return (
            <div key={i} style={{ opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(12px)', transition: reduced ? 'none' : 'opacity 0.45s ease, transform 0.45s ease', background: 'rgba(' + Lr.rgb + ',0.06)', border: '1px solid rgba(' + Lr.rgb + ',0.28)', borderRadius: '9px', padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px', color: Lr.color, background: 'rgba(' + Lr.rgb + ',0.14)', border: '1px solid rgba(' + Lr.rgb + ',0.4)', borderRadius: '4px', padding: '2px 6px' }}>{Lr.badge}</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px', color: '#e2e8f0' }}>{lay.concept}</span>
                <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: 'rgba(' + Lr.rgb + ',0.85)' }}>{Lr.framework}</span>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', lineHeight: 1.5, color: '#94a3b8', minHeight: '30px' }}>
                {typed[i] || ''}
                {typing && <span style={{ display: 'inline-block', width: '6px', height: '11px', background: Lr.color, marginLeft: '2px', verticalAlign: 'middle', animation: 'blink 0.75s step-end infinite' }} />}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '7px' }}>
                {Lr.controls.map((cc) =>
                <span key={cc} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8.5px', color: '#64748b', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '3px', padding: '2px 6px' }}>{cc}</span>
                )}
                <span style={{ marginLeft: 'auto', opacity: isDone ? 1 : 0, transition: reduced ? 'none' : 'opacity 0.3s ease', fontFamily: "'JetBrains Mono',monospace", fontSize: '9.5px', fontWeight: 500, color: Lr.color }}>{lay.status}</span>
              </div>
            </div>);

        })}
      </div>

      <div style={{ marginTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8.5px', letterSpacing: '2px', color: '#64748b', textTransform: 'uppercase' }}>{t.hero.evalLabel}</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: accent }}>{progress}%</span>
        </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: progress + '%', background: accent, transition: reduced ? 'none' : 'width 0.5s ease', boxShadow: `0 0 8px rgba(${panelRgb},0.7)` }} />
        </div>
      </div>
    </div>);

};

const TICKER_ITEMS = ['COBIT 2019', 'ISO 27001', 'ITIL 4', 'ISO 38500', 'Human Risk Management', 'Gobierno de TI', 'Human Factor', 'Shadow AI', 'GRC'];
const HeroTicker = () => {
  const block = (k) =>
  <span key={k} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
      {TICKER_ITEMS.map((it, i) =>
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '2px', color: '#64748b' }}>{it}</span>
          <span style={{ color: 'rgba(6,182,212,0.4)', margin: '0 16px', fontFamily: "'JetBrains Mono',monospace", fontSize: '9px' }}>//</span>
        </span>
    )}
    </span>;

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(8,15,28,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', overflow: 'hidden', padding: '9px 0' }}
    aria-hidden="true">
      <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', willChange: 'transform', animation: prefersReducedMotion() ? 'none' : 'tickerScroll 34s linear infinite' }}>
        {block('a')}{block('b')}
      </div>
    </div>);

};

const HeroSection = ({ t, accent = '#06b6d4' }) => {
  const h = accent;
  const hRgb = hexToRgb(accent);
  const reduced = prefersReducedMotion();
  const goTo = (id) => {const el = document.getElementById(id);if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });};

  return (
    <section id="hero" data-screen-label="01 Hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#080f1c', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px', opacity: 0.02 }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 72% 62% at 50% 44%, transparent 38%, rgba(3,7,14,0.66) 100%)' }} />

      <div className="hero-grid" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1220px', margin: '0 auto', padding: '0 clamp(28px, 6vw, 72px)', paddingBottom: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
        <div className="hero-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* Availability badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '6px 14px 6px 11px', background: `rgba(${hRgb},0.05)`, border: `1px solid rgba(${hRgb},0.18)`, borderRadius: '100px', opacity: 0, animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.2s forwards' }}>
            <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px', flexShrink: 0 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', willChange: 'transform, opacity', animation: reduced ? 'none' : 'dotPulse 2s ease-in-out infinite' }} />
              <span style={{ position: 'relative', width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.8)' }} />
            </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.3px', color: '#9fc4d4' }}>{t.contact.badge}</span>
          </div>

          {/* Differentiator line */}
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: h, marginTop: '16px', opacity: 0, animation: reduced ? 'none' : 'fadeUp 0.7s ease 0.28s forwards' }}>
            {t.hero.differentiator}
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 'clamp(1.7rem, 3.3vw, 2.4rem)', lineHeight: 1.15, letterSpacing: '-0.5px', color: '#e2e8f0', margin: '26px 0 0', opacity: 0, animation: reduced ? 'none' : 'fadeUp 0.7s ease 0.34s forwards' }}>
            {t.hero.headlinePre}<span style={{ color: h }}>{t.hero.headlineHi}</span>{t.hero.headlinePost}
          </h1>

          {/* Name + title */}
          <div style={{ margin: '26px 0 0', opacity: 0, animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.5s forwards' }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, color: '#e2e8f0', fontSize: "30px" }}>{t.hero.firstName} {t.hero.lastName}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', letterSpacing: '2px', color: h, marginTop: '5px' }}>{t.hero.title}</div>
          </div>

          <div style={{ width: '36px', height: '1px', background: `linear-gradient(90deg, rgba(${hRgb},0.5), transparent)`, margin: '22px 0', opacity: 0, animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.64s forwards' }} />

          <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '0.9rem', lineHeight: 1.6, color: '#94a3b8', maxWidth: '34ch', margin: 0, opacity: 0, animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.74s forwards' }}>
            {t.hero.tagline2}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '30px', opacity: 0, animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.88s forwards' }}>
            <a href="#projects" onClick={(e) => {e.preventDefault();goTo('projects');}}
            style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 26px', background: h, color: '#041016', fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, fontSize: '0.85rem', borderRadius: '8px', textDecoration: 'none', boxShadow: `0 0 24px rgba(${hRgb},0.3)`, transition: 'all 0.2s' }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = `0 0 32px rgba(${hRgb},0.5)`;}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = '';e.currentTarget.style.boxShadow = `0 0 24px rgba(${hRgb},0.3)`;}}>
              {t.hero.cta1}
            </a>
            <a href="#contact" onClick={(e) => {e.preventDefault();goTo('contact');}}
            style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 26px', background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#e2e8f0', fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 500, fontSize: '0.85rem', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.06)';e.currentTarget.style.transform = 'translateY(-2px)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.transform = '';}}>
              {t.hero.cta2}
            </a>
          </div>
        </div>

        <GRCAssessmentPanel t={t} accent={h} />
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '48px', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0, animation: reduced ? 'none' : 'fadeIn 0.8s ease 1.4s forwards', pointerEvents: 'none' }} aria-hidden="true">
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '2.5px', color: 'rgba(148,163,184,0.38)', textTransform: 'uppercase' }}>{t.hero.scroll}</span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" style={{ animation: reduced ? 'none' : 'scrollPulse 2.2s ease-in-out infinite' }}>
          <rect x="1" y="1" width="12" height="18" rx="6" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" fill="none" />
          <rect x="6" y="5" width="2" height="5" rx="1" fill="rgba(148,163,184,0.4)" style={{ animation: reduced ? 'none' : 'scrollPulse 2.2s ease-in-out infinite' }} />
        </svg>
      </div>

      <HeroTicker />
    </section>);

};

// ── ABOUT ─────────────────────────────────────────────────────────────────────
const AboutSection = ({ t, accent }) => {
  const a = la(accent);
  const r = lightRgb(accent);
  return (
    <section id="about" data-screen-label="02 About" style={{ position: 'relative', padding: '120px 0', background: '#f7f9fb', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none', opacity: 0.4 }} />
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 2 }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '80px', alignItems: 'start' }}>
          {/* Left: bio */}
          <div>
            <SectionHead label={t.about.label} title={t.about.heading} accent={accent} theme="light" />
            {t.about.bio.map((p, i) =>
            <Reveal key={i} delay={i * 0.09}>
                <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '16px', color: '#284252', lineHeight: 1.8, marginBottom: '22px' }}>{p}</p>
              </Reveal>
            )}
            <Reveal delay={0.5}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', marginTop: '32px' }}>
                {['ISO 27001', 'COBIT 2019', 'GRC', 'Behavioral Security', 'AI Governance', 'Risk Management'].map((tag) =>
                <span key={tag} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', padding: '4px 12px', background: `rgba(${r},0.07)`, border: `1px solid rgba(${r},0.2)`, borderRadius: '4px', color: a, letterSpacing: '0.3px' }}>{tag}</span>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right: profile photo + mountain + cards */}
          <div>
            {/* Profile photo */}
            <Reveal delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '22px' }}>
                <img src="profile.jpg" alt="Sebastian Garay" loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; const fb = e.currentTarget.nextElementSibling; if (fb) fb.style.display = 'flex'; }}
                  style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: `1px solid rgba(${r},0.2)`, boxShadow: '0 4px 16px rgba(13,34,51,0.1)' }} />
                <div aria-hidden="true" style={{ display: 'none', width: '88px', height: '88px', borderRadius: '50%', marginBottom: '10px', alignItems: 'center', justifyContent: 'center', background: `rgba(${r},0.1)`, border: `1px solid rgba(${r},0.22)`, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '30px', color: a, letterSpacing: '-1px' }}>SG</div>
                <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 700, fontSize: '14px', color: '#0d2233' }}>Sebastian Garay</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.55)`, letterSpacing: '0.5px', marginTop: '3px' }}>GRC · Behavioral Security</div>
              </div>
            </Reveal>

            <Reveal delay={0.2}><MountainPhoto /></Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
              {/* B.Sc. Cyberdefense */}
              <Reveal delay={0.3}>
                <div className="hcard" style={{ background: '#ffffff', border: `1px solid rgba(${r},0.14)`, borderRadius: '10px', padding: '16px 18px', boxShadow: '0 4px 16px rgba(13,34,51,0.07)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${r},0.1)`, border: `1px solid rgba(${r},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 700, fontSize: '13px', color: '#0d2233', marginBottom: '2px', lineHeight: 1.3 }}>{t.about.highlights[0].label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.6)` }}>{t.about.highlights[0].sub}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', padding: '2px 8px', background: `rgba(${r},0.08)`, border: `1px solid rgba(${r},0.18)`, borderRadius: '3px', color: a, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>ACTIVE</span>
                  </div>
                </div>
              </Reveal>
              {/* B.Sc. Social Psychology */}
              <Reveal delay={0.38}>
                <div className="hcard" style={{ background: '#ffffff', border: `1px solid rgba(${r},0.14)`, borderRadius: '10px', padding: '16px 18px', boxShadow: '0 4px 16px rgba(13,34,51,0.07)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${r},0.08)`, border: `1px solid rgba(${r},0.16)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 700, fontSize: '13px', color: '#0d2233', marginBottom: '2px', lineHeight: 1.3 }}>{t.about.highlights[1].label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.6)` }}>{t.about.highlights[1].sub}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', padding: '2px 8px', background: `rgba(${r},0.08)`, border: `1px solid rgba(${r},0.18)`, borderRadius: '3px', color: a, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{t.about.highlights[1].badge}</span>
                  </div>
                </div>
              </Reveal>
              {/* GRC Specialist */}
              <Reveal delay={0.46}>
                <div className="hcard" style={{ background: '#ffffff', border: `1px solid rgba(${r},0.14)`, borderRadius: '10px', padding: '16px 18px', boxShadow: '0 4px 16px rgba(13,34,51,0.07)', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `rgba(${r},0.08)`, border: `1px solid rgba(${r},0.16)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><path d="M3 17l2 2 4-4" /></svg>
                  </div>
                  <div style={{ minWidth: 0, flexGrow: 1 }}>
                    <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 700, fontSize: '13px', color: '#0d2233', marginBottom: '6px' }}>{t.about.highlights[2].label}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {t.about.highlights[2].sub.split(' · ').map((f) =>
                      <span key={f} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', padding: '2px 8px', background: `rgba(${r},0.1)`, border: `1px solid rgba(${r},0.22)`, borderRadius: '3px', color: a }}>{f}</span>
                      )}
                    </div>
                    {t.about.highlights[2].note && (
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#64748b', marginTop: '8px', lineHeight: 1.6 }}>{t.about.highlights[2].note}</div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

// ── EDUCATION ─────────────────────────────────────────────────────────────────
const EducationSection = ({ t, accent }) => {
  const r = darkRgb(accent);
  return (
    <section id="education" data-screen-label="03 Education" style={{ position: 'relative', padding: '120px 0', background: '#0c1825', overflow: 'hidden' }}>
      <ComplianceRing label="ISO 27001" pct={82} accent={accent} opacity={0.14} style={{ top: '70px', right: '72px' }} />
      <RiskMatrix accent={accent} opacity={0.14} style={{ bottom: '70px', left: '52px' }} />
      <AuditTrail accent={accent} opacity={0.12} style={{ top: '160px', right: '260px' }} />
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 2 }}>
        <SectionHead label={t.education.label} title={t.education.heading} accent={accent} theme="dark" />
        {/* Cyberdefense full-width interactive, Intermediate + Psychology side by side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '34px' }}>
          <Reveal delay={0}>
            <InteractiveDegreeCard d={t.education.degrees[0]} accent={accent} previewHint={t.education.previewHint} />
          </Reveal>
          <div className="deg-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
            <Reveal delay={0.1}><SimpleDegreeCard d={t.education.degrees[1]} accent={accent} /></Reveal>
            <Reveal delay={0.2}><SimpleDegreeCard d={t.education.degrees[2]} accent={accent} /></Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.4)`, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px' }}>{t.education.certsLabel}</div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(252px,1fr))', gap: '13px' }}>
          {t.education.certs.map((c, i) => {
            const isCisco = c.issuer === 'Cisco';
            const isIBM = c.issuer === 'IBM SkillsBuild';
            const accentBorder = isCisco || isIBM;
            const certIcon = isCisco ?
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.4" /><path d="M12 1v4M12 19v4M1 12h4M19 12h4" /></svg> :
            isIBM ?
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="7" width="20" height="3" /><rect x="2" y="14" width="20" height="3" /><rect x="5" y="4" width="14" height="3" /><rect x="5" y="17" width="14" height="3" /></svg> :
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z" stroke={accent} strokeWidth="1" strokeOpacity="0.62" fill="none" /></svg>;
            return (
              <Reveal key={i} delay={0.1 + i * 0.07}>
                <div className="hcard" style={{ background: accentBorder ? `rgba(${r},0.04)` : '#0a1829', border: `1px solid rgba(${r},${accentBorder ? '0.22' : '0.1'})`, borderRadius: '10px', padding: '17px 19px', display: 'flex', gap: '13px', alignItems: 'flex-start', boxShadow: accentBorder ? `0 0 18px rgba(${r},0.05)` : 'none' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `rgba(${r},${accentBorder ? '0.1' : '0.07'})`, border: `1px solid rgba(${r},${accentBorder ? '0.22' : '0.14'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {certIcon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, fontSize: '13px', color: accentBorder ? '#daeef8' : '#c0dcec', marginBottom: '4px', lineHeight: 1.35 }}>{c.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},${accentBorder ? '0.6' : '0.4'})` }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</div>
                    {c.skills &&
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '9px' }}>
                        {c.skills.map((s) => <span key={s} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', padding: '2px 7px', background: `rgba(${r},0.1)`, border: `1px solid rgba(${r},0.22)`, borderRadius: '3px', color: accent }}>{s}</span>)}
                      </div>
                    }
                  </div>
                </div>
              </Reveal>);

          })}
        </div>

        <Reveal delay={0.5}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
            <a href="https://www.credly.com/users/sebastian-garay.tech/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 26px', background: `rgba(${r},0.06)`, border: `1px solid rgba(${r},0.28)`, borderRadius: '8px', color: accent, fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, fontSize: '14px', textDecoration: 'none', letterSpacing: '0.3px', transition: 'all 0.22s' }}
            onMouseEnter={(e) => {e.currentTarget.style.background = `rgba(${r},0.14)`;e.currentTarget.style.boxShadow = `0 0 20px rgba(${r},0.22)`;e.currentTarget.style.transform = 'translateY(-2px)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = `rgba(${r},0.06)`;e.currentTarget.style.boxShadow = 'none';e.currentTarget.style.transform = '';}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M9 11l-4 10 7-3 7 3-4-10" /></svg>
              {t.education.credlyLabel}            </a>
          </div>
        </Reveal>

        {/* Professional Membership */}
        <Reveal delay={0.2}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.4)`, letterSpacing: '2.5px', textTransform: 'uppercase', margin: '56px 0 18px' }}>{t.education.membershipLabel}</div>
        </Reveal>
        <Reveal delay={0.28}>
          <div style={{ background: `rgba(${r},0.04)`, border: `1px solid rgba(${r},0.18)`, borderRadius: '12px', padding: '24px 26px', display: 'flex', gap: '18px', alignItems: 'flex-start', boxShadow: `0 0 18px rgba(${r},0.05)` }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: `rgba(${r},0.1)`, border: `1px solid rgba(${r},0.24)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
            </div>
            <div style={{ minWidth: 0, flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '19px', color: '#daeef8' }}>{t.education.membership.org}</span>
                <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, fontSize: '13px', color: accent }}>{t.education.membership.role}</span>
                <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.5)`, whiteSpace: 'nowrap' }}>{t.education.membership.period}</span>
              </div>
              <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', color: '#6c97ab', lineHeight: 1.7, margin: 0 }}>{t.education.membership.desc}</p>
            </div>
          </div>
        </Reveal>

        {/* Technical Activities */}
        <Reveal delay={0.2}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.4)`, letterSpacing: '2.5px', textTransform: 'uppercase', margin: '46px 0 18px' }}>{t.education.activitiesLabel}</div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))', gap: '16px' }}>
          {t.education.activities.map((act, i) =>
          <Reveal key={i} delay={0.28 + i * 0.08}>
              <div style={{ background: '#0a1829', border: `1px solid rgba(${r},0.12)`, borderRadius: '12px', padding: '24px 26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', padding: '3px 10px', background: `rgba(${r},0.07)`, border: `1px solid rgba(${r},0.16)`, borderRadius: '4px', color: accent }}>{act.category}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', padding: '4px 12px', background: 'rgba(91,143,199,0.13)', border: '1px solid rgba(91,143,199,0.34)', borderRadius: '5px', color: '#7fb0e0', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7fb0e0', boxShadow: '0 0 7px rgba(127,176,224,0.7)' }} />{act.status}
                  </span>
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '19px', color: '#daeef8', lineHeight: 1.3, marginBottom: '8px' }}>{act.title}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.5)`, marginBottom: '12px' }}>{act.date}</div>
                <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', color: '#6c97ab', lineHeight: 1.7, margin: 0 }}>{act.desc}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

};

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const ProjectsSection = ({ t, accent }) => {
  const r = darkRgb(accent);
  return (
    <section id="projects" data-screen-label="04 Projects" style={{ position: 'relative', padding: '120px 0', background: '#11212f', overflow: 'hidden' }}>
      <HexGridBg accent={accent} opacity={0.03} style={{ position: 'absolute', inset: 0 }} />
      <ProjectsDashboardBg accent={accent} />
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 2 }}>
        <SectionHead label={t.projects.label} title={t.projects.heading} accent={accent} theme="dark" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(286px,1fr))', gap: '22px' }}>
          {t.projects.items.slice(0, 2).map((p, i) =>
          <Reveal key={i} delay={i * 0.1}>
              <article style={{ background: 'rgba(10,24,41,0.9)', backdropFilter: 'blur(8px)', border: `1px solid rgba(${r},0.1)`, borderRadius: '14px', padding: '26px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
            onMouseEnter={(e) => {e.currentTarget.style.borderColor = `rgba(${r},0.28)`;e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.45)`;}}
            onMouseLeave={(e) => {e.currentTarget.style.borderColor = `rgba(${r},0.1)`;e.currentTarget.style.transform = '';e.currentTarget.style.boxShadow = '';}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', padding: '3px 10px', background: `rgba(${r},0.07)`, border: `1px solid rgba(${r},0.15)`, borderRadius: '4px', color: accent }}>{p.category}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.3)` }} title="Professional Work Development Context">{p.client}</span>
                </div>
                {p.riskLevel && (() => {
                const lvl = { CRITICAL: ['rgba(200,30,30,0.14)', 'rgba(205,40,40,0.35)', 'rgba(255,85,85,0.85)'], HIGH: ['rgba(220,100,0,0.12)', 'rgba(220,100,0,0.3)', 'rgba(255,145,60,0.85)'], MEDIUM: ['rgba(195,170,0,0.1)', 'rgba(200,170,0,0.25)', 'rgba(215,190,55,0.85)'] };
                const [bg, brd, clr] = lvl[p.riskLevel] || lvl.MEDIUM;
                return <div style={{ marginBottom: '10px' }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', padding: '3px 10px', background: bg, border: `1px solid ${brd}`, borderRadius: '4px', color: clr, letterSpacing: '0.5px' }}>RISK: {p.riskLevel}{p.riskScore ? ` · ${p.riskScore}` : ''}</span></div>;
              })()}
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '18px', color: '#daeef8', marginBottom: '10px', lineHeight: 1.32 }}>{p.title}</div>
                <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', color: '#6c97ab', lineHeight: 1.7, flexGrow: 1, marginBottom: '16px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {p.tags.map((tag) => <span key={tag} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', padding: '3px 9px', background: `rgba(${r},0.05)`, border: `1px solid rgba(${r},0.12)`, borderRadius: '4px', color: `rgba(${r},0.52)` }}>{tag}</span>)}
                </div>
              </article>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: `rgba(${r},0.4)`, marginTop: '20px', letterSpacing: '1px' }}>{t.projects.moreSoon}</p>
        </Reveal>
        {/* Footnote for PWDC */}
        <Reveal delay={0.2}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.28)`, marginTop: '28px', letterSpacing: '0.3px' }}>
            {t.projects.pwdcNote}
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <a href="https://github.com/SGGaray" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: `rgba(${r},0.06)`, border: `1px solid rgba(${r},0.22)`, borderRadius: '8px', color: accent, fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, fontSize: '14px', textDecoration: 'none', letterSpacing: '0.3px', transition: 'all 0.2s' }}
            onMouseEnter={(e) => {e.currentTarget.style.background = `rgba(${r},0.14)`;e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3)`;}}
            onMouseLeave={(e) => {e.currentTarget.style.background = `rgba(${r},0.06)`;e.currentTarget.style.transform = '';e.currentTarget.style.boxShadow = '';}}>
              <GithubMark size={13} fill="currentColor" />
              {t.projects.viewAll} →
            </a>
          </div>
        </Reveal>
      </div>
    </section>);

};

// ── ARTICLES ──────────────────────────────────────────────────────────────────
const ArticlesSection = ({ t, accent }) => {
  const a = la(accent);
  const r = lightRgb(accent);

  const renderCard = (ar, i) => {
    const isPublished = ar.status === 'Published';
    return (
      <Reveal key={i} delay={i * 0.08}>
        <article className="hcard" style={{ background: '#ffffff', border: `1px solid rgba(${r},${isPublished ? '0.14' : '0.08'})`, borderRadius: '14px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s', cursor: 'default', opacity: isPublished ? 1 : 0.82, position: 'relative' }}
        onMouseEnter={(e) => {if (!isPublished) return;e.currentTarget.style.borderColor = `rgba(${r},0.3)`;e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.1)`;}}
        onMouseLeave={(e) => {e.currentTarget.style.borderColor = `rgba(${r},${isPublished ? '0.14' : '0.08'})`;e.currentTarget.style.transform = '';e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', padding: '3px 10px', background: `rgba(${r},0.08)`, border: `1px solid rgba(${r},0.18)`, borderRadius: '4px', color: a }}>{ar.type}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.32)` }}>{ar.date}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', padding: '2px 8px', border: `1px solid rgba(${r},0.2)`, borderRadius: '3px', color: `rgba(${r},0.45)`, letterSpacing: '1px' }}>{ar.status}</span>
            </div>
          </div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '19px', color: '#0d1e2e', lineHeight: 1.38 }}>{ar.title}</div>
          <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', color: '#3a5a6a', lineHeight: 1.72 }}>{ar.excerpt}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.36)` }}>{ar.readTime}</span>
            {!isPublished &&
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.38)` }}>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="7" width="10" height="8" rx="1.5" /><path d="M5 7V5a3 3 0 016 0v2" /></svg>
                {t.articles.notPublished}
              </span>
            }
          </div>
        </article>
      </Reveal>);

  };

  const CatLabel = ({ children }) =>
  <Reveal>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
        <span style={{ width: '24px', height: '2px', background: a, borderRadius: '1px' }} />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: a }}>{children}</span>
      </div>
    </Reveal>;


  return (
    <section id="blog" data-screen-label="05 Articles" style={{ position: 'relative', padding: '120px 0', background: '#f7f9fb', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none', opacity: 0.4 }} />
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 2 }}>
        <SectionHead label={t.articles.label} title={t.articles.heading} accent={accent} theme="light" />

        {/* Coming soon banner */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', background: `rgba(${r},0.06)`, border: `1px solid rgba(${r},0.16)`, borderRadius: '10px', marginBottom: '44px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={a} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', color: a, lineHeight: 1.5 }}>{t.articles.comingSoonNote}</span>
          </div>
        </Reveal>

        <CatLabel>{t.articles.cat1Label}</CatLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))', gap: '24px' }}>
          {t.articles.items.slice(0, 1).map(renderCard)}
        </div>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#64748b', marginTop: '24px', letterSpacing: '1px' }}>{t.articles.moreSoon}</p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: `rgba(${r},0.05)`, border: `1px dashed rgba(${r},0.18)`, borderRadius: '8px', color: `rgba(${r},0.45)`, fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, fontSize: '14px', letterSpacing: '0.3px' }}>
              {t.articles.viewAll} — coming soon
            </span>
          </div>
        </Reveal>
      </div>
    </section>);

};

// ── CONTACT ───────────────────────────────────────────────────────────────────
// Contact section — direct contact links (no form).

const ContactSection = ({ t, accent }) => {
  const r = darkRgb(accent);

  const items = [
    { href: `mailto:${t.contact.email}`, label: t.contact.email, sub: 'Email', external: false,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg> },
    { href: 'https://www.linkedin.com/in/sebastian-garay/', label: 'linkedin.com/in/sebastian-garay', sub: 'LinkedIn', external: true,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill={accent} opacity="0.85"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
    { href: 'https://github.com/SGGaray', label: 'github.com/SGGaray', sub: 'GitHub', external: true,
      icon: <GithubMark size={16} fill={accent} opacity={0.85} /> }];

  return (
    <section id="contact" data-screen-label="06 Contact" style={{ position: 'relative', padding: '120px 0 80px', background: '#0d1622', overflow: 'hidden' }}>
      <HexGridBg accent={accent} opacity={0.028} style={{ position: 'absolute', inset: 0 }} />
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 52px', position: 'relative', zIndex: 2 }}>
        <SectionHead label={t.contact.label} title={t.contact.heading} accent={accent} theme="dark" />

        <Reveal>
          <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '17px', lineHeight: 1.7, color: '#8ab4c6', maxWidth: '600px', margin: '0 auto 36px', textAlign: 'center' }}>{t.contact.availability}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="contact-links" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '36px' }}>
            {items.map(({ href, label, sub, icon, external }, idx) => {
              const primary = idx === 0;
              const display = primary ? label : sub;
              return (
                <React.Fragment key={sub}>
                  {idx > 0 &&
                  <span className="contact-sep" style={{ display: 'flex', alignItems: 'center', color: `rgba(${r},0.3)`, fontFamily: "'JetBrains Mono',monospace", fontSize: '18px', lineHeight: 1 }}>·</span>
                  }
                  <a href={href} target={external ? '_blank' : '_self'} rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px 20px', borderRadius: '10px', background: primary ? `rgba(${r},0.08)` : 'transparent', border: `1px solid rgba(${r},${primary ? '0.5' : '0.12'})`, boxShadow: primary ? `0 0 12px rgba(${r},0.2)` : 'none', color: '#c8e6f0', fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.borderColor = `rgba(${r},${primary ? '0.7' : '0.3'})`;if (primary) e.currentTarget.style.boxShadow = `0 0 18px rgba(${r},0.3)`;}}
                  onMouseLeave={(e) => {e.currentTarget.style.transform = '';e.currentTarget.style.borderColor = `rgba(${r},${primary ? '0.5' : '0.12'})`;if (primary) e.currentTarget.style.boxShadow = `0 0 12px rgba(${r},0.2)`;}}>
                    {primary &&
                    <span style={{ position: 'relative', display: 'inline-flex', width: '7px', height: '7px', flexShrink: 0 }}>
                      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', animation: prefersReducedMotion() ? 'none' : 'dotPulse 2s ease-in-out infinite' }} />
                      <span style={{ position: 'relative', width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.8)' }} />
                    </span>
                    }
                    <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>
                    <span style={{ wordBreak: 'break-all' }}>{display}</span>
                  </a>
                </React.Fragment>);
            })}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div style={{ maxWidth: '360px', margin: '0 auto', background: '#0a1829', border: `1px solid rgba(${r},0.1)`, borderRadius: '12px', padding: '22px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.38)`, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>{t.contact.locationLabel}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.55"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
              <span style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '15px', color: '#8ab4c6' }}>Buenos Aires, Argentina · AMBA</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>);

};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const FooterSection = ({ t, accent }) => {
  const r = darkRgb(accent);
  const goTo = (id) => {const el = document.getElementById(id);if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });};

  const navLinks = [
    ['about', t.nav.about], ['education', t.nav.education], ['projects', t.nav.projects],
    ['blog', t.nav.blog], ['contact', t.nav.contact]];

  const extLinks = [
    { href: 'https://www.linkedin.com/in/sebastian-garay/', label: 'LinkedIn', external: true,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill={accent} opacity="0.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
    { href: 'https://github.com/SGGaray', label: 'GitHub', external: true,
      icon: <GithubMark size={15} fill={accent} opacity={0.8} /> },
    { href: `mailto:${t.contact.email}`, label: t.contact.email, external: false,
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg> }];

  const colTitle = { fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: `rgba(${r},0.4)`, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px' };
  const linkStyle = { fontFamily: "'IBM Plex Sans',sans-serif", fontSize: '14px', color: '#8ab4c6', textDecoration: 'none', transition: 'color 0.2s', width: 'fit-content' };

  return (
    <footer style={{ background: '#0d1622', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 0 40px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 52px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '48px' }}>

          {/* Col 1 — Identity */}
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '34px', color: accent, lineHeight: 1, marginBottom: '14px' }}>SG</div>
            <div style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 500, fontSize: '15px', color: '#e2e8f0', marginBottom: '5px' }}>Sebastian Garay</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: `rgba(${r},0.34)`, letterSpacing: '0.5px' }}>{t.footer.role}</div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <div style={colTitle}>{t.footer.navTitle}</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {navLinks.map(([id, label]) =>
              <a key={id} href={`#${id}`} onClick={(e) => {e.preventDefault();goTo(id);}}
                style={linkStyle}
                onMouseEnter={(e) => {e.currentTarget.style.color = accent;}}
                onMouseLeave={(e) => {e.currentTarget.style.color = '#8ab4c6';}}>{label}</a>
              )}
            </nav>
          </div>

          {/* Col 3 — External links */}
          <div>
            <div style={colTitle}>{t.footer.linksTitle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {extLinks.map(({ href, label, icon, external }) =>
              <a key={label} href={href} target={external ? '_blank' : '_self'} rel="noopener noreferrer"
                style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '10px' }}
                onMouseEnter={(e) => {e.currentTarget.style.color = accent;}}
                onMouseLeave={(e) => {e.currentTarget.style.color = '#8ab4c6';}}>
                <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>{label}</a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: `rgba(${r},0.28)`, letterSpacing: '0.5px' }}>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>);

};

Object.assign(window, { HeroSection, AboutSection, EducationSection, ProjectsSection, ArticlesSection, ContactSection, FooterSection });