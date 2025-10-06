'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Home, Users, Building2, Check } from 'lucide-react';
import ProprietarioForm from '@/components/ProprietarioForm';
import CorretorForm from '@/components/CorretorForm';
import IncorporadoraForm from '@/components/IncorporadoraForm';
import PaymentForm from '@/components/PaymentForm';
import AuthModal from '@/components/AuthModal';
import { useAuthContext } from '@/providers/AuthProvider';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  maxProperties: number;
  support: string;
  popular?: boolean;
}

// Planos diretos (ocupações são os planos)
const plans: Plan[] = [
  {
    id: 'proprietario',
    name: 'Proprietário Direto',
    price: 29,
    duration: 'mês',
    maxProperties: 1,
    support: 'Email',
    features: [
      '1 imóvel ativo',
      'Fotos ilimitadas',
      'Visibilidade por 30 dias',
      'Suporte por email',
      'Relatórios básicos',
      'Controle total sobre o anúncio',
      'Comunicação direta com compradores',
      'Sem comissões de corretor'
    ]
  },
  {
    id: 'corretor',
    name: 'Imobiliária/Corretor',
    price: 79,
    duration: 'mês',
    maxProperties: 5,
    support: 'WhatsApp + Email',
    popular: true,
    features: [
      '5 imóveis ativos',
      'Fotos ilimitadas',
      'Visibilidade por 60 dias',
      'Destaque na busca',
      'Suporte prioritário',
      'Relatórios avançados',
      'Badge de verificado',
      'Gestão de múltiplos imóveis',
      'Ferramentas profissionais'
    ]
  },
  {
    id: 'incorporadora',
    name: 'Incorporadora/Construtora',
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
      'Análise de mercado',
      'Gestão de empreendimentos',
      'Ferramentas empresariais'
    ]
  }
];

export default function VenderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const stepRef = useRef<HTMLDivElement | null>(null);
  const [persistedPlanChecked, setPersistedPlanChecked] = useState(false);

  const handlePlanSelect = (plan: Plan) => {
    setUserType(plan.id);
    setSelectedPlan(plan);
    // Se já estiver autenticado, vai direto ao pagamento
    if (isAuthenticated) {
      setCurrentStep(4);
    } else {
      setCurrentStep(2);
    }
    // Scroll topo a cada mudança de step
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    // Persistir plano escolhido
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected_plan', JSON.stringify({ id: plan.id, name: plan.name, price: plan.price }));
    }
  };

  const handleBack = () => {
    // Não permitir acessar o formulário (step 3) sem pagamento
    if (currentStep === 4) {
      // Do checkout, voltar para seleção de plano
      setCurrentStep(1);
      return;
    }

    if (currentStep === 3) {
      // Se estiver no formulário após pagamento, voltar para início
      setCurrentStep(1);
      return;
    }

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAuthentication = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setCurrentStep(4);
    }
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setCurrentStep(4);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    setCurrentStep(3);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    // Marcar plano como pago
    if (typeof window !== 'undefined' && selectedPlan) {
      localStorage.setItem('selected_plan_paid', 'true');
      localStorage.setItem('selected_plan', JSON.stringify({ id: selectedPlan.id, name: selectedPlan.name, price: selectedPlan.price }));
    }
  };

  const handlePaymentCancel = () => {
    setCurrentStep(1);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Se o usuário autenticar (ou já estiver autenticado) e estiver no passo 2, avançar automaticamente
  useEffect(() => {
    if (isAuthenticated && currentStep === 2) {
      setCurrentStep(4);
    }
  }, [isAuthenticated, currentStep]);

  // Restaurar plano escolhido/pago
  useEffect(() => {
    if (persistedPlanChecked) return;
    if (typeof window === 'undefined') return;
    const paid = localStorage.getItem('selected_plan_paid') === 'true';
    const raw = localStorage.getItem('selected_plan');
    if (raw) {
      try {
        const p = JSON.parse(raw);
        if (p?.id) {
          setUserType(p.id);
          setSelectedPlan({
            id: p.id,
            name: p.name || p.id,
            price: p.price || 0,
            duration: 'mês',
            maxProperties: 1,
            support: 'Email',
            features: []
          } as any);
          // Redirecionar conforme status do pagamento
          if (paid) {
            // Já pagou: considerar passo 3 (formulário) e liberar renderização
            setPaymentCompleted(true);
            setCurrentStep(isAuthenticated ? 3 : 2);
          } else {
            // Ainda não pagou: se autenticado, retomar checkout
            if (isAuthenticated) setCurrentStep(4);
          }
        }
      } catch {}
    }
    setPersistedPlanChecked(true);
  }, [isAuthenticated, persistedPlanChecked]);

  // Animação sutil entre steps usando GSAP com import dinâmico (client-only)
  useEffect(() => {
    let ctx: any;
    (async () => {
      if (!stepRef.current) return;
      const gsap = (await import('gsap')).default;
      ctx = gsap.context(() => {
        gsap.fromTo(
          stepRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power1.out' }
        );
      }, stepRef);
    })();
    return () => ctx && ctx.revert && ctx.revert();
  }, [currentStep]);


  return (
    <div className="min-h-screen bg-gray-50" ref={stepRef}>
      {/* Botão de Voltar */}
      {currentStep > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
        </div>
      )}

      {/* Step 1: Seleção de Plano (Ocupações são os planos) */}
      {currentStep === 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Escolha seu Plano
            </h1>
            <p className="text-xl text-gray-600">
              Selecione o tipo de conta que melhor se adequa ao seu perfil
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan)}
                className={`bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border-2 p-8 cursor-pointer transition-all duration-300 hover:shadow-3xl ${
                  plan.popular
                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {plan.id === 'proprietario' && <Home className="w-8 h-8 text-blue-600" />}
                    {plan.id === 'corretor' && <Users className="w-8 h-8 text-green-600" />}
                    {plan.id === 'incorporadora' && <Building2 className="w-8 h-8 text-purple-600" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">R$ {plan.price}</span>
                    <span className="text-gray-600">/{plan.duration}</span>
                  </div>
                  <p className="text-gray-600">
                    Até {plan.maxProperties} imóvel{plan.maxProperties > 1 ? 'eis' : ''}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Suporte: {plan.support}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Escolher Plano
                </button>
              </div>
            ))}
          </div>

          {/* Informações Adicionais */}
          <div className="mt-16 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              💡 Por que anunciar no QueroHouse?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Segurança</h4>
                <p className="text-sm text-blue-800">
                  Todos os usuários são verificados e os imóveis validados
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Rapidez</h4>
                <p className="text-sm text-blue-800">
                  Anúncios aprovados em até 24 horas
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Visibilidade</h4>
                <p className="text-sm text-blue-800">
                  Algoritmo inteligente para maior exposição
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Autenticação */}
      {currentStep === 2 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quase lá! Faça login para continuar
            </h1>
            <p className="text-lg text-gray-600">
              Você precisa estar logado para anunciar seu imóvel
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Faça login para continuar
              </h2>
              <p className="text-gray-600 mb-6">
                Entre com sua conta ou cadastre-se para prosseguir
              </p>

              <button
                onClick={handleAuthentication}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Fazer Login / Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Formulário Específico */}
      {currentStep === 3 && paymentCompleted && (
        <>
          {userType === 'proprietario' && <ProprietarioForm />}
          {userType === 'corretor' && <CorretorForm />}
          {userType === 'incorporadora' && <IncorporadoraForm />}
        </>
      )}

      {/* Step 4: Pagamento */}
      {currentStep === 4 && selectedPlan && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PaymentForm
            plan={selectedPlan}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}