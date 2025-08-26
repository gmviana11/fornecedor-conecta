import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import SuppliersManagement from "./pages/SuppliersManagement";
import SupplierForm from "./pages/SupplierForm";
import DashboardSettings from "./pages/DashboardSettings";
import Login from "./pages/Login";
import SupplierDashboard from "./pages/SupplierDashboard";
import UserDashboard from "./pages/UserDashboard";
import ServiceRequest from "./pages/ServiceRequest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuthContext();

  // Redirect to appropriate dashboard based on user type
  const getDefaultDashboard = () => {
    if (!user) return "/";
    
    switch (user.type) {
      case 'super_admin':
        return '/dashboard';
      case 'supplier':
        return '/supplier-dashboard';
      case 'user':
        return '/user-dashboard';
      default:
        return '/';
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to={getDefaultDashboard()} /> : <Index />} />
      <Route path="/login" element={user ? <Navigate to={getDefaultDashboard()} /> : <Login />} />
      <Route path="/cadastrar" element={<SupplierForm />} />
      
      {/* Super Admin Dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['super_admin']}>
          <Dashboard />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="suppliers" element={<SuppliersManagement />} />
        <Route path="suppliers/new" element={<SupplierForm />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
      
      {/* Supplier Dashboard */}
      <Route path="/supplier-dashboard" element={
        <ProtectedRoute allowedRoles={['supplier']}>
          <SupplierDashboard />
        </ProtectedRoute>
      } />
      
      {/* User Dashboard */}
      <Route path="/user-dashboard" element={
        <ProtectedRoute allowedRoles={['user']}>
          <UserDashboard />
        </ProtectedRoute>
      } />
      
      {/* Service Request Page */}
      <Route path="/request-service" element={
        <ProtectedRoute allowedRoles={['user']}>
          <ServiceRequest />
        </ProtectedRoute>
      } />
      
      {/* Catch all - 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
