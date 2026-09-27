import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface FilterBarProps {
  children: React.ReactNode;
  onReset?: () => void;
  onApply?: () => void;
  showActions?: boolean;
  className?: string;
  title?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  children,
  onReset,
  onApply,
  showActions = true,
  className = '',
  title = 'Filters & Parameters',
}) => {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 shadow-2xs space-y-3 ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#102c49] dark:text-sky-400" />
            <span>{title}</span>
          </div>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-end gap-3 text-xs">
        <div className="flex-1 flex flex-wrap items-end gap-3 min-w-[240px]">
          {children}
        </div>

        {showActions && onApply && (
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <Button
              variant="primary"
              size="sm"
              onClick={onApply}
              leftIcon={<Filter className="w-3.5 h-3.5" />}
            >
              Apply Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
