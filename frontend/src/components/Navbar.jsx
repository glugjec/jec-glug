import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Sponsors", path: "/sponsors" },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-[#03022C] via-[#161D58] to-[#03022C] text-white px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between mx-auto px-4 py-4 sm:px-6 lg:px-8 ">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/images/navLogo.png" alt="Logo" className="w-12" />
        </Link>

        {/* Hamburger Button (shown only on mobile) */}
        <button
          className="lg:hidden text-white focus:outline-none text-3xl z-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Menu - Pill Container */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center bg-blue-600/40 backdrop-blur-sm px-2 py-2 rounded-full border border-blue-500/30">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-blue-100 hover:text-white hover:bg-blue-500/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <div className="hidden lg:block flex-shrink-0">
          <Link
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            Contact us
          </Link>
        </div>
      </div>

      {/* Mobile Menu (shown when menuOpen is true) */}
      {menuOpen && (
        <div className="m:hidden mt-4 space-y-2">
          <div className="flex flex-col bg-blue-800/80 backdrop-blur-sm rounded-2xl px-4 py-4 space-y-2 border border-blue-500/30">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "text-blue-100 hover:text-white hover:bg-blue-500/50"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-200 mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;