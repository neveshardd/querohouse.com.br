// Tipos compartilhados do backoffice baseados na API

export enum UserRole {
  USER = 'USER',
  CORRETOR = 'CORRETOR',
  PROPRIETARIO = 'PROPRIETARIO',
  INCORPORADORA = 'INCORPORADORA',
  ADMIN = 'ADMIN'
}

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

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

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
  images: string[];
  features: string[];
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: number | null;
    prevPage?: number | null;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProperties: number;
  publishedProperties: number;
  totalViews: number;
  recentUsers: User[];
  recentProperties: Property[];
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
  search?: string;
}
