
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AssignWorkersDialog } from "./AssignWorkersDialog";
import { Project, AssignedWorker } from "@/types/project";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  Target,
  AlertTriangle,
  X,
  UserPlus
} from "lucide-react";

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
  onProjectUpdate: (project: Project) => void;
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

export const ProjectDetailPanel = ({ project: initialProject, onClose, onProjectUpdate }: ProjectDetailPanelProps) => {
  const [project, setProject] = useState(initialProject);
  const [showAssignWorkers, setShowAssignWorkers] = useState(false);
  const navigate = useNavigate();

  const handleAssignWorkers = (workers: AssignedWorker[]) => {
    const updatedProject = {
      ...project,
      assignedWorkers: workers,
      teamSize: workers.length
    };
    setProject(updatedProject);
    onProjectUpdate(updatedProject);
  };

  const handleViewFullDetails = () => {
    navigate(`/projects/${project.id}`);
    onClose();
  };

  return (
    <>
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

          {/* Assigned Workers */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">Assigned Workers</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAssignWorkers(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
            
            {project.assignedWorkers && project.assignedWorkers.length > 0 ? (
              <div className="space-y-2">
                {project.assignedWorkers.map((worker) => (
                  <div key={worker.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <Avatar className="h-8 w-8">
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {worker.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {worker.role}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(worker.assignedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  No workers assigned yet
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAssignWorkers(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign Workers
                </Button>
              </div>
            )}
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
            <Button className="w-full" onClick={handleViewFullDetails}>
              View Full Details
            </Button>
            <Button variant="outline" className="w-full">
              Edit Project
            </Button>
          </div>
        </div>
      </div>

      <AssignWorkersDialog
        isOpen={showAssignWorkers}
        onClose={() => setShowAssignWorkers(false)}
        onSave={handleAssignWorkers}
        currentlyAssigned={project.assignedWorkers || []}
        projectName={project.name}
      />
    </>
  );
};
