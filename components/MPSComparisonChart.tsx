"use client";

import React, { useRef, useEffect, useState, useId } from "react";
import { gsap } from "gsap";

export interface ChartDataPoint {
  hour: number;
  withoutMPS: number;
  withMPS: number;
}

interface MPSComparisonChartProps {
  data: ChartDataPoint[];
  yAxisLabel?: string;
  yAxisUnit?: string;
  maxY?: number;
  accentHex?: string;
  accentRgb?: string;
  isVisible?: boolean;
}

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const tension = 0.3;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function estimatePathLength(points: { x: number; y: number }[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len * 1.4;
}

const MPSComparisonChart: React.FC<MPSComparisonChartProps> = ({
  data,
  yAxisLabel = "Demand (kW)",
  yAxisUnit = "",
  maxY,
  accentHex = "#22d3ee",
  accentRgb = "34, 211, 238",
  isVisible = true,
}) => {
  const uid = useId().replace(/:/g, "");
  const withoutLineRef = useRef<SVGPathElement>(null);
  const withLineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const savingsRef = useRef<SVGPathElement>(null);
  const peakDotRef = useRef<SVGCircleElement>(null);
  const hasDrawn = useRef(false);

  const [hoveredLegend, setHoveredLegend] = useState<"without" | "with" | null>(null);

  const chartW = 360;
  const chartH = 180;
  const padL = 48;
  const padR = 12;
  const padT = 12;
  const padB = 36;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const computedMax = maxY ?? Math.ceil(Math.max(...data.map((d) => Math.max(d.withoutMPS, d.withMPS))) * 1.15);
  const yTicks = 5;
  const yStep = computedMax / yTicks;

  const toX = (hour: number) => padL + (hour / 24) * plotW;
  const toY = (val: number) => padT + plotH - (val / computedMax) * plotH;

  const withoutPoints = data.map((d) => ({ x: toX(d.hour), y: toY(d.withoutMPS) }));
  const withPoints = data.map((d) => ({ x: toX(d.hour), y: toY(d.withMPS) }));

  const withoutPath = buildSmoothPath(withoutPoints);
  const withPath = buildSmoothPath(withPoints);

  const withFillPath =
    withPath +
    ` L ${withPoints[withPoints.length - 1].x} ${padT + plotH} L ${withPoints[0].x} ${padT + plotH} Z`;

  const savingsFillPath =
    withoutPath +
    ` L ${withoutPoints[withoutPoints.length - 1].x} ${withoutPoints[withoutPoints.length - 1].y}` +
    data.slice().reverse().map((d) => ` L ${toX(d.hour)} ${toY(d.withMPS)}`).join("") +
    " Z";

  const xLabels = ["00:00", "06:00", "12:00", "18:00", "23:59"];
  const xHours = [0, 6, 12, 18, 24];

  const withoutLen = estimatePathLength(withoutPoints);
  const withLen = estimatePathLength(withPoints);

  // Peak point (highest withoutMPS)
  const peakIdx = data.reduce((mi, d, i) => (d.withoutMPS > data[mi].withoutMPS ? i : mi), 0);
  const peakX = toX(data[peakIdx].hour);
  const peakY = toY(data[peakIdx].withoutMPS);

  // Animate line draw on visibility
  useEffect(() => {
    if (isVisible && !hasDrawn.current) {
      hasDrawn.current = true;
      const wol = withoutLineRef.current;
      const wl = withLineRef.current;
      const fl = fillRef.current;
      const sl = savingsRef.current;
      const pd = peakDotRef.current;
      if (!wol || !wl || !fl || !sl || !pd) return;

      gsap.fromTo(wol, { strokeDashoffset: withoutLen }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" });
      gsap.fromTo(wl, { strokeDashoffset: withLen }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", delay: 0.2 });
      gsap.fromTo(fl, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6 });
      gsap.fromTo(sl, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6 });
      gsap.fromTo(pd, { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.4, delay: 1.0, ease: "back.out(3)" });
      gsap.to(pd, { scale: 1.4, opacity: 0.5, duration: 0.6, delay: 1.4, yoyo: true, repeat: 1, ease: "power1.inOut" });
    }
    if (!isVisible) {
      hasDrawn.current = false;
      [withoutLineRef, withLineRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.strokeDashoffset = String(withoutLen);
        }
      });
      if (fillRef.current) fillRef.current.style.opacity = "0";
      if (savingsRef.current) savingsRef.current.style.opacity = "0";
      if (peakDotRef.current) {
        peakDotRef.current.style.transform = "scale(0)";
        peakDotRef.current.style.opacity = "1";
      }
    }
  }, [isVisible, withoutLen, withLen]);

  const woOpacity = hoveredLegend === "with" ? 0.3 : 1;
  const wOpacity = hoveredLegend === "without" ? 0.3 : 1;
  const woWidth = hoveredLegend === "without" ? 2.5 : 2;
  const wWidth = hoveredLegend === "with" ? 2.5 : 2;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-[10px] md:text-xs text-black/70 flex-wrap flex-shrink-0">
        <span className="font-medium text-black/80 text-[9px] uppercase tracking-wider">{yAxisLabel}</span>
        <span
          className="flex items-center gap-1.5 cursor-pointer transition-opacity duration-200"
          style={{ opacity: hoveredLegend === "with" ? 0.4 : 1 }}
          onMouseEnter={() => setHoveredLegend("without")}
          onMouseLeave={() => setHoveredLegend(null)}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-rose-400/80" />
          Without MPS
        </span>
        <span
          className="flex items-center gap-1.5 cursor-pointer transition-opacity duration-200"
          style={{ opacity: hoveredLegend === "without" ? 0.4 : 1 }}
          onMouseEnter={() => setHoveredLegend("with")}
          onMouseLeave={() => setHoveredLegend(null)}
        >
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: accentHex, opacity: 0.8 }} />
          With MPS
        </span>
      </div>

      {/* SVG Chart */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full max-h-full bg-white rounded-lg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`bessGrad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${accentRgb}, 0.2)`} />
            <stop offset="100%" stopColor={`rgba(${accentRgb}, 0.01)`} />
          </linearGradient>
          <linearGradient id={`savingsGrad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(251, 113, 133, 0.1)" />
            <stop offset="100%" stopColor="rgba(251, 113, 133, 0.01)" />
          </linearGradient>
          <filter id={`glow-${uid}`}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid */}
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const val = yStep * i;
          const y = toY(val);
          return (
            <g key={`y-${i}`}>
              <line x1={padL} x2={padL + plotW} y1={y} y2={y} stroke="rgba(0,0,0,0.1)" strokeWidth={0.5} />
              <text x={padL - 6} y={y + 3} textAnchor="end" fill="rgba(0,0,0,0.6)" fontSize={8}>
                {val.toFixed(val >= 1 ? 1 : 2)}{yAxisUnit}
              </text>
            </g>
          );
        })}

        {xLabels.map((label, i) => (
          <text key={label} x={toX(xHours[i])} y={padT + plotH + 14} textAnchor="middle" fill="rgba(0,0,0,0.6)" fontSize={8}>
            {label}
          </text>
        ))}
        <text x={padL - 6} y={padT + plotH + 14} textAnchor="end" fill="rgba(0,0,0,0.6)" fontSize={8}>Hour</text>

        {/* Fills */}
        <path ref={fillRef} d={withFillPath} fill={`url(#bessGrad-${uid})`} style={{ opacity: 0 }} />
        <path ref={savingsRef} d={savingsFillPath} fill={`url(#savingsGrad-${uid})`} style={{ opacity: 0 }} />

        {/* Without MPS line */}
        <path
          ref={withoutLineRef}
          d={withoutPath}
          fill="none"
          stroke="#fb7185"
          strokeWidth={woWidth}
          strokeLinecap="round"
          strokeDasharray={withoutLen}
          strokeDashoffset={withoutLen}
          style={{ opacity: woOpacity, transition: "opacity 0.3s, stroke-width 0.3s" }}
        />

        {/* With MPS line */}
        <path
          ref={withLineRef}
          d={withPath}
          fill="none"
          stroke={accentHex}
          strokeWidth={wWidth}
          strokeLinecap="round"
          strokeDasharray={withLen}
          strokeDashoffset={withLen}
          style={{ opacity: wOpacity, transition: "opacity 0.3s, stroke-width 0.3s" }}
        />

        {/* Peak dot */}
        <circle
          ref={peakDotRef}
          cx={peakX}
          cy={peakY}
          r={3}
          fill="#fb7185"
          style={{ transform: "scale(0)", transformOrigin: `${peakX}px ${peakY}px` }}
        />
      </svg>
      </div>
    </div>
  );
};

export default MPSComparisonChart;
