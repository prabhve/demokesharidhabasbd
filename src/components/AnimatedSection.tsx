import React, { ElementType } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom' | 'none';
  threshold?: number;
  id?: string;
  as?: ElementType;
  style?: React.CSSProperties;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 750,
  direction = 'up',
  threshold = 0.12,
  id,
  as: Component = 'div',
  style = {},
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  const getInitialTransformClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-10 sm:translate-y-14';
      case 'down':
        return '-translate-y-10 sm:-translate-y-14';
      case 'left':
        return 'translate-x-8 sm:translate-x-12';
      case 'right':
        return '-translate-x-8 sm:-translate-x-12';
      case 'zoom':
        return 'scale-90 sm:scale-95';
      case 'fade':
      case 'none':
      default:
        return '';
    }
  };

  const hiddenState = `opacity-0 ${getInitialTransformClass()}`;
  const visibleState = 'opacity-100 translate-x-0 translate-y-0 scale-100';

  return (
    <Component
      ref={ref}
      id={id}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      className={`transition-all will-change-[transform,opacity] ${
        isVisible ? visibleState : hiddenState
      } ${className}`}
    >
      {children}
    </Component>
  );
};
