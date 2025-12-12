import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const ManagerRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  const { loading } = useAuth();

  if (loading || isLoading) {
    return <p>Loading....wait....</p>;
  }

  if (role.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ManagerRoute;
