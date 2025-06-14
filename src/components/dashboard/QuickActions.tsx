
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, MapPin, Calendar, FileText, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const actions = [
  {
    title: "New Project",
    description: "Create a new construction project",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
    action: () => {
      toast({
        title: "New Project",
        description: "Opening new project form...",
      });
    },
  },
  {
    title: "Add Site",
    description: "Add a new site to existing project",
    icon: MapPin,
    color: "bg-green-500 hover:bg-green-600",
    action: () => {
      toast({
        title: "Add Site",
        description: "Opening site creation form...",
      });
    },
  },
  {
    title: "Schedule Meeting",
    description: "Schedule project meeting",
    icon: Calendar,
    color: "bg-purple-500 hover:bg-purple-600",
    action: () => {
      toast({
        title: "Schedule Meeting",
        description: "Opening meeting scheduler...",
      });
    },
  },
  {
    title: "Manage Team",
    description: "Add or manage workforce",
    icon: Users,
    color: "bg-orange-500 hover:bg-orange-600",
    action: () => {
      toast({
        title: "Manage Team",
        description: "Opening team management...",
      });
    },
  },
  {
    title: "Generate Report",
    description: "Create project progress report",
    icon: FileText,
    color: "bg-indigo-500 hover:bg-indigo-600",
    action: () => {
      toast({
        title: "Generate Report",
        description: "Starting report generation...",
      });
    },
  },
  {
    title: "System Settings",
    description: "Configure system preferences",
    icon: Settings,
    color: "bg-gray-500 hover:bg-gray-600",
    action: () => {
      toast({
        title: "System Settings",
        description: "Opening settings panel...",
      });
    },
  },
];

export const QuickActions = () => {
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
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
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
