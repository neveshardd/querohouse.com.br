// Tipos compartilhados entre API e Frontend baseados no schema Prisma

export enum PropertyType {
  CASA = 'CASA',
  APARTAMENTO = 'APARTAMENTO',
  TERRENO = 'TERRENO',
  COMERCIAL = 'COMERCIAL',
  RURAL = 'RURAL'
}

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  PENDING = 'PENDING'
}

export enum UserRole {
  USER = 'USER',
  CORRETOR = 'CORRETOR',
  PROPRIETARIO = 'PROPRIETARIO',
  INCORPORADORA = 'INCORPORADORA',
  ADMIN = 'ADMIN'
}

// Interface base da propriedade (baseada no schema Prisma)
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  images: string[]; // Array de URLs das imagens
  features: string[]; // Array de características
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  
  // Relacionamentos
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
  };
}

// Interface para criação de propriedade
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
}

// Interface para atualização de propriedade
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

// Interface para filtros de propriedades
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

// Interface para resposta paginada
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    pages?: number; // Compatibilidade
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
  };
}

// Interface para resposta da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Interface para resposta de propriedades
export interface PropertyResponse extends ApiResponse<Property> {}
export interface PropertiesResponse extends ApiResponse<PaginatedResponse<Property>> {}

// Interface para o PropertyCard (compatível com o componente atual)
export interface PropertyCardData {
  id: string;
  title: string;
  price: number;
  location: string; // Formato: "Cidade, Estado"
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: string; // Tipo formatado para exibição
  image: string; // Primeira imagem ou imagem padrão
  featured?: boolean;
  operation?: 'venda' | 'aluguel';
}

// Função utilitária para converter Property para PropertyCardData
export function propertyToCardData(property: Property): PropertyCardData {
  return {
    id: property.id,
    title: property.title,
    price: property.price,
    location: `${property.city}, ${property.state}`,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    type: property.type,
    image: property.images[0] || '/placeholder-property.svg',
    featured: property.isPublished,
    operation: 'venda' // Por enquanto, assumindo que todas são para venda
  };
}

// Função utilitária para formatar preço
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(price);
}

// Função utilitária para formatar tipo de propriedade
export function formatPropertyType(type: PropertyType): string {
  const typeMap: Record<PropertyType, string> = {
    [PropertyType.CASA]: 'Casa',
    [PropertyType.APARTAMENTO]: 'Apartamento',
    [PropertyType.TERRENO]: 'Terreno',
    [PropertyType.COMERCIAL]: 'Comercial',
    [PropertyType.RURAL]: 'Rural'
  };
  return typeMap[type] || type;
}
