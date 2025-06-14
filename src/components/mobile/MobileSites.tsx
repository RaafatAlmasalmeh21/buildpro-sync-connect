
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Users, Calendar } from "lucide-react";

const MobileSites = () => {
  const sites = [
    {
      id: 1,
      name: "Downtown Office Complex - Site A",
      project: "Downtown Office Complex",
      address: "123 Business District, Metro City",
      workers: 24,
      status: "active",
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Residential Tower - Ground Floor",
      project: "Residential Tower Phase 2",
      address: "456 Urban Avenue, Metro City",
      workers: 18,
      status: "active",
      lastActivity: "30 minutes ago",
    },
    {
      id: 3,
      name: "Hospital Extension - East Wing",
      project: "Hospital Extension",
      address: "789 Medical Center Drive, Metro City",
      workers: 32,
      status: "active",
      lastActivity: "1 hour ago",
    },
  ];

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
    <div className="space-mobile-md pb-20">
      <div className="space-y-4">
        {sites.map((site) => (
          <MobileCard key={site.id} className="touch-manipulation">
            <MobileCardHeader>
              <div className="flex items-start justify-between">
                <MobileCardTitle className="text-mobile-lg pr-2">
                  {site.name}
                </MobileCardTitle>
                <Badge className={getStatusColor(site.status)}>
                  {site.status}
                </Badge>
              </div>
              <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                {site.project}
              </p>
            </MobileCardHeader>
            <MobileCardContent>
              <div className="space-y-3">
                <div className="flex items-start text-mobile-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="leading-5">{site.address}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>{site.workers} workers</span>
                  </div>
                  <div className="flex items-center text-mobile-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{site.lastActivity}</span>
                  </div>
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

export default MobileSites;
