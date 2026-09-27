import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCheck, Trash2, Bell, AlertTriangle, FileText, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { RouteId } from '../../types';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotifOpen, 
    closeNotif, 
    notifications, 
    markNotification, 
    markAllNotificationsRead, 
    clearNotification,
    navigate 
  } = useApp();

  const [selectedType, setSelectedType] = useState<string>('All types');

  if (!isNotifOpen) return null;

  const filtered = notifications.filter(n => selectedType === 'All types' || n.type === selectedType);

  const getRouteForNotification = (type: string): RouteId => {
    switch (type) {
      case 'Alerts': return 'alertcentre';
      case 'Approvals':
      case 'Curriculum Reviews': return 'curriculum';
      case 'Reports': return 'reportscentre';
      case 'Training': return 'trainers';
      default: return 'dashboard';
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Alerts': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'Approvals': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Reports': return <FileText className="w-4 h-4 text-sky-500" />;
      case 'Deadlines': return <Clock className="w-4 h-4 text-rose-500" />;
      case 'Training': return <Calendar className="w-4 h-4 text-indigo-500" />;
      default: return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const todayList = filtered.slice(0, 4);
  const earlierList = filtered.slice(4);

  const handleOpenItem = (id: number, type: string) => {
    markNotification(id);
    closeNotif();
    navigate(getRouteForNotification(type));
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={closeNotif} 
        aria-hidden="true" 
      />

      <aside 
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Notification Centre"
      >
        {/* Header */}
        <div className="p-4 bg-[#102c49] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold tracking-tight">Notification Centre</h2>
          </div>
          <button 
            type="button" 
            onClick={closeNotif}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Close notifications"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between gap-2 text-xs">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-slate-700 dark:text-slate-200"
          >
            <option>All types</option>
            <option>Alerts</option>
            <option>Approvals</option>
            <option>Reports</option>
            <option>Deadlines</option>
            <option>Training</option>
            <option>Curriculum Reviews</option>
          </select>

          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-1 text-xs text-sky-700 dark:text-sky-400 hover:underline font-semibold"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {todayList.length > 0 && (
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                Today
              </span>
              <div className="space-y-2">
                {todayList.map(item => (
                  <article
                    key={item.id}
                    className={`p-3 rounded-lg border transition-all ${
                      item.read
                        ? 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                        : 'bg-sky-50/60 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800 text-[#142033] dark:text-slate-100 font-medium'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                        {getIconForType(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                            {item.type}
                          </span>
                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" aria-label="Unread" />
                          )}
                        </div>
                        <h3 className="text-xs font-semibold leading-snug">{item.title}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.body}</p>

                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          <button
                            type="button"
                            onClick={() => handleOpenItem(item.id, item.type)}
                            className="px-2 py-0.5 rounded bg-[#173a5e] text-white hover:bg-[#102c49] text-[11px]"
                          >
                            Open
                          </button>
                          {!item.read && (
                            <button
                              type="button"
                              onClick={() => markNotification(item.id)}
                              className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => clearNotification(item.id)}
                            className="text-[11px] text-slate-400 hover:text-rose-600 ml-auto flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Clear</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {earlierList.length > 0 && (
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                Earlier
              </span>
              <div className="space-y-2">
                {earlierList.map(item => (
                  <article
                    key={item.id}
                    className="p-3 rounded-lg border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                        {getIconForType(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                          {item.type}
                        </span>
                        <h3 className="text-xs font-semibold leading-snug">{item.title}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.body}</p>

                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          <button
                            type="button"
                            onClick={() => handleOpenItem(item.id, item.type)}
                            className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-[11px]"
                          >
                            Open
                          </button>
                          <button
                            type="button"
                            onClick={() => clearNotification(item.id)}
                            className="text-[11px] text-slate-400 hover:text-rose-600 ml-auto flex items-center gap-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Clear</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No notifications in this category.
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
