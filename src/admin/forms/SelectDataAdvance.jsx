import React, { useRef,useEffect, useState} from 'react'
import Select from 'react-select';
export default function SelectDataAdvance({name=false,clear=true,error={},options,defualtValue=false,value,postion=null,menue_direct="bottom",parent_class="",required=false,onChange,disabled=false,type,placeholder = name,id=type,col_md="6",col="12",classes=""}) {
  const inputRef = useRef(null);
  const [val_selected, setval_selected] = useState(options.filter(option =>
    option.value === value))
  const  handleChange = (event)=>{


    if (!event) {
      event = {
        target: inputRef,
        value: '',
      };
    }
    onChange(event);
  }

  const customStyles = {
  option: (provided, state) => ({
    ...provided,
color:"#333",
margin:0,
padding:"4px 8px",

placeholder
  }),
  menuList:(provided, state) => ({
    ...provided,
    height:150,
    zIndex: 99999

 }),
 menu:(provided, state) => ({
    ...provided,
    height:150,
    zIndex: 99999

 }),

}
  return (
      <div className={`col-md-${col_md}  col-${col} ${parent_class}`}>
        <div style={{zIndex:200,}} className="form-group">
               {name?<label>{name}  {required ? <span >*</span>:null}</label>:null}
                {/* <div className="input-group">
                <div className="input-group-prepend">
                <span className="input-group-text" style={{background:"#fff"}}>
                <i className="las la-phone-alt"></i>
                    </span>
                </div> */}
                     <Select menuPosition={postion}   menuPlacement={menue_direct}
                     inputProps={{ autoComplete: 'off',id:id }} isDisabled={type == "order_direction"?true:disabled}  styles={customStyles}
                     value = {val_selected}
                                   onChange={(e) => {
                                    setval_selected(
                                        options.filter(option =>
                                            option.value === e.value)
                                        )

                                      if (!e) {
                                            e = {
                                              target: inputRef,
                                              value: '',
                                            };
                                          }
                                    let event = { target: { value: e.value } };

                                                  onChange(type, event,e)

                                             }}   isClearable={clear}
                                                placeholder={placeholder} options={options} />
        {error[type] !== "" ?
                              <small className="require_data">{error[type]}</small>
                              : null}
                {/* </div> */}
                </div>
    </div>
  )
}
