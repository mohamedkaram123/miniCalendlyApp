import React ,{useState,useRef,useEffect} from 'react'
import Admin from "./layouts/Admin";

// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
import {
  Routes,
  Route,
} from "react-router-dom";
import { getLang, Urls } from '../helper';
import Login from './components/auth/login';
import ProtectedAuthAdmin from '../ProtectedRoutes/AuthAdmin';
import ErrorConnection from 'HelperComponents/ErrorConnection';

import "bootstrap";
import RoleTable from './components/roles/rolesTable/role_table';
import store from './../store';
import { Provider } from 'react-redux';
import Register from './components/auth/Register';
import CreateEvent from './views/EventCreator/CreateEvent';
import pathes from './urls';
import Home from './views/Home';
import EditEvent from './views/EventUpdater/EditEvent';
import CalendlyLink from './views/LInk/CalendlyLink';
import SuccessConfirm from './views/LInk/SuccessConfirm';
import CreateEventUpdate from './views/EventUpdater/CreateEventUpdate';
import UpdateEvent_level2 from './views/EventUpdater/UpdateEvent_level2';

export default function RouterAdmin({lang}) {
    return (
      <Provider store = { store } >
          <Routes>
            
          <Route  element={<ProtectedAuthAdmin />}>
            
              <Route exact path={pathes.perfix} element={<Admin />}>
              <Route path={pathes.home} element={<Home />} />
                <Route path={pathes.new_event} element={<CreateEvent />} />
                <Route path={pathes.edit_event} element={<EditEvent />} />

                  <Route
                  path={pathes.edit_level1_event}
                  element={<CreateEventUpdate />} 
                />
                <Route
                path={pathes.edit_level2_event}
                element={<UpdateEvent_level2 />} 
              />
                <Route path="/calender/*" element={<ErrorConnection />} />
                <Route path="/calender" element={<ErrorConnection />} />

              </Route>
              
            </Route>
            <Route
                exact={true}
                path={pathes.event_link}
                element={<CalendlyLink />} 
              />
              <Route
                path={pathes.event_confirm}
                element={<SuccessConfirm />} 
              />
      
            
              
            <Route  path={pathes.login_form} element={<Login />} />
            <Route  path={pathes.register_form}  element={<Register />} />

          </Routes>
      </Provider>
 
    )
}
