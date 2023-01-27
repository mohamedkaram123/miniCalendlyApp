
import pathes from "admin/urls";
import { make_toast_error } from "helper";
import { make_toast_success } from "helper";
import { error_state } from "helper";
import { post } from "helper";
import React, { useState,useEffect,useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import InputData from "admin/forms/InputData";
import TextAreaData from "admin/forms/TextAreaData";
import { get } from "helper";

import Swal from "sweetalert2";
import ButtonHeaderFooter from './ButtonHeaderFooter';
import LoadingInline from "HelperComponents/LoadingInline";
import LocationSelect from "admin/forms/componentForms/LocationSelect";

export default function CreateEventUpdate() {

  let location = useLocation();

  const [trans, i18n] = useTranslation();
  const state =location.state;
  const [loadSearch, setloadSearch] = useState(false)
  const [locations, setlocations] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate();

  const [data, setData] = useState({
    "name": state.name,
    "location_id": state.location.id,
    "disc": state.disc,
    "link": state.link,
    "id": state.id,


  });

  const [dataValid, setdataValid] = useState({
    "name": "",
    "location_id": "",
    "disc": "",
    "link": "",
  });

  const mounted = useRef(false)
  useEffect(() => {

      if (!mounted.current) {
        get_locations()
        mounted.current = true;
      } else {

      }

  }, [])

  const next = ()=>{
    setloadSearch(true)

     // let data = state;
       post(pathes.update_level1,data,res=>{
   
         make_toast_success(trans("the data is updated"))

         setloadSearch(false)
         navigate(pathes.home)
   
       },err=>{
         setloadSearch(false)
         error_state(setdataValid,dataValid,err.data)

       })
   // }
   
  }

 
   
  const setDatas = (type, e) => {
   
    if(type == "name"){
      setData((prevState) => ({
        ...prevState,
        "link": e.target.value,
        "name": e.target.value

    }));
    }else{
      setData((prevState) => ({
        ...prevState,
        [type]: e.target.value
    }));
    }
  

  }

  const get_locations = ()=>{
    get(pathes.get_locations,res=>{
      setlocations(res.data)
      setisLoading(false)
    })
  }    
if(isLoading){
    return <LoadingInline />
}else{
  return (
    <div>
    <ToastContainer  />  
        <div className='container' style={{ direction:"ltr" }}>
           <div className='card mt-20'>
              <div className='card-header bg-white' >
                <ButtonHeaderFooter next={next} loadSearch={loadSearch} />
              </div>

              <div className='card-body'  >
              <InputData parent_class="rounded-lg  mt-10" name={trans("Event Name")} required={true} col_md={6} col={6}  error={dataValid}  input_type="text"  type={`name`} value={data.name} onChange={setDatas} />
              <LocationSelect parent_class="rounded-lg mt-10"  name={trans("Choose Location")} options={locations} required={true} col_md={6} col={6}  error={dataValid}  type={`location_id`} value={data.location_id} onChange={setDatas}  />
              <TextAreaData parent_class="rounded-lg mt-10"  number_rows={6}  name={trans("Description Event")} col_md={6} col={6}  error={dataValid} type={`disc`} value={data.disc} onChange={setDatas}   />
              <InputData parent_class="rounded-lg  mt-10 mb-10" name={trans("Event Link")} required={true} col_md={6} col={6}  error={dataValid}  input_type="text"  type={`link`} value={data.link} onChange={setDatas} />

              </div>
              <div className='card-footer bg-white'>
                <ButtonHeaderFooter next={next}  loadSearch={loadSearch} />

              </div>
           </div>
        </div>
    </div>
  )
}
}
