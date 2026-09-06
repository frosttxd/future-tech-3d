import { motion } from 'framer-motion';

export interface ShiningTextProps {
  text: string;
  className?: string;
  delay?: number;
  repeatDelay?: number;
  duration?: number;
  as?: 'span' | 'h1' | 'p' | 'div';
}

export function ShiningText({
  text,
  className = '',
  delay = 2,
  repeatDelay = 5,
  duration = 2,
  as = 'span',
}: ShiningTextProps) {
  const Component = motion[as];

  return (
    <Component
      className={`inline-block bg-[linear-gradient(110deg,#8e8d88,35%,#ffffff,50%,#8e8d88,75%,#8e8d88)] bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      initial={{ backgroundPosition: '200% 0' }}
      animate={{ backgroundPosition: '-200% 0' }}
      transition={{
        delay,
        repeat: Infinity,
        repeatDelay,
        duration,
        ease: 'linear',
      }}
    >
      {text}
    </Component>
  );
}

export default ShiningText;
