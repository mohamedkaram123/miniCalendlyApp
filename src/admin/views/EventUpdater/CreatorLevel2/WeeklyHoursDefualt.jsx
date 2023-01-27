import React from 'react'
import { useSelector } from 'react-redux';
import { weeklyDays } from 'helper'
import { get_by_day } from 'helper';
import WeeklyHoursDefaultTimes from './WeeklyHoursDefaultTimes';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function WeeklyHoursDefualt() {
    let location = useLocation();
  const state =location.state;

  var data_res = state;
    const avalibility = data_res.avalibility;
    const options_times = data_res.options_times;
    const [trans, i18n] = useTranslation();

    const weeklyDayss= weeklyDays();

  return (
    <div className='d-flex flex-column'>
        {
            weeklyDayss.map((item,i)=>{
                let day_data = get_by_day(avalibility,item)
 
                return(
                <div  key={i}  className='d-flex flex-row mt-4 w-100' style={{ alignItems:"center" }}>
                    <label className='ml-10' style={{ width:120 }}>{item.toUpperCase()}</label>
                    {day_data != null?<WeeklyHoursDefaultTimes times={day_data.times} options_times={options_times} />:trans("Unavailable")}
                </div>
            )})
        }
    </div>
  )
}
