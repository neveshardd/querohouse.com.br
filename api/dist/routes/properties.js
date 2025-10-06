"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRoutes = propertyRoutes;
const PropertyController_1 = require("@/controllers/PropertyController");
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
    const authMiddleware = async (request, reply) => {
        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return reply.status(401).send({
                success: false,
                error: 'Token não fornecido',
            });
        }
        try {
            const { auth } = await Promise.resolve().then(() => __importStar(require('@/config/database')));
            const session = await auth.api.getSession({
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if (!session) {
                return reply.status(401).send({
                    success: false,
                    error: 'Token inválido ou expirado',
                });
            }
            request.user = session.user;
        }
        catch (error) {
            return reply.status(401).send({
                success: false,
                error: 'Erro na validação do token',
            });
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
}
//# sourceMappingURL=properties.js.map