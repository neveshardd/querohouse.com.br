'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => void;
  register: (userData: any) => void;
  logout: () => void;
  updateProfile: (userData: any) => void;
  forgotPassword: (data: any) => void;
  resetPassword: (data: any) => void;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  isUpdatingProfile: boolean;
  isForgotPasswordLoading: boolean;
  isResetPasswordLoading: boolean;
  loginMutation: any;
  registerMutation: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider de autenticação seguindo princípios SOLID
 * Single Responsibility: Responsável apenas por fornecer contexto de autenticação
 * Open/Closed: Fácil de estender com novas funcionalidades
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  // Verificar se há token no localStorage ao inicializar
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && !auth.isAuthenticated) {
      // Refetch do perfil se há token mas usuário não está autenticado
      // Isso será tratado automaticamente pelo React Query
    }
  }, [auth.isAuthenticated]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar o contexto de autenticação
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}
