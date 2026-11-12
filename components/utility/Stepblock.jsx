import React from 'react'

const Stepblock = ({ stepcount, isactive, title }) => {
  return (
    <div className='stepblocklines'>
        <div className="stepcountdata">
 
        <div className={`stepblock inactve ${isactive ? "stpcount" : "inactive"}`}>
       { stepcount}
        </div>

        <div className="stepname">
        {title}
        </div>
        </div>
    

    {(stepcount === 1 || stepcount === 2 || stepcount === 3) && <div className="mystepblocklines">
<div></div>
        <div></div>
        <div></div>


</div>}

   
    </div>
  )
}

export default Stepblock