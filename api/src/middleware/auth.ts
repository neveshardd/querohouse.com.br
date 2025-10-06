import { FastifyRequest, FastifyReply } from 'fastify';
import { auth } from '../config/database';

/**
 * Middleware de autenticação seguindo o princípio Single Responsibility
 * Responsável apenas por validar tokens de autenticação
 */
export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return reply.status(401).send({
        success: false,
        error: 'Token não fornecido',
      });
    }

    // Verificar se o token é válido
    const session = await auth.api.getSession({
      headers: {
        authorization: `Bearer ${token}`,
      } as any,
    });

    if (!session) {
      return reply.status(401).send({
        success: false,
        error: 'Token inválido ou expirado',
      });
    }

    // Adicionar informações do usuário ao request
    (request as any).user = session.user;
    (request as any).session = session;

  } catch (error) {
    return reply.status(401).send({
      success: false,
      error: 'Erro na validação do token',
    });
  }
}

/**
 * Middleware para verificar roles específicas
 */
export function requireRole(roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      
      if (!user) {
        return reply.status(401).send({
          success: false,
          error: 'Usuário não autenticado',
        });
      }

      if (!roles.includes(user.role)) {
        return reply.status(403).send({
          success: false,
          error: 'Acesso negado',
        });
      }
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro na verificação de permissões',
      });
    }
  };
}
