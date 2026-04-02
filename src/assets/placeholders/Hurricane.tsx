export function Hurricane({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30,15 Q20,40 25,60 Q30,75 30,80 L30,110 Q30,118 38,118 L62,118 Q70,118 70,110 L70,80 Q70,75 75,60 Q80,40 70,15 Z"
        fill="#1c1917" stroke="#d97706" strokeWidth="2"
      />
      <path
        d="M30,15 Q20,40 25,60 Q30,75 30,80 L30,110 Q30,118 38,118 L62,118 Q70,118 70,110 L70,80 Q70,75 75,60 Q80,40 70,15 Z"
        fill="url(#hu-liquid)"
      />
      <defs>
        <linearGradient id="hu-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor="transparent" />
          <stop offset="25%" stopColor="#ef4444" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <line x1="55" y1="5" x2="55" y2="35" stroke="#d97706" strokeWidth="2" />
      <path d="M55,5 L62,2 L58,8 L65,6 L55,14" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
      <circle cx="42" cy="30" r="5" fill="#f97316" fillOpacity="0.5" />
    </svg>
  );
}
