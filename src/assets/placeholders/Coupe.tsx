export function Coupe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15,20 Q15,65 50,70 Q85,65 85,20 Z"
        fill="#1c1917" stroke="#d97706" strokeWidth="2"
      />
      <path
        d="M15,20 Q15,65 50,70 Q85,65 85,20 Z"
        fill="url(#co-liquid)"
      />
      <defs>
        <linearGradient id="co-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="transparent" />
          <stop offset="40%" stopColor="#ec4899" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="20" rx="35" ry="5" fill="#292524" stroke="#d97706" strokeWidth="1.5" />
      <line x1="50" y1="70" x2="50" y2="118" stroke="#d97706" strokeWidth="2.5" />
      <ellipse cx="50" cy="120" rx="24" ry="4" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
    </svg>
  );
}
