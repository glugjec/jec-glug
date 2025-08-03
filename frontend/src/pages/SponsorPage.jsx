import React, { useEffect, useState } from 'react';
import SponsorSection from '../components/SponsorSection';
import SponsorContact from '@/components/SponsorContact';
import axios from 'axios';

const SponsorPage = () => {
  const [sponsorsData, setSponsorsData] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get('https://glug-website-backend.vercel.app/sponsors');
        const sponsors = response.data;

        const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];

        // Normalize tier names to lowercase for consistent access
        const grouped = sponsors.reduce((acc, sponsor) => {
          const tierKey = sponsor.tier.toLowerCase();
          if (!acc[tierKey]) acc[tierKey] = [];
          acc[tierKey].push(sponsor);
          return acc;
        }, {});

        // Build the final ordered array
        const formatted = tierOrder
          .filter(tier => grouped[tier])
          .map(tier => ({
            tier, // keep it lowercase, capitalize only for display
            sponsors: grouped[tier]
          }));

        setSponsorsData(formatted);
      } catch (error) {
        console.error("Failed to fetch sponsors:", error);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <div>
      <SponsorSection sponsorsData={sponsorsData} />
      <SponsorContact />
    </div>
  );
};

export default SponsorPage;
