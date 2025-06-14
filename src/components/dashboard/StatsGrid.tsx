
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, MapPin, Clock, Calendar } from "lucide-react";

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2.5%",
    trend: "up",
    icon: Calendar,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Active Sites",
    value: "28",
    change: "+12%",
    trend: "up", 
    icon: MapPin,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Workforce",
    value: "156",
    change: "-3%",
    trend: "down",
    icon: Users,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Hours This Week",
    value: "1,248",
    change: "+8.2%", 
    trend: "up",
    icon: Clock,
    color: "text-orange-600 dark:text-orange-400",
  },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={stat.title} className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                <TrendIcon 
                  className={`h-3 w-3 mr-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
