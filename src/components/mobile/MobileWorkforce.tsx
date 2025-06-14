
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Phone, Mail, MapPin, Clock } from "lucide-react";

const MobileWorkforce = () => {
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
    <div className="space-mobile-md pb-20">
      <div className="space-y-4">
        {workers.map((worker) => (
          <MobileCard key={worker.id} className="touch-manipulation">
            <MobileCardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-avatar-${worker.id}.jpg`} alt={worker.name} />
                    <AvatarFallback>{worker.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <MobileCardTitle className="text-mobile-lg">
                      {worker.name}
                    </MobileCardTitle>
                    <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                      {worker.role}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(worker.status)}>
                  {worker.status}
                </Badge>
              </div>
            </MobileCardHeader>
            <MobileCardContent>
              <div className="space-y-3">
                <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{worker.email}</span>
                </div>
                
                <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>{worker.phone}</span>
                </div>
                
                <div className="flex items-center text-mobile-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="truncate">{worker.site}</span>
                </div>
                
                <div className="flex items-center text-mobile-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>Last seen {worker.lastSeen}</span>
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

export default MobileWorkforce;
