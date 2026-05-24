import React from 'react';
import '../styles/Navbar.css';

interface NavbarProps {
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          MPL<span className="dot">.</span>
        </div>
        <ul className="nav-links">
          <li>
            <button onClick={() => setCurrentPage('home')} className="nav-link-btn">
              Home
            </button>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#teams">Teams</a>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('registration')} 
              className="nav-link-btn highlight-link"
            >
              Register
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
