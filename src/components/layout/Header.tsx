import React from 'react';
import { useApp } from '../../context/AppContext';
import { ROUTE_TITLES } from '../../data/mockData';
import { Search, Bell, Menu, HelpCircle, ChevronRight, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    route, 
    navigate, 
    role, 
    language, 
    setLanguage, 
    t, 
    isLargeText, 
    toggleLargeText, 
    openSearch, 
    openNotif, 
    notifications, 
    toggleProfile, 
    toggleMobileRail 
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
      {/* Top Government Emblem Bar */}
      <div className="bg-[#102c49] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded border border-amber-400/40 bg-white/10 flex flex-col items-center justify-center font-bold text-amber-300 text-xs shrink-0 tracking-tighter">
              MH
            </div>
            <div>
              <strong className="block text-xs md:text-sm font-semibold tracking-wide uppercase text-slate-100">
                Maharashtra Skill &amp; Labour Market Intelligence Platform
              </strong>
              <small className="block text-[10px] text-sky-200/80">
                Government Decision-Support Prototype • Smart India Hackathon
              </small>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-sky-200 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>SIH Demonstrated Evidence Engine</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between min-h-[52px] gap-2">
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={toggleMobileRail}
            className="md:hidden p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button 
              type="button" 
              onClick={() => navigate('home')}
              className="hover:text-[#173a5e] dark:hover:text-sky-400 hover:underline"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[220px]">
              {ROUTE_TITLES[route] || route}
            </span>
          </div>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
          {[
            { id: 'home', label: t('navHome') },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'labour', label: t('navLabour') },
            { id: 'skills', label: t('navSkills') },
            { id: 'courses', label: t('navCourses') },
            { id: 'institutes', label: t('navInstitutes') },
            { id: 'employers', label: t('navEmployers') },
            { id: 'reportscentre', label: t('navReports') },
            { id: 'assistant', label: t('navAssistant') },
          ].map(item => {
            const isActive = route === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id as any)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  isActive 
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-[#173a5e] dark:text-sky-300 border-b-2 border-amber-500' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right utility items */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Global Search Button */}
          <button
            type="button"
            onClick={openSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs font-medium"
            aria-label="Search platform"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            onClick={openNotif}
            className="relative p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Language Switcher */}
          <label className="sr-only" htmlFor="langSelect">Language</label>
          <select
            id="langSelect"
            value={language}
            onChange={e => setLanguage(e.target.value as any)}
            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-md px-1.5 py-1 focus:outline-hidden cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="mr">मराठी</option>
            <option value="hi">हिंदी</option>
          </select>

          {/* Text Size Toggle */}
          <button
            type="button"
            onClick={toggleLargeText}
            className={`px-2 py-1 rounded text-xs font-bold border transition-colors ${
              isLargeText 
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-300' 
                : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Toggle larger typography"
            aria-pressed={isLargeText}
          >
            A⁺
          </button>

          {/* Help Button */}
          <button
            type="button"
            onClick={() => navigate('faq')}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Help and FAQ"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </button>

          {/* Profile / Role Selector */}
          <button
            type="button"
            onClick={toggleProfile}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#173a5e] text-white hover:bg-[#102c49] text-xs font-semibold shadow-xs"
            aria-label="Demonstration Profile"
          >
            <User className="w-3.5 h-3.5 text-amber-300" />
            <span className="truncate max-w-[90px]">{role}</span>
          </button>
        </div>
      </div>

      {/* Synchronized status bar */}
      <div className="bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-slate-800 px-4 py-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-2xs" aria-hidden="true" />
          <span>Online • Maharashtra Data Repository Snapshot Synced (26 Sep 2026, 18:30 IST)</span>
        </div>
        <span className="hidden md:inline font-mono text-[10px] text-slate-400 uppercase tracking-widest">
          Evidence Engine v3.4 • SIH
        </span>
      </div>
    </header>
  );
};
