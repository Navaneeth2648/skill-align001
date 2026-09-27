import React, { useEffect, useState } from 'react';
import { RouteId } from '../../types';
import { useApp } from '../../context/AppContext';

interface KpiCardProps {
  label: string;
  value: string;
  subtext?: string;
  targetRoute?: RouteId;
  borderTopColor?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  subtext,
  targetRoute,
  borderTopColor = 'border-t-[#173a5e]'
}) => {
  const { navigate } = useApp();
  const [displayValue, setDisplayValue] = useState(value);

  // Smooth counter animation if it's a numeric metric
  useEffect(() => {
    const rawDigits = value.replace(/[^0-9.]/g, '');
    const num = parseFloat(rawDigits);
    if (!isNaN(num) && num > 0 && num < 500000) {
      let start = 0;
      const duration = 650;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.round(num * ease);

        if (value.includes(',')) {
          setDisplayValue(currentNum.toLocaleString('en-IN'));
        } else if (value.includes('%')) {
          setDisplayValue(`${currentNum}%`);
        } else {
          setDisplayValue(String(currentNum));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      const animId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animId);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const handleClick = () => {
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

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
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-4 ${borderTopColor} p-4 rounded-lg shadow-sm transition-all duration-200 ${
        targetRoute ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700' : ''
      }`}
    >
      <small className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        {label}
      </small>
      <strong className="block text-2xl lg:text-3xl font-bold text-[#142033] dark:text-slate-100 tracking-tight my-1">
        {displayValue}
      </strong>
      {subtext && (
        <span className="block text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
          {subtext}
        </span>
      )}
    </div>
  );
};
