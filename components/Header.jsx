'use client'
import React, { useState, useEffect } from 'react';
import Mylogocomponent from './Mylogocomponent';
import Link from 'next/link';
const Header = () => {
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavActive(true);
      } else {
        setNavActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`headercontainer ${navActive ? 'navactive' : ''}`}>
      <div className="myheader">
        <Mylogocomponent hidetext={true} />

        <div className="headerlinks">
        <Link href="/loan" className="headerlink">Loans</Link>
          <Link href="/investment" className="headerlink">Stocks</Link>
          <Link href="/investment" className="headerlink">Investment</Link>
          <Link href="/portfolio" className="headerlink">Portfolio</Link>
          <Link href="/services" className="headerlink">Services</Link>
          <div className="bell">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="headprofile_img">
            <img src="/rb_174706.png" alt="" className="userprofile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
