import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import { Badge } from './Badge';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  snapshotNotice?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge = <Badge variant="saffron" size="xs">Official Demo Dataset</Badge>,
  breadcrumbs,
  actions,
  filters,
  icon,
  className = '',
  snapshotNotice = 'Government Workforce Intelligence • Snapshot Synced 26 Sep 2026, 18:30 IST',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Optional Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}

      {/* Main Header Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2.5">
              {icon && (
                <span className="text-[#102c49] dark:text-sky-400 p-1 rounded bg-slate-100 dark:bg-slate-800 shrink-0">
                  {icon}
                </span>
              )}
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#102c49] dark:text-white tracking-tight">
                {title}
              </h1>
              {badge && <div className="shrink-0">{badge}</div>}
            </div>

            {description && (
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                {description}
              </p>
            )}

            {snapshotNotice && (
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                <span>{snapshotNotice}</span>
              </div>
            )}
          </div>

          {/* Contextual Actions */}
          {actions && (
            <div className="flex items-center flex-wrap gap-2 shrink-0 self-start md:self-auto">
              {actions}
            </div>
          )}
        </div>

        {/* Optional Filter Inset */}
        {filters && (
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800">
            {filters}
          </div>
        )}
      </div>
    </div>
  );
};
