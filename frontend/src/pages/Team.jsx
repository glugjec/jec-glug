import React from "react";
import ClubHead from "../components/TeamComponents/ClubHead";
import CoHeads from "../components/TeamComponents/CoHeads";
import TechnicalTeam from "../components/TeamComponents/TechnicalTeam";
import DesignTeam from "../components/TeamComponents/DesignTeam";
import ManagementTeam from "../components/TeamComponents/ManagementTeam";
import SocialTeam from "../components/TeamComponents/SocialTeam";
import General from "../components/TeamComponents/General";

const Team = () => {
  return (
    <div className="min-h-screen bg-transparent px-4 sm:px-6 md:px-8 py-10 sm:py-12"
    style={{ backgroundImage: "url('/teampagebackground.png')" }}>
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-3">
        Our Team
      </h2>

      <p className="text-sm sm:text-base text-center text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
        Meet the passionate individuals who drive GLUG’s mission of promoting open-source culture and innovation.
      </p>

      <div className="flex justify-center mb-10">
        <span className="bg-gray-700 text-white px-4 py-1 rounded-full text-xs sm:text-sm shadow">
          Session 2025–2026
        </span>
      </div>

      {/* Team Sections */}
      <div className="space-y-10">
        <ClubHead />
        <CoHeads />
        <TechnicalTeam />
        <DesignTeam />
        <ManagementTeam />
        <SocialTeam />
        <General />
      </div>
    </div>
  );
};

export default Team;
