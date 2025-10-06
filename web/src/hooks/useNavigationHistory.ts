'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useNavigationHistory() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Salvar a página atual no histórico
    const currentHistory = sessionStorage.getItem('breadcrumb-history');
    const history = currentHistory ? JSON.parse(currentHistory) : [];
    
    // Adicionar a página atual se não for a última
    if (history[history.length - 1] !== pathname) {
      const newHistory = [...history, pathname];
      
      // Limitar o histórico a 20 páginas
      if (newHistory.length > 20) {
        newHistory.shift();
      }
      
      sessionStorage.setItem('breadcrumb-history', JSON.stringify(newHistory));
      setCurrentIndex(newHistory.length - 1);
    } else {
      // Se for a mesma página, atualizar o índice
      setCurrentIndex(history.length - 1);
    }
  }, [pathname]);

  const getPreviousPage = () => {
    const currentHistory = sessionStorage.getItem('breadcrumb-history');
    const history = currentHistory ? JSON.parse(currentHistory) : [];
    
    if (history.length >= 2) {
      return history[history.length - 2];
    }
    
    return null;
  };

  const getHistory = () => {
    const currentHistory = sessionStorage.getItem('breadcrumb-history');
    return currentHistory ? JSON.parse(currentHistory) : [];
  };

  const canGoBack = () => {
    return currentIndex > 0;
  };

  return {
    getPreviousPage,
    getHistory,
    canGoBack,
    currentIndex
  };
}
