
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, MapPin, Clock, Edit } from "lucide-react";
import { HelpButton } from "@/components/tutorial/HelpButton";
import { PresenceIndicator } from "@/components/collaboration/PresenceIndicator";
import { useTutorialContext } from "@/components/tutorial/TutorialProvider";
import { useCollaborationContext } from "@/components/collaboration/CollaborationProvider";
import { EditWorkerDialog } from "@/components/workforce/EditWorkerDialog";
import { AddWorkerDialog } from "@/components/workforce/AddWorkerDialog";

interface Worker {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  site: string;
  status: string;
  lastSeen: string;
  avatar: string;
}

const Workforce = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { openVideo } = useTutorialContext();
  const { activeUsers } = useCollaborationContext();

  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: 1,
      name: "John Smith",
      role: "Project Manager",
      email: "john.smith@demo.com",
      phone: "+1 (555) 123-4567",
      site: "Downtown Office Complex",
      status: "active",
      lastSeen: "2 hours ago",
      avatar: "JS",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Site Supervisor",
      email: "sarah.wilson@demo.com",
      phone: "+1 (555) 234-5678",
      site: "Residential Tower",
      status: "active",
      lastSeen: "30 minutes ago",
      avatar: "SW",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Foreman",
      email: "mike.johnson@demo.com",
      phone: "+1 (555) 345-6789",
      site: "Hospital Extension",
      status: "active",
      lastSeen: "1 hour ago",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Lisa Chen",
      role: "Safety Officer",
      email: "lisa.chen@demo.com",
      phone: "+1 (555) 456-7890",
      site: "Shopping Mall",
      status: "offline",
      lastSeen: "1 day ago",
      avatar: "LC",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "offline":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditWorker = (worker: Worker) => {
    setEditingWorker(worker);
    setIsEditDialogOpen(true);
  };

  const handleAddWorker = (newWorker: Worker) => {
    setWorkers([...workers, newWorker]);
  };

  const handleSaveWorker = (updatedWorker: Worker) => {
    setWorkers(workers.map(w => w.id === updatedWorker.id ? updatedWorker : w));
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingWorker(null);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Workforce
                  </h1>
                  <HelpButton
                    videoId="manage-workforce"
                    onVideoOpen={openVideo}
                    size="sm"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your construction team and track their activity.
                </p>
                
                {/* Presence Indicator */}
                <div className="mt-4">
                  <PresenceIndicator users={activeUsers} />
                </div>
              </div>
              
              <AddWorkerDialog onAdd={handleAddWorker} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workers.map((worker) => (
                <Card key={worker.id} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder-avatar-${worker.id}.jpg`} alt={worker.name} />
                          <AvatarFallback>{worker.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                            {worker.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {worker.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(worker.status)}>
                          {worker.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditWorker(worker)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{worker.email}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{worker.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{worker.site}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Last seen {worker.lastSeen}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      <EditWorkerDialog
        worker={editingWorker}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onSave={handleSaveWorker}
      />
    </div>
  );
};

export default Workforce;
