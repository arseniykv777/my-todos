import { logout } from "./api";
import { Navigate } from "react-router-dom";

function Logout(props) {
  if (props.currentUser) {
    logout();
    return null;
  }

  return <Navigate to="/login" replace />;
}

export default Logout;
