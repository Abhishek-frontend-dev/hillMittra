const brandYellow = "#fcc535";
const brandBlue = "#4392b3";
const cloudWhite = "#f1f6f2";
const cloudShade = "rgba(16, 38, 26, 0.18)";

export function getWeatherKind(code = 0) {
  const c = Number(code) || 0;
  if (c === 0) return "clear";
  if (c <= 3) return "partly";
  if (c <= 48) return "fog";
  if (c <= 57) return "drizzle";
  if (c <= 67) return "rain";
  if (c <= 77) return "snow";
  if (c <= 82) return "rain";
  if (c <= 86) return "snow";
  return "storm";
}

function Sun({ cx = 22, cy = 22, r = 9 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={brandYellow} />
      <g stroke={brandYellow} strokeWidth="2.6" strokeLinecap="round">
        <line x1={cx} y1={cy - r - 5} x2={cx} y2={cy - r - 10} />
        <line x1={cx} y1={cy + r + 5} x2={cx} y2={cy + r + 10} />
        <line x1={cx - r - 5} y1={cy} x2={cx - r - 10} y2={cy} />
        <line x1={cx + r + 5} y1={cy} x2={cx + r + 10} y2={cy} />
        <line x1={cx - r * 0.8} y1={cy - r * 0.8} x2={cx - r * 1.25} y2={cy - r * 1.25} />
        <line x1={cx + r * 0.8} y1={cy - r * 0.8} x2={cx + r * 1.25} y2={cy - r * 1.25} />
        <line x1={cx - r * 0.8} y1={cy + r * 0.8} x2={cx - r * 1.25} y2={cy + r * 1.25} />
        <line x1={cx + r * 0.8} y1={cy + r * 0.8} x2={cx + r * 1.25} y2={cy + r * 1.25} />
      </g>
    </g>
  );
}

function Cloud({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M20 46 a10 10 0 0 1 1.5 -19.8 a13 13 0 0 1 25 -3.2 a9.5 9.5 0 0 1 2.5 18.7 a4 4 0 0 1 -1.6 0.4 z"
        fill={cloudWhite}
        stroke="rgba(16,38,26,0.22)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M20 46 a10 10 0 0 1 -6 -18 a6 6 0 0 1 7.5 -1.8" fill="none" stroke={cloudShade} strokeWidth="0" />
    </g>
  );
}

function Drops({ y = 50, count = 3, color = brandBlue }) {
  return (
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      {Array.from({ length: count }).map((_, i) => (
        <line key={i} x1={17 + i * 12} y1={y} x2={13 + i * 12} y2={y + 8} />
      ))}
    </g>
  );
}

function Snowflakes({ y = 52 }) {
  return (
    <g fill={brandBlue}>
      {[16, 30, 44].map((x, i) => (
        <g key={i} transform={`translate(${x} ${y + (i % 2) * 4})`}>
          <circle r="2.4" />
          <circle cx={5} cy={-3} r="1.6" />
          <circle cx={-4} cy={2} r="1.4" />
        </g>
      ))}
    </g>
  );
}

const ICONS = {
  clear: (
    <g>
      <Sun cx={32} cy={32} r={12} />
    </g>
  ),
  partly: (
    <g>
      <Sun cx={24} cy={22} r={8.5} />
      <Cloud x={6} y={10} scale={0.78} />
    </g>
  ),
  fog: (
    <g>
      <Cloud x={0} y={-4} scale={0.8} />
      <g stroke={brandBlue} strokeWidth="3" strokeLinecap="round">
        <line x1="14" y1="50" x2="52" y2="50" />
        <line x1="20" y1="57" x2="46" y2="57" />
      </g>
    </g>
  ),
  drizzle: (
    <g>
      <Cloud x={0} y={-6} scale={0.82} />
      <Drops y={44} count={2} />
    </g>
  ),
  rain: (
    <g>
      <Cloud x={0} y={-6} scale={0.82} />
      <Drops y={44} count={3} />
    </g>
  ),
  snow: (
    <g>
      <Cloud x={0} y={-6} scale={0.82} />
      <Snowflakes y={50} />
    </g>
  ),
  storm: (
    <g>
      <Cloud x={0} y={-6} scale={0.82} />
      <path
        d="M34 42 l-8 12 h6 l-3 9 10 -13 h-6 l4 -8 z"
        fill={brandYellow}
        stroke="rgba(16,38,26,0.25)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </g>
  ),
};

export default function WeatherIcon({ code = 0, className = "h-16 w-16", label }) {
  const kind = getWeatherKind(code);
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={label ?? `Weather icon: ${kind}`}
      fill="none"
    >
      {ICONS[kind]}
    </svg>
  );
}
