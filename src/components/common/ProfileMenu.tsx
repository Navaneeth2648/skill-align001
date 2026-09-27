import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Moon, Sun, Activity, HelpCircle, LogOut, RotateCcw } from 'lucide-react';

export const ProfileMenu: React.FC = () => {
  const { 
    isProfileOpen, 
    closeProfile, 
    role, 
    theme, 
    toggleTheme, 
    resetDemo, 
    navigate, 
    showToast 
  } = useApp();

  if (!isProfileOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={closeProfile} 
        aria-hidden="true" 
      />

      <div 
        className="fixed right-6 top-16 z-50 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 text-xs"
        role="menu"
        aria-label="Profile Demonstration Menu"
      >
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#173a5e] text-amber-300 font-bold flex items-center justify-center text-xs">
              {role.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <strong className="block text-slate-800 dark:text-slate-100 font-bold text-sm">
                {role}
              </strong>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Demonstration Workspace · Maharashtra
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-0.5">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              closeProfile();
              showToast('Profile credentials and authorization status displayed.');
            }}
            className="w-full px-3 py-2 rounded-md text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Profile Details</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              toggleTheme();
              closeProfile();
            }}
            className="w-full px-3 py-2 rounded-md text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-400" />}
            <span>Toggle Theme ({theme === 'dark' ? 'Light' : 'Dark'})</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              closeProfile();
              navigate('auditlogs');
            }}
            className="w-full px-3 py-2 rounded-md text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Activity className="w-4 h-4 text-slate-400" />
            <span>Activity &amp; Audit Logs</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              closeProfile();
              navigate('faq');
            }}
            className="w-full px-3 py-2 rounded-md text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help &amp; Documentation</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              closeProfile();
              resetDemo();
            }}
            className="w-full px-3 py-2 rounded-md text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reset Demo Session</span>
          </button>

          <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                closeProfile();
                navigate('login');
              }}
              className="w-full px-3 py-2 rounded-md text-left flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch Demonstration Role</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
