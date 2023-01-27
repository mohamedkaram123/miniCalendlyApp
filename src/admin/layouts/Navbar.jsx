import React,{useState,useRef,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Urls,get,post,deleteAllCookies, dir,user,isAuth } from 'helper'
import { useTranslation } from "react-i18next";
import Loading from 'HelperComponents/Loading';
import $ from 'jquery'
import pathes from 'admin/urls';

export default function Navbar() {

    const [trans, i18n] = useTranslation();
    const [loading, setLoading] = useState(false);
            const navigate = useNavigate();

  

  
  
  const logout = () => {
setLoading(true)
 
    get(pathes.logout, (res) => {

               deleteAllCookies()
              setLoading(false)
              navigate("/")


    },err=>{},true)
    }
  return (
      
    <div className="bg-white header-2">

    <nav style={{ borderBottom:"1px solid #eee" }} className="bg-gray py-2 md:py-4">
      <div className="container px-4 mx-auto md:flex md:items-center">
  
        <div className="flex justify-between items-center">
          <a href="#" className="font-bold text-xl text-purple-600">Mini Clandely</a>
          <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
            <i className="fas fa-bars"></i>
          </button>
        </div>
  
        <div className="hidden md:flex flex-col md:flex-row mt-3 md:mt-0" id="navbar-collapse">
          <Link to={pathes.home} className="p-2 lg:px-4 md:mx-2 text-white rounded bg-purple-600">{trans("Home")}</Link>
          <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">About</a>
          <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Features</a>
          <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Pricing</a>
          <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Contact</a>
          {isAuth?<a href="#" onClick={logout} className="p-2 lg:px-4 md:mx-2 text-purple-600 text-center border border-transparent rounded hover:bg-purple-100 hover:text-purple-700 transition-colors duration-300">Logout</a>:
           <>
           <a href="#" className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">Login</a>
           <a href="#" className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">Signup</a>
           </>
          }
         
        </div>
      </div>
    </nav>
  
 
  
  </div>

  )
}
