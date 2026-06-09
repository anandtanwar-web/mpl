import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling on load or navigation
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="fade-in">The Pulse of <span className="highlight">Cricket</span> in Manchester</h1>
            <p className="fade-in-delay">Manchester's premier franchise-based tennis ball cricket league. High stakes, high energy, professional cricket.</p>
            <div className="hero-btns fade-in-delay">
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/registration')}
              >
                Join the League
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/schedule')}
              >
                View Schedule
              </button>
            </div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="section-header">
            <h2>About <span className="highlight">MPL</span></h2>
            <div className="underline"></div>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>The Manchester Premier League (MPL) is redefining amateur cricket. Proudly organized under the banner of <strong>Sanskruti</strong>, our franchise-based model brings professional organization to the accessible format of tennis ball cricket.</p>
              <p>With colored kits, professional umpires, and digital scoring, we provide a platform for local talent to shine under the spotlight.</p>
            </div>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">🏏</div>
                <h3>T20 Format</h3>
                <p>Fast-paced, explosive matches designed for maximum excitement.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🏆</div>
                <h3>Franchise Model</h3>
                <p>8 professional franchises competing for the ultimate glory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchises Section */}
      <section id="teams" className="franchises section">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="highlight">Franchises</span></h2>
            <div className="underline"></div>
          </div>
          <div className="franchise-grid">
            {[
              { id: 1, name: "Manchester Strikers" },
              { id: 2, name: "Manchester Royals" },
              { id: 3, name: "Manchester Titans" },
              { id: 4, name: "Manchester Gladiators" },
              { id: 5, name: "Manchester Challengers" },
              { id: 6, name: "Manchester Mavericks" },
              { id: 7, name: "Manchester Trailblazers" },
              { id: 8, name: "Manchester Warriors" }
            ].map((team) => (
              <div key={team.id} className="franchise-card">
                <div className="card-inner">
                  <div className="franchise-logo">{team.name.split(' ')[1][0]}</div>
                  <h3>{team.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Play?</h2>
            <p>Registration for the 2026 season is now open. Don't miss your chance to be part of the legacy.</p>
            <button 
              className="btn btn-primary btn-large" 
              onClick={() => navigate('/registration')}
            >
              Register Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
