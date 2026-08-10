"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  DIESEL_HOURS,
  ECONOMICS,
  FINDINGS,
  LOAD_CURVE,
  PEAK_KW,
  mpsCurve,
} from "@/lib/segments";

const PAD = { l: 46, r: 16, t: 26, b: 34 };
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

/* Brand palette, unchanged from the live site.
   Green is Yoshinova. Red is what the grid and the genset cost you.
   Amber is what the audit found. */
const GREEN = "#4A7519";
const RED = "#B23A18";
const AMBER = "#A65B06";

interface Props {
  /** 0 = today's curve, 1 = with MPS */
  progress: number;
  /** 0 your day · 1 what the audit finds · 2 after MPS */
  step: number;
  onReadout: (r: { peak: number; dieselHours: number; cost: number }) => void;
  reducedMotion: boolean;
}

/**
 * One day on your meter — the whole argument in a single chart.
 *
 * Canvas rather than SVG: 24 points × 2 lines morphing at 60fps plus a scrub
 * cursor is a lot of DOM churn. This is ~5 KB and does not thrash layout on a
 * low-end Android, which is what replaced a 38 MB GLB.
 */
export default function LoadCurve({
  progress,
  step,
  onReadout,
  reducedMotion,
}: Props) {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(-1);
  const sizeRef = useRef({ w: 0, h: 0 });

  const state = useRef({ progress, step });
  state.current = { progress, step };

  const resize = useCallback(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    sizeRef.current = { w: r.width, h: r.height };
    cv.width = Math.round(r.width * dpr);
    cv.height = Math.round(r.height * dpr);
    cv.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const cv = cvRef.current;
    const cx = cv?.getContext("2d");
    if (!cv || !cx) return;

    let raf = 0;
    let running = true;
    const mps = mpsCurve();

    /* Canvas font strings cannot resolve CSS variables, so read what the
       element actually inherited from the page. */
    const family =
      getComputedStyle(cv).fontFamily || "Helvetica, Arial, sans-serif";
    const font = (px: number) => `${px}px ${family}`;

    const draw = () => {
      const { progress: p, step: st } = state.current;
      const { w: W, h: H } = sizeRef.current;
      if (W === 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const X = (h: number) => PAD.l + (W - PAD.l - PAD.r) * (h / 23);
      const Y = (v: number) => PAD.t + (H - PAD.t - PAD.b) * (1 - v);

      const trace = (blend: number) => {
        cx.beginPath();
        for (let h = 0; h < 24; h++) {
          const v = lerp(LOAD_CURVE[h], mps[h], blend);
          const x = X(h);
          const y = Y(v);
          if (h === 0) cx.moveTo(x, y);
          else {
            const px = X(h - 1);
            const py = Y(lerp(LOAD_CURVE[h - 1], mps[h - 1], blend));
            const mid = (px + x) / 2;
            cx.bezierCurveTo(mid, py, mid, y, x, y);
          }
        }
      };

      cx.clearRect(0, 0, W, H);

      /* grid + axis labels */
      cx.strokeStyle = "rgba(20,22,15,.10)";
      cx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = PAD.t + (H - PAD.t - PAD.b) * (i / 4);
        cx.beginPath();
        cx.moveTo(PAD.l, y);
        cx.lineTo(W - PAD.r, y);
        cx.stroke();
      }
      cx.fillStyle = "rgba(20,22,15,.42)";
      cx.font = font(10);
      cx.textAlign = "right";
      for (let i = 0; i <= 4; i++) {
        const y = PAD.t + (H - PAD.t - PAD.b) * (i / 4);
        cx.fillText(String(Math.round(PEAK_KW * (1 - i / 4))), PAD.l - 8, y + 3);
      }
      cx.textAlign = "center";
      [0, 6, 12, 18, 23].forEach((h) =>
        cx.fillText(
          h === 23 ? "24:00" : String(h).padStart(2, "0") + ":00",
          X(h),
          H - 12,
        ),
      );

      /* charge / discharge windows (step 3) */
      if (p > 0.02) {
        cx.fillStyle = `rgba(106,159,48,${0.13 * p})`;
        cx.fillRect(X(10), PAD.t, X(15) - X(10), H - PAD.t - PAD.b);

        let start = -1;
        for (let h = 0; h < 24; h++) {
          const gap = LOAD_CURVE[h] - mps[h];
          if (gap > 0.01 && start < 0) start = h;
          if ((gap <= 0.01 || h === 23) && start >= 0) {
            cx.fillStyle = `rgba(178,58,24,${0.10 * p})`;
            cx.fillRect(X(start), PAD.t, X(h) - X(start), H - PAD.t - PAD.b);
            start = -1;
          }
        }
        cx.fillStyle = `rgba(74,117,25,${0.9 * p})`;
        cx.font = font(9.5);
        cx.fillText("CHARGE", (X(10) + X(15)) / 2, PAD.t + 12);
      }

      /* diesel hours (steps 1–2) */
      const dA = 1 - p;
      if (dA > 0.02) {
        const bw = X(1) - X(0);
        DIESEL_HOURS.forEach((h) => {
          cx.fillStyle = `rgba(178,58,24,${0.13 * dA})`;
          cx.fillRect(X(h) - bw / 2, PAD.t, bw, H - PAD.t - PAD.b);
        });
        cx.fillStyle = `rgba(178,58,24,${0.95 * dA})`;
        cx.font = font(9.5);
        cx.fillText("DG", X(DIESEL_HOURS[0]), PAD.t + 12);
      }

      /* today's curve stays visible as the reference */
      trace(0);
      cx.strokeStyle = `rgba(178,58,24,${lerp(1, 0.4, p)})`;
      cx.lineWidth = 2;
      cx.setLineDash(p > 0.5 ? [4, 4] : []);
      cx.stroke();
      cx.setLineDash([]);

      /* the animated line + fill */
      trace(p);
      cx.lineTo(X(23), Y(0));
      cx.lineTo(X(0), Y(0));
      cx.closePath();
      const g = cx.createLinearGradient(0, PAD.t, 0, H - PAD.b);
      g.addColorStop(0, `rgba(106,159,48,${lerp(0.05, 0.26, p)})`);
      g.addColorStop(1, "rgba(106,159,48,0)");
      cx.fillStyle = g;
      cx.fill();

      trace(p);
      cx.strokeStyle = p > 0.15 ? GREEN : "rgba(74,117,25,.45)";
      cx.lineWidth = 2.5;
      cx.lineJoin = "round";
      cx.shadowColor = "rgba(106,159,48,.35)";
      cx.shadowBlur = p * 14;
      cx.stroke();
      cx.shadowBlur = 0;

      /* the findings — this is the audit doing visible work */
      if (st === 1) {
        cx.font = font(10);
        FINDINGS.forEach((f) => {
          const x = X(f.hour);
          const y = Y(LOAD_CURVE[f.hour]);
          const dir = y > H / 2 ? -1 : 1;
          cx.strokeStyle = "rgba(166,91,6,.75)";
          cx.lineWidth = 1;
          cx.setLineDash([3, 3]);
          cx.beginPath();
          cx.moveTo(x, y);
          cx.lineTo(x, y + dir * 26);
          cx.stroke();
          cx.setLineDash([]);
          cx.fillStyle = AMBER;
          cx.beginPath();
          cx.arc(x, y, 3.5, 0, Math.PI * 2);
          cx.fill();

          const text = f.label;
          const tw = cx.measureText(text).width;
          const bx = Math.max(
            PAD.l,
            Math.min(W - PAD.r - tw - 14, x - tw / 2 - 7),
          );
          const by = y + dir * 26 + (dir > 0 ? 0 : -18);
          cx.fillStyle = "rgba(251,251,249,.97)";
          cx.fillRect(bx, by, tw + 14, 18);
          cx.strokeStyle = "rgba(166,91,6,.5)";
          cx.strokeRect(bx, by, tw + 14, 18);
          cx.fillStyle = AMBER;
          cx.textAlign = "left";
          cx.fillText(text, bx + 7, by + 12);
          cx.textAlign = "center";
        });
      }

      /* scrub cursor */
      const hv = hoverRef.current;
      if (hv >= 0) {
        const x = X(hv);
        cx.strokeStyle = "rgba(20,22,15,.35)";
        cx.lineWidth = 1;
        cx.beginPath();
        cx.moveTo(x, PAD.t);
        cx.lineTo(x, H - PAD.b);
        cx.stroke();
        cx.fillStyle = RED;
        cx.beginPath();
        cx.arc(x, Y(LOAD_CURVE[hv]), 4, 0, Math.PI * 2);
        cx.fill();
        cx.fillStyle = GREEN;
        cx.beginPath();
        cx.arc(x, Y(lerp(LOAD_CURVE[hv], mps[hv], p)), 4, 0, Math.PI * 2);
        cx.fill();
        cx.fillStyle = "rgba(20,22,15,.85)";
        cx.font = font(10);
        cx.fillText(String(hv).padStart(2, "0") + ":00", x, PAD.t - 9);
      }

      /* readouts */
      const peak =
        Math.max(...LOAD_CURVE.map((v, h) => lerp(v, mps[h], p))) * PEAK_KW;
      const dieselHours = Math.round(DIESEL_HOURS.length * (1 - p));
      const units = LOAD_CURVE.reduce(
        (a, v, h) => a + lerp(v, mps[h], p) * PEAK_KW,
        0,
      );
      const dieselUnits = DIESEL_HOURS.length * (1 - p) * PEAK_KW * 0.8;
      const cost =
        (units - dieselUnits) * ECONOMICS.gridPerUnit +
        dieselUnits * ECONOMICS.dieselPerUnit;
      onReadout({ peak, dieselHours, cost });

      if (running) raf = requestAnimationFrame(draw);
    };

    /* Only render while on screen. The old site ran a full three.js loop for
       the entire page lifetime, on every device. */
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !running) {
            running = true;
            raf = requestAnimationFrame(draw);
          } else if (!e.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        }),
      { threshold: 0 },
    );
    io.observe(cv);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [onReadout]);

  const scrub = useCallback((clientX: number) => {
    const cv = cvRef.current;
    if (!cv) return;
    const r = cv.getBoundingClientRect();
    const u = (clientX - r.left - PAD.l) / (r.width - PAD.l - PAD.r);
    hoverRef.current = Math.max(0, Math.min(23, Math.round(u * 23)));
  }, []);

  return (
    <canvas
      ref={cvRef}
      className="absolute inset-0 block h-full w-full touch-pan-y"
      role="img"
      aria-label={`24-hour industrial load profile. Peak demand ${PEAK_KW} kW today, reduced roughly ${Math.round(
        100 * 0.4,
      )} percent by a right-sized Modular Power System, with diesel hours eliminated.`}
      onMouseMove={(e) => !reducedMotion && scrub(e.clientX)}
      onMouseLeave={() => (hoverRef.current = -1)}
      onTouchStart={(e) => scrub(e.touches[0].clientX)}
      onTouchMove={(e) => scrub(e.touches[0].clientX)}
      onTouchEnd={() => (hoverRef.current = -1)}
    />
  );
}
