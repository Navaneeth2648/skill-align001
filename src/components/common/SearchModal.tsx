import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { RouteId } from '../../types';
import { 
  INITIAL_JOBS, DISTRICTS_DATA, COURSES_DATA, TRAINERS_DATA, 
  INITIAL_ALERTS, REPORT_TYPES_DATA, SEARCH_INDEX 
} from '../../data/mockData';
import { Search, X, CornerDownLeft, ArrowUpDown, ChevronRight, Briefcase, Award, MapPin, BookOpen, Users, AlertTriangle, FileBarChart, Terminal } from 'lucide-react';

interface SearchCategoryGroup {
  category: string;
  count: number;
  icon: React.ReactNode;
  items: {
    title: string;
    subtitle?: string;
    route: RouteId;
    badge?: string;
  }[];
}

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigate, setSelectedJobId, setSelectedSkillName } = useApp();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Pune',
    'React',
    'EV Diagnostics',
    'Spring Boot',
    'Aundh ITI'
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

  const q = query.trim().toLowerCase();

  // Categorized searchable sets
  const jobResults = INITIAL_JOBS
    .filter(j => !q || j.title.toLowerCase().includes(q) || j.employer.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q)))
    .slice(0, 5)
    .map(j => ({
      title: j.title,
      subtitle: `${j.employer} • ${j.district} • ${j.salaryText}`,
      route: 'jobdetail' as RouteId,
      badge: 'Jobs',
      jobId: j.id
    }));

  const allSkills = Array.from(new Set(INITIAL_JOBS.flatMap(j => j.skills)));
  const skillResults = allSkills
    .filter(s => !q || s.toLowerCase().includes(q))
    .slice(0, 5)
    .map(s => ({
      title: s,
      subtitle: 'Market Demand & Competency Benchmark',
      route: 'skilldetail' as RouteId,
      badge: 'Skills',
      skillName: s
    }));

  const districtResults = DISTRICTS_DATA
    .filter(d => !q || d.name.toLowerCase().includes(d.name.toLowerCase().includes(q) ? q : ''))
    .slice(0, 4)
    .map(d => ({
      title: `${d.name} District`,
      subtitle: `${d.jobs.toLocaleString('en-IN')} active vacancies • Top skill: ${d.topSkill}`,
      route: (d.name === 'Pune' ? 'districtintel' : 'labour') as RouteId,
      badge: 'Districts'
    }));

  const courseResults = Object.entries(COURSES_DATA)
    .filter(([_, c]) => !q || c.name.toLowerCase().includes(q))
    .slice(0, 4)
    .map(([key, c]) => ({
      title: c.name,
      subtitle: `${c.institutes} ITIs offering • ${c.students} students`,
      route: 'coursealignment' as RouteId,
      badge: 'Courses'
    }));

  const trainerResults = TRAINERS_DATA
    .filter(t => !q || t.name.toLowerCase().includes(q) || t.skills.some(s => s.toLowerCase().includes(q)))
    .slice(0, 4)
    .map(t => ({
      title: t.name,
      subtitle: `${t.institute} • ${t.skills.join(', ')}`,
      route: 'trainers' as RouteId,
      badge: 'Trainers'
    }));

  const alertResults = INITIAL_ALERTS
    .filter(a => !q || a.title.toLowerCase().includes(q) || a.skill.toLowerCase().includes(q))
    .slice(0, 3)
    .map(a => ({
      title: a.title,
      subtitle: `${a.district} • ${a.severity} Severity`,
      route: 'alertcentre' as RouteId,
      badge: 'Alerts'
    }));

  const reportResults = REPORT_TYPES_DATA
    .filter(r => !q || r[0].toLowerCase().includes(q) || r[1].toLowerCase().includes(q))
    .slice(0, 3)
    .map(r => ({
      title: r[0],
      subtitle: `${r[1]} • ${r[2].slice(0, 60)}...`,
      route: 'reportscentre' as RouteId,
      badge: 'Reports'
    }));

  const groups: SearchCategoryGroup[] = [
    { category: 'Jobs', count: jobResults.length, icon: <Briefcase className="w-3.5 h-3.5" />, items: jobResults },
    { category: 'Skills', count: skillResults.length, icon: <Award className="w-3.5 h-3.5" />, items: skillResults },
    { category: 'Districts', count: districtResults.length, icon: <MapPin className="w-3.5 h-3.5" />, items: districtResults },
    { category: 'Courses', count: courseResults.length, icon: <BookOpen className="w-3.5 h-3.5" />, items: courseResults },
    { category: 'Trainers', count: trainerResults.length, icon: <Users className="w-3.5 h-3.5" />, items: trainerResults },
    { category: 'Alerts', count: alertResults.length, icon: <AlertTriangle className="w-3.5 h-3.5" />, items: alertResults },
    { category: 'Reports', count: reportResults.length, icon: <FileBarChart className="w-3.5 h-3.5" />, items: reportResults }
  ];

  const activeGroups = selectedCategory === 'All' 
    ? groups.filter(g => g.items.length > 0)
    : groups.filter(g => g.category === selectedCategory && g.items.length > 0);

  // Flattened items for keyboard arrow navigation
  const flatItems = activeGroups.flatMap(g => g.items);

  const handleSelect = (item: any) => {
    if (item.title && !recentSearches.includes(item.title)) {
      setRecentSearches(prev => [item.title, ...prev.filter(x => x !== item.title)].slice(0, 5));
    }
    if (item.jobId) {
      setSelectedJobId(item.jobId);
    }
    if (item.skillName) {
      setSelectedSkillName(item.skillName);
    }
    closeSearch();
    navigate(item.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (flatItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (flatItems.length || 1)) % (flatItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        handleSelect(flatItems[selectedIndex]);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-2xs flex items-start justify-center pt-[8vh] px-4 transition-opacity duration-150"
      onClick={closeSearch}
      role="dialog"
      aria-modal="true"
      aria-labelledby="globalSearchTitle"
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5 flex-1 mr-4">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search across Jobs, Skills, Districts, Courses, Trainers, Alerts, Reports…"
              className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden"
              autoComplete="off"
            />
          </div>
          <button 
            type="button" 
            onClick={closeSearch}
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills & Recent Searches */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            {['All', 'Jobs', 'Skills', 'Districts', 'Courses', 'Trainers', 'Alerts', 'Reports'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedIndex(0);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#102c49] text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 text-[10px]">Recent:</span>
            {recentSearches.map((rec, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setQuery(rec);
                  setSelectedIndex(0);
                }}
                className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-[10px] cursor-pointer"
              >
                {rec}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Results */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
          {flatItems.length > 0 ? (
            activeGroups.map((grp) => (
              <div key={grp.category} className="space-y-1.5">
                <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {grp.icon}
                  <span>{grp.category} ({grp.items.length})</span>
                </div>
                <div className="space-y-1">
                  {grp.items.map((item, itemIdx) => {
                    const globalIdx = flatItems.indexOf(item);
                    const isSelected = globalIdx === selectedIndex;
                    return (
                      <button
                        key={itemIdx}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={`w-full px-3 py-2 rounded text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[#102c49]/10 dark:bg-sky-950/60 text-[#102c49] dark:text-sky-300 border-l-3 border-[#b45309] font-semibold' 
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold truncate">{item.title}</span>
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 opacity-60 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-400 text-xs">
              No matching records found across jobs, skills, courses, or districts for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3 h-3" />
            <span>Navigate with arrows</span>
            <span className="mx-1">•</span>
            <span>Enter to select &amp; inspect</span>
          </span>
          <span className="text-[10px]">Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
