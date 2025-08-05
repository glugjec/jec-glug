import React, { useEffect, useState } from 'react';
import SponsorSection from '../components/SponsorSection';
import SponsorContact from '@/components/SponsorContact';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SponsorPage = () => {
  const [sponsorsData, setSponsorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(`${baseURL}/sponsors`);
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
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <div>
      <SponsorSection sponsorsData={sponsorsData} loading={loading} />
      <SponsorContact />
    </div>
  );
};

export default SponsorPage;
