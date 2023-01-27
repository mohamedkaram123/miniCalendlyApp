
import pathes from "admin/urls";
import { Navigate, Outlet } from "react-router-dom";
import { isAuth,checkAdmin } from "../helper";

const ProtectedAuthAdmin = () => {

     if (isAuth()) {
         return <Outlet />
     } else {
         return <Navigate to={pathes.login_form} />
     }
};

export default ProtectedAuthAdmin;