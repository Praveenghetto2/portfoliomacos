import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smoothed spring values
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouch(mq.matches);

    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  // Hover detection
  const handleMouseOver = useCallback((e) => {
    const target = e.target;

    // Check for data-cursor-text
    const textEl =
      target.closest('[data-cursor-text]') ||
      (target.hasAttribute && target.hasAttribute('data-cursor-text')
        ? target
        : null);

    if (textEl) {
      setCursorText(textEl.getAttribute('data-cursor-text'));
      setIsHovering(true);
      return;
    }

    // Check for interactive elements
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('hover-target') ||
      target.closest('.hover-target')
    ) {
      setCursorText('');
      setIsHovering(true);
      return;
    }

    setCursorText('');
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouch, handleMouseMove, handleMouseOver]);

  if (isTouch) return null;

  // Determine cursor size
  const hasText = cursorText.length > 0;
  const size = hasText ? 80 : isHovering ? 36 : 12;
  const offset = size / 2;

  return (
    <motion.div
      className="custom-cursor"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: hasText
          ? 'rgba(45, 43, 255, 0.9)'
          : isHovering
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(255, 255, 255, 1)',
        border: isHovering && !hasText
          ? '1.5px solid rgba(255, 255, 255, 0.4)'
          : hasText
          ? '1.5px solid rgba(45, 43, 255, 0.6)'
          : '0px solid transparent',
      }}
      transition={{
        width: { type: 'spring', stiffness: 400, damping: 28 },
        height: { type: 'spring', stiffness: 400, damping: 28 },
        backgroundColor: { duration: 0.2 },
        border: { duration: 0.2 },
      }}
    >
      <span className={`cursor-text ${hasText ? 'visible' : ''}`}>
        {cursorText}
      </span>
    </motion.div>
  );
};

export default CustomCursor;
