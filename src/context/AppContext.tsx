import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Role, RouteId, JobRecord, AlertRecord, ApprovalStage, NotificationItem 
} from '../types';
import { 
  INITIAL_JOBS, INITIAL_ALERTS, INITIAL_APPROVAL_STAGES, 
  INITIAL_NOTIFICATIONS, TRANSLATIONS 
} from '../data/mockData';

interface AppContextType {
  route: RouteId;
  navigate: (to: RouteId) => void;
  role: Role;
  setRole: (role: Role) => void;
  language: 'en' | 'mr' | 'hi';
  setLanguage: (lang: 'en' | 'mr' | 'hi') => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isPresentation: boolean;
  togglePresentation: () => void;
  isLargeText: boolean;
  toggleLargeText: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;
  isMobileRailOpen: boolean;
  toggleMobileRail: () => void;
  closeMobileRail: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isNotifOpen: boolean;
  openNotif: () => void;
  closeNotif: () => void;
  isProfileOpen: boolean;
  toggleProfile: () => void;
  closeProfile: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Dynamic entities
  jobs: JobRecord[];
  selectedJobId: number | null;
  setSelectedJobId: (id: number | null) => void;
  validateJobExtract: (jobId: number, extractIndex: number) => void;
  editJobExtract: (jobId: number, extractIndex: number, newSkill: string) => void;
  addJob: (job: JobRecord) => void;
  alerts: AlertRecord[];
  updateAlertStatus: (id: number, status: AlertRecord['status']) => void;
  approvalStages: ApprovalStage[];
  reviewRecommendation: () => void;
  industryReview: () => void;
  sendApproval: () => void;
  notifications: NotificationItem[];
  markNotification: (id: number) => void;
  markAllNotificationsRead: () => void;
  clearNotification: (id: number) => void;
  resetDemo: () => void;
  // Selected detail filters
  selectedSkillName: string;
  setSelectedSkillName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteId>('home');
  const [role, setRoleState] = useState<Role>('State Admin');
  const [language, setLanguageState] = useState<'en' | 'mr' | 'hi'>(() => {
    try {
      const saved = localStorage.getItem('ms_lmip_lang');
      if (saved === 'mr' || saved === 'hi' || saved === 'en') return saved;
    } catch (_) {}
    return 'en';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('ms_lmip_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return 'light';
  });
  const [isPresentation, setIsPresentation] = useState<boolean>(false);
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileRailOpen, setIsMobileRailOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  // Synchronize Dark Theme to DOM elements and storage
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('theme-dark', isDark);
    try {
      localStorage.setItem('ms_lmip_theme', theme);
    } catch (_) {}
  }, [theme]);

  // Synchronize Language to HTML attribute and storage
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('ms_lmip_lang', language);
    } catch (_) {}
  }, [language]);

  const [jobs, setJobs] = useState<JobRecord[]>(INITIAL_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(1);
  const [alerts, setAlerts] = useState<AlertRecord[]>(INITIAL_ALERTS);
  const [approvalStages, setApprovalStages] = useState<ApprovalStage[]>(INITIAL_APPROVAL_STAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedSkillName, setSelectedSkillName] = useState<string>('React');

  // Sync hash on mount and change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?view-?/, '') || window.location.hash.replace(/^#\/?/, '');
      if (hash && (hash in TRANSLATIONS.en || hash.length > 0)) {
        setRoute(hash as RouteId);
      }
    };
    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to: RouteId) => {
    setRoute(to);
    window.location.hash = `#view-${to}`;
    setIsMobileRailOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    setToastTimer(timer);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    showToast(`Active demonstration role set to: ${newRole}`);
  };

  const setLanguage = (lang: 'en' | 'mr' | 'hi') => {
    setLanguageState(lang);
    showToast(
      lang === 'mr' 
        ? 'भाषा बदलली: मराठी (MR)' 
        : lang === 'hi' 
        ? 'भाषा बदली गई: हिंदी (HI)' 
        : 'Interface language set to: English (EN)'
    );
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      showToast(
        language === 'mr'
          ? `${next === 'dark' ? 'गडद (Dark)' : 'हलकी (Light)'} थीम सक्रिय केली.`
          : language === 'hi'
          ? `${next === 'dark' ? 'डार्क (Dark)' : 'लाइट (Light)'} थीम सक्रिय की गई।`
          : `${next === 'dark' ? 'Dark' : 'Light'} theme activated.`
      );
      return next;
    });
  };

  const togglePresentation = () => {
    setIsPresentation(prev => {
      const next = !prev;
      if (next && route !== 'dashboard') {
        navigate('dashboard');
      }
      showToast(next ? 'Presentation mode active. Press Esc to exit.' : 'Presentation mode closed.');
      return next;
    });
  };

  const toggleLargeText = () => {
    setIsLargeText(prev => {
      const next = !prev;
      document.body.classList.toggle('large-text', next);
      showToast(next ? 'Large text enabled.' : 'Standard text size restored.');
      return next;
    });
  };

  const toggleSidebarCollapse = () => setIsSidebarCollapsed(p => !p);
  const toggleMobileRail = () => setIsMobileRailOpen(p => !p);
  const closeMobileRail = () => setIsMobileRailOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const openNotif = () => setIsNotifOpen(true);
  const closeNotif = () => setIsNotifOpen(false);
  const toggleProfile = () => setIsProfileOpen(p => !p);
  const closeProfile = () => setIsProfileOpen(false);

  // Global hotkeys (Ctrl+K, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isNotifOpen) setIsNotifOpen(false);
        if (isProfileOpen) setIsProfileOpen(false);
        if (isPresentation) setIsPresentation(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isNotifOpen, isProfileOpen, isPresentation]);

  const validateJobExtract = (jobId: number, extractIndex: number) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;
      const newExtracts = [...j.extracts];
      // Mark as validated
      return { ...j, extracts: newExtracts };
    }));
    showToast('AI skill extraction validated by human reviewer.');
  };

  const editJobExtract = (jobId: number, extractIndex: number, newSkill: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;
      const newExtracts = [...j.extracts];
      if (newExtracts[extractIndex]) {
        newExtracts[extractIndex] = [newSkill, newExtracts[extractIndex][1], newExtracts[extractIndex][2], newExtracts[extractIndex][3]];
      }
      return { ...j, extracts: newExtracts };
    }));
    showToast(`Reviewer edit saved: ${newSkill}`);
  };

  const addJob = (job: JobRecord) => {
    setJobs(prev => [job, ...prev]);
    showToast(`Job posting "${job.title}" created in this demo session.`);
  };

  const updateAlertStatus = (id: number, status: AlertRecord['status']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    showToast(`Alert status updated to ${status}.`);
  };

  const reviewRecommendation = () => {
    setApprovalStages(prev => {
      const updated = [...prev];
      if (updated[2]) {
        updated[2] = {
          ...updated[2],
          status: 'In review',
          date: '26 Sep 2026',
          comments: 'Technical review opened by authorized subject expert.'
        };
      }
      return updated;
    });
    showToast('Recommendation opened for human technical review.');
  };

  const industryReview = () => {
    setApprovalStages(prev => {
      const updated = [...prev];
      if (updated[3]) {
        updated[3] = {
          ...updated[3],
          status: 'In review',
          date: '26 Sep 2026',
          comments: 'Industry advisory review requested; no approval implied.'
        };
      }
      return updated;
    });
    showToast('Industry review request queued in the workflow.');
  };

  const sendApproval = () => {
    setApprovalStages(prev => {
      const updated = [...prev];
      if (updated[4]) {
        updated[4] = {
          ...updated[4],
          status: 'Pending',
          date: 'Awaiting prior technical reviews',
          comments: 'Queued for authorized executive sign-off once reviews complete.'
        };
      }
      return updated;
    });
    showToast('Approval step queued. Curriculum remains unchanged until authorized.');
  };

  const markNotification = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast('Notification cleared.');
  };

  const resetDemo = () => {
    setJobs(INITIAL_JOBS);
    setAlerts(INITIAL_ALERTS);
    setApprovalStages(INITIAL_APPROVAL_STAGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setRoleState('State Admin');
    setTheme('light');
    setIsPresentation(false);
    setIsLargeText(false);
    document.body.classList.remove('theme-dark', 'presentation-mode', 'large-text');
    showToast('Demo session reset. Data, filters and preferences restored.');
  };

  return (
    <AppContext.Provider
      value={{
        route,
        navigate,
        role,
        setRole,
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        isPresentation,
        togglePresentation,
        isLargeText,
        toggleLargeText,
        isSidebarCollapsed,
        toggleSidebarCollapse,
        isMobileRailOpen,
        toggleMobileRail,
        closeMobileRail,
        isSearchOpen,
        openSearch,
        closeSearch,
        isNotifOpen,
        openNotif,
        closeNotif,
        isProfileOpen,
        toggleProfile,
        closeProfile,
        toastMessage,
        showToast,
        jobs,
        selectedJobId,
        setSelectedJobId,
        validateJobExtract,
        editJobExtract,
        addJob,
        alerts,
        updateAlertStatus,
        approvalStages,
        reviewRecommendation,
        industryReview,
        sendApproval,
        notifications,
        markNotification,
        markAllNotificationsRead,
        clearNotification,
        resetDemo,
        selectedSkillName,
        setSelectedSkillName
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
