'use client';

import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { 
  HomeIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  StarIcon, 
  ArrowTrendingUpIcon, 
  ClockIcon,
  CheckCircleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  HeartIcon,
  SparklesIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useHomeData } from '@/hooks/useHomeData';

// Dados de parcerias premium
const partnerships = [
  {
    name: 'Construtora Brasília',
    logo: '🏗️',
    description: 'Especialista em empreendimentos residenciais',
    rating: 4.9,
    projects: '500+'
  },
  {
    name: 'Imobiliária Capital',
    logo: '🏢',
    description: 'Referência em imóveis comerciais',
    rating: 4.8,
    projects: '300+'
  },
  {
    name: 'Corretor Premium',
    logo: '👔',
    description: 'Consultoria especializada em investimentos',
    rating: 5.0,
    projects: '200+'
  },
  {
    name: 'Financiamento Fácil',
    logo: '💰',
    description: 'Soluções financeiras para sua compra',
    rating: 4.7,
    projects: '1000+'
  }
];

// Depoimentos reais de clientes
const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Compradora',
    location: 'Asa Norte',
    avatar: '👩‍💼',
    content: 'Encontrei meu apartamento dos sonhos em apenas 2 semanas! O processo foi super rápido e seguro.',
    rating: 5,
    property: 'Apartamento 3 quartos - Asa Norte'
  },
  {
    name: 'João Santos',
    role: 'Vendedor',
    location: 'Lago Sul',
    avatar: '👨‍💻',
    content: 'Vendi minha casa por um preço excelente em menos de 30 dias. A plataforma é incrível!',
    rating: 5,
    property: 'Casa 4 quartos - Lago Sul'
  },
  {
    name: 'Ana Costa',
    role: 'Investidora',
    location: 'Plano Piloto',
    avatar: '👩‍💼',
    content: 'Melhor plataforma para investir em imóveis em Brasília. Interface intuitiva e resultados garantidos.',
    rating: 5,
    property: 'Apartamento 2 quartos - Plano Piloto'
  }
];

// Benefícios únicos da plataforma
const uniqueBenefits = [
  {
    icon: ShieldCheckIcon,
    title: 'Verificação 100% Segura',
    description: 'Todos os imóveis e proprietários são verificados por nossa equipe especializada',
    highlight: 'Zero fraudes'
  },
  {
    icon: BoltIcon,
    title: 'Resultados em 24h',
    description: 'Nossa tecnologia encontra as melhores oportunidades em tempo recorde',
    highlight: '3x mais rápido'
  },
  {
    icon: HeartIcon,
    title: 'Suporte Personalizado',
    description: 'Consultores especializados te acompanham em cada etapa do processo',
    highlight: 'Atendimento VIP'
  }
];

export default function Home() {
  const { 
    featuredProperties, 
    recentProperties, 
    affordableProperties, 
    stats,
    loading,
    error 
  } = useHomeData();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Design Minimalista React.dev */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge Minimalista */}
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 rounded-full px-3 py-1 mb-8 text-sm">
              <span>#1 Plataforma Imobiliária de Brasília</span>
            </div>

            {/* Headline Principal - Estilo React.dev */}
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight text-gray-900">
              Encontre o imóvel perfeito<br />
              em <span className="text-blue-600">Brasília</span>
            </h1>
            
            {/* Subheadline Simples */}
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              2.500+ imóveis verificados • 98% de satisfação • Resultados garantidos
            </p>

            {/* Search Bar Minimalista */}
            <div className="mb-16">
              <SearchBar redirectOnSearch={true} />
            </div>

            {/* Social Proof Minimalista */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-4 h-4" />
                <span>1.800+ clientes satisfeitos</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>100% seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <BoltIcon className="w-4 h-4" />
                <span>Resultados em 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios - Design Minimalista */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher o QueroHouse?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A única plataforma que garante resultados em 24h com segurança total
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uniqueBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  <CheckCircleIcon className="w-4 h-4" />
                  {benefit.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imóveis em Destaque - Design Minimalista */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-4">
              <StarIcon className="w-4 h-4" />
              Mais Procurados
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Imóveis em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Propriedades cuidadosamente selecionadas pelos nossos especialistas em Brasília
            </p>
          </div>
          
          {loading.featured ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
              <span className="ml-4 text-gray-600">Carregando imóveis em destaque...</span>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Em breve teremos imóveis incríveis para você!</p>
            </div>
          )}
          
          <div className="text-center mt-16">
            <Link 
              href="/imoveis" 
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Ver Todos os Imóveis
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos - Design Minimalista */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-4">
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              Depoimentos Reais
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mais de 1.800 famílias já encontraram seu lar dos sonhos conosco
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-gray-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} • {testimonial.location}</div>
                    <div className="text-xs text-gray-500">{testimonial.property}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imóveis Recentes - Design Minimalista */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-4">
              <ClockIcon className="w-4 h-4" />
              Recém-Cadastrados
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Imóveis Recém-Cadastrados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Novas oportunidades que acabaram de chegar ao mercado em Brasília
            </p>
          </div>
          
          {loading.recent ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
              <span className="ml-4 text-gray-600">Carregando imóveis recentes...</span>
            </div>
          ) : recentProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ClockIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Novos imóveis chegam todos os dias!</p>
            </div>
          )}
        </div>
      </section>

      {/* Oportunidades - Design Minimalista */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-4">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              Melhor Custo-Benefício
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Oportunidades em Brasília
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Imóveis com excelente custo-benefício na capital federal
            </p>
          </div>
          
          {loading.affordable ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
              <span className="ml-4 text-gray-600">Carregando oportunidades...</span>
            </div>
          ) : affordableProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {affordableProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ArrowTrendingUpIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Grandes oportunidades chegam em breve!</p>
            </div>
          )}
        </div>
      </section>

      {/* Parceiros - Design Minimalista */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-4">
              <BuildingOfficeIcon className="w-4 h-4" />
              Parceiros Premium
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nossos Parceiros de Confiança
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trabalhamos com os melhores profissionais do mercado imobiliário de Brasília
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerships.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors text-center">
                <div className="text-4xl mb-6">{partner.logo}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{partner.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <StarIcon className="w-4 h-4 text-gray-400 fill-current" />
                  <span className="font-semibold text-gray-900">{partner.rating}</span>
                </div>
                <div className="text-sm text-gray-500">{partner.projects} projetos</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas - Design Minimalista */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Números que impressionam
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Resultados reais que comprovam nossa excelência no mercado imobiliário de Brasília
            </p>
          </div>
          
          {loading.stats ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
              <span className="ml-4 text-gray-400">Carregando estatísticas...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats ? (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <BuildingOfficeIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {stats.publishedProperties.toLocaleString()}+
                    </div>
                    <div className="text-gray-300">Imóveis em Brasília</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <UserGroupIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {stats.totalUsers.toLocaleString()}+
                    </div>
                    <div className="text-gray-300">Clientes Satisfeitos</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <MapPinIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">15+</div>
                    <div className="text-gray-300">Regiões Atendidas</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <TrophyIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                    <div className="text-gray-300">Taxa de Satisfação</div>
                  </div>
                </>
              ) : (
                <div className="col-span-full text-center py-16">
                  <TrophyIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-400">Estatísticas em breve!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Final - Design Minimalista */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-gray-900">
              Pronto para encontrar seu lar dos sonhos?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Junte-se a <strong>1.800+ famílias</strong> que já encontraram o imóvel ideal em Brasília com nossa ajuda
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link 
                href="/imoveis" 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-lg"
              >
                <MapPinIcon className="w-5 h-5" />
                Buscar em Brasília
              </Link>
              <Link 
                href="/anunciar" 
                className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors text-lg"
              >
                <HomeIcon className="w-5 h-5" />
                Anunciar Imóvel
              </Link>
            </div>

            {/* Garantia */}
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full">
              <ShieldCheckIcon className="w-5 h-5" />
              <span className="font-medium">100% Seguro • Resultados Garantidos</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
