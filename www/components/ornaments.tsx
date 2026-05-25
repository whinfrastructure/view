// Hand-drawn SVG ornaments shared across the site. All use `currentColor` so
// callers tune the tone with `style={{ color: ... }}`. Kept lightweight, no
// external assets.

export function Sparkle({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.5 L13.4 10.6 L22.5 12 L13.4 13.4 L12 22.5 L10.6 13.4 L1.5 12 L10.6 10.6 Z" />
    </svg>
  );
}

export function WaveLine({
  width = 60,
  reverse = false,
}: {
  width?: number;
  reverse?: boolean;
}) {
  return (
    <svg
      width={width}
      height="8"
      viewBox="0 0 60 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      preserveAspectRatio="none"
      style={{ transform: reverse ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path d="M0 4 Q 7.5 0 15 4 T 30 4 T 45 4 T 60 4" />
    </svg>
  );
}

export function SunCompass({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="4.5" fill="currentColor" stroke="none" />
      <g>
        <line x1="20" y1="2" x2="20" y2="9" />
        <line x1="20" y1="31" x2="20" y2="38" />
        <line x1="2" y1="20" x2="9" y2="20" />
        <line x1="31" y1="20" x2="38" y2="20" />
        <line x1="7.5" y1="7.5" x2="11" y2="11" />
        <line x1="29" y1="29" x2="32.5" y2="32.5" />
        <line x1="7.5" y1="32.5" x2="11" y2="29" />
        <line x1="29" y1="11" x2="32.5" y2="7.5" />
      </g>
      <circle cx="20" cy="20" r="14" strokeDasharray="0.5 3" opacity="0.55" />
    </svg>
  );
}

export function OliveBranch() {
  return (
    <svg
      width="90"
      height="22"
      viewBox="0 0 90 22"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M2 11 Q 22 4 45 11 T 88 11"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
      />
      <ellipse cx="18" cy="6" rx="2.6" ry="1.1" transform="rotate(-22 18 6)" />
      <ellipse cx="36" cy="4.5" rx="2.6" ry="1.1" transform="rotate(-10 36 4.5)" />
      <ellipse cx="56" cy="5" rx="2.6" ry="1.1" transform="rotate(8 56 5)" />
      <ellipse cx="76" cy="6" rx="2.6" ry="1.1" transform="rotate(20 76 6)" />
      <ellipse cx="27" cy="17" rx="2.6" ry="1.1" transform="rotate(15 27 17)" />
      <ellipse cx="46" cy="17.5" rx="2.6" ry="1.1" transform="rotate(0 46 17.5)" />
      <ellipse cx="66" cy="17" rx="2.6" ry="1.1" transform="rotate(-15 66 17)" />
    </svg>
  );
}

export function PalmFrond() {
  return (
    <svg
      width="48"
      height="120"
      viewBox="0 0 48 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M24 2 Q 22 60 24 118" />
      {[12, 26, 40, 54, 68, 82, 96, 108].map((y, i) => {
        const len = 14 - Math.abs(i - 3) * 1.2;
        return (
          <g key={y}>
            <path d={`M24 ${y} Q ${24 - len * 0.6} ${y - 4} ${24 - len} ${y - 8}`} />
            <path d={`M24 ${y} Q ${24 + len * 0.6} ${y - 4} ${24 + len} ${y - 8}`} />
          </g>
        );
      })}
    </svg>
  );
}

// Concentric arcs — a quieter sun, good as a corner mark.
export function ArcMark({ size = 60 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 55 A 25 25 0 0 1 55 55" />
      <path d="M14 55 A 16 16 0 0 1 46 55" />
      <path d="M23 55 A 7 7 0 0 1 37 55" />
      <circle cx="30" cy="55" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Small diamond / lozenge — bullet/separator between text bits.
export function Diamond({ size = 6 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 0 L8 4 L4 8 L0 4 Z" />
    </svg>
  );
}
