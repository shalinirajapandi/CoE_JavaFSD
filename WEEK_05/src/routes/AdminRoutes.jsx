import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Outlet } from "react-router-dom";

export default function AdminRoutes() {
  const { isAdmin } = useContext(AuthContext);
  return isAdmin ? <Outlet /> : null;
}
