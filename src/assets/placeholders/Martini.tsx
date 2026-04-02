export function Martini({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon points="15,15 85,15 50,70" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
      <ellipse cx="50" cy="15" rx="35" ry="5" fill="#292524" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="38" cy="40" r="5" fill="#84cc16" stroke="#65a30d" strokeWidth="1" />
      <circle cx="45" cy="50" r="5" fill="#84cc16" stroke="#65a30d" strokeWidth="1" />
      <line x1="50" y1="70" x2="50" y2="118" stroke="#d97706" strokeWidth="2.5" />
      <ellipse cx="50" cy="120" rx="22" ry="4" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
    </svg>
  );
}
