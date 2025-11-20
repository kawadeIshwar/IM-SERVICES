import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ClientRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Check if user is logged in
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If user is admin, redirect to admin dashboard
  if (isAdmin()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // User is client, allow access
  return children;
};

export default ClientRoute;
