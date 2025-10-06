'use client';

import { useNavigationHistory } from '@/hooks/useNavigationHistory';

export default function NavigationTracker() {
  // Este componente apenas inicializa o hook para rastrear a navegação
  useNavigationHistory();
  
  return null;
}
