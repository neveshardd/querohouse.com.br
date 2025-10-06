'use client';

import { useState } from 'react';

interface CorretorFormData {
  // Informações da empresa/corretor
  nomeEmpresa: string;
  nomeCorretor: string;
  email: string;
  telefone: string;
  cnpj: string;
  creci: string;
  enderecoEmpresa: string;
  site: string;
  
  // Informações do imóvel
  titulo: string;
  descricao: string;
  tipo: string;
  preco: string;
  area: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  
  // Localização
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  
  // Características
  caracteristicas: string[];
  anoConstrucao: string;
  condominio: string;
  
  // Informações do proprietário
  nomeProprietario: string;
  telefoneProprietario: string;
  emailProprietario: string;
  
  // Imagens
  imagens: File[];
}

export default function CorretorForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CorretorFormData>({
    nomeEmpresa: '',
    nomeCorretor: '',
    email: '',
    telefone: '',
    cnpj: '',
    creci: '',
    enderecoEmpresa: '',
    site: '',
    titulo: '',
    descricao: '',
    tipo: '',
    preco: '',
    area: '',
    quartos: '',
    banheiros: '',
    vagas: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    caracteristicas: [],
    anoConstrucao: '',
    condominio: '',
    nomeProprietario: '',
    telefoneProprietario: '',
    emailProprietario: '',
    imagens: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableFeatures = [
    'Piscina',
    'Academia',
    'Playground',
    'Portaria 24h',
    'Elevador',
    'Garagem coberta',
    'Quintal',
    'Jardim',
    'Área de lazer',
    'Churrasqueira',
    'Sacada',
    'Varanda',
    'Cozinha planejada',
    'Armários embutidos',
    'Ar condicionado',
    'Aquecimento',
    'Segurança 24h',
    'Interfone',
    'Câmeras de segurança',
    'Proximidade ao metrô',
    'Proximidade a escolas',
    'Proximidade a shopping'
  ];

  const handleInputChange = (field: keyof CorretorFormData, value: string | string[] | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.includes(feature)
        ? prev.caracteristicas.filter(f => f !== feature)
        : [...prev.caracteristicas, feature]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, imagens: [...prev.imagens, ...files] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Anúncio cadastrado com sucesso! Seu imóvel será publicado após a aprovação.');
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Anunciar como Imobiliária/Corretor
        </h1>
        <p className="text-lg text-gray-600">
          Ferramentas profissionais para gerenciar seus imóveis
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 5 && (
                <div className={`w-12 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Empresa</span>
          <span>Imóvel</span>
          <span>Localização</span>
          <span>Proprietário</span>
          <span>Finalizar</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
        {/* Step 1: Dados da Empresa */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dados da Empresa/Corretor</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nomeEmpresa}
                  onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome da imobiliária"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Corretor *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nomeCorretor}
                  onChange={(e) => handleInputChange('nomeCorretor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ *
                </label>
                <input
                  type="text"
                  required
                  value={formData.cnpj}
                  onChange={(e) => handleInputChange('cnpj', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CRECI *
                </label>
                <input
                  type="text"
                  required
                  value={formData.creci}
                  onChange={(e) => handleInputChange('creci', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: F-12345"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="contato@imobiliaria.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço da Empresa *
              </label>
              <input
                type="text"
                required
                value={formData.enderecoEmpresa}
                onChange={(e) => handleInputChange('enderecoEmpresa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Endereço completo da imobiliária"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site da Empresa
              </label>
              <input
                type="url"
                value={formData.site}
                onChange={(e) => handleInputChange('site', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.imobiliaria.com.br"
              />
            </div>

            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200/50 rounded-xl p-4">
              <h3 className="font-medium text-green-900 mb-2">🏢 Vantagens Profissionais</h3>
              <p className="text-sm text-green-800">
                Como corretor, você terá acesso a ferramentas profissionais, relatórios de performance 
                e suporte prioritário para gerenciar seus imóveis.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Informações do Imóvel */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Informações do Imóvel</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Anúncio *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Casa com 3 quartos em condomínio fechado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                required
                rows={4}
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva o imóvel, suas características e diferenciais..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Imóvel *
                </label>
                <select
                  required
                  value={formData.tipo}
                  onChange={(e) => handleInputChange('tipo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço de Venda *
                </label>
                <input
                  type="number"
                  required
                  value={formData.preco}
                  onChange={(e) => handleInputChange('preco', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 450000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área (m²) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartos *
                </label>
                <input
                  type="number"
                  required
                  value={formData.quartos}
                  onChange={(e) => handleInputChange('quartos', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banheiros *
                </label>
                <input
                  type="number"
                  required
                  value={formData.banheiros}
                  onChange={(e) => handleInputChange('banheiros', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vagas
                </label>
                <input
                  type="number"
                  value={formData.vagas}
                  onChange={(e) => handleInputChange('vagas', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condomínio (R$)
                </label>
                <input
                  type="number"
                  value={formData.condominio}
                  onChange={(e) => handleInputChange('condominio', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 350"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ano de Construção
                </label>
                <input
                  type="number"
                  value={formData.anoConstrucao}
                  onChange={(e) => handleInputChange('anoConstrucao', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 2015"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Localização */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Localização do Imóvel</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço Completo *
              </label>
              <input
                type="text"
                required
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Rua das Flores, 123"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  required
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Jardim América"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  required
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: São Paulo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  required
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="BA">Bahia</option>
                  <option value="GO">Goiás</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP *
              </label>
              <input
                type="text"
                required
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: 01234-567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Características do Imóvel
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableFeatures.map((feature) => (
                  <label key={feature} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.caracteristicas.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Dados do Proprietário */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dados do Proprietário</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">ℹ️ Informações do Proprietário</h3>
              <p className="text-sm text-blue-800">
                Preencha os dados do proprietário do imóvel. Essas informações serão usadas para 
                contato direto com os interessados na compra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Proprietário *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nomeProprietario}
                  onChange={(e) => handleInputChange('nomeProprietario', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome completo do proprietário"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone do Proprietário *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefoneProprietario}
                  onChange={(e) => handleInputChange('telefoneProprietario', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email do Proprietário *
              </label>
              <input
                type="email"
                required
                value={formData.emailProprietario}
                onChange={(e) => handleInputChange('emailProprietario', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="proprietario@email.com"
              />
            </div>

            <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/50 rounded-xl p-4">
              <h3 className="font-medium text-yellow-900 mb-2">⚠️ Importante</h3>
              <p className="text-sm text-yellow-800">
                Certifique-se de que o proprietário autorizou a divulgação de seus dados de contato. 
                Você é responsável por obter essa autorização.
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Imagens e Finalização */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Fotos do Imóvel</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adicione Fotos *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 mb-2">Clique para adicionar fotos</p>
                  <p className="text-sm text-gray-500">PNG, JPG até 10MB cada</p>
                </label>
              </div>
              
              {formData.imagens.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.imagens.length} foto(s) selecionada(s)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.imagens.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.imagens.filter((_, i) => i !== index);
                            handleInputChange('imagens', newImages);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-50/80 backdrop-blur-sm border border-green-200/50 rounded-xl p-4">
              <h3 className="font-medium text-green-900 mb-2">✅ Pronto para Publicar!</h3>
              <p className="text-sm text-green-800">
                Seu anúncio será revisado em até 24 horas e ficará ativo por 60 dias. 
                Você receberá um email de confirmação e poderá acompanhar o desempenho no seu dashboard.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
