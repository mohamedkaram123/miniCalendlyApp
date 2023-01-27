import { updateObjInArray } from 'helper';
import { removeObjInArray } from 'helper';
import { insertObjInArray } from 'helper';
import { get_by_day } from 'helper'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setDataLevel2 } from 'redux/actions/dataLevel2Actions';
import { ActionTypes } from 'redux/constans/action-type';
import WeeklyHoursCustomTimes from './WeeklyHoursCustomTimes'

export default function WeeklyHoursCustomDay({item}) {

  
    let location = useLocation();
    const state =location.state;

    var data_res = state;
    var avalibility = data_res.avalibility;
    
    const event_id = data_res.id
    const dispatch = useDispatch()

    const options_times =  data_res.options_times;
    const [day_data, setday_data] = useState(get_by_day(avalibility,item))

    const [trans, i18n] = useTranslation();

    const checkd_data = (checked)=>{
        if(checked){
            let day = get_by_day(avalibility,item);

            if(day != null){
                setday_data(day)
            }else{
                let obj = {
                    "day": item,
                    "event_id": event_id,
                    "times": [
                        {
                            "from_time": "09:00:00",
                            "to_time": "17:00:00"
                        }
                    ]
                };

                avalibility =   insertObjInArray(avalibility,obj)
                setday_data(obj)

            }
            
        }else{
            avalibility =  removeObjInArray(avalibility,day_data,"day")
            setday_data(null)
        }
    
        data_res["avalibility"] = avalibility;
        dispatch(setDataLevel2(data_res,{type:ActionTypes.SET_DATA_LEVEL2,payload:data_res}))

    }

    const get_data = (times)=>{
        
       let avalibilits =  updateObjInArray(avalibility,day_data,"times",times)
       data_res["avalibility"] = avalibilits;
       dispatch(setDataLevel2(data_res,{type:ActionTypes.SET_DATA_LEVEL2,payload:data_res}))

     
    }
  return (
    <div   className='d-flex flex-row mt-4 w-100' style={{ alignItems:"center" }}>

    <div className="form-check">
            <input className="form-check-input" onChange={(e)=>{
              checkd_data(e.target.checked)
            }} checked={day_data != null} type="checkbox" value="" id={`defaultCheck1${item}`} />
            <label className="form-check-label ml-10"  style={{ width:120 }} htmlFor={`defaultCheck1${item}`}>
            {item.toUpperCase()}
            </label>
        </div>
        {day_data != null?<WeeklyHoursCustomTimes get_data={get_data} checkd_data={checkd_data} times={day_data.times} options_times={options_times} />:<span className='text-center col-3'>{trans("Unavailable")}</span>}
    </div>
  )
}
