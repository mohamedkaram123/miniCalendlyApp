import React from 'react'
import { useSelector } from 'react-redux';
import { weeklyDays } from 'helper'
import { get_by_day } from 'helper';
import WeeklyHoursDefaultTimes from './WeeklyHoursDefaultTimes';
import { useTranslation } from 'react-i18next';

export default function WeeklyHoursDefualt() {
    const avalibility = useSelector(state => state.dataLevel1.res.avalibility);
    const options_times = useSelector(state => state.dataLevel1.res.options_times);
    const [trans, i18n] = useTranslation();

    const weeklyDayss= weeklyDays();

  return (
    <div className='d-flex flex-column'>
        {
            weeklyDayss.map((item,i)=>{
                let day_data = get_by_day(avalibility,item)
 
                return(
                <div  key={i}  className='d-flex flex-row mt-4 w-100' style={{ alignItems:"center" }}>
                    <label className='mr-10' style={{ width:120 }}>{item.toUpperCase()}</label>
                    {day_data != null?<WeeklyHoursDefaultTimes times={day_data.times} options_times={options_times} />:trans("Unavailable")}
                </div>
            )})
        }
    </div>
  )
}
