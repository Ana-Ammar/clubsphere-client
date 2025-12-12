import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { loading } = useAuth();

  if(loading || isLoading) {
    return <p>Loading....wait....</p>
  }

  if(role.role !== 'admin') {
    return <Navigate to="/"/>
  }

  return children;
};

export default AdminRoute;