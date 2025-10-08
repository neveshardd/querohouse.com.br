"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRoutes = propertyRoutes;
const PropertyController_1 = require("../controllers/PropertyController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
async function propertyRoutes(fastify) {
    const propertyController = new PropertyController_1.PropertyController();
    fastify.get('/properties', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    type: { type: 'string', enum: ['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL'] },
                    status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING'] },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    minPrice: { type: 'number' },
                    maxPrice: { type: 'number' },
                    bedrooms: { type: 'number' },
                    bathrooms: { type: 'number' },
                    minArea: { type: 'number' },
                    maxArea: { type: 'number' },
                    isPublished: { type: 'boolean' },
                    page: { type: 'number', default: 1 },
                    limit: { type: 'number', default: 10 },
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
                                properties: { type: 'array' },
                                pagination: { type: 'object' },
                            },
                        },
                    },
                },
            },
            tags: ['properties'],
            summary: 'Listar propriedades',
            description: 'Lista todas as propriedades com filtros opcionais',
        },
        handler: propertyController.getProperties.bind(propertyController),
    });
    fastify.get('/properties/:id', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
                required: ['id'],
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        data: { type: 'object' },
                    },
                },
            },
            tags: ['properties'],
            summary: 'Obter propriedade por ID',
            description: 'Retorna os detalhes de uma propriedade específica',
        },
        handler: propertyController.getPropertyById.bind(propertyController),
    });
    const prisma = new client_1.PrismaClient();
    const authMiddleware = async (request, reply) => {
        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return reply.status(401).send({ success: false, error: 'Token não fornecido' });
        }
        try {
            const secret = process.env.JWT_SECRET || 'your-secret-key-here';
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (!user) {
                return reply.status(401).send({ success: false, error: 'Token inválido ou expirado' });
            }
            request.user = user;
        }
        catch (error) {
            return reply.status(401).send({ success: false, error: 'Token inválido' });
        }
    };
    fastify.post('/properties', {
        preHandler: authMiddleware,
        schema: {
            body: {
                type: 'object',
                required: ['title', 'description', 'price', 'type', 'address', 'city', 'state'],
                properties: {
                    title: { type: 'string', minLength: 1 },
                    description: { type: 'string', minLength: 1 },
                    price: { type: 'number', minimum: 0 },
                    type: { type: 'string', enum: ['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL'] },
                    bedrooms: { type: 'number', minimum: 1 },
                    bathrooms: { type: 'number', minimum: 1 },
                    area: { type: 'number', minimum: 0 },
                    address: { type: 'string', minLength: 1 },
                    city: { type: 'string', minLength: 1 },
                    state: { type: 'string', minLength: 1 },
                    zipCode: { type: 'string' },
                    latitude: { type: 'number' },
                    longitude: { type: 'number' },
                    images: { type: 'array', items: { type: 'string', format: 'uri' } },
                    features: { type: 'array', items: { type: 'string' } },
                },
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        data: { type: 'object' },
                    },
                },
            },
            tags: ['properties'],
            summary: 'Criar propriedade',
            description: 'Cria uma nova propriedade (requer autenticação)',
            security: [{ bearerAuth: [] }],
        },
        handler: propertyController.createProperty.bind(propertyController),
    });
    fastify.put('/properties/:id', {
        preHandler: authMiddleware,
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
                required: ['id'],
            },
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string', minLength: 1 },
                    description: { type: 'string', minLength: 1 },
                    price: { type: 'number', minimum: 0 },
                    type: { type: 'string', enum: ['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL'] },
                    status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING'] },
                    bedrooms: { type: 'number', minimum: 1 },
                    bathrooms: { type: 'number', minimum: 1 },
                    area: { type: 'number', minimum: 0 },
                    address: { type: 'string', minLength: 1 },
                    city: { type: 'string', minLength: 1 },
                    state: { type: 'string', minLength: 1 },
                    zipCode: { type: 'string' },
                    latitude: { type: 'number' },
                    longitude: { type: 'number' },
                    images: { type: 'array', items: { type: 'string', format: 'uri' } },
                    features: { type: 'array', items: { type: 'string' } },
                    isPublished: { type: 'boolean' },
                },
            },
            tags: ['properties'],
            summary: 'Atualizar propriedade',
            description: 'Atualiza uma propriedade existente (requer autenticação)',
            security: [{ bearerAuth: [] }],
        },
        handler: propertyController.updateProperty.bind(propertyController),
    });
    fastify.delete('/properties/:id', {
        preHandler: authMiddleware,
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
                required: ['id'],
            },
            tags: ['properties'],
            summary: 'Deletar propriedade',
            description: 'Remove uma propriedade (requer autenticação)',
            security: [{ bearerAuth: [] }],
        },
        handler: propertyController.deleteProperty.bind(propertyController),
    });
    fastify.get('/properties/user/my-properties', {
        preHandler: authMiddleware,
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'number', default: 1 },
                    limit: { type: 'number', default: 10 },
                },
            },
            tags: ['properties'],
            summary: 'Listar minhas propriedades',
            description: 'Lista as propriedades do usuário autenticado',
            security: [{ bearerAuth: [] }],
        },
        handler: propertyController.getUserProperties.bind(propertyController),
    });
    fastify.get('/properties/featured', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    limit: { type: 'number', default: 4 },
                },
            },
            tags: ['home'],
            summary: 'Propriedades em destaque',
            description: 'Lista propriedades em destaque para a página inicial',
        },
        handler: propertyController.getFeaturedProperties.bind(propertyController),
    });
    fastify.get('/properties/recent', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    limit: { type: 'number', default: 3 },
                },
            },
            tags: ['home'],
            summary: 'Propriedades recentes',
            description: 'Lista propriedades recentemente cadastradas',
        },
        handler: propertyController.getRecentProperties.bind(propertyController),
    });
    fastify.get('/properties/affordable', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    limit: { type: 'number', default: 3 },
                    maxPrice: { type: 'number', default: 300000 },
                },
            },
            tags: ['home'],
            summary: 'Propriedades com melhor preço',
            description: 'Lista propriedades com melhor custo-benefício',
        },
        handler: propertyController.getAffordableProperties.bind(propertyController),
    });
    fastify.get('/home/stats', {
        schema: {
            tags: ['home'],
            summary: 'Estatísticas da página inicial',
            description: 'Retorna estatísticas gerais do site',
        },
        handler: propertyController.getHomeStats.bind(propertyController),
    });
    fastify.get('/properties/similar', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    limit: { type: 'number', default: 6 },
                    type: { type: 'string', enum: ['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL'] },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    excludeId: { type: 'string' },
                },
            },
            tags: ['properties'],
            summary: 'Propriedades similares',
            description: 'Lista propriedades similares baseadas em filtros ou aleatórias',
        },
        handler: propertyController.getSimilarProperties.bind(propertyController),
    });
}
//# sourceMappingURL=properties.js.map