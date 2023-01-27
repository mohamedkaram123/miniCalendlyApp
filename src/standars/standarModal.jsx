import React, { useState} from 'react'
import { Modal ,Button} from 'react-bootstrap';
import { Urls } from 'helper'; 
export default function ModalRefundReason({show,handleClose,trans,row}) {

    const [btnSave, setbtnSave] = useState(false)

    return (
      <div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>{trans("Refund Reason")}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <div>
                  <p>{row.id}</p>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {trans("Close")}
            </Button>
       <Button disabled={btnSave} onClick={this.handleSaveChange} variant="primary" >
                   { trans("Save Changes") }{btnSave?<img style={{marginInline:10}} src={ Urls.public + "imgs/loading.gif"} width={15} height={15} />:null  }
                  </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
