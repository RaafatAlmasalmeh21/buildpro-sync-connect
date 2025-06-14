
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Shield, 
  FileText, 
  Plus,
  TrendingUp,
  Users,
  MapPin
} from "lucide-react";

export const MobileDashboard = () => {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this week",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Team Members",
      value: "48",
      change: "2 on leave",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Open Timesheets",
      value: "7",
      change: "Due today",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Safety Checks",
      value: "3",
      change: "Overdue",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    }
  ];

  const recentProjects = [
    {
      name: "Downtown Office Complex",
      location: "Metro City",
      progress: 78,
      status: "On Track",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Residential Tower Phase 2",
      location: "North District",
      progress: 45,
      status: "Behind",
      statusColor: "bg-red-100 text-red-800"
    },
    {
      name: "Hospital Extension",
      location: "Medical District",
      progress: 92,
      status: "Ahead",
      statusColor: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <MobileCard key={index} className="m-0">
              <MobileCardContent className="p-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {stat.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.change}
                </div>
              </MobileCardContent>
            </MobileCard>
          );
        })}
      </div>

      {/* Recent Projects */}
      <MobileCard>
        <MobileCardHeader>
          <MobileCardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Projects
          </MobileCardTitle>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {project.name}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {project.location}
                    </div>
                  </div>
                  <Badge className={project.statusColor}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-20 right-4 h-14 w-14 rounded-2xl shadow-lg bg-blue-600 hover:bg-blue-700 md:bottom-6"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};
