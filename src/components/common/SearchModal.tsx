import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SEARCH_INDEX } from '../../data/mockData';
import { RouteId } from '../../types';
import { Search, X, CornerDownLeft, ArrowUpDown } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All types');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Pune skill gaps',
    'EV Technician jobs',
    'Course Alignment Report'
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = SEARCH_INDEX.filter(([title, type]) => {
    const matchesTerm = !query || title.toLowerCase().includes(query.toLowerCase());
    const matchesType = selectedType === 'All types' || type === selectedType;
    return matchesTerm && matchesType;
  }).slice(0, 10);

  const handleSelect = (route: RouteId, term: string) => {
    if (term && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev].slice(0, 5));
    }
    closeSearch();
    navigate(route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex][2], filtered[selectedIndex][0]);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-[10vh] px-4"
      onClick={closeSearch}
      role="dialog"
      aria-modal="true"
      aria-labelledby="globalSearchTitle"
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 flex-1 mr-4">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search across Jobs, Skills, Courses, Institutes, Employers, Reports…"
              className="w-full bg-transparent text-[#142033] dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-hidden"
              autoComplete="off"
            />
          </div>
          <button 
            type="button" 
            onClick={closeSearch}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar & recent */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Type:</span>
            <select
              value={selectedType}
              onChange={e => {
                setSelectedType(e.target.value);
                setSelectedIndex(0);
              }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-slate-700 dark:text-slate-300"
            >
              <option>All types</option>
              <option>Jobs</option>
              <option>Skills</option>
              <option>Courses</option>
              <option>Institutes</option>
              <option>Employers</option>
              <option>Trainers</option>
              <option>Reports</option>
              <option>Districts</option>
              <option>Command</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400">Recent:</span>
            {recentSearches.map((rec, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setQuery(rec)}
                className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-[11px]"
              >
                {rec}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map(([title, type, route], idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(route, title)}
                  className={`w-full px-3 py-2.5 rounded-lg text-left flex items-center justify-between text-xs transition-colors ${
                    isSelected 
                      ? 'bg-sky-50 dark:bg-sky-950/60 text-[#173a5e] dark:text-sky-300 border-l-4 border-amber-500 font-semibold' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                      {type}
                    </span>
                    <span className="text-sm font-medium">{title}</span>
                  </span>
                  <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Navigate with arrows</span>
            <span className="mx-1">•</span>
            <span>Enter to open</span>
          </span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
