import Link from 'next/link'
import React from 'react'

const Mylogocomponent = ({hidetext}) => {
  return (
    <Link href="/userdashboard" className="mylogo">
    <img src= '/Logo.png' alt=""  /> {!hidetext && ( <div className='pbs'>Watershed-<span>Investments</span></div>)}  
    </Link>
  )
}

export default Mylogocomponent