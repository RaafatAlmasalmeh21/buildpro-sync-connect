
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, differenceInDays, addDays, startOfMonth, endOfMonth } from "date-fns";

interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  status: "active" | "planned" | "closed";
  startDate: string;
  endDate: string;
  budget: string;
}

interface GanttChartProps {
  projects: Project[];
}

export const GanttChart = ({ projects }: GanttChartProps) => {
  const chartData = useMemo(() => {
    if (!projects.length) return { projects: [], timelineStart: new Date(), timelineEnd: new Date(), totalDays: 0 };

    // Find the earliest start date and latest end date
    const startDates = projects.map(p => parseISO(p.startDate));
    const endDates = projects.map(p => parseISO(p.endDate));
    
    const timelineStart = startOfMonth(new Date(Math.min(...startDates.map(d => d.getTime()))));
    const timelineEnd = endOfMonth(new Date(Math.max(...endDates.map(d => d.getTime()))));
    const totalDays = differenceInDays(timelineEnd, timelineStart);

    const processedProjects = projects.map(project => {
      const start = parseISO(project.startDate);
      const end = parseISO(project.endDate);
      const duration = differenceInDays(end, start);
      const startOffset = differenceInDays(start, timelineStart);
      const progressWidth = (duration * project.progress) / 100;

      return {
        ...project,
        start,
        end,
        duration,
        startOffset,
        progressWidth,
      };
    });

    return { projects: processedProjects, timelineStart, timelineEnd, totalDays };
  }, [projects]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "planned":
        return "bg-blue-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-700 bg-green-100";
      case "planned":
        return "text-blue-700 bg-blue-100";
      case "closed":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  // Generate month headers
  const monthHeaders = useMemo(() => {
    const months = [];
    let current = new Date(chartData.timelineStart);
    
    while (current <= chartData.timelineEnd) {
      const daysInView = Math.min(
        differenceInDays(endOfMonth(current), current) + 1,
        differenceInDays(chartData.timelineEnd, current) + 1
      );
      
      months.push({
        date: new Date(current),
        daysInView,
        widthPercent: (daysInView / chartData.totalDays) * 100,
      });
      
      current = addDays(endOfMonth(current), 1);
    }
    
    return months;
  }, [chartData]);

  if (!projects.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects to display in Gantt view
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Project</h3>
          </div>
          <div className="col-span-8">
            <div className="flex border-b border-gray-200 dark:border-gray-600">
              {monthHeaders.map((month, index) => (
                <div
                  key={index}
                  className="text-center py-2 border-r border-gray-200 dark:border-gray-600 last:border-r-0"
                  style={{ width: `${month.widthPercent}%` }}
                >
                  <div className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    {format(month.date, "MMM yyyy")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Rows */}
      <div className="space-y-2">
        {chartData.projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Project Info */}
              <div className="col-span-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {project.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {project.client}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusTextColor(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Gantt Bar */}
              <div className="col-span-8">
                <div className="relative h-8 bg-gray-100 dark:bg-gray-700 rounded">
                  {/* Project Duration Bar */}
                  <div
                    className={`absolute top-0 h-full ${getStatusColor(project.status)} opacity-30 rounded`}
                    style={{
                      left: `${(project.startOffset / chartData.totalDays) * 100}%`,
                      width: `${(project.duration / chartData.totalDays) * 100}%`,
                    }}
                  />
                  
                  {/* Progress Bar */}
                  <div
                    className={`absolute top-0 h-full ${getStatusColor(project.status)} rounded`}
                    style={{
                      left: `${(project.startOffset / chartData.totalDays) * 100}%`,
                      width: `${(project.progressWidth / chartData.totalDays) * 100}%`,
                    }}
                  />
                  
                  {/* Project Label */}
                  <div
                    className="absolute top-0 h-full flex items-center px-2"
                    style={{
                      left: `${(project.startOffset / chartData.totalDays) * 100}%`,
                      width: `${(project.duration / chartData.totalDays) * 100}%`,
                    }}
                  >
                    <span className="text-xs font-medium text-white truncate">
                      {format(project.start, "MMM d")} - {format(project.end, "MMM d")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
