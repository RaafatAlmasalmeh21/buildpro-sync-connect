
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";

const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const reports = [
    {
      id: 1,
      name: "Project Progress Summary",
      description: "Overview of all active projects and their completion status",
      type: "PDF",
      lastGenerated: "2024-06-14",
      icon: BarChart3,
    },
    {
      id: 2,
      name: "Workforce Timesheet Report",
      description: "Detailed breakdown of worker hours and attendance",
      type: "Excel",
      lastGenerated: "2024-06-13",
      icon: FileText,
    },
    {
      id: 3,
      name: "Equipment Utilization",
      description: "Usage statistics and maintenance schedules for all equipment",
      type: "PDF",
      lastGenerated: "2024-06-12",
      icon: PieChart,
    },
    {
      id: 4,
      name: "Safety Incidents Report",
      description: "Comprehensive safety incident tracking and analysis",
      type: "PDF",
      lastGenerated: "2024-06-11",
      icon: TrendingUp,
    },
    {
      id: 5,
      name: "Financial Performance",
      description: "Budget vs actual costs analysis across all projects",
      type: "Excel",
      lastGenerated: "2024-06-10",
      icon: BarChart3,
    },
    {
      id: 6,
      name: "Site Activity Log",
      description: "Daily activity reports from all construction sites",
      type: "CSV",
      lastGenerated: "2024-06-14",
      icon: FileText,
    },
  ];

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
                  Reports
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Generate and download comprehensive project reports.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="h-4 w-4 mr-2" />
                Custom Report
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {reports.map((report) => {
                const Icon = report.icon;
                return (
                  <Card key={report.id} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                              {report.name}
                            </CardTitle>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {report.type} • Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {report.description}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          Generate New
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
