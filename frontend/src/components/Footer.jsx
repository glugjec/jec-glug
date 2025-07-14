import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* GLUG Section */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold text-gray-800 mb-3">GLUG</h2>
            <p className="text-gray-600 text-sm leading-relaxed pr-4">
              We promote Linux, free software, and collaborative learning through events like workshops, hackathons, and tech talks.
            </p>
          </div>
          
          {/* Sitemap Section */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Sitemap</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Gallery</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">Sponsors</a></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Contact</h3>
            <div className="text-gray-600 text-sm space-y-1">
              <p>Jorhat Engineering College,</p>
              <p>Assam, India</p>
              <p className="text-blue-600 hover:text-blue-800 cursor-pointer mt-2">
                glugjec@gmail.com
              </p>
            </div>
          </div>
          
          {/* Follow us Section */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Follow us</h3>
            <div className="text-gray-600 text-sm space-y-2">
              <p><a href="#" className="hover:text-gray-800 transition-colors">Facebook</a></p>
              <p><a href="#" className="hover:text-gray-800 transition-colors">Instagram</a></p>
              <p><a href="#" className="hover:text-gray-800 transition-colors">LinkedIn</a></p>
              <p><a href="#" className="hover:text-gray-800 transition-colors">Github</a></p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;