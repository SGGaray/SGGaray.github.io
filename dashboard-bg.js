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
    global.dashboardBg = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // dashboard-bg.jsx — Decorative GRC background elements
  const {
    useState,
    useEffect,
    useRef
  } = React;

  // ── Centralized accent → rgb (handles any hex, not just 3 presets) ──────────
  const ACCENT_RGB = {
    '#00d4ff': '0,212,255',
    '#9b4dff': '155,77,255',
    '#00dc6e': '0,220,110'
  };
  const accentRgb = hex => {
    if (!hex || typeof hex !== 'string') return '0,212,255';
    if (ACCENT_RGB[hex]) return ACCENT_RGB[hex];
    const c = hex.replace('#', '');
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? '0,212,255' : `${r},${g},${b}`;
  };
  window.accentRgb = accentRgb;

  // ── Shared GitHub mark (single source — was inlined 3× across files) ─────────
  const GithubMark = ({
    size = 15,
    fill = 'currentColor',
    opacity,
    style
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    opacity: opacity,
    style: style,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
  }));
  window.GithubMark = GithubMark;
  const useInView = (threshold = 0.15) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setVisible(true);
      }, {
        threshold
      });
      obs.observe(el);
      return () => obs.disconnect();
    }, []);
    return [ref, visible];
  };
  const RiskMatrix = ({
    accent = '#00d4ff',
    opacity = 0.13,
    style = {}
  }) => {
    const [ref, visible] = useInView(0.1);
    const getCell = (r, c) => {
      const score = (r + 1) * (c + 1);
      if (score <= 3) return {
        fill: 'rgba(0,180,60,0.18)',
        stroke: 'rgba(0,200,80,0.35)'
      };
      if (score <= 8) return {
        fill: 'rgba(200,180,0,0.15)',
        stroke: 'rgba(220,200,0,0.3)'
      };
      if (score <= 15) return {
        fill: 'rgba(220,100,0,0.15)',
        stroke: 'rgba(240,120,0,0.3)'
      };
      return {
        fill: 'rgba(200,20,20,0.18)',
        stroke: 'rgba(220,40,40,0.35)'
      };
    };
    const SIZE = 34,
      GAP = 4,
      N = 5;
    const total = N * (SIZE + GAP);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        position: 'absolute',
        opacity: visible ? opacity : 0,
        transition: 'opacity 1.4s ease',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px',
        color: `rgba(${accentRgb(accent)},0.35)`,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '8px'
      }
    }, "Risk Matrix"), /*#__PURE__*/React.createElement("svg", {
      width: total,
      height: total,
      viewBox: `0 0 ${total} ${total}`
    }, Array.from({
      length: N
    }, (_, row) => Array.from({
      length: N
    }, (_, col) => {
      const {
        fill,
        stroke
      } = getCell(N - 1 - row, col);
      const delay = ((N - 1 - row) * N + col) * 0.04;
      return /*#__PURE__*/React.createElement("rect", {
        key: `${row}-${col}`,
        x: col * (SIZE + GAP),
        y: row * (SIZE + GAP),
        width: SIZE,
        height: SIZE,
        rx: 3,
        fill: fill,
        stroke: stroke,
        strokeWidth: 0.8,
        opacity: visible ? 1 : 0,
        style: {
          transition: `opacity 0.35s ease ${delay + 0.3}s`
        }
      });
    })), /*#__PURE__*/React.createElement("text", {
      x: total / 2,
      y: total + 14,
      textAnchor: "middle",
      fill: "rgba(0,212,255,0.2)",
      fontSize: "7",
      fontFamily: "monospace"
    }, "LIKELIHOOD →"), /*#__PURE__*/React.createElement("text", {
      transform: `rotate(-90) translate(-${total / 2}, -8)`,
      textAnchor: "middle",
      fill: "rgba(0,212,255,0.2)",
      fontSize: "7",
      fontFamily: "monospace"
    }, "IMPACT ↑")));
  };
  const ComplianceRing = ({
    label = 'ISO 27001',
    pct = 82,
    accent = '#00d4ff',
    opacity = 0.11,
    style = {}
  }) => {
    const [ref, visible] = useInView(0.1);
    const R = 58,
      CX = 70,
      CY = 70,
      circ = 2 * Math.PI * R;
    const offset = circ * (1 - pct / 100);
    const rgb = accentRgb(accent);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        position: 'absolute',
        opacity: visible ? opacity : 0,
        transition: 'opacity 1.6s ease',
        ...style
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: CX * 2,
      height: CY * 2,
      viewBox: `0 0 ${CX * 2} ${CY * 2}`
    }, /*#__PURE__*/React.createElement("circle", {
      cx: CX,
      cy: CY,
      r: R,
      fill: "none",
      stroke: `rgba(${rgb},0.08)`,
      strokeWidth: 5
    }), /*#__PURE__*/React.createElement("circle", {
      cx: CX,
      cy: CY,
      r: R,
      fill: "none",
      stroke: `rgba(${rgb},0.7)`,
      strokeWidth: 5,
      strokeLinecap: "round",
      strokeDasharray: circ,
      strokeDashoffset: visible ? offset : circ,
      style: {
        transformOrigin: `${CX}px ${CY}px`,
        transform: 'rotate(-90deg)',
        transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1) 0.4s'
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: CX,
      y: CY - 6,
      textAnchor: "middle",
      fill: `rgba(${rgb},0.65)`,
      fontSize: "18",
      fontFamily: "'JetBrains Mono',monospace",
      fontWeight: "500"
    }, pct, "%"), /*#__PURE__*/React.createElement("text", {
      x: CX,
      y: CY + 12,
      textAnchor: "middle",
      fill: `rgba(${rgb},0.3)`,
      fontSize: "8",
      fontFamily: "monospace",
      letterSpacing: "1.5"
    }, label)));
  };
  const AuditTrail = ({
    accent = '#00d4ff',
    opacity = 0.12,
    style = {}
  }) => {
    const [ref, visible] = useInView(0.1);
    const steps = [{
      label: 'Scope Definition',
      done: true
    }, {
      label: 'Risk Assessment',
      done: true
    }, {
      label: 'Control Review',
      done: true
    }, {
      label: 'Gap Analysis',
      active: true
    }, {
      label: 'Remediation Plan',
      done: false
    }, {
      label: 'Management Sign-off',
      done: false
    }];
    const rgb = accentRgb(accent);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        position: 'absolute',
        opacity: visible ? opacity : 0,
        transition: 'opacity 1.2s ease',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: `rgba(${rgb},0.35)`,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '10px'
      }
    }, "Audit Trail"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '9px'
      }
    }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.4s ease ${0.3 + i * 0.09}s`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        flexShrink: 0,
        background: s.done ? `rgba(${rgb},0.7)` : s.active ? 'rgba(255,170,60,0.7)' : 'transparent',
        border: `1.5px solid ${s.done ? `rgba(${rgb},0.7)` : s.active ? 'rgba(255,170,60,0.7)' : `rgba(${rgb},0.2)`}`,
        boxShadow: s.done ? `0 0 6px rgba(${rgb},0.4)` : 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: s.done ? `rgba(${rgb},0.5)` : s.active ? 'rgba(255,170,60,0.5)' : `rgba(${rgb},0.18)`
      }
    }, s.label)))));
  };
  let hexIdCounter = 0;
  const HexGridBg = ({
    accent = '#00d4ff',
    opacity = 0.04,
    style = {}
  }) => {
    const rgb = accentRgb(accent);
    const id = useRef(`hex-${++hexIdCounter}`).current;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        opacity,
        ...style,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
      id: id,
      width: "52",
      height: "60",
      patternUnits: "userSpaceOnUse"
    }, /*#__PURE__*/React.createElement("polygon", {
      points: "26,2 50,15 50,45 26,58 2,45 2,15",
      fill: "none",
      stroke: `rgba(${rgb},0.4)`,
      strokeWidth: "0.8"
    }))), /*#__PURE__*/React.createElement("rect", {
      width: "100%",
      height: "100%",
      fill: `url(#${id})`
    })));
  };
  window.DashboardBg = {
    RiskMatrix,
    ComplianceRing,
    AuditTrail,
    HexGridBg
  };
});