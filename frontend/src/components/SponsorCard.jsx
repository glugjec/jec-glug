const SponsorCard = ({ sponsor, tier }) => {
  const getLogoColor = () => {
    switch (tier) {
      case 'platinum': return 'bg-gray-300 text-gray-600';
      case 'gold': return 'bg-yellow-400 text-white';
      case 'silver': return 'bg-gray-400 text-white';
      case 'bronze': return 'bg-orange-500 text-white';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className="w-56 h-64 md:w-64 md:h-72 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex flex-col items-center justify-center p-8 group hover:bg-white/20 transition-all duration-300">
      {/* --- SIZE MODIFICATION ---
          - Logo Container: Increased from w-20/h-20 to w-24/h-24 on small screens and w-28/h-28 on medium screens.
          - Logo Font Size: Increased from text-xl/2xl to text-2xl/3xl.
      */}
      <div className={`w-24 h-24 md:w-28 md:h-28 ${getLogoColor()} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-2xl md:text-3xl font-bold">{sponsor.logo}</span>
      </div>
      <div className="font-poppins text-center">
        {/* --- SIZE MODIFICATION ---
            - Title Font Size: Increased from text-base/lg to text-lg/xl.
        */}
        <div className="text-white font-bold text-lg md:text-xl mb-2">{sponsor.title}</div>
        {/* --- SIZE MODIFICATION ---
            - Partner Type Font Size: Increased from text-sm/base to text-base/lg.
        */}
        <div className="text-white/70 text-base md:text-lg">{sponsor.partnerType}</div>
      </div>
    </div>
  );
};

export default SponsorCard;