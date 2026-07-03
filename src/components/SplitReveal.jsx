/**
 * SplitReveal — Text reveal animation component
 *
 * Splits text into individual words, wrapping each in an overflow-hidden
 * container. Words animate upward from y:'110%' to y:'0%' with a configurable
 * stagger delay, triggered once when the element scrolls into view.
 *
 * Props:
 *   text           – The string to reveal
 *   tag            – HTML element tag: 'h1' | 'h2' | 'h3' | 'p'  (default 'h2')
 *   className      – Optional additional class names
 *   delay          – Delay before the first word starts animating (default 0)
 *   staggerDelay   – Delay between each word's animation start (default 0.04)
 *   mode           – 'word' (word-by-word) or 'line' (all at once) (default 'word')
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Shared easing curve matching var(--ease-out-expo) ── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

function SplitReveal({
  text = '',
  tag = 'h2',
  className = '',
  delay = 0,
  staggerDelay = 0.04,
  mode = 'word',
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  /* Split text into individual words */
  const words = text.split(/\s+/).filter(Boolean);

  /* Determine the wrapping HTML tag */
  const Tag = tag;

  /* ── Animation variants ── */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: mode === 'word' ? staggerDelay : 0,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '110%',
    },
    visible: {
      y: '0%',
      transition: {
        duration: 0.8,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  return (
    <Tag
      ref={containerRef}
      className={`split-reveal ${className}`}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              overflow: 'hidden',
              display: 'inline-block',
              /* Preserve natural word spacing */
              marginRight: '0.3em',
              /* Prevent text clipping on descenders */
              paddingBottom: '0.08em',
            }}
          >
            <motion.span
              variants={wordVariants}
              style={{
                display: 'inline-block',
                willChange: 'transform',
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export default SplitReveal;
