import React, { useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaTimes } from 'react-icons/fa';
import { DragonCrest, DragonFlame } from './DragonCrest';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const TeamMemberModal = ({ member, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  const roles = Array.isArray(member.role)
    ? member.role
    : (member.role ? [member.role] : []);

  const imageSrc = member.imageUrl || (member._id ? `${baseURL}/members/${member._id}/image` : null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#250912]/95 via-[#15040a]/95 to-[#080104]/98 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_55px_rgba(220,38,38,0.4)] overflow-hidden animate-fadeInScale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red Dragon Crest Watermark background */}
        <div className="absolute -top-12 -right-12 opacity-15 pointer-events-none w-64 h-64">
          <DragonCrest className="w-full h-full" glow={false} />
        </div>

        {/* Ambient Top Glow Line in Fire Red */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 border border-white/10 hover:border-red-400/50 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Header / Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
          <div className="relative flex-shrink-0">
            <img
              src={imageSrc || "https://placehold.co/128x128/1d040a/f43f5e?text=GLUG"}
              alt={member.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full ring-3 ring-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/128x128/1d040a/f43f5e?text=GLUG";
              }}
            />
            {/* Dragon Crest Floating Badge */}
            <div className="absolute -bottom-1 -right-1 bg-[#15040a] rounded-full p-1 border border-red-500/60 shadow-md">
              <DragonCrest className="w-5 h-5" glow={true} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-white tracking-wide">
              {member.name}
            </h3>

            {/* Roles with Red Dragon Fire */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-2">
              {roles.map((role, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-red-600/25 to-rose-600/25 text-rose-300 border border-red-500/40 shadow-sm"
                >
                  <DragonFlame className="w-3 h-3 text-red-400" />
                  {role}
                </span>
              ))}
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
              {(member.linkedin || member.linkedinUrl) && (
                <a
                  href={member.linkedin || member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 hover:text-white border border-blue-500/30 transition-all text-xs font-medium"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}

              {(member.instagram || member.instagramUrl || member.insta) && (
                <a
                  href={member.instagram || member.instagramUrl || member.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 hover:text-white border border-rose-500/30 transition-all text-xs font-medium"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio / Description */}
        <div className="pt-4 border-t border-red-500/25">
          <p className="text-xs uppercase tracking-widest text-red-400/80 font-semibold mb-2">
            About & Club Contribution
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {member.description || "Passionate open-source advocate contributing to GNU/Linux technologies and collaborative development at Jorhat Engineering College."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
