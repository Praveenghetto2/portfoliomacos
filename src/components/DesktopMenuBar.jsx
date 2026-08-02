import React, { useState, useEffect, useRef } from 'react';
import { 
  playSystemSound, 
  startInterstellarMusic, 
  stopInterstellarMusic, 
  toggleInterstellarMusic, 
  isInterstellarPlaying 
} from '../utils/sound';

/* ── SVG Icon Components ── */
/* ── Ultra-High-Fidelity macOS SVG Icon Components ── */
const AppleLogo = () => (
  <svg width="15" height="18" viewBox="0 0 170 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.1-3.63-3.05-7.6-7.85-11.9-14.4-7.41-11.37-13.1-23.77-17.06-37.2-3.96-13.43-5.94-25.96-5.94-37.58 0-14.65 3.57-26.69 10.7-36.12 7.14-9.43 16.19-14.28 27.16-14.55 4.88 0 10.15 1.25 15.82 3.75 5.66 2.5 9.7 3.75 12.1 3.75 2.12 0 6.23-1.31 12.33-3.93 6.1-2.62 11.47-3.81 16.1-3.57 11.83.63 21.36 4.7 28.58 12.22-10.42 6.3-15.52 14.88-15.3 25.75.22 8.65 3.53 15.85 9.94 21.6 6.4 5.75 14.07 8.95 23 9.6-2.5 7.41-5.83 14.82-10.01 22.23zm-27.11-105.5c0 6.64-2.45 13.06-7.36 19.26-4.91 6.2-10.74 9.79-17.5 10.78-.11-.87-.17-1.74-.17-2.62 0-6.64 2.56-13.2 7.69-19.68 5.13-6.48 11.02-10.1 17.68-10.86.11.98.17 1.8.17 2.45z"/>
  </svg>
);

const WifiIcon = () => (
  <svg width="17" height="13" viewBox="0 0 18 14" fill="none">
    <path d="M1.5 4.2C5.5 1.1 12.5 1.1 16.5 4.2" stroke="#34C759" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 6.8C6.6 4.6 11.4 4.6 14 6.8" stroke="#34C759" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
    <path d="M6.5 9.4C7.9 8.2 10.1 8.2 11.5 9.4" stroke="#34C759" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="9" cy="12" r="1.2" fill="#34C759" />
  </svg>
);

const BluetoothIcon = () => (
  <svg width="12" height="15" viewBox="0 0 12 16" fill="none">
    <path d="M2 4.5L10 9L6 13V1L10 5L2 9.5" stroke="#007AFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BatteryIcon = ({ percent = 100 }) => {
  const fillWidth = Math.max(0, Math.min(100, percent));
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
      <rect x="0.8" y="0.8" width="21" height="10.4" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="2.5" y="2.5" width={fillWidth * 0.176} height="7" rx="2" fill={percent > 20 ? '#34C759' : '#FF3B30'} opacity="0.95"/>
    </svg>
  );
};

const ControlCenterIcon = () => (
  <svg width="15" height="13" viewBox="0 0 16 14" fill="none">
    <rect x="0.5" y="0.5" width="6.5" height="5.5" rx="2" fill="#007AFF" opacity="0.9"/>
    <rect x="9" y="0.5" width="6.5" height="5.5" rx="2" fill="#34C759" opacity="0.9"/>
    <rect x="0.5" y="8" width="6.5" height="5.5" rx="2" fill="#FF9F0A" opacity="0.9"/>
    <rect x="9" y="8" width="6.5" height="5.5" rx="2" fill="#AF52DE" opacity="0.9"/>
  </svg>
);

const DesktopMenuBar = ({ 
  onModeToggle, 
  onRestart, 
  onSearch, 
  onLaunchApp,
  activeWallpaper = '/assets/custom_zen_wallpaper.jpg',
  onChangeWallpaper,
  volume = 80,
  onChangeVolume,
  brightness = 100,
  onChangeBrightness,
  currentLayout = 'os'
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(isInterstellarPlaying());

  const appleDropdownRef = useRef(null);
  const controlCenterRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeStr(
        date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
      setDateStr(
        date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).replace(/,/g, '')
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (appleDropdownRef.current && !appleDropdownRef.current.contains(e.target)) {
        setAppleMenuOpen(false);
      }
      if (controlCenterRef.current && !controlCenterRef.current.contains(e.target)) {
        setControlCenterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'DesignOS', appId: null },
    { label: 'File', appId: null },
    { label: 'Edit', appId: null },
    { label: 'View', appId: null },
    { label: 'Go', appId: null },
    { label: 'Window', appId: null },
    { label: 'Help', appId: null },
  ];

  return (
    <header
      className="menubar-glass fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-4 select-none z-[100]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}
    >
      {/* ── Left Side ── */}
      <div className="flex items-center gap-0 relative" ref={appleDropdownRef}>
        {/* Apple Logo Button */}
        <button
          onClick={() => {
            setAppleMenuOpen(!appleMenuOpen);
            setControlCenterOpen(false);
          }}
          className="flex items-center justify-center w-8 h-7 cursor-default rounded hover:bg-black/5 transition-colors duration-150 outline-none border-none bg-transparent text-apple-text/80"
          aria-label="Apple Menu"
        >
          <AppleLogo />
        </button>

        {/* Apple Dropdown Menu */}
        {appleMenuOpen && (
          <div
            className="absolute top-7 left-0 w-60 rounded-lg shadow-2xl p-1 z-[200] flex flex-col text-[13px] text-white/90"
            style={{
              background: 'rgba(30, 30, 30, 0.82)',
              backdropFilter: 'blur(60px) saturate(180%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%)',
              border: '0.5px solid rgba(255, 255, 255, 0.15)',
              animation: 'fadeIn 0.12s ease-out',
            }}
          >
            {/* Version Header */}
            <div className="px-3 py-1.5 text-white/40 text-[11px] font-medium tracking-wide">
              DesignOS v1.0.0
            </div>
            <div className="h-px bg-white/10 mx-2 my-0.5" />

            {/* About */}
            <button
              onClick={() => {
                setShowAboutModal(true);
                setAppleMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#0A84FF] hover:text-white transition-colors duration-100 cursor-default bg-transparent border-none text-white/90 text-[13px]"
              style={{ fontFamily: 'inherit' }}
            >
              About This Simulator
            </button>

            <div className="h-px bg-white/10 mx-2 my-0.5" />

            {/* Switch Mode */}
            <button
              onClick={() => {
                if (onModeToggle) onModeToggle(currentLayout === 'os' ? 'figma' : 'os');
                setAppleMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#0A84FF] hover:text-white transition-colors duration-100 cursor-default bg-transparent border-none text-white/90 text-[13px]"
              style={{ fontFamily: 'inherit' }}
            >
              Switch to {currentLayout === 'os' ? 'Studio' : 'Desktop'} Mode
            </button>

            {/* Reboot */}
            <button
              onClick={() => {
                if (onRestart) onRestart();
                setAppleMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#0A84FF] hover:text-white transition-colors duration-100 cursor-default bg-transparent border-none text-white/90 text-[13px]"
              style={{ fontFamily: 'inherit' }}
            >
              Restart…
            </button>

            <div className="h-px bg-white/10 mx-2 my-0.5" />

            {/* Shut Down placeholder */}
            <button
              className="w-full text-left px-3 py-1.5 rounded-md hover:bg-[#0A84FF] hover:text-white transition-colors duration-100 cursor-default bg-transparent border-none text-white/40 text-[13px]"
              style={{ fontFamily: 'inherit' }}
              disabled
            >
              Shut Down…
            </button>
          </div>
        )}

        {/* Menu Items */}
        {menuItems.map((item, i) => (
          <span
            key={item.label}
            onClick={() => {
              if (item.label === 'DesignOS') {
                setAppleMenuOpen(true);
              }
            }}
            className={`cursor-default px-2.5 h-7 flex items-center text-[13px] font-medium rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-100 ${
              i === 0 ? 'text-apple-text font-bold' : 'text-apple-text/80'
            } ${i > 0 ? 'hidden md:flex' : ''}`}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* ── Right Side ── */}
      <div className="flex items-center gap-1 relative" ref={controlCenterRef}>
        {/* WiFi */}
        <span
          onClick={() => {
            setWifiOn(!wifiOn);
            playSystemSound('click', volume);
          }}
          className={`h-7 w-7 flex items-center justify-center cursor-default hover:bg-black/5 rounded transition-colors duration-100 ${wifiOn ? 'text-apple-text/80' : 'text-apple-text/30'}`}
          title={wifiOn ? 'WiFi Connected: Home_5G' : 'WiFi Disconnected'}
        >
          <WifiIcon />
        </span>

        {/* Bluetooth */}
        <span
          onClick={() => {
            setBluetoothOn(!bluetoothOn);
            playSystemSound('click', volume);
          }}
          className={`h-7 w-6 items-center justify-center cursor-default hover:bg-black/5 rounded transition-colors duration-100 hidden sm:flex ${bluetoothOn ? 'text-apple-text/70' : 'text-apple-text/25'}`}
          title={bluetoothOn ? 'Bluetooth: On' : 'Bluetooth: Off'}
        >
          <BluetoothIcon />
        </span>

        {/* Battery */}
        <div
          className="flex items-center gap-1 text-apple-text/70 h-7 px-1.5 cursor-default hover:bg-black/5 rounded transition-colors duration-100"
          title="Battery 100%"
        >
          <span className="text-[11px] font-medium text-apple-text/50 hidden sm:inline">100%</span>
          <BatteryIcon percent={100} />
        </div>

        {/* Interstellar Deep Focus Music Button */}
        <button
          onClick={() => {
            const playing = toggleInterstellarMusic(volume);
            setMusicPlaying(playing);
          }}
          className={`h-5 px-2.5 rounded-full flex items-center gap-1.5 text-[10.5px] font-mono font-bold transition-all cursor-pointer border outline-none ${
            musicPlaying 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/40 shadow-sm animate-pulse' 
              : 'bg-black/5 hover:bg-black/10 text-apple-text/80 border-black/5'
          }`}
          title="Hans Zimmer — Interstellar Organ Deep Focus Theme"
        >
          <span>{musicPlaying ? '🎵 Interstellar' : '🌌 Focus'}</span>
        </button>

        {/* Search */}
        <span
          className="text-apple-text/70 h-7 w-7 flex items-center justify-center cursor-default hover:bg-black/5 rounded transition-colors duration-100 hidden sm:flex"
          title="Spotlight Search (⌘K)"
          onClick={() => onSearch && onSearch()}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>

        {/* Control Center Toggle */}
        <span
          onClick={() => {
            setControlCenterOpen(!controlCenterOpen);
            setAppleMenuOpen(false);
            playSystemSound('click', volume);
          }}
          className={`h-7 w-7 flex items-center justify-center cursor-default rounded transition-colors duration-100 ${controlCenterOpen ? 'bg-black/10 text-apple-text' : 'text-apple-text/70 hover:bg-black/5'}`}
          title="Control Center"
        >
          <ControlCenterIcon />
        </span>

        {/* User Avatar */}
        <span
          className="h-7 w-7 flex items-center justify-center cursor-default hover:bg-black/5 rounded transition-colors duration-100 hidden sm:flex"
          title="Praveen Kumar"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#34C759] to-[#30D158] border border-white/40 shadow-sm" />
        </span>

        {/* Date & Time */}
        <span className="text-[13px] font-medium text-apple-text/80 cursor-default hover:bg-black/5 px-2 h-7 flex items-center rounded transition-colors duration-100 tracking-wide whitespace-nowrap">
          {dateStr}&ensp;{timeStr}
        </span>

        {/* ── Control Center Panel ── */}
        {controlCenterOpen && (
          <div
            className="absolute top-8 right-0 w-80 rounded-2xl shadow-2xl p-4 z-[200] flex flex-col text-[13px] text-white/95"
            style={{
              background: 'rgba(28, 28, 30, 0.85)',
              backdropFilter: 'blur(50px) saturate(210%)',
              WebkitBackdropFilter: 'blur(50px) saturate(210%)',
              border: '0.5px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
              animation: 'fadeIn 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Now Playing - Interstellar Deep Focus Card */}
            <div className="bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-slate-900/80 border border-purple-500/30 rounded-xl p-3 mb-3 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0">
                  🚀
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[12px] text-white truncate">Interstellar Theme</span>
                  <span className="text-[10px] text-purple-200/80 font-mono truncate">Hans Zimmer · Deep Focus</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const playing = toggleInterstellarMusic(volume);
                  setMusicPlaying(playing);
                }}
                className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform cursor-pointer shadow-md flex-shrink-0"
              >
                {musicPlaying ? '❚❚' : '▶'}
              </button>
            </div>
            {/* Top Row: System Status (Toggles Grid) */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Connection Box */}
              <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-2.5">
                <div 
                  onClick={() => {
                    setWifiOn(!wifiOn);
                    playSystemSound('click', volume);
                  }} 
                  className="flex items-center gap-2.5 cursor-default hover:opacity-80 transition-opacity"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors ${wifiOn ? 'bg-[#0A84FF]' : 'bg-white/10'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.59 16.11a6 6 0 0 1 6.82 0M12 20h.01"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[11px] leading-tight">Wi-Fi</span>
                    <span className="text-[9px] text-white/50 leading-none">{wifiOn ? 'Home_5G' : 'Off'}</span>
                  </div>
                </div>
                
                <div 
                  onClick={() => {
                    setBluetoothOn(!bluetoothOn);
                    playSystemSound('click', volume);
                  }} 
                  className="flex items-center gap-2.5 cursor-default hover:opacity-80 transition-opacity"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors ${bluetoothOn ? 'bg-[#0A84FF]' : 'bg-white/10'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 4l8 3.5-4 3V0l4 3.5L1 10"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[11px] leading-tight">Bluetooth</span>
                    <span className="text-[9px] text-white/50 leading-none">{bluetoothOn ? 'On' : 'Off'}</span>
                  </div>
                </div>
              </div>

              {/* Mode Toggle Box */}
              <div 
                className="bg-white/10 rounded-xl p-3 flex flex-col justify-between cursor-default hover:bg-white/15 transition-colors" 
                onClick={() => {
                  playSystemSound('click', volume);
                  if (onModeToggle) onModeToggle(currentLayout === 'os' ? 'figma' : 'os');
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#5856D6] flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 17H5V5h14v12h-4" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[11px] leading-tight">Workspace</span>
                    <span className="text-[9px] text-white/50 leading-none">{currentLayout === 'os' ? 'Desktop' : 'Studio'}</span>
                  </div>
                </div>
                <span className="text-[9px] text-white/40 leading-none mt-4 font-mono uppercase">Toggle Layout</span>
              </div>
            </div>

            {/* Brightness Slider */}
            <div className="bg-white/10 rounded-xl p-3 mb-2 flex flex-col">
              <span className="text-[10px] font-semibold text-white/40 block mb-1">SCREEN BRIGHTNESS</span>
              <div className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-white/60"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={brightness} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onChangeBrightness && onChangeBrightness(val);
                  }}
                  className="flex-grow h-1.5 bg-white/20 rounded-lg appearance-none cursor-default accent-white outline-none" 
                />
                <span className="text-[10px] font-mono text-white/60 w-7 text-right">{brightness}%</span>
              </div>
            </div>

            {/* Volume Slider */}
            <div className="bg-white/10 rounded-xl p-3 mb-3 flex flex-col">
              <span className="text-[10px] font-semibold text-white/40 block mb-1">SYSTEM VOLUME</span>
              <div className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-white/60"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onChangeVolume && onChangeVolume(val);
                    playSystemSound('volume', val);
                  }}
                  className="flex-grow h-1.5 bg-white/20 rounded-lg appearance-none cursor-default accent-white outline-none" 
                />
                <span className="text-[10px] font-mono text-white/60 w-7 text-right">{volume}%</span>
              </div>
            </div>

            {/* Desktop Wallpaper Picker */}
            <div className="bg-white/10 rounded-xl p-3 flex flex-col">
              <span className="text-[10px] font-semibold text-white/40 block mb-2">DESKTOP WALLPAPER</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { name: 'Zen Oasis', path: '/assets/custom_zen_wallpaper.jpg' },
                  { name: 'Tahoe', path: '/assets/tahoe_light.jpg' },
                  { name: 'Sequoia', path: '/assets/macos_26_wallpaper.jpg' },
                  { name: 'OS Black', path: '/assets/designos_wallpaper.jpg' }
                ].map((wp) => (
                  <button
                    key={wp.name}
                    onClick={() => {
                      playSystemSound('click', volume);
                      onChangeWallpaper && onChangeWallpaper(wp.path);
                    }}
                    className={`flex flex-col items-center justify-center p-1 rounded-lg border transition-all cursor-default outline-none ${activeWallpaper === wp.path ? 'bg-white/15 border-white/35' : 'bg-black/20 border-transparent hover:bg-black/35'}`}
                  >
                    <div 
                      className="w-full h-7 rounded bg-cover bg-center border border-white/10"
                      style={{ backgroundImage: `url(${wp.path})` }}
                    />
                    <span className="text-[9px] mt-1 font-mono text-white/70 tracking-tight">{wp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* About This Simulator Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAboutModal(false)}>
          <div 
            className="w-[360px] rounded-2xl bg-[#1E1E1E]/90 text-white p-6 shadow-2xl border border-white/15 flex flex-col items-center text-center relative overflow-hidden"
            style={{ backdropFilter: 'blur(50px) saturate(180%)', animation: 'contentFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowAboutModal(false)}
              className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 hover:brightness-110 flex items-center justify-center cursor-default group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-[#4c0000]/80">×</span>
            </button>

            {/* Profile Avatar / Logo */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg mb-4">
              <div className="w-full h-full rounded-full bg-[#1E1E1E] flex items-center justify-center text-2xl font-bold font-display text-white">
                PK
              </div>
            </div>

            <h3 className="text-lg font-bold font-display text-white tracking-tight">Praveen Kumar</h3>
            <p className="text-xs text-purple-400 font-mono mt-0.5 font-medium">Senior Product Designer & Creative Technologist</p>

            <div className="w-full my-4 h-px bg-white/10" />

            <div className="space-y-2 text-xs text-white/70 w-full text-left">
              <div className="flex justify-between">
                <span className="text-white/40">Location:</span>
                <span className="font-mono text-white/90">Bengaluru, IN 🇮🇳</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Education:</span>
                <span className="font-mono text-white/90">BCA (Computer Science)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Environment:</span>
                <span className="font-mono text-white/90">DesignOS v1.0 (macOS 26)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Core Focus:</span>
                <span className="font-mono text-white/90">GTM Platforms & AI UX</span>
              </div>
            </div>

            <button 
              onClick={() => setShowAboutModal(false)}
              className="mt-5 px-6 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-colors cursor-default"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default DesktopMenuBar;
