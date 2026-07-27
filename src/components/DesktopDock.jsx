import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FigmaIcon } from './DesktopIcons';

// Decorative Finder icon (blue face)
const FinderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="url(#finderGrad)" />
    <path d="M7 9.5C7 9.5 8 8.5 9.5 8.5C11 8.5 11.5 9.5 11.5 9.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12.5 9.5C12.5 9.5 13 8.5 14.5 8.5C16 8.5 17 9.5 17 9.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M8.5 14C8.5 14 10 16 12 16C14 16 15.5 14 15.5 14" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="12" y1="7" x2="12" y2="17" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.5" />
    <defs>
      <linearGradient id="finderGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#42A5F5" />
        <stop offset="1" stopColor="#1565C0" />
      </linearGradient>
    </defs>
  </svg>
);

// Decorative Trash icon (wire trash can)
const TrashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7H20" />
    <path d="M10 4H14C14.5523 4 15 4.44772 15 5V7H9V5C9 4.44772 9.44772 4 10 4Z" />
    <path d="M6 7L7 20C7 20.5523 7.44772 21 8 21H16C16.5523 21 17 20.5523 17 20L18 7" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const LaunchpadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="url(#launchpadGrad)" />
    <rect x="7" y="7" width="3.5" height="3.5" rx="1" fill="white" />
    <rect x="13.5" y="7" width="3.5" height="3.5" rx="1" fill="white" />
    <rect x="7" y="13.5" width="3.5" height="3.5" rx="1" fill="white" />
    <rect x="13.5" y="13.5" width="3.5" height="3.5" rx="1" fill="white" />
    <defs>
      <linearGradient id="launchpadGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9D50BB" />
        <stop offset="1" stopColor="#6E48AA" />
      </linearGradient>
    </defs>
  </svg>
);

const NotionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#FFFFFF" />
    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="#1C1C1E" />
    <path d="M7 16V8L14 13.5V8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="17" y1="8" x2="17" y2="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const AppStoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="url(#appstoreGrad)" />
    <path d="M12 7L7.5 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 7L16.5 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9.5 13.5H14.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="appstoreGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#42A5F5" />
        <stop offset="1" stopColor="#1976D2" />
      </linearGradient>
    </defs>
  </svg>
);

const PodcastsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#F4F4F5" />
    <rect x="6.5" y="11" width="3" height="6" rx="1.5" fill="#A855F7" />
    <rect x="10.5" y="7" width="3" height="10" rx="1.5" fill="#A855F7" />
    <rect x="14.5" y="9" width="3" height="8" rx="1.5" fill="#A855F7" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#FFFFFF" />
    <path d="M2 6.5C2 4.01472 4.01472 2 6.5 2H17.5C19.9853 2 22 4.01472 22 6.5V9H2V6.5Z" fill="#FF3B30" />
    <text x="12" y="7.5" fill="white" fontSize="5" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">JUL</text>
    <text x="12" y="18" fill="black" fontSize="9" fontWeight="500" fontFamily="sans-serif" textAnchor="middle">21</text>
  </svg>
);

const AcrobatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#E21836" />
    <path d="M14.5 7C16.5 9 16.5 12 14.5 14C12.5 16 8 16.5 7 16.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M7 7C5 9 5 12 7 14C9 16 13 16.5 14.5 16.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Removed terminal icon from app dock
const DOCK_APPS = [
  { id: 'launchpad', label: 'Launchpad', IconComponent: LaunchpadIcon, color: '' },
  { id: 'figma', label: 'Figma', IconComponent: FigmaIcon, color: '' },
  { id: 'notion', label: 'Notion', IconComponent: NotionIcon, color: '' },
  { id: 'appstore', label: 'App Store', IconComponent: AppStoreIcon, color: '' },
  { id: 'podcasts', label: 'Podcasts', IconComponent: PodcastsIcon, color: '' },
  { id: 'calendar', label: 'Calendar', IconComponent: CalendarIcon, color: '' },
  { id: 'acrobat', label: 'Acrobat Reader', IconComponent: AcrobatIcon, color: '' },
];

function DockIcon({ app, mouseX, onAppClick, isOpen, isDecorative = false, isMobile = false }) {
  const ref = useRef(null);
  const [isBouncing, setIsBouncing] = useState(false);
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [44, 80, 44]);
  const width = useSpring(widthSync, { mass: 0.08, stiffness: 180, damping: 14 });

  // Y-axis lift on magnification (macOS 26 behavior)
  const ySync = useTransform(distance, [-120, 0, 120], [0, -8, 0]);
  const yLift = useSpring(ySync, { mass: 0.08, stiffness: 180, damping: 14 });

  const handleClick = () => {
    if (!isDecorative && onAppClick) {
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
        style={isMobile ? { width: 50 } : { width, y: yLift }}
        animate={isBouncing ? { y: [0, -24, 0, -14, 0, -6, 0] } : {}}
        transition={isBouncing ? { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] } : {}}
        onClick={handleClick}
        className="aspect-square rounded-2xl flex items-center justify-center relative shadow-md bg-white/5 active:scale-90 transition-transform"
      >
        <div className="w-[110%] h-[110%] flex items-center justify-center">
          <app.IconComponent />
        </div>
      </motion.button>

      {/* Active Indicator dot underneath — dark for light glass */}
      {isOpen && (
        <div className="dock-active-glow" />
      )}
    </div>
  );
}

const DesktopDock = ({ onAppClick, openApps = {} }) => {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile width dynamically
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Decorative items
  const finderApp = { id: 'finder', label: 'Finder', IconComponent: FinderIcon, color: '' };
  const trashApp = { id: 'trash', label: 'Trash', IconComponent: TrashIcon, color: '' };

  if (isMobile) {
    // iPhone style dock container: fixed at bottom, floating glass bar containing exactly 4 apps
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
        className="dock-glass flex items-end gap-3 px-3 py-2 rounded-[22px] relative"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 24px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Finder */}
        <DockIcon
          app={finderApp}
          mouseX={mouseX}
          onAppClick={() => {}}
          isOpen={false}
          isDecorative={true}
        />

        {/* Main apps */}
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
          <div className="w-px h-8 bg-black/10 rounded-full"></div>
        </div>

        {/* Trash */}
        <DockIcon
          app={trashApp}
          mouseX={mouseX}
          onAppClick={() => {}}
          isOpen={false}
          isDecorative={true}
        />
      </motion.div>
    </div>
  );
};

export default DesktopDock;
