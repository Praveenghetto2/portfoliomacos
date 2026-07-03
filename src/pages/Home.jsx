import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Plus, Minus, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import ChapterIndicator from '../components/ChapterIndicator';
import TextMarquee from '../components/TextMarquee';
import AnimatedCounter from '../components/AnimatedCounter';
import SplitReveal from '../components/SplitReveal';
import MagneticButton from '../components/MagneticButton';
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

const OS_NODES = [
  {
    id: 'research',
    label: 'Research',
    x: '15%',
    y: '15%',
    metric: '50+ Interviews',
    desc: 'Qualitative user insights mapped directly to feature backlogs.',
    details: ['User Interviews', 'Competitive Audits', 'Stakeholder Mapping', 'Domain Immersion']
  },
  {
    id: 'insights',
    label: 'User Insights',
    x: '45%',
    y: '12%',
    metric: '-40% Friction',
    desc: 'Identifying drop-off points & behavioral friction on dense dashboards.',
    details: ['Drop-off Audit', 'Behavioral Mapping', 'UX Audit Insights', 'Accessibility Checks']
  },
  {
    id: 'strategy',
    label: 'Product Strategy',
    x: '25%',
    y: '45%',
    metric: 'ROI Aligned',
    desc: 'Aligning visual architecture with SaaS adoption goals.',
    details: ['North Star Metrics', 'Feature Scoping', 'Adoption Strategy', 'Funnels Mapping']
  },
  {
    id: 'flows',
    label: 'UX Flows',
    x: '55%',
    y: '38%',
    metric: '3x Efficiency',
    desc: 'Progressive disclosure systems that prevent cognitive overload.',
    details: ['Task Flows', 'Collapsible Sidebars', 'Logical Paths', 'User Journeys']
  },
  {
    id: 'systems',
    label: 'Design Systems',
    x: '38%',
    y: '75%',
    metric: '25% Dev Speed',
    desc: 'Tokens, variants, and documentation engineered for scale.',
    details: ['Figma Libraries', 'Modular Tokens', 'Component Playbook', 'Handoff Guidelines']
  },
  {
    id: 'prototyping',
    label: 'Prototyping',
    x: '75%',
    y: '55%',
    metric: 'Zero-Guess Handoff',
    desc: 'High-fidelity motion studies validating transitions before development.',
    details: ['Interactive Mockups', 'Micro-interactions', 'After Effects Motion', 'Lottie Assets']
  },
  {
    id: 'analytics',
    label: 'Analytics',
    x: '62%',
    y: '82%',
    metric: 'Funnel Tracking',
    desc: 'Post-launch product analytics monitoring real-world interactions.',
    details: ['Mixpanel Funnels', 'Heatmaps Analysis', 'Conversion Audits', 'A/B Testing']
  },
  {
    id: 'metrics',
    label: 'Business Metrics',
    x: '88%',
    y: '78%',
    metric: '85% SUS Score',
    desc: 'Measuring UX excellence against quantitative enterprise metrics.',
    details: ['Task Success Rate', 'SUS Score Audits', 'NPS Calibration', 'Retention Impact']
  },
  {
    id: 'growth',
    label: 'User Growth',
    x: '85%',
    y: '25%',
    metric: '+25% Adoption',
    desc: 'Continuous feedback loops converting user satisfaction into growth.',
    details: ['Conversion Uplifts', 'Growth Multipliers', 'Friction-Free Loops', 'Product Led Growth']
  }
];

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
  const [hoveredNode, setHoveredNode] = useState(null);

  /* Mouse move tracking for interactive hero orb */
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
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
      title: 'Revlitix SaaS Platform',
      category: 'AI Product Design · UX Strategy · Design Systems',
      image: '/assets/revlitix_hero_main.jpg',
      desc: 'Reimagined the enterprise analytics experience with AI-powered dashboards and a modular design system.',
      metric: '25%',
      metricLabel: 'Adoption Lift',
    },
    {
      id: 'sonic',
      title: 'Revlitix Enterprise Website',
      category: 'Web Design · Conversion Optimization · Webflow',
      image: '/assets/revlitix_outcomes_1783016439002.jpg',
      desc: 'Transformed the marketing site with visual storytelling and conversion-optimized user journeys.',
      metric: '12%',
      metricLabel: 'Conversion Lift',
    },
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

  const processSteps = [
    { num: '01', title: 'Discovery', desc: 'Understanding the problem space through stakeholder interviews and domain immersion.' },
    { num: '02', title: 'Research', desc: 'User interviews, data analysis, competitive audits, and behavioral insights.' },
    { num: '03', title: 'Ideation', desc: 'Rapid exploration through sketches, concepts, and collaborative workshops.' },
    { num: '04', title: 'Architecture', desc: 'Information architecture, user flows, and system-level thinking.' },
    { num: '05', title: 'Design', desc: 'High-fidelity prototyping, testing, and iterative refinement.' },
    { num: '06', title: 'Delivery', desc: 'Design systems, developer handoff, and post-launch iteration.' },
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

  const currentHUD = OS_NODES.find(n => n.id === hoveredNode) || {
    label: 'Design System OS',
    metric: 'System Status: Active',
    desc: 'Hover any node in the interactive grid to simulate data flow & view product impact metrics.',
    details: ['Research Insights', 'Strategic Execution', 'Pixel Craftsmanship', 'Business Impact']
  };

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */
  return (
    <main>

      {/* ═══════ CHAPTER 1 — INTRODUCTION (PRODUCT OS HERO) ═══════ */}
      <motion.section className="ch-hero" id="hero" ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        onMouseMove={handleMouseMove}
      >
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
          <div className="hero-dashboard">
            
            {/* Sidebar Control Desk (Left Pane) */}
            <div className="dashboard-pane dashboard-pane--sidebar">
              <div className="pane-section pane-section--statement">
                <span className="section-label">Product Design OS v1.0</span>
                <SplitReveal
                  text="Designing products where user needs, business goals, and technology meet."
                  tag="h1"
                  className="hero-editorial-title"
                  delay={0.1}
                />
                <p className="hero-editorial-sub">
                  I shape complex B2B SaaS, Fintech, and AI platform interfaces into high-adoption systems that solve business problems and deliver measurable user growth.
                </p>
                <div className="hero-editorial-ctas">
                  <MagneticButton href="#work" className="btn btn-hero-primary hover-target">Selected Work</MagneticButton>
                  <MagneticButton href="mailto:praveenpk990057@gmail.com" className="btn btn-hero-outline hover-target">Get in Touch</MagneticButton>
                </div>
              </div>
              
              {/* Dynamic HUD Control Console Panel */}
              <div className="pane-section pane-section--hud">
                <div className="os-hud-header">
                  <span className="os-hud-title">{currentHUD.label}</span>
                  <span className="os-hud-metric">{currentHUD.metric}</span>
                </div>
                <p className="os-hud-desc">{currentHUD.desc}</p>
                <div className="os-hud-tags">
                  {currentHUD.details.map((item, idx) => (
                    <span key={idx} className="os-hud-tag">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive OS Grid Canvas (Right Pane) */}
            <div className="dashboard-pane dashboard-pane--canvas">
              {/* Corner Sci-Fi HUD Decors */}
              <div className="os-corner-tick os-tick-tl" />
              <div className="os-corner-tick os-tick-tr" />
              <div className="os-corner-tick os-tick-bl" />
              <div className="os-corner-tick os-tick-br" />
              
              {/* Floating Premium Impact Cards */}
              <motion.div 
                className="os-floating-card hover-target"
                style={{ top: '8%', left: '8%' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="floating-card-val">+25%</span>
                <span className="floating-card-lbl">Product Adoption</span>
              </motion.div>

              <motion.div 
                className="os-floating-card hover-target"
                style={{ bottom: '10%', right: '8%' }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <span className="floating-card-val">+50%</span>
                <span className="floating-card-lbl">Launch Velocity</span>
              </motion.div>

              <motion.div 
                className="os-floating-card hover-target"
                style={{ top: '65%', left: '5%' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <span className="floating-card-val">+25%</span>
                <span className="floating-card-lbl">Handoff Efficiency</span>
              </motion.div>

              {/* Connections SVG lines */}
              <svg className="os-connections-svg">
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                <line x1="15%" y1="15%" x2="45%" y2="12%" className="os-svg-line" />
                <line x1="45%" y1="12%" x2="25%" y2="45%" className="os-svg-line" />
                <line x1="25%" y1="45%" x2="55%" y2="38%" className="os-svg-line" />
                <line x1="25%" y1="45%" x2="38%" y2="75%" className="os-svg-line" />
                <line x1="55%" y1="38%" x2="75%" y2="55%" className="os-svg-line" />
                <line x1="38%" y1="75%" x2="75%" y2="55%" className="os-svg-line" />
                <line x1="75%" y1="55%" x2="62%" y2="82%" className="os-svg-line" />
                <line x1="62%" y1="82%" x2="88%" y2="78%" className="os-svg-line" />
                <line x1="88%" y1="78%" x2="85%" y2="25%" className="os-svg-line" />
                <line x1="85%" y1="25%" x2="45%" y2="12%" className="os-svg-line" />
              </svg>

              {/* Connected Nodes */}
              {OS_NODES.map((node) => {
                const isHovered = hoveredNode === node.id;
                return (
                  <button
                    key={node.id}
                    className={`os-node-btn hover-target ${isHovered ? 'os-node-btn--hovered' : ''}`}
                    style={{ left: node.x, top: node.y }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    aria-label={`Inspect ${node.label} node`}
                  >
                    <span className="os-node-dot" />
                    <span className="os-node-pulse" />
                    <span className="os-node-label">{node.label}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Scroll invitation cue */}
        <motion.div className="hero-scroll-cue"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <span>Explore Platform</span>
          <div className="scroll-line" />
        </motion.div>
      </motion.section>

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
            <span className="section-label">Selected Work</span>
            <h2 className="work-heading">Projects I'm proud of.</h2>
          </motion.div>
        </div>

        <div className="work-showcase">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="work-card hover-target"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp} custom={i * 0.5}
              onClick={() => navigate(`/case-study/${project.id}`)}
            >
              <div className="work-card-image-wrap">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="work-card-image"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="work-card-metric">
                  <span className="metric-value">{project.metric}</span>
                  <span className="metric-label">{project.metricLabel}</span>
                </div>
              </div>
              <div className="work-card-info main-content">
                <div className="work-card-meta">
                  <span className="work-card-num">0{i + 1}</span>
                  <div className="work-card-tags">
                    {project.category.split(' · ').map((tag, j) => (
                      <span key={j} className="work-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="work-card-title">
                  {project.title}
                  <ArrowUpRight size={28} className="work-card-arrow" />
                </h3>
                <p className="work-card-desc">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ CHAPTER 4 — PROCESS ═══════ */}
      <section className="ch-process" id="process">
        <div className="main-content">
          <motion.div className="process-header"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <span className="section-label">Process</span>
            <h2 className="process-heading">How I work.</h2>
          </motion.div>

          <div className="process-grid">
            {processSteps.map((step, i) => (
              <motion.div key={i} className="process-step"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp} custom={i * 0.3}
              >
                <span className="process-num">{step.num}</span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="ch-impact" id="impact">
        <div className="main-content">
          <motion.div className="impact-header"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <span className="section-label section-label--light">Impact</span>
            <h2 className="impact-heading">Design that drives business outcomes.</h2>
          </motion.div>

          <div className="impact-grid">
            {[
              { value: '40', suffix: '%', label: 'Reduction in user drop-offs' },
              { value: '3', suffix: '×', label: 'Faster reporting workflows' },
              { value: '85', suffix: '%', label: 'System Usability Score' },
              { value: '25', suffix: '%', label: 'Product adoption lift' },
              { value: '12', suffix: '%', label: 'Conversion rate improvement' },
            ].map((m, i) => (
              <motion.div key={i} className="impact-metric"
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i * 0.15}
              >
                <span className="impact-number">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </span>
                <span className="impact-label">{m.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.blockquote className="impact-quote"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            "I don't just design interfaces — I design products, experiences, and measurable business impact."
          </motion.blockquote>
        </div>
      </section>

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
      <section className="ch-contact" id="contact">
        <div className="main-content">
          <motion.div className="contact-inner"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="section-label section-label--light" variants={fadeUp}>
              Contact
            </motion.span>
            <motion.h2 className="contact-heading" variants={fadeUp}>
              Let's create something<br />remarkable.
            </motion.h2>
            <motion.a href="mailto:praveenpk990057@gmail.com"
              className="contact-email hover-target" variants={fadeUp}
            >
              praveenpk990057@gmail.com
            </motion.a>

            <motion.div className="contact-links" variants={fadeUp}>
              <a href="https://linkedin.com/in/praveenkumarpk3/"
                target="_blank" rel="noopener noreferrer"
                className="contact-link hover-target"
              >
                LinkedIn <ExternalLink size={14} />
              </a>
              <a href="tel:+918660313309" className="contact-link hover-target">
                +91 866 031 3309
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="contact-footer"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <span>© 2026 Praveen Kumar</span>
            <span>Designed with precision.</span>
          </motion.div>
        </div>
      </section>

      {/* Floating vertical chapter side indicator */}
      <ChapterIndicator chapters={CHAPTERS} activeChapter={activeChapter} />

    </main>
  );
};

export default Home;
