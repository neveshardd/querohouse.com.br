import axios from 'axios';
import { z } from 'zod';
import { 
  Property, 
  CreatePropertyRequest, 
  UpdatePropertyRequest, 
  PropertyFilters,
  PropertyResponse,
  PropertiesResponse,
  PaginatedResponse
} from '@/types/property';

// Configuração base do Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Para requisições de autenticação, preservar a resposta da API
    if (error.response?.data) {
      // Manter a estrutura de erro da API para que o frontend possa acessar
      error.apiResponse = error.response.data;
    }
    // Expor status e mensagem padronizada
    error.apiStatus = error.response?.status;
    error.apiMessage = error.response?.data?.error || error.response?.data?.message || error.message;
    
    if (error.response?.status === 401) {
      // Token expirado ou inválido - só limpar se não for uma requisição de autenticação
      const isAuthRequest = error.config?.url?.includes('/sign-in') || 
                           error.config?.url?.includes('/sign-up') ||
                           error.config?.url?.includes('/sign-out');
      
      if (!isAuthRequest) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
      
      // Para requisições de autenticação, não logar o erro no console
      if (isAuthRequest) {
        // Silenciar o erro do console para requisições de autenticação
        error.silent = true;
      }
    }
    
    // Para erros 400 (Bad Request) em requisições de autenticação, também silenciar
    if (error.response?.status === 400) {
      const isAuthRequest = error.config?.url?.includes('/sign-in') || 
                           error.config?.url?.includes('/sign-up') ||
                           error.config?.url?.includes('/sign-out');
      
      if (isAuthRequest) {
        // Silenciar o erro do console para requisições de autenticação
        error.silent = true;
      }
    }
    
    return Promise.reject(error);
  }
);

// Schemas de validação
export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phone: z.string().optional(),
  role: z.enum(['user', 'corretor', 'proprietario', 'incorporadora']).optional(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  phone: z.string().optional(),
  avatar: z.string().url('Avatar deve ser uma URL válida').optional(),
});

// Tipos TypeScript
export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'corretor' | 'proprietario' | 'incorporadora';
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Utilitário para padronizar mensagens de erro para UI
export function parseApiErrorMessage(err: any): string {
  const status: number | undefined = err?.apiStatus || err?.response?.status;
  const raw: string = err?.apiResponse?.error || err?.response?.data?.error || err?.response?.data?.message || err?.message || 'Erro inesperado';
  const msg = (raw || '').toString().toLowerCase();

  if (status === 401) return 'Sua sessão expirou ou é inválida. Faça login novamente.';
  if (status === 429) return 'Muitas tentativas. Aguarde alguns instantes e tente novamente.';
  if (msg.includes('credenciais') || msg.includes('unauthorized')) return 'Email ou senha incorretos.';
  if (msg.includes('email já está em uso') || (msg.includes('email') && msg.includes('uso'))) return 'Este email já está em uso.';
  if (msg.includes('senha') && (msg.includes('6') || msg.includes('curta') || msg.includes('fraca'))) return 'A senha deve ter pelo menos 6 caracteres.';
  if (msg.includes('dados inválidos') || msg.includes('validation') || msg.includes('invalid')) return 'Dados inválidos. Verifique os campos e tente novamente.';
  if (msg.includes('usuário não autenticado')) return 'Você precisa estar logado para continuar.';
  if (msg.includes('network') || msg.includes('conexão') || status === 0) return 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';

  return raw || 'Ocorreu um erro. Tente novamente.';
}

// Serviços da API usando Better Auth
export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await api.post('/api/auth/sign-in', {
        email: credentials.email,
        password: credentials.password,
      });
      
      console.log('Resposta do login:', response.data);
      
      // Backend responde { success, data: { user, token, refreshToken } }
      const apiData = response.data;
      if (apiData?.success && apiData?.data?.user) {
        const { user, token, refreshToken } = apiData.data;
        return { success: true, data: { user, token, refreshToken } };
      }
      
      return {
        success: false,
        error: 'Erro ao fazer login'
      };
    } catch (error: any) {
      console.error('Erro no login:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Erro ao fazer login'
      };
    }
  },

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await api.post('/api/auth/sign-up', {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });
      
      console.log('Resposta do registro:', response.data);
      
      // Backend responde { success, data: { user, token, refreshToken } }
      const apiData = response.data;
      if (apiData?.success && apiData?.data?.user) {
        const { user, token, refreshToken } = apiData.data;
        return { success: true, data: { user, token, refreshToken } };
      }
      
      return {
        success: false,
        error: 'Erro ao criar conta'
      };
    } catch (error: any) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Erro ao criar conta'
      };
    }
  },

  async logout(): Promise<ApiResponse> {
    try {
      const response = await api.post('/api/auth/sign-out');
      return {
        success: true,
        message: 'Logout realizado com sucesso'
      };
    } catch (error: any) {
      console.error('Erro no logout:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Erro ao fazer logout'
      };
    }
  },

  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get('/api/auth/session');
      
      console.log('Resposta da sessão:', response.data);
      
      // Backend responde { success, data: user }
      if (response.data?.success && response.data?.data) {
        return { success: true, data: response.data.data };
      }
      
      return {
        success: false,
        error: 'Usuário não autenticado'
      };
    } catch (error: any) {
      console.error('Erro ao obter perfil:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Usuário não autenticado'
      };
    }
  },

  async updateProfile(userData: UpdateProfileRequest): Promise<ApiResponse<User>> {
    try {
      const response = await api.put('/api/auth/update-user', userData);
      
      console.log('Resposta da atualização:', response.data);
      
      // Backend responde { success, data: user }
      if (response.data?.success && response.data?.data) {
        return { success: true, data: response.data.data };
      }
      
      return {
        success: false,
        error: 'Erro ao atualizar perfil'
      };
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Erro ao atualizar perfil'
      };
    }
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    try {
      const response = await api.post('/api/auth/forget-password', {
        email: data.email,
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      console.log('Resposta do forgot password:', response.data);
      
      return {
        success: true,
        message: 'Email de recuperação enviado'
      };
    } catch (error: any) {
      console.error('Erro ao enviar email de recuperação:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Erro ao enviar email de recuperação'
      };
    }
  },

  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    try {
      const response = await api.post('/api/auth/reset-password', {
        token: data.token,
        password: data.password
      });
      
      console.log('Resposta do reset password:', response.data);
      
      return {
        success: true,
        message: 'Senha alterada com sucesso'
      };
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Erro ao alterar senha'
      };
    }
  },
};

// Serviços de propriedades
export const propertyService = {
  // Listar propriedades com filtros e paginação
  async getProperties(
    filters?: PropertyFilters, 
    page: number = 1, 
    limit: number = 10
  ): Promise<PropertiesResponse> {
    const params = new URLSearchParams();
    
    if (filters) {
      // Mapear filtros para o formato esperado pela API
      if (filters.type) {
        params.append('type', filters.type);
      }
      if (filters.status) {
        params.append('status', filters.status);
      }
      if (filters.city) {
        params.append('city', filters.city);
      }
      if (filters.state) {
        params.append('state', filters.state);
      }
      if (filters.minPrice !== undefined) {
        params.append('minPrice', filters.minPrice.toString());
      }
      if (filters.maxPrice !== undefined) {
        params.append('maxPrice', filters.maxPrice.toString());
      }
      if (filters.bedrooms !== undefined) {
        params.append('bedrooms', filters.bedrooms.toString());
      }
      if (filters.bathrooms !== undefined) {
        params.append('bathrooms', filters.bathrooms.toString());
      }
      if (filters.minArea !== undefined) {
        params.append('minArea', filters.minArea.toString());
      }
      if (filters.maxArea !== undefined) {
        params.append('maxArea', filters.maxArea.toString());
      }
      if (filters.isPublished !== undefined) {
        params.append('isPublished', filters.isPublished.toString());
      }
    }
    
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const url = `/api/properties?${params.toString()}`;
    
    const response = await api.get(url);
    return response.data;
  },

  // Obter propriedade por ID
  async getPropertyById(id: string): Promise<PropertyResponse> {
    const response = await api.get(`/api/properties/${id}`);
    return response.data;
  },

  // Criar nova propriedade
  async createProperty(propertyData: CreatePropertyRequest): Promise<PropertyResponse> {
    const response = await api.post('/api/properties', propertyData);
    return response.data;
  },

  // Atualizar propriedade
  async updateProperty(id: string, propertyData: UpdatePropertyRequest): Promise<PropertyResponse> {
    const response = await api.put(`/api/properties/${id}`, propertyData);
    return response.data;
  },

  // Deletar propriedade
  async deleteProperty(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/api/properties/${id}`);
    return response.data;
  },

  // Obter propriedades do usuário logado
  async getUserProperties(page: number = 1, limit: number = 10): Promise<PropertiesResponse> {
    const response = await api.get(`/api/properties/user?page=${page}&limit=${limit}`);
    return response.data;
  },
};

export default api;
