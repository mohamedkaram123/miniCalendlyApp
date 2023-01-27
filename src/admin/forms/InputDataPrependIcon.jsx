import React from 'react'

export default function InputDataPrependIcon({ name=false,icon="", error={}, onChange, type,value= null,disabled=false ,required=false,parent_class="",placeholder = name, id = type,error_class="", input_type = "text", col_md = "6", col = "12", classes = "" }) {


  return (
      <div className={`col-md-${col_md} col-${col} ${parent_class}`}>

      <div className='form-group'>
      {name?<label >{name} {required ? <span >*</span>:null}</label>:null}
      <div className="input-group">

           <div className="input-group-prepend">
              <span className="input-group-text">{icon}</span>
          </div>
            <input autoComplete={`new-${type}`}
                   id={type} disabled={disabled}
                   min={input_type == "number"?0:""}
                   type={input_type}
                   value={value == null ? "" : value}
                   onChange={onChange.bind(this, type)}
                   placeholder={placeholder}
                   className={`form-control ${classes}`} />
              {error[type] !== "" ?<small lassName={`require_data ${error_class}`}>
              {error[type]}</small> : null}

       </div>
      </div>

    </div>
  )
}
