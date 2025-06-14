
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MobileHeader } from "@/components/navigation/MobileHeader";
import { MobileBottomTabs } from "@/components/navigation/MobileBottomTabs";
import { MobileDashboard } from "@/components/mobile/MobileDashboard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsOverview } from "@/components/dashboard/ProjectsOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gray-50 dark:bg-gray-900">
        <MobileHeader title="Dashboard" />
        <MobileDashboard />
        <MobileBottomTabs />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back! Here's what's happening with your projects.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                <div className="xl:col-span-2">
                  <StatsGrid />
                </div>
                <div>
                  <QuickActions />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProjectsOverview />
                <RecentActivity />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
