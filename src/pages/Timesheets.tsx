
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, User, MapPin, Calendar } from "lucide-react";

const Timesheets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const timesheets = [
    {
      id: 1,
      worker: "John Smith",
      date: "2024-06-14",
      checkIn: "07:30",
      checkOut: "16:30",
      totalHours: "8.0",
      site: "Downtown Office Complex",
      task: "Foundation Work",
      status: "approved",
    },
    {
      id: 2,
      worker: "Sarah Wilson",
      date: "2024-06-14",
      checkIn: "08:00",
      checkOut: "17:00",
      totalHours: "8.0",
      site: "Residential Tower",
      task: "Steel Frame Installation",
      status: "pending",
    },
    {
      id: 3,
      worker: "Mike Johnson",
      date: "2024-06-14",
      checkIn: "07:45",
      checkOut: "16:45",
      totalHours: "8.0",
      site: "Hospital Extension",
      task: "Electrical Wiring",
      status: "approved",
    },
    {
      id: 4,
      worker: "Lisa Chen",
      date: "2024-06-13",
      checkIn: "09:00",
      checkOut: "15:00",
      totalHours: "6.0",
      site: "Shopping Mall",
      task: "Safety Inspection",
      status: "rejected",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Timesheets
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track and manage worker time logs and attendance.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Manual Entry
              </Button>
            </div>

            <div className="space-y-6">
              {timesheets.map((timesheet) => (
                <Card key={timesheet.id} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                          {timesheet.worker}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {timesheet.task}
                        </p>
                      </div>
                      <Badge className={getStatusColor(timesheet.status)}>
                        {timesheet.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(timesheet.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{timesheet.checkIn} - {timesheet.checkOut}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <User className="h-4 w-4 mr-2" />
                        <span>{timesheet.totalHours} hours</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{timesheet.site}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Timesheets;
