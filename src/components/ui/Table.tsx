import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  onRowClick?: (row: T, index: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
  density?: 'compact' | 'default';
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (columnKey: string) => void;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No records found matching criteria.',
  stickyHeader = false,
  density = 'default',
  sortColumn,
  sortDirection,
  onSort,
  className = '',
}: TableProps<T>) {
  const cellPadding = density === 'compact' ? 'px-2.5 py-1.5' : 'px-3.5 py-2.5';
  const headerPadding = density === 'compact' ? 'px-2.5 py-2' : 'px-3.5 py-2.5';

  return (
    <div className={`w-full overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead className={`bg-slate-50/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 ${stickyHeader ? 'sticky top-0 z-10 backdrop-blur-xs' : ''}`}>
          <tr>
            {columns.map(col => {
              const alignClass = 
                col.align === 'right' ? 'text-right' : 
                col.align === 'center' ? 'text-center' : 'text-left';
              const isSorted = sortColumn === col.key;

              return (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`
                    ${headerPadding} ${alignClass}
                    text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider
                    select-none ${col.sortable ? 'cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-700/80' : ''}
                  `}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <div className={`inline-flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end w-full' : ''}`}>
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-slate-400">
                        {isSorted ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-[#102c49] dark:text-sky-400" /> : <ArrowDown className="w-3 h-3 text-[#102c49] dark:text-sky-400" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-slate-500">
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5 text-[#102c49] dark:text-sky-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span className="text-xs font-medium">Retrieving verified government data records...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-slate-400 dark:text-slate-500">
                <div className="max-w-sm mx-auto space-y-1">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{emptyMessage}</p>
                  <p className="text-[11px] text-slate-400">Modify your search query or reset filter parameters to view records.</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => {
              const rowKey = keyExtractor(row, rowIdx);
              const isClickable = !!onRowClick;

              return (
                <tr
                  key={rowKey}
                  onClick={() => onRowClick?.(row, rowIdx)}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={e => isClickable && (e.key === 'Enter' || e.key === ' ') && onRowClick?.(row, rowIdx)}
                  className={`
                    transition-colors duration-100
                    ${isClickable ? 'cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50' : 'hover:bg-slate-50/40 dark:hover:bg-slate-800/30'}
                    ${rowIdx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/40' : ''}
                  `}
                >
                  {columns.map(col => {
                    const alignClass = 
                      col.align === 'right' ? 'text-right' : 
                      col.align === 'center' ? 'text-center' : 'text-left';

                    const renderedValue = col.render 
                      ? col.render(row, rowIdx) 
                      : (row as any)[col.key];

                    return (
                      <td
                        key={col.key}
                        className={`${cellPadding} ${alignClass} ${col.align === 'right' ? 'tabular-nums' : ''}`}
                      >
                        {renderedValue}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
