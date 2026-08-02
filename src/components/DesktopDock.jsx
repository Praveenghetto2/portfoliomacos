import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Common Icon Container Wrapper with macOS Squircle Glass Shine
const IconContainer = ({ children, bgGradient, shadowColor = 'rgba(0,0,0,0.3)' }) => (
  <div 
    className="w-full h-full rounded-[22.5%] relative overflow-hidden flex items-center justify-center select-none"
    style={{
      background: bgGradient,
      boxShadow: `0 8px 18px ${shadowColor}, inset 0 1px 1.5px rgba(255,255,255,0.45), inset 0 -1.5px 2px rgba(0,0,0,0.3)`
    }}
  >
    {/* Glossy Top Glass Reflection Arc */}
    <div 
      className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0) 100%)',
        borderTopLeftRadius: '22.5%',
        borderTopRightRadius: '22.5%'
      }}
    />
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      {children}
    </div>
  </div>
);

// 1. Finder Icon (Simple Apple Style)
const FinderIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #60A5FA 0%, #007AFF 100%)" shadowColor="rgba(0,122,255,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M9 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="white" stroke="none" />
      <path d="M8 15c1 1.5 2.5 2 4 2s3-.5 4-2" />
      <line x1="12" y1="9" x2="12" y2="14" strokeWidth="1.2" opacity="0.6" />
    </svg>
  </IconContainer>
);

// 2. Mission Control (Case Studies) Icon — Simple Apple Style
const MissionControlIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #818CF8 0%, #5856D6 100%)" shadowColor="rgba(88,86,214,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  </IconContainer>
);

// 3. Identity App Icon — Simple Apple Style
const IdentityIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #3B82F6 0%, #007AFF 100%)" shadowColor="rgba(0,122,255,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </IconContainer>
);

// 4. Skill Tree Icon — Simple Apple Style
const SkillTreeIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #C084FC 0%, #AF52DE 100%)" shadowColor="rgba(175,82,222,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="9" y="14" width="6" height="6" rx="1.5" />
      <path d="M7 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" />
      <line x1="12" y1="13" x2="12" y2="14" />
    </svg>
  </IconContainer>
);

// 5. Design Lab Icon — Simple Apple Style
const DesignLabIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #4ADE80 0%, #34C759 100%)" shadowColor="rgba(52,199,89,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2" />
      <line x1="8.5" y1="2" x2="15.5" y2="2" />
      <line x1="7" y1="14.5" x2="17" y2="14.5" strokeDasharray="2 2" opacity="0.8" />
    </svg>
  </IconContainer>
);

// 6. Money OS Icon — Simple Apple Style
const MoneyOSIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #FBBF24 0%, #FF9F0A 100%)" shadowColor="rgba(255,159,10,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" opacity="0.8" />
    </svg>
  </IconContainer>
);

// 7. Journal Icon — Simple Apple Style
const JournalIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #FFE047 0%, #FFD60A 100%)" shadowColor="rgba(255,214,10,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" opacity="0.7" />
      <line x1="16" y1="17" x2="8" y2="17" opacity="0.7" />
      <line x1="10" y1="9" x2="8" y2="9" opacity="0.7" />
    </svg>
  </IconContainer>
);

// 8. Assets Vault Icon — Simple Apple Style
const VaultIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #38BDF8 0%, #64D2FF 100%)" shadowColor="rgba(100,210,255,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="2" fill="white" />
    </svg>
  </IconContainer>
);

// 9. Core Interests Icon — Simple Apple Style
const InterestsIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #F472B6 0%, #FF2D55 100%)" shadowColor="rgba(255,45,85,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  </IconContainer>
);

// 10. Travel Log Icon — Simple Apple Style
const TravelIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #2DD4BF 0%, #30B0C7 100%)" shadowColor="rgba(48,176,199,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="white" opacity="0.3" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  </IconContainer>
);

// 11. Safari Icon — Simple Apple Style
const SafariIcon = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #60A5FA 0%, #007AFF 100%)" shadowColor="rgba(0,122,255,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  </IconContainer>
);

// 12. Figma Icon Component
const FigmaIconComponent = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #334155 0%, #1E293B 100%)" shadowColor="rgba(15,23,42,0.4)">
    <svg width="18" height="24" viewBox="0 0 24 36" fill="none">
      <path d="M12 6a6 6 0 1 0-6 6h6V6z" fill="#F24E1E"/>
      <path d="M12 12a6 6 0 1 0 6 6v-6h-6z" fill="#FF7262"/>
      <path d="M12 18a6 6 0 1 0-6 6h6v-6z" fill="#A259FF"/>
      <path d="M18 12a6 6 0 1 0-6-6v6h6z" fill="#1ABC9C"/>
      <path d="M6 30a6 6 0 0 0 6-6v-6H6a6 6 0 1 0 0 12z" fill="#0ACF82"/>
    </svg>
  </IconContainer>
);

// 13. Notes Icon Component — Simple Apple Style
const NotesIconComponent = () => (
  <IconContainer bgGradient="linear-gradient(135deg, #FFE047 0%, #FFD60A 100%)" shadowColor="rgba(255,214,10,0.3)">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" opacity="0.7" />
      <line x1="16" y1="17" x2="8" y2="17" opacity="0.7" />
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
  { id: 'figma', label: 'Studio App', IconComponent: FigmaIconComponent },
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
        className="aspect-square rounded-[22.5%] flex items-center justify-center relative active:scale-90 transition-transform cursor-pointer border-none p-0 outline-none bg-transparent"
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
