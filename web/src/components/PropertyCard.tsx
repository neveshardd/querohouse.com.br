'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  HomeIcon,
  MapPinIcon,
  HeartIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { PropertyCardData, formatPrice } from '@/types/property';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { BathIcon, BedIcon } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyCardData;
  viewMode?: 'grid' | 'list';
}

export default function PropertyCard({ property, viewMode = 'grid' }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' });
  }, []);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/imoveis/${property.id}`} className="group">
        <div
          ref={cardRef}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-slate-100 flex flex-col sm:flex-row"
        >
          {/* Imagem Principal - Lista Desktop */}
          <div className="relative w-64 sm:w-96 h-72 flex-shrink-0 overflow-hidden hidden sm:block">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 256px, 320px"
            />

            {/* Botão Favorito */}
            <button
              onClick={handleFavorite}
              className={`absolute cursor-pointer right-3 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-colors duration-200 ${
                property.featured ? 'top-3' : 'top-3'
              }`}
            >
              {isFavorited ? (
                <HeartSolidIcon className="w-4 h-4 text-red-500" />
              ) : (
                <HeartIcon className="w-4 h-4 text-slate-600 hover:text-red-500 transition-colors" />
              )}
            </button>

            {/* Indicador de Visualizações */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center">
              <EyeIcon className="w-3 h-3 mr-1" />
              <span>1.2k</span>
            </div>
          </div>

          {/* Imagem Principal - Lista Mobile */}
          <div className="relative w-full h-48 flex-shrink-0 overflow-hidden sm:hidden order-1">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              sizes="100vw"
            />


            {/* Botão Favorito */}
            <button
              onClick={handleFavorite}
              className={`absolute right-2 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-colors duration-200 ${
                property.featured ? 'top-10' : 'top-2'
              }`}
            >
              {isFavorited ? (
                <HeartSolidIcon className="w-4 h-4 text-red-500" />
              ) : (
                <HeartIcon className="w-4 h-4 text-slate-600 hover:text-red-500 transition-colors" />
              )}
            </button>

            {/* Indicador de Visualizações */}
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center">
              <EyeIcon className="w-3 h-3 mr-1" />
              <span>1.2k</span>
            </div>
          </div>

          {/* Conteúdo do Card - Lista */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between min-w-0 order-2">
            {/* Header com título e localização */}
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors break-words">
                {property.title}
              </h3>
              <div className="flex items-center text-slate-600">
                <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm truncate">Brasília, DF</span>
              </div>
            </div>

            {/* Informações detalhadas */}
            <div className="space-y-3">
              {/* Avaliação */}
              <div className="flex items-center">
                <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                  <StarSolidIcon className="w-4 h-4 text-green-500 mr-1 flex-shrink-0" />
                  <span className="text-green-700 font-bold text-sm">4.9</span>
                  <span className="text-green-600 text-xs ml-1 hidden sm:inline">(187 avaliações)</span>
                </div>
              </div>

              {/* Preço */}
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 break-words">
                    {formatPrice(property.price)}
                  </span>
                </div>
              </div>

              {/* Características detalhadas */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center flex-wrap gap-3">
                  {property.bedrooms && (
                    <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md">
                      <BedIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="font-medium text-sm whitespace-nowrap">{property.bedrooms} quartos</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md">
                      <BathIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="font-medium text-sm whitespace-nowrap">{property.bathrooms} banheiros</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md">
                      <HomeIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="font-medium text-sm whitespace-nowrap">{property.area}m²</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">Disponível</div>
                  <div className="text-xs text-green-600 font-medium">✓ Verificado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Modo Grid (enxuto)
  return (
    <Link href={`/imoveis/${property.id}`} className="group">
        <div
          ref={cardRef}
          className="bg-white rounded-xl min-w-64 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-slate-100"
        >
        {/* Imagem Principal */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Botão Favorito */}
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-sm hover:bg-white transition-colors duration-200"
          >
            {isFavorited ? (
              <HeartSolidIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 hover:text-red-500 transition-colors" />
            )}
          </button>

          {/* Indicador de Visualizações */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 cursor-pointer bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center">
            <EyeIcon className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">1.2k visualizações</span>
            <span className="sm:hidden">1.2k</span>
          </div>
        </div>

        {/* Conteúdo do Card - Grid (enxuto) */}
        <div className="p-4 sm:p-6">
          {/* Título */}
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors break-words">
              {property.title}
            </h3>
          </div>

          {/* Preço */}
          <div className="mb-3">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 break-words">
                {formatPrice(property.price)}
              </span>
            </div>
          </div>

          {/* Características essenciais */}
          <div className="flex items-center justify-between text-sm text-slate-600 gap-2">
            <div className="flex items-center space-x-2 min-w-0">
              {property.bedrooms && (
                <div className="flex items-center flex-shrink-0">
                  <BedIcon className="w-4 h-4 mr-1" />
                  <span className="font-medium text-xs sm:text-sm">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center flex-shrink-0">
                  <BathIcon className="w-4 h-4 mr-1" />
                  <span className="font-medium text-xs sm:text-sm">{property.bathrooms}</span>
                </div>
              )}
            </div>
            {property.area && (
              <div className="bg-slate-100 px-2 py-1 rounded-lg flex-shrink-0">
                <span className="font-medium text-slate-700 text-xs sm:text-sm whitespace-nowrap">{property.area}m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
