
export interface AssignedWorker {
  id: number;
  name: string;
  role: string;
  assignedDate: string;
}

export interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  status: "planned" | "active" | "closed";
  sites: number;
  startDate: string;
  endDate: string;
  budget: string;
  teamSize: number;
  location: string;
  assignedWorkers: AssignedWorker[];
}
