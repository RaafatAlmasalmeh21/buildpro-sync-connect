
import { TutorialVideo } from "@/types/tutorial";

// Mock data for tutorial videos
const mockVideos: TutorialVideo[] = [
  {
    id: "1",
    title: "Getting Started with BuildPro",
    description: "Learn the basics of navigating and using BuildPro for construction project management.",
    videoUrl: "/videos/getting-started.mp4",
    duration: 180,
    tags: ["basics", "navigation", "getting-started"],
    screen: "dashboard"
  },
  {
    id: "2",
    title: "Creating Your First Project",
    description: "Step-by-step guide to creating and setting up your first construction project.",
    videoUrl: "/videos/first-project.mp4",
    duration: 240,
    tags: ["projects", "setup", "beginner"],
    screen: "projects"
  },
  {
    id: "3",
    title: "Managing Your Workforce",
    description: "How to add, manage, and assign workers to your construction projects.",
    videoUrl: "/videos/workforce-management.mp4",
    duration: 200,
    tags: ["workforce", "management", "workers"],
    screen: "workforce"
  },
  {
    id: "4",
    title: "Safety Protocols and Compliance",
    description: "Understanding safety requirements and maintaining compliance on construction sites.",
    videoUrl: "/videos/safety-protocols.mp4",
    duration: 300,
    tags: ["safety", "compliance", "protocols"],
    screen: "safety"
  },
  {
    id: "5",
    title: "Equipment Tracking",
    description: "Track and manage construction equipment across multiple job sites.",
    videoUrl: "/videos/equipment-tracking.mp4",
    duration: 150,
    tags: ["equipment", "tracking", "management"],
    screen: "equipment"
  }
];

class TutorialService {
  async getVideos(): Promise<TutorialVideo[]> {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tutorials`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return (await response.json()) as TutorialVideo[];
    } catch (error) {
      console.error("Failed to fetch tutorial videos", error);
      return mockVideos; // Return mock data as fallback
    }
  }

  getAllVideos(): TutorialVideo[] {
    return mockVideos;
  }

  getVideoById(id: string): TutorialVideo | undefined {
    return mockVideos.find(video => video.id === id);
  }

  getVideoByContext(screen: string, contextId?: string): TutorialVideo | undefined {
    return mockVideos.find(video => 
      video.screen === screen && 
      (contextId ? video.contextId === contextId : true)
    );
  }

  async searchVideos(query: string): Promise<TutorialVideo[]> {
    try {
      const videos = await this.getVideos();
      const lowercaseQuery = query.toLowerCase();
      return videos.filter(video =>
        video.title.toLowerCase().includes(lowercaseQuery) ||
        video.description.toLowerCase().includes(lowercaseQuery) ||
        video.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    } catch (error) {
      console.error("Failed to search tutorial videos", error);
      return [];
    }
  }
}

export const tutorialService = new TutorialService();
