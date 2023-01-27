import React ,{useState} from 'react'

export default function HeaderSearch({ trans, _handleSearch,loadingupdate, setfetchdatas }) {



        const [startDate, setStartDate] = useState(new Date(2020,12).toISOString().substring(0,10) )
    const [endtDate, setEndDate] = useState(new Date().toISOString().substring(0, 10))
    const [DataSearchTable, setDataSearchTable] = useState({
             startDate: new Date(2020, 12).toISOString().substring(0, 10),
                endDate: new Date().toISOString().substring(0, 10),
        name_ar: "",
                order_status:""
})

    return (
        <div>

                          <div className="row">
                                <div className="col-12 col-md-4">
                                                <div className="form-group">
                                                        <label >{trans("Order Status")} </label>
                                                        {/* <div className="input-group"> */}
                                                        {/* <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{background:"#fff"}}>
                                                        <i className="las la-tshirt"></i>
                                                            </span>
                                                    </div> */}
                                                    <input type="text" onChange={e => {
                                                        setfetchdatas(false)
                                                          setDataSearchTable((prevState) => ({
                                                    ...prevState,
                                                    order_status: e.target.value ,
                                            }));
                            _handleSearch(10, 0,DataSearchTable, {
                                                            type: "order_status",
                                                            value:e.target.value
                                                        })
                                                        loadingupdate()
                                                        }}  placeholder={trans("Order Status")} className="form-control" />
                                                    {/* </div> */}
                                                    </div>
                                </div>
                         
                  
                                <div className="col-12 col-md-3">
                                   <div className="form-group">
                                            <label >{trans("Start Date")} </label>
                                            {/* <div className="input-group"> */}
                                            {/* <div className="input-group-prepend">
                                            <span className="input-group-text" style={{background:"#fff"}}>
                                            <i className="las la-calendar"></i>
                                                </span>
                                           </div> */}
                                        <input className="form-control" type="date" value={startDate} onChange={e => {
                                                                                          setfetchdatas(false)
                                             setStartDate(e.target.value)

                                            setDataSearchTable((prevState) => ({
                                                    ...prevState,
                                                    startDate: e.target.value ,
                                            }));
                            _handleSearch(10, 0,DataSearchTable,  {
                                                type: "startDate",
                                                value:e.target.value
                                            })
                                            loadingupdate()
                                                    }} />
                                           {/* </div> */}
                                        </div>

                                </div>
                                <div className="col-12 col-md-3">
                                   <div className="form-group">
                                            <label >{trans("End Date")} </label>
                                            {/* <div className="input-group"> */}
                                            {/* <div className="input-group-prepend">
                                            <span className="input-group-text" style={{background:"#fff"}}>
                                            <i className="las la-calendar"></i>
                                                </span>
                                           </div> */}
                                        <input className="form-control" type="date" value={endtDate} onChange={e => {
                                             setfetchdatas(false)
                                             setEndDate(e.target.value)
                                              setDataSearchTable((prevState) => ({
                                                    ...prevState,
                                                    endDate: e.target.value ,
                                            }));
                            _handleSearch(10, 0,DataSearchTable, {
                                                type: "endDate",
                                                value:e.target.value
                                            })
                                            loadingupdate()
                                                    }} />
                                           {/* </div> */}
                                        </div>
                               </div>
                         </div>

        </div>
    )
}
