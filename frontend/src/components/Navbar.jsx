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
    { name: "Explore Community", path: "https://community.glugjec.com/", external: true },
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
    const navbarHeight = 80;
    const root = document.getElementById("root");
    if (root) root.style.paddingTop = `${navbarHeight}px`;
    return () => {
      if (root) root.style.paddingTop = '';
    };
  }, []);

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

  useEffect(() => {
    const handleResize = () => {
      if (activeIndex !== -1 && navLinksRef.current[activeIndex]) {
        const activeLinkNode = navLinksRef.current[activeIndex];
        const { offsetLeft, offsetWidth } = activeLinkNode;
        setActiveLinkGeometry({ left: offsetLeft, width: offsetWidth });
        setPillStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

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
      className={`font-helvetica w-full text-white px-4 sm:px-6 lg:px-8 py-4 fixed top-0 left-0 z-50
        bg-[#161D58]/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300
      `}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto w-full">
        {/* Left Logo and Mobile Menu */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Left Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src="/images/logo.png"
              alt="Main Logo"
              className="h-7 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/100x40/161D58/FFFFFF?text=Logo";
              }}
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white focus:outline-none text-3xl z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Center Nav Links Pill */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center bg-black/20 backdrop-blur-2xl p-2 rounded-full border border-white/20 shadow-inner shadow-black/50 space-x-1 xl:space-x-2 drop-shadow-[0_12px_32px_rgba(40,80,220,0.25)]"
          >
            <div
              className="absolute h-10 top-1/2 -translate-y-1/2 bg-blue-600 rounded-full border border-blue-400/60 shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out pointer-events-none"
              style={pillStyle}
            />
            {navItems.map((item, index) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(el) => (navLinksRef.current[index] = el)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className="relative z-10 px-5 xl:px-7 py-2 rounded-full transition-colors duration-300 text-sm font-medium text-blue-200 hover:text-white whitespace-nowrap"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  ref={(el) => (navLinksRef.current[index] = el)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`relative z-10 px-5 xl:px-7 py-2 rounded-full transition-colors duration-300 text-sm font-medium whitespace-nowrap ${
                    activeIndex === index
                      ? "text-white"
                      : "text-blue-200 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Right Logo */}
        <div className="hidden lg:flex items-center">
          <img
            src="/images/navLogo.png"
            alt="Right Logo"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/120x40/161D58/FFFFFF?text=Right";
            }}
          />
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full lg:hidden mt-6`}>
          <div className="flex flex-col bg-[#0f1443]/95 backdrop-blur-xl rounded-2xl p-5 space-y-2 border border-blue-400/40 shadow-2xl shadow-blue-500/20">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-xl transition-all duration-200 text-lg text-blue-100 hover:text-white hover:bg-blue-500/50"
                >
                  {item.name}
                </a>
              ) : (
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
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
