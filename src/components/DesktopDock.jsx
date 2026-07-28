import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Common Icon Container Wrapper with macOS Squircle Glass Shine
const IconContainer = ({ children, bgGradient, shadowColor = 'rgba(0,0,0,0.3)' }) => (
  <div 
    className="w-full h-full rounded-[14px] relative overflow-hidden flex items-center justify-center select-none"
    style={{
      background: bgGradient,
      boxShadow: `0 4px 12px ${shadowColor}, inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.3)`
    }}
  >
    {/* Glossy Top Glass Reflection Arc */}
    <div 
      className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0) 100%)',
        borderTopLeftRadius: '14px',
        borderTopRightRadius: '14px'
      }}
    />
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      {children}
    </div>
  </div>
);

// 1. Finder Icon
const FinderIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #60A5FA 0%, #2563EB 50%, #1E3A8A 100%)" shadowColor="rgba(37,99,235,0.4)">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M7 9C7 9 8 8 9.5 8C11 8 11.5 9 11.5 9" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12.5 9C12.5 9 13 8 14.5 8C16 8 17 9 17 9" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 14.5C8 14.5 9.5 17 12 17C14.5 17 16 14.5 16 14.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12" y1="6" x2="12" y2="18" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  </IconContainer>
);

// 2. Mission Control (Case Studies) Icon
const MissionControlIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #818CF8 0%, #4F46E5 50%, #3730A3 100%)" shadowColor="rgba(79,70,229,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.25" strokeOpacity="0.4" strokeDasharray="3 2" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="#F43F5E" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    </svg>
  </IconContainer>
);

// 3. Identity App Icon (Profile / Bio)
const IdentityIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E3A8A 100%)" shadowColor="rgba(29,78,216,0.4)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="white" strokeWidth="1.75" fill="none" />
      <path d="M5 19c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="white" strokeWidth="1.75" strokeLinecap="round" fill="none" />
      <circle cx="17.5" cy="7.5" r="2" fill="#10B981" />
      <path d="M16.5 7.5l.75.75 1.5-1.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconContainer>
);

// 4. Skill Tree Icon
const SkillTreeIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #C084FC 0%, #8B5CF6 50%, #5B21B6 100%)" shadowColor="rgba(139,92,246,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16M12 9.5l6-3.5M12 14.5l-6-3.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="4" r="2" fill="white" />
      <circle cx="18" cy="6" r="2" fill="#F59E0B" />
      <circle cx="6" cy="11" r="2" fill="#38BDF8" />
      <circle cx="12" cy="20" r="2" fill="#10B981" />
    </svg>
  </IconContainer>
);

// 5. Design Lab Icon
const DesignLabIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #22D3EE 0%, #06B6D4 50%, #047857 100%)" shadowColor="rgba(6,182,212,0.4)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M9 4h6M12 4v5M8 18h8l-3-9h-2l-3 9z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M8.8 15.5h6.4" stroke="white" strokeWidth="1" strokeDasharray="1.5 1.5" />
      <circle cx="11" cy="16.5" r="0.9" fill="white" />
      <circle cx="13" cy="14" r="0.7" fill="white" />
    </svg>
  </IconContainer>
);

// 6. Money OS Icon
const MoneyOSIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #38BDF8 0%, #0284C7 50%, #0F172A 100%)" shadowColor="rgba(2,132,199,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="white" strokeWidth="1.5" fill="none" />
      <line x1="4" y1="10" x2="20" y2="10" stroke="white" strokeWidth="1.5" />
      <rect x="7" y="13" width="3.5" height="2.5" rx="0.75" fill="#F59E0B" />
      <path d="M15 14h2M13 14h0.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  </IconContainer>
);

// 7. Journal Icon
const JournalIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #92400E 100%)" shadowColor="rgba(245,158,11,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="4" width="14" height="16" rx="2" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.6" />
      <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="11.5" x2="16" y2="11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="15" x2="13" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 4v7l-1.5-1-1.5 1V4" fill="#EF4444" />
    </svg>
  </IconContainer>
);

// 8. Assets Vault Icon
const VaultIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #FB923C 0%, #F97316 50%, #9A3412 100%)" shadowColor="rgba(249,115,22,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 8a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" stroke="white" strokeWidth="1.6" fill="none" />
      <rect x="10" y="11.5" width="4" height="3" rx="1" fill="#F59E0B" stroke="white" strokeWidth="0.8" />
      <path d="M12 10v1.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  </IconContainer>
);

// 9. Core Interests Icon
const InterestsIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #F472B6 0%, #EC4899 50%, #9D174D 100%)" shadowColor="rgba(236,72,153,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 7.6c1.3-1.6 3.5-2.2 5.1-.6 1.7 1.7 1.7 4.4 0 6l-5.1 5-5.1-5c-1.7-1.6-1.7-4.3 0-6 1.6-1.6 3.8-1 5.1.6z" fill="white" />
      <path d="M18 5l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#F59E0B" />
    </svg>
  </IconContainer>
);

// 10. Travel Log Icon
const TravelIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #1E3A8A 100%)" shadowColor="rgba(14,165,233,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="3.2" ry="7" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.7" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
      <path d="M15 7l2 1.5-1.5 2.5L18 12l-4-1" fill="#F59E0B" />
    </svg>
  </IconContainer>
);

// 11. Safari Icon
const SafariIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #60A5FA 0%, #007AFF 50%, #1E3A8A 100%)" shadowColor="rgba(0,122,255,0.45)">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="1.4" fill="none" opacity="0.9" />
      <polygon points="15.5,8.5 13,13 8.5,15.5 11,11" fill="white" />
      <polygon points="15.5,8.5 13,13 11,11" fill="#EF4444" />
      <circle cx="12" cy="12" r="1" fill="#1E293B" />
    </svg>
  </IconContainer>
);

// 12. Figma Icon Component
const FigmaIconComponent = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #334155 0%, #1E293B 100%)" shadowColor="rgba(15,23,42,0.5)">
    <svg width="18" height="24" viewBox="0 0 24 36" fill="none">
      <path d="M12 6a6 6 0 1 0-6 6h6V6z" fill="#F24E1E"/>
      <path d="M12 12a6 6 0 1 0 6 6v-6h-6z" fill="#FF7262"/>
      <path d="M12 18a6 6 0 1 0-6 6h6v-6z" fill="#A259FF"/>
      <path d="M18 12a6 6 0 1 0-6-6v6h6z" fill="#1ABC9C"/>
      <path d="M6 30a6 6 0 0 0 6-6v-6H6a6 6 0 1 0 0 12z" fill="#0ACF82"/>
    </svg>
  </IconContainer>
);

// 13. Notes Icon Component
const NotesIconComponent = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #FEF08A 0%, #FDE047 50%, #CA8A04 100%)" shadowColor="rgba(202,138,4,0.45)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="#FEF9C3" stroke="#EAB308" strokeWidth="1" />
      <line x1="4" y1="7.5" x2="20" y2="7.5" stroke="#EAB308" strokeWidth="1.5" />
      <line x1="7" y1="11" x2="17" y2="11" stroke="#A16207" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="7" y1="14" x2="17" y2="14" stroke="#A16207" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="7" y1="17" x2="13" y2="17" stroke="#A16207" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  </IconContainer>
);

// 14. Trash Icon
const TrashIcon = () => (
  <div 
    className="w-full h-full rounded-[14px] flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-md"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7H20" />
      <path d="M10 4H14C14.5523 4 15 4.44772 15 5V7H9V5C9 4.44772 9.44772 4 10 4Z" />
      <path d="M6 7L7 20C7 20.5523 7.44772 21 8 21H16C16.5523 21 17 20.5523 17 20L18 7" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  </div>
);

// DOCK APPS MAPPED DIRECTLY TO WORKING SYSTEM APPS
const DOCK_APPS = [
  { id: 'mission', label: 'Case Studies', IconComponent: MissionControlIcon },
  { id: 'identity', label: 'Identity & Bio', IconComponent: IdentityIcon },
  { id: 'skills', label: 'Skill Matrix', IconComponent: SkillTreeIcon },
  { id: 'lab', label: 'Design Lab', IconComponent: DesignLabIcon },
  { id: 'money', label: 'Money OS', IconComponent: MoneyOSIcon },
  { id: 'journal', label: 'Journal', IconComponent: JournalIcon },
  { id: 'vault', label: 'Assets Vault', IconComponent: VaultIcon },
  { id: 'interests', label: 'Core Interests', IconComponent: InterestsIcon },
  { id: 'travel', label: 'Travel Log', IconComponent: TravelIcon },
  { id: 'safari', label: 'Safari Browser', IconComponent: SafariIcon },
  { id: 'notes', label: 'Notes', IconComponent: NotesIconComponent },
  { id: 'figma', label: 'Figma Studio', IconComponent: FigmaIconComponent },
];

function DockIcon({ app, mouseX, onAppClick, isOpen, isMobile = false }) {
  const ref = useRef(null);
  const [isBouncing, setIsBouncing] = useState(false);
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [44, 80, 44]);
  const width = useSpring(widthSync, { mass: 0.08, stiffness: 180, damping: 14 });

  // Y-axis lift on magnification (macOS Sequoia behavior)
  const ySync = useTransform(distance, [-120, 0, 120], [0, -10, 0]);
  const yLift = useSpring(ySync, { mass: 0.08, stiffness: 180, damping: 14 });

  const handleClick = () => {
    if (onAppClick) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 700);
      onAppClick(app.id);
    }
  };

  return (
    <div className="relative group flex flex-col items-center">
      {/* Tooltip — macOS Sequoia style */}
      {!isMobile && (
        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          <div className="bg-[#EFEFEF]/95 backdrop-blur-md text-[#1D1D1F] text-[12px] font-medium px-3 py-1.5 rounded-md shadow-sm border border-black/5 whitespace-nowrap">
            {app.label}
          </div>
          <div className="w-2.5 h-2.5 bg-[#EFEFEF]/95 border-b border-r border-black/5 rotate-45 mx-auto -mt-[5px]"></div>
        </div>
      )}

      <motion.button
        ref={ref}
        style={isMobile ? { width: 48, height: 48 } : { width, height: width, y: yLift }}
        animate={isBouncing ? { y: [0, -24, 0, -14, 0, -6, 0] } : {}}
        transition={isBouncing ? { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] } : {}}
        onClick={handleClick}
        className="aspect-square rounded-[16px] flex items-center justify-center relative active:scale-90 transition-transform cursor-pointer border-none p-0 outline-none bg-transparent"
      >
        <app.IconComponent />
      </motion.button>

      {/* Active Indicator dot underneath */}
      {isOpen && (
        <div className="dock-active-glow" />
      )}
    </div>
  );
}

const DesktopDock = ({ onAppClick, openApps = {} }) => {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const finderApp = { id: 'identity', label: 'Finder (Identity & Bio)', IconComponent: FinderIcon };
  const trashApp = { id: 'vault', label: 'Trash (Vault Files)', IconComponent: TrashIcon };

  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-4 right-4 h-20 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-[28px] z-[100] flex items-center justify-around px-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)] select-none pointer-events-auto">
        {DOCK_APPS.slice(0, 4).map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            onAppClick={onAppClick}
            isOpen={openApps[app.id]}
            isMobile={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] max-w-max select-none pointer-events-auto">
      {/* Dock glass shelf wrapper */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="dock-glass flex items-end gap-2.5 px-3.5 py-2.5 rounded-[24px] relative"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 24px 60px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* Finder */}
        <DockIcon
          app={finderApp}
          mouseX={mouseX}
          onAppClick={onAppClick}
          isOpen={openApps['identity']}
        />

        {/* Main working apps */}
        {DOCK_APPS.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            onAppClick={onAppClick}
            isOpen={openApps[app.id]}
          />
        ))}

        {/* Separator before trash */}
        <div className="flex items-center self-stretch py-2">
          <div className="w-px h-8 bg-black/15 rounded-full"></div>
        </div>

        {/* Trash */}
        <DockIcon
          app={trashApp}
          mouseX={mouseX}
          onAppClick={onAppClick}
          isOpen={openApps['vault']}
        />
      </motion.div>
    </div>
  );
};

export default DesktopDock;
