
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Project, AssignedWorker } from "@/types/project";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  Target,
  ArrowLeft,
  Edit,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Calendar as CalendarIcon
} from "lucide-react";

// Mock data - in real app this would come from API
const mockProject: Project = {
  id: 1,
  name: "Downtown Office Complex",
  client: "Metro Development Corp",
  progress: 78,
  status: "active" as const,
  sites: 3,
  startDate: "2024-01-15",
  endDate: "2024-08-15",
  budget: "$2.4M",
  teamSize: 24,
  location: "Downtown Metro City",
  assignedWorkers: [
    {
      id: 1,
      name: "John Smith",
      role: "Site Manager",
      assignedDate: "2024-01-15",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Project Coordinator", 
      assignedDate: "2024-01-20",
    },
  ],
};

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

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // In real app, fetch project by ID
    setProject(mockProject);
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="sm" onClick={() => navigate('/projects')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {project.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {project.client}
                </p>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.progress}%
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                  <Progress value={project.progress} className="mt-3" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.budget}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Team Size</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.teamSize}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sites</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.sites}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Location</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.location}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Start Date</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(project.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>End Date</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Foundation work completed
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              New team member assigned
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              1 day ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Schedule updated
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              3 days ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Workers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.assignedWorkers?.map((worker) => (
                        <div key={worker.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                          <Avatar className="h-10 w-10">
                            <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {worker.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {worker.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {worker.role}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Since {new Date(worker.assignedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Project Started</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(project.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Current Phase</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Construction Phase - {project.progress}% complete
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Expected Completion</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(project.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Foundation Work</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Assigned to John Smith</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Electrical Installation</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Assigned to Mike Johnson</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Interior Finishing</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Not yet assigned</p>
                          </div>
                        </div>
                        <Badge className="bg-gray-100 text-gray-800">Planned</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Project Blueprint</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Updated 2 days ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Safety Report</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Updated 1 week ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Progress Photos</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Updated yesterday</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetails;
