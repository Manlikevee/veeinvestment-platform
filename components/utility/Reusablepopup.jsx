import React from 'react'

const Reusablepopup = ({ title, subtext, close }) => {
  return (
    <div className="loading-over2">
    <div className="popup widepopup">
        <div className="tflxx">

<div>Add Investment</div>
        <p id="close2" onClick={close}>×</p>
        </div>
  
      <div className="secoact">


        <div className="logobod">{subtext}</div>

      </div>
      <br />
    </div>
  </div>
  )
}

export default Reusablepopup