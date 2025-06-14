
export interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in seconds
  tags: string[];
  screen: string; // which screen this video relates to
  contextId?: string; // specific context within the screen
}

export interface VideoContext {
  screenId: string;
  contextId?: string;
}
