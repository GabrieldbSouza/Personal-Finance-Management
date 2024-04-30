import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {

  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = !! accessToken; 
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}
