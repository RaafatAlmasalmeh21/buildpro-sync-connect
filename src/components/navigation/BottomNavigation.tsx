
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Calendar, 
  Users, 
  HelpCircle, 
  Settings,
  MapPin
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: Calendar },
  { name: 'Sites', href: '/sites', icon: MapPin },
  { name: 'Workforce', href: '/workforce', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <nav className="flex justify-around items-center py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 text-xs font-medium rounded-md transition-colors",
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1",
                isActive ? "text-blue-600 dark:text-blue-400" : ""
              )} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
