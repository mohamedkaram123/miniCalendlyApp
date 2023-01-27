import React, { useState,useEffect,useRef } from "react";
import LoadingInline from 'HelperComponents/LoadingInline'
import { useTranslation } from 'react-i18next';
import InputData from "admin/forms/InputData";
import SelectData from "admin/forms/SelectData";
import TextAreaData from "admin/forms/TextAreaData";
import pathes from "admin/urls";
import { get } from "helper";
import LocationSelect from "admin/forms/componentForms/LocationSelect";
import { setDataLevel1 } from "redux/actions/dataLevel1Actions";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "redux/constans/action-type";
import { error_state } from "helper";

export default function CreateEvent_level1() {

    const [trans, i18n] = useTranslation();
    const [locations, setlocations] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const dispatch = useDispatch()
    const state = useSelector(state => state);


    const [data, setData] = useState({
        "name": "",
        "location_id": "",
        "disc": "",
        "link": "",
    
      });
    
      const [dataValid, setdataValid] = useState({
        "name": "",
        "location_id": "",
        "disc": "",
        "link": "",
      });
      const mounted = useRef(false)
      useEffect(() => {
    
          if (!mounted.current) {
            get_locations()
            mounted.current = true;
          } else {
    
          }
    
      }, [])
    
      useEffect(() => {
        if("err" in state.dataLevel1 ){
          let error_data = state.dataLevel1.err.data;
          error_state(setdataValid,dataValid,error_data)

        }
    }, [state])
    
      const setDatas = (type, e) => {
        if(type == "name"){
          setData((prevState) => ({
            ...prevState,
            "link": e.target.value,
            "name": e.target.value
    
        }));
        }else{
        setData((prevState) => ({
            ...prevState,
            [type]: e.target.value
        }));
      }
         data[type]= e.target.value
        dispatch(setDataLevel1(data,{type:ActionTypes.setDataLevel1,payload:data}))

      }
    
      const get_locations = ()=>{
        get(pathes.get_locations,res=>{
          setlocations(res.data)
          setisLoading(false)
        })
      }    
    if(isLoading){
        return <LoadingInline />
    }else{
        return(
            <div className="ml-10">
                <InputData parent_class="rounded-lg  mt-10" name={trans("Event Name")} required={true} col_md={6} col={6}  error={dataValid}  input_type="text"  type={`name`} value={data.name} onChange={setDatas} />
                <LocationSelect parent_class="rounded-lg mt-10"  name={trans("Choose Location")} options={locations} required={true} col_md={6} col={6}  error={dataValid}  type={`location_id`} value={data.location_id} onChange={setDatas}  />
                <TextAreaData parent_class="rounded-lg mt-10"  number_rows={6}  name={trans("Description Event")} col_md={6} col={6}  error={dataValid} type={`disc`} value={data.disc} onChange={setDatas}   />
                <InputData parent_class="rounded-lg  mt-10 mb-10" name={trans("Event Link")} required={true} col_md={6} col={6}  error={dataValid}  input_type="text"  type={`link`} value={data.link} onChange={setDatas} />

            </div>
        )
    }

}
