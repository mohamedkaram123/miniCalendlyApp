import { decryptLocalStorage,decryptCookieStorage } from './hash';
import axios from 'axios';
import $ from "jquery";
import { toast } from 'react-toastify';
import swal from 'sweetalert';

export const Urls = {
    "api": process.env.REACT_APP_API_URL,
    "public": process.env.REACT_APP_ASSEST_URL,
    "file": process.env.REACT_APP_API_URL,
}


// export const Urls = {
//     "static": "http://localhost/laraComerce2/api/",
//     "public": "http://localhost/laraComerce2/public/",
//     "file": "http://localhost/laraComerce2/"
// }


export const version = "2.5";

export const check_version = () => {
    var current_version = localStorage.getItem("version");
    if (current_version == null) {
        localStorage.clear();
        localStorage.setItem("version", version)
    } else if (current_version !== version) {
        localStorage.clear();
        localStorage.setItem("version", version)

    }
}


export const name = () => {
    return "Accounting";
}

export const phone = () => {
    return "+20010604554";
}

export const user = () => {
    return decryptCookieStorage("user")
}

export const company_type = () => {
    return user().company.company_type;
}

export const isAuth = () => {
    return !!user() ? true : false
}

export const checkAdmin = () => {
    if (!!user()) {
        if (user().type === "admin" || user().type === "employee") {
            return true
        }
        return false
    }
    return false
}

// export const getLang = () => {
//     var lang = localStorage.getItem("lang");
//     return !!lang ? lang : "ar";
// }

export const dir = () => {
    let langs = getLang();
    return langs === "ar" ? "rtl" : "ltr"
}

export const changeDirLang = () => {

    const lang = getLang();

    const dir = lang === "ar" ? "rtl" : "ltr";
    $("html").attr("dir", dir);
    $("html").attr("lang", lang);

}

export const putThemeBg = (bgColor) => {
    localStorage.setItem("bgColor", bgColor)
}

export const getThemeBg = () => {
    var bgColorTheme = localStorage.getItem("bgColor")
    return bgColorTheme !== null ? bgColorTheme : "white-content"
}


export const get_color_sidebar_Navbar = () => {
    return localStorage.getItem("sidbar-navbar-color")
}

export const dark_mode = () => {
    return localStorage.getItem("dark_mode")
}

export const putTheme = (bgColor) => {
    localStorage.setItem("color", bgColor)
}

export const getTheme = () => {
    var ColorTheme = localStorage.getItem("color")
    return ColorTheme !== null ? ColorTheme : "blue"
}


export const putLang = (lang) => {

    localStorage.setItem("lang", lang)
}

export const getLang = () => {
    var LangTheme = localStorage.getItem("lang")
    return LangTheme !== null ? LangTheme : "ar"
}

export const checkPath = () => {
    var path = window.location.pathname;
    return path === "/reactMandobee/";
}


export const addConfig = (configData) => {
    const config = {
        ...configData,
    };
    return config;
}

export const headers = () => {

    let config = {};
    if (isAuth()) {
        let token = user().token;
        config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "Accept-Language": getLang()
            }
        };

    } else {
        config = {
            headers: {
                "Accept-Language": getLang(),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS'

            }

        };
    }

    return config;


}


export const handleErorMsg = (RequiredDataObject, setState, setStateBtn, res) => {
    for (const [key, value] of Object.entries(RequiredDataObject)) {

        setState((prevState) => ({
            ...prevState,
            [key]: (key in res.msg) ? res.msg[key][0] : ""
        }));
        setStateBtn(false);

    }
}


export const setData = (type, e, setStateData) => {

    setStateData((prevState) => ({
        ...prevState,
        [type]: e.target.value
    }));

}

export const last_link = (path) => {
    return path;
}


export const check_branches = (permissions) => {


    let check_permsion = false;

    permissions.forEach(element => {
        check_permsion = user().permissions.includes(element);

    });

    return check_permsion;


}

export const return_dliverd_mony_status = (settlement) => {

    if (settlement.transfer == 1 && settlement.confirm == 1) {
        return "confirmed"
    } else if (settlement.transfer == 1 && settlement.confirm == 0) {
        return "transfered"
    } else if (settlement.transfer == 0 && settlement.confirm == 0) {
        return "pendding"
    }
}



export function post(url, data, success, error = null) {

    axios.post(url, data, headers())
        .then(function(res) {
            success(res.data)
        })
        .catch(function(err) {

          
            if(err.response.status == 401){

                deleteAllCookies()
               
            }
            // window.location.href = "reactMandobee/#/admin/error"

            try {
                error(err.response)

            } catch (error) {

            }
        })

}


export function get(url, success, error) {


    axios.get(url,headers())
        .then(function(res) {
            success(res.data)
        })
        .catch(function(err) {
           
            if(err.response.status == 401){
                deleteAllCookies()
            }
            // window.location.href = "reactMandobee/#/admin/error"

            error(err.response)
        })

}
export function error_state(setrequireState,requireState,error_data) {

for (const [key, value] of Object.entries(requireState)) {

    setrequireState((prevState) => ({
        ...prevState,
        [key]: (key in error_data) ? error_data[key][0] : ""
    }));
   // setbtnSave(false);
}
}

export function make_toast_success(title){
    toast(title, {
        style: {backgroundColor:"rgb(168 85 247 / var(--tw-bg-opacity))",color:"#fff"},
        progressStyle:{backgroundColor:"#fff"},
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}

export function make_toast_error(title){
    toast.error(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}

export function swalRemove(trans,destroy_url,data,update_table,title_error ="Are you sure?") {
   // const destroy_url = Urls.url + `products/destroy/${id}`;
swal({
title: trans[title_error],

icon: "warning",
buttons: trans["remove"],
dangerMode: true,


})
.then((willDelete) => {
if (willDelete) {

    post(destroy_url,data,res=>{
        update_table()

    },err=>{

    })


}
});
}


export function swalSuccess(title) {
    // const destroy_url = Urls.url + `products/destroy/${id}`;
 swal({
 title,

 icon: "success",
 dangerMode: false,
 buttons: false,
 timer: 2000,

 });
 }


 export function swalError(title) {
    // const destroy_url = Urls.url + `products/destroy/${id}`;
 swal({
 title,

 icon: "error",
 dangerMode: true,
 buttons: false,
 timer: 2000,

 });
 }

 export function setCookie(cname, cvalue, exdays=365) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  

 export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

export  function deleteAllCookies() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

}

export const updateObjInArrayStateByKey = (setDatas,datas,value,key,prop)=>{
   let data_model =  datas.map((item,i) =>
            i === key
            ? {...item, [prop] : value}
            : item
        )
    setDatas(data_model)
    return data_model;
}

export const updateObjInArrayState = (setDatas,datas,value,prop)=>{
    setDatas(
        datas.map(item =>
            item.prop === value
            ? {...item, [prop] : value}
            : item
    ))
}

export const updateObjInArrayState2 = (setDatas,datas,value,prop,id)=>{
    setDatas(
        datas.map(item =>
            item.id === id
            ? {...item, [prop] : value}
            : item
    ))
}
export const updateObjInArrayStateObj = (setDatas,datas,obj)=>{
    setDatas(
        datas.map(item =>
            item.id === obj.id
            ? obj
            : item
    ))
}
export const insertObjInArrayState = (setDatas,datas,obj)=>{
    let data_model = [...datas, obj];
    setDatas(data_model);
    return data_model;

}
export const removeObjInArrayState = (setDatas,datas,obj_removed,prop="id")=>{
    var data = datas.filter(item => item[prop]  !== obj_removed[prop]);
    setDatas(data);
    return data
  }

  export const removeObjInArrayStateByKey = (setDatas,datas,key)=>{
    var data = datas.filter((item,i) => i !== key);
    setDatas(data);
    return data
  }


  export const removeObjInArrayByKey = (datas,key)=>{
    var data = datas.filter((item,i) => i !== key);
    datas = data
    return data
  }

export const inArrayObj = (array,value,prop="id")=>{
   return array.find( item => item[prop] == value );
}

export function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }

  export function base64ImageToBlob(str) {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
    // decode base64
    var imageContent = atob(b64);
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);
    // fill the view, using the decoded base64
    for(var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });
    return blob;
  }

  export function weeklyDays(){
    return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  }

  export function get_by_day(avalibilties,day){
   
    let data_day =  avalibilties.filter(item=>item.day == day);
   
    return data_day.length > 0 ?data_day[0]:null;
  }

  export const insertObjInArray = (datas,obj)=>{
    datas = [...datas, obj]
    return datas;
}

export const removeObjInArray = (datas,obj_removed,prop="id")=>{
    const objWithIdIndex = datas.findIndex((obj) => obj[prop] == obj_removed[prop]);
    datas.splice(objWithIdIndex, 1);
    return datas
  }



export const updateObjInArray = (datas,obj,prop,value)=>{
  
    datas =   datas.map(item =>
            item.id === obj.id
            ? {...item, [prop] : value}
            : item
    )
    return datas;
}

export const slug_username = ()=>{
    return user().email.split("@")[0];
}



