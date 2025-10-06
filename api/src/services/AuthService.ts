import { auth } from '@/config/database';
import { 
  LoginRequest, 
  RegisterRequest, 
  ForgotPasswordRequest, 
  ResetPasswordRequest,
  UpdateProfileRequest,
  AuthResponse,
  ApiResponse,
  User
} from '@/types/auth';

/**
 * Serviço de autenticação seguindo o princípio Single Responsibility
 * Responsável apenas por operações de autenticação
 */
export class AuthService {
  /**
   * Realiza login do usuário
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const result = await auth.api.signInEmail({
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      });

      if (!result) {
        return {
          success: false,
          error: 'Credenciais inválidas',
        };
      }

      return {
        success: true,
        data: {
          user: (result as any).user as User,
          token: (result as any).session ? ((result as any).session as any).id : '',
          refreshToken: (result as any).session ? ((result as any).session as any).id : '',
        },
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        error: 'Credenciais inválidas',
      };
    }
  }

  /**
   * Registra novo usuário
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      console.log('Tentando registrar usuário:', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        passwordLength: userData.password?.length,
        phone: userData.phone,
        role: userData.role
      });
      
      const result = await auth.api.signUpEmail({
        body: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
        },
      } as any);

      console.log('Resultado do signUpEmail:', result);

      if (!result) {
        return {
          success: false,
          error: 'Erro ao criar usuário',
        };
      }

      return {
        success: true,
        data: {
          user: (result as any).user as User,
          token: (result as any).session ? ((result as any).session as any).id : '',
          refreshToken: (result as any).session ? ((result as any).session as any).id : '',
        },
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      console.error('Tipo do erro:', typeof error);
      console.error('Erro completo:', JSON.stringify(error, null, 2));
      
      // Extrair mensagem de erro mais específica
      let errorMessage = 'Erro interno do servidor';
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        console.error('Mensagem de erro:', errorMsg);
        
        if (errorMsg.includes('email') && (errorMsg.includes('already') || errorMsg.includes('exists') || errorMsg.includes('duplicate'))) {
          errorMessage = 'Email já está em uso';
        } else if (errorMsg.includes('password') && (errorMsg.includes('weak') || errorMsg.includes('invalid') || errorMsg.includes('short'))) {
          errorMessage = 'Senha deve ter pelo menos 6 caracteres';
        } else if (errorMsg.includes('name') && (errorMsg.includes('invalid') || errorMsg.includes('required'))) {
          errorMessage = 'Nome é obrigatório';
        } else if (errorMsg.includes('validation') || errorMsg.includes('invalid')) {
          errorMessage = 'Dados inválidos. Verifique os campos preenchidos';
        } else if (errorMsg.includes('type') && errorMsg.includes('missing')) {
          errorMessage = 'Erro de configuração do sistema. Tente novamente.';
        } else {
          errorMessage = error.message;
        }
      }
      
      console.error('Erro específico no AuthService:', errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Realiza logout do usuário
   */
  async logout(sessionId: string): Promise<ApiResponse> {
    try {
      await auth.api.signOut({
        headers: {
          authorization: `Bearer ${sessionId}`,
        } as any,
      });

      return {
        success: true,
        message: 'Logout realizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao realizar logout',
      };
    }
  }

  /**
   * Obtém perfil do usuário
   */
  async getProfile(sessionId: string): Promise<ApiResponse<User>> {
    try {
      const result = await auth.api.getSession({
        headers: {
          authorization: `Bearer ${sessionId}`,
        } as any,
      });

      if (!result) {
        return {
          success: false,
          error: 'Sessão inválida',
        };
      }

      return {
        success: true,
        data: (result as any).user as User,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter perfil',
      };
    }
  }

  /**
   * Atualiza perfil do usuário
   */
  async updateProfile(sessionId: string, userData: UpdateProfileRequest): Promise<ApiResponse<User>> {
    try {
      const result = await auth.api.updateUser({
        body: userData,
        headers: {
          authorization: `Bearer ${sessionId}`,
        } as any,
      } as any);

      if (!result) {
        return {
          success: false,
          error: 'Erro ao atualizar perfil',
        };
      }

      return {
        success: true,
        data: (result as any).user as User,
      };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return {
        success: false,
        error: 'Erro ao atualizar perfil',
      };
    }
  }

  /**
   * Solicita reset de senha
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    try {
      await auth.api.forgetPassword({
        body: {
          email: data.email,
          redirectTo: process.env.REDIRECT_URL || 'http://localhost:3000/reset-password',
        },
      });

      return {
        success: true,
        message: 'Email de recuperação enviado',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao enviar email de recuperação',
      };
    }
  }

  /**
   * Reseta senha do usuário
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    try {
      await auth.api.resetPassword({
        body: {
          token: data.token,
          newPassword: data.password,
        },
      });

      return {
        success: true,
        message: 'Senha alterada com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao alterar senha',
      };
    }
  }
}
