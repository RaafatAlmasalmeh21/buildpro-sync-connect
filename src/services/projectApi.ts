import { Project } from '@/types/project';
import { projects as mockProjects } from '@/data/projects';

let projects: Project[] = [...mockProjects];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function listProjects(): Promise<Project[]> {
  await delay(100);
  return projects;
}

export async function createProject(project: Project): Promise<Project> {
  await delay(100);
  projects.push(project);
  return project;
}

export async function updateProject(id: number, data: Partial<Project>): Promise<Project> {
  await delay(100);
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Project not found');
  projects[index] = { ...projects[index], ...data };
  return projects[index];
}
