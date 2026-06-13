import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
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
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-info">
          <img src="/sanskruti-logo.jpg" alt="Sanskruti Logo" className="footer-logo" />
          <div className="logo-group">

            <div className="logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
              MPL<span className="dot">.</span>
            </div>
            <img src="/mpl-logo.png" alt="MPL Logo" className="footer-mpl-logo" />
          </div>
          <p>The premier franchise-based tennis ball cricket league in Manchester. Experience the thrill of professional cricket.</p>
        </div>
        <div className="footer-links">
          <h4>Title Sponsor</h4>
          <a href="https://guidefs.co.uk" target="_blank" rel="noopener noreferrer">
            <img src="/guide-financials-logo.png" alt="Guide Financial Services Logo" style={{ width: '150px', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }} />
          </a>
          <h4 style={{ marginTop: '20px' }}>POM Trophy Sponsor</h4>
          <img src="/sale-ics-logo.jpg" alt="Sale ICS Logo" style={{ width: '150px', borderRadius: '5px' }} />
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
