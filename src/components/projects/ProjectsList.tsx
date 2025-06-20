import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PhaseItem } from "./PhaseItem";
import { 
  MapPin, 
  Calendar, 
  Users, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronRight, 
  Plus 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ProjectWithHierarchy, Phase } from "@/types/project-hierarchy";

// Enhanced projects data with phases
const initialProjects: ProjectWithHierarchy[] = [
  {
    id: 1,
    name: "Downtown Office Complex",
    client: "Metro Development Corp",
    progress: 78,
    status: "active",
    sites: 3,
    workers: 24,
    startDate: "2024-01-15",
    endDate: "2024-08-15",
    budget: 2400000,
    spent: 1872000,
    manager: "John Smith",
    phases: [
      {
        id: "phase-1",
        name: "Foundation & Structure",
        description: "Foundation work and structural framework",
        status: "completed",
        progress: 100,
        startDate: "2024-01-15",
        endDate: "2024-03-15",
        order: 0,
        tasks: [
          {
            id: "task-1",
            name: "Site preparation",
            status: "completed",
            assignee: "Construction Team A",
            order: 0,
          },
          {
            id: "task-2", 
            name: "Foundation pouring",
            status: "completed",
            assignee: "Foundation Specialists",
            order: 1,
          },
        ],
      },
      {
        id: "phase-2",
        name: "Interior & Finishing",
        description: "Interior work and final touches",
        status: "active",
        progress: 65,
        startDate: "2024-03-16",
        endDate: "2024-08-15",
        order: 1,
        tasks: [
          {
            id: "task-3",
            name: "Electrical installation",
            status: "in-progress",
            assignee: "Electrical Team",
            dueDate: "2024-07-01",
            order: 0,
          },
          {
            id: "task-4",
            name: "Interior design",
            status: "todo",
            assignee: "Design Team",
            dueDate: "2024-08-01",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Residential Tower Phase 2",
    client: "Urban Living Ltd",
    progress: 45,
    status: "active",
    sites: 1,
    workers: 18,
    startDate: "2024-03-01",
    endDate: "2024-12-20",
    budget: 5100000,
    spent: 2295000,
    manager: "Sarah Wilson",
    phases: [],
  },
  {
    id: 3,
    name: "Hospital Extension",
    client: "City Medical Center",
    progress: 92,
    status: "active",
    sites: 2,
    workers: 32,
    startDate: "2023-10-01",
    endDate: "2024-07-30",
    budget: 8700000,
    spent: 8004000,
    manager: "Mike Johnson",
    phases: [],
  },
  {
    id: 4,
    name: "Shopping Mall Renovation",
    client: "Retail Spaces Inc",
    progress: 15,
    status: "planned",
    sites: 1,
    workers: 8,
    startDate: "2024-07-01",
    endDate: "2025-02-28",
    budget: 3200000,
    spent: 480000,
    manager: "Lisa Chen",
    phases: [],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "planned":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "closed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const ProjectsList = () => {
  const [projects, setProjects] = useState(initialProjects);

  const toggleProjectExpansion = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, isExpanded: !project.isExpanded }
        : project
    ));
  };

  const handleAddPhase = (projectId: number) => {
    const newPhase: Phase = {
      id: `phase-${Date.now()}`,
      name: "New Phase",
      status: "planned",
      progress: 0,
      tasks: [],
      order: projects.find(p => p.id === projectId)?.phases.length || 0,
    };

    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, phases: [...project.phases, newPhase] }
        : project
    ));
  };

  const handleUpdatePhase = (projectId: number, updatedPhase: Phase) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? {
            ...project,
            phases: project.phases.map(phase =>
              phase.id === updatedPhase.id ? updatedPhase : phase
            ),
          }
        : project
    ));
  };

  const handleDeletePhase = (projectId: number, phaseId: string) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? {
            ...project,
            phases: project.phases.filter(phase => phase.id !== phaseId),
          }
        : project
    ));
  };

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Collapsible
          key={project.id}
          open={project.isExpanded}
          onOpenChange={() => toggleProjectExpansion(project.id)}
        >
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto">
                    <div className="flex items-center space-x-2">
                      {project.isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <div className="text-left">
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                          {project.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Client: {project.client}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Manager: {project.manager}
                        </p>
                      </div>
                    </div>
                  </Button>
                </CollapsibleTrigger>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{project.sites} sites</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{project.workers} workers</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(project.startDate).toLocaleDateString()} - {' '}
                      {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Timeline</p>
                    <div className="flex items-center mt-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(project.budget)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Spent</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(project.spent)}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {((project.spent / project.budget) * 100).toFixed(1)}% of budget
                    </div>
                  </div>
                </div>
              </div>

              <CollapsibleContent>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Project Phases
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddPhase(project.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Phase
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {project.phases
                      .sort((a, b) => a.order - b.order)
                      .map((phase) => (
                        <PhaseItem
                          key={phase.id}
                          phase={phase}
                          onUpdate={(updatedPhase) => handleUpdatePhase(project.id, updatedPhase)}
                          onDelete={(phaseId) => handleDeletePhase(project.id, phaseId)}
                        />
                      ))}
                  </div>
                  
                  {project.phases.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No phases created yet.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => handleAddPhase(project.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Phase
                      </Button>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
};
