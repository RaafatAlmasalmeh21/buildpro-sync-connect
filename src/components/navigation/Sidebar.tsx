
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, current: true },
  { name: "Projects", href: "/projects", icon: Calendar, current: false },
  { name: "Sites", href: "/sites", icon: MapPin, current: false },
  { name: "Workforce", href: "/workforce", icon: Users, current: false },
  { name: "Equipment", href: "/equipment", icon: Wrench, current: false },
  { name: "Timesheets", href: "/timesheets", icon: Clock, current: false },
  { name: "Safety", href: "/safety", icon: Shield, current: false },
  { name: "Reports", href: "/reports", icon: BarChart3, current: false },
  { name: "Documents", href: "/documents", icon: FileText, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BP</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
              BuildPro
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <nav className="px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={item.current ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    item.current
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                  {item.current && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </Button>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                DC
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Demo Construction Ltd.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin Account
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
