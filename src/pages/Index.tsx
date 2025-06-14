
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsOverview } from "@/components/dashboard/ProjectsOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Sidebar } from "@/components/navigation/Sidebar";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, Admin
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your construction projects today.
              </p>
            </div>

            <StatsGrid />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <ProjectsOverview />
              <QuickActions />
            </div>
            
            <div className="mt-8">
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
