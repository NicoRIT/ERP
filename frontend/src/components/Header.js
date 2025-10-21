import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/RIT_logo.jpg';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-top">
        <img src={logo} alt="College Logo" className="logo" />
        <div className="college-title">
          <h3 className="title-small">Shivgram Education Society’s</h3>
          <h2 className="title-large">Shree Rayeshwar Institute of Engineering and Information Technology</h2>
          <h3 className="title-small">Shivshail, Shiroda-Goa 403103</h3>
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
