'use client';

import { useQuery } from '@tanstack/react-query';
import { propertyService } from '@/lib/api';
import { PropertyCardData, PropertyFilters } from '@/types/property';

interface UsePropertiesSimpleReturn {
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
}

export function usePropertiesSimple(filters?: PropertyFilters, page = 1, limit = 12): UsePropertiesSimpleReturn {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['properties-simple', filters, page, limit],
    queryFn: async () => {
      console.log('🔍 Buscando propriedades com filtros:', filters, 'página:', page, 'limite:', limit);
      
      const response = await propertyService.getProperties(filters || {}, page, limit);
      
      console.log('📡 Resposta da API:', response);
      
      if (response.success && response.data) {
        const paginated = response.data;
        const propertiesData = paginated.properties || [];
        const paginationData = paginated.pagination || { page: 1, limit: 12, total: 0, totalPages: 0 };
        
        console.log('📊 Dados das propriedades:', propertiesData);
        console.log('📄 Dados de paginação:', paginationData);
        
        const propertyCards = propertiesData.map((property: any) => {
          console.log('🏠 Mapeando propriedade:', property);
          return {
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
          };
        });
        
        console.log('🎯 Cards finais:', propertyCards);
        
        return {
          properties: propertyCards,
          pagination: paginationData
        };
      } else {
        console.error('❌ Erro na resposta da API:', response);
        throw new Error('Erro ao carregar propriedades');
      }
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    properties: data?.properties || [],
    loading: isLoading,
    error: error?.message || null,
    pagination: data?.pagination || { page: 1, limit: 12, total: 0, totalPages: 0 },
    refetch,
  };
}
