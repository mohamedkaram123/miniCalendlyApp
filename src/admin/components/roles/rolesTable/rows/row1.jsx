import React from 'react'
export default function Row1({row}) {
    return (
        <div className='d-flex flex-row'>
            <span className="text-muted text-truncate-2" style={{ marginInline: 10,width:"200px",wordBreak:"break-word"}}>{row.original.name }</span>
        </div>
    )
}
