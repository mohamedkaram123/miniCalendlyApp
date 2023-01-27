import LoadingInline from 'HelperComponents/LoadingInline'
import React, { useState,useEffect,useRef } from "react";
import { Modal ,Button} from 'react-bootstrap';

import { useTranslation } from "react-i18next";
import BtnSendData from './btnSendData';

export default function ModalAdd({show,handleClose,handleSave,FormComponent,size="md",title,isLoading=false,loadSearch=false,edit=false,item={}}) {
  const [trans,i18n] = useTranslation();

    var Data = {}
    var RequiredData;
    const holdData = (val,reqire_data)=>{
        Data = val
        RequiredData = reqire_data
    }
  return (
    <div>
    <Modal show={show} size={size} onHide={handleClose}>
    <Modal.Header >
      <Modal.Title>{trans(title)}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        {isLoading?<LoadingInline />:
        <>
          <FormComponent edit={edit} item={item} holdData={holdData} />
        </>}

    </Modal.Body>
    <Modal.Footer>
      <div className="d-flex flex-row w-100 justify-content-end">
      <BtnSendData classes="mx-2" onclick={()=>{handleSave(Data,RequiredData)}} loadSearch={loadSearch} name={trans("Save")} />

            <Button variant="secondary" onClick={handleClose}>
              {trans("Close")}
            </Button>
      </div>


    </Modal.Footer>
  </Modal>
    </div>
  )
}
