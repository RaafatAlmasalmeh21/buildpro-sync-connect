
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, Calendar } from "lucide-react";
import { useState } from "react";

const columns = [
  { id: "planned", title: "Planned", color: "bg-blue-100 dark:bg-blue-900" },
  { id: "active", title: "Active", color: "bg-green-100 dark:bg-green-900" },
  { id: "review", title: "Under Review", color: "bg-yellow-100 dark:bg-yellow-900" },
  { id: "closed", title: "Completed", color: "bg-gray-100 dark:bg-gray-900" },
];

const initialProjects = [
  {
    id: 1,
    name: "Downtown Office Complex",
    client: "Metro Development Corp",
    progress: 78,
    status: "active",
    sites: 3,
    workers: 24,
    endDate: "2024-08-15",
  },
  {
    id: 2,
    name: "Residential Tower Phase 2",
    client: "Urban Living Ltd",
    progress: 45,
    status: "active",
    sites: 1,
    workers: 18,
    endDate: "2024-12-20",
  },
  {
    id: 3,
    name: "Hospital Extension",
    client: "City Medical Center",
    progress: 92,
    status: "review",
    sites: 2,
    workers: 32,
    endDate: "2024-07-30",
  },
  {
    id: 4,
    name: "Shopping Mall Renovation",
    client: "Retail Spaces Inc",
    progress: 15,
    status: "planned",
    sites: 1,
    workers: 8,
    endDate: "2025-02-28",
  },
  {
    id: 5,
    name: "School Expansion",
    client: "Education Board",
    progress: 100,
    status: "closed",
    sites: 1,
    workers: 0,
    endDate: "2024-05-15",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "planned":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "review":  
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "closed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const ProjectsKanban = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [draggedProject, setDraggedProject] = useState<number | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseDown = (projectId: number) => {
    const timer = setTimeout(() => {
      setDraggedProject(projectId);
    }, 500); // 500ms long press
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, projectId: number) => {
    setDraggedProject(projectId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    
    if (draggedProject !== null) {
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === draggedProject 
            ? { ...project, status: newStatus }
            : project
        )
      );
      setDraggedProject(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedProject(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div 
          key={column.id} 
          className="space-y-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className={`p-3 rounded-lg ${column.color}`}>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {column.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {projects.filter(p => p.status === column.id).length} projects
            </p>
          </div>
          
          <div className="space-y-3 min-h-[200px]">
            {projects
              .filter(project => project.status === column.id)
              .map(project => (
                <Card 
                  key={project.id} 
                  className={`bg-white dark:bg-gray-800 cursor-pointer hover:shadow-md transition-all duration-200 select-none ${
                    draggedProject === project.id ? 'opacity-50 scale-105 shadow-lg' : ''
                  }`}
                  draggable={draggedProject === project.id}
                  onDragStart={(e) => handleDragStart(e, project.id)}
                  onDragEnd={handleDragEnd}
                  onMouseDown={() => handleMouseDown(project.id)}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={() => handleMouseDown(project.id)}
                  onTouchEnd={handleMouseUp}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </CardTitle>
                      <Badge className={getStatusColor(project.status)} variant="secondary">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {project.client}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {project.status !== 'closed' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-1" />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{project.sites} sites</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{project.workers} workers</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
