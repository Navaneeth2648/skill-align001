import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options?: (string | SelectOption)[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  hint,
  options,
  children,
  className = '',
  id,
  disabled,
  ...props
}, ref) => {
  const generatedId = React.useId();
  const selectId = id || generatedId;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={`
            w-full appearance-none bg-white dark:bg-slate-900 border text-xs text-slate-900 dark:text-slate-100
            rounded py-1.5 pl-3 pr-8 transition-colors duration-150 cursor-pointer
            focus:outline-hidden focus:ring-2 focus:ring-[#102c49] dark:focus:ring-sky-500 focus:border-transparent
            disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
            }
            ${className}
          `}
          {...props}
        >
          {options ? (
            options.map((opt, i) => {
              if (typeof opt === 'string') {
                return <option key={i} value={opt}>{opt}</option>;
              }
              return <option key={i} value={opt.value}>{opt.label}</option>;
            })
          ) : (
            children
          )}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error && (
        <p className="text-[10px] text-red-600 dark:text-red-400 font-medium">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-[10px] text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
