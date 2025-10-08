'use client';

import { useState, useCallback, useEffect } from 'react';
import PropertyList from '@/components/PropertyList';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import PageSizeSelector from '@/components/PageSizeSelector';
import YouMayAlsoLike from '@/components/YouMayAlsoLike';
import { usePropertiesSimple } from '@/hooks/usePropertiesSimple';
import { PropertyType, PropertyFilters } from '@/types/property';
import { useSearchParams } from 'next/navigation';

export default function ImoveisPage() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [bedroomsFilter, setBedroomsFilter] = useState<string[]>([]);
  const [bathroomsFilter, setBathroomsFilter] = useState<string[]>([]);
  
  // Estados locais para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(6);
  const [filters, setFilters] = useState<PropertyFilters>({});

  // Hook simples
  const {
    properties,
    loading,
    error,
    pagination,
    refetch
  } = usePropertiesSimple(filters, currentPage, pageSize);

  // Aplicar filtros da URL na montagem do componente
  useEffect(() => {
    const urlFilters: PropertyFilters = {};
    
    if (searchParams.get('city')) urlFilters.city = searchParams.get('city')!;
    if (searchParams.get('state')) urlFilters.state = searchParams.get('state')!;
    if (searchParams.get('type')) urlFilters.type = searchParams.get('type') as PropertyType;
    if (searchParams.get('minPrice')) urlFilters.minPrice = parseInt(searchParams.get('minPrice')!);
    if (searchParams.get('maxPrice')) urlFilters.maxPrice = parseInt(searchParams.get('maxPrice')!);
    if (searchParams.get('bedrooms')) urlFilters.bedrooms = parseInt(searchParams.get('bedrooms')!);
    if (searchParams.get('bathrooms')) urlFilters.bathrooms = parseInt(searchParams.get('bathrooms')!);
    
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, [searchParams]);

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    // A ordenação será aplicada no PropertyList
  };

  const handleFilterChange = useCallback((newFilters: PropertyFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset para primeira página
  }, []);

  // Reset página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    let newPriceRange;
    if (checked) {
      newPriceRange = [...priceRange, range];
    } else {
      newPriceRange = priceRange.filter(r => r !== range);
    }
    setPriceRange(newPriceRange);
    
    // Aplicar filtros automaticamente
    applyFiltersWithPriceRange(newPriceRange);
  };

  const handleBedroomsChange = (bedrooms: string, checked: boolean) => {
    let newBedroomsFilter;
    if (checked) {
      newBedroomsFilter = [...bedroomsFilter, bedrooms];
    } else {
      newBedroomsFilter = bedroomsFilter.filter(b => b !== bedrooms);
    }
    setBedroomsFilter(newBedroomsFilter);
    
    // Aplicar filtros automaticamente
    applyFiltersWithBedrooms(newBedroomsFilter);
  };

  const handleBathroomsChange = (bathrooms: string, checked: boolean) => {
    let newBathroomsFilter;
    if (checked) {
      newBathroomsFilter = [...bathroomsFilter, bathrooms];
    } else {
      newBathroomsFilter = bathroomsFilter.filter(b => b !== bathrooms);
    }
    setBathroomsFilter(newBathroomsFilter);
    
    // Aplicar filtros automaticamente
    applyFiltersWithBathrooms(newBathroomsFilter);
  };

  const applyFiltersWithPriceRange = (priceRanges: string[]) => {
    let newFilters: PropertyFilters = {};
    
    if (priceRanges.length > 0) {
      const priceRangesData = priceRanges.map(range => {
        switch (range) {
          case 'Até R$ 100.000':
            return { minPrice: 0, maxPrice: 100000 };
          case 'R$ 100.000 - R$ 200.000':
            return { minPrice: 100000, maxPrice: 200000 };
          case 'R$ 200.000 - R$ 300.000':
            return { minPrice: 200000, maxPrice: 300000 };
          case 'R$ 300.000 - R$ 500.000':
            return { minPrice: 300000, maxPrice: 500000 };
          case 'Acima de R$ 500.000':
            return { minPrice: 500000, maxPrice: undefined };
          default:
            return null;
        }
      }).filter((r): r is { minPrice: number; maxPrice: number | undefined } => r !== null);

      if (priceRangesData.length > 0) {
        const minPrice = Math.min(...priceRangesData.map(r => r.minPrice));
        const maxPrice = priceRangesData.some(r => r.maxPrice === undefined) 
          ? undefined 
          : Math.max(...priceRangesData.map(r => r.maxPrice || 0));
        
        newFilters.minPrice = minPrice;
        if (maxPrice !== undefined) {
          newFilters.maxPrice = maxPrice;
        }
      }
    }
    
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const applyFiltersWithBedrooms = (bedrooms: string[]) => {
    let newFilters: PropertyFilters = {};
    
    if (bedrooms.length > 0) {
      const minBedrooms = Math.min(...bedrooms.map(b => parseInt(b.replace('+', ''))));
      newFilters.bedrooms = minBedrooms;
    }
    
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const applyFiltersWithBathrooms = (bathrooms: string[]) => {
    let newFilters: PropertyFilters = {};
    
    if (bathrooms.length > 0) {
      const minBathrooms = Math.min(...bathrooms.map(b => parseInt(b.replace('+', ''))));
      newFilters.bathrooms = minBathrooms;
    }
    
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({});
    setCurrentPage(1);
    setPriceRange([]);
    setBedroomsFilter([]);
    setBathroomsFilter([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header da página */}
      <div className="bg-white shadow-sm">
        <div className="container-elegant py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Imóveis Disponíveis
            </h1>
            <p className="text-slate-600 mt-2">
              Encontre o imóvel ideal para você
            </p>
          </div>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="container-elegant py-6">
        <SearchBar onFiltersChange={handleFilterChange} />
      </div>

      {/* Filtros laterais e lista de imóveis */}
      <div className="container-elegant pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros laterais */}
          <div className="lg:w-1/4">
            <div className="card-elevated p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Filtros e Ordenação
              </h3>
              
              {/* Seletor de tamanho da página */}
              <div className="mb-6">
                <PageSizeSelector
                  currentSize={pageSize}
                  onSizeChange={(size) => {
                    setPageSizeState(size);
                    setCurrentPage(1);
                  }}
                  options={[6, 12, 24, 48]}
                />
              </div>

              {/* Controles de Visualização */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Visualização
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg border transition-smooth ${
                      viewMode === 'grid' 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grade
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg border transition-smooth ${
                      viewMode === 'list' 
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Lista
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-sm font-medium text-slate-700 mb-4">
                  Filtros
                </h4>
                
                {/* Tipo de Imóvel */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Imóvel
                </label>
                <div className="space-y-2">
                  {Object.values(PropertyType).map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type === type}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const newFilters = { ...filters, type };
                            setFilters(newFilters);
                          } else {
                            const { type: _, ...newFilters } = filters;
                            setFilters(newFilters);
                          }
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Faixa de Preço */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Faixa de Preço
                </label>
                <div className="space-y-2">
                  {[
                    'Até R$ 100.000',
                    'R$ 100.000 - R$ 200.000',
                    'R$ 200.000 - R$ 300.000',
                    'R$ 300.000 - R$ 500.000',
                    'Acima de R$ 500.000'
                  ].map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={priceRange.includes(range)}
                        onChange={(e) => handlePriceRangeChange(range, e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-slate-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quartos */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quartos
                </label>
                <div className="space-y-2">
                  {['1+', '2+', '3+', '4+', '5+'].map((bedrooms) => (
                    <label key={bedrooms} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={bedroomsFilter.includes(bedrooms)}
                        onChange={(e) => handleBedroomsChange(bedrooms, e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-slate-700">{bedrooms}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Banheiros */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Banheiros
                </label>
                <div className="space-y-2">
                  {['1+', '2+', '3+', '4+'].map((bathrooms) => (
                    <label key={bathrooms} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={bathroomsFilter.includes(bathrooms)}
                        onChange={(e) => handleBathroomsChange(bathrooms, e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-slate-700">{bathrooms}</span>
                    </label>
                  ))}
                </div>
              </div>
              </div>

            </div>
          </div>

          {/* Lista de imóveis */}
          <div className="lg:w-3/4">
            <PropertyList 
              properties={properties}
              loading={loading}
              error={error}
              sortBy={sortBy}
              viewMode={viewMode}
            />
            
            

            {/* Seção "Você também pode gostar" */}
            {!loading && !error && properties.length > 0 && (
              <div className="mt-12">
                <YouMayAlsoLike />
              </div>
            )}

            {/* Paginação */}
            <div className="mt-8">
              {!loading && !error && properties.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={setCurrentPage}
                  onPrevious={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  onNext={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                  onFirst={() => setCurrentPage(1)}
                  onLast={() => setCurrentPage(pagination.totalPages)}
                  hasNextPage={currentPage < pagination.totalPages}
                  hasPrevPage={currentPage > 1}
                  totalItems={pagination.total}
                  itemsPerPage={pagination.limit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
