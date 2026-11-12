import React from 'react'

const ServiceBox = ({title, subtitle, image}) => {
  return (
    <div className="investmentdetailblock relative">

    <div className="relative max-w-80">
    <span className="font-bold text-lg">{title}</span>
    <p className="max-w-xs text-sm mt-2">
   {subtitle}
    </p>
    <a
      className="button"
      href="#"
      rel="nofollow"
    >
  {/* <span className="material-symbols-outlined">
  add
  </span> */}
      <span>Add Social Links</span>
    </a>
  </div>
  
  
          <div className="shadow"></div>
          <img className="top-0 right-0 absolute max-h-[100%]" src={image ? image : ''} alt="No Social Media For This Business"></img>
      </div>
  )
}

export default ServiceBox