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
            <img src="/mpl-logo.png" alt="MPL Logo" className="hero-logo fade-in" />
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
            <h2>About <span className="highlight">MPL & Sanskruti</span></h2>
            <div className="underline"></div>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>The Manchester Premier League (MPL) is redefining amateur cricket. Proudly organized under the banner of <strong>Sanskruti</strong>, our franchise-based model brings professional organization to the accessible format of tennis ball cricket.</p>
              <p>With colored kits, professional umpires, and digital scoring, we provide a platform for local talent to shine under the spotlight.</p>
              
              <div className="sanskruti-details" style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h3>About <span className="highlight">Sanskruti</span></h3>
                <p>Sanskruti is a volunteer-driven sports and cultural community in Manchester that brings together people through a shared passion for cricket, culture, and community. Rooted in the Indian community and open to everyone, Sanskruti provides a welcoming platform for individuals and families to connect, participate, and build lasting friendships.</p>
                <p>For over four years, we have successfully organized cricket tournaments and community events that promote sportsmanship, cultural exchange, and community spirit. From the successful Sale Premier League (SPL) to the growing Manchester Premier League (MPL), Sanskruti continues to create opportunities for players, supporters, and communities to come together and celebrate their love for the game.</p>
              </div>
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
              <div className="feature">
                <div className="feature-icon">🤝</div>
                <h3>Community Driven</h3>
                <p>A volunteer-led initiative focused on bringing people together through sport.</p>
              </div>
              <div className="feature">
                <div className="feature-icon">✨</div>
                <h3>Inclusivity</h3>
                <p>Open to everyone, providing a welcoming platform for all individuals and families.</p>
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
              { id: 1, name: "Manchester Strikers", logo: "/strikers-logo.jpg" },
              { id: 2, name: "Manchester Royals", logo: "/royals-logo.jpg" },
              { id: 3, name: "Manchester Titans", logo: "/titans-logo.jpg" },
              { id: 4, name: "Manchester Gladiators", logo: "/gladiators-logo.jpg" },
              { id: 5, name: "Manchester Challengers", logo: "/challengers-logo.jpg" },
              { id: 6, name: "Manchester Mavericks", logo: "/mavericks-logo.jpg" },
              { id: 7, name: "Manchester Trailblazers", logo: "/trailblazers-logo.jpg" },
              { id: 8, name: "Manchester Warriors", logo: "/warriors-logo.jpg" }
            ].map((team) => (
              <div key={team.id} className="franchise-card">
                <div className="card-inner">
                  <div className="franchise-logo">
                    {team.logo ? (
                      <img src={team.logo} alt={team.name} className="team-logo-img" />
                    ) : (
                      team.name.split(' ')[1][0]
                    )}
                  </div>
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
