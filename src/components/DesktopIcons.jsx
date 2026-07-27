import React from 'react';

// Behance Monogram Bē SVG
export const BehanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
    {/* Draw B */}
    <path d="M8.5 7H4.5v10h4c1.65 0 3-1.35 3-3v-1c0-.85-.35-1.6-.9-2.15.55-.55.9-1.3.9-2.15V9c0-1.65-1.35-3-3-3zM6.5 9h2c.55 0 1 .45 1 1v0c0 .55-.45 1-1 1h-2V9zm2 6h-2v-2h2c.55 0 1 .45 1 1v0c0 .55-.45 1-1 1z" fill="currentColor" />
    {/* Draw e */}
    <path d="M15.5 11.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5v-.5h-4.5c.1-1 .9-1.5 1.8-1.5.5 0 1 .2 1.2.6l.8-.6c-.4-.7-1.2-1-2-1zm1.5 2h-3.3c.1-.8.7-1.2 1.5-1.2s1.3.4 1.8 1.2z" fill="currentColor" />
    {/* Draw dash above e */}
    <rect x="14" y="9.5" width="3" height="1.2" fill="currentColor" />
  </svg>
);

// Figma SVG
export const FigmaIcon = () => (
  <svg width="20" height="28" viewBox="0 0 24 36" fill="none">
    <path d="M12 6a6 6 0 1 0-6 6h6V6z" fill="#F24E1E"/>
    <path d="M12 12a6 6 0 1 0 6 6v-6h-6z" fill="#FF7262"/>
    <path d="M12 18a6 6 0 1 0-6 6h6v-6z" fill="#A259FF"/>
    <path d="M18 12a6 6 0 1 0-6-6v6h6z" fill="#1ABC9C"/>
    <path d="M6 30a6 6 0 0 0 6-6v-6H6a6 6 0 1 0 0 12z" fill="#0ACF82"/>
  </svg>
);

// Terminal Console SVG
export const TerminalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
    <rect x="2" y="3" width="20" height="18" rx="3" fill="#1C1C1E" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" />
    {/* Window controls */}
    <circle cx="5" cy="6" r="0.75" fill="#FF5F56" stroke="none" />
    <circle cx="7.5" cy="6" r="0.75" fill="#FFBD2E" stroke="none" />
    <circle cx="10" cy="6" r="0.75" fill="#27C93F" stroke="none" />
    {/* Console text prompt */}
    <path d="M6 11l3 2.5-3 2.5" stroke="#A58CFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="11" y1="16" x2="16" y2="16" stroke="#A58CFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Notes Document SVG
export const NotesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#FFBD2E]">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#FFFBE6" stroke="#F59E0B" strokeWidth="1" />
    {/* Top spiral bound binder dots */}
    <line x1="6" y1="2" x2="6" y2="5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="2" x2="12" y2="5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="2" x2="18" y2="5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    {/* Legal lines */}
    <line x1="6" y1="9" x2="18" y2="9" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
    <line x1="6" y1="13" x2="18" y2="13" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
    <line x1="6" y1="17" x2="14" y2="17" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
  </svg>
);

// Mail SVG
export const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-white">
    <rect x="2" y="4" width="20" height="16" rx="3" fill="url(#mail-bg)" stroke="none" />
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
    {/* Envelope flap lines */}
    <path d="M22 6l-10 7L2 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 18l6.5-5.5M22 18l-6.5-5.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.25" strokeLinecap="round" />
    <defs>
      <linearGradient id="mail-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
  </svg>
);

// Likes Heart Icon SVG
export const LikesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#likes-bg)" stroke="none" />
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
    <path d="M12 7.6c1.3-1.6 3.5-2.2 5.1-.6 1.7 1.7 1.7 4.4 0 6l-5.1 5-5.1-5c-1.7-1.6-1.7-4.3 0-6 1.6-1.6 3.8-1 5.1.6z" fill="#FFFFFF" stroke="none" />
    <defs>
      <linearGradient id="likes-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF416C" />
        <stop offset="1" stopColor="#FF4B2B" />
      </linearGradient>
    </defs>
  </svg>
);

// Skills/Toolbox Icon SVG
export const SkillsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
    <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#skills-bg)" stroke="none" />
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
    {/* Toolbox handle */}
    <path d="M9 4V2.5C9 2.2 9.2 2 9.5 2h5c.3 0 .5.2.5.5V4" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" />
    {/* Grid / Building blocks */}
    <rect x="6" y="8" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.3" stroke="none" />
    <rect x="14" y="8" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.3" stroke="none" />
    <rect x="10" y="13" width="4" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.9" stroke="none" />
    <defs>
      <linearGradient id="skills-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9C27B0" />
        <stop offset="1" stopColor="#673AB7" />
      </linearGradient>
    </defs>
  </svg>
);
