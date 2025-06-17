import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gantt, Task, EventOption } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { projectsWithHierarchy } from "@/data/projectsHierarchy";
import { updatePhaseDates } from "@/services/projectService";

export const ProjectsGantt = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const project = projectsWithHierarchy[0];

  useEffect(() => {
    const mapped: Task[] = [];
    project.phases.forEach((phase) => {
      if (phase.startDate && phase.endDate) {
        mapped.push({
          start: new Date(phase.startDate),
          end: new Date(phase.endDate),
          name: phase.name,
          id: phase.id,
          type: "project",
          progress: phase.progress,
          isDisabled: false,
        });
      }
      phase.tasks.forEach((task) => {
        mapped.push({
          start: phase.startDate ? new Date(phase.startDate) : new Date(),
          end: phase.endDate ? new Date(phase.endDate) : new Date(),
          name: task.name,
          id: task.id,
          type: "task",
          progress:
            task.status === "completed" ? 100 : task.status === "in-progress" ? 50 : 0,
          project: phase.id,
        });
      });
    });
    setTasks(mapped);
  }, [project]);

  const handleChange = (t: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === t.id ? t : task)));
    if (!t.project) {
      updatePhaseDates(project.id, t.id, t.start, t.end);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Gantt Chart View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Gantt
            tasks={tasks}
            onDateChange={handleChange as EventOption<Task>}
          />
        </div>
      </CardContent>
    </Card>
  );
};
