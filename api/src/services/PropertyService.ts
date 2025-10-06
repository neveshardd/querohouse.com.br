import { prisma } from '@/config/database';
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
    } catch (error) {
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
}
