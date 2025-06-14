
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, X } from 'lucide-react';

interface ConflictResolverProps {
  conflicts: any[];
  onResolve: (conflictId: string, resolution: 'accept' | 'reject') => void;
}

export const ConflictResolver = ({ conflicts, onResolve }: ConflictResolverProps) => {
  if (conflicts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {conflicts.map((conflict) => (
        <Alert key={conflict.id} className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-sm">
            <div className="mb-2">
              <strong>{conflict.userName}</strong> also modified this record. 
              Choose which version to keep:
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onResolve(conflict.id, 'accept')}
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                <Check className="h-3 w-3 mr-1" />
                Keep theirs
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onResolve(conflict.id, 'reject')}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="h-3 w-3 mr-1" />
                Keep mine
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
