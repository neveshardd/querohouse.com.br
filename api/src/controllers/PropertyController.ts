import { FastifyRequest, FastifyReply } from 'fastify';
import { PropertyService, CreatePropertyRequest, UpdatePropertyRequest, PropertyFilters } from '../services/PropertyService';
import { z } from 'zod';

// Schemas de validação
const CreatePropertySchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.number().positive('Preço deve ser positivo'),
  type: z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL']),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  area: z.number().positive().optional(),
  address: z.string().min(1, 'Endereço é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.array(z.string().url()).optional(),
  features: z.array(z.string()).optional(),
});

const UpdatePropertySchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  type: z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING']).optional(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  area: z.number().positive().optional(),
  address: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  images: z.array(z.string().url()).optional(),
  features: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

// Coerção de tipos para query params (strings -> number/boolean)
const toNumber = (v: unknown) => (v === undefined || v === null || v === '' ? undefined : Number(v));
const toInt = (v: unknown) => (v === undefined || v === null || v === '' ? undefined : parseInt(String(v), 10));
const toBool = (v: unknown) => {
  if (v === undefined || v === null || v === '') return undefined;
  if (typeof v === 'boolean') return v;
  const s = String(v).toLowerCase();
  return s === 'true' || s === '1';
};

const PropertyFiltersSchema = z.object({
  type: z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING']).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  minPrice: z.preprocess(toNumber, z.number().positive().optional()),
  maxPrice: z.preprocess(toNumber, z.number().positive().optional()),
  bedrooms: z.preprocess(toInt, z.number().int().positive().optional()),
  bathrooms: z.preprocess(toInt, z.number().int().positive().optional()),
  minArea: z.preprocess(toNumber, z.number().positive().optional()),
  maxArea: z.preprocess(toNumber, z.number().positive().optional()),
  isPublished: z.preprocess(toBool, z.boolean().optional()),
});

/**
 * Controller de propriedades seguindo princípios SOLID
 * Single Responsibility: Responsável apenas por receber requisições HTTP de propriedades
 */
export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  /**
   * Criar nova propriedade
   */
  async createProperty(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const propertyData = CreatePropertySchema.parse(request.body);

      const result = await this.propertyService.createProperty({
        ...propertyData,
        userId: user.id,
      });

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(201).send(result);
    } catch (error) {
      return reply.status(400).send({
        success: false,
        error: 'Dados inválidos',
      });
    }
  }

  /**
   * Obter propriedade por ID
   */
  async getPropertyById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      console.log('🔍 PropertyController.getPropertyById chamado com ID:', id);
      
      const result = await this.propertyService.getPropertyById(id);
      console.log('🔍 Resultado do PropertyService:', result);

      if (!result.success) {
        console.log('❌ Propriedade não encontrada, retornando 404');
        return reply.status(404).send(result);
      }

      // Incrementar visualizações
      await this.propertyService.incrementViews(id);

      console.log('✅ Retornando propriedade com sucesso');
      return reply.status(200).send(result);
    } catch (error) {
      console.error('❌ Erro no PropertyController.getPropertyById:', error);
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Listar propriedades
   */
  async getProperties(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = request.query as any;
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;

      const filters = PropertyFiltersSchema.parse(query);
      const result = await this.propertyService.getProperties(filters, page, limit);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(400).send({
        success: false,
        error: 'Parâmetros inválidos',
      });
    }
  }

  /**
   * Atualizar propriedade
   */
  async updateProperty(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const { id } = request.params as { id: string };
      const updateData = UpdatePropertySchema.parse(request.body);

      const result = await this.propertyService.updateProperty(id, updateData, user.id);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(400).send({
        success: false,
        error: 'Dados inválidos',
      });
    }
  }

  /**
   * Deletar propriedade
   */
  async deleteProperty(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const { id } = request.params as { id: string };

      const result = await this.propertyService.deleteProperty(id, user.id);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Obter propriedades do usuário
   */
  async getUserProperties(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = (request as any).user;
      const query = request.query as any;
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;

      const result = await this.propertyService.getUserProperties(user.id, page, limit);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Obter propriedades em destaque para a página inicial
   */
  async getFeaturedProperties(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = request.query as any;
      const limit = parseInt(query.limit) || 4;

      const result = await this.propertyService.getFeaturedProperties(limit);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Obter propriedades recentes para a página inicial
   */
  async getRecentProperties(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = request.query as any;
      const limit = parseInt(query.limit) || 3;

      const result = await this.propertyService.getRecentProperties(limit);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Obter propriedades com melhor preço para a página inicial
   */
  async getAffordableProperties(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = request.query as any;
      const limit = parseInt(query.limit) || 3;
      const maxPrice = parseInt(query.maxPrice) || 300000;

      const result = await this.propertyService.getAffordableProperties(limit, maxPrice);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Obter estatísticas gerais do site
   */
  async getHomeStats(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await this.propertyService.getHomeStats();

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }

  /**
   * Obter propriedades similares
   */
  async getSimilarProperties(request: FastifyRequest, reply: FastifyReply) {
    try {
      const query = request.query as any;
      const limit = parseInt(query.limit) || 6;
      const excludeId = query.excludeId;

      const filters: any = {};
      if (query.type) filters.type = query.type;
      if (query.city) filters.city = query.city;
      if (query.state) filters.state = query.state;

      const result = await this.propertyService.getSimilarProperties(filters, limit, excludeId);

      if (!result.success) {
        return reply.status(400).send(result);
      }

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
}
