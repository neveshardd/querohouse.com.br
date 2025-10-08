'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  hasNextPage,
  hasPrevPage,
  totalItems,
  itemsPerPage,
  className = ''
}: PaginationProps) {
  // Calcular range de páginas para mostrar
  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];
    
    const delta = 2; // Número de páginas para mostrar de cada lado
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();
  const startItem = Math.max(1, (currentPage - 1) * itemsPerPage + 1);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Não mostrar paginação se não há dados
  if (totalItems === 0 || !totalItems) {
    return null;
  }

  // Se só tem uma página, mostrar apenas os controles básicos
  if (totalPages <= 1) {
    return (
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div className="text-sm text-slate-600">
          Mostrando {startItem} a {endItem} de {totalItems.toLocaleString('pt-BR')} resultados
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      
      {/* Informações de resultados */}
      <div className="text-sm text-slate-600">
        Mostrando {startItem} a {endItem} de {totalItems.toLocaleString('pt-BR')} resultados
      </div>

      {/* Controles de paginação */}
      <div className="flex items-center gap-2">
        {/* Botão primeira página */}
        <button
          onClick={onFirst}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-smooth ${
            currentPage !== 1
              ? 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              : 'border-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          title="Primeira página"
        >
          <span className="w-4 h-4">⏮</span>
          Primeira
        </button>

        {/* Botão anterior */}
        <button
          onClick={onPrevious}
          disabled={!hasPrevPage}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-smooth ${
            hasPrevPage
              ? 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              : 'border-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          title="Página anterior"
        >
          <span className="w-4 h-4">‹</span>
          Anterior
        </button>

        {/* Números das páginas */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
              disabled={pageNumber === '...'}
              className={`w-10 h-10 text-sm font-medium rounded-lg border transition-smooth ${
                pageNumber === currentPage
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : pageNumber === '...'
                  ? 'border-transparent text-slate-400 cursor-default'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        {/* Botão próximo */}
        <button
          onClick={onNext}
          disabled={!hasNextPage}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-smooth ${
            hasNextPage
              ? 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              : 'border-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          title="Próxima página"
        >
          Próximo
          <span className="w-4 h-4">›</span>
        </button>

        {/* Botão última página */}
        <button
          onClick={onLast}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-smooth ${
            currentPage !== totalPages
              ? 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              : 'border-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          title="Última página"
        >
          Última
          <span className="w-4 h-4">⏭</span>
        </button>
      </div>
    </div>
  );
}
