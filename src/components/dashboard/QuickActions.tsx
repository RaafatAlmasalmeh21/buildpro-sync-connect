
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, MapPin, Calendar, FileText, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Project",
      description: "Create a new construction project",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        navigate("/projects");
        toast({
          title: "New Project",
          description: "Redirected to projects page to create a new project",
        });
      },
    },
    {
      title: "Add Site",
      description: "Add a new site to existing project",
      icon: MapPin,
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        navigate("/sites");
        toast({
          title: "Add Site",
          description: "Redirected to sites page to add a new site",
        });
      },
    },
    {
      title: "Schedule Meeting",
      description: "Schedule project meeting",
      icon: Calendar,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => {
        const meetingTime = new Date();
        meetingTime.setHours(meetingTime.getHours() + 24); // Tomorrow at same time
        
        toast({
          title: "Meeting Scheduled",
          description: `Project meeting scheduled for ${meetingTime.toLocaleDateString()} at ${meetingTime.toLocaleTimeString()}`,
        });
      },
    },
    {
      title: "Manage Team",
      description: "Add or manage workforce",
      icon: Users,
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => {
        navigate("/workforce");
        toast({
          title: "Team Management",
          description: "Redirected to workforce management page",
        });
      },
    },
    {
      title: "Generate Report",
      description: "Create project progress report",
      icon: FileText,
      color: "bg-indigo-500 hover:bg-indigo-600",
      action: () => {
        navigate("/reports");
        // Simulate report generation
        setTimeout(() => {
          toast({
            title: "Report Generated",
            description: "Project progress report has been generated successfully",
          });
        }, 1500);
        
        toast({
          title: "Generating Report",
          description: "Please wait while we generate your report...",
        });
      },
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
      action: () => {
        navigate("/settings");
        toast({
          title: "System Settings",
          description: "Redirected to settings page",
        });
      },
    },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color} text-white transition-transform hover:scale-110`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm text-gray-900 dark:text-white">
                    {action.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export { QuickActions };
