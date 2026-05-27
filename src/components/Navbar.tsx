import React from 'react';
import '../styles/Navbar.css';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const handleNavClick = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Give a tiny delay for the Home component to mount before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <button onClick={() => setCurrentPage('schedule')} className="nav-link-btn">
              Schedule
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('registration')} 
              className={`nav-link-btn highlight-link ${currentPage === 'registration' ? 'active' : ''}`}
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
