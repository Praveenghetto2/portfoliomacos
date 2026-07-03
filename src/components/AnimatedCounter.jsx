/**
 * AnimatedCounter — Scroll-triggered counting animation
 *
 * Counts up from 0 to `value` when the element enters the viewport.
 * Uses a smooth eased animation over ~1.5 seconds. Supports prefix
 * and suffix strings (e.g. "$" or "+").
 *
 * Props:
 *   value      – Target number (string or number)
 *   suffix     – Text appended after the number (default '')
 *   prefix     – Text prepended before the number (default '')
 *   className  – Optional additional class names
 */

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Easing function matching var(--ease-out-expo)
 * cubic-bezier(0.16, 1, 0.3, 1) approximated as exponential ease-out.
 */
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [displayValue, setDisplayValue] = useState(0);

  /* Parse target as a number */
  const target = typeof value === 'string' ? parseFloat(value) : value;
  const isDecimal = !Number.isInteger(target);
  const decimalPlaces = isDecimal
    ? (String(value).split('.')[1] || '').length
    : 0;

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500; // ms
    const startTime = performance.now();
    let rafId;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      setDisplayValue(eased * target);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  /* Format the display number */
  const formatted = isDecimal
    ? displayValue.toFixed(decimalPlaces)
    : Math.round(displayValue).toLocaleString();

  return (
    <span
      ref={ref}
      className={`animated-counter ${className}`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontVariantNumeric: 'tabular-nums',
        willChange: 'contents',
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
