import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium ${className}`}>
      <ol className="flex items-center gap-1.5 list-none m-0 p-0 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index === 0 && (
                <Home className="w-3 h-3 text-slate-400 mr-0.5 inline-block" />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-slate-900 dark:text-slate-100 font-bold truncate max-w-[240px]"
                >
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-[#102c49] dark:hover:text-sky-300 hover:underline cursor-pointer"
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
