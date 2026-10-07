import React, { useState, useEffect } from 'react';
import { ArrowUp, UtensilsCrossed } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG progress circle math
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-18 sm:bottom-20 lg:bottom-8 right-3 sm:right-5 z-40 flex flex-col items-center gap-2">
      {/* Quick Floating Table Reservation Shortcut (Desktop/Tablet) */}
      <a
        href="#booking"
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18130e] text-amber-300 border border-amber-500/40 shadow-xl text-xs font-semibold uppercase tracking-wider hover:border-amber-400 hover:text-white transition-all hover:scale-105 active:scale-95"
      >
        <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
        <span>Book Table</span>
      </a>

      {/* Circular Scroll Progress Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#140f0c] border border-amber-500/50 shadow-lg flex items-center justify-center text-amber-400 hover:text-white hover:border-amber-400 group cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-amber-950/50"
      >
        {/* Circular Progress SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-amber-950/60"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-amber-400"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Inner Arrow Icon */}
        <ArrowUp className="w-4 h-4 text-amber-300" />
      </button>
    </div>
  );
};
