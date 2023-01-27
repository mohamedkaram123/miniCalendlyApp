import React from 'react'
import { Urls } from 'helper'

export default function LoadingInline() {
    return (
        <div style={{justifyContent:"center",alignItems:"center",display:"flex"}}>

            <img src={ Urls.public + "img/loader.gif"}   width={50} height={30} />

        </div>
    )
}
