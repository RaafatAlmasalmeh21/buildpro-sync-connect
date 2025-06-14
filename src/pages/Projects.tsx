
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { ProjectsKanban } from "@/components/projects/ProjectsKanban";
import { ProjectsGantt } from "@/components/projects/ProjectsGantt";
import { ProjectsFilters } from "@/components/projects/ProjectsFilters";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailPanel } from "@/components/projects/ProjectDetailPanel";
import { NewProjectDialog } from "@/components/projects/NewProjectDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Grid3X3, List, BarChart3 } from "lucide-react";

// Enhanced sample data
const initialProjects = [
  {
    id: 1,
    name: "Downtown Office Complex",
    client: "Metro Development Corp",
    progress: 78,
    status: "active" as const,
    sites: 3,
    startDate: "2024-01-15",
    endDate: "2024-08-15",
    budget: "$2.4M",
    teamSize: 24,
    location: "Downtown Metro City",
  },
  {
    id: 2,
    name: "Residential Tower Phase 2",
    client: "Urban Living Ltd",
    progress: 45,
    status: "active" as const,
    sites: 1,
    startDate: "2024-03-01",
    endDate: "2024-12-20",
    budget: "$5.1M",
    teamSize: 18,
    location: "North District",
  },
  {
    id: 3,
    name: "Hospital Extension",
    client: "City Medical Center",
    progress: 92,
    status: "active" as const,
    sites: 2,
    startDate: "2023-09-01",
    endDate: "2024-07-30",
    budget: "$8.7M",
    teamSize: 32,
    location: "Medical District",
  },
  {
    id: 4,
    name: "Shopping Mall Renovation",
    client: "Retail Group Inc",
    progress: 25,
    status: "planned" as const,
    sites: 1,
    startDate: "2024-06-01",
    endDate: "2024-11-30",
    budget: "$3.2M",
    teamSize: 15,
    location: "West Side Mall",
  },
  {
    id: 5,
    name: "Bridge Maintenance",
    client: "City Infrastructure",
    progress: 100,
    status: "closed" as const,
    sites: 1,
    startDate: "2023-11-01",
    endDate: "2024-02-28",
    budget: "$1.8M",
    teamSize: 12,
    location: "Central Bridge",
  },
];

const Projects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof initialProjects[0] | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFrom, setStartDateFrom] = useState<Date | undefined>();
  const [startDateTo, setStartDateTo] = useState<Date | undefined>();

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesDateFrom = !startDateFrom || new Date(project.startDate) >= startDateFrom;
    const matchesDateTo = !startDateTo || new Date(project.startDate) <= startDateTo;
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const activeFiltersCount = [
    searchTerm,
    statusFilter !== "all" ? statusFilter : null,
    startDateFrom,
    startDateTo,
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setStartDateFrom(undefined);
    setStartDateTo(undefined);
  };

  const handleProjectCreate = (newProject: any) => {
    setProjects(prev => [...prev, newProject]);
  };

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
              <NewProjectDialog onProjectCreate={handleProjectCreate} />
            </div>

            {/* Filters */}
            <ProjectsFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              startDateFrom={startDateFrom}
              startDateTo={startDateTo}
              onStartDateFromChange={setStartDateFrom}
              onStartDateToChange={setStartDateTo}
              onClearFilters={handleClearFilters}
              activeFiltersCount={activeFiltersCount}
            />

            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-96">
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
                <TabsTrigger value="kanban" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Kanban</span>
                </TabsTrigger>
                <TabsTrigger value="gantt" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Gantt</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewDetails={setSelectedProject}
                    />
                  ))}
                </div>
                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      No projects found matching your filters.
                    </p>
                  </div>
                )}
              </TabsContent>
              
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

      {/* Detail Panel */}
      {selectedProject && (
        <ProjectDetailPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;
