import { subtleAnimations, animationVariants, defaultTransitions } from '@/lib/animations';

/**
 * Hook personalizado para facilitar o uso de animações sutis
 * Centraliza as configurações de animação para manter consistência
 */
export function useAnimations() {
  return {
    // Animações básicas
    hover: subtleAnimations.hover,
    tap: subtleAnimations.tap,
    fadeIn: subtleAnimations.fadeIn,
    
    // Animações de modal
    modal: subtleAnimations.modal,
    
    // Animações de botão
    button: subtleAnimations.button,
    
    // Animações de card
    card: subtleAnimations.card,
    
    // Variantes para listas
    list: animationVariants.list,
    listItem: animationVariants.listItem,
    navItem: animationVariants.navItem,
    
    // Transições
    transitions: defaultTransitions,
    
    // Funções utilitárias
    fadeInStagger: subtleAnimations.fadeInStagger,
    
    // Animações customizadas
    createStagger: (delay: number = 0.1) => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.3, 
        delay,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }),
    
    createHover: (scale: number = 1.02) => ({
      whileHover: { scale },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.1 }
    })
  };
}
