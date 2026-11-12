import React from 'react'

const Summarydetail = ({toptitle, bottomtitle}) => {
  return (
    <div className="shortdescriptiondiv">
    <div className="shortdescriptiontitle">{toptitle}</div>
    <div className="shortdescriptionsubtitle">{bottomtitle}</div>
    </div>
  )
}

export default Summarydetail