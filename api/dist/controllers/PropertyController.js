"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const PropertyService_1 = require("@/services/PropertyService");
const zod_1 = require("zod");
const CreatePropertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório'),
    description: zod_1.z.string().min(1, 'Descrição é obrigatória'),
    price: zod_1.z.number().positive('Preço deve ser positivo'),
    type: zod_1.z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL']),
    bedrooms: zod_1.z.number().int().positive().optional(),
    bathrooms: zod_1.z.number().int().positive().optional(),
    area: zod_1.z.number().positive().optional(),
    address: zod_1.z.string().min(1, 'Endereço é obrigatório'),
    city: zod_1.z.string().min(1, 'Cidade é obrigatória'),
    state: zod_1.z.string().min(1, 'Estado é obrigatório'),
    zipCode: zod_1.z.string().optional(),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
    images: zod_1.z.array(zod_1.z.string().url()).optional(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
});
const UpdatePropertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    price: zod_1.z.number().positive().optional(),
    type: zod_1.z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL']).optional(),
    status: zod_1.z.enum(['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING']).optional(),
    bedrooms: zod_1.z.number().int().positive().optional(),
    bathrooms: zod_1.z.number().int().positive().optional(),
    area: zod_1.z.number().positive().optional(),
    address: zod_1.z.string().min(1).optional(),
    city: zod_1.z.string().min(1).optional(),
    state: zod_1.z.string().min(1).optional(),
    zipCode: zod_1.z.string().optional(),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
    images: zod_1.z.array(zod_1.z.string().url()).optional(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    isPublished: zod_1.z.boolean().optional(),
});
const PropertyFiltersSchema = zod_1.z.object({
    type: zod_1.z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL']).optional(),
    status: zod_1.z.enum(['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING']).optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    minPrice: zod_1.z.number().positive().optional(),
    maxPrice: zod_1.z.number().positive().optional(),
    bedrooms: zod_1.z.number().int().positive().optional(),
    bathrooms: zod_1.z.number().int().positive().optional(),
    minArea: zod_1.z.number().positive().optional(),
    maxArea: zod_1.z.number().positive().optional(),
    isPublished: zod_1.z.boolean().optional(),
});
class PropertyController {
    propertyService;
    constructor() {
        this.propertyService = new PropertyService_1.PropertyService();
    }
    async createProperty(request, reply) {
        try {
            const user = request.user;
            const propertyData = CreatePropertySchema.parse(request.body);
            const result = await this.propertyService.createProperty({
                ...propertyData,
                userId: user.id,
            });
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(201).send(result);
        }
        catch (error) {
            return reply.status(400).send({
                success: false,
                error: 'Dados inválidos',
            });
        }
    }
    async getPropertyById(request, reply) {
        try {
            const { id } = request.params;
            const result = await this.propertyService.getPropertyById(id);
            if (!result.success) {
                return reply.status(404).send(result);
            }
            await this.propertyService.incrementViews(id);
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro interno do servidor',
            });
        }
    }
    async getProperties(request, reply) {
        try {
            const query = request.query;
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const filters = PropertyFiltersSchema.parse(query);
            const result = await this.propertyService.getProperties(filters, page, limit);
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(400).send({
                success: false,
                error: 'Parâmetros inválidos',
            });
        }
    }
    async updateProperty(request, reply) {
        try {
            const user = request.user;
            const { id } = request.params;
            const updateData = UpdatePropertySchema.parse(request.body);
            const result = await this.propertyService.updateProperty(id, updateData, user.id);
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(400).send({
                success: false,
                error: 'Dados inválidos',
            });
        }
    }
    async deleteProperty(request, reply) {
        try {
            const user = request.user;
            const { id } = request.params;
            const result = await this.propertyService.deleteProperty(id, user.id);
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro interno do servidor',
            });
        }
    }
    async getUserProperties(request, reply) {
        try {
            const user = request.user;
            const query = request.query;
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const result = await this.propertyService.getUserProperties(user.id, page, limit);
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro interno do servidor',
            });
        }
    }
}
exports.PropertyController = PropertyController;
//# sourceMappingURL=PropertyController.js.map