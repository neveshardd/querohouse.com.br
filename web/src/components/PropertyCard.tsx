'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HomeIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { PropertyCardData, formatPrice } from '@/types/property';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: PropertyCardData;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/imoveis/${property.id}`} className="group">
      <motion.div 
        className="card hover-lift overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <div className="w-full h-56 bg-slate-100 relative overflow-hidden">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-smooth"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={property.featured}
            />
            {property.featured && (
              <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                Destaque
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
              {property.type}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-slate-700 transition-smooth">
            {property.title}
          </h3>

          <div className="flex items-center text-slate-600 text-sm mb-4">
            <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 text-slate-600 mr-1" />
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(property.price)}
              </span>
            </div>
            {property.area && (
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                {property.area}m²
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-slate-600">
              {property.bedrooms && (
                <div className="flex items-center">
                  <HomeIcon className="w-4 h-4 mr-1" />
                  <span>{property.bedrooms} quartos</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <span>{property.bathrooms} banheiros</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
