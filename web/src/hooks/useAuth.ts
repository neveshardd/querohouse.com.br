import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginRequest, RegisterRequest, UpdateProfileRequest, ForgotPasswordRequest, ResetPasswordRequest, parseApiErrorMessage, User } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Tipo personalizado para erros da API
interface ApiError extends Error {
  apiResponse?: {
    error?: string;
    message?: string;
  };
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
}
/**
 * Hook de autenticação seguindo princípios SOLID
 * Single Responsibility: Responsável apenas por gerenciar estado de autenticação
 * Open/Closed: Fácil de estender com novas funcionalidades
 */
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Query para obter perfil do usuário (apenas se houver token)
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('auth_token');
  
  const { data: user, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authService.getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: hasToken, // Só executa se houver token
    select: (res) => (res?.success && res.data ? (res.data as User) : null) as User | null,
  });

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: authService.login,
    retry: false, // Não tentar novamente em caso de erro
    meta: {
      silent: true, // Marcar como silencioso para não logar no console
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('refresh_token', data.data.refreshToken);
        queryClient.setQueryData(['auth', 'profile'], data.data.user);
        toast.success('Login realizado com sucesso!');
        // Não redirecionar automaticamente - deixar para o componente decidir
      } else {
        toast.error(data.error || 'Erro ao fazer login');
      }
    },
    onError: (error: ApiError) => {
      // Só logar no console se não for um erro silencioso de autenticação
      if (!(error as any).silent) {
        console.error('Erro no login:', error);
      }
      
      // Limpar tokens em caso de erro
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      queryClient.removeQueries({ queryKey: ['auth', 'profile'] });
      
      // Extrair mensagem de erro específica da API
  const errorMessage = parseApiErrorMessage(error);
      
      // Sempre mostrar toast, mesmo para erros silenciosos
      toast.error(errorMessage);
    },
  });

  // Mutation para registro
  const registerMutation = useMutation({
    mutationFn: authService.register,
    retry: false, // Não tentar novamente em caso de erro
    meta: {
      silent: true, // Marcar como silencioso para não logar no console
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('refresh_token', data.data.refreshToken);
        queryClient.setQueryData(['auth', 'profile'], data.data.user);
        toast.success('Conta criada com sucesso!');
        // Não redirecionar automaticamente - deixar para o componente decidir
      } else {
        toast.error(data.error || 'Erro ao criar conta');
      }
    },
    onError: (error: ApiError) => {
      // Só logar no console se não for um erro silencioso de autenticação
      if (!(error as any).silent) {
        console.error('Erro no registro:', error);
      }
      
      // Limpar tokens em caso de erro
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      queryClient.removeQueries({ queryKey: ['auth', 'profile'] });
      
      // Extrair mensagem de erro específica da API
  const errorMessage = parseApiErrorMessage(error);
      
      // Sempre mostrar toast, mesmo para erros silenciosos
      toast.error(errorMessage);
    },
  });

  // Mutation para logout
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      queryClient.clear();
      toast.success('Logout realizado com sucesso!');
      router.push('/');
    },
    onError: () => {
      // Mesmo com erro, limpar dados locais
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      queryClient.clear();
      router.push('/');
    },
  });

  // Mutation para atualizar perfil
  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      if (data.success && data.data) {
        queryClient.setQueryData(['auth', 'profile'], data.data);
        toast.success('Perfil atualizado com sucesso!');
      } else {
        toast.error(data.error || 'Erro ao atualizar perfil');
      }
    },
    onError: (error) => {
      toast.error(parseApiErrorMessage(error));
    },
  });

  // Mutation para esqueci minha senha
  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Email de recuperação enviado!');
      } else {
        toast.error(data.error || 'Erro ao enviar email');
      }
    },
    onError: (error) => {
      toast.error(parseApiErrorMessage(error));
    },
  });

  // Mutation para resetar senha
  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Senha alterada com sucesso!');
        router.push('/login');
      } else {
        toast.error(data.error || 'Erro ao alterar senha');
      }
    },
    onError: (error) => {
      toast.error('Erro de conexão. Tente novamente.');
    },
  });

  // Funções de conveniência
  const login = (credentials: LoginRequest) => {
    loginMutation.mutate(credentials);
  };

  const register = (userData: RegisterRequest) => {
    registerMutation.mutate(userData);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const updateProfile = (userData: UpdateProfileRequest) => {
    updateProfileMutation.mutate(userData);
  };

  const forgotPassword = (data: ForgotPasswordRequest) => {
    forgotPasswordMutation.mutate(data);
  };

  const resetPassword = (data: ResetPasswordRequest) => {
    resetPasswordMutation.mutate(data);
  };

  // Estado de autenticação - só considera autenticado se user existe e não há erro na query
  const isAuthenticated = !!user && !userError;
  const isLoading = isLoadingUser || loginMutation.isPending || registerMutation.isPending;

  return {
    // Estado
    user: user ?? null,
    isAuthenticated,
    isLoading,
    
    // Funções
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
    
    // Estados das mutations
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    isResetPasswordLoading: resetPasswordMutation.isPending,
    
    // Mutations para acesso direto
    loginMutation,
    registerMutation,
  };
}
