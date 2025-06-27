
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  const currentPath = location.pathname;
  
  // Receptionist should only access receptionist pages
  if (user?.role === 'Receptionist') {
    const allowedPaths = ['/receptionist', '/appointments', '/profile', '/indoor-patient-details', '/vaccination-details'];
    if (!allowedPaths.includes(currentPath)) {
      return <Navigate to="/receptionist" replace />;
    }
  }

  // Admin and Doctor have full access (but we could restrict later if needed)
  
  return <>{children}</>;
};

export default ProtectedRoute;
