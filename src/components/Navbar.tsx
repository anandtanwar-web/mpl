import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${sectionId}`);
      }
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/' && !location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo" onClick={handleHomeClick}>
          MPL<span className="dot">.</span>
        </div>
        <ul className="nav-links">
          <li>
            <button onClick={handleHomeClick} className="nav-link-btn">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => handleNavClick('about')} className="nav-link-btn">
              About
            </button>
          </li>
          <li>
            <button onClick={() => handleNavClick('teams')} className="nav-link-btn">
              Teams
            </button>
          </li>
          <li>
            <Link to="/schedule" className="nav-link-btn">
              Schedule
            </Link>
          </li>
          <li>
            <Link 
              to="/registration" 
              className={`nav-link-btn highlight-link ${location.pathname === '/registration' ? 'active' : ''}`}
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
