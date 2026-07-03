/**
 * ParallaxImage — Scroll-driven parallax image component
 *
 * Wraps an image in an overflow-hidden container. The image is scaled 1.2×
 * and translates vertically based on scroll position, creating a smooth
 * parallax depth effect. Includes a shimmer placeholder while the image loads.
 *
 * Props:
 *   src          – Image source URL
 *   alt          – Alt text for accessibility
 *   speed        – Parallax intensity multiplier (default 0.3)
 *   className    – Optional additional class names
 *   aspectRatio  – CSS aspect-ratio value (default '16/9')
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxImage.css';

function ParallaxImage({
  src,
  alt = '',
  speed = 0.3,
  className = '',
  aspectRatio = '16/9',
}) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  /* Track scroll progress of the container through the viewport */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  /* Map scroll progress to a vertical translate value */
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -100}px`, `${speed * 100}px`]
  );

  return (
    <div
      ref={containerRef}
      className={`parallax-image ${className}`}
      style={{ aspectRatio }}
    >
      {/* Shimmer placeholder */}
      <div
        className={`parallax-image__shimmer ${loaded ? 'parallax-image__shimmer--loaded' : ''}`}
      />

      {/* Parallax-translated inner wrapper */}
      <motion.div className="parallax-image__inner" style={{ y }}>
        <img
          className="parallax-image__img"
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
    </div>
  );
}

export default ParallaxImage;
