import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';

const DesktopWindow = ({ 
  id, 
  title, 
  isOpen, 
  onClose, 
  onMinimize, 
  activeWindow, 
  onFocus, 
  children, 
  defaultPosition = { x: 120, y: 90 }, 
  width = "650px", 
  height = "500px",
  defaultMaximized = false,
}) => {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(defaultMaximized);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef(null);

  // Sync maximized state on open if defaultMaximized is requested
  useEffect(() => {
    if (isOpen && defaultMaximized) {
      setIsMaximized(true);
    }
  }, [isOpen, defaultMaximized]);

  // Detect mobile width dynamically
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Stagger content reveal after window opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 120);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const handlePointerDown = (e) => {
    if (isMaximized || isMobile) return;
    dragControls.start(e);
    onFocus(id);
  };

  if (!isOpen) return null;

  const isActive = activeWindow === id;

  const windowStyle = (isMaximized || isMobile)
    ? { 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        left: 0, 
        top: 0,
        zIndex: 1000,
        borderRadius: 0,
      }
    : { 
        width, 
        height, 
        position: 'absolute',
      };

  // macOS 26 spring configuration — tuned for premium feel
  const windowSpring = { type: "spring", stiffness: 340, damping: 28, mass: 0.8 };

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized && !isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      initial={isMobile
        ? { opacity: 0, y: "100%", scale: 1, filter: 'blur(4px)' }
        : (isMaximized 
            ? { opacity: 0, x: 0, y: 0, scale: 0.92, filter: 'blur(8px)' } 
            : { opacity: 0, scale: 0.65, y: 40, filter: 'blur(12px)', ...defaultPosition }
          )
      }
      animate={{ 
        opacity: 1,
        scale: 1, 
        y: (isMaximized || isMobile) ? 0 : undefined,
        x: (isMaximized || isMobile) ? 0 : undefined,
        filter: 'blur(0px)',
        zIndex: (isMaximized || isMobile) ? 1000 : (isActive ? 500 : 200),
      }}
      exit={isMobile
        ? { opacity: 0, y: "100%", filter: 'blur(4px)', transition: { duration: 0.25, ease: "easeOut" } }
        : { 
            opacity: 0, 
            scale: 0.75, 
            y: 60, 
            filter: 'blur(8px)',
            transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] }
          }
      }
      transition={windowSpring}
      style={windowStyle}
      className={`macos-glass flex flex-col overflow-hidden select-none pointer-events-auto border-black/10 ${(isMaximized || isMobile) ? 'rounded-none shadow-none border-0' : 'rounded-2xl border shadow-apple-md'} ${isActive ? 'window-active-focus' : 'window-inactive-blur'} transition-[width,height,top,left,border-radius] duration-300 ease-in-out`}
      onPointerDown={() => onFocus(id)}
    >
      {/* WINDOW HEADER — Refined Glass */}
      <div 
        onPointerDown={handlePointerDown}
        className={`window-header-glass h-9 flex items-center px-4 cursor-move select-none relative flex-shrink-0 z-[60] ${(isMaximized || isMobile) ? 'pt-[28px] h-auto pb-2' : ''}`}
      >
        {isMobile ? (
          /* iPhone back navigation trigger */
          <div className="flex gap-2 items-center z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="flex items-center gap-1 text-[#4F46E5] font-display font-semibold text-[14.5px] bg-transparent border-0 outline-none active:opacity-60 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Back</span>
            </button>
          </div>
        ) : (
          /* macOS Traffic Lights with glow halos */
          <div className="flex gap-2 items-center z-10 window-control-group">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="traffic-close w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 flex items-center justify-center transition-all duration-150 cursor-default"
            >
              <span className="window-dot-symbol text-[8px] font-bold text-[#4c0000]/80 leading-none mb-[1.5px]">×</span>
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (isMaximized) {
                  setIsMaximized(false);
                } else {
                  onMinimize();
                }
              }} 
              className="traffic-minimize w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 flex items-center justify-center transition-all duration-150 cursor-default"
            >
              <span className="window-dot-symbol text-[9px] font-bold text-[#5c3e00]/80 leading-none mb-[3.5px]">−</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} 
              className="traffic-maximize w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1EAB2F]/60 flex items-center justify-center transition-all duration-150 cursor-default"
            >
              <span className="window-dot-symbol text-[7px] font-bold text-[#024d00]/80 leading-none">⤢</span>
            </button>
          </div>
        )}

        {/* Window Title */}
        <span className="absolute inset-0 flex items-center justify-center text-[13px] font-body font-medium text-[#3d3d3d]/80 pointer-events-none select-none">
          {title}
        </span>
      </div>

      {/* WINDOW BODY — Premium gradient + noise */}
      <div 
        className={`flex-grow flex-shrink flex-1 overflow-auto window-body-premium select-text relative ${showContent ? 'window-content-reveal' : ''}`} 
        data-lenis-prevent="true"
        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.15s ease' }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default DesktopWindow;
