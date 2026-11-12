import React from 'react'

const Columndiv = ({toptitle, bottomtitle, isprogress, ends}) => {
  return (
    <div className='coldiv'>
        <div className="coltop">{toptitle}</div>
        <div className="colbtm">{bottomtitle}

        {isprogress&& (  <progress className='myprogress' max={20} value={10}></progress>)}

        </div>
      
     
    </div>
  )
}

export default Columndiv