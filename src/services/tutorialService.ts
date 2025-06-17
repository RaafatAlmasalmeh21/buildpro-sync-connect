
import { TutorialVideo } from "@/types/tutorial";

class TutorialService {
  private videos: TutorialVideo[] | null = null;

  private loadVideos(): TutorialVideo[] {
    if (!this.videos) {
      this.videos = [
        {
          id: "dashboard-overview",
          title: "Dashboard Overview",
          description: "Overview of the main dashboard features.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: 30,
          tags: ["dashboard", "overview"],
          screen: "dashboard"
        },
        {
          id: "manage-workforce",
          title: "Manage Workforce",
          description: "Tutorial on managing your workforce.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: 45,
          tags: ["workforce", "management"],
          screen: "workforce"
        }
      ];
    }
    return this.videos!;
  }

  getAllVideos(): TutorialVideo[] {
    return this.loadVideos();
  }

  getVideoById(id: string): TutorialVideo | undefined {
    return this.loadVideos().find(video => video.id === id);
  }

  getVideoByContext(screen: string, contextId?: string): TutorialVideo | undefined {
    return this.loadVideos().find(video => {
      if (video.screen !== screen) {
        return false;
      }
      if (contextId) {
        return video.contextId === contextId;
      }
      return true;
    });
  }

  searchVideos(query: string): TutorialVideo[] {
    const lowercaseQuery = query.toLowerCase();
    return this.loadVideos().filter(video =>
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery) ||
      video.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
}

export const tutorialService = new TutorialService();
