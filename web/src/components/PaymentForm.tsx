'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Label, Card } from '@/components/ui/basic';
import api from '@/lib/api';

interface PaymentFormProps {
  plan: any;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentForm({ plan, onPaymentSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    installments: '1'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Criar PaymentIntent via API backend, usando Axios com token automático
      const { data } = await api.post('/api/payments/create-payment-intent', {
        amount: plan.price,
        planId: plan.id || 'plan-' + plan.name.toLowerCase().replace(/\s+/g, '-'),
      });

      const clientSecret = data?.clientSecret;

      if (!clientSecret) {
        throw new Error('Falha ao criar PaymentIntent');
      }

      // Confirmar pagamento
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: formData.cardName,
          },
        },
      });

      if (error) {
        console.error('Erro no pagamento:', error);
        alert('Erro no pagamento: ' + error.message);
      } else {
        onPaymentSuccess();
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Finalizar Pagamento
          </h1>
          <p className="text-lg text-gray-600">
            Plano selecionado: <strong>{plan.name}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumo do Plano */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo do Plano</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Plano:</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor:</span>
                <span className="font-medium">{formatPrice(plan.price)}/{plan.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Imóveis:</span>
                <span className="font-medium">{plan.maxProperties} ativo{plan.maxProperties > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Suporte:</span>
                <span className="font-medium">{plan.support}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">{formatPrice(plan.price)}</span>
              </div>
            </div>

            <div className="mt-6 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4">
              <h3 className="font-medium text-blue-900 mb-2">✅ O que está incluído:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Forma de Pagamento</h2>
            
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Método de Pagamento */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Forma de pagamento:
                </Label>
                <div className="flex items-center p-4 border border-blue-200 rounded-xl bg-blue-50/50 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">💳 Cartão de Crédito</div>
                    <div className="text-sm text-gray-500">Parcelamento em até 12x sem juros</div>
                  </div>
                </div>
              </div>

              {/* Dados do Cartão */}
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dados do Cartão *
                    </label>
                    <div className="p-4 border border-gray-300 rounded-lg bg-white">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nome como está no cartão"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parcelamento
                    </label>
                    <select
                      value={formData.installments}
                      onChange={(e) => handleInputChange('installments', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1">1x de {formatPrice(plan.price)}</option>
                      <option value="2">2x de {formatPrice(plan.price / 2)}</option>
                      <option value="3">3x de {formatPrice(plan.price / 3)}</option>
                      <option value="6">6x de {formatPrice(plan.price / 6)}</option>
                      <option value="12">12x de {formatPrice(plan.price / 12)}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processando...' : 'Finalizar Pagamento'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Segurança */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pagamento Seguro
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              SSL Criptografado
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Garantia de 7 dias
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
