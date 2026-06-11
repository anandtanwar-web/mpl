import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Registration from './components/Registration';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="title-sponsor-banner">
          <p>MPL 2026 Powered By</p>
          <a href="https://guidefs.co.uk" target="_blank" rel="noopener noreferrer">
            <img src="/guide-financials-logo.png" alt="Guide Financial Services" />
          </a>
        </div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/schedule" element={<Schedule />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
