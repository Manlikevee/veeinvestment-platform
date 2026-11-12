import Link from 'next/link'
import React from 'react'

const Investmentcard = () => {
  return (
    <div className='investmentcard'>
        <div className="investmenttitle">Gresham Fund Placement </div>
        <div className="investmentbody">
        Our Gresham Fund Placement Client represents a comprehensive and diversified investment portfolio designed to cater to a wide range of investor needs. This portfolio strategically pools funds from multiple investors, allowing them to collectively benefit from access to a broad spectrum of asset classes. Investments are carefully allocated across stocks, bonds, money market instruments, and other financial vehicles, ensuring a balanced approach to risk and returns. By leveraging the combined capital of its participants, the fund aims to achieve optimized performance, professional management, and enhanced diversification, making it an ideal solution for both individual and institutional investors seeking long-term financial growth.
        </div>
        <Link href={'/investment/new-investment'} className='mybtn fh'> Add Investment</Link>
    </div>
  )
}

export default Investmentcard