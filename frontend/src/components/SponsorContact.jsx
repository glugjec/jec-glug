import React from 'react'

const SponsorContact = () => {
    return (
    <div className="w-full max-w-4xl mx-auto p-6 pb-20 ">
      <div className="backdrop-blur-sm rounded-2xl border border-white/50 p-12 text-center shadow-2xl  bg-gradient-to-br from-[#2B2973] via-[#090754] to-[#2B2973] ">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Partner with GLUG
        </h2>
        
        <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
          Join our mission to promote open-source culture and support the next generation of 
          developers. Partner with us to make a lasting impact on the tech community.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-[#0086FF] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            become sponsor
          </button>
          
          <button className="bg-[#0086FF] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            contact partnership
          </button>
        </div>
      </div>
    </div>
  )
}

export default SponsorContact
