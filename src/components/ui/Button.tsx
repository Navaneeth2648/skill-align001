import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'saffron';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'sm',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded transition-colors duration-150 border disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-2 select-none';

  const sizeStyles: Record<string, string> = {
    xs: 'px-2 py-1 text-[11px] gap-1',
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm gap-2.5',
  };

  const variantStyles: Record<string, string> = {
    primary: 'bg-[#102c49] hover:bg-[#173a5e] text-white border-[#102c49] shadow-2xs active:bg-[#0c1f33]',
    secondary: 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-2xs',
    outline: 'bg-transparent hover:bg-[#102c49]/5 dark:hover:bg-slate-800 text-[#102c49] dark:text-sky-300 border-[#102c49]/30 dark:border-slate-600',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent',
    danger: 'bg-red-700 hover:bg-red-800 text-white border-red-700 shadow-2xs active:bg-red-900',
    success: 'bg-[#15803d] hover:bg-[#166534] text-white border-[#15803d] shadow-2xs active:bg-[#14532d]',
    saffron: 'bg-[#b45309] hover:bg-[#9a3412] text-white border-[#b45309] shadow-2xs active:bg-[#7c2d12]',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-0.5 w-3.5 h-3.5 text-current shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
