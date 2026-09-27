import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, LayoutDashboard, Search, FileBarChart, CheckCircle2 } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { route, navigate, openSearch, alerts, t } = useApp();

  const newAlertsCount = alerts.filter(a => a.status === 'New').length;

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-md px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold text-slate-600 dark:text-slate-400"
      aria-label="Mobile priority navigation"
    >
      <button
        type="button"
        onClick={() => navigate('dashboard')}
        className={`flex flex-col items-center gap-0.5 p-1 cursor-pointer transition-colors ${
          route === 'dashboard' ? 'text-[#102c49] dark:text-sky-400 font-bold' : ''
        }`}
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>{t('menuDashboard')}</span>
      </button>

      <button
        type="button"
        onClick={() => navigate('alertcentre')}
        className={`flex flex-col items-center gap-0.5 p-1 relative cursor-pointer transition-colors ${
          route === 'alertcentre' ? 'text-[#102c49] dark:text-sky-400 font-bold' : ''
        }`}
      >
        <Bell className="w-4 h-4" />
        {newAlertsCount > 0 && (
          <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-red-600" />
        )}
        <span>{t('menuAlertCentre')}</span>
      </button>

      <button
        type="button"
        onClick={openSearch}
        className="flex flex-col items-center gap-0.5 p-1 text-slate-600 dark:text-slate-300 cursor-pointer"
      >
        <Search className="w-4 h-4" />
        <span>{t('btnSearch')}</span>
      </button>

      <button
        type="button"
        onClick={() => navigate('reportscentre')}
        className={`flex flex-col items-center gap-0.5 p-1 cursor-pointer transition-colors ${
          route === 'reportscentre' ? 'text-[#102c49] dark:text-sky-400 font-bold' : ''
        }`}
      >
        <FileBarChart className="w-4 h-4" />
        <span>{t('navReports')}</span>
      </button>

      <button
        type="button"
        onClick={() => navigate('curriculum')}
        className={`flex flex-col items-center gap-0.5 p-1 cursor-pointer transition-colors ${
          route === 'curriculum' ? 'text-[#102c49] dark:text-sky-400 font-bold' : ''
        }`}
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>{t('menuCurriculumReview')}</span>
      </button>
    </nav>
  );
};
