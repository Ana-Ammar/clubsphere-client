import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const MemberRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { user, loading } = useAuth();

  if (loading || isLoading) {
    return <p>Loading....wait....</p>;
  }

    if (!user) {
    return <Navigate to="/login" state={location?.pathname} />;
  }

  if (role.role !== "member") {
    return <Navigate to="/" />;
  }

  return children;
};

export default MemberRoute;