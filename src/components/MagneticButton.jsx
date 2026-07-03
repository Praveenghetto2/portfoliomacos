/**
 * MagneticButton — Interactive button with magnetic cursor attraction
 *
 * On mouse move within the button bounds, the element subtly translates
 * toward the cursor using Framer Motion springs. On mouse leave it springs
 * smoothly back to center. Renders as <a> when `href` is provided,
 * otherwise renders as <button>.
 *
 * Props:
 *   children        – Button content
 *   className       – Optional additional class names
 *   href            – If provided, renders as an anchor tag
 *   onClick         – Click handler
 *   magnetStrength  – Pull intensity multiplier (default 0.3)
 */

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './MagneticButton.css';

/* Spring config for the magnetic pull */
const SPRING_CONFIG = { damping: 20, stiffness: 300, mass: 0.5 };

function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  magnetStrength = 0.3,
  ...rest
}) {
  const buttonRef = useRef(null);

  /* Raw motion values for x / y offset */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /* Smoothed spring values */
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  /**
   * Calculate cursor offset from button center and apply
   * proportional translation based on magnetStrength.
   */
  const handleMouseMove = (e) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magnetStrength;
    const deltaY = (e.clientY - centerY) * magnetStrength;

    x.set(deltaX);
    y.set(deltaY);
  };

  /* Reset to center on mouse leave */
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  /* Decide whether to render an <a> or <button> */
  const Tag = href ? 'a' : 'button';
  const tagProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { type: 'button', onClick };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        display: 'inline-block',
      }}
    >
      <Tag className={`magnetic-button ${className}`} {...tagProps} {...rest}>
        {children}
      </Tag>
    </motion.div>
  );
}

export default MagneticButton;
