import React from 'react'

export default function Slider({name,error={},value,required=false,onChange,type,id=type,col_md="6",col="12",classes=""}) {
  return (
      <div className={`col-md-${col_md} col-${col}`}>
        <div className="form-group">
            
                              {/* <label >{name}  {required ? <span style={{ color: "red" }}>*</span>:null}</label> */}

              <div className={`custom-control custom-switch ${classes}`}>
                  <input checked={value == 1} onChange={(e) => {
                     let event = {target:{value:0}};
                      if (e.target.checked) {
                            event = {target:{value:1}};
                      } else {
                            event = {target:{value:0}};
                      }
                      onChange(type,event)

                }} type="checkbox" className="custom-control-input" id={id} />
                <label className="custom-control-label" htmlFor={id}>{name}  {required ? <span style={{ color: "red" }}>*</span>:null}</label>

                </div>
                   {error[type] !== "" ?
                              <small className="require_data">{error[type]}</small>
                              : null}
                </div>
    </div>
  )
}
