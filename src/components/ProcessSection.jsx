import React from 'react';
import { motion } from 'framer-motion';
import './ProcessSection.css';

export default function ProcessSection() {
  const processSteps = [
    { num: '01', title: 'Discovery', desc: 'Understanding the problem space through stakeholder interviews and domain immersion.' },
    { num: '02', title: 'Research', desc: 'User interviews, data analysis, competitive audits, and behavioral insights.' },
    { num: '03', title: 'Ideation', desc: 'Rapid exploration through sketches, concepts, and collaborative workshops.' },
    { num: '04', title: 'Architecture', desc: 'Information architecture, user flows, and system-level thinking.' },
    { num: '05', title: 'Design', desc: 'High-fidelity prototyping, testing, and iterative refinement.' },
    { num: '06', title: 'Delivery', desc: 'Design systems, developer handoff, and post-launch iteration.' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="simple-process-wrapper" id="process">
      <div className="main-content">
        
        <motion.div 
          className="simple-header"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <span className="section-label">PROCESS · METHODOLOGY</span>
          <h2 className="simple-heading">A systematic framework for digital craftsmanship.</h2>
        </motion.div>

        <div className="simple-grid">
          {processSteps.map((step, i) => (
            <motion.div 
              key={i} 
              className="simple-card"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp} custom={i}
            >
              <div className="card-top">
                <span className="card-num">{step.num}</span>
              </div>
              <div className="card-bottom">
                <h3 className="card-title">{step.title}</h3>
                <p className="card-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
