import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  rootMargin = '150px 0px 150px 0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    // Immediate check if element is already within or near the viewport
    const checkVisibility = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Generous bounds check so jumped-to or visible elements are NEVER invisible
      if (rect.top <= windowHeight + 150 && rect.bottom >= -150) {
        setIsVisible(true);
        return true;
      }
      return false;
    };

    if (checkVisibility() && triggerOnce) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true);
          if (triggerOnce && node) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    // Re-check on hash changes or fast jumps
    const handleHashOrScroll = () => {
      if (checkVisibility() && triggerOnce) {
        observer.disconnect();
      }
    };

    window.addEventListener('hashchange', handleHashOrScroll, { passive: true });
    window.addEventListener('scroll', handleHashOrScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashOrScroll);
      window.removeEventListener('scroll', handleHashOrScroll);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible] as const;
}
