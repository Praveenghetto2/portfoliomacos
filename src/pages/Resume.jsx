import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import './Resume.css';

// 3D Tilt Card Helper Component
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
    
    const rx = -((y - yc) / yc) * 5; // Subtle tilt for resume
    const ry = ((x - xc) / xc) * 5;
    
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

export default function Resume() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="resume-split-container relative">
      <div className="main-content">
        <div className="resume-split-grid">
          
          {/* ═════ LEFT PANE: STICKY ANCHOR ═════ */}
          <motion.div 
            className="resume-left-pane"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <TiltCard className="resume-sticky-content bento-glass-card p-8 rounded-3xl">
              {/* SaaS-Style In-Line Back Link */}
              <Link 
                to="/"
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#86868B] hover:text-[#007AFF] transition-all cursor-default mb-6 bg-transparent border-none p-0 w-fit"
              >
                <ArrowLeft size={12} /> Back to Desktop
              </Link>

              <motion.h1 className="text-h1 resume-name font-display font-extrabold uppercase text-apple-text" variants={fadeUp}>
                Praveen Kumar
              </motion.h1>
              <motion.h2 className="text-body-large resume-title-role font-mono font-bold text-brand-purple uppercase tracking-widest mt-2" variants={fadeUp}>
                UI/UX Product Designer
              </motion.h2>
              
              <motion.p className="resume-summary text-xs text-apple-subtext leading-relaxed font-body mt-4" variants={fadeUp}>
                Product Designer specializing in AI-driven SaaS platforms and enterprise applications. 
                Proven track record of architecting scalable design systems, bridging the gap between 
                design and engineering, and leading 0-to-1 product initiatives that drive measurable 
                user adoption and business growth.
              </motion.p>

              <motion.div className="resume-download-wrapper mt-6" variants={fadeUp}>
                <MagneticButton href="/Praveen_Kumar_Resume.pdf" download="Praveen_Kumar_Resume.pdf" className="download-btn w-full justify-center">
                  Download Resume <Download size={14} style={{ marginLeft: '0.5rem' }}/>
                </MagneticButton>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* ═════ RIGHT PANE: SCROLLING CONTENT ═════ */}
          <div className="resume-right-pane">
            
            {/* SECTION: EXPERIENCE */}
            <motion.section 
              className="resume-section"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
            >
              <motion.h3 className="text-h2 resume-section-heading font-display font-extrabold uppercase mb-6" variants={fadeUp}>Experience</motion.h3>
              
              <motion.div className="resume-item" variants={fadeUp}>
                <div className="resume-timeline-marker"></div>
                <TiltCard className="resume-item-content bento-glass-card p-6 rounded-2xl cursor-pointer">
                  <span className="resume-date font-mono text-[9px] font-bold text-apple-subtext uppercase tracking-wider block mb-1">Sep 2025 — Present</span>
                  <h4 className="resume-role font-display font-extrabold uppercase text-apple-text text-base">UI/UX Designer</h4>
                  <div className="resume-company font-mono text-xs text-brand-purple font-bold mt-0.5">Candescent</div>
                  <ul className="resume-desc-list text-xs text-apple-subtext leading-relaxed font-body space-y-1.5 mt-3 list-disc pl-4">
                    <li><strong>Move Money Team:</strong> Designed comprehensive payment experiences for retail and business banking customers.</li>
                    <li><strong>Unified Payments:</strong> Consolidated ACH, Wire, and Instant Payments into a single, streamlined contact-centric flow.</li>
                    <li><strong>End-to-End UX/UI:</strong> Owned the design of Single/Multi-Send, Bill Pay, and ACH File Uploads, delivering over 600+ screens.</li>
                    <li><strong>Workflow Optimization:</strong> Radically simplified complex bulk payment and transaction management user flows.</li>
                    <li><strong>Cross-Functional Leadership:</strong> Partnered with PMs, Engineering, and Compliance to ship scalable, user-centered financial products.</li>
                    <li><strong>Design Systems:</strong> Scaled an MUI-based design system, accelerating design-to-dev handoff and ensuring cross-product consistency.</li>
                  </ul>
                </TiltCard>
              </motion.div>

              <motion.div className="resume-item" variants={fadeUp}>
                <div className="resume-timeline-marker"></div>
                <TiltCard className="resume-item-content bento-glass-card p-6 rounded-2xl cursor-pointer">
                  <span className="resume-date font-mono text-[9px] font-bold text-apple-subtext uppercase tracking-wider block mb-1">Mar 2023 — Sep 2025</span>
                  <h4 className="resume-role font-display font-extrabold uppercase text-apple-text text-base">UI/UX Designer</h4>
                  <div className="resume-company font-mono text-xs text-brand-purple font-bold mt-0.5">Revlitix</div>
                  <ul className="resume-desc-list text-xs text-apple-subtext leading-relaxed font-body space-y-1.5 mt-3 list-disc pl-4">
                    <li>Spearheaded the end-to-end UX strategy for complex AI-powered SaaS features (Insights, KPI Projections, Workflows), driving a <strong>25% surge in enterprise product adoption</strong>.</li>
                    <li>Architected and scaled a modular, token-based design system in Figma, establishing a single source of truth and reducing cross-functional engineering handoff friction by 25%.</li>
                    <li>Championed human-centered design methodologies through rigorous A/B testing and high-fidelity prototyping, enhancing core user task efficiency by up to 25%.</li>
                    <li>Engineered conversion-optimized marketing architectures, achieving a 12% lift in lead generation and accelerating go-to-market campaign deployments by 50%.</li>
                  </ul>
                </TiltCard>
              </motion.div>

              <motion.div className="resume-item" variants={fadeUp}>
                <div className="resume-timeline-marker"></div>
                <TiltCard className="resume-item-content bento-glass-card p-6 rounded-2xl cursor-pointer">
                  <span className="resume-date font-mono text-[9px] font-bold text-apple-subtext uppercase tracking-wider block mb-1">Jun 2021 — Nov 2022</span>
                  <h4 className="resume-role font-display font-extrabold uppercase text-apple-text text-base">UI Developer</h4>
                  <div className="resume-company font-mono text-xs text-brand-purple font-bold mt-0.5">DSG, Inc.</div>
                  <ul className="resume-desc-list text-xs text-apple-subtext leading-relaxed font-body space-y-1.5 mt-3 list-disc pl-4">
                    <li>Orchestrated the complete UX/UI redesign of a flagship digital product, drastically improving usability, WCAG 2.1 AA accessibility compliance, and task completion rates.</li>
                    <li>Bridged the gap between design and engineering by actively prototyping responsive, highly performant front-end interfaces utilizing HTML, CSS, and modern JavaScript.</li>
                    <li>Executed deep performance optimizations and interaction refinements that successfully reduced bounce rates and elevated overall user engagement metrics.</li>
                  </ul>
                </TiltCard>
              </motion.div>
              
              <motion.div className="resume-item" variants={fadeUp}>
                <div className="resume-timeline-marker"></div>
                <TiltCard className="resume-item-content bento-glass-card p-6 rounded-2xl cursor-pointer">
                  <span className="resume-date font-mono text-[9px] font-bold text-apple-subtext uppercase tracking-wider block mb-1">Mar 2020 — Oct 2020</span>
                  <h4 className="resume-role font-display font-extrabold uppercase text-apple-text text-base">Intern</h4>
                  <div className="resume-company font-mono text-xs text-brand-purple font-bold mt-0.5">IQVIA</div>
                  <ul className="resume-desc-list text-xs text-apple-subtext leading-relaxed font-body space-y-1.5 mt-3 list-disc pl-4">
                    <li>Conducted rigorous data auditing and cleaning to ensure absolute accuracy and consistency across the global client portal.</li>
                    <li>Maintained and updated critical client records, significantly improving the operational efficiency of the data management team.</li>
                  </ul>
                </TiltCard>
              </motion.div>
            </motion.section>

            {/* SECTION: EDUCATION */}
            <motion.section 
              className="resume-section"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
            >
              <motion.h3 className="text-h2 resume-section-heading font-display font-extrabold uppercase mb-6" variants={fadeUp}>Education</motion.h3>
              
              <motion.div className="resume-item" variants={fadeUp}>
                <div className="resume-timeline-marker"></div>
                <TiltCard className="resume-item-content bento-glass-card p-6 rounded-2xl cursor-pointer">
                  <span className="resume-date font-mono text-[9px] font-bold text-apple-subtext uppercase tracking-wider block mb-1">2016 — 2019</span>
                  <h4 className="resume-role font-display font-extrabold uppercase text-apple-text text-base">Bachelor of Computer Application</h4>
                  <div className="resume-company font-mono text-xs text-brand-purple font-bold mt-0.5">Kristu Jayanti College Autonomous</div>
                </TiltCard>
              </motion.div>
            </motion.section>

            {/* SECTION: SKILLS */}
            <motion.section 
              className="resume-section"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
            >
              <motion.h3 className="text-h2 resume-section-heading font-display font-extrabold uppercase mb-6" variants={fadeUp}>Tools & Technologies</motion.h3>
              
              <motion.div className="resume-tags" variants={fadeUp}>
                <span className="resume-tag">Figma</span>
                <span className="resume-tag">Webflow</span>
                <span className="resume-tag">HTML/CSS</span>
                <span className="resume-tag">JavaScript</span>
                <span className="resume-tag">After Effects</span>
                <span className="resume-tag">Prototyping</span>
                <span className="resume-tag">Design Systems</span>
              </motion.div>
            </motion.section>

          </div>

        </div>
      </div>
    </div>
  );
}
