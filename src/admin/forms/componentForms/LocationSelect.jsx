import { Urls } from 'helper';
import { lowerCase } from 'lodash';
import React, { useRef,useEffect} from 'react'
import Select from 'react-select';
export default function LocationSelect({name,error,options,value,menuPosition="",menue_direct="bottom",parent_class="",required=false,onChange,disabled=false,type,placeholder = name,id=type,col_md="6",col="12",classes=""}) {
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
color:"#333",


  }),
  menu: (provided, state) => ({
    ...provided,
    width: 200
   
  }),
}

const Option = (props) => {
    const { innerProps, innerRef } = props;
    var src_img = `${Urls.public}img/${props.data.key}.png`
    return(
      <>
      <div ref={innerRef} {...innerProps}  className='d-flex flex-row country-option w-100'>
        <img className='mx-2' style={{width:15,height:15}} src={src_img} />
        <span className='mx-2 ' >{props.data.label}</span>

      </div>
      </>
  )};
  return (
      <div className={`col-md-${col_md} col-${col} ${parent_class}`}>
        <div style={{zIndex:200}} className="form-group">
                <label>{name}  {required ? <span >*</span>:null}</label>          
                     <Select menuPosition={menuPosition}   menuPlacement={menue_direct} 
                             components={{ Option }}

                     inputProps={{ autoComplete: 'off',id:id }}
                     styles={customStyles}  
                     
                     value = {
                                    options.filter(option => 
                                        option.value === value)
                                  }

                                  options={options}
                                   onChange={(e) => {
                                      if (!e) {
                                            e = {
                                              target: inputRef,
                                              value: '',
                                            };
                                          }
                                    let event = { target: { value: e.value } };
                                                  onChange(type, event,e)
                                             }}  isClearable
                                                placeholder={placeholder}  />
        {error[type] !== "" ?
                              <small className="require_data">{error[type]}</small>
                              : null}
                {/* </div> */}
                </div>
    </div>
  )
}
