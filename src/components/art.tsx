import { motion } from 'framer-motion';

/**
 * Signature visual: dotted world with great-circle flight arcs radiating from Dubai.
 * Pure SVG, no image assets. Arcs draw on scroll into view.
 */
const DXB = { x: 560, y: 205 };
const dests = [
  { x: 150, y: 150, name: 'Americas' },
  { x: 420, y: 120, name: 'Europe' },
  { x: 470, y: 145, name: 'Mediterranean' },
  { x: 700, y: 130, name: 'Central Asia' },
  { x: 790, y: 190, name: 'East Asia' },
  { x: 740, y: 250, name: 'Southeast Asia' },
  { x: 640, y: 230, name: 'South Asia' },
  { x: 460, y: 300, name: 'Africa' },
  { x: 830, y: 330, name: 'Oceania' },
];

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - Math.abs(a.x - b.x) * 0.22 - 18;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

export function RouteMap({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 960 420" className={className} role="img" aria-label="VANDEX global supply routes radiating from Dubai">
      <defs>
        <radialGradient id="dotfade" cx="58%" cy="48%" r="62%">
          <stop offset="0%" stopColor="#8B929C" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8B929C" stopOpacity="0.08" />
        </radialGradient>
        <linearGradient id="arcgrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5A616B" /><stop offset="0.6" stopColor="#8B929C" /><stop offset="1" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>

      {/* dotted globe field */}
      <g fill="url(#dotfade)">
        {Array.from({ length: 14 }).map((_, r) =>
          Array.from({ length: 34 }).map((_, c) => {
            const x = 40 + c * 26 + (r % 2 ? 13 : 0);
            const y = 60 + r * 24;
            const d = Math.hypot(x - 500, y - 210);
            if (d > 330) return null;
            return <circle key={`${r}-${c}`} cx={x} cy={y} r={1.6} />;
          }),
        )}
      </g>

      {/* arcs */}
      {dests.map((d, i) => (
        <motion.path
          key={d.name}
          d={arc(DXB, d)}
          fill="none"
          stroke="url(#arcgrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.15 * i, ease: 'easeInOut' }}
        />
      ))}

      {/* destination nodes */}
      {dests.map((d, i) => (
        <motion.g key={d.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 * i + 1 }}>
          <circle cx={d.x} cy={d.y} r="3" fill="#8B929C" />
          <circle cx={d.x} cy={d.y} r="7" fill="none" stroke="#8B929C" strokeOpacity="0.35" />
        </motion.g>
      ))}

      {/* DXB hub */}
      <g>
        <circle cx={DXB.x} cy={DXB.y} r="5" fill="#2DD4BF" />
        <circle cx={DXB.x} cy={DXB.y} r="11" fill="none" stroke="#2DD4BF" strokeOpacity="0.5">
          <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x={DXB.x + 16} y={DXB.y + 4} fill="#F5F6F7" fontSize="12" fontFamily="IBM Plex Mono, monospace" letterSpacing="2">DXB</text>
      </g>
    </svg>
  );
}

/** Minimal aircraft plan-view line art, blueprint style, no photo assets needed. */
export function AircraftSchematic({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2">
      <g opacity="0.9">
        <path d="M200 30 C207 30 211 44 211 70 L211 150 L360 235 L360 258 L211 215 L211 300 L250 335 L250 352 L200 338 L150 352 L150 335 L189 300 L189 215 L40 258 L40 235 L189 150 L189 70 C189 44 193 30 200 30 Z" />
        <line x1="200" y1="30" x2="200" y2="352" strokeDasharray="4 6" opacity="0.4" />
        <circle cx="200" cy="192" r="150" strokeDasharray="2 8" opacity="0.25" />
        <circle cx="200" cy="192" r="110" strokeDasharray="2 8" opacity="0.18" />
      </g>
    </svg>
  );
}
