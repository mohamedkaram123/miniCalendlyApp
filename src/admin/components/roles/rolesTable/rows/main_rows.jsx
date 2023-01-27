import React from 'react'
import Row1 from './row1'
import { useTranslation } from "react-i18next";


export default function MainRows({ i, cell, row, editRoles,swalRemove }) {
         const [trans,i18n] = useTranslation();

    switch (i) {
        case 3:

       return (
           <td style={{ textAlign: "center" }} key={i} {...cell.getCellProps()}>{
               <div className="d-flex flex-row" style={{justifyContent:"center"}}>
                       <button style={{marginInline:10}} onClick={() => { editRoles(row.original) }} type="button" className="btn btn-sm btn-circle btn-success btn-icon "  >
                                  <i className="las la-cog"></i>
                   </button>
                     <button onClick={() => { swalRemove(row.original.id) }} type="button" className="btn btn-sm btn-circle btn-danger btn-icon "  >
                                  <i className="las la-trash"></i>
               </button>
                   </div>
           
               
        }</td>
       )
        
        default:
               return (
        <td style={{textAlign:"center"}} key={i} {...cell.getCellProps()}>{
            cell.render("Cell")
        }</td>
    )
    }


}
