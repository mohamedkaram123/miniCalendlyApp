import React, { useRef,useEffect} from 'react'
import Select from 'react-select';
export default function SelectDataMulti({name,error,options,value,postion=null,menue_direct="bottom",parent_class="",required=false,onChange,disabled=false,type,placeholder = name,id=type,col_md="6",col="12",classes=""}) {
  const inputRef = useRef(null);
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
color:"#333"
  }),
 
}
  return (
      <div className={`col-md-${col_md} col-${col} ${parent_class}`}>
        <div style={{zIndex:200}} className="form-group">
                <label>{name}  {required ? <span style={{ color: "red" }}>*</span>:null}</label>
                {/* <div className="input-group">
                <div className="input-group-prepend">
                <span className="input-group-text" style={{background:"#fff"}}>
                <i className="las la-phone-alt"></i>
                    </span>
                </div> */}
                     <Select menuPosition={postion}   menuPlacement={menue_direct} 
          inputProps={{ autoComplete: 'off', id: id }} isDisabled={type == "order_direction" ? true : disabled} styles={customStyles}
          
             value={options.filter((item) => value.includes(item.value))}
          onChange={(val) =>
          {
              let ids = [];
    val.forEach(element => {
      ids = [element.value,...ids]
    });
onChange(type, ids)
   // return ids
            }
            }
          isClearable
                                                placeholder={placeholder} options={options} isMulti />
        {error[type] !== "" ?
                              <small className="require_data">{error[type]}</small>
                              : null}
                {/* </div> */}
                </div>
    </div>
  )
}
