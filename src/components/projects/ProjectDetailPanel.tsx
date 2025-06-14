
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  Target,
  AlertTriangle,
  X
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  status: "planned" | "active" | "closed";
  sites: number;
  startDate: string;
  endDate: string;
  budget: string;
  teamSize: number;
  location: string;
}

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

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

export const ProjectDetailPanel = ({ project, onClose }: ProjectDetailPanelProps) => {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 shadow-xl border-l border-gray-200 dark:border-gray-700 z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {project.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {project.client}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Status and Progress */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {project.progress}%
              </span>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Project Details */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white">Project Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Location</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {project.location}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Start Date</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>End Date</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Budget</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {project.budget}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-2" />
                <span>Team Size</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {project.teamSize} members
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Target className="h-4 w-4 mr-2" />
                <span>Sites</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {project.sites} {project.sites === 1 ? 'site' : 'sites'}
              </span>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Recent Activity */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Task completed: Foundation work</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">New team member assigned</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Schedule updated</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button className="w-full">
            View Full Details
          </Button>
          <Button variant="outline" className="w-full">
            Edit Project
          </Button>
        </div>
      </div>
    </div>
  );
};
