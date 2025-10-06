// Configurações de animações sutis para o projeto
// Animações imperceptíveis que melhoram a UX sem chamar atenção

export const subtleAnimations = {
  // Animações de hover sutis
  hover: {
    scale: 1.02,
    transition: { duration: 0.1, ease: "easeOut" }
  },
  
  // Animações de tap sutis
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" }
  },
  
  // Animações de entrada sutis
  fadeIn: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  // Animações de entrada com delay
  fadeInStagger: (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.3, 
      delay: index * 0.1,
      ease: "easeOut"
    }
  }),
  
  // Animações de modal
  modal: {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    },
    content: {
      initial: { scale: 0.95, opacity: 0, y: 20 },
      animate: { scale: 1, opacity: 1, y: 0 },
      exit: { scale: 0.95, opacity: 0, y: 20 },
      transition: { duration: 0.3, ease: "easeOut" }
    }
  },
  
  // Animações de botão
  button: {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    transition: { duration: 0.1 }
  },
  
  // Animações de card
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
    hover: { y: -2 },
    tap: { scale: 0.98 }
  }
};

// Variantes para animações mais complexas
export const animationVariants = {
  // Lista com stagger
  list: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  // Item da lista
  listItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  },
  
  // Navegação
  navItem: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { duration: 0.1 }
  }
};

// Configurações de transição padrão
export const defaultTransitions = {
  fast: { duration: 0.1, ease: "easeOut" },
  normal: { duration: 0.3, ease: "easeOut" },
  slow: { duration: 0.5, ease: "easeOut" }
};
