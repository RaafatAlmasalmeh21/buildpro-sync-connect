
import { TutorialVideo } from "@/types/tutorial";

// Mock video data - in a real app, this would come from an API
const mockVideos: TutorialVideo[] = [
  {
    id: "dashboard-overview",
    title: "Dashboard Overview",
    description: "Learn how to navigate the main dashboard and understand key metrics",
    videoUrl: "/videos/dashboard-overview.mp4",
    duration: 45,
    tags: ["dashboard", "overview", "basics"],
    screen: "dashboard"
  },
  {
    id: "create-project",
    title: "Creating a New Project",
    description: "Step-by-step guide to setting up your first construction project",
    videoUrl: "/videos/create-project.mp4", 
    duration: 60,
    tags: ["projects", "create", "setup"],
    screen: "projects",
    contextId: "new-project"
  },
  {
    id: "manage-workforce",
    title: "Managing Your Workforce",
    description: "How to add, assign, and track your construction team members",
    videoUrl: "/videos/manage-workforce.mp4",
    duration: 55,
    tags: ["workforce", "team", "management"],
    screen: "workforce"
  },
  {
    id: "site-management",
    title: "Site Management Basics",
    description: "Setting up and monitoring construction sites effectively",
    videoUrl: "/videos/site-management.mp4",
    duration: 50,
    tags: ["sites", "management", "monitoring"],
    screen: "sites"
  },
  {
    id: "equipment-tracking",
    title: "Equipment Tracking",
    description: "How to track and maintain your construction equipment",
    videoUrl: "/videos/equipment-tracking.mp4",
    duration: 40,
    tags: ["equipment", "tracking", "maintenance"],
    screen: "equipment"
  },
  {
    id: "timesheet-entry",
    title: "Timesheet Entry",
    description: "Quick guide to entering and approving worker timesheets",
    videoUrl: "/videos/timesheet-entry.mp4",
    duration: 35,
    tags: ["timesheets", "time tracking", "approval"],
    screen: "timesheets"
  },
  {
    id: "safety-protocols",
    title: "Safety Protocols",
    description: "Understanding and implementing safety measures on site",
    videoUrl: "/videos/safety-protocols.mp4",
    duration: 50,
    tags: ["safety", "protocols", "compliance"],
    screen: "safety"
  },
  {
    id: "generate-reports",
    title: "Generating Reports",
    description: "How to create and customize project reports",
    videoUrl: "/videos/generate-reports.mp4",
    duration: 45,
    tags: ["reports", "analytics", "export"],
    screen: "reports"
  },
  {
    id: "document-management",
    title: "Document Management",
    description: "Organizing and sharing project documents securely",
    videoUrl: "/videos/document-management.mp4",
    duration: 40,
    tags: ["documents", "sharing", "organization"],
    screen: "documents"
  },
  {
    id: "settings-config",
    title: "Settings Configuration",
    description: "Customizing your workspace and user preferences",
    videoUrl: "/videos/settings-config.mp4",
    duration: 30,
    tags: ["settings", "configuration", "preferences"],
    screen: "settings"
  }
];

class TutorialService {
  getAllVideos(): TutorialVideo[] {
    return mockVideos;
  }

  getVideoById(id: string): TutorialVideo | undefined {
    return mockVideos.find(video => video.id === id);
  }

  getVideosByScreen(screen: string): TutorialVideo[] {
    return mockVideos.filter(video => video.screen === screen);
  }

  getVideoByContext(screen: string, contextId?: string): TutorialVideo | undefined {
    return mockVideos.find(video => 
      video.screen === screen && 
      (contextId ? video.contextId === contextId : !video.contextId)
    );
  }

  searchVideos(query: string): TutorialVideo[] {
    const lowercaseQuery = query.toLowerCase();
    return mockVideos.filter(video =>
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery) ||
      video.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
}

export const tutorialService = new TutorialService();
