export function Wine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25,15 L25,30 Q25,70 50,75 Q75,70 75,30 L75,15 Z"
        fill="#1c1917" stroke="#d97706" strokeWidth="2"
      />
      <path
        d="M25,15 L25,30 Q25,70 50,75 Q75,70 75,30 L75,15 Z"
        fill="url(#wi-liquid)"
      />
      <defs>
        <linearGradient id="wi-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="45%" stopColor="transparent" />
          <stop offset="45%" stopColor="#7f1d1d" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="15" rx="25" ry="4" fill="#292524" stroke="#d97706" strokeWidth="1.5" />
      <line x1="50" y1="75" x2="50" y2="118" stroke="#d97706" strokeWidth="2.5" />
      <ellipse cx="50" cy="120" rx="22" ry="4" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
    </svg>
  );
}
