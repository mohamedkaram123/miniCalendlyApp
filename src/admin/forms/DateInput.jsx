import React from 'react'
import {rtl} from '../components/backend/urls';

export default function DateInput({ name=false, error={}, onChange, type,value= null,disabled=false ,required=false,parent_class="",placeholder = name, id = type,error_class="", col_md = "6", col = "12", classes = "" }) {

   var obj_options = rtl()?{
    closeText: 'إغلاق',
    // prevText: '&#x3C;',
    // nextText: '&#x3E;',
    currentText: 'اليوم',
    changeMonth: true,
    changeYear: true,
    monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر',	'أكتوبر', 'نوفمبر', 'ديسمبر'],
    monthNamesShort: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر',	'أكتوبر', 'نوفمبر', 'ديسمبر'],
    dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesShort: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    weekHeader: 'أسبوع',
    dateFormat: 'yy-mm-dd',
    firstDay: 6,
    isRTL: true,

    showMonthAfterYear: false,
    yearSuffix: '',
    onSelect:(val)=>{
        let event = { target: { value: val} };
        onChange(type, event,val)

    }
        }:{
            changeMonth: true,
            changeYear: true,
            onSelect:(val)=>{
                let event = { target: { value: val} };
                onChange(type, event,val)

            }
        }
    $(`#${type}`).datepicker(obj_options);

    return (
        <div className={`col-md-${col_md} col-${col} ${parent_class}`}>
          <div className="form-group">
          {name?<label >{name} {required ? <span style={{ color: "red" }}>*</span>:null}</label>:null}
                  {/* <div className="input-group">
                  <div className="input-group-prepend">
                  <span className="input-group-text" style={{background:"#fff"}}>
                  <i className="las la-phone-alt"></i>
                      </span>
                  </div> */}
                <input autoComplete={`new-${type}`}
   id={type} disabled={disabled} onChange={()=>{}} type="text" value={value == null ? "" : value}  placeholder={placeholder} className={`form-control date-type ${classes}`} />
                  {error[type] !== "" ?
                                <small className={`require_data ${error_class}`}>{error[type]}</small>
                                : null}
                  {/* </div> */}
                  </div>
      </div>
    )
}
