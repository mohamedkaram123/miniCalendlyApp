import pathes from "admin/urls";
import { post } from "helper";
import LoadingInline from "HelperComponents/LoadingInline";
import React, { useState,useEffect,useRef } from "react";
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import "./callender_overwrite.css";
import { now } from "moment";
import { weeklyDays } from "helper";
import { useTranslation } from "react-i18next";
import ButtonsTime from "./ButtonsTime";
import GuestData from "./GuestData";

export default function CalendlyLink() {
    const {user_name,slug} = useParams();
    const [isLoading, setisLoading] = useState(true)
    const [value, setValue] = useState(new Date(now()));
    const [day_selected, setDay_selected] = useState();
    const [trans, i18n] = useTranslation();
    const [times, settimes] = useState([])
    const [event, setEvent] = useState({});
    const [switchEventConfirm, setswitchEventConfirm] = useState(1)
    const [time_date, setTime_date] = useState("")
    const [loadingBtns, setloadingBtns] = useState(true)

    const mounted = useRef(false)
    useEffect(() => {
  
        if (!mounted.current) {
            get_event(slug)
          mounted.current = true;
        } else {
  
        }
  
    }, [])

    const confirmData = (value)=>{
        setTime_date(value)

        setswitchEventConfirm(2)
    }

    const get_event = (slug)=>{
        post(pathes.get_event,{slug},res=>{
            setValue(new Date(res.data.created_at))
            let day =get_day_from_day(new Date(res.data.created_at))
            setDay_selected(day)
            setEvent(res.data)
            get_all_times(res.data,day)

        })
    }

    const get_all_times = (event,day)=>{
        post(pathes.times_event,{id:event.id,day},res=>{
      
            settimes(res.data)
            setloadingBtns(false)
            setisLoading(false)

        })
    }
    

    const get_day_from_day = (date)=>{
            let day_number = date.getDay();
            let day =  weeklyDays()[day_number]
            return day;
    } 
    const check_start_day =  ({activeStartDate, date, view }) => {
     
       
        let startDate = new Date(event.created_at);
        let endDate =  new Date( new Date(event.created_at).setDate(startDate.getDate() + event.date_range)) ;

        let day = get_day_from_day(date);
        let days = event.days;
        let  check = false
        date = new Date(date.setHours(date.getHours() + 5));
        
        if(event.date_range_custom == "inf"){

            if(view == "month"){
                if(date < startDate || !days.includes(day)){
                    check = true
                }
               }
       }else{
            if(view == "month"){
            
                if(date < startDate || date > endDate || !event.days.includes(day)){
                    check = true
                }
            }
        }

     
        if(date.toString().substr(0,17) == startDate.toString().substr(0,17)){
            check = false
        }

       return check
    }

    if(isLoading){
       return <LoadingInline />
    }else{
        if(event.active == "on"){
            return (
                <div className="bg-slate-50	wrapper" style={{ direction:"ltr" }}>
                   <div className="container  " id="content" style={{ width:"70%" }}>
                        <div className="card-group shadow-lg mt-20">
                            <div className="card" style={{ wordWrap:"unset",flex:"0.4" }}>
                                <div className="card-body">
                                <span className="card-title text-gray-400" >{event.user.name}</span>
                                <h5 className="card-title">{event.name}</h5>
                                <div className="text-geay-600 d-flex flex-row" style={{ fontWeight:800,alignItems:"center" }}>
                                    <i className="las la-clock la-1x mr-4"></i> 
                                    <span>{event.duration + " " + (event.duration_type == "m"?"min":"hour")}</span>
                                </div>
                                <div className="text-geay-600 d-flex flex-row mt-2" style={{ fontWeight:800,alignItems:"start" }}>
                                        <i className="las la-video la-1x mr-4 " style={{ fontWeight:800 }}></i>
                                        <span>{trans("Web conferencing details provided upon confirmation.")}</span>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="card" style={{ flex:"0.6"  }}>
                                <div className="card-body w-100">
                                {switchEventConfirm == 1? <div className="d-flex flex-row">
                                <Calendar tileDisabled={check_start_day} onChange={(e)=>{
                                    setValue( e)
                                    setDay_selected(get_day_from_day(e))
                                    get_all_times(event,get_day_from_day(e))
                                }}   value={value} />
    
                                {loadingBtns?<LoadingInline />:<ButtonsTime confirmData={confirmData} times={times} />}
                            </div>:<GuestData time={time_date} day_selected={day_selected} event={event} value={value}  />}
                               
                                    
                                </div>
                            </div>
    
                        </div>
                   </div>
    
                </div>
              )
        }else{
            return (
                <div className="bg-slate-50	wrapper" style={{ direction:"ltr" }}>
                <div className="container  mt-20" id="content" style={{ width:"70%" }}>
                         <div className="card" style={{ height:400 }}>
                            <div className="d-flex flex-column" style={{ alignItems:"center" }}>
                                <h1>{event.user.name}</h1>
                                <h5>This miniCalendly URL is not valid.</h5>

                                <span className="mt-5">If you are the owner of this account, you can <a className="text-purple-500 underline" href={pathes.login_form}>Log In</a> to find out more.</span>
                            </div>
                             
                         </div>
                      
                </div>
 
             </div>
            )
        }
       
    }

}
