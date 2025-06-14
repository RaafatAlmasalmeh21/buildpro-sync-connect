
import React, { useState, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  className?: string;
}

export const PullToRefresh = ({ children, onRefresh, className }: PullToRefreshProps) => {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const threshold = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0 && startY.current > 0) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, (currentY - startY.current) * 0.5);
      
      if (distance > 0) {
        setPullDistance(distance);
        setIsPulling(true);
        e.preventDefault();
      }
    }
  }, []);

  const handleTouchEnd = useCallback(async () => {
    if (isPulling && pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setIsPulling(false);
    setPullDistance(0);
    startY.current = 0;
  }, [isPulling, pullDistance, onRefresh]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-auto", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 bg-blue-50 dark:bg-blue-900/20",
          isPulling || isRefreshing ? "opacity-100" : "opacity-0"
        )}
        style={{
          height: Math.min(pullDistance, threshold),
          transform: `translateY(-${Math.max(0, threshold - pullDistance)}px)`
        }}
      >
        <RefreshCw
          className={cn(
            "h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform",
            isRefreshing ? "animate-spin" : "",
            pullDistance >= threshold ? "scale-110" : ""
          )}
        />
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: isPulling ? `translateY(${Math.min(pullDistance, threshold)}px)` : 'translateY(0)'
        }}
      >
        {children}
      </div>
    </div>
  );
};
