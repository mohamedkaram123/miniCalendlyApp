import pathes from 'admin/urls';
import { encrypt } from 'hash';
import { slug_username } from 'helper';
import { user,post } from 'helper';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function CardCalendly({item}) {
    let location = useLocation();

    const [trans, i18n] = useTranslation();
    const [copyIcon, setcopyIcon] = useState("las la-copy")
    const [turn, setturn] = useState(item.active)
    const navigate = useNavigate();

    const handleCLick = (click =true)=>{
        navigate(pathes.edit_event,{state:item})
    }

    const turn_event = (val)=>{
        post(pathes.turn_event,{
            id:item.id,
            active:val
        },res=>{
            setturn(val)

        })
    }
  return (
        <div className="col-4 mt-4 cursor-pointer">
            <div   className={`block rounded-sm z-0  shadow-md bg-${turn == "on"?"white":"gray"} max-w-sm text-center`}>
          
            <div onClick={handleCLick} className="p-4 text-left">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{item.name}</h5>
                <p  className="text-gray-500 font-bold text-base mb-2">
                  {item.duration + " "+ (item.duration_type == "m"?"mins,":"hours")}
                </p>
            </div>
            <div className='pb-4 w-100 text-left ml-4'>
            <a  href={pathes.base_path  + `/${slug_username()}/${item.link}`} 
            className='mb-2 link_card_click text-purple-600 link-primary underline'>{trans("View booking page")}</a>

            </div>
            
            <div className="py-3 z-10 px-6 border-t border-gray-300 text-gray-600">
                <div className='d-flex flex-row' style={{ justifyContent:"space-between",alignItems:"center" }}>
                <a href='#' onClick={(e)=>{
                    let link = item.link;
                    e.preventDefault()
                    navigator.clipboard.writeText(pathes.base_path + `/${slug_username()}/${link}`);
                    setcopyIcon("las la-check")
                    setTimeout(() => {
                        setcopyIcon("las la-copy")

                    }, 5000);

                }} className=' text-purple-600 '><i className={copyIcon}></i> {trans("Copy Link")} </a>

                <button onClick={()=>{
                    if(turn == "on"){
                        turn_event("off")
                    }else{
                        turn_event("on")
                    }
                    }} className={`inline-block mr-5 px-6 py-2 border-1 border-${turn == "on"?"purple-600 text-purple-600 ":"gray-500 bg-gray-200 text-black-400"} font-medium text-xs leading-tight uppercase rounded-full  hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
                  >{trans(`Turn ${turn == "on"?"Off":"On"}`)}</button>

                </div>
            </div>
            </div>
    </div>
  )
}
