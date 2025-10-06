'use client';

import { motion } from 'framer-motion';
import { useAnimations } from '@/hooks/useAnimations';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  onClick?: () => void;
}

export default function AnimatedCard({ 
  children, 
  className = '',
  index = 0,
  onClick
}: AnimatedCardProps) {
  const { card, fadeInStagger } = useAnimations();
  
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}
      initial={card.initial}
      animate={card.animate}
      transition={card.transition}
      whileHover={card.hover}
      whileTap={card.tap}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
}
