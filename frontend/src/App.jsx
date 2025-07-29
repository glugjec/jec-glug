import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import EventsComponent from './components/EventsComponent';
import SponsorPage from './pages/SponsorPage';
import AdminPanel from './pages/AdminPanel';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='<div className="flex flex-col items-center w-full overflow-x-hidden">'>
      {!isAdminRoute && <Navbar />}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isAdminRoute 
            ? 'bg-gradient-to-br from-[#0F1629] via-[#161D58] to-[#0F1629]' 
            : 'bg-cover bg-center'
        }`}
        style={!isAdminRoute ? { backgroundImage: "url('images/teampagebackground.png')" } : {}}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/events" element={<EventsComponent />} />
          <Route path="/sponsors" element={<SponsorPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
