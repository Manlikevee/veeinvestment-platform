import React from 'react'
import Valuebox from './Valuebox'

const Stockscards = ({image, companyname, value, rate}) => {
  return (
    <div className='recenttransactioncard'>
    
    <div className="recenttop">
        <div className="accountdetails">
            <img src={image} alt={companyname} className='stocklogo' />
            <div className="companyname">{companyname}</div>
            <div className="accname">{companyname} Holdings </div>
            {/* <div className="accnumber">#346577782</div> */}

          
        </div>
        <div className="threedot"><span className="material-symbols-outlined">
    more_horiz
    </span></div>
    </div>
    <div className="invline gren"></div>
  
    
    
    <Valuebox label={'Value'} body={value} currency="₦" />
    <Valuebox label={'Rate'} body={`${rate}%`} />

        </div>
  )
}

export default Stockscards