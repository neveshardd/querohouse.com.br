import { useState, useEffect } from 'react';
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
  loadProperties: (page?: number, filters?: PropertyFilters) => Promise<void>;
  applyFilters: (filters: PropertyFilters) => void;
  clearFilters: () => void;
}

export function useProperties(initialFilters?: PropertyFilters): UsePropertiesReturn {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters || {});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  // Atualizar filtros quando initialFilters mudar
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [JSON.stringify(initialFilters)]);

  const loadProperties = async (page: number = 1, newFilters?: PropertyFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const filtersToUse = newFilters || filters;
      
      const response = await propertyService.getProperties(
        filtersToUse, 
        page, 
        pagination.limit
      );
      
      if (response.success && response.data) {
        // Estrutura: ApiResponse<{ data: Property[]; pagination: {...} }>
        const paginated = response.data;
        const propertiesData = paginated.data || [];
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
          image: property.images?.[0] || '/placeholder-property.jpg',
          featured: property.isPublished,
          operation: 'venda' as const
        }));
        
        setProperties(propertyCards);
        setPagination(paginationData);
      } else {
        setError('Erro ao carregar propriedades');
      }
    } catch (err) {
      console.error('Erro ao carregar propriedades:', err);
      setError('Erro ao carregar propriedades');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    loadProperties(1, newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    loadProperties(1, {});
  };

  // Carregar propriedades na montagem do componente e quando os filtros mudarem
  useEffect(() => {
    loadProperties(1, filters);
  }, [JSON.stringify(filters)]);

  // Carregar propriedades quando initialFilters mudar
  useEffect(() => {
    if (initialFilters && Object.keys(initialFilters).length > 0) {
      loadProperties(1, initialFilters);
    }
  }, [JSON.stringify(initialFilters)]);

  return {
    properties,
    loading,
    error,
    pagination,
    loadProperties,
    applyFilters,
    clearFilters
  };
}
