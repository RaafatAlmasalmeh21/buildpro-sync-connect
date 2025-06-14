
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield, AlertTriangle, FileText, Calendar } from "lucide-react";

const Safety = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Safety Centre
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage safety incidents, training, and compliance.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Training
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Incidents */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Incidents
                </h2>
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <Card key={incident.id} className="bg-white dark:bg-gray-800">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                            {incident.title}
                          </CardTitle>
                          <div className="flex space-x-2">
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity}
                            </Badge>
                            <Badge className={getStatusColor(incident.status)}>
                              {incident.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Shield className="h-4 w-4 mr-2" />
                            <span>{incident.site}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            <span>Reported by {incident.reportedBy}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(incident.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Training Sessions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Upcoming Training
                </h2>
                <div className="space-y-4">
                  {trainingSessions.map((session) => (
                    <Card key={session.id} className="bg-white dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                          {session.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(session.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>{session.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Shield className="h-4 w-4 mr-2" />
                            <span>{session.attendees} attendees</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Safety;
