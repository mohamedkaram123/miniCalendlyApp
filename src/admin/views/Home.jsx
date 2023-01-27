import pathes from 'admin/urls'
import { user } from 'helper';
import { get } from 'helper';
import LoadingInline from 'HelperComponents/LoadingInline';
import React, { useState,useEffect,useRef } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import CardCalendly from './calendlyCards/CardCalendly';

export default function Home() {

    const [trans, i18n] = useTranslation();
    const [eventsUser, seteventsUser] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const mounted = useRef(false)
    useEffect(() => {
  
        if (!mounted.current) {
          get_events()
          mounted.current = true;
        } else {
  
        }
  
    }, [])

    const get_events = ()=>{
      get(pathes.events_user,res=>{
        seteventsUser(res.data)
        setisLoading(false)
      })
    }
  return (
    <div>
    <ToastContainer  />  

        <div style={{ borderBottom:"1px solid #eee" }} className="bg-white py-6 md:py-10 text-right pr-60">
            <Link to={pathes.new_event} className='px-4 py-2  font-semibold text-md bg-purple-500 text-white rounded-full shadow-sm'>{trans("New Event")}</Link>
        </div>

        <div className='container' style={{ paddingInline:150}}>

        <div className='d-flex flex-column mt-20'>
        <h5 className="text-gray-600 text-md font-medium mb-2">{user().name}</h5>
        <span className="text-gray-600 text-md font-medium mb-2">{user().email}</span>

        </div>
        <hr />
            {isLoading?<LoadingInline />:<div className='row mb-4'>
              {eventsUser.map((item,i)=>(
                 <CardCalendly key={i} item={item} />
              ))}
            </div>}
             
        </div>
    </div>
  )
}
