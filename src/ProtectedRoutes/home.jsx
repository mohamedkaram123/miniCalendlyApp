
import { Navigate, Outlet } from "react-router-dom";

import { isAuth } from "../helper";


const ProtectedHome = () => {
  return !isAuth() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedHome;