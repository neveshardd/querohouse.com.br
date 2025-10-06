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

const PropertyFiltersSchema = z.object({
  type: z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'RURAL']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING']).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  minArea: z.number().positive().optional(),
  maxArea: z.number().positive().optional(),
  isPublished: z.boolean().optional(),
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
      
      const result = await this.propertyService.getPropertyById(id);

      if (!result.success) {
        return reply.status(404).send(result);
      }

      // Incrementar visualizações
      await this.propertyService.incrementViews(id);

      return reply.status(200).send(result);
    } catch (error) {
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
}
