import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import { authRoutes } from './routes/auth';
import { propertyRoutes } from './routes/properties';
import { paymentRoutes } from './routes/payments';
import { authMiddleware } from './middleware/auth';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { logger } from './config/logger';
import { auth } from './config/database';

/**
 * Servidor principal da API seguindo princípios SOLID
 * Single Responsibility: Responsável apenas por configurar e iniciar o servidor
 * Open/Closed: Fácil de estender com novas funcionalidades
 * Dependency Inversion: Depende de abstrações, não de implementações concretas
 */
async function buildServer() {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    },
  });

  // Configuração de CORS
  await fastify.register(cors, {
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configuração de segurança
  await fastify.register(helmet, {
    contentSecurityPolicy: false, // Desabilitado temporariamente para o Scalar
  });

  // Configuração de rate limiting
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Configuração do Swagger para gerar especificação OpenAPI
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'QueroHouse API',
        description: 'API para plataforma de imóveis',
        version: '1.0.0',
        contact: {
          name: 'QueroHouse',
          email: 'contato@querohouse.com.br',
        },
      },
      servers: [
        {
          url: process.env.API_URL || 'http://localhost:3001',
          description: 'Servidor de desenvolvimento',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      tags: [
        { name: 'auth', description: 'Endpoints de autenticação' },
        { name: 'properties', description: 'Endpoints de propriedades' },
      ],
    },
  });

  // Configuração do Scalar API Reference
  await fastify.register(ScalarApiReference, {
    routePrefix: '/docs',
    configuration: {
      spec: {
        url: '/documentation/json',
      },
    },
  });

  // Endpoint para especificação OpenAPI
  fastify.get('/documentation/json', async (request, reply) => {
    return fastify.swagger();
  });


  // Middleware global de autenticação apenas para rotas de auth específicas
  fastify.addHook('preHandler', async (request, reply) => {
    // Aplicar middleware apenas para rotas de auth que precisam de autenticação
    if (request.url.startsWith('/api/auth/profile') || 
        request.url.startsWith('/api/auth/update-profile')) {
      return authMiddleware(request, reply);
    }
  });

  // Middleware global de tratamento de erros
  fastify.setErrorHandler((error, request, reply) => {
    logger.error({ error, request: request.url }, 'Erro não tratado');
    
    return reply.status(500).send({
      success: false,
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  });

  // Registro das rotas
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(propertyRoutes, { prefix: '/api' });
  await fastify.register(paymentRoutes, { prefix: '/api/payments' });

  // Rota de health check
  fastify.get('/health', async (request, reply) => {
    logger.info('Health check solicitado');
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
  });

  // Rota raiz
  fastify.get('/', async (request, reply) => {
    logger.info('Acesso à rota raiz');
    return { 
      message: 'QueroHouse API v1.0.0',
      docs: '/docs',
      openapi: '/documentation/json',
      health: '/health',
      endpoints: {
        auth: '/api/auth',
        properties: '/api/properties'
      }
    };
  });

  return fastify;
}

/**
 * Inicialização do servidor
 */
async function start() {
  try {
    const server = await buildServer();
    
    const port = parseInt(process.env.PORT || '3001');

    await server.listen({ port, 
      host: process.env.NODE_ENV === 'development' ? '0.0.0.0' : 'localhost'
     });
    
  } catch (error) {
    logger.error(error, 'Inicialização do servidor');
    process.exit(1);
  }
}

// Iniciar servidor se este arquivo for executado diretamente
if (require.main === module) {
  start();
}

export { buildServer };
