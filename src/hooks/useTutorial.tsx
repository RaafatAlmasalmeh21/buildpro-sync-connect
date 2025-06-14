
import { useState, useCallback } from "react";
import { TutorialVideo } from "@/types/tutorial";
import { tutorialService } from "@/services/tutorialService";

export const useTutorial = () => {
  const [currentVideo, setCurrentVideo] = useState<TutorialVideo | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const openVideo = useCallback((videoId: string) => {
    const video = tutorialService.getVideoById(videoId);
    if (video) {
      setCurrentVideo(video);
      setIsVideoOpen(true);
    }
  }, []);

  const openVideoByContext = useCallback((screen: string, contextId?: string) => {
    const video = tutorialService.getVideoByContext(screen, contextId);
    if (video) {
      setCurrentVideo(video);
      setIsVideoOpen(true);
    }
  }, []);

  const closeVideo = useCallback(() => {
    setIsVideoOpen(false);
    setCurrentVideo(null);
  }, []);

  const openLibrary = useCallback(() => {
    setIsLibraryOpen(true);
  }, []);

  const closeLibrary = useCallback(() => {
    setIsLibraryOpen(false);
  }, []);

  const selectVideoFromLibrary = useCallback((video: TutorialVideo) => {
    setCurrentVideo(video);
    setIsVideoOpen(true);
    setIsLibraryOpen(false);
  }, []);

  return {
    currentVideo,
    isVideoOpen,
    isLibraryOpen,
    openVideo,
    openVideoByContext,
    closeVideo,
    openLibrary,
    closeLibrary,
    selectVideoFromLibrary
  };
};
