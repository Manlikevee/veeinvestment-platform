import React from 'react'
import Valuebox from './Valuebox'
import Link from 'next/link'

const Recenttransactioncard = () => {
  return (
    <div className='recenttransactioncard'>
    
<div className="recenttop">
    <div className="accountdetails">
        <div className="accname">Account Number</div>
        <Link href={'/investment/investmentdetail'} className="accnumber">#346577782</Link>
    </div>
    <div className="threedot"><span className="material-symbols-outlined">
more_horiz
</span></div>
</div>

<div className="productname">
Fixed Deposit
</div>


<Valuebox label={'Current Principal'} body={'N 10,000,000.00'} />
<Valuebox label={'Maturity Date'} body={'12/04/2023'} />
<Valuebox label={'Interest Rate'} body={'10%'} />
    </div>
  )
}

export default Recenttransactioncard