
import React, { useEffect } from "react";
import {Outlet } from "react-router-dom";

import { BackgroundColorContext } from "../contexts/BackgroundColorContext";

import "../asset_js";
import Navbar from "./Navbar";
import Saidbar from "./Saidbar";
import FixedPlugin from "admin/components/FixedPlugin/FixedPlugin";
import { user } from "helper";
import { useTranslation } from "react-i18next";
import { useDispatch} from 'react-redux';
import { setTranslations } from "redux/actions/langsActions";

function Admin(props) {
  const [trans, i18n] = useTranslation();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(setTranslations(trans))

  }, [])
  

        return(
          <div>
               <div className="wrapper" style={{ direction:"ltr", }}>
                    <div className="bg-gray-100	" id="content">

                            <Navbar />
                              <Outlet />
                          </div>
                </div>
        </div>
      )
 
}

export default Admin;
