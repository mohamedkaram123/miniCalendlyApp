import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function SuccessConfirm() {
    const location = useLocation();
    const [trans, i18n] = useTranslation();

 
  return (
    <div className="bg-slate-50	wrapper" style={{ direction:"ltr" }}>
    <div className="container  " id="content" style={{ width:"70%" }}>
          <div className='card mt-20 shadow-lg'>
              <div className='card-body '>
              <div className='d-flex flex-column '  >
                    <div className='w-100 d-flex flex-column' style={{ alignItems:"center",justifyContent:"center" }}>
                            <h5>{trans("Confirmed")}</h5>
                            <span>{trans("You are scheduled with") + " " +location.state.host_name }</span>
                    </div>
         
                    <hr />
                    <span style={{ fontWeight:800,fontSize:20,marginInline:20 }} >{location.state.name }</span>

                    <div className='d-flex flex-row mt-2' style={{ alignItems:"center" }}>
                      <i className="las la-calendar text-gray-700 mr-3" style={{ fontSize:24 }}></i>
                      <span style={{ fontWeight:800 }} className="text-gray-500">{location.state.event_date }</span>

                    </div>

                    <div className='d-flex flex-row mt-2'>
                    <i className="las la-globe text-gray-700 mr-3"  style={{ fontSize:24 }}></i>
                    <span style={{ fontWeight:800 }} className="text-gray-500">{location.state.time_zone }</span>

                  </div>

                  <div className='d-flex flex-row mt-2'>
                    <i className="las la-video text-gray-700 mr-3"  style={{ fontSize:24 }}></i>
                    <span style={{ fontWeight:800 }} className="text-gray-500">{trans("Web conferencing details to follow.")}</span>

                  </div>

                  <span className='mt-3 ml-4' style={{ fontWeight:600,fontSize:14 }} >{trans("A calendar invitation has been sent to your email address.") }</span>
                  <hr />

                  

              </div>
              


              </div>
          </div>
    </div>

 </div>
  )
}
