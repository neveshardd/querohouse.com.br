"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const AuthController_1 = require("@/controllers/AuthController");
async function authRoutes(fastify) {
    const authController = new AuthController_1.AuthController();
    const loginSchema = {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 6 },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    data: {
                        type: 'object',
                        properties: {
                            user: { type: 'object' },
                            token: { type: 'string' },
                            refreshToken: { type: 'string' },
                        },
                    },
                },
            },
        },
    };
    const registerSchema = {
        body: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                name: { type: 'string', minLength: 2 },
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 6 },
                role: { type: 'string', enum: ['user', 'corretor', 'proprietario', 'incorporadora'] },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    data: {
                        type: 'object',
                        properties: {
                            user: { type: 'object' },
                            token: { type: 'string' },
                            refreshToken: { type: 'string' },
                        },
                    },
                },
            },
        },
    };
    fastify.post('/sign-up', {
        schema: {
            ...registerSchema,
            tags: ['auth'],
            summary: 'Registrar usuário',
            description: 'Cria uma nova conta de usuário usando Better Auth',
        },
        handler: authController.register.bind(authController),
    });
    fastify.post('/sign-in', {
        schema: {
            ...loginSchema,
            tags: ['auth'],
            summary: 'Fazer login',
            description: 'Autentica um usuário usando Better Auth',
        },
        handler: authController.login.bind(authController),
    });
    fastify.post('/sign-out', {
        schema: {
            tags: ['auth'],
            summary: 'Fazer logout',
            description: 'Encerra a sessão do usuário',
            security: [{ bearerAuth: [] }],
        },
        handler: authController.logout.bind(authController),
    });
    fastify.get('/session', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        data: { type: 'object' },
                    },
                },
            },
            tags: ['auth'],
            summary: 'Obter sessão atual',
            description: 'Retorna os dados da sessão atual do usuário',
            security: [{ bearerAuth: [] }],
        },
        handler: authController.getProfile.bind(authController),
    });
    fastify.put('/update-user', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', minLength: 2 },
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    avatar: { type: 'string', format: 'uri' },
                },
            },
            tags: ['auth'],
            summary: 'Atualizar usuário',
            description: 'Atualiza os dados do usuário autenticado',
            security: [{ bearerAuth: [] }],
        },
        handler: authController.updateProfile.bind(authController),
    });
    fastify.post('/forget-password', {
        schema: {
            body: {
                type: 'object',
                required: ['email'],
                properties: {
                    email: { type: 'string', format: 'email' },
                },
            },
            tags: ['auth'],
            summary: 'Esqueci minha senha',
            description: 'Envia email para redefinir senha',
        },
        handler: authController.forgotPassword.bind(authController),
    });
    fastify.post('/reset-password', {
        schema: {
            body: {
                type: 'object',
                required: ['token', 'password'],
                properties: {
                    token: { type: 'string' },
                    password: { type: 'string', minLength: 6 },
                },
            },
            tags: ['auth'],
            summary: 'Redefinir senha',
            description: 'Redefine a senha usando o token recebido por email',
        },
        handler: authController.resetPassword.bind(authController),
    });
    fastify.get('/docs', {
        schema: {
            tags: ['auth'],
            summary: 'Documentação das rotas de autenticação',
            description: 'Lista as rotas disponíveis do Better Auth',
        },
        handler: async (request, reply) => {
            return {
                message: 'Rotas de autenticação implementadas com Better Auth',
                availableRoutes: [
                    'POST /api/auth/sign-up - Registrar usuário',
                    'POST /api/auth/sign-in - Fazer login',
                    'POST /api/auth/sign-out - Fazer logout',
                    'GET /api/auth/session - Obter sessão atual',
                    'POST /api/auth/forget-password - Esqueci minha senha',
                    'POST /api/auth/reset-password - Redefinir senha',
                    'PUT /api/auth/update-user - Atualizar usuário',
                ],
                note: 'Todas as rotas usam Better Auth internamente'
            };
        },
    });
}
//# sourceMappingURL=auth.js.map