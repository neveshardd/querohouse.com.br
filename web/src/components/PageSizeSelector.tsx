'use client';

interface PageSizeSelectorProps {
  currentSize: number;
  onSizeChange: (size: number) => void;
  options?: number[];
  className?: string;
}

export default function PageSizeSelector({
  currentSize,
  onSizeChange,
  options = [6, 12, 24, 48],
  className = ''
}: PageSizeSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="page-size" className="text-sm font-medium text-slate-700">
        Itens por página:
      </label>
      <select
        id="page-size"
        value={currentSize}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-smooth"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
