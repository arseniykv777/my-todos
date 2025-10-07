import { logout } from "./api";
import { Navigate } from "react-router-dom";

function Logout() {
  logout();

  return <Navigate to="/login" replace />;
}

export default Logout;
