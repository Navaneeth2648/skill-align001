import React from 'react';
import { useApp } from '../../context/AppContext';
import { ROUTE_TITLES } from '../../data/mockData';
import { 
  Search, Bell, Menu, HelpCircle, ChevronRight, User, 
  Sun, Moon, Shield, ExternalLink, BookmarkCheck, Sparkles
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Header: React.FC = () => {
  const { 
    route, 
    navigate, 
    role, 
    language, 
    setLanguage, 
    t, 
    theme, 
    toggleTheme, 
    openSearch, 
    openNotif, 
    openAssistant,
    notifications, 
    toggleProfile, 
    toggleMobileRail 
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xs">
      {/* Official Government of Maharashtra Banner Bar */}
      <div className="bg-[#0b1c2f] text-slate-100 border-b border-white/10 text-xs">
        <div className="w-full px-4 sm:px-6 py-2.5 sm:py-[11px] min-h-[54px] flex items-center justify-between gap-3">
          {/* Government Emblem & Department Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-amber-400/50 bg-[#102c49] flex flex-col items-center justify-center font-extrabold text-amber-300 text-[11px] shrink-0 tracking-tight select-none shadow-2xs">
              <span>MH</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-xs uppercase tracking-wide">
                  GOVERNMENT OF MAHARASHTRA
                </span>
              </div>
              <p className="text-[10px] text-sky-200/80 leading-tight">
                {t('deptTitle')}
              </p>
            </div>
          </div>

          {/* Right Header Status Badges & Quick Tools */}
          <div className="flex items-center gap-2 text-[11px]">
            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-1 rounded transition-colors cursor-pointer flex items-center justify-center border ${
                theme === 'dark'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400/30'
                  : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border-white/10'
              }`}
              title={
                language === 'mr'
                  ? (theme === 'dark' ? 'हलकी थीम वापरा (Switch to Light)' : 'गडद थीम वापरा (Switch to Dark)')
                  : language === 'hi'
                  ? (theme === 'dark' ? 'लाइट थीम चुनें (Switch to Light)' : 'डार्क थीम चुनें (Switch to Dark)')
                  : `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
              }
              aria-label={t('toggleTheme')}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>

            {/* Language Switcher */}
            <label className="sr-only" htmlFor="officialLangSelect">{t('selectLanguage')}</label>
            <select
              id="officialLangSelect"
              value={language}
              onChange={e => setLanguage(e.target.value as any)}
              className="bg-[#102c49] dark:bg-slate-800 text-[11px] font-semibold text-slate-200 border border-white/20 rounded px-1.5 py-0.5 focus:outline-hidden focus:ring-1 focus:ring-amber-400 cursor-pointer"
            >
              <option value="en" className="bg-[#0b1c2f] text-slate-100">English (EN)</option>
              <option value="mr" className="bg-[#0b1c2f] text-slate-100">मराठी (MR)</option>
              <option value="hi" className="bg-[#0b1c2f] text-slate-100">हिंदी (HI)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full px-4 sm:px-6 flex items-center justify-between min-h-[52px] h-[52px] gap-3">
        <div className="flex items-center gap-3">
          {/* Mobile navigation rail toggle */}
          <button
            type="button"
            onClick={toggleMobileRail}
            className="md:hidden p-1.5 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Open portal navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Portal Title & Home Link */}
          <button
            type="button"
            onClick={() => navigate('home')}
            className="text-left cursor-pointer group"
          >
            <span className="block text-xs md:text-sm font-extrabold text-[#102c49] dark:text-white tracking-tight group-hover:text-[#173a5e] dark:group-hover:text-sky-300 transition-colors">
              {t('platformName')}
            </span>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              {t('platformSub')}
            </span>
          </button>
        </div>

        {/* Primary Desktop Institutional Links */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main system areas">
          {[
            { id: 'dashboard', label: t('menuDashboard') },
            { id: 'labour', label: t('navLabour') },
            { id: 'skills', label: t('navSkills') },
            { id: 'coursealignment', label: t('navCourses') },
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
                className={`px-2.5 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-[#102c49]/10 dark:bg-sky-950 text-[#102c49] dark:text-sky-300 border-b-2 border-b-amber-500' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action & Role Profile Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search */}
          <button
            type="button"
            onClick={openSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 shadow-2xs font-medium cursor-pointer"
            aria-label="Search dataset records"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline text-[11px]">{t('searchPlaceholder')}</span>
            <kbd className="hidden lg:inline-block px-1 py-0.2 text-[9px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600 font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Intelligence Assistant */}
          <button
            type="button"
            onClick={openAssistant}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-amber-500/50 dark:border-amber-400/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-sky-500/10 hover:from-amber-500/20 hover:to-sky-500/20 text-[#102c49] dark:text-amber-300 text-xs font-semibold shadow-2xs cursor-pointer transition-all"
            aria-label="Open Intelligence Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="hidden sm:inline text-[11px]">Intelligence Assistant</span>
            <span className="sm:hidden text-[11px]">Assistant</span>
          </button>

          {/* Alert & Notification Tray */}
          <button
            type="button"
            onClick={openNotif}
            className="relative p-2 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label={`${t('officialNotifications')} ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-700 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Help & FAQ */}
          <button
            type="button"
            onClick={() => navigate('faq')}
            className="hidden sm:flex items-center gap-1 p-2 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs cursor-pointer"
            title={t('helpGuidelines')}
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Officer Demonstration Role Badge */}
          <button
            type="button"
            onClick={toggleProfile}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#102c49] hover:bg-[#173a5e] text-white text-xs font-semibold shadow-2xs cursor-pointer"
            aria-label="Logged-in officer context and role profile"
          >
            <User className="w-3.5 h-3.5 text-amber-300" />
            <span className="truncate max-w-[100px]">{role}</span>
          </button>
        </div>
      </div>

      {/* Synchronized Government Evidence Snapshot Bar */}
      <div className="bg-slate-100/80 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 min-h-[28px] h-[28px] text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-slate-700 dark:text-slate-300">{t('evidenceSnapshot')}</strong> 27 September 2026, 09:30 PM IST • {t('districtsStatus')}
          </span>
        </div>
      </div>
    </header>
  );
};
