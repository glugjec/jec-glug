import SponsorCard from './SponsorCard';

const SponsorsSection = ({ sponsorsData }) => {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          OUR SPONSORS
        </h2>
        
        {/* Intro Text */}
        <p className="text-lg text-white text-center max-w-2xl mx-auto mb-12 opacity-90">
          We are grateful to our sponsors who support sports mission and help us organize amazing events for the community.
        </p>

        {/* All Sponsors */}
        {sponsorsData.map((sponsorTier, index) => (
          <div key={index} className="flex flex-col items-center mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 capitalize">
              {sponsorTier.tier} Sponsors
            </h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {sponsorTier.sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} tier={sponsorTier.tier} />
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default SponsorsSection;
