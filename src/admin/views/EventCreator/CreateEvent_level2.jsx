import React, { useState,useEffect,useRef } from "react";
import LoadingInline from 'HelperComponents/LoadingInline'
import { useTranslation } from 'react-i18next';
import InputData from "admin/forms/InputData";
import SelectData from "admin/forms/SelectData";
import TextAreaData from "admin/forms/TextAreaData";
import pathes from "admin/urls";
import { get } from "helper";
import DateRange from "./CreatorLevel2/DateRange";
import Duration from "./CreatorLevel2/Duration";
import SelectDaysTime from "./CreatorLevel2/SelectDaysTime";
import { useSelector } from "react-redux";

export default function CreateEvent_level2() {
    const [isLoading, setisLoading] = useState(true)
    const [trans, i18n] = useTranslation();
    const state = useSelector(state => state);
    var data_res = state.dataLevel1.res;

    const mounted = useRef(false)
    useEffect(() => {
  
        if (!mounted.current) {
        
            setisLoading(false)
          mounted.current = true;
        } else {
  
        }
  
    }, [])

    if(isLoading){
        return <LoadingInline />
    }else{
        return(
            <div className="ml-10">
               <DateRange />
               <hr />
               <Duration />
               <hr />
               <SelectDaysTime  />
            </div>
        )
    }

}
