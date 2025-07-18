import React from 'react'
import SponsorSection from '../components/SponsorSection';
import SponsorContact from '@/components/SponsorContact';

const SponsorPage = () => {

    const sponsorsData = [
    {
        tier: "platinum",
        sponsors: [
        {
            id: 1,
            title: "TechCorp Solutions",
            description: "Leading technology solutions provider with 20+ years of experience in enterprise software development and digital transformation.",
            logo: "T",
            partnerType: "Technology Partner"
        },
        {
            id: 2,
            title: "Oil India Limited",
            description: "Major oil and gas exploration company committed to sustainable energy solutions and community development.",
            logo: "O",
            partnerType: "Energy Partner"
        }
        ]
    },
    {
        tier: "gold",
        sponsors: [
        {
            id: 3,
            title: "FoodTech Industries",
            description: "Innovative food technology company specializing in sustainable food production and culinary excellence.",
            logo: "F",
            partnerType: "Culinary Partner"
        },
        {
            id: 4,
            title: "SportMax Media",
            description: "Premier sports media company providing comprehensive coverage and broadcasting services for sporting events.",
            logo: "SM",
            partnerType: "Media Partner"
        }
        ]
    },
    {
        tier: "silver",
        sponsors: [
        {
            id: 5,
            title: "DesignPro Labs",
            description: "Creative design studio offering branding, UI/UX design, and visual identity solutions for modern businesses.",
            logo: "D",
            partnerType: "Design Partner"
        },
        {
            id: 6,
            title: "CloudTech Systems",
            description: "Cloud infrastructure and cybersecurity solutions provider helping businesses scale securely in the digital age.",
            logo: "C",
            partnerType: "Cloud Partner"
        }
        ]
    },
    {
        tier: "bronze",
        sponsors: [
        {
            id: 7,
            title: "Innovate Tech",
            description: "Emerging technology startup focused on AI-driven solutions for small and medium enterprises.",
            logo: "I",
            partnerType: "Tech Sponsor"
        },
        {
            id: 8,
            title: "StartupHub",
            description: "Startup incubator and accelerator program supporting entrepreneurs in building scalable technology ventures.",
            logo: "S",
            partnerType: "Startup Partner"
        },
        {
            id: 9,
            title: "CodeCraft",
            description: "Software development consultancy specializing in custom web applications and mobile solutions.",
            logo: "CC",
            partnerType: "Dev Partner"
        }
        ]
    }
    ];

  return (
    <div>
      <SponsorSection sponsorsData={sponsorsData} />
      <SponsorContact />
    </div>
  )
}

export default SponsorPage
