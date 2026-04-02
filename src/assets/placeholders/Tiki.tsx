export function Tiki({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28,15 L25,115 Q25,125 35,125 L65,125 Q75,125 75,115 L72,15 Z"
        fill="#92400e" stroke="#d97706" strokeWidth="2"
      />
      {/* Face */}
      <ellipse cx="38" cy="55" rx="8" ry="6" fill="#1c1917" />
      <ellipse cx="62" cy="55" rx="8" ry="6" fill="#1c1917" />
      <ellipse cx="38" cy="55" rx="4" ry="3" fill="#fafafa" />
      <ellipse cx="62" cy="55" rx="4" ry="3" fill="#fafafa" />
      <path d="M35,75 Q50,85 65,75" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="30" y1="40" x2="70" y2="40" stroke="#78350f" strokeWidth="2" />
      <line x1="29" y1="68" x2="71" y2="68" stroke="#78350f" strokeWidth="2" />
      <line x1="27" y1="95" x2="73" y2="95" stroke="#78350f" strokeWidth="2" />
      {/* Straw & umbrella */}
      <line x1="55" y1="0" x2="52" y2="30" stroke="#d97706" strokeWidth="2" />
      <path d="M45,3 L55,0 L52,12 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5" />
    </svg>
  );
}
