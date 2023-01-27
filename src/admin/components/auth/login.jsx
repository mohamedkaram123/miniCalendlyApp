import React ,{useEffect, useState} from 'react';
import { Urls,getCookie,isAuth } from '../../../helper';
import Loading from '../../../HelperComponents/Loading';
import { encryptCookieStorage,decryptCookieStorage } from '../../../hash';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { post,error_state } from '../../../helper'; 
import { useTranslation } from "react-i18next";
import InputData from 'admin/forms/InputData';
import BtnSendData from 'admin/forms/btnSendData';
import { useCookies } from 'react-cookie';
import pathes from 'admin/urls';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { initClient, signInToGoogle } from './helperAuth';
import SignGoogleBtn from './SignGoogleBtn';
export default function Login() {



         const [trans,i18n] = useTranslation();
         const [cookies, setCookie] = useCookies(null);

  const [loading, setLoadung] = useState(false);
  const [loadSearch, setloadSearch] = useState(false)
  const [switchGoogle, setswitchGoogle] = useState(false)
  const [resData, setresData] = useState({})
  const [googleDisabled, setgoogleDisabled] = useState(true)

  const [loginInput, setloginInput] = useState({
    "email": "",
    "password": "",
  });

       const [loginInputValid, setloginInputValid] = useState({
    "email": "",
    "password": "",
      });
     
      useEffect(() => {
        initClient(()=>{
          setgoogleDisabled(false)
        })
      }, )

      const googleClick = ()=>{
        signInToGoogle((res)=>{
          update_res_google(resData,res)
    
        //   setloginInput((prevState) => ({
        //     ...prevState,
        //     "name": res.wt.Ad,
        //     "email":  res.wt.cu,
        //     "google_res":  res.xc,
    
        // }));
        })
      }
    let navigate = useNavigate();

  const changeData = (e) =>{
    setloginInput({...loginInput,[e.target.name]:e.target.value})
  }


  const update_res_google = (user,google_res)=>{

    post(pathes.update_res_google,{id:user.id,google_res},res=>{
 
      encryptCookieStorage(res.user,"user")
      navigate(pathes.home);
    },err=>{

    })
  }
  const setDatas = ( type, e, item = null) => {

    setloginInput((prevState) => ({
        ...prevState,
        [type]: e.target.value
    }));
  
  }

  const sendData = ()=>{
    setloadSearch(true)
    post(pathes.login,loginInput,res=>{
      setloadSearch(false)

      setresData(res.data)
      setswitchGoogle(true)
    },
    err=>{
      setloadSearch(false)

      if(err.status == 301){
        error_state(setloginInputValid,loginInputValid,err.data.data)
    }
    })
  }




    return (
    <section className="h-screen">
    <Loading setLoading={loading} />

    <div className="px-6 h-full text-gray-800">
      <div
        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
        >
          <img
            src={ process.env.REACT_APP_ASSEST_URL + "img/Calendar-amico.png"}
            className="w-full"
            alt="Sample image"
          />
        </div>
        {switchGoogle? 
          <div className="max-w-sm border-purple-500 border-1 rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
          <div className="font-bold text-purple-500 text-xl mb-2">Google SignIn</div>
          <p className="text-gray-700 font-bold  text-base">
            please we want permission google calender 
          </p>
          <div className="px-6 pt-4 pb-2">
          <SignGoogleBtn googleDisabled={googleDisabled} click={googleClick} />
    
            </div>
        </div>
          </div>
          :
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
      
         <form>
         <div className="mb-10 text-center">
         <h1  className="font-bold text-3xl text-purple-600" style={{ fontWeight:800 }}>Mini Clandely</h1>
         </div>
  
            <div className="mb-6">
             
            <InputData  placeholder={trans("Email")} required={true} col_md={12} col={12}  error={loginInputValid}  input_type="text"  type={`email`} value={loginInput.email} onChange={setDatas} />

            </div>
  
             {/*  <div className="mb-6">
            <InputData  placeholder={trans("Password")} required={true} col_md={12} col={12}  error={loginInputValid}  input_type="password"  type={`password`} value={loginInput.password} onChange={setDatas} />

            </div>*/}
  
  
            <div  className="d-flex flex-column slign-items-center mb-4 lg:text-left">
                  <BtnSendData classes="my-4  
                  d-flex flex-row
                  justify-content-center
                  inline-block mr-5 px-6 py-2 border-1 border-purple-600 
                  text-purple-600 font-medium text-xs leading-tight 
                  uppercase  hover:bg-black hover:bg-opacity-5 focus:outline-none 
                  focus:ring-0 transition duration-150 ease-in-out "
                   onclick={sendData} loadSearch={loadSearch} name={trans("Login")} />
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                {trans("Don't have an account?")}

                <Link   className="text-purple-600 ml-4 underline hover:text-purple-700 focus:text-purple-700 transition duration-200 ease-in-out" to={pathes.register_form} >
                  <span >{trans("Register")}</span>

              </Link>
           
              </p>
            </div>
    </form> 
        </div>}
      </div>
    </div>
  </section>
  );
}
