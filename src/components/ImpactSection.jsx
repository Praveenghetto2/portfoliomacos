import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import './ImpactSection.css';

export default function ImpactSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const metrics = [
    { value: '40', prefix: '', suffix: '%', label: 'Reduction in user drop-offs', color: 'var(--accent-purple)' },
    { value: '3', prefix: '', suffix: 'x', label: 'Faster reporting workflows', color: 'var(--accent-warm)' },
    { value: '85', prefix: '', suffix: '', label: 'System Usability Score', color: 'var(--accent-blue)' },
    { value: '25', prefix: '+', suffix: '%', label: 'Product adoption lift', color: 'var(--accent-purple)' },
    { value: '12', prefix: '+', suffix: '%', label: 'Conversion rate boost', color: 'var(--accent-warm)' },
  ];

  return (
    <section className="bento-impact-wrapper" id="impact">
      <div className="main-content">
        
        <motion.div className="bento-impact-header"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <span className="section-label section-label--bento">IMPACT</span>
          <h2 className="bento-impact-heading">Design that drives business outcomes.</h2>
        </motion.div>

        <div className="bento-impact-grid">
          
          {/* Quote Anchor Card (Spans 2x2) */}
          <motion.div 
            className="bento-card bento-quote-card"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp} custom={0}
          >
            <div className="quote-icon">"</div>
            <h3 className="quote-text">
              I don't just design interfaces — I design products, experiences, and measurable business impact.
            </h3>
            <div className="quote-author">
              <span className="author-name">Praveen Kumar</span>
              <span className="author-title">Senior Product Designer</span>
            </div>
            
            {/* Subtle background glow */}
            <div className="bento-glow"></div>
          </motion.div>

          {/* Metric Cards */}
          {metrics.map((m, i) => (
            <motion.div 
              key={i} 
              className={`bento-card bento-metric-card metric-${i + 1}`}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp} custom={i + 1}
            >
              <div className="metric-header">
                <span className="metric-arrow" style={{ color: m.color }}>↗</span>
              </div>
              <div className="metric-value" style={{ color: m.color }}>
                <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <p className="metric-label">{m.label}</p>
              
              {/* Subtle sparkline visual in background */}
              <div className="metric-bg-visual">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,30 Q25,10 50,20 T100,5 L100,30 L0,30 Z" fill={m.color} opacity="0.05" />
                  <path d="M0,30 Q25,10 50,20 T100,5" fill="none" stroke={m.color} strokeWidth="1" opacity="0.2" />
                </svg>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
