import React,{useEffect, useState} from 'react';
import RouterAdmin from "./admin/RouterAdmin";
import { HashRouter  } from "react-router-dom";

import './i18n';
import {getLang} from './helper';
import RouterFront from './frontend/RouterFront';
import 'react-toastify/dist/ReactToastify.css';

import {ThemeProvider} from 'react-bootstrap';
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "line-awesome/dist/font-awesome-line-awesome/css/all.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";

// import "assets/scss/custom.scss"
import "../src/assets/scss/black-dashboard-react.scss"
import pathes from 'admin/urls';

export default function App() {



  return (
    
    <div>
      <ThemeProvider   dir="rtl">

      <HashRouter >
              
            <RouterAdmin lang={getLang()} />

            <RouterFront />
        </HashRouter>
        </ThemeProvider>
  </div>);
}
