
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, AlertTriangle, CheckCircle, User } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "check_in",
    user: "Mike Johnson",
    action: "clocked in at",
    target: "Downtown Office - Site A",
    time: "2 hours ago",
    icon: Clock,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "task_complete",
    user: "Sarah Wilson",
    action: "completed task",
    target: "Foundation Inspection",
    time: "4 hours ago", 
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "incident",
    user: "Tom Rodriguez",
    action: "reported incident at",
    target: "Hospital Extension - Site B",
    time: "6 hours ago",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "location",
    user: "Lisa Chen",
    action: "arrived at",
    target: "Residential Tower - Main Site",
    time: "8 hours ago",
    icon: MapPin,
    color: "text-purple-600",
  },
  {
    id: 5,
    type: "user",
    user: "David Kim",
    action: "joined project",
    target: "Downtown Office Complex",
    time: "1 day ago",
    icon: User,
    color: "text-indigo-600",
  },
];

export const RecentActivity = () => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700`}>
                  <Icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder-avatar-${activity.id}.jpg`} />
                      <AvatarFallback className="text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </span>{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
