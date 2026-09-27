/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { Toast } from './components/common/Toast';
import { SearchModal } from './components/common/SearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { ProfileMenu } from './components/common/ProfileMenu';

// Page components
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { LabourMarketPage } from './pages/LabourMarketPage';
import { DistrictIntelPage } from './pages/DistrictIntelPage';
import { JobIntelPage } from './pages/JobIntelPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { SkillIntelPage } from './pages/SkillIntelPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { CourseAlignmentPage } from './pages/CourseAlignmentPage';
import { CurriculumReviewPage } from './pages/CurriculumReviewPage';
import { TrainerManagementPage } from './pages/TrainerManagementPage';
import { EquipmentPlanningPage } from './pages/EquipmentPlanningPage';
import { EmployerPortalPage } from './pages/EmployerPortalPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { TrainingPlanPage } from './pages/TrainingPlanPage';
import { BudgetPlanningPage } from './pages/BudgetPlanningPage';
import { ScenarioAnalysisPage } from './pages/ScenarioAnalysisPage';
import { ReportsCentrePage } from './pages/ReportsCentrePage';
import { AlertCentrePage } from './pages/AlertCentrePage';
import { DataQualityPage } from './pages/DataQualityPage';
import { SystemHealthPage } from './pages/SystemHealthPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { AssistantPage } from './pages/AssistantPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AboutPage, FaqPage, ContactPage } from './pages/InstitutionalPages';
import { LoginPage } from './pages/LoginPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { 
  CoursesOverviewPage, 
  InstitutesOverviewPage, 
  EmployersOverviewPage, 
  PublicReportsOverviewPage 
} from './pages/OverviewHubs';

const MainContent: React.FC = () => {
  const { route, isPresentation } = useApp();

  const renderCurrentPage = () => {
    switch (route) {
      case 'home': return <HomePage />;
      case 'dashboard': return <DashboardPage />;
      case 'labour': return <LabourMarketPage />;
      case 'districtintel': return <DistrictIntelPage />;
      case 'jobintel': return <JobIntelPage />;
      case 'jobdetail': return <JobDetailPage />;
      case 'skills': return <SkillIntelPage />;
      case 'skilldetail': return <SkillDetailPage />;
      case 'skillgap': return <SkillGapPage />;
      case 'courses': return <CoursesOverviewPage />;
      case 'coursealignment': return <CourseAlignmentPage />;
      case 'curriculum': return <CurriculumReviewPage />;
      case 'institutes': return <InstitutesOverviewPage />;
      case 'trainers': return <TrainerManagementPage />;
      case 'equipment': return <EquipmentPlanningPage />;
      case 'employers': return <EmployersOverviewPage />;
      case 'employerportal': return <EmployerPortalPage />;
      case 'students':
      case 'studentportal': return <StudentPortalPage />;
      case 'trainingplan': return <TrainingPlanPage />;
      case 'budget': return <BudgetPlanningPage />;
      case 'scenario': return <ScenarioAnalysisPage />;
      case 'reports': return <PublicReportsOverviewPage />;
      case 'reportscentre': return <ReportsCentrePage />;
      case 'alertcentre': return <AlertCentrePage />;
      case 'auditlogs': return <AuditLogsPage />;
      case 'dataquality': return <DataQualityPage />;
      case 'systemhealth': return <SystemHealthPage />;
      case 'usermanagement': return <UserManagementPage />;
      case 'assistant': return <AssistantPage />;
      case 'datasources': return <DataSourcesPage />;
      case 'methodology': return <MethodologyPage />;
      case 'about': return <AboutPage />;
      case 'faq': return <FaqPage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#f5f7fa] dark:bg-[#0b1725] text-[#142033] dark:text-[#edf3fa] font-sans transition-colors duration-200 ${
      isPresentation ? 'presentation-mode' : ''
    }`}>
      {/* Skip to Main Content Link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#173a5e] focus:text-white focus:rounded focus:outline-hidden focus:ring-2 focus:ring-amber-400 font-bold text-xs"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      {!isPresentation && <Header />}

      {/* Global Overlay Drawers & Menus */}
      <SearchModal />
      <NotificationDrawer />
      <ProfileMenu />
      <Toast />

      {/* Main Body Shell with Collapsible Sidebar */}
      <div className="flex-1 flex max-w-full">
        {!isPresentation && route !== 'home' && <Sidebar />}

        <main 
          id="main-content" 
          tabIndex={-1} 
          className={`flex-1 min-w-0 ${
            isPresentation 
              ? 'p-6 max-w-7xl mx-auto w-full' 
              : route === 'home' 
              ? 'pb-16 md:pb-0' 
              : 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8'
          }`}
        >
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Bottom Priority Navigation Dock */}
      {!isPresentation && <MobileNav />}

      {/* Global Footer */}
      {!isPresentation && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
