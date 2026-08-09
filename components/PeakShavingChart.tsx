"use client";

import React, { useRef, useEffect, useState, useId } from "react";
import { gsap } from "gsap";

export interface ChartDataPoint {
  hour: number;
  withoutMPS: number;
  withMPS: number;
}

interface PeakShavingChartProps {
  data: ChartDataPoint[];
  title?: string;
  accentColor?: string;
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

const PeakShavingChart: React.FC<PeakShavingChartProps> = ({
  data,
  title = "Peak Shaving with MPS",
  accentColor = "#FF5722",
  isVisible = true,
}) => {
  const uid = useId().replace(/:/g, "");
  const beforeLineRef = useRef<SVGPathElement>(null);
  const afterLineRef = useRef<SVGPathElement>(null);
  const chargingAreasRef = useRef<SVGGElement>(null);
  const dischargingAreasRef = useRef<SVGGElement>(null);
  const hasDrawn = useRef(false);

  const chartW = 800;
  const chartH = 400;
  const padL = 80;
  const padR = 40;
  const padT = 80;
  const padB = 60;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  // Find max value for scaling
  const maxValue = Math.max(...data.map((d) => Math.max(d.withoutMPS, d.withMPS)));
  const yMax = Math.ceil(maxValue * 1.2);

  const toX = (hour: number) => padL + (hour / 24) * plotW;
  const toY = (val: number) => padT + plotH - (val / yMax) * plotH;

  const beforePoints = data.map((d) => ({ x: toX(d.hour), y: toY(d.withoutMPS) }));
  const afterPoints = data.map((d) => ({ x: toX(d.hour), y: toY(d.withMPS) }));

  const beforePath = buildSmoothPath(beforePoints);
  const afterPath = buildSmoothPath(afterPoints);

  // Time labels
  const timeLabels = [
    { hour: 6, label: "6am" },
    { hour: 12, label: "12pm" },
    { hour: 18, label: "6pm" },
    { hour: 24, label: "12am" }
  ];

  // Y-axis labels
  const yLabels = ["Base\ngenerator", "Mid merit\ngeneration", "Peak\ngenerator"];
  const yPositions = [plotH * 0.8, plotH * 0.5, plotH * 0.2];

  // Identify charging and discharging areas
  const areas: Array<{ start: number; end: number; type: 'charging' | 'discharging' }> = [];
  for (let i = 0; i < data.length - 1; i++) {
    const diff = data[i].withoutMPS - data[i].withMPS;
    if (Math.abs(diff) > 0.5) {
      const type = diff > 0 ? 'discharging' : 'charging';
      if (areas.length === 0 || areas[areas.length - 1].type !== type) {
        areas.push({ start: i, end: i + 1, type });
      } else {
        areas[areas.length - 1].end = i + 1;
      }
    }
  }

  useEffect(() => {
    if (isVisible && !hasDrawn.current) {
      hasDrawn.current = true;
      const bl = beforeLineRef.current;
      const al = afterLineRef.current;
      const ca = chargingAreasRef.current;
      const da = dischargingAreasRef.current;

      if (bl && al) {
        const pathLength = bl.getTotalLength();
        gsap.fromTo(bl, 
          { strokeDashoffset: pathLength }, 
          { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }
        );
        gsap.fromTo(al, 
          { strokeDashoffset: pathLength }, 
          { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", delay: 0.3 }
        );
      }
      
      if (ca) {
        gsap.fromTo(ca, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.0 });
      }
      if (da) {
        gsap.fromTo(da, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.0 });
      }
    }
    
    if (!isVisible) {
      hasDrawn.current = false;
    }
  }, [isVisible]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-0 rounded-lg">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradient for charging areas (blue) */}
          <pattern id={`charging-pattern-${uid}`} patternUnits="userSpaceOnUse" width="8" height="8">
            <rect width="8" height="8" fill="#E3F2FD" />
            <path d="M0,8 L8,0 M-2,2 L2,-2 M6,10 L10,6" stroke="#2196F3" strokeWidth="1" opacity="0.3" />
          </pattern>
          
          {/* Gradient for discharging areas (red/pink) */}
          <pattern id={`discharging-pattern-${uid}`} patternUnits="userSpaceOnUse" width="8" height="8">
            <rect width="8" height="8" fill="#FFEBEE" />
            <path d="M0,8 L8,0 M-2,2 L2,-2 M6,10 L10,6" stroke="#F44336" strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>

        {/* Legend at top */}
        <g transform={`translate(${chartW / 2 - 200}, 20)`}>
          <line x1="0" y1="10" x2="60" y2="10" stroke="#1976D2" strokeWidth="3" strokeDasharray="8,4" />
          <text x="70" y="15" fontSize="14" fill="#333">Before Peak Shaving</text>
          
          <line x1="250" y1="10" x2="310" y2="10" stroke={accentColor} strokeWidth="3" />
          <text x="320" y="15" fontSize="14" fill="#333">After Peak Shaving</text>
        </g>

        {/* Y-axis background zones */}
        <rect x={padL} y={padT} width={plotW} height={plotH * 0.33} fill="#FFF3E0" opacity="0.3" />
        <rect x={padL} y={padT + plotH * 0.33} width={plotW} height={plotH * 0.33} fill="#E8F5E9" opacity="0.3" />
        <rect x={padL} y={padT + plotH * 0.66} width={plotW} height={plotH * 0.34} fill="#E3F2FD" opacity="0.3" />

        {/* Y-axis labels */}
        {yLabels.map((label, i) => (
          <text 
            key={i} 
            x={padL - 10} 
            y={padT + yPositions[i]} 
            textAnchor="end" 
            fontSize="12" 
            fill="#666"
            fontWeight="500"
          >
            {label.split('\n').map((line, j) => (
              <tspan key={j} x={padL - 10} dy={j === 0 ? 0 : 14}>{line}</tspan>
            ))}
          </text>
        ))}

        {/* Y-axis line */}
        <text 
          x={padL - 80} 
          y={padT + plotH / 2} 
          textAnchor="middle" 
          fontSize="14" 
          fill="#333"
          fontWeight="600"
          transform={`rotate(-90, ${padL - 80}, ${padT + plotH / 2})`}
        >
          Load in MW
        </text>

        {/* X-axis */}
        <line x1={padL} x2={padL + plotW} y1={padT + plotH} y2={padT + plotH} stroke="#333" strokeWidth="2" />
        
        {/* X-axis labels */}
        {timeLabels.map(({ hour, label }) => (
          <g key={hour}>
            <line 
              x1={toX(hour)} 
              y1={padT + plotH} 
              x2={toX(hour)} 
              y2={padT + plotH + 6} 
              stroke="#333" 
              strokeWidth="2" 
            />
            <text 
              x={toX(hour)} 
              y={padT + plotH + 24} 
              textAnchor="middle" 
              fontSize="13" 
              fill="#333"
              fontWeight="500"
            >
              {label}
            </text>
          </g>
        ))}
        
        <text 
          x={padL + plotW / 2} 
          y={padT + plotH + 48} 
          textAnchor="middle" 
          fontSize="14" 
          fill="#333"
          fontWeight="600"
        >
          Time of day →
        </text>

        {/* Charging areas (blue) */}
        <g ref={chargingAreasRef} opacity="0">
          {areas.filter(a => a.type === 'charging').map((area, i) => {
            const startX = toX(data[area.start].hour);
            const endX = toX(data[area.end].hour);
            const points = data.slice(area.start, area.end + 1);
            const topPath = points.map(d => `${toX(d.hour)},${toY(d.withoutMPS)}`).join(' ');
            const bottomPath = points.slice().reverse().map(d => `${toX(d.hour)},${toY(d.withMPS)}`).join(' ');
            
            return (
              <g key={`charging-${i}`}>
                <polygon 
                  points={`${topPath} ${bottomPath}`}
                  fill={`url(#charging-pattern-${uid})`}
                  opacity="0.7"
                />
                <text 
                  x={(startX + endX) / 2} 
                  y={toY(Math.max(...points.map(p => p.withoutMPS))) - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#1976D2"
                  fontWeight="600"
                >
                  MPS charging from generator
                </text>
              </g>
            );
          })}
        </g>

        {/* Discharging areas (red) */}
        <g ref={dischargingAreasRef} opacity="0">
          {areas.filter(a => a.type === 'discharging').map((area, i) => {
            const startX = toX(data[area.start].hour);
            const endX = toX(data[area.end].hour);
            const points = data.slice(area.start, area.end + 1);
            const topPath = points.map(d => `${toX(d.hour)},${toY(d.withoutMPS)}`).join(' ');
            const bottomPath = points.slice().reverse().map(d => `${toX(d.hour)},${toY(d.withMPS)}`).join(' ');
            
            return (
              <g key={`discharging-${i}`}>
                <polygon 
                  points={`${topPath} ${bottomPath}`}
                  fill={`url(#discharging-pattern-${uid})`}
                  opacity="0.7"
                />
                <text 
                  x={(startX + endX) / 2} 
                  y={toY(Math.min(...points.map(p => p.withMPS))) + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#D32F2F"
                  fontWeight="600"
                >
                  MPS discharge into network
                </text>
              </g>
            );
          })}
        </g>

        {/* Before Peak Shaving line (dashed blue) */}
        <path
          ref={beforeLineRef}
          d={beforePath}
          fill="none"
          stroke="#1976D2"
          strokeWidth="3"
          strokeDasharray="8,4"
          strokeLinecap="round"
          strokeDashoffset="0"
        />

        {/* After Peak Shaving line (solid red) */}
        <path
          ref={afterLineRef}
          d={afterPath}
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};

export default PeakShavingChart;
