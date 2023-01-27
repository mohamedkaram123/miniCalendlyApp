import React, { useState,useEffect,useRef } from "react";
import { post, Urls } from '../components/backend/urls';
import LoadingCircle from "../helpers/LoadingCircle";
import ImgForm from './componentForms/img_form'

export default function UploadFile({ name=false, error={}, onChange,edit=false, type,value= null,required=false,parent_class="",placeholder = name, id = type,error_class="", col_md = "6", col = "12", classes = "" }) {

    const [isLoading, setisLoading] = useState(edit)
    const [row, setrow] = useState()
    window.uploaderOnChange = (elem,value)=>{
        let event = { target: { value } };
        onChange(type,event,elem)
        $(`#prepend-data_${type}`).addClass("d-none")
    }



    $(document).on("click", `.remove-attachment`, function() {
        $(`#prepend-data_${type}`).removeClass("d-none")

    })

    const mounted = useRef(false)
    useEffect(() => {

        if (!mounted.current) {
            if(edit){
                call_row()
            }
            mounted.current = true;
        } else {

        }

    }, [])
    const call_row = ()=>{
        post(Urls.static_url+"upload/get_file",{id:value},res=>{
            setrow(res.data)
            setisLoading(false)
        },
        err=>{

        })
    }

    if(isLoading){
        return <div className="img-uploader"><LoadingCircle size={25} /></div>
    }else{
        return (
            <div className={`col-md-${col_md} mb-4 col-${col} ${parent_class}`}>
            {name?<label >{name} {required ? <span >*</span>:null}</label>:null}

                                        <div className="col-md-12">
                                            <div className="input-group" data-toggle="aizuploader" data-type="image"
                                                >
                                                <div id={`prepend-data_${type}`} className={`input-group-prepend ${edit?"d-none":""}`}>
                                                  <div htmlFor="#open-img"  className='img-uploader ' >
                                                  <img style={{ width:50,height:50 }} src={Urls.public_url + "assets/img/upload-image.png"} />
                                                  </div>
                                                    <div id='open-img' className="d-none input-group-text bg-soft-secondary font-weight-medium">
                                                       </div>
                                                </div>
                                                <input type="hidden" value={value} id="photos" name="photos" className="selected-files" />
                                            </div>
                                            <div className={`file-preview preview-${type} box sm`} style={{width:'fit-content' }}>
                                            {edit?(!isLoading?<ImgForm row={row} />:null):null}
                                            </div>
                                            {error[type] !== "" ?
                                            <small className={`require_data ${error_class}`}>{error[type]}</small>
                                            : null}
                                        </div>
                                    </div>
          )
    }

}
