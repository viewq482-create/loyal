
import React from 'react';

export const Logo = ({ className = "h-12" }: { className?: string }) => (
  <svg viewBox="0 0 300 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract B Mark */}
    <g transform="translate(10, 10) scale(0.8)">
       <path 
         d="M20 0 V80 C 20 95, 35 100, 50 100 H 70 C 90 100, 100 85, 100 65 V 50 C 100 30, 85 20, 70 20 H 45 V 45 H 70 C 75 45, 78 48, 78 55 C 78 62, 75 65, 70 65 H 55 C 50 65, 45 60, 45 55 V 0 Z" 
         fill="currentColor"
       />
    </g>
    {/* Text */}
    <text x="110" y="75" fontSize="55" fontWeight="600" fontFamily="sans-serif" letterSpacing="4" fill="currentColor">
      B NESTA
    </text>
  </svg>
);
