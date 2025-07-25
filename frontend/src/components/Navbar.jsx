import React, { useState, useRef, useEffect } from "react";
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

  const navLinksRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [activeLinkGeometry, setActiveLinkGeometry] = useState({
    left: 0,
    width: 0,
  });

  const [pillStyle, setPillStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

  useEffect(() => {
    
    setMenuOpen(false);

    const foundIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIndex(foundIndex);

    if (foundIndex !== -1 && navLinksRef.current[foundIndex]) {
      const activeLinkNode = navLinksRef.current[foundIndex];
      const { offsetLeft, offsetWidth } = activeLinkNode;
      
      setActiveLinkGeometry({ left: offsetLeft, width: offsetWidth });
      setPillStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
    } else {
      setPillStyle({ ...pillStyle, opacity: 0 });
    }
  }, [location.pathname]);

  const handleMouseEnter = (index) => {
    if (navLinksRef.current[index]) {
      const hoverLinkNode = navLinksRef.current[index];
      const { offsetLeft, offsetWidth } = hoverLinkNode;
      setPillStyle({ left: offsetLeft, width: offsetWidth, opacity: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (activeIndex !== -1) {
      setPillStyle({ ...activeLinkGeometry, opacity: 1 });
    } else {
      setPillStyle({ ...pillStyle, opacity: 0 });
    }
  };

  return (
   <nav
      className={`font-helvetica w-full text-white px-4 sm:px-6 lg:px-8 py-4
        bg-gradient-to-r from-[#03022C] via-[#161D58] to-[#03022C] backdrop-blur-xl bg-opacity-80 border-b border-white/10 shadow-2xl
      `}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto w-full">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src={"/images/navLogo.png"}
              alt="Logo"
              className="h-10 w-auto" // Use height to control size
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x40/161D58/FFFFFF?text=Logo'; }}
            />
          </Link>
          <button
            className="lg:hidden text-white focus:outline-none text-3xl z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          {/* --- STYLE MODIFICATION ---
              - Spacing: Increased `space-x-1` to `space-x-2` to add more distance between the navigation links.
          */}
          <div
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center bg-black/20 backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-inner shadow-black/50 space-x-2"
          >
            {/* The animated pill */}
            <div
              className="absolute h-10 top-1/2 -translate-y-1/2 bg-blue-600 rounded-full border border-blue-400/60 shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out pointer-events-none"
              style={pillStyle}
            />
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                ref={(el) => (navLinksRef.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`relative z-10 px-8 py-2 rounded-full transition-colors duration-300 text-sm font-medium ${
                  activeIndex === index
                    ? "text-white"
                    : "text-blue-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full lg:hidden mt-6`}>
          <div className="flex flex-col bg-[#0f1443]/95 backdrop-blur-xl rounded-2xl p-5 space-y-2 border border-blue-400/40 shadow-2xl shadow-blue-500/20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-xl transition-all duration-200 text-lg ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "text-blue-100 hover:text-white hover:bg-blue-500/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



