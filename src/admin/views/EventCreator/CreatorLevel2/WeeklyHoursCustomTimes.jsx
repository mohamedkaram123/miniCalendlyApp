import SelectData from 'admin/forms/SelectData'
import { removeObjInArrayStateByKey } from 'helper'
import { insertObjInArrayState } from 'helper'
import { updateObjInArrayStateByKey } from 'helper'
import React, { useState } from 'react'

export default function WeeklyHoursCustomTimes({times,options_times,checkd_data,get_data}) {
    const [timesData, settimesData] = useState(times)

    const insertData = ()=>{
       let data =  insertObjInArrayState(settimesData,timesData,{
            from_time:"",
            to_time:""
        })
        get_data(data)
    }

    const removeData = (key)=>{
      var data =  removeObjInArrayStateByKey(settimesData,timesData,key)
      if(data.length == 0){
        checkd_data(false)
      }
      get_data(data)

    }
 
  return (
    <div className='d-flex flex-column w-100'>
       {timesData.map((item,i)=>{
  
        return(
          <div key={i} className='d-flex flex-row mt-3'>
          <SelectData col_md={2} col={2} options={options_times} value={item.from_time.substr(0,5)} onChange={(type,e)=>{
           let data =  updateObjInArrayStateByKey(settimesData,timesData,e.target.value,i,"from_time")
           get_data(data)

              }} type="from_time" />

           <span className='ml-2 mr-2'>-</span>

           <SelectData col_md={2} col={2} options={options_times} value={item.to_time.substr(0,5)} onChange={(type,e)=>{
           let data =  updateObjInArrayStateByKey(settimesData,timesData,e.target.value,i,"to_time")
           get_data(data)

              }} type="to_time" />

              <a onClick={insertData} className='text-purple-500 text-lg font-bold ml-4 cursor-pointer'><i className="las la-plus"></i></a>

              <a onClick={()=>removeData(i)} className='text-purple-500 text-lg font-bold ml-4 cursor-pointer'><i className="las la-trash"></i></a>

          </div>
       )})}
    </div>
  )
}
