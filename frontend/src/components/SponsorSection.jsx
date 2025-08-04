import SponsorCard from './SponsorCard';

const SponsorsSection = ({ sponsorsData, loading = false }) => {
  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="font-canno text-[3rem] font-bold text-center mb-2 bg-gradient-to-r from-[#3093E5] to-[#FFFFFF] bg-clip-text text-transparent">
          OUR SPONSORS
        </h1>
         
        {/* Intro Text */}
        <p className="font-poppins text-lg text-white text-center max-w-2xl mx-auto mb-12 opacity-90">
          We are grateful to our sponsors who support sports mission and help us organize amazing events for the community.
        </p>

        
        {loading ? (
          
          [...Array(3)].map((_, tierIndex) => (
            <div key={tierIndex} className="flex flex-col items-center mb-16">
              
              <div className="h-6 bg-blue-300/40 rounded w-48 mb-8 animate-shimmer"></div>

              
              <div className="flex justify-center gap-6 flex-wrap">
                {[...Array(tierIndex === 0 ? 1 : tierIndex === 1 ? 2 : 1)].map((_, cardIndex) => (
                  <div key={cardIndex} className="bg-gradient-to-b from-white/20 to-gray-500/20 backdrop-blur-lg rounded-[20px] p-8 w-80 animate-pulse">
                    
                    <div className="w-32 h-32 bg-blue-400/30 rounded-full mx-auto mb-6 animate-shimmer"></div>
                    
                    
                    <div className="h-6 bg-blue-300/40 rounded w-32 mx-auto mb-2 animate-shimmer"></div>
                    
                    
                    <div className="h-4 bg-blue-200/30 rounded w-24 mx-auto animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          sponsorsData.map((sponsorTier, index) => (
            <div key={index} className="flex flex-col items-center mb-16">
              <h3 className="font-poppins text-2xl font-semibold text-white mb-8 capitalize">
                {sponsorTier.tier.charAt(0).toUpperCase() + sponsorTier.tier.slice(1)} Sponsors
              </h3>

              <div className="flex justify-center gap-6 flex-wrap">
              { sponsorTier.sponsors.map((sponsor) => (
                <SponsorCard key={sponsor._id} sponsor={sponsor} tier={sponsorTier.tier} />
              )) }

              </div>
            </div>
          ))
        )}
         
      </div>
    </div>
  );
};

export default SponsorsSection;
