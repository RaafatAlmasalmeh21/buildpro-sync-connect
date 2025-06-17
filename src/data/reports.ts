import { FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";

export const reports = [
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
