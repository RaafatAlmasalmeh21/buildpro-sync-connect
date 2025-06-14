
import React, { createContext, useContext } from "react";
import { useTutorial } from "@/hooks/useTutorial";
import { VideoPanel } from "./VideoPanel";
import { VideoLibrary } from "./VideoLibrary";

interface TutorialContextType {
  openVideo: (videoId: string) => void;
  openVideoByContext: (screen: string, contextId?: string) => void;
  openLibrary: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorialContext = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorialContext must be used within a TutorialProvider");
  }
  return context;
};

interface TutorialProviderProps {
  children: React.ReactNode;
}

export const TutorialProvider = ({ children }: TutorialProviderProps) => {
  const {
    currentVideo,
    isVideoOpen,
    isLibraryOpen,
    openVideo,
    openVideoByContext,
    closeVideo,
    openLibrary,
    closeLibrary,
    selectVideoFromLibrary
  } = useTutorial();

  return (
    <TutorialContext.Provider value={{
      openVideo,
      openVideoByContext,
      openLibrary
    }}>
      {children}
      <VideoPanel
        video={currentVideo}
        isOpen={isVideoOpen}
        onClose={closeVideo}
      />
      <VideoLibrary
        isOpen={isLibraryOpen}
        onClose={closeLibrary}
        onVideoSelect={selectVideoFromLibrary}
      />
    </TutorialContext.Provider>
  );
};
