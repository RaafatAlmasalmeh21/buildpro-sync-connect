
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, AlertTriangle, FileText, Calendar } from "lucide-react";

const MobileSafety = () => {
  const incidents = [
    {
      id: 1,
      title: "Minor Cut on Hand",
      site: "Downtown Office Complex",
      reportedBy: "John Smith",
      date: "2024-06-13",
      severity: "low",
      status: "resolved",
    },
    {
      id: 2,
      title: "Equipment Malfunction",
      site: "Residential Tower",
      reportedBy: "Sarah Wilson",
      date: "2024-06-12",
      severity: "medium",
      status: "investigating",
    },
    {
      id: 3,
      title: "Fall from Scaffold",
      site: "Hospital Extension",
      reportedBy: "Mike Johnson",
      date: "2024-06-10",
      severity: "high",
      status: "resolved",
    },
  ];

  const trainingSessions = [
    {
      id: 1,
      title: "Safety Harness Usage",
      date: "2024-06-15",
      duration: "2 hours",
      attendees: 12,
    },
    {
      id: 2,
      title: "Chemical Handling",
      date: "2024-06-18",
      duration: "3 hours",
      attendees: 8,
    },
    {
      id: 3,
      title: "Emergency Procedures",
      date: "2024-06-20",
      duration: "1.5 hours",
      attendees: 24,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "critical":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "investigating":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-mobile-md pb-20">
      {/* Recent Incidents Section */}
      <div className="mb-6">
        <h2 className="text-mobile-xl font-semibold text-gray-900 dark:text-white mb-4 px-1">
          Recent Incidents
        </h2>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <MobileCard key={incident.id} className="touch-manipulation">
              <MobileCardHeader>
                <div className="flex items-start justify-between">
                  <MobileCardTitle className="text-mobile-lg pr-2">
                    {incident.title}
                  </MobileCardTitle>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                </div>
              </MobileCardHeader>
              <MobileCardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <Shield className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span className="truncate">{incident.site}</span>
                  </div>
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <AlertTriangle className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Reported by {incident.reportedBy}</span>
                  </div>
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{new Date(incident.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          ))}
        </div>
      </div>

      {/* Training Sessions Section */}
      <div>
        <h2 className="text-mobile-xl font-semibold text-gray-900 dark:text-white mb-4 px-1">
          Upcoming Training
        </h2>
        <div className="space-y-4">
          {trainingSessions.map((session) => (
            <MobileCard key={session.id} className="touch-manipulation">
              <MobileCardHeader>
                <MobileCardTitle className="text-mobile-lg">
                  {session.title}
                </MobileCardTitle>
              </MobileCardHeader>
              <MobileCardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{session.duration}</span>
                  </div>
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <Shield className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{session.attendees} attendees</span>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          ))}
        </div>
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

export default MobileSafety;
