import pathes from 'admin/urls';
import { Urls } from 'helper';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function EditEvent() {

  const [trans, i18n] = useTranslation();
  let location = useLocation();

  var event = location.state
  var img =   `${Urls.public}img/${event.location.key}.png`

  return (
    <div>
    <div style={{ borderBottom:"1px solid #eee",paddingInline:200 }} className="bg-white py-6 md:py-10 text-right w-100">
          <div className='d-flex flex-row justify-content-between' >
            <Link to={pathes.home} className='px-4 py-2  font-semibold text-md bg-white border-1 border-gray-300 text-purple-500 rounded-full shadow-md'>{trans("Back")}</Link>
            <Link to={pathes.new_event} className='px-4 py-2 font-semibold text-md bg-purple-500 text-white rounded-full shadow-sm'>{trans("New Event")}</Link>

          </div>
      </div>

      <div className="list-group mt-10" style={{ marginInline:100 }}>
        <Link to={pathes.edit_level1_event} state={event} type="button" style={{ padding:20 }} className="list-group-item list-group-item-action ">
            <div className='d-flex flex-column'>
               <span>{trans("What event is this?")}</span>
               <div className='d-flex flex-row' style={{ alignItems:"center" }}>
               <span>{event.name + " , "} </span>
               <img className='mx-2' style={{width:15,height:15}} src={img} />
               { event.location.title}
               </div>

            </div>
        </Link>
        <Link  to={pathes.edit_level2_event} state={event} type="button"  style={{ padding:20 }} className="list-group-item mt-3 list-group-item-action">
        <div className='d-flex flex-column'>
        <span>{trans("When can people book this event?")}</span>
        <div className='d-flex flex-row' style={{ alignItems:"center" }}>
        <i className="las la-calendar"></i>
        <span>{event.duration + "  " + (event.duration_type == "m"?"mins":"hr") + ", " +event.date_range+" "+ trans("rolling calendar days") } </span>

        </div>

     </div>
        </Link>

      </div>
    
    </div>
  )
}
