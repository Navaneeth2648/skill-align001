import React from 'react';
import { RouteId } from '../../types';
import { useApp } from '../../context/AppContext';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

export interface KpiCardProps {
  label: string;
  value: string;
  subtext?: string;
  targetRoute?: RouteId;
  borderTopColor?: string;
  accent?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'saffron';
  trend?: 'up' | 'down' | 'neutral';
  tooltip?: string;
  loading?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subtext,
  targetRoute,
  borderTopColor,
  accent = 'primary',
  trend,
  tooltip,
  loading = false,
}) => {
  const { navigate } = useApp();

  const handleClick = () => {
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  const accentBorderStyles: Record<string, string> = {
    primary: 'border-t-3 border-t-[#102c49]',
    success: 'border-t-3 border-t-[#15803d]',
    warning: 'border-t-3 border-t-[#b45309]',
    danger: 'border-t-3 border-t-[#b91c1c]',
    info: 'border-t-3 border-t-[#0284c7]',
    saffron: 'border-t-3 border-t-[#c2410c]',
  };

  // Determine top border style with fallback to custom borderTopColor if passed
  const topBorderClass = borderTopColor || accentBorderStyles[accent];

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && targetRoute) {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={targetRoute ? 0 : undefined}
      role={targetRoute ? 'button' : undefined}
      title={tooltip}
      className={`
        bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
        ${topBorderClass}
        p-3.5 sm:p-4 rounded-lg shadow-2xs transition-all duration-150 relative overflow-hidden group
        ${targetRoute ? 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-amber-600' : ''}
      `}
    >
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
          {label}
        </span>
        {targetRoute && (
          <ArrowUpRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        )}
      </div>

      <div className="flex items-baseline gap-2 my-1">
        <strong className="block text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#102c49] dark:text-slate-100 tracking-tight tabular-nums">
          <AnimatedNumber value={value} loading={loading} />
        </strong>
      </div>

      {subtext && (
        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 mt-1">
          {trend === 'up' && <TrendingUp className="w-3 h-3 shrink-0" />}
          {trend === 'down' && <ArrowDownRight className="w-3 h-3 shrink-0 text-rose-600 dark:text-rose-400" />}
          <span className="truncate">{subtext}</span>
        </div>
      )}
    </div>
  );
};
