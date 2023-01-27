
import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../helper";

const ProtectedAuth = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedAuth;