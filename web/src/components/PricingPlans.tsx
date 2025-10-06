'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/basic';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  maxProperties: number;
  support: string;
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 29,
    duration: 'mês',
    maxProperties: 1,
    support: 'Email',
    features: [
      '1 imóvel ativo',
      'Fotos ilimitadas',
      'Visibilidade por 30 dias',
      'Suporte por email',
      'Relatórios básicos'
    ]
  },
  {
    id: 'professional',
    name: 'Profissional',
    price: 79,
    duration: 'mês',
    maxProperties: 5,
    support: 'WhatsApp + Email',
    popular: true,
    highlighted: true,
    features: [
      '5 imóveis ativos',
      'Fotos ilimitadas',
      'Visibilidade por 60 dias',
      'Destaque na busca',
      'Suporte prioritário',
      'Relatórios avançados',
      'Badge de verificado'
    ]
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    price: 149,
    duration: 'mês',
    maxProperties: 20,
    support: 'Telefone + WhatsApp',
    features: [
      '20 imóveis ativos',
      'Fotos ilimitadas',
      'Visibilidade por 90 dias',
      'Destaque premium',
      'Suporte telefônico',
      'Relatórios completos',
      'API de integração',
      'Gestão de equipe',
      'Análise de mercado'
    ]
  }
];

interface PricingPlansProps {
  userType: string;
  onSelectPlan: (plan: PricingPlan) => void;
}

export default function PricingPlans({ userType, onSelectPlan }: PricingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const getPlanDescription = (userType: string) => {
    switch (userType) {
      case 'proprietario':
        return 'Escolha o plano ideal para anunciar seu imóvel';
      case 'corretor':
        return 'Planos profissionais para imobiliárias e corretores';
      case 'incorporadora':
        return 'Soluções empresariais para incorporadoras e construtoras';
      default:
        return 'Escolha o plano ideal para sua necessidade';
    }
  };

  const getPlanBenefits = (userType: string) => {
    switch (userType) {
      case 'proprietario':
        return [
          'Anuncie seu imóvel com segurança',
          'Controle total sobre o anúncio',
          'Comunicação direta com compradores'
        ];
      case 'corretor':
        return [
          'Gerencie múltiplos imóveis',
          'Ferramentas profissionais',
          'Relatórios de performance'
        ];
      case 'incorporadora':
        return [
          'Gestão de empreendimentos',
          'Ferramentas empresariais',
          'Integração com sistemas'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Escolha seu Plano
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          {getPlanDescription(userType)}
        </p>
        
        {/* Benefícios específicos do tipo de usuário */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {getPlanBenefits(userType).map((benefit, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
            } ${selectedPlan === plan.id ? 'ring-2 ring-green-500' : ''}`}
          >
            {/* Badge Popular */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </Badge>
              </div>
            )}

            {/* Header do Plano */}
            <CardHeader className="text-center mb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </CardTitle>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  R$ {plan.price}
                </span>
                <span className="text-gray-600">/{plan.duration}</span>
              </div>
              <p className="text-gray-600">
                Até {plan.maxProperties} imóvel{plan.maxProperties > 1 ? 'eis' : ''}
              </p>
            </CardHeader>

            {/* Features */}
            <CardContent className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </CardContent>

            {/* Suporte */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg mx-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
                <span className="text-sm text-gray-600">
                  Suporte: {plan.support}
                </span>
              </div>
            </div>

            {/* Botão de Seleção */}
            <div className="p-6 pt-0">
              <Button
                onClick={() => {
                  setSelectedPlan(plan.id);
                  onSelectPlan(plan);
                }}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === plan.id ? 'Selecionado' : 'Escolher Plano'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Informações Adicionais */}
      <div className="mt-16 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💳 Formas de Pagamento
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-800">
            <span>💳 Cartão de Crédito</span>
            <span>🏦 PIX</span>
            <span>📱 Boleto Bancário</span>
            <span>🔄 Débito Automático</span>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <p>✅ Todos os planos incluem garantia de 7 dias</p>
          <p>✅ Cancele a qualquer momento</p>
          <p>✅ Suporte técnico incluído</p>
        </div>
      </div>
    </div>
  );
}
