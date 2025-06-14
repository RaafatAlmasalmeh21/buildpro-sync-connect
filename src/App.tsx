
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TutorialProvider } from "@/components/tutorial/TutorialProvider";
import { CollaborationProvider } from "@/components/collaboration/CollaborationProvider";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Sites from "./pages/Sites";
import Workforce from "./pages/Workforce";
import Equipment from "./pages/Equipment";
import Timesheets from "./pages/Timesheets";
import Safety from "./pages/Safety";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CollaborationProvider>
        <TutorialProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/workforce" element={<Workforce />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/timesheets" element={<Timesheets />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TutorialProvider>
      </CollaborationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
