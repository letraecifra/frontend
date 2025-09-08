import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import Index from "./pages/Index";
import { SongDetail } from "./pages/SongDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ArtistList } from "./pages/ArtistList";
import { Dashboard } from "./pages/Dashboard";
import { UserProfile } from "./pages/UserProfile";
import { Security } from "./pages/Security";
import { ManageArtifacts } from "./pages/ManageArtifacts";
import { CreateArtifact } from "./pages/CreateArtifact";
import { LyricsForm } from "./pages/forms/LyricsForm";
import { ChordsForm } from "./pages/forms/ChordsForm";
import { TabsForm } from "./pages/forms/TabsForm";
import { SheetMusicForm } from "./pages/forms/SheetMusicForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/artists" element={<ArtistList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
            <Route path="/dashboard/artifacts" element={<ProtectedRoute><ManageArtifacts /></ProtectedRoute>} />
            
            {/* Create Routes */}
            <Route path="/create" element={<ProtectedRoute><CreateArtifact /></ProtectedRoute>} />
            <Route path="/create/lyrics/form" element={<ProtectedRoute><LyricsForm /></ProtectedRoute>} />
            <Route path="/create/chords/form" element={<ProtectedRoute><ChordsForm /></ProtectedRoute>} />
            <Route path="/create/tabs/form" element={<ProtectedRoute><TabsForm /></ProtectedRoute>} />
            <Route path="/create/sheet/form" element={<ProtectedRoute><SheetMusicForm /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
