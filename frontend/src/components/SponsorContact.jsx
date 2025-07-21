import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 


const PartnershipContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#03022C] to-[#161D58] rounded-xl shadow-2xl border border-blue-400/40 p-6 sm:p-8 max-w-sm w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl font-bold transition-colors duration-200"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold text-white mb-4">Contact for partnership</h3>
        <p className="text-white/90 text-lg mb-2">Mr. Abhiash Kashyap</p>
        <p className="text-white/90 text-lg mb-2">Phone: +91 +91 9127001508</p> 
        <p className="text-white/90 text-lg mb-4">Email: glug.jec@gmail.com</p> 
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Got It!
        </button>
      </div>
    </div>
  );
};


const SponsorContact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 pb-20 ">
            <div className="font-poppins backdrop-blur-sm rounded-2xl border border-white/50 p-12 text-center shadow-2xl bg-gradient-to-br from-[#2B2973] via-[#090754] to-[#2B2973] ">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Partner with GLUG
                </h2>
                
                <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                    Join our mission to promote open-source culture and support the next generation of 
                    developers. Partner with us to make a lasting impact on the tech community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    
                    <Link
                        to="/contact" 
                        className="bg-[#0086FF] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center" // Added flex for centering text
                    >
                        Become a Sponsor
                    </Link>
                    
                    
                    <button
                        onClick={openModal}
                        className="bg-[#0086FF] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Contact Partnership
                    </button>
                </div>
            </div>

            <PartnershipContactModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default SponsorContact;
