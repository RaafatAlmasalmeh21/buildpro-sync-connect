
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = [
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
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card key={project.id} className="bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
