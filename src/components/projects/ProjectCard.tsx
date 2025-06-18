
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Users } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
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

export const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{project.location}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-1" />
            <span>{project.teamSize} members</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{project.budget}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(project)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
