import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({trans,fetchAPIData,endDataResponse,endData,handleDataDrawer}) {
  const classes = useStyles();
    const [toggleDrawerBottom, setToggleDrawerBottom] = useState(false);
    const [startDate, setStartDate] = useState(new Date(2020,12).toISOString().substring(0,10) )
    const [endtDate, setEndDate] = useState(new Date().toISOString().substring(0,10))


    const [DataSearchOrderStatus, setDataSearchOrderStatus] = useState({
        startDate: startDate,
        endDate: endtDate,
        order_status: "",
    


  });
  const [loadingBtn, setloadingBtn] = useState(false);

    const toggleDrawer = () => (event) => {

        if (toggleDrawerBottom == true) {
  setToggleDrawerBottom(false)

        } else {
              setToggleDrawerBottom(true)

        }
  };

        const mounted = useRef(false);

 useEffect(() => {
      if (!mounted.current) {
        // do componentDidMount logic
        mounted.current = true;
      } else {

                setloadingBtn(false)
          setToggleDrawerBottom(false)
          if (endDataResponse == false) {
                        endData()

          }
        // do componentDidUpdate logic
      }
    }, [endDataResponse]);
    const  handleClick = (data)=>{


        setloadingBtn(true)
        handleDataDrawer()
        fetchAPIData({ limit: 10, skip: 0,  data ,advanceSearch:true})


    }
  const list = (anchor) => (
          <div  className={clsx(classes.list, { [classes.fullList]: anchor === 'top' || anchor === 'bottom', })} role="presentation">
              <div className="card-header">
                <div className="d-flex" style={{justifyContent:"space-between"}}>

                <h1> <i className="las la-tshirt"></i> {trans("Order Status")} </h1>
                            <button onClick={toggleDrawer()} style={{padding: "0px 20px"}} className="btn btn-soft-danger d-block d-md-none"><i style={{fontSize:14}} className="las la-times"></i></button>
        </div>
              </div>
          <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label >{trans("order status")} </label>
                                {/* <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" style={{background:"#fff"}}>
                                        <i className="las la-calendar"></i>
                                    </span>
                                    </div> */}
                                    <input className="form-control" value={DataSearchOrderStatus.order_status} type="text"  onChange={e => {
                                        setDataSearchOrderStatus((prevState) => ({
                                        ...prevState,
                                            order_status: e.target.value ,
                                            }));
                                            }} />
                                {/* </div> */}
                        </div>
                      </div>
   
       
                            <div className="col-12 col-md-3">
                                            <div className="form-group">
                                                        <label >{trans("Start Date")} </label>
                                                        {/* <div className="input-group">
                                                        <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{background:"#fff"}}>
                                                        <i className="las la-calendar"></i>
                                                            </span>
                                                    </div> */}
                                                    <input className="form-control" type="date" value={startDate} onChange={e => {
                                                                    setStartDate(e.target.value)
                                                                        setDataSearchOrderStatus((prevState) => ({
                                                                            ...prevState,
                                                                            startDate: e.target.value ,
                                                                        }));

                                                                }} />
                                                    {/* </div> */}
                                                    </div>
                            </div>
                            <div className="col-12 col-md-3">
                                            <div className="form-group">
                                                        <label >{trans("End Date")} </label>
                                                        {/* <div className="input-group">
                                                        <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{background:"#fff"}}>
                                                        <i className="las la-calendar"></i>
                                                            </span>
                                                    </div> */}
                                                    <input className="form-control" type="date" value={endtDate} onChange={e => {
                                                                    setEndDate(e.target.value)
                                                                        setDataSearchOrderStatus((prevState) => ({
                                                                            ...prevState,
                                                                            endDate: e.target.value ,
                                                                        }));

                                                                }} />
                                                    {/* </div> */}
                                                    </div>

                            </div>
                  </div>
              </div>
              <div className="card-footer">
                  <div className='left-btn-search'>
                      <button onClick={()=>{
                            handleClick(DataSearchOrderStatus)
                            }} disabled={loadingBtn} className="btn btn-primary">
                                {trans("Search")}
                            {/* {loadingBtn?<img style={{marginInline:10}} src={ Urls.public_url + "assets/img/loading.gif"} width={15} height={15} />:null  } */}
                       </button>
                  </div>
              </div>

                </div>


  );

  return (
    <div>
        <React.Fragment >
          <button className="btn btn-soft-primary" onClick={toggleDrawer()}><i className="las la-search"></i> {trans("Advanced Search")}</button>
              <Drawer className="card" style={{position:'relative'}} anchor={"bottom"} open={toggleDrawerBottom} onClose={toggleDrawer()}>

                      {list("bottom")}

              </Drawer>
        </React.Fragment>

    </div>
  );
}
