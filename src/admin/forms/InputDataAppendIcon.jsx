import { isArray } from 'lodash'
import React from 'react'

export default function InputDataAppendIcon({ name=false,icon="", error={}, onChange, type,value= null,disabled=false ,required=false,parent_class="",placeholder = name, id = type,error_class="", input_type = "text", col_md = "6", col = "12", classes = "" }) {


  return (
      <div className={`col-md-${col_md} col-${col} ${parent_class}`}>

      <div className='form-group'>
      {name?<label >{name} {required ? <span >*</span>:null}</label>:null}
      <div className="input-group">
            <input autoComplete={`new-${type}`}
                   id={type} disabled={disabled}
                   min={input_type == "number"?0:""}
                   type={input_type}
                   name={type}
                   value={value == null ? "" : value}
                   onChange={onChange.bind(this, type)}
                   placeholder={placeholder}
                   className={`form-control ${classes}`} />

            {isArray(icon)?(
                <div className='d-flex d-inline'>
                    {icon.map((Item,i)=>(<div key={i} className="input-group-append">
                    <Item />
                </div>))}
                </div>

            ):<div className="input-group-append">
            <span className="input-group-text">{icon}</span>
        </div>}

       </div>
       {error[type] !== "" ?<small className={`require_data ${error_class}`}>
              {error[type]}</small> : null}
      </div>

    </div>
  )
}
