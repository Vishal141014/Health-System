import { Navigate } from 'react-router-dom';

// Protected route component to protect admin routes
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // For demonstration, we'll assume any authenticated user can access admin
  // In a real app, you would check for admin role or specific email domains
  return children;
};

export default ProtectedRoute; 