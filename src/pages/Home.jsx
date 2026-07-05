import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Plus, Minus, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ChapterIndicator from '../components/ChapterIndicator';
import TextMarquee from '../components/TextMarquee';
import AnimatedCounter from '../components/AnimatedCounter';
import SplitReveal from '../components/SplitReveal';
import MagneticButton from '../components/MagneticButton';
import ContactSection from '../components/ContactSection';
import ProcessSection from '../components/ProcessSection';
import ImpactSection from '../components/ImpactSection';
import './Home.css';

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
  const heroRef = useRef(null);
  const workRef = useRef(null);
  const [activeExp, setActiveExp] = useState(0);
  const [activeChapter, setActiveChapter] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
  }, []);

  /* Hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef, offset: ['start start', 'end start']
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.8], [1, 0.96]);
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%']);

  /* ─── DATA ─── */
  const projects = [
    {
      id: 'revlitix-saas',
      num: '01',
      title: 'Revlitix SaaS Platform',
      category: 'AI Product Design · UX Strategy · Design Systems',
      desc: 'An AI-powered analytics platform helping enterprise teams discover actionable insights, automate complex data operations, and make faster business decisions.',
      metrics: [
        { value: '25', prefix: '+', suffix: '%', label: 'Product Adoption' },
        { value: '40', prefix: '+', suffix: '%', label: 'Workflow Efficiency' },
        { value: '30', prefix: '-', suffix: '%', label: 'Time to Insight' }
      ],
      visuals: {
        desktop: '/assets/revlitix_hero_main.jpg',
        tablet: '/assets/revlitix_process_1783016419496.jpg',
        mobile: '/assets/revlitix_outcomes_1783016439002.jpg'
      },
      outcomes: [
        'Reduced cognitive load through intelligent defaults and clean information hierarchy.',
        'Accelerated decision cycles by surfacing key alerts and automated anomaly detection.',
        'Scaled design-to-development velocity with a robust, accessible component library.'
      ]
    },
    {
      id: 'sonic',
      num: '02',
      title: 'Revlitix Sonic AI',
      category: 'AI Interface · UX Strategy · Design Systems',
      desc: 'An AI-powered natural language database query assistant built for marketing, sales, and product teams to extract automated visual business insights in real time.',
      metrics: [
        { value: '60', prefix: '+', suffix: '%', label: 'Faster Insights Discovery' },
        { value: '40', prefix: '-', suffix: '%', label: 'Data Support Tickets' },
        { value: '85', prefix: '+', suffix: '%', label: 'System Usability (SUS)' }
      ],
      visuals: {
        desktop: '/assets/revlitix_website_product_images/6896089a9b458a0e5d353212_Frame 1321315474.png',
        tablet: '/assets/revlitix_website_product_images/6896135103e8ca6406b070d3_Frame 1321315475.png',
        mobile: '/assets/revlitix_website_product_images/68961de44ae404323fc2a4bf_SZj7gmTHfxZ.png'
      },
      outcomes: [
        'Designed a conversational query assistant reducing complex database querying times by 80%.',
        'Created clear progressive disclosure systems displaying generated SQL details to build trust.',
        'Built a cohesive, accessible visual token architecture supporting unified dark/light themes.'
      ]
    }
  ];

  const principles = [
    {
      num: '01',
      title: 'Data-Informed, Human-Centered',
      body: 'Every design decision starts with real user insights and ends with measurable business outcomes. I combine deep research with intuition to create experiences that feel effortless but are backed by evidence.',
    },
    {
      num: '02',
      title: 'Systems Over Screens',
      body: 'I don\'t design pages — I design scalable systems. Every component, token, and pattern is built to grow with the product, ensuring consistency across hundreds of touchpoints.',
    },
    {
      num: '03',
      title: 'Impact Over Aesthetics',
      body: 'Beautiful interfaces are table stakes. I optimize for the metrics that matter — adoption, retention, conversion, and task efficiency. Design should drive the business forward.',
    },
  ];

  const craftItems = [
    { title: 'Design Systems', desc: 'Scalable component libraries with tokens, variants, and documentation.', icon: '◈' },
    { title: 'Typography', desc: 'Expressive type hierarchies that guide and delight.', icon: 'Aa' },
    { title: 'Motion', desc: 'Purposeful animations that reinforce interaction patterns.', icon: '◎' },
    { title: 'Accessibility', desc: 'WCAG-compliant experiences built for everyone.', icon: '∞' },
    { title: 'Responsive', desc: 'Fluid layouts that feel native across every device.', icon: '⬡' },
    { title: 'Collaboration', desc: 'Figma, Webflow, After Effects — bridging design and code.', icon: '⟡' },
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

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  return (
    <main>

      {/* ═══════ CHAPTER 1 — INTRODUCTION (PRODUCT OS HERO) ═══════ */}
      <motion.section className="ch-hero" id="hero" ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        onMouseMove={handleMouseMoveParallax}
      >
        {/* Ambient Light Sweep Overlay */}
        <div className="hero-light-sweep" />

        {/* Mouse-following gradient orb */}
        <motion.div
          className="hero-orb"
          animate={{
            x: mousePos.x - 300,
            y: mousePos.y - 300,
          }}
          transition={{ type: 'spring', damping: 35, stiffness: 180, mass: 0.5 }}
        />

        <div className="ch-hero-inner main-content">
          {/* Invisible interactive hotspot for pre-rendered video CTA */}
          <a href="#work" className="hero-video-cta-hotspot hover-target" aria-label="Explore my work" />

          {/* Left Column: Editorial Typography (40% width) */}
          <motion.div className="hero-content-col"
            style={{ x: textParallaxX, y: textParallaxY }}
          >
            <span className="hero-tagline">PRODUCT DESIGNER · STRATEGIST</span>
            
            <h1 className="hero-headline-title">
              I design logic. <br />
              <span className="italic-highlight">Crafting clarity.</span>
            </h1>

            <p className="hero-headline-desc">
              I partner with SaaS, Fintech & AI teams to translate complex workflows into high-impact digital products. Blending engineering detail with visual craftsmanship.
            </p>

            <div className="hero-headline-action">
              <a href="#work" className="explore-work-cta hover-target">
                <span className="cta-circle">
                  <ArrowUpRight size={20} />
                </span>
                <span className="cta-text">
                  Explore my work
                  <svg className="brush-underline-svg" viewBox="0 0 120 12" preserveAspectRatio="none">
                    <path d="M 2,8 Q 50,2 118,6 T 115,10" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Immersive Process Visual (60% width) */}
          <div className="hero-visual-col">
            <div className="hero-visual-canvas">
              {/* Background 3D Workspace Scene Layer (Parallax: 2-4px) */}
              <motion.div className="hero-visual-bg-layer"
                style={{ x: bgParallaxX, y: bgParallaxY }}
              >
                <video 
                  src="/assets/Workspace_animation_with_text_ov…_202607032016.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="hero-visual-video"
                />
                {/* Legibility contrast overlay for text backdrop */}
                <div className="hero-video-gradient-overlay" />
              </motion.div>

              {/* Interactive Process Overlay Layer (Parallax: 8-12px) */}
              <motion.div className="hero-visual-interactive-layer"
                style={{ x: cardParallaxX, y: cardParallaxY }}
              >
                {/* Dynamic Connecting Winding Path SVG */}
                <svg className="process-glowing-svg" viewBox="0 0 1000 680" preserveAspectRatio="none">
                  <path 
                    id="process-pulse-path"
                    d="M 435,98 C 550,110 680,105 680,115 C 680,115 745,200 745,272 C 745,340 715,400 715,418 C 715,418 630,550 500,430 C 370,310 270,340 270,377 C 270,410 400,490 435,98" 
                    fill="none" 
                    stroke="rgba(124, 58, 237, 0.12)" 
                    strokeWidth="3" 
                    strokeDasharray="6 8"
                  />
                  
                  {/* Active Purple Pulse traveling along the path */}
                  <path 
                    d="M 435,98 C 550,110 680,105 680,115 C 680,115 745,200 745,272 C 745,340 715,400 715,418 C 715,418 630,550 500,430 C 370,310 270,340 270,377 C 270,410 400,490 435,98" 
                    fill="none" 
                    stroke="var(--accent-purple)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                    className="process-pulse-line"
                  />
                </svg>

                {/* 5 Floating Glass Cards */}
                {/* Research */}
                <motion.div 
                  className="glass-process-card card-research hover-target"
                  style={{ top: '14.5%', left: '43.5%' }}
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ rotateX: 12, rotateY: -12, scale: 1.03 }}
                >
                  <div className="glass-card-tag">01</div>
                  <div className="glass-card-body">
                    <h4>RESEARCH</h4>
                    <p>Understand people, markets & problems.</p>
                  </div>
                  {/* Mini chart visual overlay */}
                  <div className="glass-card-mini-graph">
                    <svg viewBox="0 0 100 30" className="mini-chart-svg">
                      <path d="M 0,25 Q 25,5 50,18 T 100,5" fill="none" stroke="var(--accent-purple)" strokeWidth="2" />
                      <circle cx="100" cy="5" r="3" fill="var(--accent-purple)" />
                    </svg>
                  </div>
                </motion.div>

                {/* Strategy */}
                <motion.div 
                  className="glass-process-card card-strategy hover-target"
                  style={{ top: '17%', left: '68%' }}
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  whileHover={{ rotateX: 12, rotateY: -12, scale: 1.03 }}
                >
                  <div className="glass-card-tag">02</div>
                  <div className="glass-card-body">
                    <h4>STRATEGY</h4>
                    <p>Align user needs with business goals.</p>
                  </div>
                  <div className="glass-card-circles">
                    <div className="circle-venn cv-1" />
                    <div className="circle-venn cv-2" />
                  </div>
                </motion.div>

                {/* Design */}
                <motion.div 
                  className="glass-process-card card-design hover-target"
                  style={{ top: '40%', left: '74.5%' }}
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  whileHover={{ rotateX: 12, rotateY: -12, scale: 1.03 }}
                >
                  <div className="glass-card-tag">03</div>
                  <div className="glass-card-body">
                    <h4>DESIGN</h4>
                    <p>Create intuitive experiences.</p>
                  </div>
                  <div className="glass-card-wireframe">
                    <div className="wf-bar wfb-1" />
                    <div className="wf-bar wfb-2" />
                    <div className="wf-bar wfb-3" />
                  </div>
                </motion.div>

                {/* Validate */}
                <motion.div 
                  className="glass-process-card card-validate hover-target"
                  style={{ top: '61.5%', left: '71.5%' }}
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  whileHover={{ rotateX: 12, rotateY: -12, scale: 1.03 }}
                >
                  <div className="glass-card-tag">04</div>
                  <div className="glass-card-body">
                    <h4>VALIDATE</h4>
                    <p>Test. Iterate. Improve.</p>
                  </div>
                  <div className="glass-card-bar-graph">
                    <span className="bg-bar bgb-1" />
                    <span className="bg-bar bgb-2" />
                    <span className="bg-bar bgb-3" />
                    <span className="bg-bar bgb-4" />
                  </div>
                </motion.div>

                {/* Impact */}
                <motion.div 
                  className="glass-process-card card-impact hover-target"
                  style={{ top: '55.5%', left: '27%' }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4.9, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  whileHover={{ rotateX: 12, rotateY: -12, scale: 1.03 }}
                >
                  <div className="glass-card-tag">05</div>
                  <div className="glass-card-body">
                    <h4>IMPACT</h4>
                    <p>Drive measurable business outcomes.</p>
                  </div>
                  <span className="glass-card-metric">+25%</span>
                </motion.div>

                {/* Micro-Animation: Coffee Cup Steam (Coordinates x: 93%, y: 70%) */}
                <div className="cup-steam-container" style={{ top: '70%', left: '93%' }}>
                  <svg viewBox="0 0 40 80" className="steam-svg">
                    <path d="M 10,70 Q 5,50 15,30 T 10,10" className="steam-line sl-1" />
                    <path d="M 20,70 Q 25,50 15,30 T 20,10" className="steam-line sl-2" />
                    <path d="M 30,70 Q 25,55 35,35 T 30,15" className="steam-line sl-3" />
                  </svg>
                </div>

                {/* Micro-Animation: Pulsing Tablet HUD (Coordinates x: 50%, y: 72%) */}
                <div className="tablet-hud-dot" style={{ top: '72%', left: '50%' }}>
                  <span className="hud-dot" />
                  <span className="hud-pulse" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

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
                  <AnimatedCounter value="3" suffix="+" />
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
            <h2 className="work-heading">Designing products that create measurable business impact.</h2>
            <p className="work-header-sub">
              A curated collection of SaaS, Fintech, and AI products where research, strategy, systems thinking, and execution combined to drive meaningful outcomes.
            </p>
          </motion.div>
        </div>

        <div className="work-showcase">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="work-showcase-panel hover-target"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp} custom={i * 0.3}
              onClick={() => navigate(`/case-study/${project.id}`)}
            >
              {/* Storytelling Background Diagrams */}
              <div className="panel-bg-diagrams">
                <svg width="100%" height="100%" className="bg-diagram-svg">
                  <defs>
                    <pattern id={`grid-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(124, 58, 237, 0.012)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
                  
                  {/* Concentric workflow arcs */}
                  <circle cx="85%" cy="50%" r="200" fill="none" stroke="rgba(124, 58, 237, 0.02)" strokeWidth="1" strokeDasharray="4 6" />
                  <circle cx="85%" cy="50%" r="120" fill="none" stroke="rgba(124, 58, 237, 0.015)" strokeWidth="1" />
                  
                  {/* Process/journey line node map */}
                  <path d="M 120,60 Q 220,100 170,200 T 380,280" fill="none" stroke="rgba(124, 58, 237, 0.015)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="120" cy="60" r="3" fill="rgba(124, 58, 237, 0.15)" />
                  <circle cx="170" cy="200" r="3" fill="rgba(124, 58, 237, 0.15)" />
                  <circle cx="380" cy="280" r="4" fill="rgba(124, 58, 237, 0.25)" />
                </svg>

                {/* Floating Handwritten Style Notes */}
                <div className="handwritten-note note-1">
                  <span>✦ User Journey Audit</span>
                </div>
                <div className="handwritten-note note-2">
                  <span>✦ Component Library Architecture</span>
                </div>
              </div>

              {/* Story/Outcomes Info (Left Column) */}
              <div className="panel-info">
                <div className="panel-meta">
                  <span className="panel-number">{project.num}</span>
                  <div className="panel-tags">
                    {project.category.split(' · ').map((tag, j) => (
                      <span key={j} className="panel-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <h3 className="panel-title">{project.title}</h3>
                <p className="panel-desc">{project.desc}</p>

                {/* Oversized Impact Metrics */}
                <div className="panel-metrics">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="panel-metric-item">
                      <div className="panel-metric-value">
                        <AnimatedCounter 
                          value={m.value} 
                          prefix={m.prefix} 
                          suffix={m.suffix} 
                          className="metric-counter"
                        />
                      </div>
                      <span className="panel-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Strategic Outcomes List */}
                <div className="panel-outcomes">
                  <span className="outcomes-header">✦ STRATEGIC OUTCOMES</span>
                  <ul className="outcomes-list">
                    {project.outcomes.map((o, idx) => (
                      <li key={idx} className="outcome-item">{o}</li>
                    ))}
                  </ul>
                </div>

                {/* Case Study Entry Button Link */}
                <div className="panel-action">
                  <span className="view-case-study-link">
                    View Full Case Study <span className="arrow">→</span>
                  </span>
                </div>
              </div>

              {/* Immersive 3D Device Showcase Mockups (Right Column) */}
              <div className="panel-showcase">
                <div className="mockup-frame mockup-desktop">
                  <div className="browser-header">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <img src={project.visuals.desktop} alt={`${project.title} Desktop`} />
                </div>

                <div className="mockup-frame mockup-tablet">
                  <img src={project.visuals.tablet} alt={`${project.title} Tablet`} />
                </div>

                <div className="mockup-frame mockup-mobile">
                  <div className="mobile-speaker" />
                  <img src={project.visuals.mobile} alt={`${project.title} Mobile`} />
                </div>
              </div>
            </motion.div>
          ))}
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

    </main>
  );
};

export default Home;
