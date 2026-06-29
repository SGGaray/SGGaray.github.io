import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
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
  return /*#__PURE__*/_jsxDEV("div", {
    ref: ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(16px)',
      transition: reduced ? 'none' : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style
    },
    children: children
  }, void 0, false);
};

// ── Mountain photo placeholder ─────────────────────────────────────────────────
const MountainPhoto = () => /*#__PURE__*/_jsxDEV("div", {
  style: {
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    aspectRatio: '4/3',
    position: 'relative',
    boxShadow: '0 8px 40px rgba(0,0,0,0.18)'
  },
  children: [/*#__PURE__*/_jsxDEV("img", {
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
  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '28px 16px 12px',
      background: 'linear-gradient(transparent,rgba(2,8,16,0.72))'
    },
    children: /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: 'rgba(170,205,225,0.7)',
        letterSpacing: '1.5px'
      },
      children: "Cerro Sosneado · 2025"
    }, void 0, false)
  }, void 0, false)]
}, void 0, true);

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
  return /*#__PURE__*/_jsxDEV("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        position: 'absolute',
        right: '52px',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0.16
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          color: `rgba(${r},0.45)`,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '8px',
          textAlign: 'center'
        },
        children: "Risk Matrix"
      }, void 0, false), /*#__PURE__*/_jsxDEV("svg", {
        width: tot,
        height: tot,
        children: [Array.from({
          length: N
        }, (_, row) => Array.from({
          length: N
        }, (_, col) => {
          const {
            f,
            st
          } = cell(N - 1 - row, col);
          return /*#__PURE__*/_jsxDEV("rect", {
            x: col * (CS + GAP),
            y: row * (CS + GAP),
            width: CS,
            height: CS,
            rx: 5,
            fill: f,
            stroke: st,
            strokeWidth: 1
          }, `${row}-${col}`, false);
        })), " "]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '6px'
        },
        children: ['LOW', 'LIKELIHOOD →', 'HIGH'].map(lbl => /*#__PURE__*/_jsxDEV("span", {
          style: {
            fontFamily: 'monospace',
            fontSize: '8px',
            color: `rgba(${r},0.26)`
          },
          children: lbl
        }, lbl, false))
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      style: {
        position: 'absolute',
        left: '52px',
        bottom: '72px',
        opacity: 0.14
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          color: `rgba(${r},0.44)`,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '12px'
        },
        children: "Framework Compliance"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '11px',
          width: '190px'
        },
        children: bars.map(({
          l,
          p
        }) => /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px'
            },
            children: [/*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: 'monospace',
                fontSize: '9px',
                color: `rgba(${r},0.4)`
              },
              children: l
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: 'monospace',
                fontSize: '9px',
                color: `rgba(${r},0.55)`
              },
              children: [p, "%"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            style: {
              height: '4px',
              background: `rgba(${r},0.1)`,
              borderRadius: '2px',
              overflow: 'hidden'
            },
            children: /*#__PURE__*/_jsxDEV("div", {
              style: {
                width: `${p}%`,
                height: '100%',
                background: `rgba(${r},0.62)`,
                borderRadius: '2px'
              }
            }, void 0, false)
          }, void 0, false)]
        }, l, true))
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
};

// ── Interactive Degree Card ─────────────────────────────────────────────────
const InteractiveDegreeCard = ({
  d,
  accent,
  previewHint
}) => {
  const [hov, setHov] = useState(false);
  const r = darkRgb(accent);
  return /*#__PURE__*/_jsxDEV("div", {
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
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
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
      },
      children: [/*#__PURE__*/_jsxDEV("svg", {
        width: "9",
        height: "9",
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.2",
        children: /*#__PURE__*/_jsxDEV("path", {
          d: "M8 3v10M3 8l5 5 5-5"
        }, void 0, false)
      }, void 0, false), previewHint || 'hover to preview']
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: accent,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '11px',
        opacity: 0.65
      },
      children: d.type
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        fontSize: '20px',
        color: '#daeef8',
        marginBottom: '6px',
        lineHeight: 1.3
      },
      children: d.title
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: '#6c97ab',
        marginBottom: d.period ? '4px' : '14px'
      },
      children: d.institution
    }, void 0, false), d.period && /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.42)`,
        marginBottom: '14px',
        letterSpacing: '0.3px'
      },
      children: d.period
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: `rgba(${r},0.6)`,
          boxShadow: `0 0 8px rgba(${r},0.4)`
        }
      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '11px',
          color: `rgba(${r},0.6)`
        },
        children: d.status
      }, void 0, false)]
    }, void 0, true), d.current && /*#__PURE__*/_jsxDEV("div", {
      style: {
        marginTop: '14px',
        paddingTop: '14px',
        borderTop: `1px solid rgba(${r},0.09)`,
        display: 'flex',
        gap: '9px',
        alignItems: 'flex-start'
      },
      children: [/*#__PURE__*/_jsxDEV("svg", {
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
        },
        children: [/*#__PURE__*/_jsxDEV("path", {
          d: "M4 19.5A2.5 2.5 0 016.5 17H20"
        }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
          d: "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
        style: {
          fontFamily: "'IBM Plex Sans',sans-serif",
          fontSize: '12.5px',
          color: '#5a8298',
          lineHeight: 1.5
        },
        children: d.current
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxHeight: hov ? '600px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1)'
      },
      children: /*#__PURE__*/_jsxDEV("div", {
        style: {
          borderTop: `1px solid rgba(${r},0.1)`,
          paddingTop: '20px',
          marginTop: '18px'
        },
        children: [d.desc && /*#__PURE__*/_jsxDEV("p", {
          style: {
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontSize: '13px',
            color: '#5a8298',
            lineHeight: 1.7,
            marginBottom: '18px',
            whiteSpace: 'pre-line'
          },
          children: d.desc
        }, void 0, false), d.scope && d.scope.length > 0 && /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '9px',
              color: `rgba(${r},0.35)`,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '8px'
            },
            children: d.scopeLabel || 'Alcances del título'
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px'
            },
            children: d.scope.map(s => /*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '10px',
                padding: '3px 9px',
                background: `rgba(${r},0.07)`,
                border: `1px solid rgba(${r},0.14)`,
                borderRadius: '4px',
                color: `rgba(${r},0.58)`
              },
              children: s
            }, s, false))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
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
  return /*#__PURE__*/_jsxDEV(Reveal, {
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: a,
        marginBottom: '10px'
      },
      children: label
    }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(34px,4vw,52px)',
        color: textColor,
        marginBottom: '16px',
        lineHeight: 1.08,
        letterSpacing: '-1.6px'
      },
      children: title
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        width: '48px',
        height: '2px',
        background: `linear-gradient(90deg,${a},transparent)`,
        marginBottom: '52px'
      }
    }, void 0, false)]
  }, void 0, true);
};

// ── Simple Degree Card ────────────────────────────────────────────────────────
const SimpleDegreeCard = ({
  d,
  accent
}) => {
  const r = darkRgb(accent);
  return /*#__PURE__*/_jsxDEV("div", {
    className: "hcard",
    style: {
      background: '#0a1829',
      border: `1px solid rgba(${r},0.13)`,
      borderRadius: '12px',
      padding: '28px 30px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: accent,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '11px',
        opacity: 0.65
      },
      children: d.type
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 600,
        fontSize: '20px',
        color: '#daeef8',
        marginBottom: '6px',
        lineHeight: 1.3
      },
      children: d.title
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '14px',
        color: '#6c97ab',
        marginBottom: d.period ? '4px' : '14px'
      },
      children: d.institution
    }, void 0, false), d.period && /*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        color: `rgba(${r},0.42)`,
        marginBottom: '14px',
        letterSpacing: '0.3px'
      },
      children: d.period
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: `rgba(${r},0.6)`,
          boxShadow: `0 0 8px rgba(${r},0.4)`
        }
      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '11px',
          color: `rgba(${r},0.58)`
        },
        children: d.status
      }, void 0, false)]
    }, void 0, true), d.desc && /*#__PURE__*/_jsxDEV("p", {
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
      },
      children: d.desc
    }, void 0, false), d.descSub && /*#__PURE__*/_jsxDEV("p", {
      style: {
        fontFamily: "'IBM Plex Sans',sans-serif",
        fontSize: '12px',
        color: `rgba(${r},0.38)`,
        lineHeight: 1.65,
        margin: '10px 0 0'
      },
      children: d.descSub
    }, void 0, false), d.scope && d.scope.length > 0 && /*#__PURE__*/_jsxDEV("div", {
      style: {
        marginTop: '16px',
        paddingTop: '14px',
        borderTop: `1px solid rgba(${r},0.07)`,
        flexGrow: 1
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          color: `rgba(${r},0.3)`,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '8px'
        },
        children: d.scopeLabel || 'Alcances'
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px'
        },
        children: d.scope.map(s => /*#__PURE__*/_jsxDEV("span", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '10px',
            padding: '3px 9px',
            background: `rgba(${r},0.07)`,
            border: `1px solid rgba(${r},0.14)`,
            borderRadius: '4px',
            color: `rgba(${r},0.52)`
          },
          children: s
        }, s, false))
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
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
  return /*#__PURE__*/_jsxDEV("div", {
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
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '13px'
      },
      children: [/*#__PURE__*/_jsxDEV("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          letterSpacing: '2px',
          color: '#64748b',
          textTransform: 'uppercase'
        },
        children: t.hero.panelTitle
      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px'
        },
        children: [/*#__PURE__*/_jsxDEV("span", {
          style: {
            position: 'relative',
            display: 'inline-flex',
            width: '6px',
            height: '6px'
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            style: {
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#22c55e',
              willChange: 'transform, opacity',
              animation: reduced ? 'none' : 'dotPulse 2s ease-in-out infinite'
            }
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            style: {
              position: 'relative',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 7px rgba(34,197,94,0.8)'
            }
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '9px',
            letterSpacing: '0.5px',
            color: '#94a3b8'
          },
          children: t.hero.panelStatus
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      },
      children: GRC_LAYERS.map((Lr, i) => {
        const shown = i < visible;
        const lay = layers[i];
        const isDone = done.indexOf(i) !== -1;
        const typing = shown && !isDone;
        return /*#__PURE__*/_jsxDEV("div", {
          style: {
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(12px)',
            transition: reduced ? 'none' : 'opacity 0.45s ease, transform 0.45s ease',
            background: 'rgba(' + Lr.rgb + ',0.06)',
            border: '1px solid rgba(' + Lr.rgb + ',0.28)',
            borderRadius: '9px',
            padding: '10px 12px'
          },
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '6px'
            },
            children: [/*#__PURE__*/_jsxDEV("span", {
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
              },
              children: Lr.badge
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: "'Syne',sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.5px',
                color: '#e2e8f0'
              },
              children: lay.concept
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              style: {
                marginLeft: 'auto',
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '9px',
                color: 'rgba(' + Lr.rgb + ',0.85)'
              },
              children: Lr.framework
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '10px',
              lineHeight: 1.5,
              color: '#94a3b8',
              minHeight: '30px'
            },
            children: [typed[i] || '', typing && /*#__PURE__*/_jsxDEV("span", {
              style: {
                display: 'inline-block',
                width: '6px',
                height: '11px',
                background: Lr.color,
                marginLeft: '2px',
                verticalAlign: 'middle',
                animation: 'blink 0.75s step-end infinite'
              }
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '7px'
            },
            children: [Lr.controls.map(cc => /*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '8.5px',
                color: '#64748b',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '3px',
                padding: '2px 6px'
              },
              children: cc
            }, cc, false)), /*#__PURE__*/_jsxDEV("span", {
              style: {
                marginLeft: 'auto',
                opacity: isDone ? 1 : 0,
                transition: reduced ? 'none' : 'opacity 0.3s ease',
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '9.5px',
                fontWeight: 500,
                color: Lr.color
              },
              children: lay.status
            }, void 0, false)]
          }, void 0, true)]
        }, i, true);
      })
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        marginTop: '14px'
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px'
        },
        children: [/*#__PURE__*/_jsxDEV("span", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '8.5px',
            letterSpacing: '2px',
            color: '#64748b',
            textTransform: 'uppercase'
          },
          children: t.hero.evalLabel
        }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '9px',
            color: accent
          },
          children: [progress, "%"]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        style: {
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '1px',
          overflow: 'hidden'
        },
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            height: '100%',
            width: progress + '%',
            background: accent,
            transition: reduced ? 'none' : 'width 0.5s ease',
            boxShadow: `0 0 8px rgba(${panelRgb},0.7)`
          }
        }, void 0, false)
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
};
const TICKER_ITEMS = ['COBIT 2019', 'ISO 27001', 'ITIL 4', 'ISO 38500', 'Human Risk Management', 'Gobierno de TI', 'Human Factor', 'Shadow AI', 'GRC'];
const HeroTicker = () => {
  const block = k => /*#__PURE__*/_jsxDEV("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0
    },
    children: TICKER_ITEMS.map((it, i) => /*#__PURE__*/_jsxDEV("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center'
      },
      children: [/*#__PURE__*/_jsxDEV("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          letterSpacing: '2px',
          color: '#64748b'
        },
        children: it
      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
        style: {
          color: 'rgba(6,182,212,0.4)',
          margin: '0 16px',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px'
        },
        children: "//"
      }, void 0, false)]
    }, i, true))
  }, k, false);
  return /*#__PURE__*/_jsxDEV("div", {
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
    "aria-hidden": "true",
    children: /*#__PURE__*/_jsxDEV("div", {
      style: {
        display: 'inline-flex',
        whiteSpace: 'nowrap',
        willChange: 'transform',
        animation: prefersReducedMotion() ? 'none' : 'tickerScroll 34s linear infinite'
      },
      children: [block('a'), block('b')]
    }, void 0, true)
  }, void 0, false);
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
  return /*#__PURE__*/_jsxDEV("section", {
    id: "hero",
    "data-screen-label": "01 Hero",
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: '#080f1c',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        opacity: 0.02
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 72% 62% at 50% 44%, transparent 38%, rgba(3,7,14,0.66) 100%)'
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
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
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "hero-left",
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        },
        children: [/*#__PURE__*/_jsxDEV("div", {
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
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            style: {
              position: 'relative',
              display: 'inline-flex',
              width: '7px',
              height: '7px',
              flexShrink: 0
            },
            children: [/*#__PURE__*/_jsxDEV("span", {
              style: {
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#22c55e',
                willChange: 'transform, opacity',
                animation: reduced ? 'none' : 'dotPulse 2s ease-in-out infinite'
              }
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              style: {
                position: 'relative',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px rgba(34,197,94,0.8)'
              }
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '11px',
              letterSpacing: '0.3px',
              color: '#9fc4d4'
            },
            children: t.contact.badge
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: '#06b6d4',
            marginTop: '16px',
            opacity: 0,
            animation: reduced ? 'none' : 'fadeUp 0.7s ease 0.28s forwards'
          },
          children: t.hero.differentiator
        }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
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
          },
          children: [t.hero.headlinePre, /*#__PURE__*/_jsxDEV("span", {
            style: {
              color: h
            },
            children: t.hero.headlineHi
          }, void 0, false), t.hero.headlinePost]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          style: {
            margin: '26px 0 0',
            opacity: 0,
            animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.5s forwards'
          },
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'Syne',sans-serif",
              fontWeight: 600,
              color: '#e2e8f0',
              fontSize: "30px"
            },
            children: [t.hero.firstName, " ", t.hero.lastName]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '0.75rem',
              letterSpacing: '2px',
              color: h,
              marginTop: '5px'
            },
            children: t.hero.title
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          style: {
            width: '36px',
            height: '1px',
            background: `linear-gradient(90deg, rgba(${hRgb},0.5), transparent)`,
            margin: '22px 0',
            opacity: 0,
            animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.64s forwards'
          }
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          style: {
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: '#94a3b8',
            maxWidth: '34ch',
            margin: 0,
            opacity: 0,
            animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.74s forwards'
          },
          children: t.hero.tagline2
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          style: {
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '30px',
            opacity: 0,
            animation: reduced ? 'none' : 'fadeUp 0.6s ease 0.88s forwards'
          },
          children: [/*#__PURE__*/_jsxDEV("a", {
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
            },
            children: t.hero.cta1
          }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
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
            },
            children: t.hero.cta2
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV(GRCAssessmentPanel, {
        t: t,
        accent: h
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
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
      "aria-hidden": "true",
      children: [/*#__PURE__*/_jsxDEV("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px',
          letterSpacing: '2.5px',
          color: 'rgba(148,163,184,0.38)',
          textTransform: 'uppercase'
        },
        children: t.hero.scroll
      }, void 0, false), /*#__PURE__*/_jsxDEV("svg", {
        width: "14",
        height: "22",
        viewBox: "0 0 14 22",
        fill: "none",
        style: {
          animation: reduced ? 'none' : 'scrollPulse 2.2s ease-in-out infinite'
        },
        children: [/*#__PURE__*/_jsxDEV("rect", {
          x: "1",
          y: "1",
          width: "12",
          height: "18",
          rx: "6",
          stroke: "rgba(148,163,184,0.25)",
          strokeWidth: "1.5",
          fill: "none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
          x: "6",
          y: "5",
          width: "2",
          height: "5",
          rx: "1",
          fill: "rgba(148,163,184,0.4)",
          style: {
            animation: reduced ? 'none' : 'scrollPulse 2.2s ease-in-out infinite'
          }
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV(HeroTicker, {}, void 0, false)]
  }, void 0, true);
};

// ── ABOUT ─────────────────────────────────────────────────────────────────────
const AboutSection = ({
  t,
  accent
}) => {
  const a = la(accent);
  const r = lightRgb(accent);
  return /*#__PURE__*/_jsxDEV("section", {
    id: "about",
    "data-screen-label": "02 About",
    style: {
      position: 'relative',
      padding: '120px 0',
      background: '#f7f9fb',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        opacity: 0.4
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      },
      children: [/*#__PURE__*/_jsxDEV(SectionHead, {
        label: t.about.label,
        title: t.about.heading,
        accent: accent,
        theme: "light"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "two-col",
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '80px',
          alignItems: 'start'
        },
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [t.about.bio.map((p, i) => /*#__PURE__*/_jsxDEV(Reveal, {
            delay: i * 0.09,
            children: /*#__PURE__*/_jsxDEV("p", {
              style: {
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontSize: '16px',
                color: '#284252',
                lineHeight: 1.8,
                marginBottom: '22px'
              },
              children: p
            }, void 0, false)
          }, i, false)), /*#__PURE__*/_jsxDEV(Reveal, {
            delay: 0.5,
            children: /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '9px',
                marginTop: '32px'
              },
              children: ['ISO 27001', 'COBIT 2019', 'GRC', 'Behavioral Security', 'AI Governance', 'Risk Management'].map(tag => /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '11px',
                  padding: '4px 12px',
                  background: `rgba(${r},0.07)`,
                  border: `1px solid rgba(${r},0.2)`,
                  borderRadius: '4px',
                  color: a,
                  letterSpacing: '0.3px'
                },
                children: tag
              }, tag, false))
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV(Reveal, {
            delay: 0.1,
            children: /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '22px'
              },
              children: [/*#__PURE__*/_jsxDEV("image-slot", {
                id: "profile-photo",
                shape: "circle",
                placeholder: "Drop your profile photo here",
                style: {
                  width: '88px',
                  height: '88px',
                  marginBottom: '10px'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontFamily: "'IBM Plex Sans',sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#0d2233'
                },
                children: "Sebastian Garay"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '10px',
                  color: `rgba(${r},0.55)`,
                  letterSpacing: '0.5px',
                  marginTop: '3px'
                },
                children: "GRC · Behavioral Security"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
            delay: 0.2,
            children: /*#__PURE__*/_jsxDEV(MountainPhoto, {}, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '14px'
            },
            children: [/*#__PURE__*/_jsxDEV(Reveal, {
              delay: 0.3,
              children: /*#__PURE__*/_jsxDEV("div", {
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
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
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
                  },
                  children: /*#__PURE__*/_jsxDEV("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: a,
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: /*#__PURE__*/_jsxDEV("path", {
                      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    }, void 0, false)
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    minWidth: 0
                  },
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontFamily: "'IBM Plex Sans',sans-serif",
                      fontWeight: 700,
                      fontSize: '13px',
                      color: '#0d2233',
                      marginBottom: '2px',
                      lineHeight: 1.3
                    },
                    children: t.about.highlights[0].label
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '10px',
                      color: `rgba(${r},0.6)`
                    },
                    children: t.about.highlights[0].sub
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    marginLeft: 'auto',
                    flexShrink: 0
                  },
                  children: /*#__PURE__*/_jsxDEV("span", {
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
                    },
                    children: "ACTIVE"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
              delay: 0.38,
              children: /*#__PURE__*/_jsxDEV("div", {
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
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
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
                  },
                  children: /*#__PURE__*/_jsxDEV("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: a,
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [/*#__PURE__*/_jsxDEV("path", {
                      d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                      cx: "9",
                      cy: "7",
                      r: "4"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                      d: "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    }, void 0, false)]
                  }, void 0, true)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    minWidth: 0
                  },
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontFamily: "'IBM Plex Sans',sans-serif",
                      fontWeight: 700,
                      fontSize: '13px',
                      color: '#0d2233',
                      marginBottom: '2px',
                      lineHeight: 1.3
                    },
                    children: t.about.highlights[1].label
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '10px',
                      color: `rgba(${r},0.6)`
                    },
                    children: t.about.highlights[1].sub
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    marginLeft: 'auto',
                    flexShrink: 0
                  },
                  children: /*#__PURE__*/_jsxDEV("span", {
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
                    },
                    children: t.about.highlights[1].badge
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
              delay: 0.46,
              children: /*#__PURE__*/_jsxDEV("div", {
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
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
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
                  },
                  children: /*#__PURE__*/_jsxDEV("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: a,
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [/*#__PURE__*/_jsxDEV("rect", {
                      x: "3",
                      y: "3",
                      width: "7",
                      height: "7"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      x: "14",
                      y: "3",
                      width: "7",
                      height: "7"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                      x: "14",
                      y: "14",
                      width: "7",
                      height: "7"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                      d: "M3 17l2 2 4-4"
                    }, void 0, false)]
                  }, void 0, true)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    minWidth: 0,
                    flexGrow: 1
                  },
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontFamily: "'IBM Plex Sans',sans-serif",
                      fontWeight: 700,
                      fontSize: '13px',
                      color: '#0d2233',
                      marginBottom: '6px'
                    },
                    children: t.about.highlights[2].label
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    style: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '5px'
                    },
                    children: t.about.highlights[2].sub.split(' · ').map(f => /*#__PURE__*/_jsxDEV("span", {
                      style: {
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: '10px',
                        padding: '2px 8px',
                        background: `rgba(${r},0.1)`,
                        border: `1px solid rgba(${r},0.22)`,
                        borderRadius: '3px',
                        color: a
                      },
                      children: f
                    }, f, false))
                  }, void 0, false), t.about.highlights[2].note && /*#__PURE__*/_jsxDEV("div", {
                    style: {
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '11px',
                      color: '#64748b',
                      marginTop: '8px',
                      lineHeight: 1.6
                    },
                    children: t.about.highlights[2].note
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true)]
  }, void 0, true);
};

// ── EDUCATION ─────────────────────────────────────────────────────────────────
const EducationSection = ({
  t,
  accent
}) => {
  const r = darkRgb(accent);
  return /*#__PURE__*/_jsxDEV("section", {
    id: "education",
    "data-screen-label": "03 Education",
    style: {
      position: 'relative',
      padding: '120px 0',
      background: '#0c1825',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsxDEV(ComplianceRing, {
      label: "ISO 27001",
      pct: 82,
      accent: accent,
      opacity: 0.14,
      style: {
        top: '70px',
        right: '72px'
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV(RiskMatrix, {
      accent: accent,
      opacity: 0.14,
      style: {
        bottom: '70px',
        left: '52px'
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV(AuditTrail, {
      accent: accent,
      opacity: 0.12,
      style: {
        top: '160px',
        right: '260px'
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      },
      children: [/*#__PURE__*/_jsxDEV(SectionHead, {
        label: t.education.label,
        title: t.education.heading,
        accent: accent,
        theme: "dark"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          marginBottom: '34px'
        },
        children: [/*#__PURE__*/_jsxDEV(Reveal, {
          delay: 0,
          children: /*#__PURE__*/_jsxDEV(InteractiveDegreeCard, {
            d: t.education.degrees[0],
            accent: accent,
            previewHint: t.education.previewHint
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "deg-grid",
          style: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '22px'
          },
          children: [/*#__PURE__*/_jsxDEV(Reveal, {
            delay: 0.1,
            children: /*#__PURE__*/_jsxDEV(SimpleDegreeCard, {
              d: t.education.degrees[1],
              accent: accent
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
            delay: 0.2,
            children: /*#__PURE__*/_jsxDEV(SimpleDegreeCard, {
              d: t.education.degrees[2],
              accent: accent
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.2,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '10px',
            color: `rgba(${r},0.4)`,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '18px'
          },
          children: t.education.certsLabel
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(252px,1fr))',
          gap: '13px'
        },
        children: t.education.certs.map((c, i) => {
          const isCisco = c.issuer === 'Cisco';
          const isIBM = c.issuer === 'IBM SkillsBuild';
          const accentBorder = isCisco || isIBM;
          const certIcon = isCisco ? /*#__PURE__*/_jsxDEV("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: accent,
            strokeWidth: "1.6",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [/*#__PURE__*/_jsxDEV("circle", {
              cx: "12",
              cy: "12",
              r: "9"
            }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
              cx: "12",
              cy: "12",
              r: "3.4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
              d: "M12 1v4M12 19v4M1 12h4M19 12h4"
            }, void 0, false)]
          }, void 0, true) : isIBM ? /*#__PURE__*/_jsxDEV("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: accent,
            strokeWidth: "1.6",
            strokeLinecap: "round",
            children: [/*#__PURE__*/_jsxDEV("rect", {
              x: "2",
              y: "7",
              width: "20",
              height: "3"
            }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
              x: "2",
              y: "14",
              width: "20",
              height: "3"
            }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
              x: "5",
              y: "4",
              width: "14",
              height: "3"
            }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
              x: "5",
              y: "17",
              width: "14",
              height: "3"
            }, void 0, false)]
          }, void 0, true) : /*#__PURE__*/_jsxDEV("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 16 16",
            fill: "none",
            children: /*#__PURE__*/_jsxDEV("path", {
              d: "M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z",
              stroke: accent,
              strokeWidth: "1",
              strokeOpacity: "0.62",
              fill: "none"
            }, void 0, false)
          }, void 0, false);
          return /*#__PURE__*/_jsxDEV(Reveal, {
            delay: 0.1 + i * 0.07,
            children: /*#__PURE__*/_jsxDEV("div", {
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
              },
              children: [/*#__PURE__*/_jsxDEV("div", {
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
                },
                children: certIcon
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                style: {
                  minWidth: 0
                },
                children: [/*#__PURE__*/_jsxDEV("div", {
                  style: {
                    fontFamily: "'IBM Plex Sans',sans-serif",
                    fontWeight: 600,
                    fontSize: '13px',
                    color: accentBorder ? '#daeef8' : '#c0dcec',
                    marginBottom: '4px',
                    lineHeight: 1.35
                  },
                  children: c.name
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: '10px',
                    color: `rgba(${r},${accentBorder ? '0.6' : '0.4'})`
                  },
                  children: [c.issuer, c.date ? ` · ${c.date}` : '']
                }, void 0, true), c.skills && /*#__PURE__*/_jsxDEV("div", {
                  style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    marginTop: '9px'
                  },
                  children: c.skills.map(s => /*#__PURE__*/_jsxDEV("span", {
                    style: {
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '9px',
                      padding: '2px 7px',
                      background: `rgba(${r},0.1)`,
                      border: `1px solid rgba(${r},0.22)`,
                      borderRadius: '3px',
                      color: accent
                    },
                    children: s
                  }, s, false))
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, i, false);
        })
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.5,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '36px'
          },
          children: /*#__PURE__*/_jsxDEV("a", {
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
            },
            children: [/*#__PURE__*/_jsxDEV("svg", {
              width: "13",
              height: "13",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [/*#__PURE__*/_jsxDEV("circle", {
                cx: "12",
                cy: "8",
                r: "5"
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                d: "M9 11l-4 10 7-3 7 3-4-10"
              }, void 0, false)]
            }, void 0, true), t.education.credlyLabel, "            "]
          }, void 0, true)
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.2,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '10px',
            color: `rgba(${r},0.4)`,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            margin: '56px 0 18px'
          },
          children: t.education.membershipLabel
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.28,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            background: `rgba(${r},0.04)`,
            border: `1px solid rgba(${r},0.18)`,
            borderRadius: '12px',
            padding: '24px 26px',
            display: 'flex',
            gap: '18px',
            alignItems: 'flex-start',
            boxShadow: `0 0 18px rgba(${r},0.05)`
          },
          children: [/*#__PURE__*/_jsxDEV("div", {
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
            },
            children: /*#__PURE__*/_jsxDEV("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: accent,
              strokeWidth: "1.6",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [/*#__PURE__*/_jsxDEV("path", {
                d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                cx: "9",
                cy: "7",
                r: "4"
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                d: "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              minWidth: 0,
              flexGrow: 1
            },
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '8px'
              },
              children: [/*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 600,
                  fontSize: '19px',
                  color: '#daeef8'
                },
                children: t.education.membership.org
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: "'IBM Plex Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  color: accent
                },
                children: t.education.membership.role
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                style: {
                  marginLeft: 'auto',
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '10px',
                  color: `rgba(${r},0.5)`,
                  whiteSpace: 'nowrap'
                },
                children: t.education.membership.period
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              style: {
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontSize: '14px',
                color: '#6c97ab',
                lineHeight: 1.7,
                margin: 0
              },
              children: t.education.membership.desc
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.2,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '10px',
            color: `rgba(${r},0.4)`,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            margin: '46px 0 18px'
          },
          children: t.education.activitiesLabel
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))',
          gap: '16px'
        },
        children: t.education.activities.map((act, i) => /*#__PURE__*/_jsxDEV(Reveal, {
          delay: 0.28 + i * 0.08,
          children: /*#__PURE__*/_jsxDEV("div", {
            style: {
              background: '#0a1829',
              border: `1px solid rgba(${r},0.12)`,
              borderRadius: '12px',
              padding: '24px 26px'
            },
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                flexWrap: 'wrap'
              },
              children: [/*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '10px',
                  padding: '3px 10px',
                  background: `rgba(${r},0.07)`,
                  border: `1px solid rgba(${r},0.16)`,
                  borderRadius: '4px',
                  color: accent
                },
                children: act.category
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
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
                },
                children: [/*#__PURE__*/_jsxDEV("span", {
                  style: {
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#7fb0e0',
                    boxShadow: '0 0 7px rgba(127,176,224,0.7)'
                  }
                }, void 0, false), act.status]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: "'Syne',sans-serif",
                fontWeight: 600,
                fontSize: '19px',
                color: '#daeef8',
                lineHeight: 1.3,
                marginBottom: '8px'
              },
              children: act.title
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '10px',
                color: `rgba(${r},0.5)`,
                marginBottom: '12px'
              },
              children: act.date
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              style: {
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontSize: '14px',
                color: '#6c97ab',
                lineHeight: 1.7,
                margin: 0
              },
              children: act.desc
            }, void 0, false)]
          }, void 0, true)
        }, i, false))
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
};

// ── PROJECTS ──────────────────────────────────────────────────────────────────
const ProjectsSection = ({
  t,
  accent
}) => {
  const r = darkRgb(accent);
  return /*#__PURE__*/_jsxDEV("section", {
    id: "projects",
    "data-screen-label": "04 Projects",
    style: {
      position: 'relative',
      padding: '120px 0',
      background: '#11212f',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsxDEV(HexGridBg, {
      accent: accent,
      opacity: 0.03,
      style: {
        position: 'absolute',
        inset: 0
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV(ProjectsDashboardBg, {
      accent: accent
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      },
      children: [/*#__PURE__*/_jsxDEV(SectionHead, {
        label: t.projects.label,
        title: t.projects.heading,
        accent: accent,
        theme: "dark"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(286px,1fr))',
          gap: '22px'
        },
        children: t.projects.items.slice(0, 2).map((p, i) => /*#__PURE__*/_jsxDEV(Reveal, {
          delay: i * 0.1,
          children: /*#__PURE__*/_jsxDEV("article", {
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
            },
            children: [/*#__PURE__*/_jsxDEV("div", {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px'
              },
              children: [/*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '10px',
                  padding: '3px 10px',
                  background: `rgba(${r},0.07)`,
                  border: `1px solid rgba(${r},0.15)`,
                  borderRadius: '4px',
                  color: accent
                },
                children: p.category
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '10px',
                  color: `rgba(${r},0.3)`
                },
                title: "Professional Work Development Context",
                children: p.client
              }, void 0, false)]
            }, void 0, true), p.riskLevel && (() => {
              const lvl = {
                CRITICAL: ['rgba(200,30,30,0.14)', 'rgba(205,40,40,0.35)', 'rgba(255,85,85,0.85)'],
                HIGH: ['rgba(220,100,0,0.12)', 'rgba(220,100,0,0.3)', 'rgba(255,145,60,0.85)'],
                MEDIUM: ['rgba(195,170,0,0.1)', 'rgba(200,170,0,0.25)', 'rgba(215,190,55,0.85)']
              };
              const [bg, brd, clr] = lvl[p.riskLevel] || lvl.MEDIUM;
              return /*#__PURE__*/_jsxDEV("div", {
                style: {
                  marginBottom: '10px'
                },
                children: /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: '10px',
                    padding: '3px 10px',
                    background: bg,
                    border: `1px solid ${brd}`,
                    borderRadius: '4px',
                    color: clr,
                    letterSpacing: '0.5px'
                  },
                  children: ["RISK: ", p.riskLevel, p.riskScore ? ` · ${p.riskScore}` : '']
                }, void 0, true)
              }, void 0, false);
            })(), /*#__PURE__*/_jsxDEV("div", {
              style: {
                fontFamily: "'Syne',sans-serif",
                fontWeight: 600,
                fontSize: '18px',
                color: '#daeef8',
                marginBottom: '10px',
                lineHeight: 1.32
              },
              children: p.title
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              style: {
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontSize: '14px',
                color: '#6c97ab',
                lineHeight: 1.7,
                flexGrow: 1,
                marginBottom: '16px'
              },
              children: p.desc
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              },
              children: p.tags.map(tag => /*#__PURE__*/_jsxDEV("span", {
                style: {
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '10px',
                  padding: '3px 9px',
                  background: `rgba(${r},0.05)`,
                  border: `1px solid rgba(${r},0.12)`,
                  borderRadius: '4px',
                  color: `rgba(${r},0.52)`
                },
                children: tag
              }, tag, false))
            }, void 0, false)]
          }, void 0, true)
        }, i, false))
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.2,
        children: /*#__PURE__*/_jsxDEV("p", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '11px',
            color: `rgba(${r},0.4)`,
            marginTop: '20px',
            letterSpacing: '1px'
          },
          children: t.projects.moreSoon
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.2,
        children: /*#__PURE__*/_jsxDEV("p", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '10px',
            color: `rgba(${r},0.28)`,
            marginTop: '28px',
            letterSpacing: '0.3px'
          },
          children: t.projects.pwdcNote
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.35,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            textAlign: 'center',
            marginTop: '28px'
          },
          children: /*#__PURE__*/_jsxDEV("a", {
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
            },
            children: [/*#__PURE__*/_jsxDEV(GithubMark, {
              size: 13,
              fill: "currentColor"
            }, void 0, false), t.projects.viewAll, " →"]
          }, void 0, true)
        }, void 0, false)
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
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
    return /*#__PURE__*/_jsxDEV(Reveal, {
      delay: i * 0.08,
      children: /*#__PURE__*/_jsxDEV("article", {
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
        },
        children: [/*#__PURE__*/_jsxDEV("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '10px',
              padding: '3px 10px',
              background: `rgba(${r},0.08)`,
              border: `1px solid rgba(${r},0.18)`,
              borderRadius: '4px',
              color: a
            },
            children: ar.type
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            },
            children: [/*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '10px',
                color: `rgba(${r},0.32)`
              },
              children: ar.date
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '9px',
                padding: '2px 8px',
                border: `1px solid rgba(${r},0.2)`,
                borderRadius: '3px',
                color: `rgba(${r},0.45)`,
                letterSpacing: '1px'
              },
              children: ar.status
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          style: {
            fontFamily: "'Syne',sans-serif",
            fontWeight: 600,
            fontSize: '19px',
            color: '#0d1e2e',
            lineHeight: 1.38
          },
          children: ar.title
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          style: {
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontSize: '14px',
            color: '#3a5a6a',
            lineHeight: 1.72
          },
          children: ar.excerpt
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2px'
          },
          children: [/*#__PURE__*/_jsxDEV("span", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '10px',
              color: `rgba(${r},0.36)`
            },
            children: ar.readTime
          }, void 0, false), !isPublished && /*#__PURE__*/_jsxDEV("span", {
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '10px',
              color: `rgba(${r},0.38)`
            },
            children: [/*#__PURE__*/_jsxDEV("svg", {
              width: "10",
              height: "10",
              viewBox: "0 0 16 16",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
              children: [/*#__PURE__*/_jsxDEV("rect", {
                x: "3",
                y: "7",
                width: "10",
                height: "8",
                rx: "1.5"
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                d: "M5 7V5a3 3 0 016 0v2"
              }, void 0, false)]
            }, void 0, true), t.articles.notPublished]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, i, false);
  };
  const CatLabel = ({
    children
  }) => /*#__PURE__*/_jsxDEV(Reveal, {
    children: /*#__PURE__*/_jsxDEV("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '22px'
      },
      children: [/*#__PURE__*/_jsxDEV("span", {
        style: {
          width: '24px',
          height: '2px',
          background: a,
          borderRadius: '1px'
        }
      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
        style: {
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '11px',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: a
        },
        children: children
      }, void 0, false)]
    }, void 0, true)
  }, void 0, false);
  return /*#__PURE__*/_jsxDEV("section", {
    id: "blog",
    "data-screen-label": "05 Articles",
    style: {
      position: 'relative',
      padding: '120px 0',
      background: '#f0f5f9',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.04) 1px,transparent 1px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
        opacity: 0.65
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      },
      children: [/*#__PURE__*/_jsxDEV(SectionHead, {
        label: t.articles.label,
        title: t.articles.heading,
        accent: accent,
        theme: "light"
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            background: `rgba(${r},0.06)`,
            border: `1px solid rgba(${r},0.16)`,
            borderRadius: '10px',
            marginBottom: '44px'
          },
          children: [/*#__PURE__*/_jsxDEV("svg", {
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
            },
            children: [/*#__PURE__*/_jsxDEV("path", {
              d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
            }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
              d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
            style: {
              fontFamily: "'IBM Plex Sans',sans-serif",
              fontSize: '14px',
              color: a,
              lineHeight: 1.5
            },
            children: t.articles.comingSoonNote
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false), /*#__PURE__*/_jsxDEV(CatLabel, {
        children: t.articles.cat1Label
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))',
          gap: '24px'
        },
        children: t.articles.items.slice(0, 1).map(renderCard)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.2,
        children: /*#__PURE__*/_jsxDEV("p", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '11px',
            color: '#64748b',
            marginTop: '24px',
            letterSpacing: '1px'
          },
          children: t.articles.moreSoon
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.3,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            textAlign: 'center',
            marginTop: '48px'
          },
          children: /*#__PURE__*/_jsxDEV("span", {
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
            },
            children: [t.articles.viewAll, " — coming soon"]
          }, void 0, true)
        }, void 0, false)
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
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
    icon: /*#__PURE__*/_jsxDEV("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: accent,
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      opacity: "0.85",
      children: [/*#__PURE__*/_jsxDEV("rect", {
        x: "2",
        y: "4",
        width: "20",
        height: "16",
        rx: "2"
      }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
        d: "M2 7l10 7 10-7"
      }, void 0, false)]
    }, void 0, true)
  }, {
    href: 'https://www.linkedin.com/in/sebastian-garay/',
    label: 'linkedin.com/in/sebastian-garay',
    sub: 'LinkedIn',
    external: true,
    icon: /*#__PURE__*/_jsxDEV("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: accent,
      opacity: "0.85",
      children: [/*#__PURE__*/_jsxDEV("path", {
        d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
      }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
        x: "2",
        y: "9",
        width: "4",
        height: "12"
      }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
        cx: "4",
        cy: "4",
        r: "2"
      }, void 0, false)]
    }, void 0, true)
  }, {
    href: 'https://github.com/SGGaray',
    label: 'github.com/SGGaray',
    sub: 'GitHub',
    external: true,
    icon: /*#__PURE__*/_jsxDEV(GithubMark, {
      size: 16,
      fill: accent,
      opacity: 0.85
    }, void 0, false)
  }];
  return /*#__PURE__*/_jsxDEV("section", {
    id: "contact",
    "data-screen-label": "06 Contact",
    style: {
      position: 'relative',
      padding: '120px 0 80px',
      background: '#0d1622',
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/_jsxDEV(HexGridBg, {
      accent: accent,
      opacity: 0.028,
      style: {
        position: 'absolute',
        inset: 0
      }
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxWidth: '760px',
        margin: '0 auto',
        padding: '0 52px',
        position: 'relative',
        zIndex: 2
      },
      children: [/*#__PURE__*/_jsxDEV(SectionHead, {
        label: t.contact.label,
        title: t.contact.heading,
        accent: accent,
        theme: "dark"
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        children: /*#__PURE__*/_jsxDEV("p", {
          style: {
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontSize: '17px',
            lineHeight: 1.7,
            color: '#8ab4c6',
            maxWidth: '600px',
            margin: '0 auto 36px',
            textAlign: 'center'
          },
          children: t.contact.availability
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.15,
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "contact-links",
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '36px'
          },
          children: items.map(({
            href,
            label,
            sub,
            icon,
            external
          }, idx) => {
            const primary = idx === 0;
            const display = primary ? label : sub;
            return /*#__PURE__*/_jsxDEV(React.Fragment, {
              children: [idx > 0 && /*#__PURE__*/_jsxDEV("span", {
                className: "contact-sep",
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  color: `rgba(${r},0.3)`,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '18px',
                  lineHeight: 1
                },
                children: "·"
              }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
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
                },
                children: [primary && /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    position: 'relative',
                    display: 'inline-flex',
                    width: '7px',
                    height: '7px',
                    flexShrink: 0
                  },
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    style: {
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: '#22c55e',
                      animation: prefersReducedMotion() ? 'none' : 'dotPulse 2s ease-in-out infinite'
                    }
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    style: {
                      position: 'relative',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 8px rgba(34,197,94,0.8)'
                    }
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    display: 'inline-flex',
                    flexShrink: 0
                  },
                  children: icon
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  style: {
                    wordBreak: 'break-all'
                  },
                  children: display
                }, void 0, false)]
              }, void 0, true)]
            }, sub, true);
          })
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV(Reveal, {
        delay: 0.25,
        children: /*#__PURE__*/_jsxDEV("div", {
          style: {
            maxWidth: '360px',
            margin: '0 auto',
            background: '#0a1829',
            border: `1px solid rgba(${r},0.1)`,
            borderRadius: '12px',
            padding: '22px',
            textAlign: 'center'
          },
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '10px',
              color: `rgba(${r},0.38)`,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '10px'
            },
            children: t.contact.locationLabel
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            },
            children: [/*#__PURE__*/_jsxDEV("svg", {
              width: "13",
              height: "13",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: accent,
              strokeWidth: "2",
              strokeOpacity: "0.55",
              children: [/*#__PURE__*/_jsxDEV("path", {
                d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                cx: "12",
                cy: "9",
                r: "2.5"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              style: {
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontSize: '15px',
                color: '#8ab4c6'
              },
              children: "Buenos Aires, Argentina · AMBA"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
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
    icon: /*#__PURE__*/_jsxDEV("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: accent,
      opacity: "0.8",
      children: [/*#__PURE__*/_jsxDEV("path", {
        d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
      }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
        x: "2",
        y: "9",
        width: "4",
        height: "12"
      }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
        cx: "4",
        cy: "4",
        r: "2"
      }, void 0, false)]
    }, void 0, true)
  }, {
    href: 'https://github.com/SGGaray',
    label: 'GitHub',
    external: true,
    icon: /*#__PURE__*/_jsxDEV(GithubMark, {
      size: 15,
      fill: accent,
      opacity: 0.8
    }, void 0, false)
  }, {
    href: `mailto:${t.contact.email}`,
    label: t.contact.email,
    external: false,
    icon: /*#__PURE__*/_jsxDEV("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: accent,
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      opacity: "0.8",
      children: [/*#__PURE__*/_jsxDEV("rect", {
        x: "2",
        y: "4",
        width: "20",
        height: "16",
        rx: "2"
      }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
        d: "M2 7l10 7 10-7"
      }, void 0, false)]
    }, void 0, true)
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
  return /*#__PURE__*/_jsxDEV("footer", {
    style: {
      background: '#0d1622',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 0 40px'
    },
    children: /*#__PURE__*/_jsxDEV("div", {
      style: {
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '0 52px'
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "footer-grid",
        style: {
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: '48px'
        },
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: '34px',
              color: accent,
              lineHeight: 1,
              marginBottom: '14px'
            },
            children: "SG"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'IBM Plex Sans',sans-serif",
              fontWeight: 500,
              fontSize: '15px',
              color: '#e2e8f0',
              marginBottom: '5px'
            },
            children: "Sebastian Garay"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '11px',
              color: `rgba(${r},0.34)`,
              letterSpacing: '0.5px'
            },
            children: t.footer.role
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: colTitle,
            children: t.footer.navTitle
          }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '11px'
            },
            children: navLinks.map(([id, label]) => /*#__PURE__*/_jsxDEV("a", {
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
              },
              children: label
            }, id, false))
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("div", {
            style: colTitle,
            children: t.footer.linksTitle
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            },
            children: extLinks.map(({
              href,
              label,
              icon,
              external
            }) => /*#__PURE__*/_jsxDEV("a", {
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
              },
              children: [/*#__PURE__*/_jsxDEV("span", {
                style: {
                  display: 'inline-flex',
                  flexShrink: 0
                },
                children: icon
              }, void 0, false), label]
            }, label, true))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        style: {
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.06)'
        },
        children: /*#__PURE__*/_jsxDEV("span", {
          style: {
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '11px',
            color: `rgba(${r},0.28)`,
            letterSpacing: '0.5px'
          },
          children: t.footer.copyright
        }, void 0, false)
      }, void 0, false)]
    }, void 0, true)
  }, void 0, false);
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