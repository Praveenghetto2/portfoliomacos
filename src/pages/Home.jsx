import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, ArrowUpRight, ArrowDown, ExternalLink, ArrowLeft, ArrowRight, RotateCw, Lock, Share2, Play, Layers, FileText, Send, CheckCircle, X } from 'lucide-react';

import DesktopMenuBar from '../components/DesktopMenuBar';
import DesktopDock from '../components/DesktopDock';
import DesktopWindow from '../components/DesktopWindow';
import FigmaHero from '../components/FigmaHero';
import { BehanceIcon, FigmaIcon, TerminalIcon, NotesIcon, LikesIcon, SkillsIcon } from '../components/DesktopIcons';

// DesignOS Core Components
import CommandPalette from '../components/designos/CommandPalette';
import LivingPortal from '../components/designos/LivingPortal';

// DesignOS 11 System Apps
import IdentityApp from '../components/apps/IdentityApp';
import MissionControlApp from '../components/apps/MissionControlApp';
import SkillTreeApp from '../components/apps/SkillTreeApp';
import DesignLabApp from '../components/apps/DesignLabApp';
import MoneyOSApp from '../components/apps/MoneyOSApp';
import JournalApp from '../components/apps/JournalApp';
import AssetsVaultApp from '../components/apps/AssetsVaultApp';
import InterestsApp from '../components/apps/InterestsApp';
import TravelLogApp from '../components/apps/TravelLogApp';

// Scrolling Page Subcomponents
import ChapterIndicator from '../components/ChapterIndicator';
import AnimatedCounter from '../components/AnimatedCounter';
import ContactSection from '../components/ContactSection';
import ImpactSection from '../components/ImpactSection';
import SplitReveal from '../components/SplitReveal';
import MagneticButton from '../components/MagneticButton';
import TextMarquee from '../components/TextMarquee';
import ProcessSection from '../components/ProcessSection';
import CaseStudy from './CaseStudy';
import './Home.css';
import { playSystemSound } from '../utils/sound';

// Custom designOS SVG Icons
const MovieIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#movie-bg)" stroke="none" />
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
    <circle cx="8" cy="8" r="2.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="16" cy="8" r="2.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="12" cy="15" r="2.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    <defs>
      <linearGradient id="movie-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E91E63" />
        <stop offset="1" stopColor="#9C27B0" />
      </linearGradient>
    </defs>
  </svg>
);

const MoneyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
    <rect x="3" y="5" width="18" height="14" rx="3" fill="url(#money-bg)" stroke="none" />
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
    <rect x="6" y="8" width="4" height="3" rx="1" fill="#FFFFFF" fillOpacity="0.4" stroke="none" />
    <line x1="3" y1="13" x2="21" y2="13" stroke="#FFFFFF" strokeWidth="1.5" />
    <defs>
      <linearGradient id="money-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00B4DB" />
        <stop offset="1" stopColor="#0083B0" />
      </linearGradient>
    </defs>
  </svg>
);

const LabIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#lab-bg)" stroke="none" />
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
    <path d="M9 5h6M12 5v6M8 17h8l-3-8h-2l-3 8z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="lab-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3F51B5" />
        <stop offset="1" stopColor="#00BCD4" />
      </linearGradient>
    </defs>
  </svg>
);

const ZipIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#zip-bg)" stroke="none" />
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
    <path d="M6 8h12M6 12h12M6 16h6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="14" y="14" width="4" height="3" rx="1" fill="#FFFFFF" fillOpacity="0.4" stroke="none" />
    <defs>
      <linearGradient id="zip-bg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF9800" />
        <stop offset="1" stopColor="#FF5722" />
      </linearGradient>
    </defs>
  </svg>
);

// 3D Tilt Card Helper Component for Awwwards-level interactive micro-movements
function TiltCard({ children, className, onClick }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max tilt: 10 degrees
    const rx = -((y - yc) / yc) * 10;
    const ry = ((x - xc) / xc) * 10;
    
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d'
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const CHAPTERS = [
  { id: 'hero', label: '01 Intro' },
  { id: 'philosophy', label: '02 Philosophy' },
  { id: 'work', label: '03 Work' },
  { id: 'process', label: '04 Process' },
  { id: 'craft', label: '05 Craft' },
  { id: 'impact', label: '06 Impact' },
  { id: 'about', label: '07 About' },
  { id: 'contact', label: '08 Contact' },
];

const Home = () => {
  const navigate = useNavigate();
  const workRef = useRef(null);
  const wallpaperRef = useRef(null);
  const heroRef = useRef(null);

  /* All useState Hooks at Top */
  const [currentMode, setCurrentMode] = useState('os'); // 'os' or 'figma'
  const [activeFigmaProject, setActiveFigmaProject] = useState(null); // null | 'revlitix-saas' | 'sonic'
  const [safariTab, setSafariTab] = useState('behance'); // 'behance' or 'resume'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStageText, setBootStageText] = useState('Initializing system...');
  const [islandIndex, setIslandIndex] = useState(0); // 0: Workspace, 1: Inspiration, 2: System, 3: Lab
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [selectionBox, setSelectionBox] = useState({ active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 });
  const [activeWindow, setActiveWindow] = useState(null);
  const [widgetsVisible, setWidgetsVisible] = useState(true);
  const [iconsVisible, setIconsVisible] = useState(true);
  const [windowsHidden, setWindowsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeExp, setActiveExp] = useState(0);
  const [launchingApp, setLaunchingApp] = useState(null);
  const [activeChapter, setActiveChapter] = useState('hero');
  const [hoveredWorkIndex, setHoveredWorkIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState('bio');
  const [selectedBehanceProject, setSelectedBehanceProject] = useState(null);
  const [appreciations, setAppreciations] = useState({
    'revlitix-saas': 280,
    'sonic': 195,
  });
  const [userAppreciated, setUserAppreciated] = useState({
    'revlitix-saas': false,
    'sonic': false,
  });
  const [behanceComments, setBehanceComments] = useState({
    'revlitix-saas': [
      { author: 'Sarah Jenkins', role: 'Product Lead @ Vercel', text: 'This is exceptionally thorough! The token architecture is a masterclass.' },
      { author: 'Hiroshi Tanaka', role: 'Senior UX Designer', text: 'Stunning colors and layouts. The query builder UX is very smart.' }
    ],
    'sonic': [
      { author: 'Alex Rivera', role: 'GTM Strategist', text: 'Reducing query discovery time by 60% is huge. Fantastic work!' },
      { author: 'Elena Rostova', role: 'UI Engineer', text: 'Excellent conversational states. Fits perfectly in the GTM workflow.' }
    ]
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [selectedPaymentType, setSelectedPaymentType] = useState('ach');
  const [paymentFlowStep, setPaymentFlowStep] = useState(0);
    const [activeWallpaper, setActiveWallpaper] = useState('/assets/macos_26_wallpaper.jpg');
  const [volume, setVolume] = useState(80);
  const [brightness, setBrightness] = useState(100);

  const [openApps, setOpenApps] = useState({
    identity: false,
    mission: false,
    skills: false,
    lab: false,
    money: false,
    journal: false,
    vault: false,
    interests: false,
    travel: false,
    safari: false,
    notes: false,
    figma: false,
    likes: false,
    movies: false,
    video_revlitix: false,
    video_sonic: false,
  });

  /* Mouse Parallax Values */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 25, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgParallaxX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const bgParallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const cardParallaxX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const cardParallaxY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const textParallaxX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const textParallaxY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  /* Scroll Parallax for Hero */
  const { scrollYProgress } = useScroll();
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], [-50, 350]);

  const handleMouseMoveParallax = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    
    // Gradient Orb tracking
    const ox = e.clientX - rect.left;
    const oy = e.clientY - rect.top;
    setMousePos({ x: ox, y: oy });

    // Parallax tracking
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  /* Active chapter scroll observer */
  useEffect(() => {
    if (currentMode !== 'figma') return;
    const handleScroll = () => {
      const offset = window.innerHeight * 0.35;
      let current = 'hero';

      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > 0) {
            current = ch.id;
          }
        }
      }
      setActiveChapter(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentMode]);

  // Mouse coordinate tracker to drift wallpaper parallax elements
  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (wallpaperRef.current) {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          wallpaperRef.current.style.setProperty('--mouse-x', `${x}%`);
          wallpaperRef.current.style.setProperty('--mouse-y', `${y}%`);
        }
        rafId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // System Boot Sequence Effect
  useEffect(() => {
    if (!booting) return;
    const stages = [
      { text: 'Loading Memories...', progress: 20 },
      { text: 'Loading Projects...', progress: 45 },
      { text: 'Loading Ideas...', progress: 70 },
      { text: 'Loading Dreams...', progress: 90 },
      { text: 'System ready.', progress: 100 }
    ];

    let currentStageIdx = 0;
    const interval = setInterval(() => {
      if (currentStageIdx < stages.length) {
        setBootStageText(stages[currentStageIdx].text);
        setBootProgress(stages[currentStageIdx].progress);
        currentStageIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 400);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [booting]);

  // Global ⌘ + K shortcut listener for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDesktopWheel = (e) => {
    if (currentMode !== 'os') return;
    if (e.deltaY > 0) {
      setIslandIndex((prev) => Math.min(prev + 1, 3));
    } else {
      setIslandIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Sync root element class list with currentMode layout state
  useEffect(() => {
    if (currentMode === 'os') {
      document.documentElement.classList.add('is-os-mode');
    } else {
      document.documentElement.classList.remove('is-os-mode');
    }
    return () => {
      document.documentElement.classList.remove('is-os-mode');
    };
  }, [currentMode]);

  // Check mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll observer for Figma Mode
  useEffect(() => {
    if (currentMode !== 'figma') return;
    const handleScroll = () => {
      const offset = window.innerHeight * 0.35;
      let current = 'hero';

      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > 0) {
            current = ch.id;
          }
        }
      }
      setActiveChapter(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentMode]);

  // Pause Lenis smooth scrolling in OS mode, resume in Figma scrolling mode
  useEffect(() => {
    if (currentMode === 'os' && !isMobile) {
      window.lenis?.stop();
    } else {
      window.lenis?.start();
    }
    return () => {
      window.lenis?.start();
    };
  }, [currentMode, isMobile]);

  const handleAppClick = (appId) => {
    playSystemSound('click', volume);
    // Trigger icon launch bounce animation
    setLaunchingApp(appId);
    setTimeout(() => setLaunchingApp(null), 550);
    // Slight delay so the bounce plays before window appears
    setTimeout(() => {
      playSystemSound('launch', volume);
      setWindowsHidden(false);
      setOpenApps((prev) => ({
        ...prev,
        [appId]: true,
      }));
      setActiveWindow(appId);
    }, 200);
  };

  const handleClose = (appId) => {
    playSystemSound('close', volume);
    setOpenApps((prev) => ({
      ...prev,
      [appId]: false,
    }));
    if (activeWindow === appId) {
      const remaining = Object.keys(openApps).filter(key => key !== appId && openApps[key]);
      setActiveWindow(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const handleFocus = (appId) => {
    setWindowsHidden(false);
    setActiveWindow(appId);
  };

  // Data Structures
  const projects = [
    {
      id: 'revlitix-saas',
      num: '01',
      title: 'Revlitix SaaS Platform',
      category: 'Fintech · UX Strategy · Design Systems',
      desc: 'An AI-powered analytics platform helping enterprise teams discover actionable insights, automate complex data operations, and make faster business decisions.',
      overview: 'Revlitix is a B2B revenue intelligence platform built for growing companies that need one trusted place to understand how their business is really performing. The platform brings together funnel tracking, revenue reporting, and AI-assisted analysis so sales, marketing, and growth teams can move from raw numbers to clear action, without stitching together spreadsheets and disconnected tools.',
      challenges: [
        { title: "Fragmented data sources", text: "Teams pulled numbers from multiple spreadsheets and tools, leading to inconsistent reporting and duplicated manual work." },
        { title: "Poor decision visibility", text: "Users couldn't quickly see where deals were slowing down or which channels were actually driving revenue." },
        { title: "Overwhelming, unstructured dashboards", text: "Metrics were displayed without clear hierarchy, making it hard to know what to look at first." }
      ],
      process: 'I ran discovery sessions with sales, marketing, and RevOps stakeholders to understand exactly which questions they needed answered daily, and how quickly they needed those answers. This shaped a core design principle I carried through the project: design around decisions, not just data categories. I built a modular dashboard design system that could scale as new reporting modules were added, anchored by a clean typographic scale, a blue-and-orange color system, and consistent spacing to keep dense information legible.',
      retrospective: 'This project sharpened my thinking around designing for ambiguity in dense, data-heavy products. The breakthrough came when I stopped treating design as a Figma exercise and started working directly inside the React codebase. By co-owning the Tailwind tokens and components with the engineering team, we shipped the interface in half the estimated time. The most valuable decisions I made weren\'t visual; they were architectural — establishing a shared component language that developers actually wanted to use.',
      heroImage: '/assets/revlitix_hero_v3.jpg',
      mockups: [
        '/assets/revlitix_funnel.jpg',
        '/assets/revlitix_design_system_v3.jpg',
        '/assets/revlitix_waterfall_v3.jpg'
      ],
      metrics: [
        { value: '25', prefix: '+', suffix: '%', label: 'Product Adoption' },
        { value: '40', prefix: '+', suffix: '%', label: 'Workflow Efficiency' },
        { value: '30', prefix: '-', suffix: '%', label: 'Time to Insight' }
      ]
    },
    {
      id: 'sonic',
      num: '02',
      title: 'Revlitix Sonic AI',
      category: 'AI Conversational UX · Design Systems',
      desc: 'An AI-powered natural language database query assistant built for marketing, sales, and product teams to extract automated visual business insights in real time.',
      overview: 'Sonic AI is Revlitix\'s AI-powered GTM analytics assistant that lets users interact with their revenue data in natural language, instantly generate reports, and receive AI-crafted insights, all within a single interface. The design challenge was to make complex GTM analytics feel simple, conversational, and immediately actionable.',
      challenges: [
        { title: "Cluttered Data", text: "Data scattered across multiple reports, forcing users to piece together their own picture of performance." },
        { title: "Steep Learning Curves", text: "Difficult for non-technical GTM teams who weren't comfortable navigating traditional BI tools." },
        { title: "Slow Insights", text: "Required manual report-building instead of providing quick, on-demand answers." }
      ],
      process: 'I focused on designing conversational micro-interactions: quick prompt suggestions, auto-complete input blocks, real-time typing indicators, and immediate feedback loop cards that visually showed the database search query. I built a dynamic chart rendering widget that automatically picked the best visual representation (bar chart, line graph, metric card) depending on the returned query data shape.',
      retrospective: 'Designing conversational AI is less about making the bot sound human and more about building user confidence. Visualizing the query parser logic in the UI demystified the AI\'s calculations and immediately built user trust. Bridging design specifications with the engineers early in the process was key to achieving this speed.',
      heroImage: '/assets/revlitix_website_product_images/6896089a9b458a0e5d353212_Frame 1321315474.png',
      mockups: [
        '/assets/revlitix_website_product_images/6896135103e8ca6406b070d3_Frame 1321315475.png',
        '/assets/revlitix_product_images/68959de2d249e7fc38c769dc_mainimg11.png',
        '/assets/revlitix_website_product_images/68960bded69109f50c5ac276_outcomesimg.png'
      ],
      metrics: [
        { value: '60', prefix: '+', suffix: '%', label: 'Faster Insights Discovery' },
        { value: '40', prefix: '-', suffix: '%', label: 'Data Support Tickets' },
        { value: '85', prefix: '+', suffix: '%', label: 'System Usability (SUS)' }
      ]
    }
  ];

  const principles = [
    {
      num: '01',
      title: 'I Started With Code',
      body: 'BCA in Computer Science. My first instinct was always to build, not sketch. That developer brain never left — it\'s why I obsess over implementation feasibility, performance, and token architecture before I ever open Figma.',
    },
    {
      num: '02',
      title: 'Then I Found Design',
      body: 'At DSG Inc, I was the UI developer who kept redesigning things without being asked. Turns out, I cared more about why users struggled than how the code compiled. That realization changed everything.',
    },
    {
      num: '03',
      title: 'Now I Bridge Both',
      body: 'At Revlitix and Candescent, I\'m the designer who speaks engineering. I design scalable systems — not just screens — because I\'ve been on the other side. I know what ships and what doesn\'t.',
    },
  ];

  const craftItems = [
    { title: 'Design Systems', desc: 'I\'ve built token-based component libraries at Revlitix that cut handoff time by 25%.', icon: '◈' },
    { title: 'AI Interfaces', desc: 'Designed Sonic — a natural language query tool that made databases feel conversational.', icon: '◎' },
    { title: 'Enterprise UX', desc: 'Currently shipping 600+ banking screens at Candescent for global financial workflows.', icon: '⬡' },
    { title: 'Front-End Code', desc: 'HTML, CSS, JS, React — I prototype in code, not just pixels.', icon: 'Aa' },
    { title: 'Conversion Design', desc: 'Built Webflow landing pages that drove 12% demo registration lift at Revlitix.', icon: '⟡' },
    { title: 'Motion & Polish', desc: 'After Effects, Lottie, CSS animations — the details that make enterprise feel premium.', icon: '∞' },
  ];

  const experiences = [
    {
      co: 'Candescent', role: 'UI/UX Designer', time: '2025 – Present', current: true,
      details: [
        'Lead product design for next-generation enterprise digital interfaces.',
        'Architect and scale the internal design system for development velocity.',
        'Collaborate cross-functionally with engineering and product management.',
      ],
      skills: ['Figma', 'Design Systems', 'Product Strategy', 'Usability Testing'],
    },
    {
      co: 'Revlitix', role: 'UI/UX Designer', time: '2023 – 2025',
      details: [
        'Spearheaded UX strategy for AI-powered SaaS features, driving 25% adoption lift.',
        'Designed a modular design system, streamlining handoffs by 25%.',
        'Built conversion-focused Webflow pages, achieving 12% demo registration lift.',
      ],
      skills: ['UX Strategy', 'Figma', 'Webflow', 'Usability Testing', 'Design Systems'],
    },
    {
      co: 'DSG, Inc.', role: 'UI Developer', time: '2021 – 2022',
      details: [
        'Led a flagship product redesign improving usability and task completion.',
        'Developed responsive front-end interfaces bridging design and engineering.',
      ],
      skills: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'WCAG'],
    },
    {
      co: 'IQVIA', role: 'Intern', time: '2020',
      details: [
        'Conducted data validation and UI testing for enterprise health portals.',
      ],
      skills: ['Data Quality', 'UI Testing', 'Enterprise Portals'],
    },
  ];

  if (booting) {
    return (
      <motion.div 
        className="boot-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Apple-style logo with subtle pulse */}
        <motion.div 
          className="boot-logo"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="68" height="68" viewBox="0 0 24 24" className="drop-shadow-[0_4px_30px_rgba(163,169,174,0.35)]">
            <defs>
              <linearGradient id="silverAppleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D5DCE2" />
                <stop offset="45%" stopColor="#A6ACB2" />
                <stop offset="100%" stopColor="#82888D" />
              </linearGradient>
            </defs>
            <path 
              fill="url(#silverAppleGrad)" 
              d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" 
            />
          </svg>
        </motion.div>
        
        {/* Refined progress bar */}
        <motion.div 
          className="boot-progress-track"
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="boot-progress-bar"
            initial={{ width: '0%' }}
            animate={{ width: `${bootProgress}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Boot Status Text */}
        <motion.p 
          className="text-[11px] font-mono text-white/40 mt-4 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {bootProgress < 30 ? 'Loading kernel...' : bootProgress < 60 ? 'Mounting design system...' : bootProgress < 90 ? 'Preparing workspace...' : 'Welcome, Praveen'}
        </motion.p>
      </motion.div>
    );
  }

  // --- FULL DESKTOP SIMULATOR WORKSPACE ---
  return (
    <main className="relative w-screen h-screen overflow-hidden select-none">
      
      {/* Subtle vignette overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.15) 100%)' }} />

      
      {/* Mode Label */}
      <div className="fixed bottom-[60px] right-6 z-[200] text-[9px] font-mono font-bold text-white/30 uppercase tracking-widest text-center pointer-events-none select-none" style={{ width: '136px' }}>
        Experience Mode
      </div>
      {/* FLOATING DESIGN MODE SELECTOR (Bottom Right) — Premium Glass Pill */}
      <div className="fixed bottom-6 right-6 z-[200] flex items-center bg-black/50 backdrop-blur-3xl border border-white/[0.12] p-[3px] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_0.5px_0_rgba(255,255,255,0.1)] select-none pointer-events-auto">
        <div className="relative flex items-center">
          {/* Sliding active indicator */}
          <motion.div 
            className="absolute top-0 bottom-0 rounded-full bg-white/[0.18] shadow-[0_0_20px_rgba(255,255,255,0.06),inset_0_0.5px_0_rgba(255,255,255,0.2)]"
            animate={{ 
              x: currentMode === 'os' ? 0 : '100%',
              width: currentMode === 'os' ? 56 : 68
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ height: '100%' }}
          />
          <button 
            onClick={() => { setCurrentMode('os'); setActiveFigmaProject(null); }}
            className="relative z-10 px-3.5 py-2 rounded-full text-[10px] font-mono font-bold uppercase transition-colors tracking-wider flex items-center gap-1.5 cursor-default text-white/90"
          >
            💻 OS
          </button>
          <button 
            onClick={() => setCurrentMode('figma')}
            className="relative z-10 px-3.5 py-2 rounded-full text-[10px] font-mono font-bold uppercase transition-colors tracking-wider flex items-center gap-1.5 cursor-default text-white/90"
          >
            ✦ Figma
          </button>
        </div>
      </div>

      {currentMode === 'figma' ? (
        activeFigmaProject ? (
          <div className="w-full h-full relative z-50 overflow-y-auto bg-[#FAFAFC]" data-lenis-prevent="true">
            <MissionControlApp 
              initialMission={activeFigmaProject} 
              onClose={() => setActiveFigmaProject(null)} 
            />
          </div>
        ) : (
          /* MODE 1: SCROLLING FIGMA CANVAS SITE (Bento Grid / Editorial Theme) */
          <div 
            className="w-full h-full overflow-y-auto select-text font-body bg-apple-bg text-[#1D1D1F]" 
            data-lenis-prevent="true"
            onMouseMove={handleMouseMoveParallax}
          >
          {/* ═══════ CHAPTER 1 — HERO ═══════ */}
          <div id="hero" ref={heroRef}>
            <FigmaHero />
          </div>

          {/* ═══════ STANDALONE IMPACT SUMMARY ═══════ */}
          <section className="hero-impact-summary-section">
            <div className="main-content">
              <div className="impact-bar-header">
                <span className="impact-bar-label">✦ IMPACT I'VE CREATED</span>
                <h2 className="impact-section-title">Driving measurable growth through design.</h2>
              </div>
              
              <div className="impact-bar-content">
                <div className="impact-bar-metrics-grid">
                  {/* Card 1 */}
                  <div className="impact-metric-card hover-target">
                    <div className="metric-card-header">
                      <span className="metric-card-arrow">↗</span>
                    </div>
                    <span className="metric-val-wrap">
                      <AnimatedCounter value="25" prefix="+" suffix="%" />
                    </span>
                    <span className="metric-lbl-primary">Product Adoption</span>
                    <span className="metric-lbl-sub">AI-powered analytics dashboards</span>
                    {/* Micro sparkline visual */}
                    <div className="metric-sparkline">
                      <svg viewBox="0 0 100 24" className="sparkline-svg">
                        <path d="M 0,20 Q 20,18 40,8 T 80,12 T 100,2" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="impact-metric-card hover-target">
                    <div className="metric-card-header">
                      <span className="metric-card-arrow">↗</span>
                    </div>
                    <span className="metric-val-wrap">
                      <AnimatedCounter value="50" prefix="+" suffix="%" />
                    </span>
                    <span className="metric-lbl-primary">Campaign Speed</span>
                    <span className="metric-lbl-sub">Through scalable product design systems</span>
                    <div className="metric-sparkline">
                      <svg viewBox="0 0 100 24" className="sparkline-svg">
                        <path d="M 0,22 Q 25,5 50,15 T 100,4" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="impact-metric-card hover-target">
                    <div className="metric-card-header">
                      <span className="metric-card-arrow">↘</span>
                    </div>
                    <span className="metric-val-wrap">
                      <AnimatedCounter value="25" prefix="-" suffix="%" />
                    </span>
                    <span className="metric-lbl-primary">Handoff Friction</span>
                    <span className="metric-lbl-sub">With component token architectures</span>
                    <div className="metric-sparkline">
                      <svg viewBox="0 0 100 24" className="sparkline-svg">
                        <path d="M 0,2 Q 30,5 60,18 T 100,22" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="impact-metric-card hover-target">
                    <div className="metric-card-header">
                      <span className="metric-card-arrow">✦</span>
                    </div>
                    <span className="metric-val-wrap">
                      <AnimatedCounter value="5" suffix="+" />
                    </span>
                    <span className="metric-lbl-primary">Years Building</span>
                    <span className="metric-lbl-sub">SaaS, Fintech & Growth products</span>
                    <div className="metric-sparkline">
                      <svg viewBox="0 0 100 24" className="sparkline-svg">
                        <path d="M 0,15 Q 20,15 40,12 T 80,4 T 100,2" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ SKILLS MARQUEE ═══════ */}
          <section className="marquee-section">
            <TextMarquee speed={28}>
              <span className="marquee-item">Product Design</span>
              <span className="marquee-sep">✦</span>
              <span className="marquee-item">Design Systems</span>
              <span className="marquee-sep">✦</span>
              <span className="marquee-item">UX Strategy</span>
              <span className="marquee-sep">✦</span>
              <span className="marquee-item">Conversion Optimization</span>
              <span className="marquee-sep">✦</span>
              <span className="marquee-item">Enterprise SaaS</span>
              <span className="marquee-sep">✦</span>
              <span className="marquee-item">AI Interfaces</span>
              <span className="marquee-sep">✦</span>
            </TextMarquee>
          </section>

          {/* ═══════ CHAPTER 2 — PHILOSOPHY ═══════ */}
          <section className="ch-philosophy" id="philosophy">
            <div className="main-content">
              <div className="philosophy-grid">
                {/* Left sticky */}
                <motion.div className="philosophy-sticky"
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                  variants={fadeUp}
                >
                  <span className="chapter-number">02</span>
                  <span className="section-label">Philosophy</span>
                  <h2 className="philosophy-heading">How I think about design.</h2>
                </motion.div>

                {/* Right scrolling principles */}
                <div className="philosophy-principles">
                  {principles.map((p, i) => (
                    <motion.div key={i} className="principle-card"
                      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                      variants={fadeUp} custom={i * 0.5}
                    >
                      <motion.div className="principle-line" variants={lineReveal} />
                      <span className="principle-num">{p.num}</span>
                      <h3 className="principle-title">{p.title}</h3>
                      <p className="principle-body">{p.body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ CHAPTER 3 — FEATURED WORK ═══════ */}
          <section className="ch-work" id="work">
            <div className="main-content">
              <motion.div className="work-header"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp}
              >
                <span className="section-label">SELECTED WORK •</span>
                <h2 className="text-h2 work-heading">Designing products that create measurable business impact.</h2>
                <p className="work-header-sub">
                  A curated collection of SaaS, Fintech, and AI products where research, strategy, systems thinking, and execution combined to drive meaningful outcomes.
                </p>
              </motion.div>
            </div>

            <div className="work-columns-grid">
              {projects.map((project, i) => {
                const isHovered = hoveredWorkIndex === i;
                const isAnyHovered = hoveredWorkIndex !== null;
                
                return (
                  <motion.div
                    key={project.id}
                    className={`work-column-panel ${isHovered ? 'is-expanded' : ''} ${isAnyHovered && !isHovered ? 'is-shrunk' : ''}`}
                    onMouseEnter={() => setHoveredWorkIndex(i)}
                    onMouseLeave={() => setHoveredWorkIndex(null)}
                    onClick={() => setActiveFigmaProject(project.id)}
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                    variants={fadeUp} custom={i * 0.2}
                  >
                    {/* Visual Background/Mockup Layer */}
                    <div className="column-visual-layer">
                      <img src={project.mockups?.[0] || project.heroImage} alt="" className="column-bg-img" />
                      <div className="column-bg-overlay" />
                      
                      {/* Storytelling Blueprint Arc (SVG) */}
                      <svg className="column-blueprint-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(167, 139, 250, 0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
                      </svg>
                    </div>

                    {/* Floating Handwritten Style Notes inside Panel */}
                    <div className="column-handwritten">
                      <span>✦ User Journey Audit</span>
                    </div>

                    {/* Content Overlay */}
                    <div className="column-content-wrapper">
                      <div className="column-header">
                        <div className="column-meta-row">
                          <span className="column-num">{project.num}</span>
                          <div className="column-tag-list">
                            {project.category.split(' · ').slice(0, 2).map((tag, j) => (
                              <span key={j} className="column-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <h3 className="column-title">{project.title}</h3>
                      </div>

                      {/* Expanded Body Content */}
                      <div className="column-body-expanded">
                        <p className="column-description">{project.desc}</p>
                        
                        {/* Metrics Dashboard Grid */}
                        <div className="column-metrics-dashboard">
                          {project.metrics.map((m, idx) => (
                            <div key={idx} className="column-metric-card">
                              <span className="column-metric-val">
                                <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                              </span>
                              <span className="column-metric-lbl">{m.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="column-footer-action">
                          <span className="column-cta-link">
                            View Full Case Study <span className="arrow">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="work-archive-cta">
              <Link to="/work" className="archive-cta-btn hover-target">
                View Work Archive <span className="arrow">→</span>
              </Link>
            </div>
          </section>

          {/* ═══════ CHAPTER 4 — PROCESS ═══════ */}
          <ProcessSection />

          {/* ═══════ CHAPTER 5 — CRAFT ═══════ */}
          <section className="ch-craft" id="craft">
            <div className="main-content">
              <motion.div className="craft-header"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp}
              >
                <span className="section-label">Craft</span>
                <h2 className="craft-heading">The details behind the work.</h2>
              </motion.div>

              <div className="craft-grid">
                {craftItems.map((item, i) => (
                  <motion.div key={i} className="craft-cell"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                    variants={fadeUp} custom={i * 0.2}
                  >
                    <span className="craft-icon">{item.icon}</span>
                    <h4 className="craft-cell-title">{item.title}</h4>
                    <p className="craft-cell-desc">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ CHAPTER 6 — IMPACT ═══════ */}
          <ImpactSection />

          {/* ═══════ CHAPTER 7 — ABOUT ═══════ */}
          <section className="ch-about" id="about">
            <div className="main-content">
              <div className="about-layout">
                {/* Left — Narrative */}
                <motion.div className="about-narrative"
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                  variants={staggerContainer}
                >
                  <motion.span className="section-label" variants={fadeUp}>About</motion.span>
                  <motion.h2 className="about-heading" variants={fadeUp}>
                    I believe the best products are built at the intersection of data, business, and empathy.
                  </motion.h2>
                  <motion.p className="about-body" variants={fadeUp}>
                    I'm a Product Designer who goes beyond pixels. I combine deep user research,
                    interaction design, and rigorous usability testing to create intuitive solutions
                    that drive measurable business outcomes. With a foundation in front-end development,
                    I bridge the gap between design and engineering seamlessly.
                  </motion.p>
                  <motion.p className="about-body" variants={fadeUp}>
                    Over the past 5 years, I've worked across enterprise SaaS, AI-powered analytics,
                    and conversion-focused marketing — always with one goal: making complex systems
                    feel simple, beautiful, and effective.
                  </motion.p>
                </motion.div>

                {/* Right — Experience Accordion */}
                <div className="about-experience">
                  <motion.h3 className="about-exp-heading"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    Experience
                  </motion.h3>
                  <div className="exp-list">
                    {experiences.map((exp, i) => {
                      const isOpen = activeExp === i;
                      return (
                        <div key={i} className={`exp-item ${exp.current ? 'exp-item--current' : ''}`}>
                          <motion.div className="exp-row hover-target"
                            onClick={() => setActiveExp(isOpen ? null : i)}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            variants={fadeUp} custom={i * 0.3}
                          >
                            <div className="exp-row-left">
                              <span className="exp-company">{exp.co}</span>
                              <span className="exp-role">{exp.role}</span>
                            </div>
                            <div className="exp-row-right">
                              <span className="exp-time">{exp.time}</span>
                              <div className={`exp-toggle ${isOpen ? 'exp-toggle--open' : ''}`}>
                                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                              </div>
                            </div>
                          </motion.div>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div className="exp-panel"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <div className="exp-panel-inner">
                                  <ul className="exp-bullets">
                                    {exp.details.map((d, j) => <li key={j}>{d}</li>)}
                                  </ul>
                                  <div className="exp-skills">
                                    {exp.skills.map((s, j) => (
                                      <span key={j} className="exp-skill">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════ CHAPTER 8 — CONTACT ═══════ */}
          <ContactSection />

          {/* Floating vertical chapter side indicator */}
          <ChapterIndicator chapters={CHAPTERS} activeChapter={activeChapter} />
        </div>
        )
      ) : (
        
        /* MODE 2: DOCK & DRAGGABLE MAC WINDOWS GRID */
        isMobile ? (
          /* IPHONE HOME SCREEN SIMULATOR */
          <div 
            id="desktop-canvas"
            className="relative w-full h-screen overflow-hidden select-none"
            style={{ backgroundImage: `url(${activeWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* iOS Status Bar */}
            <div className="fixed top-0 left-0 right-0 h-10 bg-transparent z-[150] flex items-center justify-between px-6 pointer-events-none select-none text-white font-body">
              <span className="text-[14px] font-semibold tracking-tight">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
              <div className="flex items-center gap-1.5">
                <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                  <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
                  <rect x="3.5" y="6" width="2.5" height="5" rx="0.5" />
                  <rect x="7" y="4" width="2.5" height="7" rx="0.5" />
                  <rect x="10.5" y="2" width="2.5" height="9" rx="0.5" />
                  <rect x="14" y="0" width="2.5" height="11" rx="0.5" fill="white" fillOpacity="0.4" />
                </svg>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
                  <path d="M7.5 11C8.2 11 8.8 10.4 8.8 9.7C8.8 9 8.2 8.4 7.5 8.4C6.8 8.4 6.2 9 6.2 9.7C6.2 10.4 6.8 11 7.5 11Z" />
                  <path d="M7.5 5.8C9.2 5.8 10.8 6.5 11.9 7.6L12.9 6.6C11.5 5.2 9.6 4.3 7.5 4.3C5.4 4.3 3.5 5.2 2.1 6.6L3.1 7.6C4.2 6.5 5.8 5.8 7.5 5.8Z" />
                  <path d="M7.5 1.5C10.5 1.5 13.2 2.7 15.2 4.7L16.2 3.7C13.9 1.4 10.8 0 7.5 0C4.2 0 1.1 1.4 0 3.7L1 4.7C3 2.7 5.7 1.5 7.5 1.5Z" />
                </svg>
                <div className="w-5.5 h-3 rounded-[3px] border border-white/80 p-0.5 flex items-center">
                  <div className="h-full bg-white rounded-[1.5px] w-3.5" />
                </div>
              </div>
            </div>

            {/* Full-width iPhone App Grid */}
            <div className="absolute inset-x-0 top-0 bottom-24 pt-16 px-4 grid grid-cols-4 gap-y-6 z-10 overflow-y-auto select-none max-w-md mx-auto h-[calc(100%-110px)]" style={{ scrollbarWidth: "none" }}>
              {/* identity */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('identity')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Identity</span>
              </div>

              {/* mission */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('mission')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#007AFF] to-[#0047FF] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 8.07 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Mission Ctrl</span>
              </div>

              {/* skills */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('skills')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#1E1E24] to-[#0F0F12] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Skills</span>
              </div>

              {/* lab */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('lab')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#34C759] to-[#28A745] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2v7.31L4.75 18.2A2 2 0 0 0 6.46 21h11.08a2 2 0 0 0 1.71-2.8L14 9.31V2" />
                    <line x1="8.5" y1="2" x2="15.5" y2="2" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Design Lab</span>
              </div>

              {/* money */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('money')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#FF9F0A] to-[#FF6B00] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Money.OS</span>
              </div>

              {/* journal */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('journal')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#F5F5F7] to-[#E5E5EA] border border-black/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8E2DE2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Journal</span>
              </div>

              {/* vault */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('vault')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#00C6FF] to-[#0072FF] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Vault</span>
              </div>

              {/* interests */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('interests')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#FF2A54] to-[#FF0036] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Interests</span>
              </div>

              {/* travel */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('travel')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#A8C0FF] to-[#3F2B96] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Travel Log</span>
              </div>

              {/* safari */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('safari')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#00A8FF] to-[#0051FF] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Safari</span>
              </div>

              {/* video_revlitix */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('video_revlitix')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#EF4444] to-[#B91C1C] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" fill="white" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="rgba(255,255,255,0.2)" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Revlitix Demo</span>
              </div>

              {/* video_sonic */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => handleAppClick('video_sonic')}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] border border-white/10 shadow-md flex items-center justify-center active:scale-95 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" fill="white" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="rgba(255,255,255,0.2)" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/90 mt-1.5 text-center leading-tight">Sonic AI Demo</span>
              </div>
            </div>

            {/* Fullscreen Mobile App Windows Container */}
            <AnimatePresence>
              {openApps.identity && (
                <DesktopWindow
                  id="identity"
                  title="Identity.OS — Profile"
                  isOpen={openApps.identity}
                  onClose={() => handleClose('identity')}
                  onMinimize={() => handleClose('identity')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <IdentityApp />
                </DesktopWindow>
              )}
              {openApps.mission && (
                <DesktopWindow
                  id="mission"
                  title="Mission Control"
                  isOpen={openApps.mission}
                  onClose={() => handleClose('mission')}
                  onMinimize={() => handleClose('mission')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                  defaultMaximized={true}
                >
                  <MissionControlApp initialMission={activeFigmaProject} onClose={() => handleClose('mission')} />
                </DesktopWindow>
              )}
              {openApps.skills && (
                <DesktopWindow
                  id="skills"
                  title="Skill Tree"
                  isOpen={openApps.skills}
                  onClose={() => handleClose('skills')}
                  onMinimize={() => handleClose('skills')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <SkillTreeApp />
                </DesktopWindow>
              )}
              {openApps.lab && (
                <DesktopWindow
                  id="lab"
                  title="Design Lab"
                  isOpen={openApps.lab}
                  onClose={() => handleClose('lab')}
                  onMinimize={() => handleClose('lab')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <DesignLabApp />
                </DesktopWindow>
              )}
              {openApps.money && (
                <DesktopWindow
                  id="money"
                  title="Money.OS"
                  isOpen={openApps.money}
                  onClose={() => handleClose('money')}
                  onMinimize={() => handleClose('money')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <MoneyApp />
                </DesktopWindow>
              )}
              {openApps.journal && (
                <DesktopWindow
                  id="journal"
                  title="Dev Journal"
                  isOpen={openApps.journal}
                  onClose={() => handleClose('journal')}
                  onMinimize={() => handleClose('journal')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <JournalApp selectedNote={selectedNote} onSelectNote={setSelectedNote} />
                </DesktopWindow>
              )}
              {openApps.vault && (
                <DesktopWindow
                  id="vault"
                  title="Assets Vault"
                  isOpen={openApps.vault}
                  onClose={() => handleClose('vault')}
                  onMinimize={() => handleClose('vault')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <VaultApp />
                </DesktopWindow>
              )}
              {openApps.interests && (
                <DesktopWindow
                  id="interests"
                  title="Core Interests"
                  isOpen={openApps.interests}
                  onClose={() => handleClose('interests')}
                  onMinimize={() => handleClose('interests')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <InterestsApp />
                </DesktopWindow>
              )}
              {openApps.travel && (
                <DesktopWindow
                  id="travel"
                  title="Travel Log"
                  isOpen={openApps.travel}
                  onClose={() => handleClose('travel')}
                  onMinimize={() => handleClose('travel')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <TravelApp />
                </DesktopWindow>
              )}
              {openApps.safari && (
                <DesktopWindow
                  id="safari"
                  title="Safari Browser"
                  isOpen={openApps.safari}
                  onClose={() => handleClose('safari')}
                  onMinimize={() => handleClose('safari')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <SafariApp tab={safariTab} onTabChange={setSafariTab} onLaunchApp={handleAppClick} />
                </DesktopWindow>
              )}
              {openApps.video_revlitix && (
                <DesktopWindow
                  id="video_revlitix"
                  title="Revlitix Demo"
                  isOpen={openApps.video_revlitix}
                  onClose={() => handleClose('video_revlitix')}
                  onMinimize={() => handleClose('video_revlitix')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <div className="relative w-full h-[440px] bg-black overflow-hidden inset-0">
                    <CaseStudyVideoPlayer videoUrl="/assets/Revlitix.mp4" poster="/assets/revlitix_saas_hero_ultra.jpg" />
                  </div>
                </DesktopWindow>
              )}
              {openApps.video_sonic && (
                <DesktopWindow
                  id="video_sonic"
                  title="Sonic AI Demo"
                  isOpen={openApps.video_sonic}
                  onClose={() => handleClose('video_sonic')}
                  onMinimize={() => handleClose('video_sonic')}
                  activeWindow={activeWindow}
                  onFocus={handleFocus}
                >
                  <div className="relative w-full h-[440px] bg-black overflow-hidden inset-0">
                    <CaseStudyVideoPlayer videoUrl="/assets/Sonic.mp4" poster="/assets/sonic_ai_hero_ultra.jpg" />
                  </div>
                </DesktopWindow>
              )}
            </AnimatePresence>

            {/* iPhone Bottom Dock */}
            <DesktopDock onAppClick={handleAppClick} openApps={openApps} />
          </div>
        ) : (

        <div 
          id="desktop-canvas"
          className="relative w-full h-screen overflow-hidden select-none"
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
          }}
          onMouseDown={(e) => {
            if (contextMenu.visible) setContextMenu({ visible: false, x: 0, y: 0 });
            if (e.target.id === 'desktop-canvas' || e.target.classList.contains('desktop-wallpaper')) {
              setSelectionBox({ active: true, startX: e.clientX, startY: e.clientY, currentX: e.clientX, currentY: e.clientY });
            }
          }}
          onMouseMove={(e) => {
            if (selectionBox.active) {
              setSelectionBox(prev => ({ ...prev, currentX: e.clientX, currentY: e.clientY }));
            }
          }}
          onMouseUp={(e) => {
            if (selectionBox.active) {
              const dx = Math.abs(selectionBox.currentX - selectionBox.startX);
              const dy = Math.abs(selectionBox.currentY - selectionBox.startY);
              if (dx < 3 && dy < 3 && (e.target.id === 'desktop-canvas' || e.target.classList.contains('desktop-wallpaper'))) {
                setWindowsHidden(prev => !prev);
              }
              setSelectionBox({ active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 });
            }
          }}
        >
          {/* macOS Drag Selection Marquee Box */}
          {selectionBox.active && (
            <div 
              className="fixed z-[90] bg-[#007AFF]/15 border border-[#007AFF]/50 rounded-sm pointer-events-none"
              style={{
                left: Math.min(selectionBox.startX, selectionBox.currentX),
                top: Math.min(selectionBox.startY, selectionBox.currentY),
                width: Math.abs(selectionBox.currentX - selectionBox.startX),
                height: Math.abs(selectionBox.currentY - selectionBox.startY),
              }}
            />
          )}

          {/* macOS Right-Click Context Menu */}
          {contextMenu.visible && (
            <div 
              className="fixed z-[999] w-56 bg-white/85 backdrop-blur-2xl border border-white/75 rounded-xl shadow-2xl p-1.5 text-[13px] font-body text-[#1C1C1E] select-none shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
              style={{ top: Math.min(contextMenu.y, window.innerHeight - 260), left: Math.min(contextMenu.x, window.innerWidth - 240) }}
              onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
            >
              <div className="px-3 py-1.5 hover:bg-[#007AFF] hover:text-white rounded-md cursor-default flex items-center justify-between transition-colors">
                <span>New Folder</span>
                <span className="text-[10px] opacity-60">⇧⌘N</span>
              </div>
              <div className="h-px bg-black/10 my-1" />
              <div className="px-3 py-1.5 hover:bg-[#007AFF] hover:text-white rounded-md cursor-default transition-colors" onClick={() => setCommandPaletteOpen(true)}>
                Search with Spotlight (⌘K)
              </div>
              <div className="px-3 py-1.5 hover:bg-[#007AFF] hover:text-white rounded-md cursor-default transition-colors" onClick={() => setWindowsHidden(prev => !prev)}>
                {windowsHidden ? "Show Active Windows" : "Hide Active Windows"}
              </div>
              <div className="h-px bg-black/10 my-1" />
              <div className="px-3 py-1.5 hover:bg-[#007AFF] hover:text-white rounded-md cursor-default transition-colors" onClick={() => setWidgetsVisible(prev => !prev)}>
                {widgetsVisible ? "Hide Left Sidebar Widgets" : "Show Left Sidebar Widgets"}
              </div>
              <div className="px-3 py-1.5 hover:bg-[#007AFF] hover:text-white rounded-md cursor-default transition-colors" onClick={() => setIconsVisible(prev => !prev)}>
                {iconsVisible ? "Hide Right App Icons" : "Show Right App Icons"}
              </div>
              <div className="h-px bg-black/10 my-1" />
              <div className="px-3 py-1.5 hover:bg-[#007AFF] hover:text-white rounded-md cursor-default transition-colors" onClick={() => handleAppClick('identity')}>
                Get Info
              </div>
            </div>
          )}

          {/* 1. Desktop Wallpaper Backdrop */}
          <div className="desktop-wallpaper relative overflow-hidden" ref={wallpaperRef} style={{ backgroundImage: `url(${activeWallpaper})` }}>
            {/* Vignette overlay for cinematic depth */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.12) 100%)'
            }} />
            {/* Volumetric sunlight from horizon */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(180deg, rgba(255,220,140,0.06) 0%, rgba(255,200,100,0.03) 20%, transparent 50%)'
            }} />
            {/* Soft radial atmospheric mist */}
            <div className="absolute inset-0 pointer-events-none ambient-mist" style={{
              background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.08) 0%, transparent 60%)'
            }} />
            {/* Golden hour warm light wash */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(135deg, rgba(255,215,140,0.03) 0%, transparent 40%, rgba(200,190,255,0.02) 100%)'
            }} />
            {/* Floating dust particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`dust-${i}`}
                className="dust-particle"
                style={{
                  left: `${8 + (i * 7.5) % 85}%`,
                  animationDuration: `${12 + (i * 3.7) % 18}s`,
                  animationDelay: `${(i * 1.8) % 12}s`,
                  width: `${1.5 + (i % 3)}px`,
                  height: `${1.5 + (i % 3)}px`,
                  opacity: 0.3 + (i % 4) * 0.1,
                }}
              />
            ))}
          </div>

          {/* 2. Top menu system bar */}
          <DesktopMenuBar 
            onModeToggle={setCurrentMode} 
            onRestart={() => {
              setOpenApps({ 
                identity: false, mission: false, skills: false, lab: false, 
                money: false, journal: false, vault: false, interests: false, 
                travel: false, safari: false,
                notes: false, figma: false, likes: false, movies: false,
                video_revlitix: false, video_sonic: false
              });
              setSelectedBehanceProject(null);
            }} 
            onSearch={() => setCommandPaletteOpen(true)}
            onLaunchApp={handleAppClick}
            activeWallpaper={activeWallpaper}
            onChangeWallpaper={setActiveWallpaper}
            volume={volume}
            onChangeVolume={setVolume}
            brightness={brightness}
            onChangeBrightness={setBrightness}
            currentLayout={currentMode}
          />

          {/* 3. Global Spotlight Command Palette (⌘ + K) */}
          <CommandPalette 
            isOpen={commandPaletteOpen} 
            onClose={() => setCommandPaletteOpen(false)} 
            onLaunchApp={handleAppClick} 
          />



          {/* 5. Right Side Desktop Apps Grid (12 DesignOS Apps) */}
          <AnimatePresence>
            {iconsVisible && (
              <motion.div 
                initial={{ opacity: 0, x: 120, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 120, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="absolute top-12 right-6 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 z-10 select-none w-[220px] lg:w-[340px]"
              >
            
            {/* 01. Identity.OS */}
            <div className={`desktop-icon ${launchingApp === 'identity' ? 'is-launching' : ''}`} onClick={() => handleAppClick('identity')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#8E2DE2] to-[#4A00E0] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="desktop-icon-label">Identity.OS</span>
              <span className="desktop-icon-sublabel hidden md:block">About Me</span>
            </div>

            {/* 02. Mission Control */}
            <div className={`desktop-icon ${launchingApp === 'mission' ? 'is-launching' : ''}`} onClick={() => handleAppClick('mission')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#007AFF] to-[#0047FF] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 8.07 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z" />
                </svg>
              </div>
              <span className="desktop-icon-label">Mission Control</span>
              <span className="desktop-icon-sublabel hidden md:block">Case Studies</span>
            </div>

            {/* 03. Skill Tree */}
            <div className={`desktop-icon ${launchingApp === 'skills' ? 'is-launching' : ''}`} onClick={() => handleAppClick('skills')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#1E1E24] to-[#0F0F12] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="desktop-icon-label">Skill Tree</span>
              <span className="desktop-icon-sublabel hidden md:block">Skills & Expertise</span>
            </div>

            {/* 04. Design Lab */}
            <div className={`desktop-icon ${launchingApp === 'lab' ? 'is-launching' : ''}`} onClick={() => handleAppClick('lab')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#34C759] to-[#28A745] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.31L4.75 18.2A2 2 0 0 0 6.46 21h11.08a2 2 0 0 0 1.71-2.8L14 9.31V2" />
                  <line x1="8.5" y1="2" x2="15.5" y2="2" />
                </svg>
              </div>
              <span className="desktop-icon-label">Design Lab</span>
              <span className="desktop-icon-sublabel hidden md:block">Experiments</span>
            </div>

            {/* 05. Money.OS */}
            <div className={`desktop-icon ${launchingApp === 'money' ? 'is-launching' : ''}`} onClick={() => handleAppClick('money')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#FF9F0A] to-[#FF6B00] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <span className="desktop-icon-label">Money.OS</span>
              <span className="desktop-icon-sublabel hidden md:block">Fintech Universe</span>
            </div>

            {/* 06. Journal */}
            <div className={`desktop-icon ${launchingApp === 'journal' ? 'is-launching' : ''}`} onClick={() => handleAppClick('journal')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#F5F5F7] to-[#E5E5EA] border border-black/10 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8E2DE2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <span className="desktop-icon-label">Journal</span>
              <span className="desktop-icon-sublabel hidden md:block">Notes & Thoughts</span>
            </div>

            {/* 07. Assets Vault */}
            <div className={`desktop-icon ${launchingApp === 'vault' ? 'is-launching' : ''}`} onClick={() => handleAppClick('vault')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#00C6FF] to-[#0072FF] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <span className="desktop-icon-label">Assets Vault</span>
              <span className="desktop-icon-sublabel hidden md:block">Resources</span>
            </div>

            {/* 08. Interests */}
            <div className={`desktop-icon ${launchingApp === 'interests' ? 'is-launching' : ''}`} onClick={() => handleAppClick('interests')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#FF2A54] to-[#FF0036] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="desktop-icon-label">Interests</span>
              <span className="desktop-icon-sublabel hidden md:block">Personal Side</span>
            </div>

            {/* 09. Travel Log */}
            <div className={`desktop-icon ${launchingApp === 'travel' ? 'is-launching' : ''}`} onClick={() => handleAppClick('travel')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#A8C0FF] to-[#3F2B96] border border-white/20 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span className="desktop-icon-label">Travel Log</span>
              <span className="desktop-icon-sublabel hidden md:block">Adventures</span>
            </div>

            

            

            {/* 10. Settings */}
            <div className="desktop-icon" onClick={() => {}}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#F5F5F7] to-[#D1D1D6] border border-white/50 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="10" rx="5" fill="#34C759" stroke="none" />
                  <circle cx="17" cy="12" r="3.5" fill="white" stroke="none" />
                </svg>
              </div>
              <span className="desktop-icon-label">Settings</span>
              <span className="desktop-icon-sublabel hidden md:block">Preferences</span>
            </div>

            {/* 11. Revlitix Demo */}
            <div className={`desktop-icon ${launchingApp === 'video_revlitix' ? 'is-launching' : ''}`} onClick={() => handleAppClick('video_revlitix')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#EF4444] to-[#B91C1C] border border-white/20 shadow-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" fill="white" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="rgba(255,255,255,0.2)" />
                </svg>
              </div>
              <span className="desktop-icon-label">Revlitix Demo</span>
              <span className="desktop-icon-sublabel hidden md:block">MP4 Video</span>
            </div>

            {/* 12. Sonic AI Demo */}
            <div className={`desktop-icon ${launchingApp === 'video_sonic' ? 'is-launching' : ''}`} onClick={() => handleAppClick('video_sonic')}>
              <div className="desktop-icon-img bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] border border-white/20 shadow-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" fill="white" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="rgba(255,255,255,0.2)" />
                </svg>
              </div>
              <span className="desktop-icon-label">Sonic AI Demo</span>
              <span className="desktop-icon-sublabel hidden md:block">MP4 Video</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



          {/* Desktop Widgets Area (Left Side — Story Widgets) */}
          <AnimatePresence>
            {widgetsVisible && (
              <motion.div 
                initial={{ opacity: 0, x: -120, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -120, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="hidden xl:flex absolute top-12 left-6 flex-col gap-4 z-10 w-[320px] pointer-events-auto select-none"
              >
            
            {/* Widget 1: Move Money — Featured Project */}
            <TiltCard 
              onClick={() => {
                setSelectedBehanceProject('revlitix-saas');
                setSafariTab('behance');
                setOpenApps(prev => ({ ...prev, safari: true }));
                setActiveWindow('safari');
              }}
              className="widget-glass rounded-[24px] p-5 cursor-pointer select-none group widget-hover-lift widget-entrance"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex justify-between items-start gap-3 relative">
                <div className="flex-1 relative z-10">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#8B5CF6] tracking-widest uppercase">FEATURED PROJECT</span>
                    <span className="text-[11px] font-mono text-[#8B5CF6]/40 font-medium">01</span>
                  </div>
                  <h3 className="text-[22px] font-display font-bold text-[#1C1C1E] leading-tight tracking-tight mb-1">Move Money</h3>
                  <p className="text-[12px] text-[#6B7280] font-body leading-snug">Digital payments platform<br/>672+ Screens Designed</p>
                </div>
                
                {/* Phone screen UI mockup preview */}
                <div className="w-[84px] h-[76px] flex-shrink-0 relative overflow-hidden group-hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="absolute right-0 top-0 w-[52px] h-[72px] bg-[#1F2937] rounded-[10px] border border-white/20 shadow-md p-1 flex flex-col justify-between z-10">
                    <div className="w-full h-2 rounded bg-[#8B5CF6]/40 mb-1" />
                    <div className="w-full h-8 rounded bg-white/10 p-1 flex flex-col gap-1">
                      <div className="w-3/4 h-1.5 bg-white/40 rounded" />
                      <div className="w-1/2 h-1.5 bg-[#8B5CF6] rounded" />
                    </div>
                    <div className="w-full h-2 rounded bg-white/20" />
                  </div>
                  <div className="absolute right-7 top-2 w-[44px] h-[64px] bg-[#374151] rounded-[8px] border border-white/10 shadow-sm p-1 z-0 opacity-80">
                    <div className="w-full h-2 rounded bg-white/20" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <span className="text-[12px] font-body font-medium text-[#1C1C1E] group-hover:text-[#8B5CF6] transition-colors duration-300">View Case Study</span>
                <span className="text-[12px] text-[#1C1C1E]/60 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </TiltCard>

            {/* Widget 2: Impact Created */}
            <TiltCard 
              onClick={() => {
                handleAppClick('mission');
              }}
              className="widget-glass rounded-[24px] p-5 cursor-pointer select-none group widget-hover-lift widget-entrance"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#8B5CF6] tracking-widest uppercase">IMPACT CREATED</span>
                    <span className="text-[11px] font-mono text-[#8B5CF6]/40 font-medium">02</span>
                  </div>
                  <h3 className="text-[32px] font-display font-bold text-[#8B5CF6] leading-none tracking-tight">+30%</h3>
                  <p className="text-[12px] text-[#6B7280] font-body leading-snug mt-1.5">Increase in payment<br/>completion efficiency</p>
                </div>
                
                {/* Line chart with peak 30% badge */}
                <div className="w-[85px] h-[55px] flex-shrink-0 relative mt-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="absolute -top-2 right-0 bg-[#8B5CF6] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm z-10">
                    30%
                  </div>
                  <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none" className="overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25"/>
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0 40 C 20 35, 35 45, 55 25 C 75 10, 85 20, 100 5 L 100 50 L 0 50 Z" fill="url(#chartGradient)" />
                    <motion.path 
                      d="M0 40 C 20 35, 35 45, 55 25 C 75 10, 85 20, 100 5" 
                      fill="none" 
                      stroke="#8B5CF6" 
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <circle cx="55" cy="25" r="3" fill="#8B5CF6" stroke="white" strokeWidth="1.5" />
                    <circle cx="100" cy="5" r="3.5" fill="#8B5CF6" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <span className="text-[12px] font-body font-medium text-[#1C1C1E] group-hover:text-[#8B5CF6] transition-colors duration-300">View All Impact</span>
                <span className="text-[12px] text-[#1C1C1E]/60 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </TiltCard>

            {/* Weather Widget — Full Width with Forecast */}
            <div className="widget-glass rounded-[22px] p-4 select-none group hover:shadow-xl transition-shadow duration-300 widget-entrance" style={{ animationDelay: '0.3s' }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[12.5px] font-display font-bold text-[#1D1D1F] leading-none">Bengaluru, India</h3>
                    <motion.svg 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9F0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      animate={{ rotate: [0, 15, 0, -15, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <circle cx="12" cy="12" r="5" fill="#FF9F0A" fillOpacity="0.2"/>
                      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </motion.svg>
                  </div>
                  <span className="text-[34px] font-display font-light text-[#1D1D1F] tracking-tighter leading-none mt-1.5 block">24°</span>
                  <span className="text-[10px] font-body text-[#1D1D1F]/50 mt-1 block">Partly Cloudy</span>
                </div>
                {/* 4-day forecast */}
                <div className="flex flex-col gap-1.5 text-[10px] font-body text-[#1D1D1F]/60">
                  <div className="flex items-center gap-3 justify-end group-hover:translate-x-[-2px] transition-transform duration-300 delay-75"><span className="w-6 font-medium">Tue</span><span>☀️</span><span className="w-6 text-right text-[#1D1D1F]">24°</span></div>
                  <div className="flex items-center gap-3 justify-end group-hover:translate-x-[-2px] transition-transform duration-300 delay-100"><span className="w-6 font-medium">Wed</span><span>⛅</span><span className="w-6 text-right text-[#1D1D1F]">25°</span></div>
                  <div className="flex items-center gap-3 justify-end group-hover:translate-x-[-2px] transition-transform duration-300 delay-150"><span className="w-6 font-medium">Thu</span><span>☀️</span><span className="w-6 text-right text-[#1D1D1F]">28°</span></div>
                  <div className="flex items-center gap-3 justify-end group-hover:translate-x-[-2px] transition-transform duration-300 delay-200"><span className="w-6 font-medium">Fri</span><span>⛅</span><span className="w-6 text-right text-[#1D1D1F]">24°</span></div>
                </div>
              </div>
            </div>

            {/* Grid Row: Music & Reading */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Deep Focus Music Widget */}
              <div className="widget-glass rounded-[24px] p-4 select-none flex flex-col justify-between min-h-[165px] group widget-hover-lift widget-entrance" style={{ animationDelay: '0.35s' }}>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[13px] font-display font-semibold text-[#1C1C1E] leading-none">Deep Focus</h3>
                    <span className="text-[12px]">🎵</span>
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] font-body">Playlist</span>
                </div>
                
                <div className="my-2">
                  <div className="flex gap-2.5 items-center mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[11px] font-display font-semibold text-[#1C1C1E] leading-tight truncate">Lofi Beats</h4>
                      <span className="text-[10px] text-[#9CA3AF] font-body block truncate">Chillhop Essentials</span>
                    </div>
                  </div>

                  {/* Progress bar line */}
                  <div className="h-[3px] w-full bg-[#E5E7EB] rounded-full overflow-hidden mb-1 relative">
                    <div className="h-full bg-[#8B5CF6] rounded-full w-[60%]" />
                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#8B5CF6] rounded-full shadow-sm" />
                  </div>
                  <div className="flex justify-between text-[9px] text-[#9CA3AF] font-mono">
                    <span>2:45</span>
                    <span>4:12</span>
                  </div>
                </div>

                {/* Media Playback Controls */}
                <div className="flex items-center justify-center gap-4 pt-1">
                  <svg className="cursor-pointer text-[#6B7280] hover:text-[#8B5CF6] transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 20L9 12l10-8v16z"/><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div className="w-7 h-7 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-sm flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <svg className="cursor-pointer text-[#6B7280] hover:text-[#8B5CF6] transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 4l10 8-10 8V4z"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              {/* Reading Shelf Widget */}
              <div className="widget-glass rounded-[24px] p-4 select-none flex flex-col justify-between min-h-[165px] group widget-hover-lift widget-entrance" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[13px] font-display font-semibold text-[#1C1C1E] leading-none">Reading Shelf</h3>
                  <span className="text-[10px] text-[#9CA3AF] font-body">4 Books</span>
                </div>
                <div className="flex flex-col gap-2 flex-1 justify-center py-1">
                  <div className="flex items-center gap-2.5 group/book cursor-pointer">
                    <div className="w-1 h-5 rounded-full bg-[#F59E0B] flex-shrink-0 shadow-sm" />
                    <span className="text-[11px] font-body font-medium text-[#1C1C1E] truncate group-hover/book:text-[#F59E0B] transition-colors">Atomic Habits</span>
                  </div>
                  <div className="flex items-center gap-2.5 group/book cursor-pointer">
                    <div className="w-1 h-5 rounded-full bg-[#FBBF24] flex-shrink-0 shadow-sm" />
                    <span className="text-[11px] font-body font-medium text-[#1C1C1E] truncate group-hover/book:text-[#FBBF24] transition-colors">Inspired</span>
                  </div>
                  <div className="flex items-center gap-2.5 group/book cursor-pointer">
                    <div className="w-1 h-5 rounded-full bg-[#374151] flex-shrink-0 shadow-sm" />
                    <span className="text-[11px] font-body font-medium text-[#1C1C1E] truncate group-hover/book:text-[#374151] transition-colors">Hooked</span>
                  </div>
                  <div className="flex items-center gap-2.5 group/book cursor-pointer">
                    <div className="w-1 h-5 rounded-full bg-[#111827] flex-shrink-0 shadow-sm" />
                    <span className="text-[11px] font-body font-medium text-[#1C1C1E] truncate leading-tight group-hover/book:text-[#8B5CF6] transition-colors">The Design of Everyday Things</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

          {/* 4. DRAGGABLE WINDOWS SANDBOX SHELL */}
          <div className="absolute inset-0 pt-9 pb-24 z-[150] pointer-events-none">
            <motion.div 
              animate={{ 
                scale: windowsHidden ? 0.94 : 1,
                opacity: windowsHidden ? 0 : 1,
                visibility: windowsHidden ? 'hidden' : 'visible',
                filter: windowsHidden ? 'blur(8px)' : 'blur(0px)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full pointer-events-none"
            >
              
              <AnimatePresence>
                
                {/* 01. IDENTITY.OS */}
                {openApps.identity && (
                  <DesktopWindow
                    id="identity"
                    title="Identity.OS — Profile & Radar"
                    isOpen={openApps.identity}
                    onClose={() => handleClose('identity')}
                    onMinimize={() => handleClose('identity')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 180, y: 100 }}
                    width="780px"
                    height="560px"
                  >
                    <IdentityApp />
                  </DesktopWindow>
                )}

                {/* 02. MISSION CONTROL */}
                {openApps.mission && (
                  <DesktopWindow
                    id="mission"
                    title="Mission Control — Case Studies Workspace"
                    isOpen={openApps.mission}
                    onClose={() => handleClose('mission')}
                    onMinimize={() => handleClose('mission')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 120, y: 70 }}
                    width="840px"
                    height="580px"
                    defaultMaximized={true}
                  >
                    <MissionControlApp />
                  </DesktopWindow>
                )}

                {/* 03. SKILL TREE */}
                {openApps.skills && (
                  <DesktopWindow
                    id="skills"
                    title="Skill Tree — Competency Node Map"
                    isOpen={openApps.skills}
                    onClose={() => handleClose('skills')}
                    onMinimize={() => handleClose('skills')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 220, y: 110 }}
                    width="800px"
                    height="550px"
                  >
                    <SkillTreeApp />
                  </DesktopWindow>
                )}

                {/* 04. DESIGN LAB */}
                {openApps.lab && (
                  <DesktopWindow
                    id="lab"
                    title="Design Lab — Spatial & AI Experiments"
                    isOpen={openApps.lab}
                    onClose={() => handleClose('lab')}
                    onMinimize={() => handleClose('lab')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 200, y: 90 }}
                    width="760px"
                    height="540px"
                  >
                    <DesignLabApp />
                  </DesktopWindow>
                )}

                {/* 05. MONEY.OS */}
                {openApps.money && (
                  <DesktopWindow
                    id="money"
                    title="Money.OS — Payment Rails Universe"
                    isOpen={openApps.money}
                    onClose={() => handleClose('money')}
                    onMinimize={() => handleClose('money')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 160, y: 80 }}
                    width="820px"
                    height="560px"
                  >
                    <MoneyOSApp />
                  </DesktopWindow>
                )}

                {/* 06. JOURNAL */}
                {openApps.journal && (
                  <DesktopWindow
                    id="journal"
                    title="Journal — Notes & Writing Studio"
                    isOpen={openApps.journal}
                    onClose={() => handleClose('journal')}
                    onMinimize={() => handleClose('journal')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 240, y: 120 }}
                    width="740px"
                    height="520px"
                  >
                    <JournalApp />
                  </DesktopWindow>
                )}

                {/* 07. ASSETS VAULT */}
                {openApps.vault && (
                  <DesktopWindow
                    id="vault"
                    title="Assets Vault — File Manager"
                    isOpen={openApps.vault}
                    onClose={() => handleClose('vault')}
                    onMinimize={() => handleClose('vault')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 260, y: 130 }}
                    width="720px"
                    height="500px"
                  >
                    <AssetsVaultApp />
                  </DesktopWindow>
                )}

                {/* 08. INTERESTS */}
                {openApps.interests && (
                  <DesktopWindow
                    id="interests"
                    title="Interests — Visual Moodboards"
                    isOpen={openApps.interests}
                    onClose={() => handleClose('interests')}
                    onMinimize={() => handleClose('interests')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 210, y: 100 }}
                    width="740px"
                    height="520px"
                  >
                    <InterestsApp />
                  </DesktopWindow>
                )}

                {/* 09. TRAVEL LOG */}
                {openApps.travel && (
                  <DesktopWindow
                    id="travel"
                    title="Travel Log — Apple Maps Log"
                    isOpen={openApps.travel}
                    onClose={() => handleClose('travel')}
                    onMinimize={() => handleClose('travel')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 230, y: 110 }}
                    width="760px"
                    height="530px"
                  >
                    <TravelLogApp />
                  </DesktopWindow>
                )}

                                                {openApps.safari && (
                  <DesktopWindow
                    id="safari"
                    title="Behance — Case Studies"
                    isOpen={openApps.safari}
                    onClose={() => handleClose('safari')}
                    onMinimize={() => handleClose('safari')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 140, y: 80 }}
                    width="720px"
                    height="540px"
                  >
                    {/* Safari Browser Address Bar */}
                    <div className="flex items-center gap-4 px-4 py-2 border-b border-black/5 bg-[#EAEAEA]/80 backdrop-blur-md text-apple-text select-none flex-shrink-0">
                      <div className="flex gap-2.5 text-[#5A5A5C]">
                        <ArrowLeft 
                          size={13} 
                          onClick={() => {
                            if (safariTab === 'resume') {
                              setSafariTab('behance');
                            } else if (selectedBehanceProject) {
                              setSelectedBehanceProject(null);
                            }
                          }}
                          className={`cursor-default transition-opacity ${safariTab === 'resume' || selectedBehanceProject ? 'opacity-85 hover:text-black' : 'opacity-30'}`} 
                        />
                        <ArrowRight size={13} className="cursor-default opacity-30" />
                        <RotateCw size={11} className="cursor-default opacity-85 mt-[1px]" />
                      </div>

                      {/* Safari Native Tab Switcher */}
                      <div className="flex gap-0.5 bg-black/5 p-0.5 rounded-lg select-none">
                        <button 
                          onClick={() => { setSafariTab('behance'); }}
                          className={`px-3 py-1 rounded-md text-[9px] font-mono font-bold transition-all cursor-default ${safariTab === 'behance' ? 'bg-white text-apple-text shadow-sm' : 'text-apple-subtext hover:text-apple-text'}`}
                        >
                          Bē Feed
                        </button>
                        <button 
                          onClick={() => setSafariTab('resume')}
                          className={`px-3 py-1 rounded-md text-[9px] font-mono font-bold transition-all cursor-default ${safariTab === 'resume' ? 'bg-white text-apple-text shadow-sm' : 'text-apple-subtext hover:text-apple-text'}`}
                        >
                          Resume.pdf
                        </button>
                      </div>

                      <div className="flex-grow flex items-center justify-center bg-white/90 border border-black/5 rounded-lg py-1 px-3 max-w-[240px] mx-auto text-[10px] font-mono text-apple-subtext gap-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                        <Lock size={9} className="text-green-600 flex-shrink-0" />
                        <span className="truncate">{safariTab === 'resume' ? 'curriculum-vitae.pdf' : selectedBehanceProject ? `behance.net/praveenkumar/${selectedBehanceProject}` : 'behance.net/praveenkumar'}</span>
                      </div>
                      <div className="w-10"></div>
                    </div>

                    {safariTab === 'resume' ? (
                      <div className="overflow-auto h-[calc(100%-48px)] bg-[#ECECEC]" data-lenis-prevent="true">
                        {/* PDF Toolbar */}
                        <div className="flex items-center justify-between px-4 py-1.5 bg-[#E0E0E0] border-b border-black/[0.06] select-none flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <button className="text-[10px] font-mono text-apple-subtext hover:text-apple-text transition-colors cursor-default">−</button>
                            <span className="text-[10px] font-mono text-apple-subtext bg-white/80 border border-black/[0.06] rounded px-2 py-0.5">100%</span>
                            <button className="text-[10px] font-mono text-apple-subtext hover:text-apple-text transition-colors cursor-default">+</button>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="text-[10px] font-mono text-apple-subtext hover:text-apple-text transition-colors cursor-default">↓ Download</button>
                            <button className="text-[10px] font-mono text-apple-subtext hover:text-apple-text transition-colors cursor-default">🖨 Print</button>
                          </div>
                        </div>
                        {/* PDF Page */}
                        <div className="p-6 flex justify-center">
                          <div className="max-w-[600px] w-full bg-white rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.1)] p-8 text-apple-text space-y-8 select-text font-body">
                          <h1 className="text-3xl font-display font-extrabold uppercase text-apple-text">Praveen Kumar</h1>
                          <p className="text-sm text-brand-purple font-mono font-bold uppercase tracking-wider">Senior Product Designer & Creative Technologist</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-apple-subtext font-mono mt-3">
                            <span>📍 Bengaluru, India</span>
                            <span>•</span>
                            <span>✉️ hello@praveenkumar.design</span>
                            <span>•</span>
                            <span>🌐 praveenkumar.design</span>
                          </div>

                        {/* Experience */}
                        <div className="space-y-4">
                          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-apple-subtext border-b border-black/5 pb-1">Professional Experience</h2>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-start text-xs font-mono font-bold">
                                <span className="text-apple-text">Senior Product Designer — Candescent</span>
                                <span className="text-apple-subtext">2025 - Present</span>
                              </div>
                              <p className="text-xs text-apple-subtext mt-1 leading-relaxed">Designing complex analytics platforms, refining GTM workflow solutions, and shipping high-performance data systems. Owning Figma systems mapping directly to engineering Tailwind variables.</p>
                            </div>
                            <div>
                              <div className="flex justify-between items-start text-xs font-mono font-bold">
                                <span className="text-apple-text">Senior Product Designer — Revlitix</span>
                                <span className="text-apple-subtext">2023 - 2025</span>
                              </div>
                              <p className="text-xs text-apple-subtext mt-1 leading-relaxed">Shipped AI revenue intelligence dashboards and query systems. Designed auto-rendering chart systems. Achieved 25% user adoption increase and shortened campaign reporting setup cycles by 50%.</p>
                            </div>
                            <div>
                              <div className="flex justify-between items-start text-xs font-mono font-bold">
                                <span className="text-apple-text">UI Developer — DSG Inc</span>
                                <span className="text-apple-subtext">2021 - 2022</span>
                              </div>
                              <p className="text-xs text-apple-subtext mt-1 leading-relaxed">Implemented interactive client-facing dashboards using React, SCSS, and design tokens, bridging visual mockups and production-ready components.</p>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-3">
                          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-apple-subtext border-b border-black/5 pb-1">Skills & Expertises</h2>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {['Product Design', 'UI/UX Design', 'Design Systems', 'Data Visualization', 'Figma Token Studio', 'React / JavaScript', 'Tailwind CSS', 'User Research'].map((s) => (
                              <span key={s} className="bg-apple-bg border border-apple-border text-apple-subtext text-[10px] font-mono px-2.5 py-1 rounded-md">{s}</span>
                            ))}
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-apple-subtext border-b border-black/5 pb-1">Education</h2>
                          <div className="flex justify-between items-start text-xs font-mono font-bold mt-2">
                            <span className="text-apple-text">BCA (Computer Science) — Kristu Jayanti College</span>
                            <span className="text-apple-subtext">Bangalore, IN</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedBehanceProject ? (
                      (() => {
                        const project = projects.find(p => p.id === selectedBehanceProject);
                        const projectLikes = appreciations[project.id] || 0;
                        const isLiked = userAppreciated[project.id];
                        const projectComments = behanceComments[project.id] || [];
                        const gradient = project.id === 'revlitix-saas'
                          ? 'from-[#6C3DFF] via-[#A58CFF] to-[#EC72B9]'
                          : 'from-[#3B82F6] via-[#60A5FA] to-[#06B6D4]';

                        return (
                          <div className="h-full flex flex-col bg-white">
                            {/* Viewer Sub-Header */}
                            <div className="flex items-center justify-between px-6 py-3 border-b border-black/5 bg-white select-none flex-shrink-0">
                              <button 
                                onClick={() => setSelectedBehanceProject(null)}
                                className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1769FF] hover:text-blue-700 cursor-default"
                              >
                                <ArrowLeft size={12} /> Back to Feed
                              </button>
                              <span className="text-xs font-sans font-bold text-apple-text truncate max-w-[200px]">{project.title}</span>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    const liked = !isLiked;
                                    setAppreciations(prev => ({
                                      ...prev,
                                      [project.id]: liked ? prev[project.id] + 1 : prev[project.id] - 1
                                    }));
                                    setUserAppreciated(prev => ({
                                      ...prev,
                                      [project.id]: liked
                                    }));
                                  }}
                                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 cursor-default ${isLiked ? 'bg-[#1769FF] text-white' : 'bg-[#1769FF]/10 text-[#1769FF] hover:bg-[#1769FF]/20'}`}
                                >
                                  👍 {isLiked ? 'Appreciated' : 'Appreciate'} ({projectLikes})
                                </button>
                                
                                <button
                                  onClick={() => setSelectedBehanceProject(null)}
                                  className="p-1.5 rounded-full hover:bg-black/5 text-apple-subtext hover:text-apple-text transition-all cursor-default flex items-center justify-center"
                                  title="Close Case Study"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>

                            {/* Viewer Content Area */}
                            <div className="p-6 overflow-auto h-[calc(100%-48px)] bg-[#F5F5F7] space-y-6">
                              
                              {/* Hero Card Banner */}
                              <div className="w-full h-64 rounded-2xl relative overflow-hidden shadow-apple-sm flex flex-col justify-between p-8 text-white">
                                <img 
                                  src={project.heroImage} 
                                  alt={project.title} 
                                  className="absolute inset-0 w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <span className="z-10 text-[10px] font-mono font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 self-start">
                                  {project.category}
                                </span>
                                <div className="z-10">
                                  <span className="text-[9px] font-mono block tracking-widest mb-1 opacity-85 uppercase">Portfolio Project Detail</span>
                                  <h2 className="text-3xl font-display font-extrabold uppercase tracking-tight leading-tight">{project.title}</h2>
                                </div>
                              </div>

                              {/* 1. Overview & Objective Section */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-3">
                                  <h3 className="text-xs font-mono font-bold text-[#007AFF] uppercase tracking-wider">// Project Overview</h3>
                                  <p className="text-xs text-apple-text leading-relaxed font-body">
                                    {project.overview}
                                  </p>
                                </div>
                                <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-3">
                                  <h3 className="text-xs font-mono font-bold text-[#007AFF] uppercase tracking-wider">// Specifications</h3>
                                  <div className="space-y-1.5 text-[10px] font-mono text-apple-subtext">
                                    <div><span className="text-apple-text font-bold">Role:</span> Lead Product UI Designer</div>
                                    <div><span className="text-apple-text font-bold">Timeline:</span> 4 Months (Q3-Q4)</div>
                                    <div><span className="text-apple-text font-bold">Tools:</span> Figma, React, CSS Tokens</div>
                                  </div>
                                </div>
                              </div>

                              {/* 2. Key Challenges Section */}
                              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-4">
                                <h3 className="text-xs font-mono font-bold text-[#007AFF] uppercase tracking-wider border-b border-black/5 pb-2">// Core Problem & Challenges</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {project.challenges?.map((challenge, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 space-y-1.5">
                                      <h4 className="text-xs font-bold text-red-700 font-mono">0{idx + 1}. {challenge.title}</h4>
                                      <p className="text-[10px] text-apple-subtext leading-relaxed font-body">{challenge.text}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 3. Outcomes Dashboard */}
                              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                                <h3 className="text-xs font-mono font-bold text-green-600 uppercase tracking-wider mb-4">// Outcomes Dashboard</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                  {project.metrics.map((metric, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                      <span className="text-2xl md:text-3xl font-display font-extrabold text-green-600 block leading-none">
                                        {metric.prefix}{metric.value}{metric.suffix}
                                      </span>
                                      <span className="text-[9px] font-mono uppercase text-apple-subtext tracking-wider mt-1 block">
                                        {metric.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 4. Design Process & Strategy Section */}
                              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-3">
                                <h3 className="text-xs font-mono font-bold text-[#007AFF] uppercase tracking-wider border-b border-black/5 pb-2">// Design Process & System Solutions</h3>
                                <p className="text-xs text-apple-text leading-relaxed font-body">
                                  {project.process}
                                </p>
                              </div>

                              {/* 5. Design Mockups & Deliverables Gallery */}
                              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-4">
                                <h3 className="text-xs font-mono font-bold text-apple-text uppercase tracking-wider border-b border-black/5 pb-2">// Interactive Mockups & UI Deliverables</h3>
                                <div className="grid grid-cols-1 gap-6">
                                  {project.mockups?.map((mockupSrc, idx) => (
                                    <div key={idx} className="space-y-2 border border-black/5 rounded-2xl p-3 bg-apple-bg">
                                      <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-black/5 relative group/img">
                                        <img 
                                          src={mockupSrc} 
                                          alt={`UI Mockup ${idx + 1}`} 
                                          className="w-full h-full object-cover group-hover/img:scale-[1.02] transition-transform duration-500" 
                                        />
                                      </div>
                                      <span className="text-[9px] font-mono text-apple-subtext uppercase tracking-widest block text-center mt-1">
                                        Deliverable artifact {idx + 1} // Production Spec Shipped
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 6. Retrospective & Lessons Section */}
                              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-3">
                                <h3 className="text-xs font-mono font-bold text-[#007AFF] uppercase tracking-wider border-b border-black/5 pb-2">// Retrospective & Shipped Lessons</h3>
                                <p className="text-xs text-apple-text leading-relaxed font-body">
                                  {project.retrospective}
                                </p>
                              </div>

                              {/* Simulated Comments Section */}
                              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-4">
                                <h3 className="text-xs font-mono font-bold text-apple-text uppercase tracking-wider border-b border-black/5 pb-2">Project Feed Comments ({projectComments.length})</h3>
                                
                                <div className="space-y-3">
                                  {projectComments.map((comment, i) => (
                                    <div key={i} className="text-xs border-b border-black/5 pb-3 last:border-0 last:pb-0">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-apple-text font-mono">{comment.author}</span>
                                        <span className="text-[9px] text-apple-subtext font-mono">{comment.role}</span>
                                      </div>
                                      <p className="text-apple-subtext leading-relaxed">{comment.text}</p>
                                    </div>
                                  ))}
                                </div>

                                {/* Write Comment form */}
                                <form 
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!newCommentText.trim()) return;
                                    setBehanceComments(prev => ({
                                      ...prev,
                                      [project.id]: [
                                        ...prev[project.id],
                                        { author: 'Guest Reviewer', role: 'Portfolio Visitor', text: newCommentText }
                                      ]
                                    }));
                                    setNewCommentText('');
                                  }}
                                  className="flex gap-3 pt-2"
                                >
                                  <input 
                                    type="text"
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    placeholder="Add your review comment..."
                                    className="flex-grow bg-apple-bg text-xs border border-apple-border rounded-xl px-4 py-2 outline-none focus:border-brand-purple transition-all font-mono"
                                  />
                                  <button 
                                    type="submit"
                                    className="px-4 py-2 bg-brand-purple text-white text-xs font-mono font-bold uppercase rounded-xl hover:bg-brand-purple/95 transition-colors cursor-default"
                                  >
                                    Post
                                  </button>
                                </form>
                              </div>

                              {/* Bottom Close / Back to Feed Button */}
                              <div className="flex justify-center pt-6 pb-12">
                                <button
                                  onClick={() => setSelectedBehanceProject(null)}
                                  className="px-6 py-3 rounded-full bg-[#1769FF] text-white text-xs font-mono font-bold uppercase transition-all shadow-apple-md hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] cursor-default flex items-center gap-2"
                                >
                                  ← Back to Project Feed
                                </button>
                              </div>

                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <>
                        {/* Behance Sub-Navbar Header */}
                        <div className="flex items-center justify-between px-6 py-3 border-b border-black/5 bg-white text-apple-text select-none flex-shrink-0">
                          <div className="flex items-center gap-5">
                            <span className="text-2xl font-black tracking-tighter text-[#1769FF] font-sans">Bē</span>
                            <div className="hidden sm:flex gap-5 text-xs font-bold text-apple-subtext">
                              <span className="text-[#1769FF] cursor-default">For You</span>
                              <span className="hover:text-apple-text transition-colors cursor-default">Discover</span>
                              <span className="hover:text-apple-text transition-colors cursor-default">Livestreams</span>
                              <span className="hover:text-apple-text transition-colors cursor-default">Jobs</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-bold text-apple-subtext cursor-default">Praveen Kumar</span>
                            <button className="px-3.5 py-1.5 rounded-full bg-[#1769FF] hover:bg-blue-700 transition-colors text-white font-bold text-[10px] cursor-default">
                              Share Work
                            </button>
                          </div>
                        </div>

                        {/* Behance Filters Bar */}
                        <div className="flex items-center justify-between px-6 py-3 bg-[#FAFBFD] border-b border-black/5 text-[10px] font-mono text-apple-subtext select-none flex-shrink-0">
                          <div className="flex gap-3">
                            <span className="bg-white border border-black/5 px-2.5 py-1 rounded-md cursor-default hover:bg-black/5">Creative Fields ▾</span>
                            <span className="bg-white border border-black/5 px-2.5 py-1 rounded-md cursor-default hover:bg-black/5">Tools ▾</span>
                            <span className="bg-white border border-black/5 px-2.5 py-1 rounded-md cursor-default hover:bg-black/5">Color ▾</span>
                          </div>
                          <span className="cursor-default hover:text-apple-text">Sort: Recommended ▾</span>
                        </div>

                        {/* Behance Content Body */}
                        <div className="p-6 overflow-auto h-[calc(100%-88px)] bg-[#F9F9F9]">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((p) => {
                              const gradient = p.id === 'revlitix-saas'
                                ? 'from-[#6C3DFF] via-[#A58CFF] to-[#EC72B9]'
                                : 'from-[#3B82F6] via-[#60A5FA] to-[#06B6D4]';
                              const likes = appreciations[p.id] || 0;
                              const views = p.id === 'revlitix-saas' ? '3.8k' : '2.4k';
                              
                              return (
                                <div 
                                  key={p.id} 
                                  onClick={() => setSelectedBehanceProject(p.id)}
                                  className="rounded-xl overflow-hidden border border-black/5 bg-white hover:border-[#1769FF]/30 transition-all duration-300 flex flex-col justify-between h-[250px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] group cursor-pointer"
                                >
                                  {/* Large Image/Gradient Banner preview */}
                                  <div className="h-32 w-full relative flex items-center justify-center overflow-hidden bg-apple-bg">
                                    <img 
                                      src={p.heroImage} 
                                      alt={p.title} 
                                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-black/25"></div>
                                    <span className="text-white text-[8px] font-mono font-bold tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase z-10">
                                      {p.title.split(' ')[0]} PRO
                                    </span>
                                  </div>

                                  {/* Footer information block */}
                                  <div className="p-4 flex flex-col justify-between flex-grow">
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <h3 className="text-sm font-display font-extrabold uppercase text-apple-text tracking-tight group-hover:text-[#1769FF] transition-colors leading-none mb-1">{p.title}</h3>
                                        <span className="text-[9px] font-mono text-apple-subtext uppercase tracking-wider">{p.category.split(' · ')[0]}</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-2 select-none">
                                      {/* Owner details */}
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 rounded-full bg-brand-purple flex items-center justify-center text-white text-[8px] font-bold">PK</div>
                                        <span className="text-[9px] font-mono text-apple-subtext">Praveen K.</span>
                                      </div>
                                      {/* Stats parameters */}
                                      <div className="flex items-center gap-3 text-[9px] font-mono text-apple-subtext">
                                        <span className="flex items-center gap-1">
                                          <span className="text-blue-600">👍</span> {likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <span>👁</span> {views}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </DesktopWindow>
                )}

                {/* FIGMA WINDOW: DETAILED PROCESS CANVAS */}
                {openApps.figma && (
                  <DesktopWindow
                    id="figma"
                    title="Figma — Design Workspace"
                    isOpen={openApps.figma}
                    onClose={() => handleClose('figma')}
                    onMinimize={() => handleClose('figma')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 260, y: 120 }}
                    width="840px"
                    height="600px"
                  >
                    {/* Figma Editor Header Toolbar */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-[#2C2C2C] bg-[#1E1E1E] text-white font-mono text-[9px] select-none flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[#F24E1E] font-bold text-xs select-none">✦</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#333333] text-white/90">Main File</span>
                        <span className="text-white/40">/</span>
                        <span className="text-white/90 font-sans font-bold">Interactive Canvas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-2.5 py-1 rounded bg-[#0C8CE9] hover:bg-[#0b7ecf] transition-colors text-white font-bold text-[9px] flex items-center gap-1 cursor-default">
                          <Share2 size={10} /> Share
                        </button>
                        <button className="p-1 rounded hover:bg-[#333333] transition-colors text-white/80 cursor-default">
                          <Play size={10} fill="currentColor" />
                        </button>
                      </div>
                    </div>

                    {/* Figma Split Editor Pane */}
                    <div className="w-full h-[calc(100%-32px)] flex bg-[#2C2C2C]">
                      {/* Left Panel Sidebar */}
                      <div className="w-48 bg-[#1E1E1E] border-r border-[#2C2C2C] text-white/80 p-3 select-none text-[10px] font-mono flex flex-col justify-between flex-shrink-0">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-white font-bold">
                            <Layers size={11} />
                            <span>LAYERS</span>
                          </div>
                          <div className="space-y-2 text-[9px] pl-1 text-white/60">
                            <div>Page 1</div>
                            <div className="text-white pl-2">✦ Figma Simulator</div>
                            <div className="pl-4"># hero-panning-container</div>
                            <div className="pl-4"># mouse-tracker-layer</div>
                            <div className="pl-4"># layout-blueprint-bg</div>
                          </div>
                        </div>
                        <div className="text-[8px] text-white/40">
                          Scale: 100% (Auto)
                        </div>
                      </div>

                      {/* Right Panning Viewport */}
                      <div className="flex-1 h-full overflow-hidden relative bg-[#F5F5F7]">
                        <FigmaHero fullScreen={false} />
                      </div>
                    </div>
                  </DesktopWindow>
                )}


                {/* NOTES WINDOW: BIOGRAPHY TEXTEDIT NOTE SWITCHER */}
                {openApps.notes && (
                  <DesktopWindow
                    id="notes"
                    title="Notes — Bio & Skills"
                    isOpen={openApps.notes}
                    onClose={() => handleClose('notes')}
                    onMinimize={() => handleClose('notes')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 200, y: 140 }}
                    width="740px"
                    height="500px"
                  >
                    {/* TextEdit Split Pane Layout */}
                    <div className="w-full h-full flex bg-[#FAFAF8]">
                      {/* Left Folders List — macOS Notes Style */}
                      <div className="w-48 bg-[#F0EFEB]/90 border-r border-[#DDDCDA] p-3 text-apple-text select-none text-xs font-body space-y-4 flex-shrink-0">
                        <div className="font-semibold text-apple-subtext tracking-wider uppercase text-[9px] mb-3 px-2">My Documents</div>
                        <div className="space-y-0.5">
                          <div 
                            onClick={() => setSelectedNote('bio')}
                            className={`px-2.5 py-2 rounded-lg cursor-default flex items-center gap-2.5 transition-all text-[12px] ${selectedNote === 'bio' ? 'bg-[#FFECB3] text-[#7A5C00] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'hover:bg-black/[0.04] text-apple-text'}`}
                          >
                            <FileText size={13} className={selectedNote === 'bio' ? 'text-[#F59E0B]' : 'text-yellow-600/60'} />
                            <span>Biography.txt</span>
                          </div>
                          <div 
                            onClick={() => setSelectedNote('skills')}
                            className={`px-2.5 py-2 rounded-lg cursor-default flex items-center gap-2.5 transition-all text-[12px] ${selectedNote === 'skills' ? 'bg-[#FFECB3] text-[#7A5C00] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'hover:bg-black/[0.04] text-apple-text'}`}
                          >
                            <FileText size={13} className={selectedNote === 'skills' ? 'text-[#F59E0B]' : 'text-blue-600/60'} />
                            <span>Skills.md</span>
                          </div>
                          <div 
                            onClick={() => setSelectedNote('resume')}
                            className={`px-2.5 py-2 rounded-lg cursor-default flex items-center gap-2.5 transition-all text-[12px] ${selectedNote === 'resume' ? 'bg-[#FFECB3] text-[#7A5C00] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'hover:bg-black/[0.04] text-apple-text'}`}
                          >
                            <FileText size={13} className={selectedNote === 'resume' ? 'text-[#F59E0B]' : 'text-green-600/60'} />
                            <span>Resume.pdf</span>
                          </div>
                          <div 
                            onClick={() => setSelectedNote('journal')}
                            className={`px-2.5 py-2 rounded-lg cursor-default flex items-center gap-2.5 transition-all text-[12px] ${selectedNote === 'journal' ? 'bg-[#FFECB3] text-[#7A5C00] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'hover:bg-black/[0.04] text-apple-text'}`}
                          >
                            <FileText size={13} className={selectedNote === 'journal' ? 'text-[#F59E0B]' : 'text-purple-600/60'} />
                            <span>Journal.txt</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Editor Writing Area — Warm Paper */}
                      <div className="flex-grow p-6 overflow-auto text-apple-text select-text bg-[#FFFCF5] font-body text-sm leading-relaxed">
                        {selectedNote === 'bio' && (
                          <div className="space-y-4 text-[12px]">
                            <div className="flex justify-between items-center border-b border-black/5 pb-2 mb-3">
                              <h2 className="text-lg font-display font-extrabold uppercase text-apple-text">Biography.txt</h2>
                              <span className="text-[9px] font-mono text-white/90 bg-[#007AFF] px-2 py-0.5 rounded-full font-bold">Moniker: Black Widow</span>
                            </div>
                            
                            <p className="font-bold text-apple-text text-sm">
                              Product Designer with a developer's brain. Bengaluru, India.
                            </p>
                            <p>
                              My journey into product design is rooted in computer science. I graduated with a **Bachelor of Computer Application (BCA)** from Kristu Jayanti College (2016-2019), Bangalore, where I wrote C++ compilers, optimized SQL database schemas, and learned the core logic of front-end engineering. 
                            </p>
                            <p>
                              Entering the tech industry as a **UI Developer at DSG Inc (2021-2022)**, I was the engineer who constantly redesigned layout grids and UI components without being prompted. I realized that my interest lay not just in how code compiles, but in why users struggled with complex systems. This led to my transition into UI/UX.
                            </p>
                            <p>
                              At **Revlitix (2023-2025)** and now **Candescent (2025-Present)**, I work as a Senior Product Designer. Because I spent years in code repos, my figma handoffs are highly scalable token structures that map directly to Tailwind CSS variables, reducing engineering implementation cycles by 25%. I build enterprise systems where complex datasets meet high-fidelity clarity.
                            </p>
                            <p className="text-[10px] text-apple-subtext font-mono italic mt-6">Modified: Just now, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        )}

                        {selectedNote === 'skills' && (
                          <div className="space-y-4 text-[12px]">
                            <h2 className="text-lg font-display font-extrabold uppercase mb-2 border-b border-black/5 pb-2">Skills.md</h2>
                            <p className="text-apple-subtext font-mono text-[11px]">A modular compilation of product design stacks & engineering alignment capabilities:</p>
                            <div className="grid grid-cols-2 gap-6 pt-2">
                              <div>
                                <h3 className="font-mono font-bold text-xs uppercase text-[#007AFF] mb-2">// DESIGN & STRATEGY</h3>
                                <ul className="space-y-1.5 font-mono text-apple-subtext text-[11px]">
                                  <li>✦ Responsive Layout Architecture</li>
                                  <li>✦ Figma Token Studio Systems</li>
                                  <li>✦ Usability Diagnostics & CRO</li>
                                  <li>✦ Advanced Motion Specs (Principle)</li>
                                  <li>✦ WCAG Accessibility (A11y) Compliance</li>
                                </ul>
                              </div>
                              <div>
                                <h3 className="font-mono font-bold text-xs uppercase text-teal-600 mb-2">// TECHNICAL MATRIX</h3>
                                <ul className="space-y-1.5 font-mono text-apple-subtext text-[11px]">
                                  <li>✦ React.js Functional Components</li>
                                  <li>✦ Tailwind Utility Configurations</li>
                                  <li>✦ CSS Flexbox & CSS Grid feasibility</li>
                                  <li>✦ Webflow Custom JavaScript Inject</li>
                                  <li>✦ Rest API JSON Data structures</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedNote === 'resume' && (
                          <div className="space-y-4 flex flex-col justify-between h-[360px] text-[12px]">
                            <div>
                              <h2 className="text-lg font-display font-extrabold uppercase mb-2 border-b border-black/5 pb-2">Resume.pdf</h2>
                              <p className="text-apple-subtext leading-relaxed">
                                Access my complete job history, project contributions, client lists, and educational details. Available as an interactive web page sheet.
                              </p>
                              <div className="mt-4 space-y-2 font-mono text-[11px] text-apple-subtext">
                                <div>🎓 BCA Computer Science — KJC, Bangalore</div>
                                <div>💼 UI/UX Designer — Candescent (Present)</div>
                                <div>💼 UI/UX Designer — Revlitix (2023-2025)</div>
                                <div>💼 UI Developer — DSG Inc (2021-2022)</div>
                              </div>
                            </div>
                            <div className="bg-white border border-black/5 p-4 rounded-xl shadow-apple-sm flex items-center justify-between">
                              <span className="text-[11px] font-mono font-bold text-apple-subtext">curriculum_vitae_praveen.pdf</span>
                              <button 
                                onClick={() => {
                                  setSafariTab('resume');
                                  setOpenApps(prev => ({ ...prev, safari: true }));
                                  setActiveWindow('safari');
                                }}
                                className="px-4 py-2 rounded-xl bg-[#007AFF] text-white text-xs font-mono font-bold uppercase hover:bg-blue-700 transition-colors cursor-default border-none outline-none"
                              >
                                View File →
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedNote === 'journal' && (
                          <div className="space-y-4 text-[12px]">
                            <h2 className="text-lg font-display font-extrabold uppercase mb-2 border-b border-black/5 pb-2">Journal.txt — Design Musings</h2>
                            <div className="space-y-4 font-mono text-apple-text">
                              <div>
                                <p className="font-bold text-[#007AFF] uppercase text-xs">// 01 — The Friction is the Point</p>
                                <p className="text-[11px] leading-relaxed text-apple-subtext font-body mt-1">
                                  In consumer apps, design is about zero friction. Click, buy, swipe. In enterprise tools (SaaS, FinTech), user friction isn't always a mistake — it is key to safety. Designing double-actions for high-stakes wire transfers saves companies millions. Feasibility matters.
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-teal-600 uppercase text-xs">// 02 — Bridging Design & Engineering</p>
                                <p className="text-[11px] leading-relaxed text-apple-subtext font-body mt-1">
                                  Because I spent years coding React and writing layout grids, I don't design layouts that break inside CSS flexbox rules. Having a BCA computer science degree means speaking the language of engineering. It speeds up shipping cycles by 2x.
                                </p>
                              </div>
                            </div>
                            <p className="text-[10px] text-apple-subtext font-mono italic mt-4">Last written: 2 days ago</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </DesktopWindow>
                )}

                {/* 13. REVILITIX VIDEO DEMO */}
                {openApps.video_revlitix && (
                  <DesktopWindow
                    id="video_revlitix"
                    title="QuickTime Player — Revlitix.mp4"
                    isOpen={openApps.video_revlitix}
                    onClose={() => handleClose('video_revlitix')}
                    onMinimize={() => handleClose('video_revlitix')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 160, y: 120 }}
                    width="720px"
                    height="440px"
                  >
                    <div className="absolute inset-0 bg-black flex items-center justify-center select-none overflow-hidden">
                      <video src="/assets/Revlitix.mp4" controls autoPlay className="w-full h-full object-contain outline-none" />
                    </div>
                  </DesktopWindow>
                )}

                {/* 14. SONIC VIDEO DEMO */}
                {openApps.video_sonic && (
                  <DesktopWindow
                    id="video_sonic"
                    title="QuickTime Player — Sonic.mp4"
                    isOpen={openApps.video_sonic}
                    onClose={() => handleClose('video_sonic')}
                    onMinimize={() => handleClose('video_sonic')}
                    activeWindow={activeWindow}
                    onFocus={handleFocus}
                    defaultPosition={{ x: 200, y: 160 }}
                    width="720px"
                    height="440px"
                  >
                    <div className="absolute inset-0 bg-black flex items-center justify-center select-none overflow-hidden">
                      <video src="/assets/Sonic.mp4" controls autoPlay className="w-full h-full object-contain outline-none" />
                    </div>
                  </DesktopWindow>
                )}

              </AnimatePresence>

            </motion.div>
          </div>

          {/* 5. macOS bottom Dock */}
          <DesktopDock onAppClick={handleAppClick} openApps={openApps} />
        </div>
        )
      )}

      {/* System Brightness Dimming Overlay */}
      <div 
        className="fixed inset-0 bg-black pointer-events-none z-[99999] transition-opacity duration-75" 
        style={{ opacity: Math.max(0, Math.min(0.7, (100 - brightness) / 100 * 0.85)) }} 
      />

    </main>
  );
};

export default Home;
