import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'saffron' | 'neutral';
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeStyles: Record<string, string> = {
    xs: 'px-1.5 py-0.5 text-[9px] font-bold tracking-tight',
    sm: 'px-2 py-0.5 text-[10px] font-semibold tracking-normal',
    md: 'px-2.5 py-1 text-xs font-semibold tracking-normal',
  };

  const variantStyles: Record<string, { bg: string; dot: string }> = {
    default: {
      bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
      dot: 'bg-slate-500',
    },
    primary: {
      bg: 'bg-[#102c49]/10 dark:bg-[#102c49]/40 text-[#102c49] dark:text-sky-300 border border-[#102c49]/25 dark:border-sky-800/60',
      dot: 'bg-[#102c49] dark:bg-sky-400',
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800',
      dot: 'bg-emerald-600',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
      dot: 'bg-amber-500',
    },
    danger: {
      bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800',
      dot: 'bg-rose-600',
    },
    info: {
      bg: 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
      dot: 'bg-sky-600',
    },
    saffron: {
      bg: 'bg-amber-100/70 dark:bg-amber-950/60 text-[#9a3412] dark:text-amber-200 border border-[#b45309]/30 dark:border-amber-700/50',
      dot: 'bg-[#b45309]',
    },
    neutral: {
      bg: 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800',
      dot: 'bg-slate-400',
    }
  };

  const current = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm uppercase ${sizeStyles[size]} ${current.bg} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} aria-hidden="true" />
      )}
      <span>{children}</span>
    </span>
  );
};
