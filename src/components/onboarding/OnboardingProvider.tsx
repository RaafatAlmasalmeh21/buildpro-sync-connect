
import React, { createContext, useContext, useState, useEffect } from 'react';
import { OnboardingTour } from './OnboardingTour';

interface OnboardingContextType {
  startTour: (tourId: string) => void;
  isFirstVisit: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

const dashboardTourSteps = [
  {
    id: 'welcome',
    title: 'Welcome to BuildPro!',
    content: 'Let\'s take a quick tour to help you get started with managing your construction projects.',
    target: '[data-tour="header"]',
    position: 'bottom' as const,
  },
  {
    id: 'stats',
    title: 'Project Overview',
    content: 'Here you can see key metrics about your projects, including active projects, team members, and completion rates.',
    target: '[data-tour="stats"]',
    position: 'bottom' as const,
  },
  {
    id: 'projects',
    title: 'Recent Projects',
    content: 'View and manage your recent projects. Click on any project to see detailed information.',
    target: '[data-tour="projects"]',
    position: 'top' as const,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    content: 'Use the sidebar to navigate between different sections like Projects, Workforce, Equipment, and more.',
    target: '[data-tour="sidebar"]',
    position: 'right' as const,
  },
];

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [activeTour, setActiveTour] = useState<string | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('buildpro-onboarding-completed');
    if (!hasVisited) {
      setIsFirstVisit(true);
      setTimeout(() => setActiveTour('dashboard'), 1000);
    }
  }, []);

  const startTour = (tourId: string) => {
    setActiveTour(tourId);
  };

  const handleTourComplete = () => {
    localStorage.setItem('buildpro-onboarding-completed', 'true');
    setActiveTour(null);
    setIsFirstVisit(false);
  };

  const handleTourSkip = () => {
    localStorage.setItem('buildpro-onboarding-completed', 'true');
    setActiveTour(null);
    setIsFirstVisit(false);
  };

  return (
    <OnboardingContext.Provider value={{
      startTour,
      isFirstVisit
    }}>
      {children}
      
      {activeTour === 'dashboard' && (
        <OnboardingTour
          steps={dashboardTourSteps}
          isOpen={true}
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
        />
      )}
    </OnboardingContext.Provider>
  );
};
