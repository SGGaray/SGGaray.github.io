import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
// loading-screen.jsx v4 — minimal branded loader: SG logo + 600ms progress line.
// Total ≤ 800ms (600ms fill + 200ms fade-out). Instant skip on revisits.
const {
  useState,
  useEffect
} = React;
const LS_KEY = 'sg_loaded';
const LoadingScreen = ({
  onComplete
}) => {
  const seen = typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem(LS_KEY) === '1';
  const [mounted, setMounted] = useState(!seen);
  const [opacity, setOpacity] = useState(seen ? 0 : 1);
  const [progress, setProgress] = useState(seen ? 100 : 0);
  useEffect(() => {
    if (seen) {
      onComplete && onComplete();
      return;
    }
    try {
      sessionStorage.setItem(LS_KEY, '1');
    } catch (e) {}

    // Fill the bar left→right on the next frame (600ms transition).
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setProgress(100)));
    // After the fill completes, fade the overlay out (200ms).
    const fadeTimer = setTimeout(() => setOpacity(0), 620);
    // Drop the overlay from the DOM once the fade finishes (≤ 800ms total).
    const doneTimer = setTimeout(() => {
      setMounted(false);
      onComplete && onComplete();
    }, 840);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);
  if (!mounted) return null;
  return /*#__PURE__*/_jsxDEV("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9900,
      background: '#080f1c',
      opacity,
      transition: 'opacity 200ms ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1,
        letterSpacing: '-1px',
        color: '#06b6d4'
      },
      children: "SG"
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      style: {
        width: '80px',
        height: '1px',
        background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden'
      },
      children: /*#__PURE__*/_jsxDEV("div", {
        style: {
          height: '100%',
          width: progress + '%',
          background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
          transition: 'width 600ms ease'
        }
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
};
window.LoadingScreen = LoadingScreen;