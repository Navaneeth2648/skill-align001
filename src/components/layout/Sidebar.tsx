import React from 'react';
import { useApp } from '../../context/AppContext';
import { RouteId } from '../../types';
import { 
  LayoutDashboard, TrendingUp, Briefcase, Sparkles, AlertCircle, 
  BookOpen, FileEdit, Users, Wrench, Building2, GraduationCap, 
  MapPin, Calendar, DollarSign, Sliders, FileBarChart, Bell, 
  ShieldAlert, Activity, HeartPulse, Bot, Database, BookCheck, 
  ChevronLeft, ChevronRight, X, ShieldCheck
} from 'lucide-react';

interface NavSection {
  title: string;
  items: {
    id: RouteId;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const { 
    route, 
    navigate, 
    role, 
    t,
    isSidebarCollapsed, 
    toggleSidebarCollapse, 
    isMobileRailOpen, 
    closeMobileRail 
  } = useApp();

  const sections: NavSection[] = [
    {
      title: t('secOverview'),
      items: [
        { id: 'dashboard', label: t('menuDashboard'), icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
        { id: 'home', label: t('menuStatewide'), icon: <Building2 className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: t('secLabour'),
      items: [
        { id: 'labour', label: t('menuLabourDemand'), icon: <TrendingUp className="w-4 h-4 shrink-0" /> },
        { id: 'jobintel', label: t('menuJobVacancy'), icon: <Briefcase className="w-4 h-4 shrink-0" /> },
        { id: 'skills', label: t('menuSkillDemand'), icon: <Sparkles className="w-4 h-4 shrink-0" /> },
        { id: 'districtintel', label: t('menuDistrictIntel'), icon: <MapPin className="w-4 h-4 shrink-0" />, badge: 'Pune Focus' },
        { id: 'skillgap', label: t('menuSkillGap'), icon: <AlertCircle className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: t('secCurriculum'),
      items: [
        { id: 'coursealignment', label: t('menuCourseAlign'), icon: <BookOpen className="w-4 h-4 shrink-0" /> },
        { id: 'curriculum', label: t('menuCurriculumReview'), icon: <FileEdit className="w-4 h-4 shrink-0" />, badge: 'Sign-off' },
        { id: 'trainingplan', label: t('menuTrainingPlans'), icon: <Calendar className="w-4 h-4 shrink-0" /> },
        { id: 'trainers', label: t('menuTrainerMgmt'), icon: <Users className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: t('secResource'),
      items: [
        { id: 'equipment', label: t('menuEquipmentPlan'), icon: <Wrench className="w-4 h-4 shrink-0" /> },
        { id: 'budget', label: t('menuBudgetPlan'), icon: <DollarSign className="w-4 h-4 shrink-0" /> },
        { id: 'scenario', label: t('menuScenarioSim'), icon: <Sliders className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: t('secStakeholders'),
      items: [
        { id: 'employerportal', label: t('menuEmployerPortal'), icon: <Building2 className="w-4 h-4 shrink-0" /> },
        { id: 'studentportal', label: t('menuStudentPortal'), icon: <GraduationCap className="w-4 h-4 shrink-0" /> },
        { id: 'institutes', label: t('menuInstitutes'), icon: <Building2 className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: t('secMonitoring'),
      items: [
        { id: 'alertcentre', label: t('menuAlertCentre'), icon: <Bell className="w-4 h-4 shrink-0" /> },
        { id: 'dataquality', label: t('menuDataQuality'), icon: <ShieldAlert className="w-4 h-4 shrink-0" /> },
        { id: 'datasources', label: t('menuDataSources'), icon: <Database className="w-4 h-4 shrink-0" /> },
        { id: 'reportscentre', label: t('menuReportsCentre'), icon: <FileBarChart className="w-4 h-4 shrink-0" /> },
        { id: 'auditlogs', label: t('menuAuditLogs'), icon: <Activity className="w-4 h-4 shrink-0" /> },
        { id: 'systemhealth', label: t('menuSystemHealth'), icon: <HeartPulse className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: t('secAdmin'),
      items: [
        { id: 'usermanagement', label: t('menuUserMgmt'), icon: <Users className="w-4 h-4 shrink-0" /> },
        { id: 'methodology', label: t('menuMethodology'), icon: <BookCheck className="w-4 h-4 shrink-0" /> },
        { id: 'assistant', label: t('menuAssistant'), icon: <Bot className="w-4 h-4 shrink-0" /> },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileRailOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-2xs md:hidden"
          onClick={closeMobileRail}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`fixed md:sticky top-0 md:top-[98px] bottom-0 left-0 z-40 bg-[#0c1e33] text-slate-200 border-r border-[#1e3957] transition-all duration-200 flex flex-col md:h-[calc(100vh-98px)] shrink-0 overflow-hidden ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        } ${
          isMobileRailOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        aria-label="Application Rail Navigation"
      >
        {/* Mobile Header Inside Drawer */}
        <div className="md:hidden p-3.5 bg-[#081525] border-b border-[#1e3957] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded border border-amber-400/40 bg-[#102c49] text-amber-300 font-extrabold flex items-center justify-center text-xs">
              MH
            </span>
            <span className="font-bold text-xs text-white uppercase tracking-wider">
              MS-LMIP Platform
            </span>
          </div>
          <button 
            type="button" 
            onClick={closeMobileRail} 
            className="p-1 rounded text-slate-400 hover:text-white"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Officer Role Context */}
        {!isSidebarCollapsed && (
          <div className="px-4 py-2.5 bg-[#091829] border-b border-[#1e3957] flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                Designated Role
              </span>
              <strong className="block text-amber-300 font-bold text-xs truncate">
                {role}
              </strong>
            </div>
            <button
              type="button"
              onClick={() => navigate('login')}
              className="text-[10px] font-semibold text-sky-300 hover:text-sky-200 hover:underline shrink-0"
            >
              Change
            </button>
          </div>
        )}

        {/* Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto py-2.5 px-2 space-y-4 text-xs custom-scrollbar">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-0.5">
              {!isSidebarCollapsed ? (
                <span className="block px-2.5 py-1 text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {sec.title}
                </span>
              ) : (
                <div className="h-px bg-[#1e3957] my-2 mx-1" />
              )}

              {sec.items.map(item => {
                const isActive = route === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      navigate(item.id);
                      closeMobileRail();
                    }}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded text-left transition-colors font-medium text-xs cursor-pointer ${
                      isActive 
                        ? 'bg-[#183a60] text-white border-l-3 border-amber-400 font-semibold shadow-2xs' 
                        : 'text-slate-300 hover:bg-[#132c49] hover:text-white'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <span className={isActive ? 'text-amber-300' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    {!isSidebarCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!isSidebarCollapsed && item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Desktop Expand / Collapse Bar */}
        <div className="hidden md:flex p-2 border-t border-[#1e3957] bg-[#091829] justify-end items-center text-[10px] text-slate-400">
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            className="p-1.5 rounded hover:bg-[#152e4d] text-slate-400 hover:text-white transition-colors ml-auto cursor-pointer"
            aria-label={isSidebarCollapsed ? 'Expand sidebar navigation' : 'Collapse sidebar navigation'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
