# Sistema de Animações Sutis

Este documento descreve o sistema de animações sutis implementado no projeto QueroHouse usando Framer Motion.

## Filosofia

As animações foram projetadas para serem **imperceptíveis** - melhoram a experiência do usuário sem chamar atenção para si mesmas. Elas são:

- **Sutis**: Escalas de 1.02-1.05, durações de 0.1-0.3s
- **Consistentes**: Mesmas configurações em todo o projeto
- **Performáticas**: Usando transformações CSS quando possível
- **Acessíveis**: Respeitam preferências de movimento reduzido

## Estrutura

```
src/
├── lib/
│   └── animations.ts          # Configurações centralizadas
├── hooks/
│   └── useAnimations.ts      # Hook personalizado
└── components/
    ├── AnimatedButton.tsx     # Botão com animações
    └── AnimatedCard.tsx       # Card com animações
```

## Uso Básico

### Hook useAnimations

```tsx
import { useAnimations } from '@/hooks/useAnimations';

function MyComponent() {
  const { hover, tap, fadeIn } = useAnimations();
  
  return (
    <motion.div
      {...fadeIn}
      whileHover={hover}
      whileTap={tap}
    >
      Conteúdo
    </motion.div>
  );
}
```

### Animações Pré-definidas

```tsx
// Hover sutil
const { hover } = useAnimations();
// { scale: 1.02, transition: { duration: 0.1 } }

// Tap sutil
const { tap } = useAnimations();
// { scale: 0.98, transition: { duration: 0.1 } }

// Fade in
const { fadeIn } = useAnimations();
// { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
```

### Animações de Lista com Stagger

```tsx
const { list, listItem } = useAnimations();

<motion.div variants={list} initial="hidden" animate="visible">
  {items.map((item, index) => (
    <motion.div key={item.id} variants={listItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Animações de Modal

```tsx
const { modal } = useAnimations();

<AnimatePresence>
  <motion.div {...modal.backdrop}>
    <motion.div {...modal.content}>
      Conteúdo do modal
    </motion.div>
  </motion.div>
</AnimatePresence>
```

## Componentes Animados

### AnimatedButton

```tsx
import AnimatedButton from '@/components/AnimatedButton';

<AnimatedButton 
  variant="primary" 
  size="md"
  onClick={handleClick}
>
  Clique aqui
</AnimatedButton>
```

### AnimatedCard

```tsx
import AnimatedCard from '@/components/AnimatedCard';

<AnimatedCard index={0} onClick={handleCardClick}>
  <h3>Título</h3>
  <p>Conteúdo do card</p>
</AnimatedCard>
```

## Configurações Avançadas

### Animações Customizadas

```tsx
const { createHover, createStagger } = useAnimations();

// Hover customizado
<motion.div {...createHover(1.05)}>
  Conteúdo
</motion.div>

// Stagger customizado
<motion.div {...createStagger(0.2)}>
  Conteúdo
</motion.div>
```

### Transições Personalizadas

```tsx
const { transitions } = useAnimations();

<motion.div
  animate={{ x: 100 }}
  transition={transitions.fast} // 0.1s
  // ou
  transition={transitions.normal} // 0.3s
  // ou
  transition={transitions.slow} // 0.5s
>
  Conteúdo
</motion.div>
```

## Boas Práticas

1. **Use o hook useAnimations** para manter consistência
2. **Prefira animações sutis** - o usuário não deve notar que há animações
3. **Teste em dispositivos lentos** - animações devem ser performáticas
4. **Respeite preferências de movimento** - use `prefers-reduced-motion`
5. **Mantenha consistência** - use as mesmas configurações em todo o projeto

## Exemplo Completo

```tsx
import { motion } from 'framer-motion';
import { useAnimations } from '@/hooks/useAnimations';

function PropertyGrid({ properties }) {
  const { list, listItem } = useAnimations();
  
  return (
    <motion.div 
      variants={list} 
      initial="hidden" 
      animate="visible"
      className="grid grid-cols-3 gap-6"
    >
      {properties.map((property, index) => (
        <motion.div 
          key={property.id} 
          variants={listItem}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Acessibilidade

O sistema respeita a preferência `prefers-reduced-motion` automaticamente. Para implementar:

```tsx
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animation = shouldReduceMotion 
  ? { duration: 0 } 
  : subtleAnimations.fadeIn;
```

## Performance

- Use `transform` e `opacity` para animações suaves
- Evite animar propriedades que causam reflow (width, height, etc.)
- Use `will-change` apenas quando necessário
- Prefira animações CSS quando possível
