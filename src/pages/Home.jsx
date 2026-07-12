import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Plus, Minus, ExternalLink, Play } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [hoveredWorkIndex, setHoveredWorkIndex] = useState(null);

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
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
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

  /* ─── SCROLL ANIMATIONS REMOVED ─── */

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
        desktop: '/assets/revlitix_hero_v3.jpg',
        tablet: '/assets/revlitix_waterfall_v3.jpg',
        mobile: '/assets/revlitix_ai_v3.jpg'
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

      {/* ═══════ CHAPTER 1 — HERO ═══════ */}
      <section className="hero-split" id="hero" ref={heroRef} onMouseMove={handleMouseMoveParallax}>
        
        {/* Main Content */}
        <div className="hero-split-inner main-content">
          
          {/* Left: Typography (30%) */}
          <motion.div className="hero-typography-split"
            style={{ y: heroTextY }}
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
          >
            <motion.h1 className="hero-headline"
              variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <span className="headline-row">Designing</span>
              <span className="headline-row headline-accent">clarity.</span>
            </motion.h1>

            <motion.p className="hero-body"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
            >
              I'm a Product Designer turning complex problems into simple experiences.
            </motion.p>

            <motion.div className="hero-actions"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <Link to="/work" className="hero-btn-primary hover-target">
                <span>View My Work</span>
                <span className="btn-arrow">→</span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right: Illustration (70%) */}
          <motion.div className="hero-illustration-wrapper-split"
            style={{ y: heroImageY }}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Floating Animation Wrapper */}
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <motion.img 
                src="/assets/design_island_annotated.jpg" 
                alt="Design Island Annotated"
                className="hero-landscape-img"
                style={{ x: cardParallaxX, y: cardParallaxY }}
              />
            </motion.div>
          </motion.div>
        </div>

      </section>

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
            <h2 className="work-heading">Designing products that create measurable business impact.</h2>
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
                onClick={() => navigate(`/case-study/${project.id}`)}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp} custom={i * 0.2}
              >
                {/* Visual Background/Mockup Layer */}
                <div className="column-visual-layer">
                  <img src={project.visuals.desktop} alt="" className="column-bg-img" />
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

    </main>
  );
};

export default Home;
