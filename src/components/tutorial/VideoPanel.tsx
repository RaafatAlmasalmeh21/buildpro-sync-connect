
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { TutorialVideo } from "@/types/tutorial";

interface VideoPanelProps {
  video: TutorialVideo | null;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const VideoPanel = ({ video, isOpen, onClose, className }: VideoPanelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  useEffect(() => {
    if (videoRef.current && video) {
      videoRef.current.load();
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [video]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  if (!isOpen || !video) return null;

  return (
    <Card className={cn(
      "fixed bottom-4 right-4 w-80 bg-white shadow-2xl border-2 z-50",
      "md:bottom-6 md:right-6 md:w-96",
      className
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">{video.title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative bg-black rounded-lg overflow-hidden mb-3">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-black bg-opacity-50 rounded px-2 py-1">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white p-1 h-6">
                  {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={restart} className="text-white p-1 h-6">
                  <RotateCcw className="h-3 w-3" />
                </Button>
                <div className="flex-1 text-xs text-white">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-gray-600">{video.description}</p>
      </div>
    </Card>
  );
};
