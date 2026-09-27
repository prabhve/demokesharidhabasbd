import React, { useState, useEffect } from 'react';
import { ArrowUp, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
        setIsVisible(window.scrollY > 320);
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
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-20 lg:bottom-8 right-5 z-40 flex flex-col items-center gap-2.5"
        >
          {/* Quick Floating Table Reservation Pill */}
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18130e]/90 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-xl text-xs font-semibold uppercase tracking-wider hover:border-amber-400 hover:text-white transition-colors"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Table</span>
          </motion.a>

          {/* Circular Scroll Progress Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="relative w-12 h-12 rounded-full bg-[#140f0c]/95 border border-amber-500/40 backdrop-blur-md shadow-2xl flex items-center justify-center text-amber-400 hover:text-white hover:border-amber-400 transition-colors group cursor-pointer"
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
                className="stroke-amber-400 transition-all duration-150 ease-out"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Arrow Icon */}
            <ArrowUp className="w-4 h-4 text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
