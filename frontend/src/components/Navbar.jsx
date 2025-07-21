import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Events", path: "/events" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`font-helvetica w-full text-white px-4 sm:px-6 py-2 min-h-[85px] 
        bg-gradient-to-r from-[#03022C] via-[#161D58] to-[#03022C] backdrop-blur-xl bg-opacity-80 border-b border-white/10 shadow-2xl
      `}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between mx-auto w-full px-0 py-0 sm:px-0 lg:px-0">
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="flex-shrink-0 w-32 h-16 flex items-center">
            <img
              src={
                    location.pathname === "/"
                      ? "/images/navLogo.png"
                      : "/images/logo.png"
                  }
              alt="Logo"
              className={
                        location.pathname === "/"
                          ? "w-18"  
                          : "w-35" 
                      }
            />
          </Link>

          {/* Hamburger Button */}
          <button
            className="lg:hidden text-white focus:outline-none text-3xl z-10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center flex-1 mt-4 lg:mt-0">
          <div className="flex items-center bg-blue-600/20 backdrop-blur-2xl px-6 py-2 rounded-full border border-blue-400/40 shadow-2xl shadow-blue-500/20 space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-10 py-2 rounded-full transition-all duration-200 ${
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden w-full mt-4 space-y-2 px-4 sm:px-6">
            <div className="flex flex-col bg-blue-800/40 backdrop-blur-2xl rounded-2xl px-4 py-4 space-y-2 border border-blue-400/40 shadow-2xl shadow-blue-500/20">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
