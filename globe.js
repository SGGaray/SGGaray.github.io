(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["react/jsx-dev-runtime"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("react/jsx-dev-runtime"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jsxDevRuntime);
    global.globe = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_jsxDevRuntime) {
  "use strict";

  // globe.jsx — Enhanced 3D globe: city labels, data arcs, layered glow
  const {
    useEffect,
    useRef,
    memo
  } = React;
  const CITIES = [{
    name: 'Buenos Aires',
    lat: -34.60,
    lon: -58.38
  }, {
    name: 'New York',
    lat: 40.71,
    lon: -74.01
  }, {
    name: 'London',
    lat: 51.51,
    lon: -0.13
  }, {
    name: 'Frankfurt',
    lat: 50.11,
    lon: 8.68
  }, {
    name: 'Singapore',
    lat: 1.35,
    lon: 103.82
  }, {
    name: 'Tokyo',
    lat: 35.68,
    lon: 139.69
  }, {
    name: 'São Paulo',
    lat: -23.55,
    lon: -46.63
  }, {
    name: 'Sydney',
    lat: -33.87,
    lon: 151.21
  }];

  // Arc pairs: city index pairs to draw data routes between
  const ARC_PAIRS = [[0, 2],
  // Buenos Aires → London
  [0, 1],
  // Buenos Aires → New York
  [0, 6],
  // Buenos Aires → São Paulo
  [2, 3],
  // London → Frankfurt
  [2, 4],
  // London → Singapore
  [4, 5],
  // Singapore → Tokyo
  [1, 2],
  // New York → London
  [5, 7],
  // Tokyo → Sydney
  [3, 4] // Frankfurt → Singapore
  ];
  const latLonTo3D = (lat, lon) => {
    const φ = lat * Math.PI / 180;
    const λ = lon * Math.PI / 180;
    return {
      x: Math.cos(φ) * Math.cos(λ),
      y: Math.sin(φ),
      z: Math.cos(φ) * Math.sin(λ)
    };
  };
  const slerp3D = (a, b, t) => {
    const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
    const omega = Math.acos(dot);
    if (Math.abs(omega) < 1e-4) return {
      ...a
    };
    const so = Math.sin(omega);
    const s1 = Math.sin((1 - t) * omega) / so;
    const s2 = Math.sin(t * omega) / so;
    return {
      x: s1 * a.x + s2 * b.x,
      y: s1 * a.y + s2 * b.y,
      z: s1 * a.z + s2 * b.z
    };
  };
  class NetworkGlobe {
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.color = opts.color || '#00d4ff';
      this.speed = opts.speed ?? 1;
      this.rotation = 0;
      this.tilt = 0.22;
      this.raf = null;
      this.points = this._genPoints(170);
      this.conns = this._genConns();
      this.specials = this._pickSpecials(8);
      this.cityPts = CITIES.map(c => latLonTo3D(c.lat, c.lon));
      this.arcs = ARC_PAIRS.map((pair, i) => ({
        from: pair[0],
        to: pair[1],
        t: i / ARC_PAIRS.length,
        speed: 0.0022 + i % 3 * 0.0009,
        segs: 60
      }));
    }
    _genPoints(n) {
      const pts = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - i / (n - 1) * 2;
        const rr = Math.sqrt(Math.max(0, 1 - y * y));
        const phi = golden * i;
        pts.push({
          x: Math.cos(phi) * rr,
          y,
          z: Math.sin(phi) * rr
        });
      }
      return pts;
    }
    _genConns() {
      const conns = [],
        MAX = 4;
      const counts = new Array(this.points.length).fill(0);
      for (let i = 0; i < this.points.length; i++) {
        for (let j = i + 1; j < this.points.length; j++) {
          if (counts[i] >= MAX && counts[j] >= MAX) continue;
          const d = this.points[i].x * this.points[j].x + this.points[i].y * this.points[j].y + this.points[i].z * this.points[j].z;
          if (d > 0.922) {
            conns.push([i, j]);
            counts[i]++;
            counts[j]++;
          }
        }
      }
      return conns;
    }
    _pickSpecials(n) {
      const s = new Set();
      const step = Math.floor(this.points.length / n);
      for (let i = 0; i < n; i++) s.add(i * step + Math.floor(step / 2));
      return s;
    }
    _rot(p) {
      const cy = Math.cos(this.rotation),
        sy = Math.sin(this.rotation);
      const cx = Math.cos(this.tilt),
        sx = Math.sin(this.tilt);
      const rx = p.x * cy + p.z * sy;
      const ry0 = p.y,
        rz0 = -p.x * sy + p.z * cy;
      return {
        x: rx,
        y: ry0 * cx - rz0 * sx,
        z: ry0 * sx + rz0 * cx
      };
    }
    _proj(p, cx, cy, r) {
      const rp = this._rot(p);
      const s = 4.5 / (4.5 + rp.z);
      return {
        sx: rp.x * s * r + cx,
        sy: rp.y * s * r + cy,
        z: rp.z
      };
    }
    _rgbStr() {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color);
      return m ? `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}` : '0,212,255';
    }
    draw() {
      const {
        canvas,
        ctx
      } = this;
      const W = canvas.width,
        H = canvas.height;
      const cx = W / 2,
        cy = H / 2;
      const r = Math.min(W, H) * 0.41;
      const rgb = this._rgbStr();
      ctx.clearRect(0, 0, W, H);

      // Layered ambient glow (3 rings)
      [[1.5, 0.13], [2.05, 0.055], [2.6, 0.022]].forEach(([gs, ga]) => {
        const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * gs);
        g.addColorStop(0, `rgba(${rgb},${ga})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });
      const proj = this.points.map(p => this._proj(p, cx, cy, r));

      // Connections
      this.conns.forEach(([i, j]) => {
        const a = proj[i],
          b = proj[j];
        const z = (a.z + b.z) / 2;
        if (z < -0.52) return;
        const t = (z + 1) / 2;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = `rgba(${rgb},${t * t * 0.38})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      });

      // Network nodes (back→front)
      proj.map((p, i) => ({
        ...p,
        i
      })).sort((a, b) => a.z - b.z).forEach(({
        sx,
        sy,
        z,
        i
      }) => {
        if (z < -0.56) return;
        const t = (z + 1) / 2;
        const sp = this.specials.has(i);
        const sz = sp ? t * 4 + 1 : t * 2.1 + 0.4;
        const al = Math.pow(t, 0.6);
        if (t > 0.38) {
          const gr = sz * (sp ? 5.2 : 3.8);
          const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
          g2.addColorStop(0, `rgba(${rgb},${al * (sp ? 0.3 : 0.11)})`);
          g2.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(sx, sy, gr, 0, Math.PI * 2);
          ctx.fillStyle = g2;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.3, sz), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${al})`;
        ctx.fill();
      });

      // Arcs + traveling dots
      this.arcs.forEach(arc => {
        const fp = this.cityPts[arc.from],
          tp = this.cityPts[arc.to];

        // Build projected arc segments
        const aPts = [];
        for (let k = 0; k <= arc.segs; k++) {
          const p3 = slerp3D(fp, tp, k / arc.segs);
          const rp = this._rot(p3);
          if (rp.z < -0.32) {
            aPts.push(null);
            continue;
          }
          const s = 4.5 / (4.5 + rp.z);
          aPts.push({
            sx: rp.x * s * r + cx,
            sy: rp.y * s * r + cy,
            z: rp.z
          });
        }

        // Draw arc (segmented for backface clipping)
        let drawing = false;
        ctx.beginPath();
        aPts.forEach(pt => {
          if (!pt) {
            if (drawing) {
              ctx.strokeStyle = `rgba(${rgb},0.14)`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
              ctx.beginPath();
            }
            drawing = false;
          } else {
            if (!drawing) {
              ctx.moveTo(pt.sx, pt.sy);
              drawing = true;
            } else ctx.lineTo(pt.sx, pt.sy);
          }
        });
        if (drawing) {
          ctx.strokeStyle = `rgba(${rgb},0.14)`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // Traveling dot
        const dotT = arc.t % 1;
        const d3 = slerp3D(fp, tp, dotT);
        const drp = this._rot(d3);
        if (drp.z > -0.12) {
          const ds = 4.5 / (4.5 + drp.z);
          const dsx = drp.x * ds * r + cx,
            dsy = drp.y * ds * r + cy;
          const da = Math.min(1, (drp.z + 0.5) / 1.3);
          // Trail
          for (let k = 1; k <= 12; k++) {
            const tt = Math.max(0, dotT - k * 0.007);
            const t3 = slerp3D(fp, tp, tt);
            const tr = this._rot(t3);
            if (tr.z < -0.12) continue;
            const ts = 4.5 / (4.5 + tr.z);
            ctx.beginPath();
            ctx.arc(tr.x * ts * r + cx, tr.y * ts * r + cy, 1.4 * (1 - k / 12), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb},${da * (1 - k / 12) * 0.5})`;
            ctx.fill();
          }
          // Dot glow
          const dg = ctx.createRadialGradient(dsx, dsy, 0, dsx, dsy, 10);
          dg.addColorStop(0, `rgba(255,255,255,${da * 0.88})`);
          dg.addColorStop(0.35, `rgba(${rgb},${da * 0.75})`);
          dg.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(dsx, dsy, 10, 0, Math.PI * 2);
          ctx.fillStyle = dg;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(dsx, dsy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${da})`;
          ctx.fill();
        }
        arc.t += arc.speed * this.speed;
      });

      // City nodes + labels (drawn last, on top)
      this.cityPts.forEach((cp, i) => {
        const rp = this._rot(cp);
        if (rp.z < -0.06) return;
        const s = 4.5 / (4.5 + rp.z);
        const sx = rp.x * s * r + cx,
          sy = rp.y * s * r + cy;
        const al = Math.min(1, (rp.z + 0.5) / 1.4);

        // Outer ring
        ctx.beginPath();
        ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb},${al * 0.35})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Glow
        const cg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 16);
        cg.addColorStop(0, `rgba(${rgb},${al * 0.42})`);
        cg.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(sx, sy, 16, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(sx, sy, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${al * 0.9})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${al * 0.75})`;
        ctx.fill();

        // Label
        if (al > 0.28) {
          ctx.font = `500 9.5px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `rgba(${rgb},${al * 0.68})`;
          ctx.textAlign = sx > cx ? 'left' : 'right';
          ctx.textBaseline = 'middle';
          const offset = 11;
          ctx.fillText(CITIES[i].name, sx > cx ? sx + offset : sx - offset, sy);
        }
      });
      this.rotation += 0.0018 * this.speed;
    }
    start() {
      const loop = () => {
        this.draw();
        this.raf = requestAnimationFrame(loop);
      };
      loop();
    }
    stop() {
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = null;
      }
    }
    setColor(c) {
      this.color = c;
    }
    setSpeed(s) {
      this.speed = s;
    }
  }
  const GlobeCanvas = memo(({
    color = '#00d4ff',
    speed = 1
  }) => {
    const canvasRef = useRef(null);
    const globeRef = useRef(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      const resize = () => {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width || parent.offsetWidth;
        canvas.height = rect.height || parent.offsetHeight;
      };
      resize();
      const globe = new NetworkGlobe(canvas, {
        color,
        speed
      });
      globeRef.current = globe;
      globe.start();
      const ro = new ResizeObserver(resize);
      ro.observe(parent);
      return () => {
        globe.stop();
        ro.disconnect();
      };
    }, []);
    useEffect(() => {
      if (globeRef.current) globeRef.current.setColor(color);
    }, [color]);
    useEffect(() => {
      if (globeRef.current) globeRef.current.setSpeed(speed);
    }, [speed]);
    return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("canvas", {
      ref: canvasRef,
      style: {
        width: '100%',
        height: '100%',
        display: 'block'
      }
    }, void 0, false);
  });
  Object.assign(window, {
    GlobeCanvas,
    NetworkGlobe
  });
});