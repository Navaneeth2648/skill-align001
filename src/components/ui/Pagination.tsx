import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  pageSize = 10,
  onPageChange,
  className = '',
}) => {
  const startRecord = Math.min((currentPage - 1) * pageSize + 1, totalRecords || 0);
  const endRecord = Math.min(currentPage * pageSize, totalRecords || 0);

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 py-3 ${className}`}>
      {totalRecords !== undefined ? (
        <span className="tabular-nums">
          Showing <strong className="text-slate-800 dark:text-slate-200">{startRecord}</strong> to{' '}
          <strong className="text-slate-800 dark:text-slate-200">{endRecord}</strong> of{' '}
          <strong className="text-slate-800 dark:text-slate-200">{totalRecords}</strong> records
        </span>
      ) : (
        <span>
          Page <strong className="text-slate-800 dark:text-slate-200">{currentPage}</strong> of{' '}
          <strong className="text-slate-800 dark:text-slate-200">{totalPages}</strong>
        </span>
      )}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <span className="px-3 py-1 font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
          {currentPage} / {totalPages || 1}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium transition-colors"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
