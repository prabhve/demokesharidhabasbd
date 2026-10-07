import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, scrollY / totalScroll)) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = progress > 0.02 ? '1' : '0';
        glowRef.current.style.left = `${(progress * 100).toFixed(2)}%`;
      }
    };

    const onScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateProgress();
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-stone-900/40"
    >
      {/* 3D Hardware Accelerated Scale Bar */}
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 origin-left"
        style={{
          transform: 'scaleX(0)',
          transformOrigin: '0% 50%',
          willChange: 'transform',
        }}
      />
      {/* 3D Head Glow Light */}
      <div
        ref={glowRef}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-300 blur-[3px] pointer-events-none transition-opacity duration-200"
        style={{ opacity: 0, willChange: 'left, opacity' }}
      />
    </div>
  );
};
