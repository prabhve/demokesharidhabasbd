import React from 'react';

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
  id,
}) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};
