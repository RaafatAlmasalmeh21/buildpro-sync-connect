
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Clock, ChevronDown, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Downtown Office Complex",
    client: "Metro Development Corp",
    progress: 78,
    status: "active",
    sites: 3,
    dueDate: "2024-08-15",
    budget: "$2.4M",
    description: "Modern office complex with sustainable design features",
    manager: "John Smith",
    startDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Residential Tower Phase 2",
    client: "Urban Living Ltd",
    progress: 45,
    status: "active", 
    sites: 1,
    dueDate: "2024-12-20",
    budget: "$5.1M",
    description: "High-rise residential building with luxury amenities",
    manager: "Sarah Wilson",
    startDate: "2024-03-01",
  },
  {
    id: 3,
    name: "Hospital Extension",
    client: "City Medical Center",
    progress: 92,
    status: "active",
    sites: 2,
    dueDate: "2024-07-30",
    budget: "$8.7M",
    description: "Emergency department expansion and renovation",
    manager: "Mike Johnson",
    startDate: "2023-10-01",
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

export const ProjectsOverview = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => toggleProject(project.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {expandedProject === project.id ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.client}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="mb-3 ml-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 ml-6">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{project.sites} sites</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{project.budget}</span>
                </div>
              </div>
            </div>

            {expandedProject === project.id && (
              <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="mt-3 space-y-3 ml-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Description
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Project Manager
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {project.manager}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Start Date
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(project.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
