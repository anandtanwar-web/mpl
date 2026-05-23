import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-info">
          <div className="logo">MPL<span className="dot">.</span></div>
          <p>The premier franchise-based tennis ball cricket league in Manchester. Experience the thrill of professional cricket.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#teams">Franchises</a></li>
            <li><a href="#contact">Contact</a></li>
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
