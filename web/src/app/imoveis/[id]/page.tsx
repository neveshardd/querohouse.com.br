'use client';

import { useState } from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  operation: 'venda';
  images: string[];
  description: string;
  features: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  address: string;
  yearBuilt: number;
  parking: number;
  condominium: number;
}

// Dados mockados para demonstração
const propertyData: Property = {
  id: '1',
  title: 'Casa com 3 quartos em condomínio fechado',
  price: 450000,
  location: 'Jardim América, São Paulo - SP',
  images: [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
  ],
  description: 'Excelente casa em condomínio fechado com segurança 24h. Imóvel bem conservado, com 3 quartos sendo 1 suíte, 2 banheiros, sala de estar, sala de jantar, cozinha planejada, área de serviço, garagem para 2 carros e quintal. Localizada em uma das melhores regiões da cidade, próxima a escolas, shopping centers e transporte público.',
  features: [
    'Segurança 24h',
    'Portaria',
    'Área de lazer',
    'Piscina',
    'Quadra esportiva',
    'Playground',
    'Garagem coberta',
    'Quintal',
    'Cozinha planejada',
    'Armários embutidos'
  ],
  contact: {
    name: 'Maria Silva',
    phone: '(11) 99999-9999',
    email: 'maria.silva@email.com'
  },
  address: 'Rua das Flores, 123 - Jardim América, São Paulo - SP',
  yearBuilt: 2015,
  parking: 2,
  condominium: 350,
  bedrooms: 3,
  bathrooms: 2,
  area: 120,
  type: 'Casa',
  operation: 'venda'
};

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs 
            items={[
              { label: 'Imóveis', href: '/imoveis' },
              { label: 'Detalhes', href: undefined },
              { label: property.title }
            ]} 
            maxItems={2}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            {/* Galeria de imagens */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={propertyData.images[selectedImage]}
                    alt={propertyData.title}
                    width={800}
                    height={600}
                    className="w-full h-96 object-cover"
                  />
                </div>
                
                {/* Navegação da galeria */}
                <button
                  onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                  disabled={selectedImage === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage(Math.min(propertyData.images.length - 1, selectedImage + 1))}
                  disabled={selectedImage === propertyData.images.length - 1}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Miniaturas */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {propertyData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Imagem ${index + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Informações principais */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {propertyData.title}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    📍 {propertyData.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(propertyData.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Venda
                  </div>
                </div>
              </div>

              {/* Características principais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{propertyData.bedrooms}</div>
                  <div className="text-sm text-gray-600">Quartos</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{propertyData.bathrooms}</div>
                  <div className="text-sm text-gray-600">Banheiros</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{propertyData.area}m²</div>
                  <div className="text-sm text-gray-600">Área</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{propertyData.parking}</div>
                  <div className="text-sm text-gray-600">Vagas</div>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">
                  {propertyData.description}
                </p>
              </div>
            </div>

            {/* Características e comodidades */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Características</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {propertyData.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informações Adicionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-700">Endereço:</span>
                  <p className="text-gray-600">{propertyData.address}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ano de Construção:</span>
                  <p className="text-gray-600">{propertyData.yearBuilt}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Condomínio:</span>
                  <p className="text-gray-600">{formatPrice(propertyData.condominium)}/mês</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Tipo:</span>
                  <p className="text-gray-600">{propertyData.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar com contato */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Entre em Contato</h3>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium text-gray-700">{propertyData.contact.name}</span>
                </div>
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${propertyData.contact.phone}`} className="text-blue-600 hover:text-blue-700">
                    {propertyData.contact.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${propertyData.contact.email}`} className="text-blue-600 hover:text-blue-700">
                    {propertyData.contact.email}
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Solicitar Informações
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Agendar Visita
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Compartilhar
                </button>
              </div>

              {/* Formulário de contato */}
              {showContactForm && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Envie uma mensagem</h4>
                  <form className="space-y-3">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Seu email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Seu telefone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Sua mensagem"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
