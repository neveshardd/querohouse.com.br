'use client';

import PropertyCard from './PropertyCard';
import { PropertyCardData } from '@/types/property';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface PropertyListProps {
  properties: PropertyCardData[];
  loading: boolean;
  error: string | null;
  sortBy?: string;
  viewMode?: string;
}

export default function PropertyList({ properties, loading, error, sortBy, viewMode }: PropertyListProps) {

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
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Carregando propriedades</h3>
          <p className="text-slate-600">Encontrando os melhores imóveis para você...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Ops! Algo deu errado</h2>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (sortedProperties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Nenhum imóvel encontrado</h2>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Não encontramos imóveis que correspondam aos seus critérios de busca. 
          Tente ajustar os filtros ou expandir sua área de pesquisa.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors font-medium"
          >
            Limpar filtros
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Ver todos os imóveis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com contador de resultados */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {sortedProperties.length} imóveis encontrados
          </h2>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Descubra os melhores imóveis em Brasília
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <span className="hidden sm:inline">Ordenar por:</span>
          <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto">
            <option value="relevance">Relevância</option>
            <option value="price-low">Menor preço</option>
            <option value="price-high">Maior preço</option>
            <option value="area">Maior área</option>
            <option value="newest">Mais recentes</option>
          </select>
        </div>
      </div>

      {/* Grid de propriedades */}
      <div 
        className={`grid gap-4 sm:gap-6 lg:gap-8 ${
          viewMode === 'list' 
            ? 'grid-cols-1' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {sortedProperties.map((property, index) => (
          <GridItem key={property.id} index={index}>
            <PropertyCard property={property} viewMode={viewMode as 'grid' | 'list'} />
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
