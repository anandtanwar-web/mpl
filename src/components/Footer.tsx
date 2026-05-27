import React from 'react';
import '../styles/Footer.css';

interface FooterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPage, setCurrentPage }) => {
  const handleNavClick = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
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
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-info">
          <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            MPL<span className="dot">.</span>
          </div>
          <p>The premier franchise-based tennis ball cricket league in Manchester. Experience the thrill of professional cricket.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><button onClick={handleHomeClick} className="footer-link-btn">Home</button></li>
            <li><button onClick={() => handleNavClick('about')} className="footer-link-btn">About Us</button></li>
            <li><button onClick={() => handleNavClick('teams')} className="footer-link-btn">Franchises</button></li>
            <li><button onClick={() => handleNavClick('contact')} className="footer-link-btn">Contact</button></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span className="icon">FB</span>
            <span className="icon">IG</span>
            <span className="icon">TW</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Manchester Premier League. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
