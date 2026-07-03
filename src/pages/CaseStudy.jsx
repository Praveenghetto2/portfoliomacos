import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './CaseStudy.css';

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/* ═══════════════════════════════════════════════
   INLINE SUB-COMPONENTS
   ═══════════════════════════════════════════════ */

/* SplitReveal — word-by-word reveal animation */
const SplitReveal = ({ text, tag: Tag = 'h1', className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <Tag className={`cs-split-reveal ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="cs-split-word-wrap">
          <motion.span
            className="cs-split-word"
            initial={{ y: '110%', rotate: 3 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/* ParallaxImage — scroll-driven parallax + scale */
const ParallaxImage = ({ src, alt, speed = 0.15, aspectRatio = '16/9' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className="cs-parallax-wrap" style={{ aspectRatio }}>
      <motion.img
        src={src}
        alt={alt}
        className="cs-parallax-img"
        style={{ y }}
        loading="lazy"
      />
    </div>
  );
};

/* AnimatedCounter — number reveal on scroll */
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.span
      ref={ref}
      className="cs-counter"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
};

/* ═══════════════════════════════════════════════
   CASE STUDY DATA
   ═══════════════════════════════════════════════ */
const caseStudies = {
  'revlitix-saas': {
    title: 'Revlitix SaaS Platform',
    subtitle: 'Enterprise Analytics & AI Dashboards',
    category: 'Product Design',
    number: '01',
    heroImage: '/assets/revlitix_hero_main.jpg',
    meta: {
      role: 'Lead Product Designer',
      timeline: 'Mar 2023 – Sept 2025',
      team: 'Design, Engineering, Data Science',
      tools: 'Figma, Webflow, After Effects',
    },
    sections: [
      {
        type: 'text',
        label: '01',
        title: 'The Problem',
        content: [
          'Revlitix is an enterprise-grade marketing analytics platform that allows clients to connect their sprawling ad networks and generate deep, actionable insights. However, the legacy platform had become a monolithic maze — a sprawling interface that tried to show everything at once.',
          'The primary issue: overwhelming cognitive load. New users were hit with a wall of data, leading to a 60% drop-off rate during onboarding. Support tickets related to basic navigation accounted for nearly a third of all inbound requests.',
          'Our mandate was clear: radically simplify the experience for the casual user without stripping away the raw power that our enterprise power users demand.',
        ],
      },
      {
        type: 'image',
        src: '/assets/revlitix_process_1783016419496.jpg',
        alt: 'UX Design Process — wireframes, user flows, and iteration',
        caption: 'Our design process: from research & discovery through wireframing, ideation, and prototyping.',
      },
      {
        type: 'text',
        label: '02',
        title: 'Target Users',
        content: [
          'We realized early that "the user" was a dangerous oversimplification. Through stakeholder interviews and behavioral analytics, we identified four distinct personas with entirely different mental models:',
        ],
        list: [
          { bold: 'The Data-Driven Marketer (Jessica)', text: ' — Needs instant access to daily KPIs without navigating nested menus.' },
          { bold: 'The Strategy-Focused CMO (David)', text: ' — Requires high-level trend forecasting and exportable executive summaries.' },
          { bold: 'The Agency Owner (Sarah)', text: ' — Needs highly customizable, white-labeled reporting across multiple client accounts.' },
          { bold: 'The Junior Analyst (Alex)', text: ' — Requires guided, error-proof workflows to avoid costly data mistakes.' },
        ],
      },
      {
        type: 'quote',
        text: '"The best interfaces don\'t give users less data — they give them better hierarchy."',
      },
      {
        type: 'text',
        label: '03',
        title: 'Design Process',
        content: [
          'Problem Definition — We started by analyzing 200+ session recordings, identifying that users spent 30% of their time navigating to the correct data filters before they could even begin analysis.',
          'Ideation — We ran cross-functional brainstorming sessions focused on Progressive Disclosure: the principle of hiding complex controls until they are explicitly invoked by the user.',
          'Wireframing — Before committing to any visual aesthetic, we built and tested low-fidelity wireframes to rigorously validate our information architecture against all four personas.',
          'Prototyping & Testing — We created high-fidelity interactive prototypes in Figma and ran unmoderated usability tests with 15 representative power users, leading to three major structural pivots before engineering handoff.',
        ],
      },
      {
        type: 'image',
        src: '/assets/revlitix_outcomes_1783016439002.jpg',
        alt: 'Growth metrics dashboard showing revenue and user retention data',
        caption: 'The final dashboard design — clean data visualization with progressive disclosure for advanced controls.',
      },
      {
        type: 'text',
        label: '04',
        title: 'Competitor Audit',
        content: [
          'We conducted a deep-dive UX audit against industry leaders — Datadog, Tableau, and Looker. While each offered immense analytical power, their learning curves were prohibitively steep for teams without a dedicated data analyst.',
          'Our strategy was to focus on intelligent defaults and smart presets. Instead of forcing users to build reports from scratch, we pre-configured the most common dashboards based on industry benchmarks, giving us a distinct usability advantage right out of the box.',
        ],
      },
      {
        type: 'metrics',
        label: '05',
        title: 'Outcomes',
        items: [
          { value: '40', suffix: '%', label: 'Reduction in user drop-offs during onboarding' },
          { value: '3', suffix: '×', label: 'Faster report generation vs. legacy system' },
          { value: '85', suffix: '%', label: 'System Usability Scale score (up from 62%)' },
          { value: '25', suffix: '%', label: 'Lift in overall product adoption' },
        ],
      },
      {
        type: 'text',
        label: '06',
        title: 'Lessons Learned',
        content: [
          'Data density requires hierarchy. Enterprise users don\'t want less data — they want it better organized. Our biggest win was introducing collapsible sections that remembered user preferences.',
          'Validate assumptions early. Our initial hypothesis about default graph views was completely wrong. We caught this in the first round of prototype testing, saving an estimated three weeks of engineering time.',
          'Component scalability is non-negotiable. The table components needed to handle datasets with 10,000+ rows without visual degradation. We built a rigid grid system with virtualized rendering to ensure performance at scale.',
        ],
      },
    ],
    nextProject: { id: 'sonic', title: 'Revlitix Enterprise Website' },
  },
  'sonic': {
    title: 'Revlitix Enterprise Website',
    subtitle: 'Web Design & Conversion Optimization',
    category: 'Web Design',
    number: '02',
    heroImage: '/assets/revlitix_outcomes_1783016439002.jpg',
    meta: {
      role: 'Product Designer',
      timeline: 'Mar 2023 – Sept 2025',
      team: 'Design, Marketing, Growth',
      tools: 'Figma, Webflow, Analytics',
    },
    sections: [
      {
        type: 'text',
        label: '01',
        title: 'The Challenge',
        content: [
          'The existing Revlitix marketing website was failing to convert the high-intent traffic driven by paid campaigns. Despite significant ad spend, the site\'s bounce rate exceeded 65% and the demo-request conversion rate sat at a dismal 2.3%.',
          'We were tasked with redesigning the entire web presence from scratch — rethinking the information architecture, visual storytelling, and conversion flow to transform the site into a genuine growth engine.',
        ],
      },
      {
        type: 'quote',
        text: '"Great marketing sites don\'t just look beautiful — they systematically remove every reason not to convert."',
      },
      {
        type: 'text',
        label: '02',
        title: 'The Approach',
        content: [
          'We started with a full audit of the existing conversion funnel, mapping every drop-off point from landing page to demo request. The key insight: users needed to see the product in action before they would commit to a demo call.',
          'We restructured the site around interactive product tours, embedded video walkthroughs, and social proof from recognizable enterprise clients. Every page was designed with a single, clear call-to-action.',
        ],
      },
      {
        type: 'metrics',
        label: '03',
        title: 'Outcomes',
        items: [
          { value: '12', suffix: '%', label: 'Lift in demo-request conversions' },
          { value: '50', suffix: '%', label: 'Faster campaign launch cycles' },
          { value: '40', suffix: '%', prefix: '-', label: 'Reduction in bounce rate' },
        ],
      },
    ],
    nextProject: { id: 'revlitix-saas', title: 'Revlitix SaaS Platform' },
  },
};

/* ═══════════════════════════════════════════════
   SECTION RENDERERS
   ═══════════════════════════════════════════════ */

const TextSection = ({ section }) => (
  <motion.section
    className="cs-text-section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={staggerContainer}
  >
    <div className="cs-text-inner">
      <motion.span className="section-label" variants={fadeUp}>
        {section.label}
      </motion.span>
      <motion.h2 className="cs-section-heading" variants={fadeUp}>
        {section.title}
      </motion.h2>
      {section.content.map((p, i) => (
        <motion.p key={i} variants={fadeUp}>
          {p}
        </motion.p>
      ))}
      {section.list && (
        <motion.ul className="cs-detail-list" variants={fadeUp}>
          {section.list.map((item, i) => (
            <li key={i}>
              <strong>{item.bold}</strong>{item.text}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  </motion.section>
);

const ImageSection = ({ section }) => (
  <motion.section
    className="cs-image-section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={fadeUp}
  >
    <div className="cs-image-fullbleed">
      <ParallaxImage src={section.src} alt={section.alt} speed={0.1} aspectRatio="16/9" />
    </div>
    {section.caption && (
      <motion.p className="cs-image-caption main-content" variants={fadeUp}>
        {section.caption}
      </motion.p>
    )}
  </motion.section>
);

const QuoteSection = ({ section }) => (
  <motion.section
    className="cs-quote-section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={fadeUp}
  >
    <div className="cs-quote-inner">
      <div className="cs-quote-accent-line" />
      <blockquote className="cs-pullquote">{section.text}</blockquote>
    </div>
  </motion.section>
);

const MetricsSection = ({ section }) => (
  <motion.section
    className="cs-metrics-section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={staggerContainer}
  >
    <div className="cs-metrics-inner">
      <motion.span className="section-label cs-metrics-label" variants={fadeUp}>
        {section.label}
      </motion.span>
      <motion.h2 className="cs-metrics-heading" variants={fadeUp}>
        {section.title}
      </motion.h2>
      <div className="cs-metrics-grid">
        {section.items.map((item, i) => (
          <motion.div
            key={i}
            className="cs-metric-card"
            variants={fadeUp}
            custom={i}
          >
            <AnimatedCounter
              value={item.value}
              suffix={item.suffix || ''}
              prefix={item.prefix || ''}
            />
            <span className="cs-metric-label">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const study = caseStudies[id];
  const heroRef = useRef(null);

  /* scroll-driven hero parallax */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.97]);

  /* scroll to top on route change */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  /* ── Not Found ── */
  if (!study) {
    return (
      <div className="cs-not-found main-content">
        <h2>Case Study Not Found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn btn-outline">
          Return Home
        </button>
      </div>
    );
  }

  /* meta labels for display */
  const metaLabels = {
    role: 'Role',
    timeline: 'Timeline',
    team: 'Team',
    tools: 'Tools',
  };

  return (
    <article className="cs-page">
      {/* ── HERO ── */}
      <motion.section ref={heroRef} className="cs-hero" style={{ opacity: heroOpacity }}>
        <motion.div className="cs-hero-content" style={{ scale: heroScale }}>
          {/* Back button */}
          <motion.div
            className="cs-hero-topbar main-content"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/#work" className="cs-back hover-target">
              <ArrowLeft size={16} />
              <span>All Projects</span>
            </Link>
          </motion.div>

          {/* Project identity */}
          <div className="cs-hero-body main-content">
            <motion.div
              className="cs-hero-meta-top"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span className="cs-project-number" variants={fadeUp}>
                {study.number}
              </motion.span>
              <motion.span className="cs-project-category section-label" variants={fadeUp}>
                {study.category}
              </motion.span>
            </motion.div>

            <SplitReveal
              text={study.title}
              tag="h1"
              className="cs-hero-title"
              delay={0.2}
            />

            <motion.p
              className="cs-hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {study.subtitle}
            </motion.p>

            {/* Meta grid */}
            <motion.div
              className="cs-meta-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
              }}
            >
              {Object.entries(study.meta).map(([key, value]) => (
                <motion.div key={key} className="cs-meta-item" variants={fadeUp}>
                  <span className="cs-meta-key">{metaLabels[key] || key}</span>
                  <span className="cs-meta-value">{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero image — full-bleed */}
          <motion.div
            className="cs-hero-image-wrap"
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ParallaxImage
              src={study.heroImage}
              alt={study.title}
              speed={0.08}
              aspectRatio="16/9"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── CONTENT SECTIONS ── */}
      <div className="cs-body">
        {study.sections.map((section, index) => {
          switch (section.type) {
            case 'text':
              return <TextSection key={index} section={section} />;
            case 'image':
              return <ImageSection key={index} section={section} />;
            case 'quote':
              return <QuoteSection key={index} section={section} />;
            case 'metrics':
              return <MetricsSection key={index} section={section} />;
            default:
              return null;
          }
        })}
      </div>

      {/* ── NEXT PROJECT TEASER ── */}
      {study.nextProject && (
        <motion.section
          className="cs-next"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          onClick={() => navigate(`/case-study/${study.nextProject.id}`)}
        >
          <div className="cs-next-inner main-content">
            <span className="section-label">Next Project</span>
            <h2 className="cs-next-title hover-target">
              <span className="cs-next-title-text">{study.nextProject.title}</span>
              <span className="cs-next-arrow-wrap">
                <ArrowUpRight size={40} className="cs-next-arrow" />
              </span>
            </h2>
          </div>
        </motion.section>
      )}
    </article>
  );
};

export default CaseStudy;
