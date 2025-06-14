
import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Play, Clock } from "lucide-react";
import { TutorialVideo } from "@/types/tutorial";
import { tutorialService } from "@/services/tutorialService";

interface VideoLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoSelect: (video: TutorialVideo) => void;
}

export const VideoLibrary = ({ isOpen, onClose, onVideoSelect }: VideoLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const videos = tutorialService.getAllVideos();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    videos.forEach(video => video.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => video.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [videos, searchTerm, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleVideoSelect = (video: TutorialVideo) => {
    onVideoSelect(video);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Video Tutorial Library</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleVideoSelect(video)}
              >
                <div className="relative bg-gray-200 rounded aspect-video mb-3 flex items-center justify-center">
                  <Play className="h-8 w-8 text-gray-500" />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}s
                  </div>
                </div>
                <h4 className="font-medium text-sm mb-1">{video.title}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{video.description}</p>
                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {video.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{video.tags.length - 2}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
