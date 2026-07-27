import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
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
    <section className="editorial-contact-wrapper" id="contact">
      <div className="main-content">
        
        <div className="editorial-grid">
          
          {/* ═════ LEFT: THE STATEMENT ═════ */}
          <motion.div className="editorial-left"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="editorial-section-label" variants={fadeUp}>
              Let's Talk
            </motion.span>
            
            <motion.h2 className="editorial-statement" variants={fadeUp}>
              Currently open to <br className="desktop-only" />
              Senior Product Design roles.
            </motion.h2>
          </motion.div>

          {/* ═════ RIGHT: THE DIRECTORY ═════ */}
          <motion.div className="editorial-right"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            
            {/* Directory Item: Email */}
            <motion.div className="directory-item" variants={fadeUp}>
              <span className="directory-label">Email</span>
              <a href="mailto:praveenpk990057@gmail.com" className="directory-link group">
                praveenpk990057@gmail.com
                <ArrowUpRight size={18} className="link-arrow" />
              </a>
            </motion.div>

            {/* Directory Item: Phone */}
            <motion.div className="directory-item" variants={fadeUp}>
              <span className="directory-label">Phone</span>
              <a href="tel:+918660313309" className="directory-link group">
                +91 866 031 3309
                <ArrowUpRight size={18} className="link-arrow" />
              </a>
            </motion.div>

            {/* Directory Item: Social */}
            <motion.div className="directory-item" variants={fadeUp}>
              <span className="directory-label">Social</span>
              <a href="https://linkedin.com/in/praveenkumarpk3/" target="_blank" rel="noopener noreferrer" className="directory-link group">
                LinkedIn
                <ArrowUpRight size={18} className="link-arrow" />
              </a>
            </motion.div>

            {/* Directory Item: Timezone */}
            <motion.div className="directory-item" variants={fadeUp}>
              <span className="directory-label">Local Time</span>
              <span className="directory-text">
                {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit' })} IST
              </span>
            </motion.div>

          </motion.div>

        </div>

        {/* ═════ FOOTER COLOPHON ═════ */}
        <motion.div className="editorial-footer"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp} custom={3}
        >
          <div className="colophon-left">
            © {new Date().getFullYear()} Praveen Kumar
          </div>
          <div className="colophon-right">
            Designed & coded by Praveen Kumar.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
