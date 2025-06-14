
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { ProjectsKanban } from "@/components/projects/ProjectsKanban";
import { ProjectsGantt } from "@/components/projects/ProjectsGantt";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

const Projects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Projects
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your construction projects and track progress.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-96">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
                <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-6">
                <ProjectsList />
              </TabsContent>
              
              <TabsContent value="kanban" className="mt-6">
                <ProjectsKanban />
              </TabsContent>
              
              <TabsContent value="gantt" className="mt-6">
                <ProjectsGantt />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
