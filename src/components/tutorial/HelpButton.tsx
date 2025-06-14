
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HelpButtonProps {
  videoId: string;
  onVideoOpen: (videoId: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const HelpButton = ({ 
  videoId, 
  onVideoOpen, 
  className,
  size = "md" 
}: HelpButtonProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10"
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full bg-blue-500 hover:bg-blue-600 text-white",
        sizeClasses[size],
        className
      )}
      onClick={() => onVideoOpen(videoId)}
    >
      <HelpCircle className="h-4 w-4" />
    </Button>
  );
};
