
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TutorialProvider } from "@/components/tutorial/TutorialProvider";
import { CollaborationProvider } from "@/components/collaboration/CollaborationProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
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
import Tutorial from "./pages/Tutorial";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CollaborationProvider>
        <TutorialProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sites"
                  element={
                    <ProtectedRoute>
                      <Sites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/workforce"
                  element={
                    <ProtectedRoute>
                      <Workforce />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment"
                  element={
                    <ProtectedRoute>
                      <Equipment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/timesheets"
                  element={
                    <ProtectedRoute>
                      <Timesheets />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/safety"
                  element={
                    <ProtectedRoute>
                      <Safety />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <ProtectedRoute>
                      <Reports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/documents"
                  element={
                    <ProtectedRoute>
                      <Documents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tutorial"
                  element={
                    <ProtectedRoute>
                      <Tutorial />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TutorialProvider>
      </CollaborationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
