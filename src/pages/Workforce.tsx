import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MobileHeader } from "@/components/navigation/MobileHeader";
import { MobileBottomTabs } from "@/components/navigation/MobileBottomTabs";
import MobileWorkforce from "@/components/mobile/MobileWorkforce";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Phone, Mail, MapPin, Clock } from "lucide-react";

const Workforce = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const workers = [
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
  ];

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

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gray-50 dark:bg-gray-900">
        <MobileHeader title="Workforce" />
        <div className="p-4">
          <MobileWorkforce />
        </div>
        <MobileBottomTabs />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Workforce
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your construction team and track their activity.
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Worker
                </Button>
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
                        <Badge className={getStatusColor(worker.status)}>
                          {worker.status}
                        </Badge>
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
      </div>
    </>
  );
};

export default Workforce;
