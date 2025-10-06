import { z } from 'zod';

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
  createdAt: Date;
  updatedAt: Date;
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
