import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProp {
  children: ReactNode;
}

export const AuthRoute: React.FC<AuthRouteProp> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return <Navigate to="/" replace />;
};
