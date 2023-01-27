import SelectData from 'admin/forms/SelectData'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setDataLevel2 } from 'redux/actions/dataLevel2Actions';
import { ActionTypes } from 'redux/constans/action-type';

export default function Duration() {
    const dispatch = useDispatch()
    const state = useSelector(state => state);
      var data_res = state.dataLevel1.res;
  
    const [duration, setduration] = useState(data_res["duration"])
    const [duration_type, setduration_type] = useState(data_res["duration_type"])
    const [trans, i18n] = useTranslation();

    var durations_type = [
        {
            value:"m",
            label:"min"
        },
        {
            value:"h",
            label:"hour"
        }
    ]    

    const setDatas = (duration,type)=>{
  
        data_res["duration_type"]= type
        data_res["duration"]= duration

      dispatch(setDataLevel2(data_res,{type:ActionTypes.SET_DATA_LEVEL2,payload:data_res}))
  }
  return (
    <div className='d-flex flex-column mt-10 mb-10'>
        <label className="form-check-label" htmlFor="flexRadioDefault2">
            {trans("Duration")}
        </label>
        <div className='d-flex flex-row'>
        <input className='form-control  mr-4' onChange={(e)=>{
            setduration(e.target.value)
            setDatas(e.target.value,duration_type)
        }} value={duration} type={"number"} min={1} style={{ width:100 }} />
        <SelectData col_md={2} col={2} clear={false} options={durations_type} value={duration_type} onChange={(type,e)=>{
            setDatas(duration,e.target.value)
            setduration_type(e.target.value)}} type="duration_type" />
    </div>
    </div>
   
  )
}
