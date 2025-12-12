import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { user, loading } = useAuth();

  if(loading || isLoading) {
    return <p>Loading....wait....</p>
  }
  
  if (!user) {
    return <Navigate to="/login" state={location?.pathname} />;
  }

  if(role.role !== 'admin') {
    return <Navigate to="/"/>
  }

  return children;
};

export default AdminRoute;