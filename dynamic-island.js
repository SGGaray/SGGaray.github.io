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
    global.dynamicIsland = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // dynamic-island.jsx — Floating social links pill
  const {
    useState
  } = React;
  const DynamicIsland = ({
    accent = '#00d4ff'
  }) => {
    const [expanded, setExpanded] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const rgb = window.accentRgb(accent);
    const GithubMark = window.GithubMark;
    const LINKS = [{
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sebastian-garay/',
      icon: hov => /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        fill: accent,
        style: {
          display: 'block',
          flexShrink: 0,
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hov ? 'translateY(-3px) scale(1.18)' : 'none'
        }
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
      label: 'GitHub',
      href: 'https://github.com/SGGaray',
      icon: hov => /*#__PURE__*/React.createElement(GithubMark, {
        size: 15,
        fill: accent,
        style: {
          display: 'block',
          flexShrink: 0,
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hov ? 'translateY(-3px) scale(1.18)' : 'none'
        }
      })
    }];
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setExpanded(true),
      onMouseLeave: () => {
        setExpanded(false);
        setHoveredIdx(null);
      },
      style: {
        position: 'fixed',
        top: '76px',
        right: '20px',
        zIndex: 850,
        width: expanded ? '228px' : '84px',
        height: '38px',
        background: expanded ? 'rgba(4,12,20,0.94)' : 'rgba(4,12,20,0.82)',
        border: `1px solid rgba(${rgb},${expanded ? '0.22' : '0.12'})`,
        borderRadius: '999px',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        overflow: 'hidden',
        transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.25s, box-shadow 0.25s, background 0.25s',
        boxShadow: expanded ? `0 0 0 1px rgba(${rgb},0.06), 0 0 32px rgba(${rgb},0.08), 0 12px 40px rgba(0,0,0,0.5)` : `0 4px 14px rgba(0,0,0,0.35)`,
        cursor: 'default'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        padding: '0 16px',
        gap: '0',
        whiteSpace: 'nowrap'
      }
    }, LINKS.map((link, i) => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: link.href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": link.label,
      onMouseEnter: () => setHoveredIdx(i),
      onMouseLeave: () => setHoveredIdx(null),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        textDecoration: 'none',
        marginRight: i < LINKS.length - 1 ? expanded ? '20px' : '12px' : '0',
        opacity: hoveredIdx === i ? 1 : 0.75,
        transition: 'margin 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.18s'
      }
    }, link.icon(hoveredIdx === i), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        letterSpacing: '0.3px',
        color: `rgba(${rgb},0.8)`,
        maxWidth: expanded ? '80px' : '0px',
        opacity: expanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-width 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease'
      }
    }, link.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: accent,
        boxShadow: `0 0 8px rgba(${rgb},0.8)`,
        marginLeft: 'auto',
        flexShrink: 0,
        opacity: expanded ? 0 : 1,
        transition: 'opacity 0.18s ease',
        animation: !expanded ? 'blink 2.2s ease-in-out infinite' : 'none'
      }
    })));
  };
  window.DynamicIsland = DynamicIsland;
});