'use client';

import { useProperties } from '@/hooks/useProperties';
import PropertyCard from './PropertyCard';
import { PropertyFilters } from '@/types/property';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface PropertyListProps {
  filters?: PropertyFilters;
  sortBy?: string;
  viewMode?: string;
}

export default function PropertyList({ filters, sortBy, viewMode }: PropertyListProps) {
  const { properties, loading, error, pagination } = useProperties(filters);

  // Aplicar ordenação aos imóveis
  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'area':
        return (b.area || 0) - (a.area || 0);
      case 'newest':
        // Assumindo que temos uma propriedade createdAt ou similar
        return 0; // Por enquanto, manter ordem original
      case 'relevance':
      default:
        return 0; // Ordem original
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Carregando propriedades...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar propriedades</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (sortedProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhuma propriedade encontrada
        </h3>
        <p className="text-gray-600">
          Não há propriedades disponíveis no momento.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-gray-600">
          {pagination.total} propriedades encontradas
        </p>
      </div>
      <div 
        className={`grid gap-6 ${
          viewMode === 'list' 
            ? 'grid-cols-1' 
            : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
        }`}
      >
        {sortedProperties.map((property, index) => (
          <GridItem key={property.id} index={index}>
            <PropertyCard property={property} />
          </GridItem>
        ))}
      </div>
    </div>
  );
}

function GridItem({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, delay: index * 0.1, ease: 'power1.out' });
  }, [index]);
  return <div ref={ref}>{children}</div>;
}
