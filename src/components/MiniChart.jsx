import React, { useId } from "react";

// Petit graphique SVG maison (pas de dépendance externe) — sparkline ou courbe pleine taille.
export default function MiniChart({ points, width = 100, height = 32, color = "#FF3B30", showDots = false, showLabels = false, strokeWidth = 2 }) {
  const gradId = `pbgrad-${useId()}`;
  if (!points || points.length < 2) {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} strokeDasharray="3 4" />
      </svg>
    );
  }

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const padY = showLabels ? 18 : 4;
  const padX = showDots ? 6 : 0;
  const innerH = height - padY * 2;
  const innerW = width - padX * 2;

  const coords = points.map((p, i) => {
    const x = padX + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
    const y = padY + innerH - ((p.value - min) / span) * innerH;
    return { x, y, value: p.value, label: p.label };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1].x.toFixed(1)},${height} L${coords[0].x.toFixed(1)},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} stroke="none" />
      <path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {showDots && coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={3.2} fill={color} stroke={"#141417"} strokeWidth={1.5} />
      ))}
      {showLabels && coords.map((c, i) => (
        <text key={i} x={c.x} y={c.y - 9} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#F4F4F5" fontFamily="Inter, sans-serif">
          {Number.isInteger(c.value) ? c.value : c.value.toFixed(1)}
        </text>
      ))}
    </svg>
  );
}
