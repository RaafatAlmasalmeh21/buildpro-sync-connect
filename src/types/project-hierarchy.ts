
export interface Task {
  id: string;
  name: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  assignee?: string;
  dueDate?: string;
  order: number;
}

export interface Phase {
  id: string;
  name: string;
  description?: string;
  status: "planned" | "active" | "completed";
  startDate?: string;
  endDate?: string;
  progress: number;
  tasks: Task[];
  order: number;
}

export interface ProjectWithHierarchy {
  id: number;
  name: string;
  client: string;
  progress: number;
  status: "active" | "planned" | "closed";
  sites: number;
  workers: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: string;
  phases: Phase[];
  isExpanded?: boolean;
}
