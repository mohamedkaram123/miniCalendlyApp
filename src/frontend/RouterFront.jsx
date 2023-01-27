import React from 'react';

import {
  Routes,
  Route,
  
} from "react-router-dom";

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Master from './layouts/Master';
import Home from './components/Home';
import ProtectedAuth from '../ProtectedRoutes/auth';
import ProtectedHome from '../ProtectedRoutes/home';
import RedirectHome from '../ProtectedRoutes/RedirectHome';
export default function RouterFront() {
    return (
           <Routes>
               
                <Route   element={<RedirectHome />}>
                   <Route  path="/" element={<Master />}>
                   <Route element={<ProtectedAuth />}>
                     <Route path="/" element={<Home />} />
                   </Route>
                     
                   <Route element={<ProtectedHome />}>
                     
                     <Route path="/login" element={<Login />} />
                     <Route path="/register" element={<Register />} />
                   </Route>
                </Route>
                </Route>
               
        </Routes>
    )
}
