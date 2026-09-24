import React from 'react';

/**
 * Red Dragon Crest / Emblem component
 * Mythical Red Fire Dragon vector with glowing crimson, scarlet, and amber gradients
 */
export const DragonCrest = ({ className = "w-6 h-6", glow = false }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${glow ? 'drop-shadow-[0_0_12px_rgba(239,68,68,0.85)]' : ''}`}
      >
        <defs>
          <linearGradient id="dragonRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="40%" stopColor="#EF4444" />
            <stop offset="75%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="dragonFireFlameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="45%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>

        {/* Dragon Horns & Spikes Silhouette */}
        <path
          d="M50 10 L56 26 L72 16 L65 34 L84 32 L70 46 L90 54 L68 58 L82 72 L60 68 L68 88 L50 74 L32 88 L40 68 L18 72 L32 58 L10 54 L30 46 L16 32 L35 34 L28 16 L44 26 Z"
          fill="url(#dragonRedGrad)"
          fillOpacity="0.25"
          stroke="url(#dragonRedGrad)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Inner Dragon Wing / Spine Silhouette */}
        <path
          d="M50 18 Q62 30 58 45 Q70 48 76 60 Q60 62 50 82 Q40 62 24 60 Q30 48 42 45 Q38 30 50 18 Z"
          fill="url(#dragonFireFlameGrad)"
          fillOpacity="0.75"
          stroke="#FCA5A5"
          strokeWidth="1.5"
        />

        {/* Dragon Ruby Heart Core */}
        <circle cx="50" cy="46" r="4.5" fill="#FEE2E2" className="animate-pulse" />
        <circle cx="50" cy="46" r="8.5" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
      </svg>
    </div>
  );
};

export const DragonFlame = ({ className = "w-4 h-4" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C10.5 5 7.5 7.5 7.5 11C7.5 14 9.5 15.5 9.5 17C9.5 18 8.8 19 8 19.5C9.2 21 11 22 13 22C16.5 22 19.5 19 19.5 15C19.5 10 14 7.5 14 3.5C14 2.8 13.5 2.2 12 2Z" />
    </svg>
  );
};

export default DragonCrest;
