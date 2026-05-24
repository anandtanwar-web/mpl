import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Registration from './components/Registration';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <Navbar setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === 'home' ? <Home setCurrentPage={setCurrentPage} /> : <Registration />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
