export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 400 500" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#00bcd4", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0288d1", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Letter I */}
      <rect x="10" y="350" width="80" height="20" fill="url(#blueGradient)" rx="10"/>
      <rect x="30" y="220" width="40" height="150" fill="url(#blueGradient)" rx="5"/>
      <rect x="10" y="200" width="80" height="20" fill="url(#blueGradient)" rx="10"/>
      
      {/* Letter A with circle on top */}
      <circle cx="200" cy="80" r="35" fill="none" stroke="url(#blueGradient)" strokeWidth="12"/>
      <circle cx="200" cy="80" r="25" fill="none" stroke="url(#blueGradient)" strokeWidth="8"/>
      
      {/* A frame */}
      <path d="M 120 370 L 200 150 L 280 370" fill="none" stroke="url(#blueGradient)" strokeWidth="15" strokeLinecap="round"/>
      <path d="M 160 290 L 240 290" fill="none" stroke="url(#blueGradient)" strokeWidth="10" strokeLinecap="round"/>
      <circle cx="220" cy="290" r="5" fill="url(#blueGradient)"/>
      
      {/* Base lines */}
      <rect x="10" y="350" width="380" height="15" fill="url(#blueGradient)" rx="7"/>
      <rect x="10" y="380" width="380" height="10" fill="url(#blueGradient)" rx="5"/>
    </svg>
  );
};
