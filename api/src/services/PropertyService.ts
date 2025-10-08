import { prisma } from '../config/database';
import { PropertyType, PropertyStatus } from '@prisma/client';

export interface CreatePropertyRequest {
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  features?: string[];
  userId: string;
}

export interface UpdatePropertyRequest {
  title?: string;
  description?: string;
  price?: number;
  type?: PropertyType;
  status?: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  features?: string[];
  isPublished?: boolean;
}

export interface PropertyFilters {
  type?: PropertyType;
  status?: PropertyStatus;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  isPublished?: boolean;
}

/**
 * Serviço de propriedades seguindo princípios SOLID
 * Single Responsibility: Responsável apenas por operações de propriedades
 */
export class PropertyService {
  /**
   * Criar nova propriedade
   */
  async createProperty(data: CreatePropertyRequest) {
    try {
      const property = await prisma.property.create({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar propriedade',
      };
    }
  }

  /**
   * Obter propriedade por ID
   */
  async getPropertyById(id: string) {
    console.log('🔍 PropertyService.getPropertyById chamado com ID:', id);
    
    try {
      const property = await prisma.property.findUnique({
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

      console.log('🔍 Propriedade encontrada no banco:', property);

      if (!property) {
        console.log('❌ Propriedade não encontrada no banco');
        return {
          success: false,
          error: 'Propriedade não encontrada',
        };
      }

      console.log('🔍 property.images antes do parse:', property.images);
      console.log('🔍 property.features antes do parse:', property.features);

      const result = {
        success: true,
        data: {
          ...property,
          images: JSON.parse(property.images),
          features: JSON.parse(property.features),
        },
      };

      console.log('🎯 Resultado final sendo retornado:', JSON.stringify(result, null, 2));

      return result;
    } catch (error) {
      console.error('❌ Erro no PropertyService.getPropertyById:', error);
      return {
        success: false,
        error: 'Erro ao obter propriedade',
      };
    }
  }

  /**
   * Listar propriedades com filtros
   */
  async getProperties(filters: PropertyFilters = {}, page = 1, limit = 10) {
    try {
      const where: any = {};

      if (filters.type) where.type = filters.type;
      if (filters.status) where.status = filters.status;
      if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' };
      if (filters.state) where.state = { contains: filters.state, mode: 'insensitive' };
      if (filters.isPublished !== undefined) where.isPublished = filters.isPublished;

      if (filters.minPrice || filters.maxPrice) {
        where.price = {};
        if (filters.minPrice) where.price.gte = filters.minPrice;
        if (filters.maxPrice) where.price.lte = filters.maxPrice;
      }

      if (filters.bedrooms) where.bedrooms = filters.bedrooms;
      if (filters.bathrooms) where.bathrooms = filters.bathrooms;

      if (filters.minArea || filters.maxArea) {
        where.area = {};
        if (filters.minArea) where.area.gte = filters.minArea;
        if (filters.maxArea) where.area.lte = filters.maxArea;
      }

      const [properties, total] = await Promise.all([
        prisma.property.findMany({
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
        prisma.property.count({ where }),
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
        pages: totalPages, // Manter compatibilidade
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao listar propriedades',
      };
    }
  }

  /**
   * Atualizar propriedade
   */
  async updateProperty(id: string, data: UpdatePropertyRequest, userId: string) {
    try {
      // Verificar se a propriedade pertence ao usuário
      const existingProperty = await prisma.property.findFirst({
        where: { id, userId },
      });

      if (!existingProperty) {
        return {
          success: false,
          error: 'Propriedade não encontrada ou sem permissão',
        };
      }

      const updateData: any = { ...data };
      if (data.images) updateData.images = JSON.stringify(data.images);
      if (data.features) updateData.features = JSON.stringify(data.features);

      const property = await prisma.property.update({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar propriedade',
      };
    }
  }

  /**
   * Deletar propriedade
   */
  async deleteProperty(id: string, userId: string) {
    try {
      // Verificar se a propriedade pertence ao usuário
      const existingProperty = await prisma.property.findFirst({
        where: { id, userId },
      });

      if (!existingProperty) {
        return {
          success: false,
          error: 'Propriedade não encontrada ou sem permissão',
        };
      }

      await prisma.property.delete({
        where: { id },
      });

      return {
        success: true,
        message: 'Propriedade deletada com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao deletar propriedade',
      };
    }
  }

  /**
   * Incrementar visualizações
   */
  async incrementViews(id: string) {
    try {
      await prisma.property.update({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao incrementar visualizações',
      };
    }
  }

  /**
   * Obter propriedades do usuário
   */
  async getUserProperties(userId: string, page = 1, limit = 10) {
    try {
      const [properties, total] = await Promise.all([
        prisma.property.findMany({
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
        prisma.property.count({ where: { userId } }),
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter propriedades do usuário',
      };
    }
  }

  /**
   * Obter propriedades em destaque para a página inicial
   */
  async getFeaturedProperties(limit = 4) {
    try {
      const properties = await prisma.property.findMany({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter propriedades em destaque',
      };
    }
  }

  /**
   * Obter propriedades recentes para a página inicial
   */
  async getRecentProperties(limit = 3) {
    try {
      const properties = await prisma.property.findMany({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter propriedades recentes',
      };
    }
  }

  /**
   * Obter propriedades com melhor preço para a página inicial
   */
  async getAffordableProperties(limit = 3, maxPrice = 300000) {
    try {
      const properties = await prisma.property.findMany({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter propriedades com melhor preço',
      };
    }
  }

  /**
   * Obter estatísticas gerais do site
   */
  async getHomeStats() {
    try {
      const [
        totalProperties,
        publishedProperties,
        totalUsers,
        totalViews,
        propertiesByType,
        averagePrice
      ] = await Promise.all([
        prisma.property.count(),
        prisma.property.count({ where: { isPublished: true } }),
        prisma.user.count(),
        prisma.property.aggregate({
          _sum: { views: true },
        }),
        prisma.property.groupBy({
          by: ['type'],
          _count: { type: true },
          where: { isPublished: true },
        }),
        prisma.property.aggregate({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter estatísticas',
      };
    }
  }

  /**
   * Obter propriedades similares
   */
  async getSimilarProperties(filters: any, limit: number, excludeId?: string) {
    try {
      const whereClause: any = {
        isPublished: true,
        status: 'ACTIVE',
      };

      // Aplicar filtros se fornecidos
      if (filters.type) whereClause.type = filters.type;
      if (filters.city) whereClause.city = filters.city;
      if (filters.state) whereClause.state = filters.state;

      // Excluir propriedade específica se fornecida
      if (excludeId) whereClause.id = { not: excludeId };

      // Se não há filtros específicos, buscar propriedades aleatórias em destaque
      if (Object.keys(filters).length === 0) {
        const properties = await prisma.property.findMany({
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

      // Buscar propriedades similares baseadas nos filtros
      const properties = await prisma.property.findMany({
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
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao obter propriedades similares',
      };
    }
  }
}
