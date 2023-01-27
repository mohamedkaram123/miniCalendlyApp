import React, { useState } from 'react'
import { weeklyDays } from 'helper'
import WeeklyHoursCustomDay from './WeeklyHoursCustomDay';

export default function WeeklyHoursCustom() {
 
  
    const weeklyDayss= weeklyDays();

  return (
    <div className='d-flex flex-column'>
        {
            weeklyDayss.map((item,i)=>{
                return(
                  <WeeklyHoursCustomDay key={i}  item={item}  />
            )})
        }
    </div>
  )
}
