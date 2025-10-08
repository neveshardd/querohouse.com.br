"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = buildServer;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const auth_1 = require("./routes/auth");
const properties_1 = require("./routes/properties");
const payments_1 = require("./routes/payments");
const uploads_1 = require("./routes/uploads");
const auth_2 = require("./middleware/auth");
const fastify_api_reference_1 = __importDefault(require("@scalar/fastify-api-reference"));
const logger_1 = require("./config/logger");
async function buildServer() {
    const fastify = (0, fastify_1.default)({
        logger: {
            transport: {
                target: 'pino-pretty'
            }
        },
    });
    await fastify.register(cors_1.default, {
        origin: [
            process.env.FRONTEND_URL || 'http://localhost:3000',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-upload-kind'],
    });
    await fastify.register(helmet_1.default, {
        contentSecurityPolicy: false,
    });
    await fastify.register(rate_limit_1.default, {
        max: 100,
        timeWindow: '1 minute',
    });
    await fastify.register(swagger_1.default, {
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
    await fastify.register(fastify_api_reference_1.default, {
        routePrefix: '/docs',
        configuration: {
            spec: {
                url: '/documentation/json',
            },
        },
    });
    fastify.get('/documentation/json', async (request, reply) => {
        return fastify.swagger();
    });
    fastify.addHook('preHandler', async (request, reply) => {
        if (request.url.startsWith('/api/auth/profile') ||
            request.url.startsWith('/api/auth/update-profile')) {
            return (0, auth_2.authMiddleware)(request, reply);
        }
    });
    fastify.setErrorHandler((error, request, reply) => {
        logger_1.logger.error({ error, request: request.url }, 'Erro não tratado');
        return reply.status(500).send({
            success: false,
            error: 'Erro interno do servidor',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    });
    await fastify.register(auth_1.authRoutes, { prefix: '/api/auth' });
    await fastify.register(properties_1.propertyRoutes, { prefix: '/api' });
    await fastify.register(payments_1.paymentRoutes, { prefix: '/api/payments' });
    await fastify.register(uploads_1.uploadRoutes, { prefix: '/api' });
    fastify.get('/health', async (request, reply) => {
        logger_1.logger.info('Health check solicitado');
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        };
    });
    fastify.get('/', async (request, reply) => {
        logger_1.logger.info('Acesso à rota raiz');
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
async function start() {
    try {
        const server = await buildServer();
        const port = parseInt(process.env.PORT || '3001');
        const host = process.env.HOST || '0.0.0.0';
        await server.listen({ port, host });
    }
    catch (error) {
        logger_1.logger.error(error, 'Inicialização do servidor');
        process.exit(1);
    }
}
if (require.main === module) {
    start();
}
//# sourceMappingURL=index.js.map