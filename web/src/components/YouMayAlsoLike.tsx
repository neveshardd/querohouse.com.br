'use client';

import { useState, useEffect } from 'react';
import { propertyService } from '@/lib/api';
import { PropertyCardData } from '@/types/property';
import PropertyCard from './PropertyCard';
import { useSearchParams } from 'next/navigation';

interface YouMayAlsoLikeProps {
  currentPropertyId?: string;
  className?: string;
}

export default function YouMayAlsoLike({ 
  currentPropertyId, 
  className = '' 
}: YouMayAlsoLikeProps) {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar propriedades similares baseadas nos filtros atuais ou propriedades aleatórias
        const currentFilters = {
          // Aplicar filtros da URL se existirem
          ...(searchParams.get('type') && { type: searchParams.get('type') }),
          ...(searchParams.get('city') && { city: searchParams.get('city') }),
          ...(searchParams.get('state') && { state: searchParams.get('state') }),
        };

        // Buscar propriedades similares usando o novo endpoint
        const response = await propertyService.getSimilarProperties(
          currentFilters,
          6,
          currentPropertyId
        );

        if (response.success && response.data) {
          const propertiesData = response.data.properties || response.data;
          
          const propertyCards = propertiesData
            .filter((property: any) => property.id !== currentPropertyId) // Excluir propriedade atual
            .slice(0, 6) // Limitar a 6 propriedades
            .map((property: any) => ({
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

          setProperties(propertyCards);
        } else {
          throw new Error('Erro ao carregar propriedades similares');
        }
      } catch (err) {
        setError('Erro ao carregar propriedades similares');
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProperties();
  }, [currentPropertyId, searchParams]);

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 mt-2">Carregando propriedades similares...</p>
        </div>
      </div>
    );
  }

  if (error || properties.length === 0) {
    return null; // Não mostrar seção se houver erro ou não houver propriedades
  }

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Você também pode gostar
        </h3>
        <p className="text-slate-600">
          Propriedades similares que podem interessar você
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.slice(0, 3).map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            className="hover:shadow-lg transition-shadow duration-300"
          />
        ))}
      </div>
    </div>
  );
}
