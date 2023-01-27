import React from 'react'

export default function DropDownLink({trans ,data,name="",icon,id=name,class_btn="",class_parent="",click=()=>{}}) {


  return (
            <div onClick={click}  className={`dropdown show ${class_parent}`}>
                    <a href="#" role="button" id={id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className={`${class_btn} d-flex text-muted font-size-16 font-weight-bold flex-row align-items-center`}>
                            <i className={icon}></i>
                            {name == ""?null:<span className='ml-2'>{trans[name]}</span>}
                        </div>
                    </a>

                <div className="dropdown-menu"  aria-labelledby={id}>
                {
                    data.map((item,i)=>{
                        if(item.branch.length > 0){
                          return(<div key={i} className="dropdown dropleft dropdown-hover dropdown-item show">
                          <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                                <a href="#" role="button" id={id + i} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className='d-flex text-muted  font-weight-bold flex-row align-items-center'>
                                        <i className={`${item.icon} font-size-18`}></i>
                                        <span className='ml-2'>{trans[item.title]}</span>
                                    </div>
                                </a>
                                <i className="las la-angle-down"></i>
                          </div>

                                <div className="dropdown-menu branch-hover" aria-labelledby={id + i}>
                                {
                                    item.branch.map((item_branch,i)=>{
                                        return(
                                            <a key={i}  onClick={item_branch.action} className="dropdown-item" href={item_branch.route}>
                                            <div className='d-flex  font-weight-bold flex-row align-items-center'>
                                                <i className={`${item_branch.icon} font-size-18`}></i>
                                                <span className='ml-2'>{trans[item_branch.title]}</span>
                                            </div>
                                        </a>)
                                    })}
                                </div>
                          </div>)

                        }else{
                            return(<a  key={i}  onClick={item.action} key={i} className="dropdown-item" href={item.route}>
                                <div className='d-flex  font-weight-bold flex-row align-items-center'>
                                    <i className={`${item.icon} font-size-18`}></i>
                                    <span className='ml-2'>{trans[item.title]}</span>
                                </div>
                           </a>)
                        }

                    })
                }

                </div>
        </div>
  )
}
