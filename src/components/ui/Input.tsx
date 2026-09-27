import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = '',
  id,
  disabled,
  ...props
}, ref) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-2.5 text-slate-400 dark:text-slate-500 pointer-events-none shrink-0">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`
            w-full bg-white dark:bg-slate-900 border text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400
            rounded py-1.5 transition-colors duration-150
            focus:outline-hidden focus:ring-2 focus:ring-[#102c49] dark:focus:ring-sky-500 focus:border-transparent
            disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-8' : 'pl-3'}
            ${rightIcon ? 'pr-8' : 'pr-3'}
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
            }
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-2.5 text-slate-400 dark:text-slate-500 shrink-0">
            {rightIcon}
          </span>
        )}
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

Input.displayName = 'Input';
