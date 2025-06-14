import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MobileHeader } from "@/components/navigation/MobileHeader";
import { MobileBottomTabs } from "@/components/navigation/MobileBottomTabs";
import MobileEquipment from "@/components/mobile/MobileEquipment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, Calendar, MapPin, AlertTriangle } from "lucide-react";

const Equipment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const equipment = [
    {
      id: 1,
      name: "Excavator CAT 320",
      assetTag: "EQ-001",
      type: "Heavy Machinery",
      status: "in_service",
      location: "Downtown Office Complex",
      nextService: "2024-07-25",
      condition: "good",
    },
    {
      id: 2,
      name: "Concrete Mixer",
      assetTag: "EQ-002",
      type: "Mixing Equipment",
      status: "available",
      location: "Equipment Yard",
      nextService: "2024-08-10",
      condition: "excellent",
    },
    {
      id: 3,
      name: "Tower Crane TC-5020",
      assetTag: "EQ-003",
      type: "Lifting Equipment",
      status: "in_service",
      location: "Residential Tower",
      nextService: "2024-07-20",
      condition: "fair",
    },
    {
      id: 4,
      name: "Bulldozer D6",
      assetTag: "EQ-004",
      type: "Heavy Machinery",
      status: "maintenance",
      location: "Service Center",
      nextService: "2024-07-15",
      condition: "poor",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in_service":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "retired":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "text-green-600 dark:text-green-400";
      case "good":
        return "text-blue-600 dark:text-blue-400";
      case "fair":
        return "text-yellow-600 dark:text-yellow-400";
      case "poor":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gray-50 dark:bg-gray-900">
        <MobileHeader title="Equipment" />
        <div className="p-4">
          <MobileEquipment />
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
                    Equipment
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track and manage construction equipment and machinery.
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {equipment.map((item) => (
                  <Card key={item.id} className="bg-white dark:bg-gray-800">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.assetTag} • {item.type}
                          </p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{item.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Service: {new Date(item.nextService).toLocaleDateString()}</span>
                          </div>
                          {new Date(item.nextService) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Wrench className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400 mr-2">Condition:</span>
                          <span className={`font-medium capitalize ${getConditionColor(item.condition)}`}>
                            {item.condition}
                          </span>
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

export default Equipment;
