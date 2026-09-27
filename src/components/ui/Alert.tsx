import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'warning' | 'danger' | 'success';
  title?: React.ReactNode;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  className = '',
  icon,
}) => {
  const variantStyles = {
    info: {
      box: 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200 border-l-4 border-l-sky-600',
      icon: <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />,
    },
    warning: {
      box: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 border-l-4 border-l-amber-600',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
    },
    danger: {
      box: 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 border-l-4 border-l-rose-600',
      icon: <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
    },
    success: {
      box: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 border-l-4 border-l-emerald-600',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
    },
  };

  const current = variantStyles[variant];

  return (
    <div
      role="alert"
      className={`p-3.5 rounded border text-xs flex items-start gap-3 ${current.box} ${className}`}
    >
      {icon || current.icon}
      <div className="flex-1 space-y-0.5">
        {title && (
          <h4 className="font-bold text-xs leading-snug">
            {title}
          </h4>
        )}
        <div className="text-[11px] leading-relaxed opacity-95">
          {children}
        </div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
