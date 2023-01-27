import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import WeeklyHoursCustom from './WeeklyHoursCustom';
import WeeklyHoursDefualt from './WeeklyHoursDefualt';

export default function SelectDaysTime({avalibility}) {

    const [trans, i18n] = useTranslation();
    const [choice_custom, setchoice_custom] = useState("custom")
  return (
    <div className='d-flex flex-column'>
        <div className='d-flex flex-row  mt-10 mb-10'>
            <button onClick={()=>{setchoice_custom("defualt")}} className={`inline-block mr-5 px-6 py-2 border-1 border-${choice_custom == "defualt"?"purple-600":"gray-100"} text-purple-600 font-medium text-xs leading-tight uppercase rounded-lg  hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
             >{trans("Use an existing schedule")}</button>

            <button onClick={()=>{setchoice_custom("custom")}} className={`inline-block px-6 py-2 border-1 border-${choice_custom == "custom"?"purple-600":"gray-100"} text-purple-600 font-medium text-xs leading-tight uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`} >
            {trans("Set custom hours")}</button>
        </div>

         {choice_custom == "defualt"?<WeeklyHoursDefualt/>:<WeeklyHoursCustom/>} 

  
    </div>
  )
}
