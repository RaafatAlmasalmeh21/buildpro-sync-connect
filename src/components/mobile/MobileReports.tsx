
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";

const MobileReports = () => {
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
  ];

  return (
    <div className="space-mobile-md pb-20">
      <div className="space-y-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <MobileCard key={report.id} className="touch-manipulation">
              <MobileCardHeader>
                <div className="flex items-start space-x-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <MobileCardTitle className="text-mobile-lg">
                      {report.name}
                    </MobileCardTitle>
                    <p className="text-mobile-xs text-gray-500 dark:text-gray-400 mt-1">
                      {report.type} • Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </MobileCardHeader>
              <MobileCardContent>
                <p className="text-mobile-sm text-gray-600 dark:text-gray-400 mb-4 leading-5">
                  {report.description}
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 min-h-[44px]">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="min-h-[44px]">
                    Generate New
                  </Button>
                </div>
              </MobileCardContent>
            </MobileCard>
          );
        })}
      </div>
    </div>
  );
};

export default MobileReports;
