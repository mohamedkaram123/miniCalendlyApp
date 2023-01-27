import React, { useState } from 'react'
import ButtonConfirm from './ButtonConfirm'

export default function ButtonsTime({times,confirmData}) {

    const [active, setactive] = useState(false)

  return (
    <div className='d-flex flex-column ml-10 scrollbar' id='style2' style={{ maxHeight:500,overflow:"auto" }}>
        {
            times.map((item,i)=>(
                <ButtonConfirm key={i} confirmData={confirmData} active={active} setactive={setactive} item={item} />
            ))
        }
    </div>
  )
}
