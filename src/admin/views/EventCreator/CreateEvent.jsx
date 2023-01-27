
import pathes from "admin/urls";
import { make_toast_error } from "helper";
import { make_toast_success } from "helper";
import { swalRemove } from "helper";
import { post } from "helper";
import React, { useState,useEffect,useRef } from "react";
import {InlineWidget} from 'react-calendly'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { dataErrorLevel1Actions } from "redux/actions/dataErrorLevel1Actions";
import { setDataLevel1 } from "redux/actions/dataLevel1Actions";
import { dataSuccessLevel1Actions } from "redux/actions/dataSuccessLevel1Actions";
import { ActionTypes } from "redux/constans/action-type";
import swal from "sweetalert";
import Swal from "sweetalert2";
import ButtonHeaderFooter from './ButtonHeaderFooter';
import CreateEvent_level1 from "./CreateEvent_level1";
import CreateEvent_level2 from "./CreateEvent_level2";

export default function CreateEvent() {
  const [trans, i18n] = useTranslation();
  const [switchCreator, setswitchCreator] = useState(1)
  const state = useSelector(state => state);
  const [loadSearch, setloadSearch] = useState(false)
  const dispatch = useDispatch()
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

    if(switchCreator == 2){
      setloadSearch(true)

      var data_req = state.dataLevel1.res;
      let check =  check_validate(data_req)
      if(!check){

        post(pathes.update_event,data_req,res=>{
          setloadSearch(false)
          navigate(pathes.home);
          make_toast_success(trans("the data is updated"))

        },
        err=>{
          make_toast_error(trans("please check data"))
          setloadSearch(false)

        })
      }else{
        setloadSearch(false)

      }

    }else{
      setloadSearch(true)

      let data = state.dataLevel1.data;
       post(pathes.store_event,data,res=>{
         dispatch(dataSuccessLevel1Actions(res.data,{type:ActionTypes.SET_DATA_SUCCESS_LEVEL1,payload:res.data}))
   
         make_toast_success(trans("the data is updated"))
         setloadSearch(false)
         setswitchCreator(2)
   
       },err=>{
         setloadSearch(false)
         dispatch(dataErrorLevel1Actions(err.data,{type:ActionTypes.SET_ERROR_DATA_LEVEL1,payload:err.data}))
   
       })
    }
   
  }

  const cancel = ()=>{
    Swal.fire({
      title: '? make sure you want cancel',
      icon: 'question',
      iconHtml: '؟',
      confirmButtonText: 'yes',
      cancelButtonText: 'no',
      showCancelButton: true,
      customClass: {
     
        confirmButton: 'bg-puple-500',
      
      },
      showCloseButton: true
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        navigate(pathes.home);

      }
      });
    
      
  }
  return (
    <div>
    <ToastContainer  />  
        <div className='container'>
           <div className='card mt-20'>
              <div className='card-header bg-white' >
                <ButtonHeaderFooter next={next} cancel={cancel} loadSearch={loadSearch} />
              </div>

              <div className='card-body'  >
                  {switchCreator == 1?<CreateEvent_level1 />:<CreateEvent_level2 />}
              </div>
              <div className='card-footer bg-white'>
                <ButtonHeaderFooter next={next} cancel={cancel} loadSearch={loadSearch} />

              </div>
           </div>
        </div>
    </div>
  )
}
