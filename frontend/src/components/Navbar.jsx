import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Team", path: "/team" },
  { name: "Events", path: "/events" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
    const navbarHeight = 80;
    const root = document.getElementById("root");
    if (root) root.style.paddingTop = `${navbarHeight}px`;
    return () => {
      if (root) root.style.paddingTop = "";
    };
  }, []);

  // Update pill position when route changes
  const updatePillGeometry = useCallback(() => {
    const foundIndex = NAV_ITEMS.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIndex(foundIndex);

    if (foundIndex !== -1 && navLinksRef.current[foundIndex]) {
      const activeLinkNode = navLinksRef.current[foundIndex];
      const { offsetLeft, offsetWidth } = activeLinkNode;
      setActiveLinkGeometry({ left: offsetLeft, width: offsetWidth });
      setPillStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
    updatePillGeometry();
  }, [location.pathname, updatePillGeometry]);

  // Handle window resize for accurate pill positioning
  useEffect(() => {
    const handleResize = () => updatePillGeometry();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePillGeometry]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <nav
      className="font-helvetica w-full text-white px-4 sm:px-6 lg:px-8 py-4 fixed top-0 left-0 z-50 bg-[#161D58]/70 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-wrap items-center justify-between mx-auto w-full">
        {/* Left Logo and Mobile Toggle */}
        <div className="relative flex items-center justify-between w-full lg:w-auto">
          {/* Left Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 z-40"
          >
            <img
              src="/images/logo.png"
              alt="GLUG Logo"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/100x40/161D58/FFFFFF?text=Logo";
              }}
            />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden ml-auto text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors z-50 flex items-center justify-center cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span className="text-2xl font-bold leading-none">✕</span>
            ) : (
              <span className="text-2xl font-bold leading-none">☰</span>
            )}
          </button>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center justify-center flex-1 pl-0 pr-19">
          <div
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center bg-black/20 backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-inner shadow-black/50 space-x-2 drop-shadow-[0_12px_32px_rgba(40,80,220,0.25)]"
          >
            <div
              className="absolute h-10 top-1/2 -translate-y-1/2 bg-blue-600 rounded-full border border-blue-400/60 shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out pointer-events-none"
              style={pillStyle}
            />
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                ref={(el) => (navLinksRef.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`relative z-10 px-8 py-2 rounded-full transition-colors duration-300 text-sm font-medium ${activeIndex === index ? "text-white" : "text-blue-200 hover:text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Logo (Desktop) */}
        <div className="hidden lg:flex items-center">
          <img
            src="/images/navLogo.png"
            alt="JEC Logo"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/120x40/161D58/FFFFFF?text=Right";
            }}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-nav-drawer"
          inert={!menuOpen ? "" : undefined}
          aria-hidden={!menuOpen}
          className={`w-full lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 pointer-events-none"
            }`}
        >
          <div className="flex flex-col bg-[#0f1443]/95 backdrop-blur-xl rounded-2xl p-4 space-y-2 border border-blue-400/30 shadow-2xl shadow-blue-500/20">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium ${location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-blue-100 hover:text-white hover:bg-white/10"
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

