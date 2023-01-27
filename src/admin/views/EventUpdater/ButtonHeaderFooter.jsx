import BtnSendData from 'admin/forms/btnSendData';
import pathes from 'admin/urls';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ButtonHeaderFooter({next,cancel,loadSearch}) {
    const [trans, i18n] = useTranslation();
    const navigate = useNavigate();

  return (
    <div className='d-flex flex-row-reverse'>
      
        <BtnSendData onclick={next} name={trans("Save & Cancel")} loadSearch={loadSearch} classes='px-4 py-2 ml-2 font-semibold text-sm bg-purple-500 text-white rounded-full shadow-sm d-flex flex-row' />  
        <button onClick={() => navigate(-1)}  className='px-4 py-2  font-semibold text-sm bg-gray-100 text-purple-500 rounded-full shadow-sm'>{trans("Back")}</button>

    </div>
  )
}
