import React, { useState} from 'react'
import { Modal ,Button} from 'react-bootstrap';
import { Urls } from 'helper'; 
import InputData from 'admin/forms/InputData';
import SelectData from 'admin/forms/SelectData';
import { setData } from 'helper';
import { post } from 'helper';
import { roleses } from '../../roles';
import BodySelections from './BodySelections';
export default function EditRoles({ show, handleClose,handleSave, trans, roles,row }) {

  const [btnSave, setbtnSave] = useState(false)
  const [roles_arrData, setroles_arrData] = useState(row.permissions)
  const [rolesData, setrolesData] = useState({
    "name_ar": row.name_ar,
    "name_en":row.name_en,
    "permissions": row.permissions,
    "id":row.id
   
  })
    const [RequiredrolesData, setRequiredrolesData] = useState({
       "name_ar": "",
    "name_en": "",
    "permissions":""

})

  const setData = (type, e) => {

    setrolesData((prevState) => ({
        ...prevState,
        [type]: e.target.value
    }));

  }
    const roles_array = (e,id) => {
    if (e.target.value == 1) {
            setroles_arrData([...roles_arrData, id]);

        } else {
            const index = roles_arrData.indexOf(id);
            
                    if (index > -1) {
                    roles_arrData.splice(index, 1); // 2nd parameter means remove one item only
                    }

      }
  }


  const andleSaveChange = () => {
    setbtnSave(true)

    rolesData["permissions"] = roles_arrData;
    post(Urls.static + "update_role", rolesData, res => {
      if (res.status == 1) {
        handleSave()
                setbtnSave(false);

              handleClose()

      } else {
           for (const [key, value] of Object.entries(RequiredrolesData)) {

        setRequiredrolesData((prevState) => ({
            ...prevState,
            [key]: (key in res.msg) ? res.msg[key][0] : ""
        }));
        setbtnSave(false);

    }
      }
    })
  }
    return (
      <div >

        <Modal  backdrop="static" scrollable={true}  size='lg' show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>{trans("Edit roles")}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div >
              <div className="row">
                     <InputData name={trans("Name Ar")} error={RequiredrolesData} required={true} type="name_ar" value={rolesData.name_ar} onChange={setData} />
                  <InputData name={trans("Name En")} error={RequiredrolesData} required={true} type="name_en" value={rolesData.name_en} onChange={setData} />
             
              </div>

            {
                roleses.map((item, i) => {
              
                  return (
                    <div key={i}>
                         <hr />

                    <div className='row'>
                  <div className="col-12 mb-4" >
                        <label style={{fontSize:18,fontWeight:"bold"}}>{ trans(item.group_title)}</label>
                  </div>  
                   {
                                              item.group_roles.map((role,i)=>{
                                                return (
                                                  // <div key={i} className="row w-100">
                                                          
                                                             <BodySelections key={i} trans={trans} roles_arrData={roles_arrData} roles_array={roles_array} role={role} />
                                                        // </div>
                                                )
                                              })
                                            }
                      </div>
                      </div>
                           
                  )
                
                })
               }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {trans("Close")}
            </Button>
       <Button disabled={btnSave} onClick={andleSaveChange} variant="primary" >
                   { trans("Save Changes") }{btnSave?<img style={{marginInline:10}} src={ Urls.public + "imgs/loading.gif"} width={15} height={15} />:null  }
                  </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
