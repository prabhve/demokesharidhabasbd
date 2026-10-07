import React, { ElementType } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: '3d-rise' | '3d-tilt-left' | '3d-tilt-right' | '3d-zoom' | 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  id?: string;
  as?: ElementType;
  style?: React.CSSProperties;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 550,
  direction = '3d-rise',
  threshold = 0,
  id,
  as: Component = 'div',
  style = {},
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '150px 0px 150px 0px',
    triggerOnce: true,
  });

  // Calculate 3D perspective transform based on direction
  const getTransform = () => {
    if (direction === 'none') return '';
    if (isVisible) {
      return 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale3d(1, 1, 1)';
    }

    switch (direction) {
      case '3d-rise':
        return 'perspective(1200px) rotateX(10deg) translate3d(0, 24px, -30px) scale3d(0.98, 0.98, 0.98)';
      case '3d-tilt-left':
        return 'perspective(1200px) rotateY(-8deg) rotateX(4deg) translate3d(-20px, 16px, -20px) scale3d(0.98, 0.98, 0.98)';
      case '3d-tilt-right':
        return 'perspective(1200px) rotateY(8deg) rotateX(4deg) translate3d(20px, 16px, -20px) scale3d(0.98, 0.98, 0.98)';
      case '3d-zoom':
        return 'perspective(1200px) rotateX(6deg) translate3d(0, 16px, -40px) scale3d(0.95, 0.95, 0.95)';
      case 'up':
        return 'perspective(1200px) rotateX(6deg) translate3d(0, 20px, -15px)';
      case 'down':
        return 'perspective(1200px) rotateX(-6deg) translate3d(0, -20px, -15px)';
      case 'left':
        return 'perspective(1200px) rotateY(6deg) translate3d(20px, 0, -15px)';
      case 'right':
        return 'perspective(1200px) rotateY(-6deg) translate3d(-20px, 0, -15px)';
      default:
        return 'perspective(1200px) rotateX(8deg) translate3d(0, 20px, -20px)';
    }
  };

  const animatedStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible || direction === 'none' ? 1 : 0,
    transform: getTransform(),
    transitionProperty: 'transform, opacity',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    willChange: isVisible ? 'auto' : 'transform, opacity',
  };

  return (
    <Component ref={ref} id={id} style={animatedStyle} className={className}>
      {children}
    </Component>
  );
};
