import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { HomeIcon, MapPinIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline';

// Dados mockados para demonstração
const featuredProperties = [
  {
    id: '1',
    title: 'Casa com 3 quartos em condomínio fechado',
    price: 450000,
    location: 'Jardim América, São Paulo - SP',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'Casa',
    operation: 'venda' as const,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'Apartamento moderno com vista para o mar',
    price: 320000,
    location: 'Copacabana, Rio de Janeiro - RJ',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    type: 'Apartamento',
    operation: 'venda' as const,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
    featured: true
  },
  {
    id: '3',
    title: 'Casa térrea com quintal amplo',
    price: 280000,
    location: 'Vila Madalena, São Paulo - SP',
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    type: 'Casa',
    operation: 'venda' as const,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop',
    featured: false
  },
  {
    id: '4',
    title: 'Apartamento próximo ao metrô',
    price: 180000,
    location: 'Centro, São Paulo - SP',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    type: 'Apartamento',
    operation: 'venda' as const,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
    featured: false
  }
];

const features = [
  {
    icon: HomeIcon,
    title: 'Busca Inteligente',
    description: 'Filtros avançados e busca por localização para encontrar exatamente o que você procura'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Segurança Garantida',
    description: 'Todos os imóveis são verificados e os proprietários são validados para sua segurança'
  },
  {
    icon: BoltIcon,
    title: 'Processo Rápido',
    description: 'Ferramentas que aceleram todo o processo de compra, venda ou locação'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-slate-400 to-white/10">
        <div className="container-elegant">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
              Encontre o imóvel dos seus sonhos
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              A plataforma mais completa para compra, venda e locação de imóveis no Brasil
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding">
        <div className="container-elegant">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Imóveis em Destaque
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Propriedades cuidadosamente selecionadas para você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="/imoveis" 
              className="btn-primary inline-flex items-center"
            >
              Ver Todos os Imóveis
              <MapPinIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-elegant">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Por que escolher o QueroHouse?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Oferecemos as melhores ferramentas para sua jornada imobiliária
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:border-slate-300 transition-smooth">
                  <feature.icon className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-elegant">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">10K+</div>
              <div className="text-slate-600">Imóveis cadastrados</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">5K+</div>
              <div className="text-slate-600">Clientes satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-slate-600">Cidades atendidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="container-elegant text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para encontrar seu próximo lar?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram o imóvel ideal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/imoveis" 
              className="btn-secondary bg-white text-slate-900 hover:bg-slate-50"
            >
              Começar Busca
            </Link>
            <Link 
              href="/anunciar" 
              className="btn-ghost border border-slate-600 text-white hover:bg-slate-800"
            >
              Anunciar Imóvel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
