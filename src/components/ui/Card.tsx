import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentTop?: 'primary' | 'success' | 'warning' | 'danger' | 'saffron' | 'info' | 'none';
  variant?: 'default' | 'subtle' | 'outline';
}

export const Card: React.FC<CardProps> = ({
  children,
  accentTop = 'none',
  variant = 'default',
  className = '',
  ...props
}) => {
  const accentStyles: Record<string, string> = {
    none: '',
    primary: 'border-t-3 border-t-[#102c49]',
    success: 'border-t-3 border-t-[#15803d]',
    warning: 'border-t-3 border-t-[#b45309]',
    danger: 'border-t-3 border-t-[#b91c1c]',
    saffron: 'border-t-3 border-t-[#c2410c]',
    info: 'border-t-3 border-t-[#0284c7]',
  };

  const variantStyles: Record<string, string> = {
    default: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs',
    subtle: 'bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800',
    outline: 'bg-transparent border border-slate-300 dark:border-slate-700',
  };

  return (
    <div
      className={`rounded-lg overflow-hidden transition-all duration-150 ${variantStyles[variant]} ${accentStyles[accentTop]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`px-4 sm:px-5 py-3.5 border-b border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h3
      className={`text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p
      className={`text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-4 sm:p-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`px-4 sm:px-5 py-3 bg-slate-50/70 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
