
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserPresence } from '@/services/websocketService';

interface PresenceIndicatorProps {
  users: UserPresence[];
  className?: string;
}

export const PresenceIndicator = ({ users, className }: PresenceIndicatorProps) => {
  if (users.length === 0) return null;

  const getLocationLabel = (location: string) => {
    const locationMap: Record<string, string> = {
      '/': 'Dashboard',
      '/projects': 'Projects',
      '/workforce': 'Workforce',
      '/sites': 'Sites',
      '/equipment': 'Equipment',
      '/timesheets': 'Timesheets',
      '/safety': 'Safety',
      '/reports': 'Reports',
      '/documents': 'Documents',
      '/settings': 'Settings'
    };
    return locationMap[location] || location;
  };

  return (
    <TooltipProvider>
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex -space-x-2">
          {users.slice(0, 3).map((user) => (
            <Tooltip key={user.userId}>
              <TooltipTrigger>
                <div className="relative">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback className="text-xs">
                      {user.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-center">
                  <p className="font-medium">{user.userName}</p>
                  <p className="text-xs text-gray-500">
                    {getLocationLabel(user.location)}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        
        {users.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{users.length - 3}
          </Badge>
        )}
        
        <span className="text-sm text-gray-500">
          {users.length} online
        </span>
      </div>
    </TooltipProvider>
  );
};
