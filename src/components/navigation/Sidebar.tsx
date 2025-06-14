
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Calendar,
  MapPin,
  Users,
  Settings,
  FileText,
  Clock,
  Shield,
  BarChart3,
  X,
  ChevronRight,
  Home,
  Wrench,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: Home,
    preview: "Overview of all projects and key metrics"
  },
  { 
    name: "Projects", 
    href: "/projects", 
    icon: Calendar,
    preview: "Manage construction projects and timelines"
  },
  { 
    name: "Sites", 
    href: "/sites", 
    icon: MapPin,
    preview: "Track construction site locations and details"
  },
  { 
    name: "Workforce", 
    href: "/workforce", 
    icon: Users,
    preview: "Manage team members and assignments"
  },
  { 
    name: "Equipment", 
    href: "/equipment", 
    icon: Wrench,
    preview: "Track machinery and tool inventory"
  },
  { 
    name: "Timesheets", 
    href: "/timesheets", 
    icon: Clock,
    preview: "Monitor work hours and productivity"
  },
  { 
    name: "Safety", 
    href: "/safety", 
    icon: Shield,
    preview: "Safety protocols and incident reporting"
  },
  { 
    name: "Reports", 
    href: "/reports", 
    icon: BarChart3,
    preview: "Generate insights and analytics"
  },
  { 
    name: "Documents", 
    href: "/documents", 
    icon: FileText,
    preview: "Store and organize project documents"
  },
  { 
    name: "Settings", 
    href: "/settings", 
    icon: Settings,
    preview: "Configure application preferences"
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
        data-tour="sidebar"
      >
        <div className={cn(
          "flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700",
          isCollapsed && "px-4"
        )}>
          <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BP</span>
            </div>
            {!isCollapsed && (
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                BuildPro
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            
            {isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(false)}
                className="hidden lg:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <nav className={cn("px-4 py-6 space-y-2", isCollapsed && "px-2")}>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              const NavigationButton = (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full font-normal transition-all duration-200",
                    isCollapsed 
                      ? "justify-center px-2" 
                      : "justify-start text-left",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  asChild
                >
                  <Link to={item.href}>
                    <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                    {!isCollapsed && (
                      <>
                        {item.name}
                        {isActive && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </>
                    )}
                  </Link>
                </Button>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      {NavigationButton}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.preview}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return NavigationButton;
            })}
          </nav>
        </ScrollArea>

        <div className={cn(
          "p-4 border-t border-gray-200 dark:border-gray-700",
          isCollapsed && "px-2"
        )}>
          <div className={cn("flex items-center", isCollapsed && "justify-center")}>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                DC
              </span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Demo Construction Ltd.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Admin Account
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
