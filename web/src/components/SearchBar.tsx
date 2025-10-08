'use client';

import { useState, useCallback, useMemo } from 'react';
import { 
  Search, 
  Home, 
  Building2, 
  TreePine, 
  Store, 
  MapPin, 
  DollarSign, 
  ChevronDown, 
  Check, 
  X, 
  Bath, 
  Bed,
  Map,
  Building
} from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Types
interface SearchFilters {
  location: string;
  propertyType: string;
  operation: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
}

interface SearchBarProps {
  onFiltersChange?: (filters: any) => void;
  redirectOnSearch?: boolean; // Nova prop para controlar redirecionamento
}

interface PropertyType {
  id: string;
  name: string;
  icon: typeof Home;
}

interface PriceRange {
  id: string;
  name: string;
}

// Constants
const PROPERTY_TYPES: PropertyType[] = [
  { id: 'todos', name: 'Todos os tipos', icon: Building },
  { id: 'casa', name: 'Casa', icon: Home },
  { id: 'apartamento', name: 'Apartamento', icon: Building2 },
  { id: 'terreno', name: 'Terreno', icon: MapPin },
  { id: 'comercial', name: 'Comercial', icon: Store },
  { id: 'rural', name: 'Rural', icon: TreePine },
];

const PRICE_RANGES: PriceRange[] = [
  { id: 'qualquer', name: 'Qualquer preço' },
  { id: '0-100000', name: 'Até R$ 100.000' },
  { id: '100000-200000', name: 'R$ 100.000 - R$ 200.000' },
  { id: '200000-300000', name: 'R$ 200.000 - R$ 300.000' },
  { id: '300000-500000', name: 'R$ 300.000 - R$ 500.000' },
  { id: '500000+', name: 'Acima de R$ 500.000' },
];

const POPULAR_LOCATIONS = [
  'Brasília, DF',
  'Asa Norte, Brasília - DF',
  'Asa Sul, Brasília - DF',
  'Lago Sul, Brasília - DF',
  'Lago Norte, Brasília - DF',
  'Taguatinga, Brasília - DF',
  'Ceilândia, Brasília - DF',
  'Samambaia, Brasília - DF',
  'Gama, Brasília - DF',
  'Guará, Brasília - DF'
];

const DEFAULT_FILTERS: SearchFilters = {
  location: '',
  propertyType: 'todos',
  operation: '',
  priceRange: 'qualquer',
  bedrooms: 'qualquer',
  bathrooms: 'qualquer'
};

// Utility functions
const convertFiltersToAPI = (filters: SearchFilters) => {
  const apiFilters: any = {};
  
  if (filters.location) {
    const locationParts = filters.location.split(',');
    if (locationParts.length >= 2) {
      apiFilters.city = locationParts[0].trim();
      apiFilters.state = locationParts[1].trim();
    } else {
      apiFilters.city = filters.location;
    }
  }
  
  if (filters.propertyType && filters.propertyType !== 'todos') {
    const typeMap: Record<string, string> = {
      'casa': 'CASA',
      'apartamento': 'APARTAMENTO',
      'terreno': 'TERRENO',
      'comercial': 'COMERCIAL',
      'rural': 'RURAL'
    };
    apiFilters.type = typeMap[filters.propertyType] || filters.propertyType.toUpperCase();
  }
  
  if (filters.priceRange && filters.priceRange !== 'qualquer') {
    const [min, max] = filters.priceRange.split('-');
    if (min) apiFilters.minPrice = parseInt(min);
    if (max && max !== '+') apiFilters.maxPrice = parseInt(max);
  }
  
  if (filters.bedrooms && filters.bedrooms !== 'qualquer') {
    apiFilters.bedrooms = parseInt(filters.bedrooms);
  }
  
  if (filters.bathrooms && filters.bathrooms !== 'qualquer') {
    apiFilters.bathrooms = parseInt(filters.bathrooms);
  }
  
  return apiFilters;
};

// Custom hooks
const useSearchFilters = (onFiltersChange?: (filters: any) => void, redirectOnSearch?: boolean) => {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const router = useRouter();

  const handleFilterChange = useCallback((key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (onFiltersChange) {
      onFiltersChange(convertFiltersToAPI(newFilters));
    }
  }, [filters, onFiltersChange]);

  const handleLocationChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
    
    if (value.length > 0) {
      const filtered = POPULAR_LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  }, []);

  const selectLocation = useCallback((location: string) => {
    setFilters(prev => ({ ...prev, location }));
    setShowLocationSuggestions(false);
    
    if (onFiltersChange) {
      onFiltersChange(convertFiltersToAPI({ ...filters, location }));
    }
  }, [filters, onFiltersChange]);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    if (onFiltersChange) {
      onFiltersChange(convertFiltersToAPI(DEFAULT_FILTERS));
    }
  }, [onFiltersChange]);

  const hasActiveFilters = useMemo(() => 
    Object.values(filters).some(value => 
      value !== '' && value !== 'todos' && value !== 'qualquer'
    ), [filters]
  );

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const apiFilters = convertFiltersToAPI(filters);
    
    if (redirectOnSearch) {
      // Construir URL com parâmetros de busca
      const searchParams = new URLSearchParams();
      
      if (apiFilters.city) searchParams.set('city', apiFilters.city);
      if (apiFilters.state) searchParams.set('state', apiFilters.state);
      if (apiFilters.type) searchParams.set('type', apiFilters.type);
      if (apiFilters.minPrice) searchParams.set('minPrice', apiFilters.minPrice.toString());
      if (apiFilters.maxPrice) searchParams.set('maxPrice', apiFilters.maxPrice.toString());
      if (apiFilters.bedrooms) searchParams.set('bedrooms', apiFilters.bedrooms.toString());
      if (apiFilters.bathrooms) searchParams.set('bathrooms', apiFilters.bathrooms.toString());
      
      const queryString = searchParams.toString();
      const url = queryString ? `/imoveis?${queryString}` : '/imoveis';
      router.push(url);
    } else if (onFiltersChange) {
      onFiltersChange(apiFilters);
    }
  }, [filters, redirectOnSearch, onFiltersChange, router]);

  return {
    filters,
    showAdvancedFilters,
    setShowAdvancedFilters,
    showLocationSuggestions,
    setShowLocationSuggestions,
    filteredLocations,
    handleFilterChange,
    handleLocationChange,
    selectLocation,
    clearFilters,
    hasActiveFilters,
    handleSearch
  };
};

// Sub-components
const LocationInput = ({ 
  value, 
  onChange, 
  onSelect, 
  showSuggestions, 
  suggestions 
}: {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: string) => void;
  showSuggestions: boolean;
  suggestions: string[];
}) => (
  <div className="lg:col-span-2">
    <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
      <MapPin className="w-4 h-4 mr-2" />
      Onde você quer morar?
    </label>
    <div className="relative">
      <input
        type="text"
        placeholder="Digite região de Brasília ou CEP"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (value.length > 0) {
            // Trigger suggestions if there's content
          }
        }}
        onBlur={() => {
          setTimeout(() => {}, 200);
        }}
        className="input pl-12"
      />
      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={index}
              onClick={() => onSelect(location)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 flex items-center"
            >
              <MapPin className="w-4 h-4 mr-3 text-slate-400" />
              <span className="text-slate-700">{location}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

const PropertyTypeSelect = ({ 
  value, 
  onChange 
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const selectedType = PROPERTY_TYPES.find(type => type.id === value) || PROPERTY_TYPES[0];
  
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
        <Home className="w-4 h-4 mr-2" />
        Tipo de imóvel
      </label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="input text-left cursor-pointer">
            <span className="flex items-center">
              <selectedType.icon className="w-4 h-4 mr-2" />
              {selectedType.name}
            </span>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </Listbox.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg focus:outline-none">
              {PROPERTY_TYPES.map((type) => (
                <Listbox.Option
                  key={type.id}
                  value={type.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                      active ? 'bg-slate-50' : ''
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center">
                        <type.icon className="w-4 h-4 mr-2" />
                        <span className={selected ? 'font-medium' : 'font-normal'}>
                          {type.name}
                        </span>
                      </div>
                      {selected && (
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

const SearchButton = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => gsap.to(el, { scale: 1.02, duration: 0.12, ease: 'power1.out' });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.12, ease: 'power1.out' });
    const onDown = () => gsap.to(el, { scale: 0.98, duration: 0.08, ease: 'power1.out' });
    const onUp = () => gsap.to(el, { scale: 1.02, duration: 0.12, ease: 'power1.out' });
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchend', onUp, { passive: true });
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchend', onUp);
    };
  }, []);
  return (
    <div className="flex items-end">
      <button
        ref={ref}
        type="submit"
        className="btn-primary w-full flex items-center justify-center"
      >
        <Search className="w-4 h-4 mr-2" />
        Buscar
      </button>
    </div>
  );
};

const AdvancedFilters = ({ 
  filters, 
  onFilterChange, 
  showFilters, 
  onToggleFilters, 
  hasActiveFilters, 
  onClearFilters 
}: {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) => {
  const selectedPriceRange = PRICE_RANGES.find(range => range.id === filters.priceRange) || PRICE_RANGES[0];

  return (
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onToggleFilters}
          className="btn-ghost flex items-center"
        >
          <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          {showFilters ? 'Ocultar filtros avançados' : 'Mostrar filtros avançados'}
        </button>
        
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="btn-ghost text-sm text-slate-500 hover:text-slate-700 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Limpar filtros
          </button>
        )}
      </div>

      <Transition
        show={showFilters}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Range */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Faixa de Preço
            </label>
            <Listbox value={filters.priceRange} onChange={(value) => onFilterChange('priceRange', value)}>
              <div className="relative">
                <Listbox.Button className="input text-left cursor-pointer">
                  <span>{selectedPriceRange.name}</span>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </Listbox.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg focus:outline-none">
                    {PRICE_RANGES.map((range) => (
                      <Listbox.Option
                        key={range.id}
                        value={range.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                            active ? 'bg-slate-50' : ''
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={selected ? 'font-medium' : 'font-normal'}>
                              {range.name}
                            </span>
                            {selected && (
                              <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
              <Bed className="w-4 h-4 mr-2" />
              Quartos
            </label>
            <input
              type="number"
              min="1"
              placeholder="Mínimo de quartos"
              value={filters.bedrooms === 'qualquer' ? '' : filters.bedrooms}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || value === '0') {
                  onFilterChange('bedrooms', 'qualquer');
                } else {
                  const numValue = parseInt(value);
                  if (numValue >= 1) {
                    onFilterChange('bedrooms', value);
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  const currentValue = parseInt(e.currentTarget.value) || 0;
                  if (currentValue === 1) {
                    e.preventDefault();
                    onFilterChange('bedrooms', 'qualquer');
                  }
                }
              }}
              className="input"
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
              <Bath className="w-4 h-4 mr-2" />
              Banheiros
            </label>
            <input
              type="number"
              min="1"
              placeholder="Mínimo de banheiros"
              value={filters.bathrooms === 'qualquer' ? '' : filters.bathrooms}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || value === '0') {
                  onFilterChange('bathrooms', 'qualquer');
                } else {
                  const numValue = parseInt(value);
                  if (numValue >= 1) {
                    onFilterChange('bathrooms', value);
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  const currentValue = parseInt(e.currentTarget.value) || 0;
                  if (currentValue === 1) {
                    e.preventDefault();
                    onFilterChange('bathrooms', 'qualquer');
                  }
                }
              }}
              className="input"
            />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default function SearchBar({ onFiltersChange, redirectOnSearch = false }: SearchBarProps) {
  const {
    filters,
    showAdvancedFilters,
    setShowAdvancedFilters,
    showLocationSuggestions,
    setShowLocationSuggestions,
    filteredLocations,
    handleFilterChange,
    handleLocationChange,
    selectLocation,
    clearFilters,
    hasActiveFilters,
    handleSearch
  } = useSearchFilters(onFiltersChange, redirectOnSearch);


  const selectedPropertyType = useMemo(() => 
    PROPERTY_TYPES.find(type => type.id === filters.propertyType) || PROPERTY_TYPES[0], 
    [filters.propertyType]
  );
  
  const selectedPriceRange = useMemo(() => 
    PRICE_RANGES.find(range => range.id === filters.priceRange) || PRICE_RANGES[0], 
    [filters.priceRange]
  );

  return (
    <div className="card-elevated p-8">
      <form onSubmit={handleSearch}>
        {/* Main Search Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <LocationInput
            value={filters.location}
            onChange={handleLocationChange}
            onSelect={selectLocation}
            showSuggestions={showLocationSuggestions}
            suggestions={filteredLocations}
          />
          
          <PropertyTypeSelect
            value={filters.propertyType}
            onChange={(value) => handleFilterChange('propertyType', value)}
          />
          
          <SearchButton />
        </div>

        <AdvancedFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          showFilters={showAdvancedFilters}
          onToggleFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </form>
    </div>
  );
}
