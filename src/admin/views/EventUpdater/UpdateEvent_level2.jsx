import React, { useState,useEffect,useRef } from "react";
import LoadingInline from 'HelperComponents/LoadingInline'
import { useTranslation } from 'react-i18next';
import InputData from "admin/forms/InputData";
import SelectData from "admin/forms/SelectData";
import TextAreaData from "admin/forms/TextAreaData";
import pathes from "admin/urls";
import { get } from "helper";
import DateRange from "./CreatorLevel2/DateRange";
import Duration from "./CreatorLevel2/Duration";
import SelectDaysTime from "./CreatorLevel2/SelectDaysTime";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "helper";
import { error_state } from "helper";
import ButtonHeaderFooter from "./ButtonHeaderFooter";
import { make_toast_success } from "helper";
import { make_toast_error } from "helper";
import { ToastContainer } from "react-toastify";

export default function UpdateEvent_level2() {
    const [isLoading, setisLoading] = useState(true)
    const [trans, i18n] = useTranslation();
    let location = useLocation();
    const state =location.state;

    var data_res = state;

    const mounted = useRef(false)
    useEffect(() => {
  
        if (!mounted.current) {
        
            setisLoading(false)
          mounted.current = true;
        } else {
  
        }
  
    }, [])


 
    const [loadSearch, setloadSearch] = useState(false)
    const navigate = useNavigate();
 
    const check_validate = (data)=>{

      let check = false;
      if(data.date_range <= 0 ){
        check=true
        make_toast_error(trans("please enter date range"))
      }
  
      if(data.duration <= 0 ){
        check=true
        make_toast_error(trans("please enter duration"))
      }
  
      if(data.avalibility.length > 0){
        data.avalibility.forEach(item => {
           if(item.times.length > 0){
            item.times.forEach((time,i) => {
               if(time.from_time  > time.to_time){
                make_toast_error(trans(`Choose an end time later than the start time for day ${item.day}  for item ${i+1}`))
                check=true

              }
               if(time.from_time  == ""){
                make_toast_error(trans(`please enter from time for day ${item.day} for item ${i+1}`))
                check=true
 
              }
               if(time.to_time  == ""){
                make_toast_error(trans(`please enter to time for day ${item.day} for item ${i+1}`))
                check=true
 
              }
            });
           }else{
            make_toast_error(trans(`please enter times for day ${item.day}`))
            check=true

           }
        });
      }else{
        make_toast_error(trans("please enter days in week"))
        check=true

      }
  
      return check;
    }
    
  
    const next = ()=>{
      var data_req = state;
      let check =  check_validate(data_req)
      if(!check){
       // let data = state;
       setloadSearch(true)

         post(pathes.update_event,data_req,res=>{
          setloadSearch(false)
          navigate(pathes.home);
          make_toast_success(trans("the data is updated"))

     
         },err=>{
           setloadSearch(false)
           make_toast_error(trans("please check data"))
  
         })
        }
     // }
     
    }
  

 

    if(isLoading){
        return <LoadingInline />
    }else{
        return(
            <div>
            <ToastContainer  />  
                <div className='container' style={{ direction:"ltr" }}>
                   <div className='card mt-20'>
                      <div className='card-header bg-white' >
                        <ButtonHeaderFooter next={next} loadSearch={loadSearch} />
                      </div>
        
                      <div className='card-body'  >
                            <div className="ml-10">
                            <DateRange />
                            <hr />
                            <Duration />
                            <hr />
                            <SelectDaysTime  />
                        </div>
                      </div>
                      <div className='card-footer bg-white'>
                        <ButtonHeaderFooter next={next} loadSearch={loadSearch} />
        
                      </div>
                   </div>
                </div>
            </div>
          
        )
    }

}
