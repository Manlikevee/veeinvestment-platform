import Link from 'next/link';
import React from 'react';

const Popup = ({ title, subtext, close, imagewelcome, hreflink }) => {
  return (
    <div className="loading-over2">
      <div className="popup">
        <p id="close2" onClick={close}>×</p>
        <div className="secoact">
{imagewelcome ? (<img src={'/welcomebox.png'} alt="welcome" className='welcomeimg' />)  : <>

<div className="logoac">
            <div className="ccccaaa">
              <div className="canclb">
                <span className="material-symbols-outlined">
                  check
                </span>
              </div>
            </div>
          </div>
</> }

   
          <div className="logomen">{title}</div>
          <div className="logobod">{subtext}</div>
       
       {hreflink && (   <Link className='mybtn fbtn' href={hreflink ? hreflink : '/'}>
        Proceed
          </Link>)}
       
         
        </div>
      </div>
    </div>
  );
}

export default Popup;
