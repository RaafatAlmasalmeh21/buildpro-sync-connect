
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsOverview } from "@/components/dashboard/ProjectsOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Sidebar } from "@/components/navigation/Sidebar";
import { HelpButton } from "@/components/tutorial/HelpButton";
import { useTutorialContext } from "@/components/tutorial/TutorialProvider";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { openVideo, openLibrary } = useTutorialContext();
  const { t } = useTranslation();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8 relative">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('welcome_back')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('dashboard_intro')}
              </p>
              
              {/* Contextual Help Button */}
              <HelpButton
                videoId="dashboard-overview"
                onVideoOpen={openVideo}
                className="absolute top-0 right-0"
              />
            </div>

            <StatsGrid />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <ProjectsOverview />
              <QuickActions />
            </div>
            
            <div className="mt-8">
              <RecentActivity />
            </div>

            {/* Floating Help Button for Video Library */}
            <div className="fixed bottom-6 left-6 z-40">
              <HelpButton
                videoId="help-library"
                onVideoOpen={openLibrary}
                size="lg"
                className="bg-green-500 hover:bg-green-600 shadow-lg"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
