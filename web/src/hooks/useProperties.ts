'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '@/lib/api';
import { PropertyCardData, PropertyFilters } from '@/types/property';

interface UsePropertiesReturn {
  properties: PropertyCardData[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  refetch: () => void;
  applyFilters: (filters: PropertyFilters) => void;
  clearFilters: () => void;
}

export function useProperties(initialFilters?: PropertyFilters): UsePropertiesReturn {
  const queryClient = useQueryClient();
  
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['properties', initialFilters],
    queryFn: async () => {
      const response = await propertyService.getProperties(
        initialFilters || {}, 
        1, 
        12
      );
      
      if (response.success && response.data) {
        const paginated = response.data;
        const propertiesData = paginated.properties || [];
        const paginationData = paginated.pagination || { page: 1, limit: 12, total: 0, totalPages: 0 };
        
        const propertyCards = propertiesData.map((property: any) => ({
          id: property.id,
          title: property.title,
          price: property.price,
          location: `${property.city}, ${property.state}`,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          type: property.type,
          image: property.images?.[0] || '/placeholder-property.svg',
          featured: property.isPublished,
          operation: 'venda' as const
        }));
        
        return {
          properties: propertyCards,
          pagination: paginationData
        };
      } else {
        throw new Error('Erro ao carregar propriedades');
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutos (menos tempo para filtros)
    gcTime: 5 * 60 * 1000, // 5 minutos
  });

  const applyFilters = (filters: PropertyFilters) => {
    // Invalidar e refazer a query com novos filtros
    queryClient.invalidateQueries({ queryKey: ['properties'] });
  };

  const clearFilters = () => {
    queryClient.invalidateQueries({ queryKey: ['properties'] });
  };

  return {
    properties: data?.properties || [],
    loading: isLoading,
    error: error?.message || null,
    pagination: data?.pagination || { page: 1, limit: 12, total: 0, totalPages: 0 },
    refetch,
    applyFilters,
    clearFilters
  };
}
