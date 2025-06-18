
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GanttChart } from "./GanttChart";

// Sample projects data for the Gantt chart
const sampleProjects = [
  {
    id: 1,
    name: "Downtown Office Complex",
    client: "Metro Development Corp",
    progress: 78,
    status: "active" as const,
    startDate: "2024-01-15",
    endDate: "2024-08-15",
    budget: "$2.4M",
  },
  {
    id: 2,
    name: "Residential Tower Phase 2",
    client: "Urban Living Ltd",
    progress: 45,
    status: "active" as const,
    startDate: "2024-03-01",
    endDate: "2024-12-20",
    budget: "$5.1M",
  },
  {
    id: 3,
    name: "Hospital Extension",
    client: "City Medical Center",
    progress: 92,
    status: "active" as const,
    startDate: "2023-09-01",
    endDate: "2024-07-30",
    budget: "$8.7M",
  },
  {
    id: 4,
    name: "Shopping Mall Renovation",
    client: "Retail Group Inc",
    progress: 25,
    status: "planned" as const,
    startDate: "2024-06-01",
    endDate: "2024-11-30",
    budget: "$3.2M",
  },
  {
    id: 5,
    name: "Bridge Maintenance",
    client: "City Infrastructure",
    progress: 100,
    status: "closed" as const,
    startDate: "2023-11-01",
    endDate: "2024-02-28",
    budget: "$1.8M",
  },
];

export const ProjectsGantt = () => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Gantt Chart View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <GanttChart projects={sampleProjects} />
      </CardContent>
    </Card>
  );
};
