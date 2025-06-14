
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface MobileHeaderProps {
  title: string;
  showNotifications?: boolean;
}

export const MobileHeader = ({ title, showNotifications = true }: MobileHeaderProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 md:hidden">
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="min-w-[44px] min-h-[44px] p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h1>
          
          {showNotifications && (
            <Button
              variant="ghost"
              size="sm"
              className="min-w-[44px] min-h-[44px] p-2 relative"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          )}
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};
