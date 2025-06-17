
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

  async getVideos(): Promise<TutorialVideo[]> {
    return this.loadVideos();
  }

  async uploadVideo(file: File, onProgress?: (percent: number) => void): Promise<TutorialVideo> {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('video', file);

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            const video: TutorialVideo = {
              id: res.id,
              title: file.name,
              description: 'Uploaded video',
              videoUrl: res.url,
              duration: 0,
              tags: ['uploaded'],
              screen: 'uploads'
            };
            this.videos = [...this.loadVideos(), video];
            resolve(video);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error('Upload failed'));
        }
      };
      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.open('POST', '/api/upload');
      xhr.send(form);
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
