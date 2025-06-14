import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsOverview } from "@/components/dashboard/ProjectsOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Sidebar } from "@/components/navigation/Sidebar";
import { HelpButton } from "@/components/tutorial/HelpButton";
import { PresenceIndicator } from "@/components/collaboration/PresenceIndicator";
import { useTutorialContext } from "@/components/tutorial/TutorialProvider";
import { useCollaborationContext } from "@/components/collaboration/CollaborationProvider";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { openVideo } = useTutorialContext();
  const { activeUsers } = useCollaborationContext();

  const handleRefresh = async () => {
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Data refreshed');
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div data-tour="header">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        </div>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {/* Header with presence indicator */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                  </h1>
                  <HelpButton
                    videoId="dashboard-overview"
                    onVideoOpen={openVideo}
                    size="sm"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back! Here's what's happening with your projects today.
                </p>
                
                {/* Presence Indicator */}
                <div className="mt-4">
                  <PresenceIndicator users={activeUsers} />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div data-tour="stats" className="mb-8">
              <StatsGrid />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div data-tour="projects">
                  <ProjectsOverview />
                </div>
                <RecentActivity />
              </div>
              
              <div className="space-y-8">
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </PullToRefresh>
  );
};

export default Index;
