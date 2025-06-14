
import { useState } from "react";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Search,
  Filter,
  ChevronRight
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  status: "planned" | "active" | "closed";
  location: string;
  startDate: string;
  budget: string;
  teamSize: number;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Downtown Office Complex",
    client: "Metro Development Corp",
    progress: 78,
    status: "active",
    location: "Downtown Metro City",
    startDate: "2024-01-15",
    budget: "$2.4M",
    teamSize: 24
  },
  {
    id: 2,
    name: "Residential Tower Phase 2",
    client: "Urban Living Ltd",
    progress: 45,
    status: "active",
    location: "North District",
    startDate: "2024-03-01",
    budget: "$5.1M",
    teamSize: 18
  },
  {
    id: 3,
    name: "Hospital Extension",
    client: "City Medical Center",
    progress: 92,
    status: "active",
    location: "Medical District",
    startDate: "2023-09-01",
    budget: "$8.7M",
    teamSize: 32
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "planned":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "closed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const MobileProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20 md:pb-0">
      {/* Search and Filter */}
      <div className="sticky top-14 md:top-0 z-30 bg-gray-50 dark:bg-gray-900 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-2xl border-gray-200 dark:border-gray-700"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-2xl h-10 px-4">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button 
            variant="outline" 
            className="rounded-2xl h-10 px-4"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3 px-4">
        {filteredProjects.map((project) => (
          <MobileCard key={project.id} className="m-0 touch-manipulation active:scale-95 transition-transform">
            <MobileCardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {project.client}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{project.teamSize} members</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-medium">{project.budget}</span>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-gray-500 dark:text-gray-400">
            No projects found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};
