import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserFloatingMenu } from "./components/HomePage/UserFloatingMenu";
import { LoginModal } from "./components/HomePage/LoginModal";
import { ProfileModal } from "./components/HomePage/ProfileModal";
import { useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import DebateRoom from "./pages/DebateRoom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { login } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleKakaoLogin = async () => {
    await login('kakao');
    setIsLoginModalOpen(false);
  };

  const handleGoogleLogin = async () => {
    await login('google');
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/debate/:roomId" element={<DebateRoom />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Global Floating Menu */}
      <UserFloatingMenu 
        onLogin={handleLogin} 
        onProfileClick={() => setIsProfileModalOpen(true)}
      />

      {/* Global Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onKakaoLogin={handleKakaoLogin}
        onGoogleLogin={handleGoogleLogin}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
