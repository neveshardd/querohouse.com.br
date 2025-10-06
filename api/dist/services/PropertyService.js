"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const database_1 = require("@/config/database");
class PropertyService {
    async createProperty(data) {
        try {
            const property = await database_1.prisma.property.create({
                data: {
                    ...data,
                    images: JSON.stringify(data.images || []),
                    features: JSON.stringify(data.features || []),
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            });
            return {
                success: true,
                data: {
                    ...property,
                    images: JSON.parse(property.images),
                    features: JSON.parse(property.features),
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao criar propriedade',
            };
        }
    }
    async getPropertyById(id) {
        try {
            const property = await database_1.prisma.property.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            });
            if (!property) {
                return {
                    success: false,
                    error: 'Propriedade não encontrada',
                };
            }
            return {
                success: true,
                data: {
                    ...property,
                    images: JSON.parse(property.images),
                    features: JSON.parse(property.features),
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter propriedade',
            };
        }
    }
    async getProperties(filters = {}, page = 1, limit = 10) {
        try {
            const where = {};
            if (filters.type)
                where.type = filters.type;
            if (filters.status)
                where.status = filters.status;
            if (filters.city)
                where.city = { contains: filters.city, mode: 'insensitive' };
            if (filters.state)
                where.state = { contains: filters.state, mode: 'insensitive' };
            if (filters.isPublished !== undefined)
                where.isPublished = filters.isPublished;
            if (filters.minPrice || filters.maxPrice) {
                where.price = {};
                if (filters.minPrice)
                    where.price.gte = filters.minPrice;
                if (filters.maxPrice)
                    where.price.lte = filters.maxPrice;
            }
            if (filters.bedrooms)
                where.bedrooms = filters.bedrooms;
            if (filters.bathrooms)
                where.bathrooms = filters.bathrooms;
            if (filters.minArea || filters.maxArea) {
                where.area = {};
                if (filters.minArea)
                    where.area.gte = filters.minArea;
                if (filters.maxArea)
                    where.area.lte = filters.maxArea;
            }
            const [properties, total] = await Promise.all([
                database_1.prisma.property.findMany({
                    where,
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phone: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                database_1.prisma.property.count({ where }),
            ]);
            const formattedProperties = properties.map(property => ({
                ...property,
                images: JSON.parse(property.images),
                features: JSON.parse(property.features),
            }));
            return {
                success: true,
                data: {
                    properties: formattedProperties,
                    pagination: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit),
                    },
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao listar propriedades',
            };
        }
    }
    async updateProperty(id, data, userId) {
        try {
            const existingProperty = await database_1.prisma.property.findFirst({
                where: { id, userId },
            });
            if (!existingProperty) {
                return {
                    success: false,
                    error: 'Propriedade não encontrada ou sem permissão',
                };
            }
            const updateData = { ...data };
            if (data.images)
                updateData.images = JSON.stringify(data.images);
            if (data.features)
                updateData.features = JSON.stringify(data.features);
            const property = await database_1.prisma.property.update({
                where: { id },
                data: updateData,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            });
            return {
                success: true,
                data: {
                    ...property,
                    images: JSON.parse(property.images),
                    features: JSON.parse(property.features),
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao atualizar propriedade',
            };
        }
    }
    async deleteProperty(id, userId) {
        try {
            const existingProperty = await database_1.prisma.property.findFirst({
                where: { id, userId },
            });
            if (!existingProperty) {
                return {
                    success: false,
                    error: 'Propriedade não encontrada ou sem permissão',
                };
            }
            await database_1.prisma.property.delete({
                where: { id },
            });
            return {
                success: true,
                message: 'Propriedade deletada com sucesso',
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao deletar propriedade',
            };
        }
    }
    async incrementViews(id) {
        try {
            await database_1.prisma.property.update({
                where: { id },
                data: {
                    views: {
                        increment: 1,
                    },
                },
            });
            return {
                success: true,
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao incrementar visualizações',
            };
        }
    }
    async getUserProperties(userId, page = 1, limit = 10) {
        try {
            const [properties, total] = await Promise.all([
                database_1.prisma.property.findMany({
                    where: { userId },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phone: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
                database_1.prisma.property.count({ where: { userId } }),
            ]);
            const formattedProperties = properties.map(property => ({
                ...property,
                images: JSON.parse(property.images),
                features: JSON.parse(property.features),
            }));
            return {
                success: true,
                data: {
                    properties: formattedProperties,
                    pagination: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit),
                    },
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter propriedades do usuário',
            };
        }
    }
}
exports.PropertyService = PropertyService;
//# sourceMappingURL=PropertyService.js.map