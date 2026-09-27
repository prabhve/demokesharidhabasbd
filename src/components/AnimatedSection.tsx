import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  threshold?: number;
  id?: string;
  as?: 'div' | 'section' | 'article';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialVariants = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 32, scale: 0.99 };
      case 'down':
        return { opacity: 0, y: -32, scale: 0.99 };
      case 'left':
        return { opacity: 0, x: 32 };
      case 'right':
        return { opacity: 0, x: -32 };
      case 'zoom':
        return { opacity: 0, scale: 0.94 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateVariants = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0, scale: 1 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'zoom':
        return { opacity: 1, scale: 1 };
      case 'fade':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      id={id}
      initial={getInitialVariants()}
      whileInView={getAnimateVariants()}
      viewport={{ once: true, amount: threshold, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: 0.75,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
