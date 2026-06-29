(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.sections = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // sections.jsx v3 — accent system, a11y, reduced-motion, Formspree, profile photo, scroll indicator
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const {
    RiskMatrix,
    ComplianceRing,
    AuditTrail,
    HexGridBg
  } = window.DashboardBg;
  const GithubMark = window.GithubMark;

  // ── Theme helpers ────────────────────────────────────────────
  // Unified hex→rgb: single source of truth lives in dashboard-bg.jsx (window.accentRgb).
  const hexToRgb = window.accentRgb;
  const lightenAccent = hex => {
    const map = {
      '#00d4ff': '#0088bb',
      '#9b4dff': '#7730cc',
      '#00dc6e': '#009944'
    };
    if (map[hex]) return map[hex];
    const c = hex.replace('#', '');
    const dk = v => Math.max(0, parseInt(v, 16) - 55).toString(16).padStart(2, '0');
    return `#${dk(c.slice(0, 2))}${dk(c.slice(2, 4))}${dk(c.slice(4, 6))}`;
  };
  const la = lightenAccent;
  const darkRgb = hexToRgb;
  const lightRgb = a => hexToRgb(la(a));
  const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Hooks ─────────────────────────────────────────────────────────────────────
  const useReveal = (threshold = 0.12) => {
    const reduced = prefersReducedMotion();
    const [vis, setVis] = useState(reduced);
    const ref = useRef(null);
    useEffect(() => {
      if (reduced) {
        setVis(true);
        return;
      }
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setVis(true);
      }, {
        threshold
      });
      obs.observe(el);
      return () => obs.disconnect();
    }, []);
    return [ref, vis];
  };
  const Reveal = ({
    children,
    delay = 0,
    style = {}
  }) => {
    const [ref, vis] = useReveal();
    const reduced = prefersReducedMotion();
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(16px)',
        transition: reduced ? 'none' : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style
      }
    }, children);
  };

  // ── Mountain photo placeholder ─────────────────────────────────────────────────
  const MountainPhoto = () => /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      aspectRatio: '4/3',
      position: 'relative',
      boxShadow: '0 8px 40px rgba(0,0,0,0.18)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "cerro-sosneado.jpg",
    loading: "lazy",
    alt: "Vista desde la cumbre del Cerro Sosneado, Mendoza · 2025",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 40%',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '28px 16px 12px',
      background: 'linear-gradient(transparent,rgba(2,8,16,0.72))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: '10px',
      color: 'rgba(170,205,225,0.7)',
      letterSpacing: '1.5px'
    }
  }, "Cerro Sosneado · 2025")));

  // ── GRC Dashboard bg for Projects ─────────────────────────────────────────────
  const ProjectsDashboardBg = ({
    accent
  }) => {
    const r = darkRgb(accent);
    const cell = (row, col) => {
      const s = (row + 1) * (col + 1);
      if (s <= 2) return {
        f: 'rgba(32,190,82,0.52)',
        st: 'rgba(42,210,92,0.38)'
      };
      if (s <= 6) return {
        f: 'rgba(210,185,8,0.48)',
        st: 'rgba(230,205,8,0.36)'
      };
      if (s <= 12) return {
        f: 'rgba(225,105,0,0.5)',
        st: 'rgba(245,125,0,0.38)'
      };
      return {
        f: 'rgba(205,38,38,0.52)',
        st: 'rgba(225,55,55,0.38)'
      };
    };
    const N = 5,
      CS = 54,
      GAP = 5,
      tot = N * (CS + GAP) - GAP;
    const bars = [{
      l: 'ISO 27001',
      p: 82
    }, {
      l: 'ITIL 4',
      p: 74
    }, {
      l: 'COBIT 2019',
      p: 68
    }, {
      l: 'SOC 2',
      p: 55
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: '52px',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0.16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        color: `rgba(${r},0.45)`,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '8px',
        textAlign: 'center'
      }
    }, "Risk Matrix"), /*#__PURE__*/React.createElement("svg", {
      width: tot,
      height: tot
    }, Array.from({
      length: N
    }, (_, row) => Array.from({
      length: N
    }, (_, col) => {
      const {
        f,
        st
      } = cell(N - 1 - row, col);
      return /*#__PURE__*/React.createElement("rect", {
        key: `${row}-${col}`,
        x: col * (CS + GAP),
        y: row * (CS + GAP),
        width: CS,
        height: CS,
        rx: 5,
        fill: f,
        stroke: st,
        strokeWidth: 1
      });
    })), " "), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '6px'
      }
    }, ['LOW', 'LIKELIHOOD →', 'HIGH'].map(lbl => /*#__PURE__*/React.createElement("span", {
      key: lbl,
      style: {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: `rgba(${r},0.26)`
      }
    }, lbl)))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: '52px',
        bottom: '72px',
        opacity: 0.14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        color: `rgba(${r},0.44)`,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '12px'
      }
    }, "Framework Compliance"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
        width: '190px'
      }
    }, bars.map(({
      l,
      p
    }) => /*#__PURE__*/React.createElement("div", {
      key: l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: `rgba(${r},0.4)`
      }
    }, l), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: `rgba(${r},0.55)`
      }
    }, p, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '4px',
        background: `rgba(${r},0.1)`,
        borderRadius: '2px',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${p}%`,
        height: '100%',
        background: `rgba(${r},0.62)`,
        borderRadius: '2px'
      }
    })))))));
  };

  // ── Interactive Degree Card ─────────────────────────────────────────────────
  const InteractiveDegreeCard = ({
    d,
    accent,
    previewHint
  }) => {
    const [hov, setHov] = useState(false);
    const r = darkRgb(accent);
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        background: hov ? '#0c2035' : '#0a1829',
        border: `1px solid rgba(${r},${hov ? '0.35' : '0.13'})`,
        borderRadius: '14px',
        padding: '28px 30px',
        transition: 'background 0.3s, border-color 0.3s, transform 0.25s, box-shadow 0.3s',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? `0 12px 40px rgba(0,0,0,0.35), 0 0 28px rgba(${r},0.08)` : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '14px',
        right: '16px',
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        color: `rgba(${r},${hov ? 0 : 0.55})`,
        letterSpacing: '0.5px',
        transition: 'opacity 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "9",
      height: "9",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 3v10M3 8l5 5 5-5"
    })), previewHint || 'hover to preview'), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: accent,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '11px',
        opacity: 0.65
      }
    }, d.type), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        fontSize: '20px',
        color: '#daeef8',
        marginBottom: '6px',
        lineHeight: 1.3
      }
    }, d.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: '#6c97ab',
        marginBottom: d.period ? '4px' : '14px'
      }
    }, d.institution), d.period && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.42)`,
        marginBottom: '14px',
        letterSpacing: '0.3px'
      }
    }, d.period), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: `rgba(${r},0.6)`,
        boxShadow: `0 0 8px rgba(${r},0.4)`
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.6)`
      }
    }, d.status)), d.current && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '14px',
        paddingTop: '14px',
        borderTop: `1px solid rgba(${r},0.09)`,
        display: 'flex',
        gap: '9px',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: accent,
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        flexShrink: 0,
        marginTop: '2px',
        opacity: 0.7
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 19.5A2.5 2.5 0 016.5 17H20"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '12.5px',
        color: '#5a8298',
        lineHeight: 1.5
      }
    }, d.current)), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: hov ? '600px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: `1px solid rgba(${r},0.1)`,
        paddingTop: '20px',
        marginTop: '18px'
      }
    }, d.desc && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '13px',
        color: '#5a8298',
        lineHeight: 1.7,
        marginBottom: '18px',
        whiteSpace: 'pre-line'
      }
    }, d.desc), d.scope && d.scope.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        color: `rgba(${r},0.35)`,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '8px'
      }
    }, d.scopeLabel || 'Alcances del título'), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px'
      }
    }, d.scope.map(s => /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        padding: '3px 9px',
        background: `rgba(${r},0.07)`,
        border: `1px solid rgba(${r},0.14)`,
        borderRadius: '4px',
        color: `rgba(${r},0.58)`
      }
    }, s)))))));
  };

  // ── Section heading ───────────────────────────────────────────────────────────
  const SectionHead = ({
    label,
    title,
    accent,
    theme = 'dark'
  }) => {
    const a = theme === 'dark' ? accent : la(accent);
    const textColor = theme === 'dark' ? '#eaf6fb' : '#0d1e2e';
    return /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: a,
        marginBottom: '10px'
      }
    }, label), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(34px,4vw,52px)',
        color: textColor,
        marginBottom: '16px',
        lineHeight: 1.08,
        letterSpacing: '-1.6px'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '48px',
        height: '2px',
        background: `linear-gradient(90deg,${a},transparent)`,
        marginBottom: '52px'
      }
    }));
  };

  // ── Simple Degree Card ────────────────────────────────────────────────────────
  const SimpleDegreeCard = ({
    d,
    accent
  }) => {
    const r = darkRgb(accent);
    return /*#__PURE__*/React.createElement("div", {
      className: "hcard",
      style: {
        background: '#0a1829',
        border: `1px solid rgba(${r},0.13)`,
        borderRadius: '12px',
        padding: '28px 30px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: accent,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '11px',
        opacity: 0.65
      }
    }, d.type), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        fontSize: '20px',
        color: '#daeef8',
        marginBottom: '6px',
        lineHeight: 1.3
      }
    }, d.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: '#6c97ab',
        marginBottom: d.period ? '4px' : '14px'
      }
    }, d.institution), d.period && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.42)`,
        marginBottom: '14px',
        letterSpacing: '0.3px'
      }
    }, d.period), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: `rgba(${r},0.6)`,
        boxShadow: `0 0 8px rgba(${r},0.4)`
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.58)`
      }
    }, d.status)), d.desc && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '13px',
        color: '#5a8298',
        lineHeight: 1.7,
        margin: '14px 0 0',
        paddingTop: '14px',
        borderTop: `1px solid rgba(${r},0.09)`,
        fontStyle: d.descItalic ? 'italic' : 'normal',
        whiteSpace: 'pre-line',
        flexGrow: d.scope ? 0 : 1
      }
    }, d.desc), d.descSub && /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '12px',
        color: `rgba(${r},0.38)`,
        lineHeight: 1.65,
        margin: '10px 0 0'
      }
    }, d.descSub), d.scope && d.scope.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '16px',
        paddingTop: '14px',
        borderTop: `1px solid rgba(${r},0.07)`,
        flexGrow: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        color: `rgba(${r},0.3)`,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '8px'
      }
    }, d.scopeLabel || 'Alcances'), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px'
      }
    }, d.scope.map(s => /*#__PURE__*/React.createElement("span", {
      key: s,
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        padding: '3px 9px',
        background: `rgba(${r},0.07)`,
        border: `1px solid rgba(${r},0.14)`,
        borderRadius: '4px',
        color: `rgba(${r},0.52)`
      }
    }, s)))));
  };

  // ── HERO ──────────────────────────────────────────────────────────────────────
  const GRC_LAYERS = [{
    badge: 'GOB',
    framework: 'COBIT 2019 · ISO 38500',
    controls: ['EDM01', 'EDM02'],
    color: '#3b82f6',
    rgb: '59,130,246'
  }, {
    badge: 'MGT',
    framework: 'ITIL 4 · FitSM',
    controls: ['APO01', 'BAI01'],
    color: '#06b6d4',
    rgb: '6,182,212'
  }, {
    badge: 'RSK',
    framework: 'ISO 27001',
    controls: ['A.5.1 Políticas SI', 'A.8.2 Clasificación'],
    color: '#f59e0b',
    rgb: '245,158,11'
  }, {
    badge: 'CTL',
    framework: 'ISO 27001',
    controls: ['A.9.1 Acceso', 'A.12.6 Vuln.'],
    color: '#22c55e',
    rgb: '34,197,94'
  }, {
    badge: 'CMP',
    framework: 'ISO 27001 · COBIT',
    controls: ['A.18.1 Legal', 'A.18.2 Auditoría'],
    color: '#a855f7',
    rgb: '168,85,247'
  }];
  const GRCAssessmentPanel = ({
    t,
    accent = '#06b6d4'
  }) => {
    const panelRgb = hexToRgb(accent);
    const reduced = prefersReducedMotion();
    const layers = t.hero.layers;
    const [visible, setVisible] = useState(() => reduced ? GRC_LAYERS.length : 0);
    const [typed, setTyped] = useState(() => reduced ? Object.fromEntries(layers.map((l, i) => [i, l.text])) : {});
    const [done, setDone] = useState(() => reduced ? GRC_LAYERS.map((_, i) => i) : []);
    const [progress, setProgress] = useState(reduced ? 100 : 0);
    useEffect(() => {
      if (reduced) return;
      let cancelled = false;
      const sleep = ms => new Promise(res => setTimeout(res, ms));
      const run = async () => {
        while (!cancelled) {
          setVisible(0);
          setTyped({});
          setDone([]);
          setProgress(0);
          await sleep(400);
          for (let i = 0; i < GRC_LAYERS.length; i++) {
            if (cancelled) return;
            setVisible(i + 1);
            await sleep(280);
            const text = layers[i].text;
            for (let j = 1; j <= text.length; j++) {
              if (cancelled) return;
              setTyped(p => Object.assign({}, p, {
                [i]: text.slice(0, j)
              }));
              await sleep(11);
            }
            if (cancelled) return;
            setDone(p => p.concat(i));
            setProgress(Math.round((i + 1) / GRC_LAYERS.length * 100));
            await sleep(180);
          }
          await sleep(2600);
        }
      };
      run();
      return () => {
        cancelled = true;
      };
    }, [layers]);
    return /*#__PURE__*/React.createElement("div", {
      className: "hero-artifact",
      style: {
        position: 'relative',
        background: 'rgba(12,24,40,0.8)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        padding: '18px',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.45)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '13px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        letterSpacing: '2px',
        color: '#64748b',
        textTransform: 'uppercase'
      }
    }, t.hero.panelTitle), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        display: 'inline-flex',
        width: '6px',
        height: '6px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: '#22c55e',
        willChange: 'transform, opacity',
        animation: reduced ? 'none' : 'dotPulse 2s ease-in-out infinite'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#22c55e',
        boxShadow: '0 0 7px rgba(34,197,94,0.8)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        letterSpacing: '0.5px',
        color: '#94a3b8'
      }
    }, t.hero.panelStatus))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }
    }, GRC_LAYERS.map((Lr, i) => {
      const shown = i < visible;
      const lay = layers[i];
      const isDone = done.indexOf(i) !== -1;
      const typing = shown && !isDone;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0)' : 'translateY(12px)',
          transition: reduced ? 'none' : 'opacity 0.45s ease, transform 0.45s ease',
          background: 'rgba(' + Lr.rgb + ',0.06)',
          border: '1px solid rgba(' + Lr.rgb + ',0.28)',
          borderRadius: '9px',
          padding: '10px 12px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.5px',
          color: Lr.color,
          background: 'rgba(' + Lr.rgb + ',0.14)',
          border: '1px solid rgba(' + Lr.rgb + ',0.4)',
          borderRadius: '4px',
          padding: '2px 6px'
        }
      }, Lr.badge), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'Syne',sans-serif",
          fontWeight: 600,
          fontSize: '12px',
          letterSpacing: '0.5px',
          color: '#e2e8f0'
        }
      }, lay.concept), /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 'auto',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          color: 'rgba(' + Lr.rgb + ',0.85)'
        }
      }, Lr.framework)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          lineHeight: 1.5,
          color: '#94a3b8',
          minHeight: '30px'
        }
      }, typed[i] || '', typing && /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-block',
          width: '6px',
          height: '11px',
          background: Lr.color,
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'blink 0.75s step-end infinite'
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '7px'
        }
      }, Lr.controls.map(cc => /*#__PURE__*/React.createElement("span", {
        key: cc,
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '8.5px',
          color: '#64748b',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '3px',
          padding: '2px 6px'
        }
      }, cc)), /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 'auto',
          opacity: isDone ? 1 : 0,
          transition: reduced ? 'none' : 'opacity 0.3s ease',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9.5px',
          fontWeight: 500,
          color: Lr.color
        }
      }, lay.status)));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '8.5px',
        letterSpacing: '2px',
        color: '#64748b',
        textTransform: 'uppercase'
      }
    }, t.hero.evalLabel), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        color: accent
      }
    }, progress, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '1px',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        width: progress + '%',
        background: accent,
        transition: reduced ? 'none' : 'width 0.5s ease',
        boxShadow: `0 0 8px rgba(${panelRgb},0.7)`
      }
    }))));
  };
  const TICKER_ITEMS = ['COBIT 2019', 'ISO 27001', 'ITIL 4', 'ISO 38500', 'Human Risk Management', 'Gobierno de TI', 'Human Factor', 'Shadow AI', 'GRC'];
  const HeroTicker = () => {
    const block = k => /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0
      }
    }, TICKER_ITEMS.map((it, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: 'inline-flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        letterSpacing: '2px',
        color: '#64748b'
      }
    }, it), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'rgba(6,182,212,0.4)',
        margin: '0 16px',
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px'
      }
    }, "//"))));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(8,15,28,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        overflow: 'hidden',
        padding: '9px 0'
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        willChange: 'transform',
        animation: prefersReducedMotion() ? 'none' : 'tickerScroll 34s linear infinite'
      }
    }, block('a'), block('b')));
  };
  const HeroSection = ({
    t,
    accent = '#06b6d4'
  }) => {
    const h = accent;
    const hRgb = hexToRgb(accent);
    const reduced = prefersReducedMotion();
    const goTo = id => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.offsetTop - 60,
        behavior: 'smooth'
      });
    };
    return /*#__PURE__*/React.createElement("section", {
      id: "hero",
      "data-screen-label": "01 Hero",
      style: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#080f1c',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        opacity: 0.02
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 72% 62% at 50% 44%, transparent 38%, rgba(3,7,14,0.66) 100%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "hero-grid",
      style: {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '1220px',
        margin: '0 auto',
        padding: '0 clamp(28px, 6vw, 72px)',
        paddingBottom: '56px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '56px',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-left",
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        padding: '6px 14px 6px 11px',
        background: `rgba(${hRgb},0.05)`,
        border: `1px solid rgba(${hRgb},0.18)`,
        borderRadius: '100px',
        opacity: 0,
        animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.2s forwards'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        display: 'inline-flex',
        width: '7px',
        height: '7px',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: '#22c55e',
        willChange: 'transform, opacity',
        animation: reduced ? 'none' : 'dotPulse 2s ease-in-out infinite'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: '#22c55e',
        boxShadow: '0 0 8px rgba(34,197,94,0.8)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        letterSpacing: '0.3px',
        color: '#9fc4d4'
      }
    }, t.contact.badge)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        color: h,
        marginTop: '16px',
        opacity: 0,
        animation: reduced ? 'none' : 'fadeUp 0.7s ease 0.28s forwards'
      }
    }, t.hero.differentiator), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(1.7rem, 3.3vw, 2.4rem)',
        lineHeight: 1.15,
        letterSpacing: '-0.5px',
        color: '#e2e8f0',
        margin: '26px 0 0',
        opacity: 0,
        animation: reduced ? 'none' : 'fadeUp 0.7s ease 0.34s forwards'
      }
    }, t.hero.headlinePre, /*#__PURE__*/React.createElement("span", {
      style: {
        color: h
      }
    }, t.hero.headlineHi), t.hero.headlinePost), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '26px 0 0',
        opacity: 0,
        animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.5s forwards'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        color: '#e2e8f0',
        fontSize: "30px"
      }
    }, t.hero.firstName, " ", t.hero.lastName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '0.75rem',
        letterSpacing: '2px',
        color: h,
        marginTop: '5px'
      }
    }, t.hero.title)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '36px',
        height: '1px',
        background: `linear-gradient(90deg, rgba(${hRgb},0.5), transparent)`,
        margin: '22px 0',
        opacity: 0,
        animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.64s forwards'
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '0.9rem',
        lineHeight: 1.6,
        color: '#94a3b8',
        maxWidth: '34ch',
        margin: 0,
        opacity: 0,
        animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.74s forwards'
      }
    }, t.hero.tagline2), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '30px',
        opacity: 0,
        animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.88s forwards'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#projects",
      onClick: e => {
        e.preventDefault();
        goTo('projects');
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '12px 26px',
        background: h,
        color: '#041016',
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 600,
        fontSize: '0.85rem',
        borderRadius: '8px',
        textDecoration: 'none',
        boxShadow: `0 0 24px rgba(${hRgb},0.3)`,
        transition: 'all 0.2s'
      },
      onMouseEnter: e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 0 32px rgba(${hRgb},0.5)`;
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = `0 0 24px rgba(${hRgb},0.3)`;
      }
    }, t.hero.cta1), /*#__PURE__*/React.createElement("a", {
      href: "#contact",
      onClick: e => {
        e.preventDefault();
        goTo('contact');
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '12px 26px',
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.18)',
        color: '#e2e8f0',
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 500,
        fontSize: '0.85rem',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.2s'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = '';
      }
    }, t.hero.cta2))), /*#__PURE__*/React.createElement(GRCAssessmentPanel, {
      t: t,
      accent: h
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0,
        animation: reduced ? 'none' : 'fadeIn 0.8s ease 1.4s forwards',
        pointerEvents: 'none'
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        letterSpacing: '2.5px',
        color: 'rgba(148,163,184,0.38)',
        textTransform: 'uppercase'
      }
    }, t.hero.scroll), /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "22",
      viewBox: "0 0 14 22",
      fill: "none",
      style: {
        animation: reduced ? 'none' : 'scrollPulse 2.2s ease-in-out infinite'
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "1",
      y: "1",
      width: "12",
      height: "18",
      rx: "6",
      stroke: "rgba(148,163,184,0.25)",
      strokeWidth: "1.5",
      fill: "none"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "6",
      y: "5",
      width: "2",
      height: "5",
      rx: "1",
      fill: "rgba(148,163,184,0.4)",
      style: {
        animation: reduced ? 'none' : 'scrollPulse 2.2s ease-in-out infinite'
      }
    }))), /*#__PURE__*/React.createElement(HeroTicker, null));
  };

  // ── ABOUT ─────────────────────────────────────────────────────────────────────
  const AboutSection = ({
    t,
    accent
  }) => {
    const a = la(accent);
    const r = lightRgb(accent);
    return /*#__PURE__*/React.createElement("section", {
      id: "about",
      "data-screen-label": "02 About",
      style: {
        position: 'relative',
        padding: '120px 0',
        background: '#f7f9fb',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        opacity: 0.4
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      label: t.about.label,
      title: t.about.heading,
      accent: accent,
      theme: "light"
    }), /*#__PURE__*/React.createElement("div", {
      className: "two-col",
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: '80px',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", null, t.about.bio.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      delay: i * 0.09
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '16px',
        color: '#284252',
        lineHeight: 1.8,
        marginBottom: '22px'
      }
    }, p))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.5
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '9px',
        marginTop: '32px'
      }
    }, ['ISO 27001', 'COBIT 2019', 'GRC', 'Behavioral Security', 'AI Governance', 'Risk Management'].map(tag => /*#__PURE__*/React.createElement("span", {
      key: tag,
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        padding: '4px 12px',
        background: `rgba(${r},0.07)`,
        border: `1px solid rgba(${r},0.2)`,
        borderRadius: '4px',
        color: a,
        letterSpacing: '0.3px'
      }
    }, tag))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.1
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '22px'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "profile.jpg",
      alt: "Sebastian Garay",
      loading: "lazy",
      onError: e => {
        e.currentTarget.style.display = 'none';
        const fb = e.currentTarget.nextElementSibling;
        if (fb) fb.style.display = 'flex';
      },
      style: {
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '10px',
        border: `1px solid rgba(${r},0.2)`,
        boxShadow: '0 4px 16px rgba(13,34,51,0.1)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        display: 'none',
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        marginBottom: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        background: `rgba(${r},0.1)`,
        border: `1px solid rgba(${r},0.22)`,
        fontFamily: "'Syne',sans-serif",
        fontWeight: 700,
        fontSize: '30px',
        color: a,
        letterSpacing: '-1px'
      }
    }, "SG"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 700,
        fontSize: '14px',
        color: '#0d2233'
      }
    }, "Sebastian Garay"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.55)`,
        letterSpacing: '0.5px',
        marginTop: '3px'
      }
    }, "GRC · Behavioral Security"))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement(MountainPhoto, null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '14px'
      }
    }, /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.3
    }, /*#__PURE__*/React.createElement("div", {
      className: "hcard",
      style: {
        background: '#ffffff',
        border: `1px solid rgba(${r},0.14)`,
        borderRadius: '10px',
        padding: '16px 18px',
        boxShadow: '0 4px 16px rgba(13,34,51,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: `rgba(${r},0.1)`,
        border: `1px solid rgba(${r},0.2)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: a,
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 700,
        fontSize: '13px',
        color: '#0d2233',
        marginBottom: '2px',
        lineHeight: 1.3
      }
    }, t.about.highlights[0].label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.6)`
      }
    }, t.about.highlights[0].sub)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        padding: '2px 8px',
        background: `rgba(${r},0.08)`,
        border: `1px solid rgba(${r},0.18)`,
        borderRadius: '3px',
        color: a,
        letterSpacing: '0.5px',
        whiteSpace: 'nowrap'
      }
    }, "ACTIVE")))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.38
    }, /*#__PURE__*/React.createElement("div", {
      className: "hcard",
      style: {
        background: '#ffffff',
        border: `1px solid rgba(${r},0.14)`,
        borderRadius: '10px',
        padding: '16px 18px',
        boxShadow: '0 4px 16px rgba(13,34,51,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: `rgba(${r},0.08)`,
        border: `1px solid rgba(${r},0.16)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: a,
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 700,
        fontSize: '13px',
        color: '#0d2233',
        marginBottom: '2px',
        lineHeight: 1.3
      }
    }, t.about.highlights[1].label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.6)`
      }
    }, t.about.highlights[1].sub)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        padding: '2px 8px',
        background: `rgba(${r},0.08)`,
        border: `1px solid rgba(${r},0.18)`,
        borderRadius: '3px',
        color: a,
        letterSpacing: '0.5px',
        whiteSpace: 'nowrap'
      }
    }, t.about.highlights[1].badge)))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.46
    }, /*#__PURE__*/React.createElement("div", {
      className: "hcard",
      style: {
        background: '#ffffff',
        border: `1px solid rgba(${r},0.14)`,
        borderRadius: '10px',
        padding: '16px 18px',
        boxShadow: '0 4px 16px rgba(13,34,51,0.07)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: `rgba(${r},0.08)`,
        border: `1px solid rgba(${r},0.16)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: '2px'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: a,
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 17l2 2 4-4"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flexGrow: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 700,
        fontSize: '13px',
        color: '#0d2233',
        marginBottom: '6px'
      }
    }, t.about.highlights[2].label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px'
      }
    }, t.about.highlights[2].sub.split(' · ').map(f => /*#__PURE__*/React.createElement("span", {
      key: f,
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        padding: '2px 8px',
        background: `rgba(${r},0.1)`,
        border: `1px solid rgba(${r},0.22)`,
        borderRadius: '3px',
        color: a
      }
    }, f))), t.about.highlights[2].note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: '#64748b',
        marginTop: '8px',
        lineHeight: 1.6
      }
    }, t.about.highlights[2].note)))))))));
  };

  // ── EDUCATION ─────────────────────────────────────────────────────────────────
  const EducationSection = ({
    t,
    accent
  }) => {
    const r = darkRgb(accent);
    return /*#__PURE__*/React.createElement("section", {
      id: "education",
      "data-screen-label": "03 Education",
      style: {
        position: 'relative',
        padding: '120px 0',
        background: '#0c1825',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(ComplianceRing, {
      label: "ISO 27001",
      pct: 82,
      accent: accent,
      opacity: 0.14,
      style: {
        top: '70px',
        right: '72px'
      }
    }), /*#__PURE__*/React.createElement(RiskMatrix, {
      accent: accent,
      opacity: 0.14,
      style: {
        bottom: '70px',
        left: '52px'
      }
    }), /*#__PURE__*/React.createElement(AuditTrail, {
      accent: accent,
      opacity: 0.12,
      style: {
        top: '160px',
        right: '260px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      label: t.education.label,
      title: t.education.heading,
      accent: accent,
      theme: "dark"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        marginBottom: '34px'
      }
    }, /*#__PURE__*/React.createElement(Reveal, {
      delay: 0
    }, /*#__PURE__*/React.createElement(InteractiveDegreeCard, {
      d: t.education.degrees[0],
      accent: accent,
      previewHint: t.education.previewHint
    })), /*#__PURE__*/React.createElement("div", {
      className: "deg-grid",
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '22px'
      }
    }, /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.1
    }, /*#__PURE__*/React.createElement(SimpleDegreeCard, {
      d: t.education.degrees[1],
      accent: accent
    })), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement(SimpleDegreeCard, {
      d: t.education.degrees[2],
      accent: accent
    })))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.4)`,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        marginBottom: '18px'
      }
    }, t.education.certsLabel)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(252px,1fr))',
        gap: '13px'
      }
    }, t.education.certs.map((c, i) => {
      const isCisco = c.issuer === 'Cisco';
      const isIBM = c.issuer === 'IBM SkillsBuild';
      const accentBorder = isCisco || isIBM;
      const certIcon = isCisco ? /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: accent,
        strokeWidth: "1.6",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "3.4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 1v4M12 19v4M1 12h4M19 12h4"
      })) : isIBM ? /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: accent,
        strokeWidth: "1.6",
        strokeLinecap: "round"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "7",
        width: "20",
        height: "3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "14",
        width: "20",
        height: "3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "5",
        y: "4",
        width: "14",
        height: "3"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "5",
        y: "17",
        width: "14",
        height: "3"
      })) : /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 16 16",
        fill: "none"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z",
        stroke: accent,
        strokeWidth: "1",
        strokeOpacity: "0.62",
        fill: "none"
      }));
      return /*#__PURE__*/React.createElement(Reveal, {
        key: i,
        delay: 0.1 + i * 0.07
      }, /*#__PURE__*/React.createElement("div", {
        className: "hcard",
        style: {
          background: accentBorder ? `rgba(${r},0.04)` : '#0a1829',
          border: `1px solid rgba(${r},${accentBorder ? '0.22' : '0.1'})`,
          borderRadius: '10px',
          padding: '17px 19px',
          display: 'flex',
          gap: '13px',
          alignItems: 'flex-start',
          boxShadow: accentBorder ? `0 0 18px rgba(${r},0.05)` : 'none'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          background: `rgba(${r},${accentBorder ? '0.1' : '0.07'})`,
          border: `1px solid rgba(${r},${accentBorder ? '0.22' : '0.14'})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }
      }, certIcon), /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'IBM Plex Sans',sans-serif",
          fontWeight: 600,
          fontSize: '13px',
          color: accentBorder ? '#daeef8' : '#c0dcec',
          marginBottom: '4px',
          lineHeight: 1.35
        }
      }, c.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          color: `rgba(${r},${accentBorder ? '0.6' : '0.4'})`
        }
      }, c.issuer, c.date ? ` · ${c.date}` : ''), c.skills && /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginTop: '9px'
        }
      }, c.skills.map(s => /*#__PURE__*/React.createElement("span", {
        key: s,
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          padding: '2px 7px',
          background: `rgba(${r},0.1)`,
          border: `1px solid rgba(${r},0.22)`,
          borderRadius: '3px',
          color: accent
        }
      }, s))))));
    })), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.5
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '36px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "https://www.credly.com/users/sebastian-garay.tech/",
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '11px 26px',
        background: `rgba(${r},0.06)`,
        border: `1px solid rgba(${r},0.28)`,
        borderRadius: '8px',
        color: accent,
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        textDecoration: 'none',
        letterSpacing: '0.3px',
        transition: 'all 0.22s'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = `rgba(${r},0.14)`;
        e.currentTarget.style.boxShadow = `0 0 20px rgba(${r},0.22)`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = `rgba(${r},0.06)`;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = '';
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 11l-4 10 7-3 7 3-4-10"
    })), t.education.credlyLabel, "            "))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.4)`,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        margin: '56px 0 18px'
      }
    }, t.education.membershipLabel)), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.28
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: `rgba(${r},0.04)`,
        border: `1px solid rgba(${r},0.18)`,
        borderRadius: '12px',
        padding: '24px 26px',
        display: 'flex',
        gap: '18px',
        alignItems: 'flex-start',
        boxShadow: `0 0 18px rgba(${r},0.05)`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '46px',
        height: '46px',
        borderRadius: '11px',
        background: `rgba(${r},0.1)`,
        border: `1px solid rgba(${r},0.24)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: accent,
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flexGrow: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '8px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        fontSize: '19px',
        color: '#daeef8'
      }
    }, t.education.membership.org), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 600,
        fontSize: '13px',
        color: accent
      }
    }, t.education.membership.role), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.5)`,
        whiteSpace: 'nowrap'
      }
    }, t.education.membership.period)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: '#6c97ab',
        lineHeight: 1.7,
        margin: 0
      }
    }, t.education.membership.desc)))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.4)`,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        margin: '46px 0 18px'
      }
    }, t.education.activitiesLabel)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))',
        gap: '16px'
      }
    }, t.education.activities.map((act, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      delay: 0.28 + i * 0.08
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#0a1829',
        border: `1px solid rgba(${r},0.12)`,
        borderRadius: '12px',
        padding: '24px 26px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        padding: '3px 10px',
        background: `rgba(${r},0.07)`,
        border: `1px solid rgba(${r},0.16)`,
        borderRadius: '4px',
        color: accent
      }
    }, act.category), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        padding: '4px 12px',
        background: 'rgba(91,143,199,0.13)',
        border: '1px solid rgba(91,143,199,0.34)',
        borderRadius: '5px',
        color: '#7fb0e0',
        letterSpacing: '0.5px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#7fb0e0',
        boxShadow: '0 0 7px rgba(127,176,224,0.7)'
      }
    }), act.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        fontSize: '19px',
        color: '#daeef8',
        lineHeight: 1.3,
        marginBottom: '8px'
      }
    }, act.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.5)`,
        marginBottom: '12px'
      }
    }, act.date), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: '#6c97ab',
        lineHeight: 1.7,
        margin: 0
      }
    }, act.desc)))))));
  };

  // ── PROJECTS ──────────────────────────────────────────────────────────────────
  const ProjectsSection = ({
    t,
    accent
  }) => {
    const r = darkRgb(accent);
    return /*#__PURE__*/React.createElement("section", {
      id: "projects",
      "data-screen-label": "04 Projects",
      style: {
        position: 'relative',
        padding: '120px 0',
        background: '#11212f',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(HexGridBg, {
      accent: accent,
      opacity: 0.03,
      style: {
        position: 'absolute',
        inset: 0
      }
    }), /*#__PURE__*/React.createElement(ProjectsDashboardBg, {
      accent: accent
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      label: t.projects.label,
      title: t.projects.heading,
      accent: accent,
      theme: "dark"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(286px,1fr))',
        gap: '22px'
      }
    }, t.projects.items.slice(0, 2).map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: i,
      delay: i * 0.1
    }, /*#__PURE__*/React.createElement("article", {
      style: {
        background: 'rgba(10,24,41,0.9)',
        backdropFilter: 'blur(8px)',
        border: `1px solid rgba(${r},0.1)`,
        borderRadius: '14px',
        padding: '26px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        cursor: 'default'
      },
      onMouseEnter: e => {
        e.currentTarget.style.borderColor = `rgba(${r},0.28)`;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.45)`;
      },
      onMouseLeave: e => {
        e.currentTarget.style.borderColor = `rgba(${r},0.1)`;
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        padding: '3px 10px',
        background: `rgba(${r},0.07)`,
        border: `1px solid rgba(${r},0.15)`,
        borderRadius: '4px',
        color: accent
      }
    }, p.category), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.3)`
      },
      title: "Professional Work Development Context"
    }, p.client)), p.riskLevel && (() => {
      const lvl = {
        CRITICAL: ['rgba(200,30,30,0.14)', 'rgba(205,40,40,0.35)', 'rgba(255,85,85,0.85)'],
        HIGH: ['rgba(220,100,0,0.12)', 'rgba(220,100,0,0.3)', 'rgba(255,145,60,0.85)'],
        MEDIUM: ['rgba(195,170,0,0.1)', 'rgba(200,170,0,0.25)', 'rgba(215,190,55,0.85)']
      };
      const [bg, brd, clr] = lvl[p.riskLevel] || lvl.MEDIUM;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: '10px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          padding: '3px 10px',
          background: bg,
          border: `1px solid ${brd}`,
          borderRadius: '4px',
          color: clr,
          letterSpacing: '0.5px'
        }
      }, "RISK: ", p.riskLevel, p.riskScore ? ` · ${p.riskScore}` : ''));
    })(), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        fontSize: '18px',
        color: '#daeef8',
        marginBottom: '10px',
        lineHeight: 1.32
      }
    }, p.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: '#6c97ab',
        lineHeight: 1.7,
        flexGrow: 1,
        marginBottom: '16px'
      }
    }, p.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px'
      }
    }, p.tags.map(tag => /*#__PURE__*/React.createElement("span", {
      key: tag,
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        padding: '3px 9px',
        background: `rgba(${r},0.05)`,
        border: `1px solid rgba(${r},0.12)`,
        borderRadius: '4px',
        color: `rgba(${r},0.52)`
      }
    }, tag))))))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.4)`,
        marginTop: '20px',
        letterSpacing: '1px'
      }
    }, t.projects.moreSoon)), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.28)`,
        marginTop: '28px',
        letterSpacing: '0.3px'
      }
    }, t.projects.pwdcNote)), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.35
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginTop: '28px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "https://github.com/SGGaray",
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 28px',
        background: `rgba(${r},0.06)`,
        border: `1px solid rgba(${r},0.22)`,
        borderRadius: '8px',
        color: accent,
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        textDecoration: 'none',
        letterSpacing: '0.3px',
        transition: 'all 0.2s'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = `rgba(${r},0.14)`;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3)`;
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = `rgba(${r},0.06)`;
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }
    }, /*#__PURE__*/React.createElement(GithubMark, {
      size: 13,
      fill: "currentColor"
    }), t.projects.viewAll, " →")))));
  };

  // ── ARTICLES ──────────────────────────────────────────────────────────────────
  const ArticlesSection = ({
    t,
    accent
  }) => {
    const a = la(accent);
    const r = lightRgb(accent);
    const renderCard = (ar, i) => {
      const isPublished = ar.status === 'Published';
      return /*#__PURE__*/React.createElement(Reveal, {
        key: i,
        delay: i * 0.08
      }, /*#__PURE__*/React.createElement("article", {
        className: "hcard",
        style: {
          background: '#ffffff',
          border: `1px solid rgba(${r},${isPublished ? '0.14' : '0.08'})`,
          borderRadius: '14px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
          cursor: 'default',
          opacity: isPublished ? 1 : 0.82,
          position: 'relative'
        },
        onMouseEnter: e => {
          if (!isPublished) return;
          e.currentTarget.style.borderColor = `rgba(${r},0.3)`;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.1)`;
        },
        onMouseLeave: e => {
          e.currentTarget.style.borderColor = `rgba(${r},${isPublished ? '0.14' : '0.08'})`;
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          padding: '3px 10px',
          background: `rgba(${r},0.08)`,
          border: `1px solid rgba(${r},0.18)`,
          borderRadius: '4px',
          color: a
        }
      }, ar.type), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          color: `rgba(${r},0.32)`
        }
      }, ar.date), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          padding: '2px 8px',
          border: `1px solid rgba(${r},0.2)`,
          borderRadius: '3px',
          color: `rgba(${r},0.45)`,
          letterSpacing: '1px'
        }
      }, ar.status))), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'Syne',sans-serif",
          fontWeight: 600,
          fontSize: '19px',
          color: '#0d1e2e',
          lineHeight: 1.38
        }
      }, ar.title), /*#__PURE__*/React.createElement("p", {
        style: {
          fontFamily: "'IBM Plex Sans',sans-serif",
          fontSize: '14px',
          color: '#3a5a6a',
          lineHeight: 1.72
        }
      }, ar.excerpt), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          color: `rgba(${r},0.36)`
        }
      }, ar.readTime), !isPublished && /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          color: `rgba(${r},0.38)`
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: "10",
        height: "10",
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinecap: "round"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "7",
        width: "10",
        height: "8",
        rx: "1.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 7V5a3 3 0 016 0v2"
      })), t.articles.notPublished))));
    };
    const CatLabel = ({
      children
    }) => /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '22px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: '24px',
        height: '2px',
        background: a,
        borderRadius: '1px'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: a
      }
    }, children)));
    return /*#__PURE__*/React.createElement("section", {
      id: "blog",
      "data-screen-label": "05 Articles",
      style: {
        position: 'relative',
        padding: '120px 0',
        background: '#f7f9fb',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        opacity: 0.4
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      label: t.articles.label,
      title: t.articles.heading,
      accent: accent,
      theme: "light"
    }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        background: `rgba(${r},0.06)`,
        border: `1px solid rgba(${r},0.16)`,
        borderRadius: '10px',
        marginBottom: '44px'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: a,
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: a,
        lineHeight: 1.5
      }
    }, t.articles.comingSoonNote))), /*#__PURE__*/React.createElement(CatLabel, null, t.articles.cat1Label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,340px),1fr))',
        gap: '24px'
      }
    }, t.articles.items.slice(0, 1).map(renderCard)), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.2
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: '#64748b',
        marginTop: '24px',
        letterSpacing: '1px'
      }
    }, t.articles.moreSoon)), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.3
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginTop: '48px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 28px',
        background: `rgba(${r},0.05)`,
        border: `1px dashed rgba(${r},0.18)`,
        borderRadius: '8px',
        color: `rgba(${r},0.45)`,
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '0.3px'
      }
    }, t.articles.viewAll, " — coming soon")))));
  };

  // ── CONTACT ───────────────────────────────────────────────────────────────────
  // Contact section — direct contact links (no form).

  const ContactSection = ({
    t,
    accent
  }) => {
    const r = darkRgb(accent);
    const items = [{
      href: `mailto:${t.contact.email}`,
      label: t.contact.email,
      sub: 'Email',
      external: false,
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: accent,
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: "0.85"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "4",
        width: "20",
        height: "16",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 7l10 7 10-7"
      }))
    }, {
      href: 'https://www.linkedin.com/in/sebastian-garay/',
      label: 'linkedin.com/in/sebastian-garay',
      sub: 'LinkedIn',
      external: true,
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: accent,
        opacity: "0.85"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "9",
        width: "4",
        height: "12"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "4",
        r: "2"
      }))
    }, {
      href: 'https://github.com/SGGaray',
      label: 'github.com/SGGaray',
      sub: 'GitHub',
      external: true,
      icon: /*#__PURE__*/React.createElement(GithubMark, {
        size: 16,
        fill: accent,
        opacity: 0.85
      })
    }];
    return /*#__PURE__*/React.createElement("section", {
      id: "contact",
      "data-screen-label": "06 Contact",
      style: {
        position: 'relative',
        padding: '120px 0 80px',
        background: '#0d1622',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(HexGridBg, {
      accent: accent,
      opacity: 0.028,
      style: {
        position: 'absolute',
        inset: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '760px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      label: t.contact.label,
      title: t.contact.heading,
      accent: accent,
      theme: "dark"
    }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '17px',
        lineHeight: 1.7,
        color: '#8ab4c6',
        maxWidth: '600px',
        margin: '0 auto 36px',
        textAlign: 'center'
      }
    }, t.contact.availability)), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.15
    }, /*#__PURE__*/React.createElement("div", {
      className: "contact-links",
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        marginBottom: '36px'
      }
    }, items.map(({
      href,
      label,
      sub,
      icon,
      external
    }, idx) => {
      const primary = idx === 0;
      const display = primary ? label : sub;
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: sub
      }, idx > 0 && /*#__PURE__*/React.createElement("span", {
        className: "contact-sep",
        style: {
          display: 'flex',
          alignItems: 'center',
          color: `rgba(${r},0.3)`,
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '18px',
          lineHeight: 1
        }
      }, "·"), /*#__PURE__*/React.createElement("a", {
        href: href,
        target: external ? '_blank' : '_self',
        rel: "noopener noreferrer",
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '12px 20px',
          borderRadius: '10px',
          background: primary ? `rgba(${r},0.08)` : 'transparent',
          border: `1px solid rgba(${r},${primary ? '0.5' : '0.12'})`,
          boxShadow: primary ? `0 0 12px rgba(${r},0.2)` : 'none',
          color: '#c8e6f0',
          fontFamily: "'IBM Plex Sans',sans-serif",
          fontSize: '14px',
          textDecoration: 'none',
          transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s'
        },
        onMouseEnter: e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = `rgba(${r},${primary ? '0.7' : '0.3'})`;
          if (primary) e.currentTarget.style.boxShadow = `0 0 18px rgba(${r},0.3)`;
        },
        onMouseLeave: e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.borderColor = `rgba(${r},${primary ? '0.5' : '0.12'})`;
          if (primary) e.currentTarget.style.boxShadow = `0 0 12px rgba(${r},0.2)`;
        }
      }, primary && /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'relative',
          display: 'inline-flex',
          width: '7px',
          height: '7px',
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: '#22c55e',
          animation: prefersReducedMotion() ? 'none' : 'dotPulse 2s ease-in-out infinite'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'relative',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 8px rgba(34,197,94,0.8)'
        }
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          flexShrink: 0
        }
      }, icon), /*#__PURE__*/React.createElement("span", {
        style: {
          wordBreak: 'break-all'
        }
      }, display)));
    }))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.25
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '360px',
        margin: '0 auto',
        background: '#0a1829',
        border: `1px solid rgba(${r},0.1)`,
        borderRadius: '12px',
        padding: '22px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: `rgba(${r},0.38)`,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '10px'
      }
    }, t.contact.locationLabel), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: accent,
      strokeWidth: "2",
      strokeOpacity: "0.55"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "9",
      r: "2.5"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '15px',
        color: '#8ab4c6'
      }
    }, "Buenos Aires, Argentina · AMBA"))))));
  };

  // ── FOOTER ────────────────────────────────────────────────────────────────────
  const FooterSection = ({
    t,
    accent
  }) => {
    const r = darkRgb(accent);
    const goTo = id => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.offsetTop - 60,
        behavior: 'smooth'
      });
    };
    const navLinks = [['about', t.nav.about], ['education', t.nav.education], ['projects', t.nav.projects], ['blog', t.nav.blog], ['contact', t.nav.contact]];
    const extLinks = [{
      href: 'https://www.linkedin.com/in/sebastian-garay/',
      label: 'LinkedIn',
      external: true,
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        fill: accent,
        opacity: "0.8"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "9",
        width: "4",
        height: "12"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "4",
        cy: "4",
        r: "2"
      }))
    }, {
      href: 'https://github.com/SGGaray',
      label: 'GitHub',
      external: true,
      icon: /*#__PURE__*/React.createElement(GithubMark, {
        size: 15,
        fill: accent,
        opacity: 0.8
      })
    }, {
      href: `mailto:${t.contact.email}`,
      label: t.contact.email,
      external: false,
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: accent,
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: "0.8"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "4",
        width: "20",
        height: "16",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 7l10 7 10-7"
      }))
    }];
    const colTitle = {
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: '10px',
      color: `rgba(${r},0.4)`,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '18px'
    };
    const linkStyle = {
      fontFamily: "'IBM Plex Sans',sans-serif",
      fontSize: '14px',
      color: '#8ab4c6',
      textDecoration: 'none',
      transition: 'color 0.2s',
      width: 'fit-content'
    };
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: '#0d1622',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '60px 0 40px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '0 52px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "footer-grid",
      style: {
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 1fr',
        gap: '48px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 700,
        fontSize: '34px',
        color: accent,
        lineHeight: 1,
        marginBottom: '14px'
      }
    }, "SG"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontWeight: 500,
        fontSize: '15px',
        color: '#e2e8f0',
        marginBottom: '5px'
      }
    }, "Sebastian Garay"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.34)`,
        letterSpacing: '0.5px'
      }
    }, t.footer.role)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: colTitle
    }, t.footer.navTitle), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '11px'
      }
    }, navLinks.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
      key: id,
      href: `#${id}`,
      onClick: e => {
        e.preventDefault();
        goTo(id);
      },
      style: linkStyle,
      onMouseEnter: e => {
        e.currentTarget.style.color = accent;
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = '#8ab4c6';
      }
    }, label)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: colTitle
    }, t.footer.linksTitle), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }
    }, extLinks.map(({
      href,
      label,
      icon,
      external
    }) => /*#__PURE__*/React.createElement("a", {
      key: label,
      href: href,
      target: external ? '_blank' : '_self',
      rel: "noopener noreferrer",
      style: {
        ...linkStyle,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      },
      onMouseEnter: e => {
        e.currentTarget.style.color = accent;
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = '#8ab4c6';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        flexShrink: 0
      }
    }, icon), label))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.28)`,
        letterSpacing: '0.5px'
      }
    }, t.footer.copyright))));
  };
  Object.assign(window, {
    HeroSection,
    AboutSection,
    EducationSection,
    ProjectsSection,
    ArticlesSection,
    ContactSection,
    FooterSection
  });
});