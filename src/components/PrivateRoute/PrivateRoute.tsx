import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export function PrivateRoute() {
  const { userData } = useUser();
  return userData ? <Outlet /> : <Navigate to="/login" />;
}

//export PrivateRoute;