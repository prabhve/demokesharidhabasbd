import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-amber-950/20 pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(245,158,11,0.8)] relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glowing Head Particle */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_12px_#fbbf24]" />
      </div>
    </div>
  );
};
