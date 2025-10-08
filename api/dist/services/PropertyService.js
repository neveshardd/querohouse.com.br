"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const database_1 = require("../config/database");
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
            const totalPages = Math.ceil(total / limit);
            const hasNextPage = page < totalPages;
            const hasPrevPage = page > 1;
            const paginationData = {
                page,
                limit,
                total,
                totalPages,
                pages: totalPages,
                hasNextPage,
                hasPrevPage,
                nextPage: hasNextPage ? page + 1 : null,
                prevPage: hasPrevPage ? page - 1 : null,
            };
            console.log('🔍 PropertyService - Dados de paginação:', paginationData);
            console.log('🔍 PropertyService - Total de propriedades:', total);
            console.log('🔍 PropertyService - Página atual:', page);
            console.log('🔍 PropertyService - Limite:', limit);
            const result = {
                success: true,
                data: {
                    properties: formattedProperties,
                    pagination: paginationData,
                },
            };
            console.log('🔍 PropertyService - Resultado final:', JSON.stringify(result, null, 2));
            return result;
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
    async getFeaturedProperties(limit = 4) {
        try {
            const properties = await database_1.prisma.property.findMany({
                where: {
                    isPublished: true,
                    status: 'ACTIVE',
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
                orderBy: [
                    { views: 'desc' },
                    { createdAt: 'desc' }
                ],
                take: limit,
            });
            const formattedProperties = properties.map(property => ({
                ...property,
                images: JSON.parse(property.images),
                features: JSON.parse(property.features),
            }));
            return {
                success: true,
                data: {
                    properties: formattedProperties,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter propriedades em destaque',
            };
        }
    }
    async getRecentProperties(limit = 3) {
        try {
            const properties = await database_1.prisma.property.findMany({
                where: {
                    isPublished: true,
                    status: 'ACTIVE',
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
                orderBy: { createdAt: 'desc' },
                take: limit,
            });
            const formattedProperties = properties.map(property => ({
                ...property,
                images: JSON.parse(property.images),
                features: JSON.parse(property.features),
            }));
            return {
                success: true,
                data: {
                    properties: formattedProperties,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter propriedades recentes',
            };
        }
    }
    async getAffordableProperties(limit = 3, maxPrice = 300000) {
        try {
            const properties = await database_1.prisma.property.findMany({
                where: {
                    isPublished: true,
                    status: 'ACTIVE',
                    price: {
                        lte: maxPrice,
                    },
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
                orderBy: [
                    { price: 'asc' },
                    { views: 'desc' }
                ],
                take: limit,
            });
            const formattedProperties = properties.map(property => ({
                ...property,
                images: JSON.parse(property.images),
                features: JSON.parse(property.features),
            }));
            return {
                success: true,
                data: {
                    properties: formattedProperties,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter propriedades com melhor preço',
            };
        }
    }
    async getHomeStats() {
        try {
            const [totalProperties, publishedProperties, totalUsers, totalViews, propertiesByType, averagePrice] = await Promise.all([
                database_1.prisma.property.count(),
                database_1.prisma.property.count({ where: { isPublished: true } }),
                database_1.prisma.user.count(),
                database_1.prisma.property.aggregate({
                    _sum: { views: true },
                }),
                database_1.prisma.property.groupBy({
                    by: ['type'],
                    _count: { type: true },
                    where: { isPublished: true },
                }),
                database_1.prisma.property.aggregate({
                    _avg: { price: true },
                    where: { isPublished: true },
                }),
            ]);
            return {
                success: true,
                data: {
                    totalProperties,
                    publishedProperties,
                    totalUsers,
                    totalViews: totalViews._sum.views || 0,
                    averagePrice: Math.round(averagePrice._avg.price || 0),
                    propertiesByType: propertiesByType.map(item => ({
                        type: item.type,
                        count: item._count.type,
                    })),
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter estatísticas',
            };
        }
    }
    async getSimilarProperties(filters, limit, excludeId) {
        try {
            const whereClause = {
                isPublished: true,
                status: 'ACTIVE',
            };
            if (filters.type)
                whereClause.type = filters.type;
            if (filters.city)
                whereClause.city = filters.city;
            if (filters.state)
                whereClause.state = filters.state;
            if (excludeId)
                whereClause.id = { not: excludeId };
            if (Object.keys(filters).length === 0) {
                const properties = await database_1.prisma.property.findMany({
                    where: whereClause,
                    orderBy: [
                        { views: 'desc' },
                        { createdAt: 'desc' }
                    ],
                    take: limit,
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
                const formattedProperties = properties.map(property => ({
                    ...property,
                    images: JSON.parse(property.images),
                    features: JSON.parse(property.features),
                }));
                return {
                    success: true,
                    data: {
                        properties: formattedProperties,
                    },
                };
            }
            const properties = await database_1.prisma.property.findMany({
                where: whereClause,
                orderBy: [
                    { views: 'desc' },
                    { createdAt: 'desc' }
                ],
                take: limit,
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
            const formattedProperties = properties.map(property => ({
                ...property,
                images: JSON.parse(property.images),
                features: JSON.parse(property.features),
            }));
            return {
                success: true,
                data: {
                    properties: formattedProperties,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter propriedades similares',
            };
        }
    }
}
exports.PropertyService = PropertyService;
//# sourceMappingURL=PropertyService.js.map