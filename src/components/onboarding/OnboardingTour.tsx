
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string; // CSS selector
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingTour = ({ steps, isOpen, onComplete, onSkip }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen || !steps[currentStep]) return;

    const element = document.querySelector(steps[currentStep].target) as HTMLElement;
    if (element) {
      setTargetElement(element);
      
      // Scroll element into view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Calculate tooltip position
      const rect = element.getBoundingClientRect();
      const position = steps[currentStep].position;
      
      let top = 0;
      let left = 0;
      
      switch (position) {
        case 'top':
          top = rect.top - 120;
          left = rect.left + rect.width / 2 - 150;
          break;
        case 'bottom':
          top = rect.bottom + 20;
          left = rect.left + rect.width / 2 - 150;
          break;
        case 'left':
          top = rect.top + rect.height / 2 - 60;
          left = rect.left - 320;
          break;
        case 'right':
          top = rect.top + rect.height / 2 - 60;
          left = rect.right + 20;
          break;
      }
      
      setTooltipPosition({ top, left });
    }
  }, [currentStep, isOpen, steps]);

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      {/* Highlight target element */}
      {targetElement && (
        <div
          className="fixed border-2 border-blue-500 rounded-lg z-50 pointer-events-none"
          style={{
            top: targetElement.getBoundingClientRect().top - 4,
            left: targetElement.getBoundingClientRect().left - 4,
            width: targetElement.offsetWidth + 8,
            height: targetElement.offsetHeight + 8,
          }}
        />
      )}
      
      {/* Tooltip */}
      <Card
        className="fixed z-50 w-80 shadow-xl"
        style={{
          top: tooltipPosition.top,
          left: Math.max(20, Math.min(tooltipPosition.left, window.innerWidth - 340)),
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">{currentStepData?.title}</h3>
              <div className="flex items-center space-x-1 mt-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      index === currentStep ? "bg-blue-600" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {currentStepData?.content}
          </p>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
            
            <Button size="sm" onClick={handleNext}>
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ArrowRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
