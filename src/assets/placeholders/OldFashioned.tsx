export function OldFashioned({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="35" width="64" height="80" rx="4" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
      <rect x="18" y="35" width="64" height="80" rx="4" fill="url(#of-liquid)" />
      <defs>
        <linearGradient id="of-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor="transparent" />
          <stop offset="30%" stopColor="#92400e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#92400e" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect x="28" y="60" width="20" height="16" rx="2" fill="#e7e5e4" fillOpacity="0.25" transform="rotate(-8 38 68)" />
      <rect x="48" y="70" width="20" height="16" rx="2" fill="#e7e5e4" fillOpacity="0.2" transform="rotate(6 58 78)" />
      <ellipse cx="50" cy="35" rx="32" ry="4" fill="#292524" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="35" cy="50" r="8" fill="#f97316" fillOpacity="0.3" stroke="#f97316" strokeWidth="1" />
      <path d="M30 48 Q35 42 40 48" stroke="#f97316" strokeWidth="1" fill="none" />
    </svg>
  );
}
