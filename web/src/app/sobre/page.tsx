
export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sobre o QueroHouse
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            A plataforma mais confiável e inovadora para compra, venda e locação de imóveis no Brasil
          </p>
        </div>

        {/* Nossa História */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p className="mb-4">
              Fundada em 2020, o QueroHouse nasceu da necessidade de revolucionar o mercado imobiliário brasileiro. 
              Nossa missão é conectar pessoas aos seus lares ideais através de uma plataforma moderna, segura e fácil de usar.
            </p>
            <p className="mb-4">
              Com mais de 50.000 imóveis cadastrados e mais de 100.000 usuários ativos, nos tornamos uma das principais 
              referências em tecnologia imobiliária no país. Nossa equipe é composta por especialistas em tecnologia, 
              marketing digital e mercado imobiliário.
            </p>
            <p>
              Acreditamos que encontrar ou vender um imóvel deve ser uma experiência agradável e eficiente. Por isso, 
              investimos constantemente em inovações tecnológicas e melhorias na experiência do usuário.
            </p>
          </div>
        </div>

        {/* Nossa Missão */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Nossa Missão</h3>
            <p className="text-gray-600">
              Facilitar o acesso à moradia digna através de uma plataforma inovadora que conecta compradores, 
              vendedores e locadores de forma segura e eficiente.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Nossa Visão</h3>
            <p className="text-gray-600">
              Ser a principal plataforma de imóveis do Brasil, reconhecida pela excelência no atendimento 
              e pela inovação tecnológica.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Nossos Valores</h3>
            <p className="text-gray-600">
              Transparência, confiança, inovação e compromisso com a satisfação dos nossos usuários 
              são os pilares que guiam todas as nossas ações.
            </p>
          </div>
        </div>

        {/* Números */}
        <div className="bg-blue-600 text-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">QueroHouse em Números</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50.000+</div>
              <div className="text-blue-100">Imóveis Cadastrados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100.000+</div>
              <div className="text-blue-100">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25.000+</div>
              <div className="text-blue-100">Negócios Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfação dos Usuários</div>
            </div>
          </div>
        </div>

        {/* Equipe */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">João Silva</h3>
              <p className="text-blue-600 mb-2">CEO & Fundador</p>
              <p className="text-gray-600 text-sm">
                Mais de 15 anos de experiência no mercado imobiliário e tecnologia.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Maria Santos</h3>
              <p className="text-blue-600 mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                Especialista em desenvolvimento de plataformas digitais e IA.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pedro Costa</h3>
              <p className="text-blue-600 mb-2">Diretor Comercial</p>
              <p className="text-gray-600 text-sm">
                Responsável pelas parcerias estratégicas e expansão do negócio.
              </p>
            </div>
          </div>
        </div>

        {/* Tecnologia */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Tecnologia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Inovação em Busca</h3>
              <p className="text-gray-600 mb-4">
                Utilizamos inteligência artificial para entender as preferências dos usuários 
                e sugerir os imóveis mais adequados para cada perfil.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Algoritmos de recomendação personalizados</li>
                <li>• Busca por localização com geolocalização</li>
                <li>• Filtros inteligentes e avançados</li>
                <li>• Comparação automática de preços</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Segurança e Confiança</h3>
              <p className="text-gray-600 mb-4">
                Implementamos as mais rigorosas medidas de segurança para proteger os dados 
                dos nossos usuários e garantir transações seguras.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Verificação de identidade de todos os usuários</li>
                <li>• Criptografia de ponta a ponta</li>
                <li>• Sistema de avaliação e feedback</li>
                <li>• Suporte 24/7 para emergências</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
