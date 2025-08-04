const SponsorCard = ({ sponsor, tier }) => {
  const normalizedTier = tier.toLowerCase();

  const getLogoColor = () => {
    switch (normalizedTier) {
      case 'platinum': return 'bg-gray-300 text-gray-600';
      case 'gold': return 'bg-yellow-400 text-white';
      case 'silver': return 'bg-gray-400 text-white';
      case 'bronze': return 'bg-orange-500 text-white';
      default: return 'bg-gray-300 text-gray-600';
    }
  };

  const logoUrl = sponsor.imageUrl; // use backend-provided image URL

  return (
    <div className="w-56 h-64 md:w-64 md:h-72 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex flex-col items-center justify-center p-8 group hover:bg-white/20 transition-all duration-300">
      {/* Logo */}
      <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-300 ${getLogoColor()}`}>
        <img
          src={logoUrl}
          alt={sponsor.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Sponsor Info */}
      <div className="font-poppins text-center">
        <div className="text-white font-bold text-lg md:text-xl mb-2">{sponsor.title}</div>
        <div className="text-white/70 text-base md:text-lg">{sponsor.partnerType}</div>
      </div>
    </div>
  );
};

export default SponsorCard;
