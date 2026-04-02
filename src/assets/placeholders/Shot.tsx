export function Shot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30,45 L33,115 Q33,120 38,120 L62,120 Q67,120 67,115 L70,45 Z"
        fill="#1c1917" stroke="#d97706" strokeWidth="2"
      />
      <path
        d="M30,45 L33,115 Q33,120 38,120 L62,120 Q67,120 67,115 L70,45 Z"
        fill="url(#sh-liquid)"
      />
      <defs>
        <linearGradient id="sh-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="transparent" />
          <stop offset="20%" stopColor="#eab308" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="45" rx="20" ry="3" fill="#292524" stroke="#d97706" strokeWidth="1.5" />
      <rect x="33" y="105" width="34" height="4" fill="#d97706" fillOpacity="0.3" rx="1" />
    </svg>
  );
}
