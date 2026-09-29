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

  const getTierStyle = () => {
    switch (normalizedTier) {
      case 'platinum':
        return {
          card: 'border-[#3093E5]/50 shadow-[0_0_25px_rgba(48,147,229,0.25)] hover:shadow-[0_0_40px_rgba(48,147,229,0.5)] hover:border-[#3093E5]',
          ring: 'ring-[#3093E5]/60',
          accent: 'text-[#7cc0ff]',
        };
      case 'gold':
        return {
          card: 'border-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:shadow-[0_0_35px_rgba(250,204,21,0.4)] hover:border-yellow-400/80',
          ring: 'ring-yellow-400/60',
          accent: 'text-yellow-300',
        };
      default:
        return {
          card: 'border-white/25 shadow-[0_0_15px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:border-white/50',
          ring: 'ring-white/40',
          accent: 'text-white/70',
        };
    }
  };

  const style = getTierStyle();
  const logoUrl = sponsor.imageUrl; // use backend-provided image URL

  return (
    <div
      className={`w-56 h-64 md:w-64 md:h-72 bg-gradient-to-b from-white/15 to-[#0a1f5c]/40 backdrop-blur-md rounded-2xl border flex flex-col items-center justify-center p-8 group transition-all duration-300 hover:-translate-y-2 ${style.card}`}
    >
      {/* Logo */}
      <div
        className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-6 overflow-hidden ring-2 ring-offset-2 ring-offset-transparent group-hover:scale-110 transition-transform duration-300 ${style.ring} ${getLogoColor()}`}
      >
        <img
          src={logoUrl}
          alt={sponsor.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Sponsor Info */}
      <div className="font-poppins text-center">
        <div className="text-white font-bold text-lg md:text-xl mb-2">{sponsor.title}</div>
        <div className={`text-sm md:text-base font-medium ${style.accent}`}>{sponsor.partnerType}</div>
      </div>
    </div>
  );
};

export default SponsorCard;