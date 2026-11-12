import React from 'react'

const SelfServiceBox = ({title, subtitle, image}) => {
  return (
<div className="investmentdetailblock relative min">
    <div className="selfserviceimg">
    <img  src={image ? image : ''} alt="No Social Media For This Business"></img>
    </div>
    <div className="selfservicetitle">{title}</div>
    <div className="selfservicebody">
    {subtitle}
    </div>
    <div className="selfservicebtn">
   Explore Service <span className="material-symbols-outlined">
exit_to_app
</span>
    </div>
</div>
  )
}

export default SelfServiceBox