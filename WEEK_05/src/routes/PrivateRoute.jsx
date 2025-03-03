import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants/navigationConstants";

export default function PrivateRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_ROUTE} replace />;
}
