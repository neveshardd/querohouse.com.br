import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthServiceFixed } from '@/services/AuthServiceFixed';
import { logger } from '@/config/logger';
import { 
  LoginSchema, 
  RegisterSchema, 
  ForgotPasswordSchema, 
  ResetPasswordSchema,
  UpdateProfileSchema 
} from '@/types/auth';

/**
 * Controller de autenticação seguindo o princípio Single Responsibility
 * Responsável apenas por receber requisições HTTP e retornar respostas
 */
export class AuthController {
  private authService: AuthServiceFixed;

  constructor() {
    this.authService = new AuthServiceFixed();
  }

  /**
   * Endpoint de login
   */
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      logger.info('Tentativa de login iniciada');
      const credentials = LoginSchema.parse(request.body);
      const result = await this.authService.login(credentials);

      logger.info(`Resultado do login: ${JSON.stringify(result, null, 2)}`);

      if (!result.success) {
        logger.error('Login falhou - credenciais inválidas');
        return reply.status(401).send(result);
      }

      logger.info('Login realizado com sucesso');
      return reply.status(200).send(result);
    } catch (error) {
      logger.error({ error }, 'Erro no processo de login');
      return reply.status(400).send({
        success: false,
        error: 'Dados inválidos',
      });
    }
  }

  /**
   * Endpoint de registro
   */
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      logger.info('Tentativa de registro iniciada');
      
      // Log dos dados recebidos
      logger.info({
        name: (request.body as any)?.name,
        email: (request.body as any)?.email,
        password: (request.body as any)?.password,
        passwordLength: (request.body as any)?.password?.length,
        phone: (request.body as any)?.phone,
        role: (request.body as any)?.role
      }, 'Dados recebidos');
      
      // Validar dados de entrada
      const userData = RegisterSchema.parse(request.body);
      logger.info('Dados validados com sucesso');
      
      const result = await this.authService.register(userData);
      logger.info('Resultado do registro');

      if (!result.success) {
        logger.error('Registro falhou');
        return reply.status(400).send(result);
      }

      logger.info('Registro realizado com sucesso');
      return reply.status(201).send(result);
    } catch (error) {
      logger.error({ error }, 'Erro no processo de registro');
      
      // Extrair mensagem de erro mais específica
      let errorMessage = 'Dados inválidos';
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('email') && (errorMsg.includes('already') || errorMsg.includes('exists') || errorMsg.includes('duplicate'))) {
          errorMessage = 'Email já está em uso';
        } else if (errorMsg.includes('password') && (errorMsg.includes('weak') || errorMsg.includes('invalid') || errorMsg.includes('short'))) {
          errorMessage = 'Senha deve ter pelo menos 6 caracteres';
        } else if (errorMsg.includes('name') && (errorMsg.includes('invalid') || errorMsg.includes('required'))) {
          errorMessage = 'Nome é obrigatório';
        } else if (errorMsg.includes('validation') || errorMsg.includes('invalid')) {
          errorMessage = 'Dados inválidos. Verifique os campos preenchidos';
        } else {
          errorMessage = error.message;
        }
      }
      
      logger.error('Erro específico: ' + errorMessage);
      
      return reply.status(400).send({
        success: false,
        error: errorMessage,
      });
    }
  }

  /**
   * Endpoint de logout
   */
  async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      const sessionId = request.headers.authorization?.replace('Bearer ', '');
      
      if (!sessionId) {
        return reply.status(401).send({
          success: false,
          error: 'Token não fornecido',
        });
      }

      const result = await this.authService.logout(sessionId);
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Endpoint para obter perfil do usuário
   */
  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const sessionId = request.headers.authorization?.replace('Bearer ', '');
      
      if (!sessionId) {
        return reply.status(401).send({
          success: false,
          error: 'Token não fornecido',
        });
      }

      const result = await this.authService.getProfile(sessionId);
      
      if (!result.success) {
        return reply.status(401).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Endpoint para atualizar perfil do usuário
   */
  async updateProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const sessionId = request.headers.authorization?.replace('Bearer ', '');
      
      if (!sessionId) {
        return reply.status(401).send({
          success: false,
          error: 'Token não fornecido',
        });
      }

      const userData = UpdateProfileSchema.parse(request.body);
      const result = await this.authService.updateProfile(sessionId, userData);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(400).send({
        success: false,
        error: 'Dados inválidos',
      });
    }
  }

  /**
   * Endpoint para solicitar reset de senha
   */
  async forgotPassword(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = ForgotPasswordSchema.parse(request.body);
      const result = await this.authService.forgotPassword(data);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(400).send({
        success: false,
        error: 'Dados inválidos',
      });
    }
  }

  /**
   * Endpoint para resetar senha
   */
  async resetPassword(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = ResetPasswordSchema.parse(request.body);
      const result = await this.authService.resetPassword(data);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(400).send({
        success: false,
        error: 'Dados inválidos',
      });
    }
  }
}
