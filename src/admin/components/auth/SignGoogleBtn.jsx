import React from 'react'

export default function SignGoogleBtn({googleDisabled,click}) {

  return (

    <button onClick={click} type="button" className="login-with-google-btn"  disabled={googleDisabled}>
    Sign in with Google
    </button>
  )
}
