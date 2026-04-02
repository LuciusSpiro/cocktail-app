export function Highball({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="10" width="56" height="110" rx="4" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
      <rect x="22" y="10" width="56" height="110" rx="4" fill="url(#hb-liquid)" />
      <defs>
        <linearGradient id="hb-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="35%" stopColor="transparent" />
          <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="30" y="50" width="18" height="14" rx="2" fill="#e7e5e4" fillOpacity="0.3" transform="rotate(-10 39 57)" />
      <rect x="45" y="60" width="18" height="14" rx="2" fill="#e7e5e4" fillOpacity="0.25" transform="rotate(5 54 67)" />
      <rect x="35" y="75" width="18" height="14" rx="2" fill="#e7e5e4" fillOpacity="0.2" transform="rotate(-5 44 82)" />
      <line x1="50" y1="5" x2="50" y2="35" stroke="#d97706" strokeWidth="2" />
      <circle cx="50" cy="3" r="3" fill="#ef4444" />
    </svg>
  );
}
