import BtnSendData from 'admin/forms/btnSendData';
import InputData from 'admin/forms/InputData';
import TextAreaData from 'admin/forms/TextAreaData';
import pathes from 'admin/urls';
import { error_state } from 'helper';
import { post } from 'helper';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function GuestData({day_selected,value,event,time}) {

 
    const [trans, i18n] = useTranslation();
    const [loadingSearch, setloadingSearch] = useState(false)
    const [dataConfirm, setdataConfirm] = useState({})
    const navigate = useNavigate();

    const [data, setData] = useState({
        "name": "",
        "email": "",
        "event_date":"",
        "day":"",
        "event_id":event.id,
        "user_id":event.user.id,
        "notes":""
      });
    
    const [RequiredData, setRequiredData] = useState({
    "name": "",
    "email": "",
    });
    const setDatas = (type, e) => {
   
        setData((prevState) => ({
            ...prevState,
            [type]: e.target.value
        }));
    
      }

      const sendData = ()=>{
        setloadingSearch(true)
       let date  = make_date()
       data["event_date"] = date;
       data["day"] = day_selected;
  
       post(pathes.event_confirm_store,data,res=>{

        setloadingSearch(false)
        setdataConfirm(res.data)
        navigate(pathes.event_confirm,{state:res.data});

       },err=>{
        setloadingSearch(false)
        error_state(setRequiredData,RequiredData,err.data.data)
 
       })

      }

      const make_date = ()=>{
        let times = time.split(":");
        let hours = times[0];
        let mins = times[1];
       
        value.setHours(hours);
        value.setMinutes(mins);
   
        let mySqlTimestamp = new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate(),
            value.getHours() +2 ,
            value.getMinutes() , // add 30 minutes
            value.getSeconds(),
            value.getMilliseconds()
          ).toISOString().slice(0, 19).replace('T', ' ')
 
       
        return mySqlTimestamp;
      }
  return (
    <div className='d-flex flex-column'>
    <InputData parent_class="rounded-lg mt-10"  name={trans("Name")} required={true} col_md={12} col={12}  error={RequiredData}  input_type="text"  type={`name`} value={data.name} onChange={setDatas} />
    <InputData parent_class="rounded-lg mt-10"  name={trans("Email")} required={true} col_md={12} col={12}  error={RequiredData}  input_type="text"  type={`email`} value={data.email} onChange={setDatas} />
    <TextAreaData parent_class="rounded-lg mt-10"  number_rows={6}  name={trans("Please share anything that will help prepare for our meeting.")} 
     col_md={12} col={12}  error={RequiredData} type={`notes`} value={data.notes} onChange={setDatas}   />

    <BtnSendData onclick={sendData} name={trans("Schedule Event")} loadSearch={loadingSearch}
     classes='px-4 py-2 ml-2 w-fit  mt-4 font-semibold text-sm bg-purple-500 text-white rounded-lg shadow-sm d-flex flex-row center' />  


    </div>
  )
}
