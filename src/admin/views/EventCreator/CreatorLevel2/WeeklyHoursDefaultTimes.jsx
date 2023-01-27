
import React, { useState } from 'react'

export default function WeeklyHoursDefaultTimes({times,options_times}) {
    const [timesData, settimesData] = useState(times)


 
  return (
    <div className='d-flex flex-column w-100'>
       {timesData.map((item,i)=>{
  
        return(
          <div  key={i}  className='d-flex flex-row mt-3'>
             <span>{item.from_time}</span>
             <span className='ml-2 mr-2'>-</span>
              <span>{item.to_time}</span>
          </div>
       )})}
    </div>
  )
}
