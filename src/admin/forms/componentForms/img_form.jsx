import React,{useState} from 'react';
import { Urls } from '../../components/backend/urls';


const ImgForm = ({row}) => {

    return (
        <div className="d-flex justify-content-between align-items-center mt-2 file-preview-item"
         data-id={row.id} title="logofav2.png">
            <div className="align-items-center align-self-stretch d-flex justify-content-center thumb">
                <img src={Urls.public_url +  row.file_name} className="img-fit" />
                    </div>
                    <div className="col body">
                        <h6 className="d-flex">
                            <span className="text-truncate title">{row.file_original_name}</span>
                            <span className="ext">.{row.extension}</span>
                            </h6>
                        <p>{row.file_size} KB</p>
                        </div>
                        <div className="remove"><button className="btn btn-sm btn-link remove-attachment" type="button">
                            <i className="la la-close"></i>
                            </button></div>
                    </div>

    );
}

export default ImgForm;
