
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoleManagement from "./pages/RoleManagement";
import VaccineManagement from "./pages/VaccineManagement";
import SlotManagement from "./pages/SlotManagement";
import BedManagement from "./pages/BedManagement";
import Receptionist from "./pages/Receptionist";
import UserManagement from "./pages/UserManagement";
import BookAppointment from "./pages/BookAppointment";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/roles" element={
              <ProtectedRoute>
                <RoleManagement />
              </ProtectedRoute>
            } />
            <Route path="/vaccines" element={
              <ProtectedRoute>
                <VaccineManagement />
              </ProtectedRoute>
            } />
            <Route path="/slots" element={
              <ProtectedRoute>
                <SlotManagement />
              </ProtectedRoute>
            } />
            <Route path="/beds" element={
              <ProtectedRoute>
                <BedManagement />
              </ProtectedRoute>
            } />
            <Route path="/receptionist" element={
              <ProtectedRoute>
                <Receptionist />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
