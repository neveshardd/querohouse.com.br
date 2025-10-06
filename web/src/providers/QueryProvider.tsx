'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/**
 * Provider do React Query seguindo princípios SOLID
 * Single Responsibility: Responsável apenas por configurar o React Query
 * Dependency Inversion: Depende de abstrações, não de implementações concretas
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo de cache padrão
            staleTime: 5 * 60 * 1000, // 5 minutos
            gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
            // Retry automático
            retry: (failureCount, error) => {
              // Não retry em erros 401, 403, 404
              if (error && typeof error === 'object' && 'status' in error) {
                const status = (error as any).status;
                if ([401, 403, 404].includes(status)) {
                  return false;
                }
              }
              // Retry até 3 vezes para outros erros
              return failureCount < 3;
            },
            // Retry delay exponencial
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // Retry para mutations
            retry: (failureCount, error) => {
              if (error && typeof error === 'object' && 'status' in error) {
                const status = (error as any).status;
                if ([401, 403, 404, 422].includes(status)) {
                  return false;
                }
              }
              return failureCount < 2;
            },
            // Suprimir logs de erro para mutations de autenticação
            onError: (error, variables, context) => {
              // Só logar se não for um erro silencioso
              if (!(error as any)?.silent) {
                console.error('Mutation error:', error);
              }
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
