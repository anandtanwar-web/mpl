import React from 'react';
import '../styles/Home.css';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
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
                onClick={() => setCurrentPage('registration')}
              >
                Join the League
              </button>
              <button className="btn btn-secondary">View Schedule</button>
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
              <p>The Manchester Premier League (MPL) is redefining amateur cricket. Our franchise-based model brings professional organization to the accessible format of tennis ball cricket.</p>
              <p>With colored kits, professional umpires, and digital scoring, we provide a platform for local talent to shine under the spotlight.</p>
            </div>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">🏏</div>
                <h3>T10 Format</h3>
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
              { id: 1, name: "Manchester Strikers", region: "North Manchester" },
              { id: 2, name: "Manchester Royals", region: "South Manchester" },
              { id: 3, name: "Manchester Titans", region: "East Manchester" },
              { id: 4, name: "Manchester Gladiators", region: "West Manchester" },
              { id: 5, name: "Manchester Challengers", region: "City Centre" },
              { id: 6, name: "Manchester Mavericks", region: "Greater Manchester" },
              { id: 7, name: "Manchester Trailblazers", region: "Salford" },
              { id: 8, name: "Manchester Warriors", region: "Trafford" }
            ].map((team) => (
              <div key={team.id} className="franchise-card">
                <div className="card-inner">
                  <div className="franchise-logo">{team.name.split(' ')[1][0]}</div>
                  <h3>{team.name}</h3>
                  <p>{team.region}</p>
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
              onClick={() => setCurrentPage('registration')}
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
