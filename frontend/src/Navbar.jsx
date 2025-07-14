import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";

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
    <nav className="w-full bg-black backdrop-blur-md text-white px-4 sm:px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="GLUG Logo" className="h-10" />
        </Link>

        {/* Hamburger Button (shown only on mobile) */}
        <button
          className="sm:hidden text-white focus:outline-none text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex space-x-2 bg-black/60 px-4 py-2 rounded-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-1 rounded-full ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Contact us
          </Link>
        </div>
      </div>

      {/* Mobile Menu (shown when menuOpen is true) */}
      {menuOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          <div className="flex flex-col bg-black/70 rounded-lg px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2 rounded ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setMenuOpen(false)} // close menu on link click
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
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
