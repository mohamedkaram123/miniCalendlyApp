
import pathes from "admin/urls";
import { Navigate, Outlet } from "react-router-dom";
import { checkPath } from "../helper";

const RedirectHome = () => {
  return  <Navigate to={pathes.home} />;
};

export default RedirectHome;