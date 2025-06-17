
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Users, Calendar, Building } from "lucide-react";
import { sites } from "@/data/sites";

const Sites = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Sites
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage construction sites and their locations.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Site
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sites.map((site) => (
                <Card key={site.id} className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {site.name}
                      </CardTitle>
                      <Badge className={getStatusColor(site.status)}>
                        {site.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {site.project}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{site.address}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{site.workers} workers</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{site.lastActivity}</span>
                        </div>
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
  );
};

export default Sites;
