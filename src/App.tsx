import { useState } from 'react';
import Home from './components/Home';
import Registration from './components/Registration';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
            MPL<span className="dot">.</span>
          </div>
          <ul className="nav-links">
            <li><button onClick={() => setCurrentPage('home')} className="nav-link-btn">Home</button></li>
            <li><a href="#about">About</a></li>
            <li><a href="#teams">Teams</a></li>
          </ul>
          <button className="nav-cta" onClick={() => setCurrentPage('registration')}>Register</button>
        </div>
      </nav>

      <main>
        {currentPage === 'home' ? <Home /> : <Registration />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
