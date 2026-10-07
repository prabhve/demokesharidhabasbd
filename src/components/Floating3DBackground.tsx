import React, { useEffect, useRef } from 'react';

interface Particle3D {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  z: number; // depth px (-150 to 150)
  size: number;
  opacity: number;
  speedY: number;
  speedX: number;
  hue: number;
}

export const Floating3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Generate static particle definitions
    const particles: Particle3D[] = Array.from({ length: 24 }, (_, i) => ({
      x: (i * 4.3 + (i % 5) * 7.7) % 100,
      y: (i * 7.1 + (i % 3) * 13.3) % 100,
      z: -120 + (i % 6) * 45,
      size: 3 + (i % 4) * 2.5,
      opacity: 0.12 + ((i % 5) * 0.05),
      speedY: 0.15 + (i % 3) * 0.1,
      speedX: ((i % 2 === 0 ? 1 : -1) * 0.08),
      hue: i % 3 === 0 ? 43 : i % 3 === 1 ? 38 : 28, // Gold, Amber, Warm Saffron
    }));

    const elements: HTMLDivElement[] = [];
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    particles.forEach((p) => {
      const div = document.createElement('div');
      div.className = 'absolute rounded-full pointer-events-none';
      div.style.width = `${p.size}px`;
      div.style.height = `${p.size}px`;
      div.style.left = `${p.x}%`;
      div.style.top = `${p.y}%`;
      div.style.background = `radial-gradient(circle, hsl(${p.hue}, 95%, 65%) 0%, hsla(${p.hue}, 90%, 50%, 0.4) 60%, transparent 100%)`;
      div.style.boxShadow = `0 0 ${p.size * 2}px hsla(${p.hue}, 90%, 55%, ${p.opacity * 1.5})`;
      div.style.opacity = `${p.opacity}`;
      div.style.transform = `translate3d(0, 0, ${p.z}px)`;
      div.style.willChange = 'transform';
      container.appendChild(div);
      elements.push(div);
    });

    let lastScrollY = window.scrollY;

    const animate = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      particles.forEach((p, idx) => {
        // Natural float
        p.y -= p.speedY;
        p.x += p.speedX;

        // Scroll parallax reaction proportional to Z-depth
        const parallaxFactor = (p.z + 180) / 300;
        p.y -= scrollDelta * 0.02 * parallaxFactor;

        if (p.y < -5) p.y = 105;
        if (p.y > 105) p.y = -5;
        if (p.x < -5) p.x = 105;
        if (p.x > 105) p.x = -5;

        const el = elements[idx];
        if (el) {
          el.style.top = `${p.y.toFixed(2)}%`;
          el.style.left = `${p.x.toFixed(2)}%`;
          el.style.transform = `translate3d(0, 0, ${p.z}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 perspective-1200 preserve-3d"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    />
  );
};
