/**
 * TextMarquee — Infinite scrolling marquee component
 *
 * Creates a seamless, infinitely looping horizontal scroll of its children.
 * Duplicates children 4× to ensure there are no visible gaps during the loop.
 * Supports reverse direction via a prop.
 *
 * Props:
 *   children   – Content to scroll (text, elements, etc.)
 *   speed      – Animation duration in seconds for one full cycle (default 30)
 *   reverse    – Scroll in reverse direction when true (default false)
 *   className  – Optional additional class names
 */

import { motion } from 'framer-motion';
import './TextMarquee.css';

function TextMarquee({
  children,
  speed = 30,
  reverse = false,
  className = '',
}) {
  /* Duplicate children for a seamless infinite loop */
  const duplicates = Array.from({ length: 4 });

  return (
    <div className={`text-marquee ${className}`}>
      <motion.div
        className="text-marquee__track"
        animate={{
          x: reverse ? ['0%', '50%'] : ['0%', '-50%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
        }}
      >
        {duplicates.map((_, i) => (
          <div key={i} className="text-marquee__item">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default TextMarquee;
