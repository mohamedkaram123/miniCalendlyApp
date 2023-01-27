import React,{useState,useEffect,useRef} from 'react'
import Slider from 'admin/forms/Slider';
export default function BodySelections({ trans, roles_arrData, roles_array, role }) {
    
    const [checkRole, setcheckRole] = useState(roles_arrData.includes(role.role)?1:0)
 
  return (
      <Slider name={trans(role.title)} error={""} type={"main_role"+role.role} value={checkRole} onChange={(type, e) => {
                                                        if (roles_arrData.includes(role.role)) {
                                                             setcheckRole(0)
                                                       
                                                        } else {
                                                        setcheckRole(1)

                                                        }
                                                      roles_array(e,role.role)
                                                                    }} />
  )
}
