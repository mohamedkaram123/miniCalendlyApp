import React from 'react'

export default function TextAreaData({ name = false, error={}, parent_class="",onChange, type,number_rows=3,value= null ,required=false,placeholder = name, id = type,  col_md = "6", col = "12", classes = "" }) {


  return (
      <div className={`col-md-${col_md} col-${col} ${parent_class}`}>
        <div className="form-group">
       {name?<label >{name} {required ? <span >*</span>:null}</label>:null}
                {/* <div className="input-group">
                <div className="input-group-prepend">
                <span className="input-group-text" style={{background:"#fff"}}>
                <i className="las la-phone-alt"></i>
                    </span>
                </div> */}
        <textarea rows={number_rows} id={type} value={ value == null ? "" : value} onChange={onChange.bind(this, type)} placeholder={placeholder} className={`form-control ${classes}`} ></textarea>
                {error[type] !== "" ?
                              <small className="require_data">{error[type]}</small>
                              : null}
                {/* </div> */}
                </div>
    </div>
  )
}
