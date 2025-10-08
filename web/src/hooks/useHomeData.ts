'use client';

import { useQuery } from '@tanstack/react-query';
import { propertyService } from '@/lib/api';
import { Property } from '@/types/property';

interface HomeStats {
  totalProperties: number;
  publishedProperties: number;
  totalUsers: number;
  totalViews: number;
  averagePrice: number;
  propertiesByType: Array<{ type: string; count: number }>;
}

export function useFeaturedProperties(limit: number = 4) {
  return useQuery({
    queryKey: ['properties', 'featured', limit],
    queryFn: async () => {
      const response = await propertyService.getFeaturedProperties(limit);
      if (response.success && response.data) {
        return response.data.properties.map((property: any) => ({
          ...property,
          location: `${property.city}, ${property.state}`,
          image: property.images?.[0] || '/placeholder-property.svg',
        }));
      }
      throw new Error('Erro ao carregar propriedades em destaque');
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
}

export function useRecentProperties(limit: number = 3) {
  return useQuery({
    queryKey: ['properties', 'recent', limit],
    queryFn: async () => {
      const response = await propertyService.getRecentProperties(limit);
      if (response.success && response.data) {
        return response.data.properties.map((property: any) => ({
          ...property,
          location: `${property.city}, ${property.state}`,
          image: property.images?.[0] || '/placeholder-property.svg',
        }));
      }
      throw new Error('Erro ao carregar propriedades recentes');
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 15 * 60 * 1000, // 15 minutos
  });
}

export function useAffordableProperties(limit: number = 3, maxPrice: number = 300000) {
  return useQuery({
    queryKey: ['properties', 'affordable', limit, maxPrice],
    queryFn: async () => {
      const response = await propertyService.getAffordableProperties(limit, maxPrice);
      if (response.success && response.data) {
        return response.data.properties.map((property: any) => ({
          ...property,
          location: `${property.city}, ${property.state}`,
          image: property.images?.[0] || '/placeholder-property.svg',
        }));
      }
      throw new Error('Erro ao carregar propriedades acessíveis');
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
}

export function useHomeStats() {
  return useQuery({
    queryKey: ['home', 'stats'],
    queryFn: async (): Promise<HomeStats> => {
      const response = await propertyService.getHomeStats();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error('Erro ao carregar estatísticas');
    },
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  });
}

// Hook combinado para a página inicial
export function useHomeData() {
  const featuredQuery = useFeaturedProperties(4);
  const recentQuery = useRecentProperties(3);
  const affordableQuery = useAffordableProperties(3, 300000);
  const statsQuery = useHomeStats();

  return {
    featuredProperties: featuredQuery.data || [],
    recentProperties: recentQuery.data || [],
    affordableProperties: affordableQuery.data || [],
    stats: statsQuery.data,
    loading: {
      featured: featuredQuery.isLoading,
      recent: recentQuery.isLoading,
      affordable: affordableQuery.isLoading,
      stats: statsQuery.isLoading,
    },
    error: featuredQuery.error || recentQuery.error || affordableQuery.error || statsQuery.error,
  };
}