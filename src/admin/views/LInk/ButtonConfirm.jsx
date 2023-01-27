import pathes from 'admin/urls';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GuestData from './GuestData';

export default function ButtonConfirm({item,active, setactive,confirmData}) {

    const [trans, i18n] = useTranslation();
    
    if(active == item.value.substr(0, 5)){
        return(<div className='d-flex flex-row'>
        <button style={{ width:90 }} disabled={true} className=' px-3 py-1 mt-2  mr-2 font-semibold text-md bg-gray-500 text-white rounded-md shadow-sm'>{item.label}</button>
        <button onClick={()=>{confirmData(item.value)}} className=' px-3 py-1 mt-2  font-semibold text-md bg-purple-500 text-white rounded-md shadow-sm'>{trans("Confirm")}</button>

        </div>)
      
    }else{
        return (<button onClick={()=>setactive(item.value.substr(0, 5))} style={{ padding:50,fontSize:18,paddingInline:72 }} className={`center mt-2 inline-block mr-5 px-8 py-2 border-1 border-purple-600  text-purple-600 font-medium text-xs leading-tight uppercase rounded-md  hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
        >{item.label}</button>)
    }
}
