'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { XMarkIcon, EyeIcon, EyeSlashIcon, MagnifyingGlassIcon, BriefcaseIcon, TruckIcon, BuildingOfficeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// Transition removido (não utilizado)
import gsap from 'gsap';
import { useRef } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const { login, register, isLoggingIn, isRegistering, isAuthenticated, loginMutation, registerMutation } = useAuthContext();

  // Bloquear scroll quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup quando componente desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fechar modal apenas quando as mutations foram bem-sucedidas E não há erros
  useEffect(() => {
    if (loginMutation.isSuccess && !loginMutation.isError && !loginMutation.isPending && isOpen && isAuthenticated) {
      onAuthSuccess?.();
      onClose();
    }
  }, [loginMutation.isSuccess, loginMutation.isError, loginMutation.isPending, isOpen, isAuthenticated, onClose, onAuthSuccess]);

  useEffect(() => {
    if (registerMutation.isSuccess && !registerMutation.isError && !registerMutation.isPending && isOpen && isAuthenticated) {
      onAuthSuccess?.();
      onClose();
    }
  }, [registerMutation.isSuccess, registerMutation.isError, registerMutation.isPending, isOpen, isAuthenticated, onClose, onAuthSuccess]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    console.log('Validando formulário:', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      passwordLength: formData.password?.length,
      confirmPassword: formData.confirmPassword,
      isLogin
    });

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
      }
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      console.log('Erro de validação de senha:', {
        password: formData.password,
        length: formData.password.length,
        required: 6
      });
    }

    if (!isLogin) {
      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }

    console.log('Erros de validação:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Submetendo formulário:', {
      isLogin,
      formData: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordLength: formData.password?.length,
        phone: formData.phone
      }
    });

    if (!validateForm()) {
      console.log('Validação falhou, não enviando');
      return;
    }

    console.log('Validação passou, enviando dados');

    if (isLogin) {
      login({ email: formData.email, password: formData.password });
    } else {
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        role: 'user' // Definir role padrão como 'user'
      });
    }
  };

  // Capturar erros das mutations
  useEffect(() => {
    if (loginMutation.error || registerMutation.error) {
      const error = loginMutation.error || registerMutation.error;

      // Só logar no console se não for um erro silencioso de autenticação
      if (!(error as any)?.silent) {
        console.error('Erro de autenticação:', error);
      }

      // Extrair mensagem de erro mais específica da API
      let errorMessage = 'Erro de conexão. Tente novamente.';

      if (error && typeof error === 'object') {
        const apiError = error as any;
        if (apiError?.apiResponse?.error) {
          errorMessage = apiError.apiResponse.error;
        } else if (apiError?.response?.data?.error) {
          errorMessage = apiError.response.data.error;
        } else if (apiError?.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        } else if (apiError?.message) {
          errorMessage = apiError.message;
        }
      }

      setSubmitError(errorMessage);
    }
  }, [loginMutation.error, registerMutation.error]);

  // Limpar erros quando mutations resetam
  useEffect(() => {
    if (loginMutation.isIdle && registerMutation.isIdle) {
      setSubmitError('');
    }
  }, [loginMutation.isIdle, registerMutation.isIdle]);

  // Limpar erros quando mudar entre login/registro
  useEffect(() => {
    setSubmitError('');
    setErrors({});
  }, [isLogin]);

  const handleGoogleLogin = () => {
    console.log('Login com Google');
  };

  useEffect(() => {
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    if (!backdrop || !content) return;

    if (isOpen) {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(content, { scale: 0.95, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
    } else {
      gsap.to(content, { scale: 0.95, opacity: 0, y: 20, duration: 0.2, ease: 'power1.out' });
      gsap.to(backdrop, { opacity: 0, duration: 0.2 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-7/8 overflow-y-auto shadow-2xl"
      >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Menu</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Coluna esquerda - Login */}
              <div className="space-x-6 space-y-2">
                {/* Entrar ou criar conta */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Entrar ou criar conta</h3>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-slate-700 font-medium">Entrar com Google</span>
                  </button>
                </div>

                {/* Dados de acesso */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Dados de acesso</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <input
                          type="text"
                          placeholder="Nome completo..."
                          value={formData.name}
                          onChange={handleChange('name')}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.name ? 'border-red-500' : 'border-slate-200'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>
                    )}

                    <div>
                      <input
                        type="email"
                        placeholder="Email de login..."
                        value={formData.email}
                        onChange={handleChange('email')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.email ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {!isLogin && (
                      <input
                        type="tel"
                        placeholder="Telefone (opcional)..."
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    )}

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha de acesso..."
                        value={formData.password}
                        onChange={handleChange('password')}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.password ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}

                    {!isLogin && (
                      <div>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirmar senha..."
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                              errors.confirmPassword ? 'border-red-500' : 'border-slate-200'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                              <EyeIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center">
                      <a
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-500 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Esqueci minha senha
                      </a>
                    </div>


                    <button
                      type="submit"
                      disabled={isLoggingIn || isRegistering}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoggingIn ? 'Entrando...' : isRegistering ? 'Cadastrando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      {isLogin ? 'Não tem cadastro? Crie sua conta aqui' : 'Já tem cadastro? Faça login aqui'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Coluna direita - Facilidades e Opções */}
              <div className="space-y-6">
                {/* Facilidades QueroHouse */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Facilidades QueroHouse</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center p-4 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors">
                      <MagnifyingGlassIcon className="w-8 h-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Imóveis</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors">
                      <BriefcaseIcon className="w-8 h-8 text-teal-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Anunciar</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors">
                      <TruckIcon className="w-8 h-8 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-slate-700">Buscar</span>
                    </button>
                  </div>
                </div>

                {/* Mais opções */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Mais opções</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <BuildingOfficeIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Cadastrar meu imóvel</span>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                          <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-teal-500 rounded"></div>
                        </div>
                        <span className="text-slate-700 font-medium">Conheça a QueroHouse</span>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                          </svg>
                        </div>
                        <span className="text-slate-700 font-medium">Suporte QueroHouse</span>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
