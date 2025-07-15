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
    <div className="w-40 h-40 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex flex-col items-center justify-center p-4 group hover:bg-white/20 transition-all duration-300">
      <div className={`w-16 h-16 ${getLogoColor()} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-lg font-bold">{sponsor.logo}</span>
      </div>
      <div className="text-center">
        <div className="text-white font-semibold text-sm mb-1">{sponsor.title}</div>
        <div className="text-white/70 text-xs">{sponsor.partnerType}</div>
      </div>
    </div>
  );
};

export default SponsorCard;