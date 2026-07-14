import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './Work.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const Work = () => {
  const navigate = useNavigate();

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

  return (
    <div className="work-archive-page">


      <section className="ch-work-archive">
        <div className="main-content">
          <motion.div className="archive-header"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="section-label">WORK ARCHIVE •</span>
            <h1 className="text-h1 archive-heading">Systematic digital solutions.</h1>
            <p className="archive-header-sub">
              A detailed exploration of AI analytics interfaces and growth optimization frameworks built to achieve measurable business outcomes.
            </p>
          </motion.div>

          <div className="bento-container">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className="bento-project-row"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp} custom={i}
              >
                {/* ── BENTO GRID ── */}
                <div className="bento-grid">
                  
                  {/* Module 1: Overview (Spans 2 columns on desktop) */}
                  <div className="bento-module module-overview hover-target" onClick={() => navigate(`/case-study/${project.id}`)}>
                    <div className="module-header-meta">
                      <span className="bento-num">{project.num}</span>
                      <span className="bento-cat">{project.category}</span>
                    </div>
                    <h3 className="text-h2 bento-title">{project.title}</h3>
                    <p className="bento-desc">{project.desc}</p>
                    <div className="bento-action-arrow">
                      <span>View Case Study</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Module 2: Visual Showcase (Full height on desktop) */}
                  <div className="bento-module module-visual hover-target" onClick={() => navigate(`/case-study/${project.id}`)}>
                    <div className="bento-visual-collage">
                      {/* Ambient Glow */}
                      <div className="visual-ambient-glow" />

                      {/* Editorial Image 1 */}
                      <div className="editorial-image-card card-main">
                        <img src={project.visuals.desktop} alt="" />
                        <span className="image-caption">[ FIG. 01 / SCREEN ARCHITECTURE ]</span>
                      </div>

                      {/* Editorial Image 2 */}
                      <div className="editorial-image-card card-sub">
                        <img src={project.visuals.mobile} alt="" />
                        <span className="image-caption">[ FIG. 02 / INTERACTION DETAIL ]</span>
                      </div>
                    </div>
                  </div>

                  {/* Module 3: Strategic Outcomes */}
                  <div className="bento-module module-outcomes">
                    <h4 className="text-h3 bento-module-title">Strategic Outcomes</h4>
                    <ul className="bento-outcomes-list">
                      {project.outcomes.map((o, idx) => (
                        <li key={idx} className="bento-outcome-item">{o}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Module 4: Metrics Dashboard */}
                  <div className="bento-module module-metrics">
                    <h4 className="text-h3 bento-module-title">Measurable Impact</h4>
                    <div className="bento-metrics-grid">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="bento-metric-card">
                          <span className="bento-metric-val">
                            <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                          </span>
                          <span className="bento-metric-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
