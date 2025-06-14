
import { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { VideoPanel } from "@/components/tutorial/VideoPanel";
import { useTutorial } from "@/hooks/useTutorial";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Clock, Search, BookOpen, Upload } from "lucide-react";
import { tutorialService } from "@/services/tutorialService";
import { TutorialVideo } from "@/types/tutorial";
import { toast } from "@/hooks/use-toast";

const Tutorial = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const {
    currentVideo,
    isVideoOpen,
    openVideo,
    closeVideo,
  } = useTutorial();

  const videos = tutorialService.getAllVideos();
  
  const categories = ["all", ...Array.from(new Set(videos.map(v => v.screen)))];
  
  const filteredVideos = videos.filter(video => {
    const matchesSearch = searchTerm === "" || 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.screen === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVideoPlay = (video: TutorialVideo) => {
    openVideo(video.id);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, just show a toast message
      toast({
        title: "Video Upload",
        description: `Selected: ${file.name}. Upload functionality coming soon!`,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Tutorial Library
                  </h1>
                </div>
                <div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    style={{ display: 'none' }}
                    id="video-upload"
                  />
                  <Button
                    onClick={() => document.getElementById('video-upload')?.click()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Learn how to use BuildPro with our comprehensive video tutorials
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-md"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer capitalize"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map(video => (
                <Card key={video.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="relative bg-gray-200 dark:bg-gray-700 rounded aspect-video mb-3 flex items-center justify-center">
                      <Play className="h-8 w-8 text-gray-500" />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}s
                      </div>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {video.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {video.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{video.tags.length - 3}</span>
                      )}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleVideoPlay(video)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No tutorials found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or category filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <VideoPanel
        video={currentVideo}
        isOpen={isVideoOpen}
        onClose={closeVideo}
      />
    </div>
  );
};

export default Tutorial;
