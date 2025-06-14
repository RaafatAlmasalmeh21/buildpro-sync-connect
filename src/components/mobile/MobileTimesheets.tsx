
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, User, MapPin, Calendar } from "lucide-react";

const MobileTimesheets = () => {
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
    <div className="space-mobile-md pb-20">
      <div className="space-y-4">
        {timesheets.map((timesheet) => (
          <MobileCard key={timesheet.id} className="touch-manipulation">
            <MobileCardHeader>
              <div className="flex items-start justify-between">
                <div className="pr-2">
                  <MobileCardTitle className="text-mobile-lg">
                    {timesheet.worker}
                  </MobileCardTitle>
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {timesheet.task}
                  </p>
                </div>
                <Badge className={getStatusColor(timesheet.status)}>
                  {timesheet.status}
                </Badge>
              </div>
            </MobileCardHeader>
            <MobileCardContent>
              <div className="space-y-3">
                <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>{new Date(timesheet.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>{timesheet.checkIn} - {timesheet.checkOut}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{timesheet.totalHours} hours</span>
                  </div>
                  
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate text-right">{timesheet.site}</span>
                  </div>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-40"
        size="sm"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileTimesheets;
