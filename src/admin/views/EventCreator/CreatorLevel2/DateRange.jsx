import React, { useState,useEffect,useRef } from "react";

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setDataLevel2 } from 'redux/actions/dataLevel2Actions'
import { ActionTypes } from 'redux/constans/action-type'

export default function DateRange() {
  const dispatch = useDispatch()
  const state = useSelector(state => state);
    var data_res = state.dataLevel1.res;

  const [range, setrange] = useState(data_res["date_range"])
  const [trans, i18n] = useTranslation(); 
  const [rangeType, setrangeType] = useState(data_res["date_range_custom"])



  const check_data = (type,range)=>{
  
        data_res["date_range_custom"]= type
        data_res["date_range"]= range

      dispatch(setDataLevel2(data_res,{type:ActionTypes.SET_DATA_LEVEL2,payload:data_res}))
  }

  return (
    <div className='d-flex flex-column mt-10 mb-10'>

        <div className="form-check d-flex flex-row" style={{alignItems:"center" }}>
        <input className="form-check-input ml-2" checked={rangeType == "cus"} onChange={()=>{
          check_data("cus",range)
          setrangeType("cus")
        }} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
         <input className='form-control  ml-2'  min={2}  value={range} onChange={(e)=>{
          check_data(rangeType,e.target.value)
          setrange(e.target.value)
        }} type={"number"} style={{ width:100 }} />
        <label className="form-check-label  ml-2" htmlFor="flexRadioDefault1">
           {trans("into the future")}
        </label>
      </div>
      <div className="form-check mt-7">
        <input className="form-check-input" checked={rangeType == "inf"} onChange={()=>{
          check_data("inf",range)
          setrangeType("inf")

        }}  type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
            {trans("Indefinitely into the future")}
        </label>
      </div>
    </div>
  )
}
