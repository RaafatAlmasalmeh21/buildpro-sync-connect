
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, Calendar, MapPin, AlertTriangle } from "lucide-react";

const MobileEquipment = () => {
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
    <div className="space-mobile-md pb-20">
      <div className="space-y-4">
        {equipment.map((item) => (
          <MobileCard key={item.id} className="touch-manipulation">
            <MobileCardHeader>
              <div className="flex items-start justify-between">
                <div className="pr-2">
                  <MobileCardTitle className="text-mobile-lg">
                    {item.name}
                  </MobileCardTitle>
                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                    {item.assetTag} • {item.type}
                  </p>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status.replace('_', ' ')}
                </Badge>
              </div>
            </MobileCardHeader>
            <MobileCardContent>
              <div className="space-y-3">
                <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Service: {new Date(item.nextService).toLocaleDateString()}</span>
                  </div>
                  {new Date(item.nextService) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center text-mobile-sm">
                  <Wrench className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400 mr-2">Condition:</span>
                  <span className={`font-medium capitalize ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </span>
                </div>
              </div>
            </MobileCardContent>
          </MobileCard>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-40"
        size="sm"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileEquipment;
