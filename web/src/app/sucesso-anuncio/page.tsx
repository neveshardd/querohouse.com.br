'use client';

import Link from 'next/link';

export default function SucessoAnuncioPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-10 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-9 h-9 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Seu anúncio foi publicado!</h1>
        <p className="text-gray-600 mb-8">
          Parabéns! Seu anúncio está em revisão e ficará visível em breve. Você pode acompanhar
          o desempenho pelo seu painel ou voltar para explorar os imóveis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Ir para o Dashboard
          </Link>
          <Link
            href="/imoveis"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Ver Imóveis
          </Link>
        </div>
      </div>
    </div>
  );
}


