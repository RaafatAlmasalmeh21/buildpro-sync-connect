
import { TutorialVideo } from "@/types/tutorial";

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
      return [];
    }
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
