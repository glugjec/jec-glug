import SponsorCard from './SponsorCard';

const SponsorsSection = ({ sponsorsData, loading = false }) => {

  // Galaxy background: stars + deep blue gradient
  const galaxyStyle = {
    backgroundImage: [
      'radial-gradient(1px 1px at 20px 30px, #fff 50%, transparent)',
      'radial-gradient(1.5px 1.5px at 90px 70px, #9ecbff 50%, transparent)',
      'radial-gradient(1px 1px at 160px 120px, #fff 50%, transparent)',
      'radial-gradient(ellipse at top, rgba(48,147,229,0.35), transparent 60%)',
      'linear-gradient(to bottom, #020b2e, #06184f 60%, #0a2a7a)',
    ].join(','),
    backgroundSize: '200px 200px, 250px 250px, 300px 300px, 100% 100%, 100% 100%',
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-12 sm:pt-16 px-2 sm:px-4" style={galaxyStyle}>
      {/* Soft glow behind heading */}
      <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#3093E5]/25 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="font-canno text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] font-bold text-center mb-3 bg-gradient-to-r from-[#3093E5] to-[#FFFFFF] bg-clip-text text-transparent">
          OUR SPONSORS
        </h1>
        <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#3093E5] to-white/70"></div>

        {/* Intro Text */}
        <p className="font-poppins text-base sm:text-lg leading-relaxed text-blue-100/80 text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-2">
          We are grateful to our sponsors who support our mission and help us organize amazing events for the community.
        </p>

        {loading ? (
          [...Array(3)].map((_, tierIndex) => (
            <div key={tierIndex} className="flex flex-col items-center mb-12 sm:mb-16">
              <div className="h-5 sm:h-6 bg-blue-300/40 rounded w-32 sm:w-48 mb-6 sm:mb-8 animate-shimmer"></div>

              <div className="flex justify-center gap-3 sm:gap-6 flex-wrap px-2">
                {[...Array(tierIndex === 0 ? 1 : tierIndex === 1 ? 2 : 1)].map((_, cardIndex) => (
                  <div key={cardIndex} className="bg-gradient-to-b from-white/20 to-gray-500/20 backdrop-blur-lg rounded-[16px] sm:rounded-[20px] p-4 sm:p-8 w-64 sm:w-80 max-w-full animate-pulse">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-blue-400/30 rounded-full mx-auto mb-4 sm:mb-6 animate-shimmer"></div>
                    <div className="h-4 sm:h-6 bg-blue-300/40 rounded w-24 sm:w-32 mx-auto mb-2 animate-shimmer"></div>
                    <div className="h-3 sm:h-4 bg-blue-200/30 rounded w-16 sm:w-24 mx-auto animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          sponsorsData.map((sponsorTier, index) => (
            <div key={index} className="flex flex-col items-center mb-12 sm:mb-16">
              <div className="flex items-center gap-4 w-full max-w-xl mb-7 sm:mb-9">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#3093E5]/70"></div>
                <h3 className="font-poppins text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-white whitespace-nowrap">
                  {sponsorTier.tier} Sponsors
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#3093E5]/70"></div>
              </div>

              <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap w-full px-2">
                {sponsorTier.sponsors.map((sponsor) => (
                  <SponsorCard key={sponsor._id} sponsor={sponsor} tier={sponsorTier.tier} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SponsorsSection;