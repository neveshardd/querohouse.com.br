'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

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
  const cardRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // entrada
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      delay: index * 0.1,
      ease: 'power1.out'
    });

    // interações
    const onEnter = () => gsap.to(el, { y: -2, duration: 0.12, ease: 'power1.out' });
    const onLeave = () => gsap.to(el, { y: 0, duration: 0.12, ease: 'power1.out' });
    const onDown = () => gsap.to(el, { scale: 0.98, duration: 0.08, ease: 'power1.out' });
    const onUp = () => gsap.to(el, { scale: 1, duration: 0.12, ease: 'power1.out' });

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchend', onUp, { passive: true });

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchend', onUp);
    };
  }, [index]);
  
  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
}
