import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
