import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import EventsComponent from './components/EventsComponent';
import SponsorPage from './pages/SponsorPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className='<div className="flex flex-col items-center w-full overflow-x-hidden">'>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: "url('images/teampagebackground.png')" }}
      >

      <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/events" element={<EventsComponent />} />
          <Route path="/sponsors" element={<SponsorPage />} />
        </Routes>
        </div>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
