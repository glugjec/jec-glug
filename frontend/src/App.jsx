import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Team from './pages/TeamPage';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import EventsComponent from './components/EventsComponent';
import SponsorPage from './pages/SponsorPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsComponent />} />
        <Route path="/sponsors" element={<SponsorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
