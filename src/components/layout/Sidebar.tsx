import React from 'react';
import { useApp } from '../../context/AppContext';
import { RouteId } from '../../types';
import { 
  LayoutDashboard, TrendingUp, Briefcase, Sparkles, AlertCircle, 
  BookOpen, FileEdit, Users, Wrench, Building2, GraduationCap, 
  MapPin, Calendar, DollarSign, Sliders, FileBarChart, Bell, 
  ShieldAlert, Activity, HeartPulse, Bot, Database, BookCheck, 
  ChevronLeft, ChevronRight, X
} from 'lucide-react';

interface NavSection {
  title: string;
  items: {
    id: RouteId;
    label: string;
    icon: React.ReactNode;
  }[];
}

export const Sidebar: React.FC = () => {
  const { 
    route, 
    navigate, 
    role, 
    isSidebarCollapsed, 
    toggleSidebarCollapse, 
    isMobileRailOpen, 
    closeMobileRail 
  } = useApp();

  const sections: NavSection[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'labour', label: 'Labour Market', icon: <TrendingUp className="w-4 h-4 shrink-0" /> },
        { id: 'jobintel', label: 'Jobs Engine', icon: <Briefcase className="w-4 h-4 shrink-0" /> },
        { id: 'skills', label: 'Skills Intelligence', icon: <Sparkles className="w-4 h-4 shrink-0" /> },
        { id: 'skillgap', label: 'Skill Gap Analysis', icon: <AlertCircle className="w-4 h-4 shrink-0" /> },
        { id: 'districtintel', label: 'Pune District Drilldown', icon: <MapPin className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: 'TRAINING',
      items: [
        { id: 'coursealignment', label: 'Course Alignment', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
        { id: 'curriculum', label: 'Curriculum Review', icon: <FileEdit className="w-4 h-4 shrink-0" /> },
        { id: 'trainers', label: 'Trainer Management', icon: <Users className="w-4 h-4 shrink-0" /> },
        { id: 'equipment', label: 'Equipment Planning', icon: <Wrench className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: 'ECOSYSTEM',
      items: [
        { id: 'employerportal', label: 'Employer Workspace', icon: <Building2 className="w-4 h-4 shrink-0" /> },
        { id: 'studentportal', label: 'Student Workspace', icon: <GraduationCap className="w-4 h-4 shrink-0" /> },
        { id: 'institutes', label: 'Institutes & Capacity', icon: <Building2 className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: 'PLANNING',
      items: [
        { id: 'trainingplan', label: 'District Training Plans', icon: <Calendar className="w-4 h-4 shrink-0" /> },
        { id: 'budget', label: 'Budget Planning', icon: <DollarSign className="w-4 h-4 shrink-0" /> },
        { id: 'scenario', label: 'Scenario Simulator', icon: <Sliders className="w-4 h-4 shrink-0" /> },
        { id: 'reportscentre', label: 'Reports Centre', icon: <FileBarChart className="w-4 h-4 shrink-0" /> },
      ]
    },
    {
      title: 'SYSTEM & ASSISTANT',
      items: [
        { id: 'assistant', label: 'Market Assistant', icon: <Bot className="w-4 h-4 shrink-0" /> },
        { id: 'alertcentre', label: 'Alerts Triage', icon: <Bell className="w-4 h-4 shrink-0" /> },
        { id: 'dataquality', label: 'Data Quality Centre', icon: <ShieldAlert className="w-4 h-4 shrink-0" /> },
        { id: 'usermanagement', label: 'User Directory & Matrix', icon: <Users className="w-4 h-4 shrink-0" /> },
        { id: 'auditlogs', label: 'Audit Trail', icon: <Activity className="w-4 h-4 shrink-0" /> },
        { id: 'systemhealth', label: 'System Health', icon: <HeartPulse className="w-4 h-4 shrink-0" /> },
        { id: 'datasources', label: 'Data Provenance', icon: <Database className="w-4 h-4 shrink-0" /> },
        { id: 'methodology', label: 'Data & Methodology', icon: <BookCheck className="w-4 h-4 shrink-0" /> },
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileRailOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={closeMobileRail}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`fixed md:sticky top-0 md:top-[98px] bottom-0 left-0 z-40 bg-[#0c1e33] text-slate-200 border-r border-[#1e3957] transition-all duration-300 flex flex-col md:h-[calc(100vh-98px)] shrink-0 overflow-hidden ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        } ${
          isMobileRailOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        aria-label="Application Rail Navigation"
      >
        {/* Mobile Header in Drawer */}
        <div className="md:hidden p-4 bg-[#081525] border-b border-[#1e3957] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded bg-amber-500 text-slate-900 font-bold flex items-center justify-center text-xs">
              MS
            </span>
            <span className="font-bold text-sm text-white">MS-LMI System</span>
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

        {/* Current Role Banner */}
        {!isSidebarCollapsed && (
          <div className="px-4 py-3 bg-[#112944] border-b border-[#1e3957] flex items-center justify-between text-xs">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Active Role
              </span>
              <strong className="block text-amber-300 font-bold text-sm truncate max-w-[170px]">
                {role}
              </strong>
            </div>
            <button
              type="button"
              onClick={() => navigate('login')}
              className="text-[10px] font-semibold text-sky-400 hover:underline"
            >
              Switch
            </button>
          </div>
        )}

        {/* Navigation scroll area */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 text-xs custom-scrollbar">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {!isSidebarCollapsed ? (
                <span className="block px-2.5 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
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
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors font-medium ${
                      isActive 
                        ? 'bg-[#1e426d] text-white border-l-4 border-amber-400 font-semibold shadow-2xs' 
                        : 'text-slate-300 hover:bg-[#152e4d] hover:text-white'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Desktop Collapse Button */}
        <div className="hidden md:flex p-2 border-t border-[#1e3957] bg-[#091829] justify-end">
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            className="p-1.5 rounded hover:bg-[#152e4d] text-slate-400 hover:text-white transition-colors"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
